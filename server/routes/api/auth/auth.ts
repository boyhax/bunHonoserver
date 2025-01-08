import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import bcrypt from "bcryptjs";
import googleRoute from "./google";
import { User } from "@/models/user";
import { createUser } from "@/services/users";
import { JwtMiddlware } from "@/middleware/jwt";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { signjwt } from "@/config/jwt";

const authRoute = new Hono()
  .post(
    "/signup",
    zValidator(
      "json",
      z.object({
        email: z.string().email(),
        password: z.string().min(6).max(20),
        name: z.string().min(2).max(50),
        avatar: z.string().optional(),
      })
    ),
    async (c) => {
      const { email, password, ...data } = await c.req.valid("json");

      if (!email || !password) {
        throw new HTTPException(400, {
          message: "Email and password are required",
        });
      }

      const existingUser = await User.findOne({ email: { $eq: email } }).exec();

      if (existingUser) {
        return c.json({ error: "User already exists" }, 409);
      }
      const user = await createUser({ email, password, ...data });

      const token = await signjwt({
        email: user.email,
        id: user._id.toString(),
        role: user.role,
      });

      return c.json({ token, user });
    }
  )
  .post("/signin", async (c) => {
    const { email, password } = await c.req.json();

    if (!email || !password) {
      throw new HTTPException(400, {
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email }).exec();
    if (!user) {
      const user = await createUser({
        email,
        password,
        name: "new user",
      });

      const token = await signjwt({
        email: user.email,
        id: user._id.toString(),
        role: user.role,
      });

      return c.json({ token, user });
    } else {
      const compare = await bcrypt.compareSync(password, user.password);
      if (!compare) {
        return c.json({ message: "Invalid credentials" }, 401);
      }
    }

    const token = await signjwt({
      email: user.email,
      id: user._id.toString(),
      role: user.role,
    });
    return c.json({ token, user });
  })
  .post("/signout", JwtMiddlware(), async (c) => {
    return c.json({ error: null }, 200);
  })
  .get("/session", JwtMiddlware(), async (c) => {
    const payload = c.get("jwtPayload");
    const user = await User.findById(payload.id).exec();
    if (!user) throw new HTTPException(401, { message: "user_not_found" });
    const token = await signjwt({
      email: user.email,
      id: user._id.toString(),
      role: user.role,
    });

    return c.json({ token, user });
  })
  .route("/google", googleRoute);

export default authRoute;
