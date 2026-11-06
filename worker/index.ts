/**
 * Serves `/api/*` ahead of the static assets (see `run_worker_first` in wrangler.jsonc).
 * Everything else is handled by the assets binding without invoking this Worker.
 */

interface Env {
	DISCORD_TOKEN: string
	DISCORD_GUILD_ID: string
	DISCORD_CHANNEL_NAME: string
}

interface ExecutionContext {
	waitUntil(promise: Promise<unknown>): void
}

export interface DiscordFeed {
	presenceCount: number | null
	channel: { name: string; url: string } | null
	messages: { id: string; content: string; timestamp: string }[]
	members: { name: string; avatarUrl: string; role: { name: string; color: string | null } }[]
}

interface Channel {
	id: string
	name: string
	type: number
}

interface Role {
	id: string
	name: string
	color: number
	position: number
}

interface Member {
	nick: string | null
	avatar: string | null
	roles: string[]
	user: { id: string; username: string; global_name: string | null; avatar: string | null; bot?: boolean }
}

interface Message {
	id: string
	type: number
	content: string
	timestamp: string
	attachments: unknown[]
}

const API = 'https://discord.com/api/v10'

// Responses are cached so visitors don't each spend Discord rate limit
const CACHE_SECONDS = 60

const MESSAGE_LIMIT = 15
const MEMBER_LIMIT = 10

// Default (0) and reply (19) messages; skips joins, pins, boosts, etc.
const MESSAGE_TYPES = new Set([0, 19])

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const { pathname } = new URL(request.url)

		if (pathname !== '/api/discord') return new Response('Not Found', { status: 404 })
		if (request.method !== 'GET') return new Response('Method Not Allowed', { status: 405 })

		const cache = await caches.open('discord')
		const cached = await cache.match(request)
		if (cached) return cached

		const response = Response.json(await getFeed(env), {
			headers: { 'Cache-Control': `public, max-age=${CACHE_SECONDS}` },
		})
		ctx.waitUntil(cache.put(request, response.clone()))

		return response
	},
}

async function getFeed(env: Env): Promise<DiscordFeed> {
	const discord = <T>(path: string) => discordFetch<T>(path, env.DISCORD_TOKEN)
	const guildId = env.DISCORD_GUILD_ID

	const [guild, channels, roles] = await Promise.all([
		discord<{ approximate_presence_count: number }>(`/guilds/${guildId}?with_counts=true`).catch(logError),
		discord<Channel[]>(`/guilds/${guildId}/channels`).catch(logError),
		discord<Role[]>(`/guilds/${guildId}/roles`).catch(logError),
	])

	const channel = channels?.find(({ name, type }) => type === 0 && name === env.DISCORD_CHANNEL_NAME)

	const [messages, members] = await Promise.all([
		channel
			? discord<Message[]>(`/channels/${channel.id}/messages?limit=50`).catch(logError)
			: null,
		// Requires the Server Members privileged intent
		discord<Member[]>(`/guilds/${guildId}/members?limit=1000`).catch(logError),
	])

	const rolesById = new Map(roles?.map((role) => [role.id, role]))
	const channelsById = new Map(channels?.map((channel) => [channel.id, channel]))

	return {
		presenceCount: guild?.approximate_presence_count ?? null,
		channel: channel ? { name: channel.name, url: `https://discord.com/channels/${guildId}/${channel.id}` } : null,
		messages: (messages ?? [])
			.filter(({ type }) => MESSAGE_TYPES.has(type))
			.map(({ id, content, timestamp, attachments }) => ({
				id,
				// Requires the Message Content privileged intent, otherwise content is empty
				content: formatContent(content, rolesById, channelsById) || (attachments.length ? 'Shared an attachment' : ''),
				timestamp,
			}))
			.filter(({ content }) => content)
			.slice(0, MESSAGE_LIMIT),
		members: getTopMembers(members ?? [], rolesById, guildId),
	}
}

/**
 * Ranks members by their highest role, so the members list mirrors the role hierarchy in the server
 */
function getTopMembers(members: Member[], rolesById: Map<string, Role>, guildId: string): DiscordFeed['members'] {
	return members
		.filter(({ user }) => !user.bot)
		.flatMap((member) => {
			const topRole = member.roles
				.map((id) => rolesById.get(id))
				.reduce<Role | undefined>((top, role) => (role && (!top || role.position > top.position) ? role : top), undefined)

			return topRole ? [{ member, topRole }] : []
		})
		.sort((a, b) => b.topRole.position - a.topRole.position)
		.slice(0, MEMBER_LIMIT)
		.map(({ member, topRole }) => ({
			name: member.nick ?? member.user.global_name ?? member.user.username,
			avatarUrl: getAvatarUrl(member, guildId),
			role: {
				name: topRole.name,
				color: topRole.color ? `#${topRole.color.toString(16).padStart(6, '0')}` : null,
			},
		}))
}

function getAvatarUrl({ avatar, user }: Member, guildId: string): string {
	if (avatar) return `https://cdn.discordapp.com/guilds/${guildId}/users/${user.id}/avatars/${avatar}.png?size=64`
	if (user.avatar) return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=64`

	return `https://cdn.discordapp.com/embed/avatars/${(BigInt(user.id) >> 22n) % 6n}.png`
}

/**
 * Replaces Discord's markup with readable text. User mentions are anonymized
 * since messages are shown without their authors
 */
function formatContent(content: string, rolesById: Map<string, Role>, channelsById: Map<string, Channel>): string {
	return content
		.replace(/<@!?\d+>/g, '@member')
		.replace(/<@&(\d+)>/g, (_, id) => `@${rolesById.get(id)?.name ?? 'role'}`)
		.replace(/<#(\d+)>/g, (_, id) => `#${channelsById.get(id)?.name ?? 'channel'}`)
		.replace(/<a?(:\w+:)\d+>/g, '$1')
		.replace(/<t:(\d+)(?::\w)?>/g, (_, seconds) => new Date(Number(seconds) * 1000).toUTCString())
		.trim()
}

async function discordFetch<T>(path: string, token: string): Promise<T> {
	const response = await fetch(`${API}${path}`, { headers: { Authorization: `Bot ${token}` } })

	if (!response.ok) throw new Error(`Discord ${path} responded ${response.status}: ${await response.text()}`)

	return response.json() as Promise<T>
}

function logError(error: unknown): null {
	console.error(error)
	return null
}
