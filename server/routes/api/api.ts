import { Hono } from "hono";
import push from "./push.ts";
import movie from "./movies.ts";
import products from "./products.ts";
import users from "./users.ts";
import authRoute from "@server/routes/api/auth/auth.ts";

const api = new Hono();
api
  .get("/", async (c) => {
    return c.json({ status: "ok", message: "ok" }, 200);
  })
  .route("/push", push)
  .route("/movies", movie)
  .route("/products", products)
  .route("/users", users)
  .route("/auth", authRoute);

export default api;
