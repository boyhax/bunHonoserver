import { hc } from "hono/client";
import app from "./app";

export default {
  port: 8080,
  fetch: app.fetch,
};

export const Api = hc<typeof app>;
