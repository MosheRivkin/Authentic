import { envField } from "astro/config";
import type { EnvSchema } from "node_modules/astro/dist/env/schema";

type Env = {
  schema?: EnvSchema;
  validateSecrets?: boolean;
};

export const env: Env = {
  schema: {
    DEV: envField.boolean({ access: "public", context: "server" }),
  },
};
