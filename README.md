# Jellify Website

The website for [Jellify](https://github.com/Jellify-Music/App), live at [jellify.app](https://jellify.app).

Built with [Astro](https://astro.build) as a static site, and served from [Cloudflare Workers static assets](https://developers.cloudflare.com/workers/static-assets/).

## Getting Started

Use [Bun](https://bun.sh) (the version in `package.json`'s `packageManager`) and the Node version in `.nvmrc`. Astro and Wrangler run on Node.

```bash
nvm use
bun install
bun run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Project Structure

| Path                    | What's there                                                                |
| ----------------------- | --------------------------------------------------------------------------- |
| `src/pages/`            | File-based routes. `index.astro` is `/`, `404.astro` is the not-found page  |
| `src/layouts/`          | The shared HTML shell                                                       |
| `src/styles/global.css` | Theme colors and base styles, mirroring the Jellify app's "purple" theme    |
| `public/`               | Static assets served as-is                                                  |
| `wrangler.jsonc`        | Cloudflare Workers configuration                                            |

Light and dark themes follow the visitor's system preference.

## Scripts

| Command                  | Description                                                |
| ------------------------ | ---------------------------------------------------------- |
| `bun run dev`            | Start the dev server                                       |
| `bun run build`          | Production build into `dist/`                              |
| `bun run preview`        | Build and serve `dist/` locally with Wrangler              |
| `bun run lint`           | Lint with ESLint                                           |
| `bun run typecheck`      | Typecheck with `astro check`                               |
| `bun run deploy`         | Build and deploy to Cloudflare Workers                     |
| `bun run deploy:version` | Build and upload a new Worker version without promoting it |
