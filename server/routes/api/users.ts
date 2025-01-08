import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { createUser, findUser, listUsers, updateUser } from "@/services/users";
import { JwtMiddlware } from "@/middleware/jwt";

const users = new Hono()
  .get(
    "/",
    zValidator(
      "query",
      z.object({
        search: z.string().optional(), // For filtering users by name/email
      })
    ),
    async (c) => {
      const query = c.req.valid("query");
      const filter: any = {};

      if (query.search) {
        filter.$or = [
          { name: { $regex: query.search, $options: "i" } },
          { email: { $regex: query.search, $options: "i" } },
        ];
      }

      const result = await listUsers(filter);
      return c.json(result);
    }
  )
  .get("/:id", async (c) => {
    const id = c.req.param("id");
    const user = await findUser({ id });

    if (!user) {
      return c.json({ error: "User not found" }, 404);
    }

    return c.json({ data: user, error: null });
  })
  .put(
    "/:id",
    zValidator(
      "json",
      z.object({
        name: z.string().optional(),
        email: z.string().email().optional(),
        password: z.string().min(6).optional(),
      })
    ),
    async (c) => {
      const id = c.req.param("id");
      const data = c.req.valid("json");

      const user = await updateUser(id, data);

      if (!user) {
        return c.json({ error: "User not found" }, 404);
      }

      return c.json({ data: user, error: null });
    }
  )
  .post(
    "/",
    zValidator(
      "json",
      z.object({
        email: z.string().email(),
        password: z.string().min(6),
        name: z.string().min(5),
        avatar: z.string().optional(),
      })
    ),
    JwtMiddlware(),
    async (c) => {
      const body = c.req.valid("json");
      const result = await createUser(body);
      return c.json(result);
    }
  );

export default users;
