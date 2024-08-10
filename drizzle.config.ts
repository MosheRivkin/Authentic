import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "sqlite",
  driver: "turso",

  dbCredentials: {
    url: "file:./.astro/content.db",
  },
});
