import { secret } from "@server/config/vars";
import type { MiddlewareHandler } from "hono";
import { jwt } from "hono/jwt";

export function JwtMiddlware(): MiddlewareHandler {
  return jwt({ secret });
}
