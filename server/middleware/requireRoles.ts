import type { MiddlewareHandler, Context } from "hono";

export function requireRoles(roles: string[]): MiddlewareHandler {
  return async (c: Context, next) => {
    const user = c.get("jwtPayload");
    if (!user || !roles.includes(user.role)) {
      return c.json({ error: "Forbidden" }, 403);
    }
    c.set("user", user);
    await next();
  };
}
