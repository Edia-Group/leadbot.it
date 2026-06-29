import { type ChunkOptions, splitText } from "./chunker";
import type { EmbeddingProvider } from "./embeddings/types";
import type { RagStore } from "./store";
import type { ChunkInput, DocumentInput, StoredDocument } from "./types";

export interface IngestDeps {
  store: RagStore;
  embeddings: EmbeddingProvider;
  chunkOptions?: ChunkOptions;
}

export interface IngestResult {
  document: StoredDocument;
  chunkCount: number;
}

/**
 * Ingest a document end-to-end: persist it, chunk the text, embed every
 * chunk, and store the vectors. The original file (PDF/docx) is expected to
 * have already been extracted to `input.content` by the caller's worker.
 */
export const ingestDocument = async (
  deps: IngestDeps,
  input: DocumentInput,
): Promise<IngestResult> => {
  const document = await deps.store.insertDocument(input);
  const pieces = splitText(input.content, deps.chunkOptions);
  if (pieces.length === 0) return { document, chunkCount: 0 };

  const vectors = await deps.embeddings.embed(pieces);
  if (vectors.length !== pieces.length)
    throw new Error(
      `Embedding count mismatch: ${vectors.length} vectors for ${pieces.length} chunks`,
    );

  // Lengths are guaranteed equal by the check above.
  const chunks: ChunkInput[] = pieces.map((content, i) => ({
    documentId: document.id,
    workspaceId: input.workspaceId,
    index: i,
    content,
    embedding: vectors[i],
  }));

  await deps.store.insertChunks(chunks);
  return { document, chunkCount: chunks.length };
};
