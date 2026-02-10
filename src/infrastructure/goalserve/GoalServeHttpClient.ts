import { HttpClient, HttpRequest } from "../../domain/ports/HttpClient";
import { withRetry } from "../../shared/utils/retry";
import { XMLParser } from "fast-xml-parser";

export type GoalServeHttpClientConfig = {
  baseUrl: string;
  apiKey: string;
  apiKeyMode?: "query" | "path";
  timeoutMs: number;
};

export class GoalServeHttpClient implements HttpClient {
  private readonly baseUrl: string;
  private readonly apiKey: string;
  private readonly timeoutMs: number;
  private readonly apiKeyMode: "query" | "path";
  private readonly xmlParser: XMLParser;

  constructor(config: GoalServeHttpClientConfig) {
    this.baseUrl = config.baseUrl;
    this.apiKey = config.apiKey;
    this.timeoutMs = config.timeoutMs;
    this.apiKeyMode = config.apiKeyMode ?? "query";
    this.xmlParser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "",
      parseTagValue: true,
      trimValues: true,
    });
  }

  async get<T>(request: HttpRequest): Promise<T> {
    const base = this.baseUrl.endsWith("/") ? this.baseUrl : `${this.baseUrl}/`;
    const safePath = request.path.replace(/^\//, "");
    const pathPrefix = this.apiKeyMode === "path" ? `${this.apiKey}/` : "";
    const url = new URL(base + pathPrefix + safePath);
    if (this.apiKeyMode === "query") {
      url.searchParams.set("key", this.apiKey);
    }
    if (request.query) {
      Object.entries(request.query).forEach(([key, value]) => {
        if (value !== undefined) {
          url.searchParams.set(key, String(value));
        }
      });
    }

    const timeout = request.timeoutMs ?? this.timeoutMs;

    return withRetry(
      async () => {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), timeout);
        try {
          const response = await fetch(url.toString(), { signal: controller.signal });
          if (!response.ok) {
            const body = await response.text();
            throw new Error(`GoalServe HTTP ${response.status}: ${body.slice(0, 200)}`);
          }
          const body = await response.text();
          const trimmed = body.trim();
          if (trimmed.startsWith("<")) {
            return this.xmlParser.parse(body) as T;
          }
          try {
            return JSON.parse(body) as T;
          } catch (error) {
            throw new Error(`GoalServe returned non-JSON: ${body.slice(0, 200)}`);
          }
        } finally {
          clearTimeout(timer);
        }
      },
      {
        retries: 3,
        baseDelayMs: 500,
        maxDelayMs: 3000,
      },
    );
  }
}
