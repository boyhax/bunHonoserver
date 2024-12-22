import { Hono } from "hono";
import { google } from "googleapis";
import { validRedirect } from "@server/config/oauthRedirectUrls";
import { signjwt } from "@server/config/jwt";

function oauth2Client(redirect: string) {
  return new google.auth.OAuth2(
    process.env.GOOGLE_ID,
    process.env.GOOGLE_SECRET,
    redirect
  );
}

// Simulated user database (replace with your actual database in production)
const users = [];

// JWT middleware configuration

// Email/Password Sign Up
const googleRoute = new Hono()
  .get("/", async (c) => {
    const { redirect } = c.req.query();
    const redirect_uri = redirect ?? c.req.url + "/callback";
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
    console.log("userinfo :>> ", data);
    let user = users.find((user) => user.email === data.email);
    if (!user) {
      user = { id: users.length + 1, email: data.email, name: data.name };
      users.push(user);
    }

    const token = await signjwt({
      email: user.email,
      id: user.id,
      roles: ["user"],
    });
    return c.json({ token: token, user: data });
  });

export default googleRoute;
