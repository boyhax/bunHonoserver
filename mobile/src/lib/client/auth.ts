import { Session, User } from "@/types";
import { Client } from ".";

type SignInOptions = {
  email: string;
  password: string;
  metadata: { name: string; full_name?: string };
};

type oauthOptions = { provider: "google"; redirect: string };
type oauthOptionstoken = { code: string; provider: "google"; redirect: string };
type AuthConfig = {
  session: Session | null;
  onAuthChange?: (session: Session | null) => void;
};

export type AuthClient = {
  config: AuthConfig;
  oauth: (options: oauthOptions) => Promise<{ url: string }>;
  oauthToken: (options: oauthOptionstoken) => Promise<Session>;
  signin: (options: SignInOptions) => Promise<Session>;
  signout: () => Promise<{ error: string }>;
  signup: (options: { email: string; password: string }) => Promise<Session>;
};

export function authClient(
  client: Client,
  config: {
    session: Session | null;
    onAuthChange?: (session: Session | null) => void;
  }
): AuthClient {
  async function oauth(options: oauthOptions): Promise<{ url: string }> {
    return await client
      .get("/auth/google?redirect=" + options.redirect)
      .then(async (c) => c.json() as { url: string });
  }
  async function oauthToken(options: oauthOptionstoken): Promise<Session> {
    return await client
      .get(
        "/auth/google/callback?redirect=" +
          options.redirect +
          "&code=" +
          options.code
      )
      .then(async (c) => {
        const body = await c.json();
        if (!body.token) {
          throw Error("user_sign_in_failed:Reason=>" + body?.error);
        }
        config.session = body;
        config.onAuthChange && config.onAuthChange(null);
        return config.session as Session;
      });
  }
  async function signin(options: SignInOptions): Promise<Session> {
    return await client
      .post("/auth/signin", { json: options })
      .then(async (c) => {
        const body = await c.json();
        if (!body.token) {
          throw Error("user_sign_in_failed:Reason=>" + body?.error);
        }
        config.session = body;
        config.onAuthChange && config.onAuthChange(null);
        return config.session as Session;
      });
  }

  async function signout(): Promise<{ error: string }> {
    // Handle sign-out logic
    return await client.post("/auth/signout", {}).then(async (c) => {
      config.session = null;
      config.onAuthChange && config.onAuthChange(null);
      return c.json();
    });
  }

  async function signup(options: {
    email: string;
    password: string;
  }): Promise<Session> {
    const { email, password } = options;
    // Handle sign-up logic
    return await client
      .post("/auth/signup", { json: { email, password } })
      .then(async (c) => {
        const body = await c.json();
        if (!body.token) {
          throw Error("user_sign_in_failed:Reason=>" + body?.error);
        }
        config.session = body;
        config.onAuthChange && config.onAuthChange(null);
        return config.session as Session;
      });
  }

  return {
    config,
    oauth,
    oauthToken,
    signin,
    signout,
    signup,
  };
}
