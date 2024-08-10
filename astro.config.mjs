import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import db from "@astrojs/db";
import { env } from "./env.config";

const tailwindI = tailwind({
  applyBaseStyles: false,
});
const dbI = db();
const reactI = react();
const vercelAdapter = vercel();

// https://astro.build/config
export default defineConfig({
  prefetch: true,
  integrations: [tailwindI, dbI, reactI],
  output: "server",
  adapter: vercelAdapter,
  experimental: {
    actions: true,
    env,
  },
  security: {
    checkOrigin: true,
  },
});
