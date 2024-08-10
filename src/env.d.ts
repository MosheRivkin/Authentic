/// <reference path="../.astro/env.d.ts" />
/// <reference path="../.astro/actions.d.ts" />
/// <reference path="../.astro/db-types.d.ts" />
/// <reference path="./services/auth/types.d.ts" />
/// <reference types="astro/client" />

type AppLocals = {};

declare namespace App {
  interface Locals extends AuthLocals, AppLocals {}
}
