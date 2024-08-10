import type { MiddlewareHandler } from "astro";
import { verifyRequestOrigin } from "lucia";

export const CSRFHook: MiddlewareHandler = async (context, next) => {
  try {
    if (context.request.method !== "GET") {
      const originHeader = context.request.headers.get("Origin");
      const hostHeader = context.request.headers.get("Host");

      const invalidOrigin =
        !originHeader ||
        !hostHeader ||
        !verifyRequestOrigin(originHeader, [hostHeader]);
      if (invalidOrigin) throw new Error("Invalid request origin");
    }
    const response = await next();
    return response;
  } catch (e: any) {
    console.error("CSRF hook error:", e.message);
    return new Response("Forbidden", { status: 403 });
  }
};
