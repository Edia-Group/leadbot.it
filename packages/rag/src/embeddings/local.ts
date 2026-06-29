import type { EmbeddingProvider } from "./types";

export interface LocalEmbeddingConfig {
  /** OpenAI-compatible /embeddings endpoint of a self-hosted model server. */
  baseUrl: string;
  /** Default: BAAI/bge-small-en-v1.5. */
  model?: string;
  /** Default: 384 (bge-small). */
  dimensions?: number;
  /** Optional bearer token if the local server requires auth. */
  apiKey?: string;
}

interface EmbeddingResponse {
  data: Array<{ embedding: number[]; index: number }>;
}

const isEmbeddingResponse = (v: unknown): v is EmbeddingResponse =>
  typeof v === "object" &&
  v !== null &&
  Array.isArray((v as { data?: unknown }).data);

/**
 * Self-hosted embeddings (e.g. a local bge-small server, or the NUCLEO
 * ai-engine) exposing the OpenAI-compatible embeddings schema. Keeps data
 * in EU / on-prem.
 */
export class LocalEmbeddingProvider implements EmbeddingProvider {
  readonly id: string;
  readonly dimensions: number;
  private readonly baseUrl: string;
  private readonly model: string;
  private readonly apiKey?: string;

  constructor(config: LocalEmbeddingConfig) {
    this.baseUrl = config.baseUrl.replace(/\/$/, "");
    this.model = config.model ?? "BAAI/bge-small-en-v1.5";
    this.dimensions = config.dimensions ?? 384;
    this.apiKey = config.apiKey;
    this.id = `local:${this.model}`;
  }

  async embed(texts: string[]): Promise<number[][]> {
    if (texts.length === 0) return [];
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (this.apiKey) headers.Authorization = `Bearer ${this.apiKey}`;
    const res = await fetch(`${this.baseUrl}/embeddings`, {
      method: "POST",
      headers,
      body: JSON.stringify({ model: this.model, input: texts }),
    });
    if (!res.ok) {
      const detail = await res.text();
      throw new Error(
        `Local embeddings failed (${res.status}): ${detail.slice(0, 500)}`,
      );
    }
    const json: unknown = await res.json();
    if (!isEmbeddingResponse(json))
      throw new Error("Unexpected local embeddings response shape");
    return json.data
      .slice()
      .sort((a, b) => a.index - b.index)
      .map((d) => d.embedding);
  }
}
