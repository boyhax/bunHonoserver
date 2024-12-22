import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import bcrypt from "bcryptjs";
import googleRoute from "./google";
import { signjwt } from "@server/config/jwt";
import { User } from "@server/models/user";
import { createUser } from "@server/services/users";

const authRoute = new Hono()
  .post("/signup", async (c) => {
    const { email, password, metadata } = await c.req.json();

    if (!email || !password) {
      throw new HTTPException(400, {
        message: "Email and password are required",
      });
    }

    const existingUser = await User.findOne({ email: { $eq: email } }).exec();

    if (existingUser) {
      return c.json({ error: "User already exists" }, 409);
    }
    const user = await createUser({ email, password, metadata });

    const token = await signjwt({
      email: user.email,
      id: user._id,
      roles: ["user"],
    });
    delete user.password;
    return c.json({ token, user });
  })
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
        metadata: { name: "new user" },
      });

      const token = await signjwt({
        email: user.email,
        id: user._id,
        roles: ["user"],
      });
      delete user.password;
      return c.json({ token, user });
    } else {
      const compare = await bcrypt.compareSync(password, user.password);
      if (!compare) {
        return c.json({ message: "Invalid credentials" }, 401);
      }
    }

    const token = await signjwt({
      email: user.email,
      id: user._id,
      roles: ["user"],
    });
    delete user.password;
    return c.json({ token, user });
  })
  .get("/session", async (c) => {
    // const payload = c.get("jwtPayload");

    const session = {},
      user = {};
    return c.json({ session, user });
  })
  .route("/google", googleRoute);

export default authRoute;
