import { Client } from ".";

type SignInOptions = {
  email: string;
  password: string;
  metadata: { name: string; full_name?: string };
};
type UserInfo = {
  id: string;
  email: string;
  name: string;
  full_name: string;
};
type oauthOptions = { provider: "google"; redirect: string };
type oauthOptionstoken = { code: string; provider: "google"; redirect: string };
type AuthResponse = { token: string; user: UserInfo };
export type AuthClient = {
  client: Client;
  config: null | { provider?: "google" | "email"; token?: string };
  oauth: (options: oauthOptions) => Promise<{ url: string }>;
  oauthToken: (options: oauthOptionstoken) => Promise<AuthResponse>;
  signin: (options: SignInOptions) => Promise<AuthResponse>;
  signout: () => Promise<{ error: string }>;
  signup: (options: {
    email: string;
    password: string;
  }) => Promise<AuthResponse>;
};

export function authClient(
  client: Client,
  config: { token?: string }
): AuthClient {
  async function oauth(options: oauthOptions): Promise<{ url: string }> {
    return await client
      .get("/auth/google?redirect=" + options.redirect)
      .then(async (c) => c.json() as { url: string });
  }
  async function oauthToken(options: oauthOptionstoken): Promise<AuthResponse> {
    return await client
      .get(
        "/auth/google/callback?redirect=" +
          options.redirect +
          "&code=" +
          options.code
      )
      .then(async (c) => c.json() as AuthResponse);
  }
  async function signin(options: SignInOptions): Promise<AuthResponse> {
    return await client
      .post("/auth/signin", options)
      .then(async (c) => c.json() as AuthResponse);
  }

  async function signout(): Promise<{ error: string }> {
    // Handle sign-out logic
    return await client.post("/auth/signout", {}).then(async (c) => c.json());
  }

  async function signup(options: {
    email: string;
    password: string;
  }): Promise<AuthResponse> {
    const { email, password } = options;
    // Handle sign-up logic
    return await client
      .post("/auth/signup", { email, password })
      .then(async (c) => c.json());
  }

  return {
    client,
    config,
    oauth,
    oauthToken,
    signin,
    signout,
    signup,
  };
}
