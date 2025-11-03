import type { NextConfig } from "next";
import { defaultConfig } from "@tamagui/config/v4";
import { withTamagui } from "@tamagui/next-plugin";

const nextConfig: NextConfig = {
  /* config options here */
};

const tamaguiPlugin = withTamagui({
  config: './tamagui.config.ts',
  components: ['tamagui']
})

const jellifyConfig = {
  ...defaultConfig
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  ...jellifyConfig,
  ...tamaguiPlugin(nextConfig)
};

// added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
initOpenNextCloudflareForDev();
