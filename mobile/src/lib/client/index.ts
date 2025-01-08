import { authClient, AuthClient } from "./auth";

export type Client = {
  path: string;
  auth: AuthClient;
  post: (path: string, options?: RequestOptions) => Promise<any>;
  get: (path: string, options?: RequestOptions) => Promise<any>;
  update: (path: string, options?: RequestOptions) => Promise<any>;
  delete: (path: string, options?: RequestOptions) => Promise<any>;
};

type RequestOptions = {
  query?: Record<string, any>;
  json?: Record<string, any>;
  form?: FormData;
};

type FetchOptions = {
  method: string;
  headers: Record<string, string>;
  body?: string | FormData;
};

function createHeaders(contentType?: string): Record<string, string> {
  const headers: Record<string, string> = {};
  if (contentType) {
    headers["Content-Type"] = contentType;
  }
  if (client.auth.config.session?.token) {
    headers["Authorization"] = `Bearer ${client.auth.config.session?.token}`;
  }
  return headers;
}

function prepareFetchOptions(
  method: string,
  options?: RequestOptions
): FetchOptions {
  const fetchOptions: FetchOptions = {
    method,
    headers: createHeaders(),
  };

  if (options?.json) {
    fetchOptions.headers["Content-Type"] = "application/json";
    fetchOptions.body = JSON.stringify(options.json);
  } else if (options?.form) {
    // const formData = new FormData();
    // Object.entries(options.form).forEach(([key, value]) => {
    //   formData.append(key, value);
    // });
    fetchOptions.body = options?.form as FormData;
    // Don't set Content-Type for FormData, let the browser set it
    delete fetchOptions.headers["Content-Type"];
  }

  return fetchOptions;
}

const client: Client = {
  path: "your_api_path_here", // Replace with your actual API path
  auth: {} as AuthClient, // Replace with your actual AuthClient instance
  post: async (path, options) => {
    const url = new URL(client.path + path);
    if (options?.query) {
      Object.entries(options.query).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    }
    const fetchOptions = prepareFetchOptions("POST", options);
    return fetch(url, fetchOptions);
  },
  get: async (path, options) => {
    const url = new URL(client.path + path);
    if (options?.query) {
      Object.entries(options.query).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    }
    const fetchOptions = prepareFetchOptions("GET", options);
    return fetch(url, fetchOptions);
  },
  update: async (path, options) => {
    const url = new URL(client.path + path);
    if (options?.query) {
      Object.entries(options.query).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    }
    const fetchOptions = prepareFetchOptions("PUT", options);
    return fetch(url, fetchOptions);
  },
  delete: async (path, options) => {
    const url = new URL(client.path + path);
    if (options?.query) {
      Object.entries(options.query).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    }
    const fetchOptions = prepareFetchOptions("DELETE", options);
    return fetch(url, fetchOptions);
  },
};

export default client;
