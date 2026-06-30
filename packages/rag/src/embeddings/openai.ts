import type { EmbeddingProvider } from "./types";

export interface OpenAIEmbeddingConfig {
  apiKey: string;
  /** Default: text-embedding-3-small. */
  model?: string;
  /** Default: 1536 (text-embedding-3-small native size). */
  dimensions?: number;
  /** Override for Azure / proxies. Default: https://api.openai.com/v1 */
  baseUrl?: string;
}

interface OpenAIEmbeddingResponse {
  data: Array<{ embedding: number[]; index: number }>;
}

const isEmbeddingResponse = (v: unknown): v is OpenAIEmbeddingResponse =>
  typeof v === "object" &&
  v !== null &&
  Array.isArray((v as { data?: unknown }).data);

/**
 * Embeddings via the OpenAI REST API. Uses the global `fetch` (Node 22+),
 * so the package stays dependency-free.
 */
export class OpenAIEmbeddingProvider implements EmbeddingProvider {
  readonly id: string;
  readonly dimensions: number;
  private readonly apiKey: string;
  private readonly model: string;
  private readonly baseUrl: string;

  constructor(config: OpenAIEmbeddingConfig) {
    this.apiKey = config.apiKey;
    this.model = config.model ?? "text-embedding-3-small";
    this.dimensions = config.dimensions ?? 1536;
    this.baseUrl = config.baseUrl ?? "https://api.openai.com/v1";
    this.id = `openai:${this.model}`;
  }

  async embed(texts: string[]): Promise<number[][]> {
    if (texts.length === 0) return [];
    const res = await fetch(`${this.baseUrl}/embeddings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: this.model,
        input: texts,
        dimensions: this.dimensions,
      }),
    });
    if (!res.ok) {
      const detail = await res.text();
      throw new Error(
        `OpenAI embeddings failed (${res.status}): ${detail.slice(0, 500)}`,
      );
    }
    const json: unknown = await res.json();
    if (!isEmbeddingResponse(json))
      throw new Error("Unexpected OpenAI embeddings response shape");
    return json.data
      .slice()
      .sort((a, b) => a.index - b.index)
      .map((d) => d.embedding);
  }
}
