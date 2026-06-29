import type {
  ChunkInput,
  DocumentInput,
  RetrievalQuery,
  RetrievedChunk,
  StoredDocument,
} from "./types";

/**
 * Storage boundary for the RAG engine. Implemented by a concrete adapter
 * (see adapters/prisma.ts) so the core stays portable and testable.
 * All methods are workspace-scoped.
 */
export interface RagStore {
  insertDocument(doc: DocumentInput): Promise<StoredDocument>;
  insertChunks(chunks: ChunkInput[]): Promise<void>;
  deleteDocument(workspaceId: string, documentId: string): Promise<void>;
  /** Vector similarity search; `embedding` is the query vector. */
  similaritySearch(
    query: RetrievalQuery & { embedding: number[] },
  ): Promise<RetrievedChunk[]>;
}
