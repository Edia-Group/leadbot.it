/**
 * Pluggable embedding provider. NUCLEO ships an OpenAI provider
 * (text-embedding-3-small, 1536 dims) and a local/self-hosted fallback
 * (OpenAI-compatible endpoint, e.g. BAAI/bge-small) so that "dati in EU"
 * is a real option, not a nice-to-have.
 */
export interface EmbeddingProvider {
  /** Stable identifier, e.g. "openai:text-embedding-3-small". */
  readonly id: string;
  /** Vector dimensionality; must match the pgvector column. */
  readonly dimensions: number;
  /** Embed a batch of texts, preserving order. */
  embed(texts: string[]): Promise<number[][]>;
}
