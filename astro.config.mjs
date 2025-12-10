// @ts-check
import { defineConfig } from "astro/config";
import vue from "@astrojs/vue";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: "https://murlax.com",
  integrations: [vue()],

  markdown: {
    shikiConfig: {
      theme: "github-dark",
      wrap: true,
    },
  },

  adapter: cloudflare(),
  output: "server",
});
