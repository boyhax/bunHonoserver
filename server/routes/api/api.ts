import { Hono } from "hono";
import push from "./push.ts";
import movie from "./movies.ts";
import products from "./products.ts";
import users from "./users.ts";
import authRoute from "./auth/auth.ts";
import account from "./account/account.ts";
import storage from "./storage.ts";
// import sse from "./sse.ts";

const api = new Hono()
  .get("/", async (c) => {
    return c.json({ status: "ok", message: "ok" }, 200);
  })
  .route("/push", push)
  .route("/movies", movie)
  .route("/products", products)
  .route("/users", users)
  .route("/account", account)
  .route("/auth", authRoute)
  .route("/storage", storage);
// .route("/sse", sse);

export default api;
