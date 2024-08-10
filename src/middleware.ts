import { sequence } from "astro:middleware";
import { CSRFHook } from "./services/security/hooks";
import { AuthenticationHook, AuthorizationHook } from "./services/auth/hooks";
export const onRequest = sequence(
  CSRFHook,
  AuthenticationHook,
  AuthorizationHook
);
