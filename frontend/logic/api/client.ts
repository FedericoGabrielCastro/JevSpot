export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type ApiClientConfig = {
  fetch?: typeof fetch;
};

export type ApiRequestOptions = {
  method?: HttpMethod;
  body?: unknown;
  signal?: AbortSignal;
};

export class ApiError extends Error {
  readonly status: number;
  readonly path: string;

  constructor(message: string, status: number, path: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.path = path;
  }
}

export type ApiClient = {
  request<T>(path: string, options?: ApiRequestOptions): Promise<T>;
  get<T>(path: string, signal?: AbortSignal): Promise<T>;
  post<T>(path: string, body?: unknown, signal?: AbortSignal): Promise<T>;
};

function toPath(path: string): string {
  return path.startsWith("/") ? path : `/${path}`;
}

export function createApiClient(config: ApiClientConfig = {}): ApiClient {
  const request = config.fetch ?? fetch;

  async function send<T>(
    path: string,
    options: ApiRequestOptions = {},
  ): Promise<T> {
    const response = await request(toPath(path), {
      method: options.method ?? "GET",
      signal: options.signal,
      headers:
        options.body === undefined
          ? undefined
          : { "Content-Type": "application/json" },
      body:
        options.body === undefined ? undefined : JSON.stringify(options.body),
    });

    if (!response.ok) {
      throw new ApiError(
        `Request to ${path} failed with status ${response.status}`,
        response.status,
        path,
      );
    }

    if (response.status === 204) {
      return undefined as T;
    }

    return (await response.json()) as T;
  }

  return {
    request: send,
    get: <T>(path: string, signal?: AbortSignal) =>
      send<T>(path, { method: "GET", signal }),
    post: <T>(path: string, body?: unknown, signal?: AbortSignal) =>
      send<T>(path, { method: "POST", body, signal }),
  };
}
