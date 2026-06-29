import { LocalEmbeddingProvider } from "./local";
import { OpenAIEmbeddingProvider } from "./openai";
import type { EmbeddingProvider } from "./types";

export type { EmbeddingProvider } from "./types";
export { OpenAIEmbeddingProvider, type OpenAIEmbeddingConfig } from "./openai";
export { LocalEmbeddingProvider, type LocalEmbeddingConfig } from "./local";

export interface EmbeddingEnv {
  /** If set, OpenAI is preferred. */
  OPENAI_API_KEY?: string;
  OPENAI_EMBEDDING_MODEL?: string;
  /** If set (and no OpenAI key), the local provider is used. */
  LOCAL_EMBEDDINGS_URL?: string;
  LOCAL_EMBEDDINGS_MODEL?: string;
}

/**
 * Pick an embedding provider from env: OpenAI when a key is present,
 * otherwise the self-hosted ("dati in EU") fallback. Throws if neither
 * is configured so misconfiguration fails loudly at startup.
 */
export const createEmbeddingProvider = (
  env: EmbeddingEnv,
): EmbeddingProvider => {
  if (env.OPENAI_API_KEY)
    return new OpenAIEmbeddingProvider({
      apiKey: env.OPENAI_API_KEY,
      model: env.OPENAI_EMBEDDING_MODEL,
    });
  if (env.LOCAL_EMBEDDINGS_URL)
    return new LocalEmbeddingProvider({
      baseUrl: env.LOCAL_EMBEDDINGS_URL,
      model: env.LOCAL_EMBEDDINGS_MODEL,
    });
  throw new Error(
    "No embedding provider configured: set OPENAI_API_KEY or LOCAL_EMBEDDINGS_URL",
  );
};
