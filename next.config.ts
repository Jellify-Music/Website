import type { NextConfig } from "next";
import { withTamagui } from "@tamagui/next-plugin";
import jellifyConfig from "./tamagui.config";

const nextConfig: NextConfig = {
  /* config options here */
};

/**
 * Use the Tamagui Next.JS plugin to enable
 * SSR of themed components all while using
 * the same tamagui config as the React Native
 * app
 * 
 * @see https://tamagui.dev/docs/guides/next-js
 */
const tamaguiPlugin = withTamagui({
  config: './tamagui.config.ts',
  components: ['tamagui']
})

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  ...jellifyConfig,
  ...tamaguiPlugin(nextConfig)
};

// added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
initOpenNextCloudflareForDev();
