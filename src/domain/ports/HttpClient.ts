export type HttpRequest = {
  path: string;
  query?: Record<string, string | number | boolean | undefined>;
  timeoutMs?: number;
};

export interface HttpClient {
  get<T>(request: HttpRequest): Promise<T>;
}

