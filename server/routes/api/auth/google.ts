import { Hono } from "hono";
import { google } from "googleapis";
import { validRedirect } from "@/config/oauthRedirectUrls";
import { signjwt } from "@/config/jwt";
import { createUser } from "@/services/users";
import { User } from "@/models/user";
import { HTTPException } from "hono/http-exception";
import bcrypt from "bcryptjs";

function oauth2Client(redirect: string) {
  return new google.auth.OAuth2(
    process.env.GOOGLE_ID,
    process.env.GOOGLE_SECRET,
    redirect
  );
}

const googleRoute = new Hono()
  .get("/", async (c) => {
    const { redirect } = c.req.query();
    const redirect_uri = redirect ?? c.req.url + "/callback";
    console.log("redirect_uri :>> ", redirect_uri);
    const client = oauth2Client(redirect_uri);
    const url = client.generateAuthUrl({
      access_type: "offline",
      redirect_uri,
      scope: [
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile",
      ],
    });
    return c.json({ url });
  })
  .get("/callback", async (c) => {
    const { code, redirect } = c.req.query();
    const url = new URL(c.req.url);
    const origin = url.origin + url.pathname;
    const redirect_uri = redirect ?? origin;

    if (!validRedirect(redirect_uri)) {
      return c.json({ error: "Invalid redirect URL" }, 400);
    }
    const client = oauth2Client(redirect_uri);

    const { tokens } = await client.getToken(code);

    client.setCredentials(tokens);

    const oauth2 = google.oauth2({ version: "v2", auth: client });
    const { data } = await oauth2.userinfo.get();
    if (!data.email) {
      throw new HTTPException(400, { message: " email is required" });
    }
    const user = await User.findOne({ email: data.email }).exec();
    if (!user) {
      const user = await createUser({
        email: data.email,
        name: data.given_name ?? "user name",
        avatar: data.picture ?? "",
        password: bcrypt.genSaltSync(10),
      });

      const token = await signjwt({
        email: user.email,
        id: user._id,
        roles: ["user"],
      });

      return c.json({ token, user });
    }

    const token = await signjwt({
      email: user.email,
      id: user._id,
      roles: ["user"],
    });
    return c.json({ token, user });
  });

export default googleRoute;
