import { vars } from "@/config/vars";
import type { MiddlewareHandler } from "hono";
import { jwt } from "hono/jwt";

export function JwtMiddlware(): MiddlewareHandler {
  return jwt({ secret: vars.jwt_secret as string });
}
