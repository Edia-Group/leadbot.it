-- NUCLEO Cervello Documentale - pgvector schema (Fase 1).
-- Managed outside Prisma migrate for now (pgvector needs the `vector` type;
-- folding these into packages/prisma with Unsupported("vector(1536)") is a
-- follow-up). Run once against the app database.
--
-- NOTE: the embedding dimension (1536) must match the active embedding
-- provider. text-embedding-3-small = 1536; bge-small = 384. Changing
-- providers means recreating the column + reindexing.

CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE IF NOT EXISTS "RagDocument" (
  id           text PRIMARY KEY,
  "workspaceId" text NOT NULL,
  title        text NOT NULL,
  metadata     jsonb NOT NULL DEFAULT '{}',
  "sourceKey"  text,
  "createdAt"  timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS "RagDocument_workspaceId_idx"
  ON "RagDocument" ("workspaceId");

CREATE TABLE IF NOT EXISTS "RagChunk" (
  id           text PRIMARY KEY,
  "documentId" text NOT NULL REFERENCES "RagDocument"(id) ON DELETE CASCADE,
  "workspaceId" text NOT NULL,
  "index"      integer NOT NULL,
  content      text NOT NULL,
  embedding    vector(1536) NOT NULL,
  metadata     jsonb NOT NULL DEFAULT '{}'
);
CREATE INDEX IF NOT EXISTS "RagChunk_workspaceId_idx"
  ON "RagChunk" ("workspaceId");

-- HNSW index for fast cosine similarity search (pgvector >= 0.5).
CREATE INDEX IF NOT EXISTS "RagChunk_embedding_idx"
  ON "RagChunk" USING hnsw (embedding vector_cosine_ops);
