import { Cookie } from "lucia";
import type { APIContext, MiddlewareHandler } from "astro";
import { auth } from "@/services/auth";

export const AuthenticationHook: MiddlewareHandler = async (context, next) => {
  try {
    const sessionId =
      context.cookies.get(auth.sessionCookieName)?.value ?? null;
    if (!sessionId) throw new Error("No session cookie found");
    const { session, user } = await auth.validateSession(sessionId);
    if (session && session.fresh) {
      const sessionCookie = auth.createSessionCookie(session.id);
      setSessionCookie(context, sessionCookie);
    }
    if (!session) {
      const sessionCookie = auth.createBlankSessionCookie();
      setSessionCookie(context, sessionCookie);
    }
    context.locals.session = session;
    context.locals.user = user;
    const response = await next();
    return response;
  } catch (e: any) {
    console.warn("Authentication hook error:", e.message);
    context.locals.user = null;
    context.locals.session = null;
    const response = await next();
    return response;
  }
};

function setSessionCookie(ctx: APIContext, sessionCookie: Cookie) {
  ctx.cookies.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
}

export const AuthorizationHook: MiddlewareHandler = async (context, next) => {
  try {
    const response = await next();
    return response;
  } catch (e: any) {
    console.warn("Authorization hook error:", e.message);
    return new Response("Unauthorized", { status: 401 });
  }
};
