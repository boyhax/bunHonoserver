import { sign } from "hono/jwt";
import { vars } from "./vars";

export function signjwt(claims: { email: string; id: string; role: string }) {
  return sign(claims, vars.jwt_secret);
}
