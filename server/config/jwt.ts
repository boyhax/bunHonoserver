import { sign } from "hono/jwt";
import { vars } from "./vars";

export function signjwt(claims: { email; id; roles }) {
  return sign(claims, vars.jwt_secret);
}
