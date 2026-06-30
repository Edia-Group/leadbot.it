import type { EmbeddingProvider } from "./embeddings/types";
import type { RagStore } from "./store";
import type { RetrievalQuery, RetrievedChunk } from "./types";

export interface RetrieveDeps {
  store: RagStore;
  embeddings: EmbeddingProvider;
}

const DEFAULT_TOP_K = 5;

/**
 * Embed the query and return the most similar chunks for the workspace.
 * This is what the NucleoQuery forge block calls to ground answers in the
 * tenant's real documents instead of hallucinating.
 */
export const retrieve = async (
  deps: RetrieveDeps,
  query: RetrievalQuery,
): Promise<RetrievedChunk[]> => {
  const [embedding] = await deps.embeddings.embed([query.query]);
  if (!embedding) return [];
  return deps.store.similaritySearch({
    ...query,
    topK: query.topK ?? DEFAULT_TOP_K,
    embedding,
  });
};
