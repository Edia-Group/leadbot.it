/**
 * @typebot.io/rag - NUCLEO "Cervello Documentale" core.
 *
 * Document RAG building blocks: recursive chunking, pluggable embeddings
 * (OpenAI + self-hosted), a storage boundary, and a Postgres/pgvector
 * adapter. Wire it to the NucleoQuery forge block to ground chatbot answers
 * in a tenant's real documents.
 */
export type {
  WorkspaceId,
  DocumentInput,
  StoredDocument,
  ChunkInput,
  RetrievedChunk,
  RetrievalQuery,
} from "./types";

export {
  splitText,
  DEFAULT_CHUNK_OPTIONS,
  type ChunkOptions,
} from "./chunker";

export {
  type EmbeddingProvider,
  OpenAIEmbeddingProvider,
  type OpenAIEmbeddingConfig,
  LocalEmbeddingProvider,
  type LocalEmbeddingConfig,
  createEmbeddingProvider,
  type EmbeddingEnv,
} from "./embeddings/index";

export type { RagStore } from "./store";
export {
  createPgVectorStore,
  type RawSqlClient,
  type PgVectorStoreOptions,
} from "./adapters/prisma";

export {
  ingestDocument,
  type IngestDeps,
  type IngestResult,
} from "./ingest";
export { retrieve, type RetrieveDeps } from "./retrieval";
