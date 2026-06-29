/**
 * Core domain types for the NUCLEO "Cervello Documentale" (document RAG).
 *
 * Multi-tenancy follows the repo convention: every row is scoped by
 * `workspaceId` (see Workspace in packages/prisma). Never query across
 * workspaces without an explicit `workspaceId` filter.
 */

export type WorkspaceId = string;

export interface DocumentInput {
  workspaceId: WorkspaceId;
  title: string;
  /** Plain text already extracted from the source file (PDF/docx/etc.). */
  content: string;
  metadata?: Record<string, unknown>;
  /** Reference to the original file in object storage (e.g. MinIO key). */
  sourceKey?: string;
}

export interface StoredDocument {
  id: string;
  workspaceId: WorkspaceId;
  title: string;
  metadata: Record<string, unknown>;
  sourceKey?: string;
  createdAt: Date;
}

export interface ChunkInput {
  documentId: string;
  workspaceId: WorkspaceId;
  /** Position of the chunk within its document (0-based). */
  index: number;
  content: string;
  embedding: number[];
  metadata?: Record<string, unknown>;
}

export interface RetrievedChunk {
  id: string;
  documentId: string;
  documentTitle: string;
  content: string;
  /** Cosine similarity in [0,1]; 1 means identical direction. */
  score: number;
  metadata: Record<string, unknown>;
}

export interface RetrievalQuery {
  workspaceId: WorkspaceId;
  query: string;
  /** Max chunks to return. Default 5. */
  topK?: number;
  /** Drop chunks below this cosine similarity. Default 0 (no floor). */
  minScore?: number;
}
