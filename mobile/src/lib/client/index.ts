import { AuthClient, authClient } from "./auth";

export type Client = {
  path: string;
  auth: AuthClient;
  post: (path: string, data: object) => Promise<any>;
  get: (path: string) => Promise<any>;
  update: (path: string, data: object) => Promise<any>;
  delete: (path: string) => Promise<any>;
};

type AuthConfig = {
  token?: string;
};
export function initClient(config: {
  path: string;
  authConfig: AuthConfig;
}): Client {
  const client: Client = {} as Client;

  client.path = config.path;
  client.auth = authClient(client, config.authConfig);
  function headers() {
    const headers: any = {
      "Content-Type": "application/json",
    };
    if (config.authConfig.token) {
      headers["Authorization"] = `Bearer ${config.authConfig.token}`;
    }
    return headers;
  }
  client.post = async (path, data) => {
    return fetch(client.path + path, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(data),
    });
  };
  client.get = async (path) => {
    return fetch(client.path + path, {
      method: "GET",
      headers: headers(),
    });
  };
  client.update = async (path, data) => {
    return fetch(client.path + path, {
      method: "PUT",
      headers: headers(),
      body: JSON.stringify(data),
    });
  };
  client.delete = async (path) => {
    return fetch(client.path + path, {
      method: "DELETE",
      headers: headers(),
    });
  };

  return client;
}
