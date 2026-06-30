# @typebot.io/rag

NUCLEO **Cervello Documentale** — document RAG core. Carichi una volta i
documenti aziendali (contratti, listini, procedure); il sistema li indicizza e
l'AI risponde usando dati reali, non allucinazioni.

This package is intentionally **portable and dependency-free** (uses the global
`fetch`, Node 22+): the storage layer is an interface so the core can be unit
tested and reused by the optional Python `ai-engine`.

## Pieces

| Module | Role |
|---|---|
| `chunker` | Recursive splitter tuned for Italian docs (512 chars / 50 overlap). |
| `embeddings` | `OpenAIEmbeddingProvider` (text-embedding-3-small) + `LocalEmbeddingProvider` (self-hosted bge-small, "dati in EU"). `createEmbeddingProvider(env)` picks one. |
| `store` / `adapters/prisma` | `RagStore` boundary + Postgres/pgvector implementation. |
| `ingest` | `ingestDocument`: persist → chunk → embed → store. |
| `retrieval` | `retrieve`: embed query → cosine search → top-K chunks. |

## Setup

1. Apply the schema (pgvector lives outside Prisma migrate for now):
   ```bash
   psql "$DATABASE_URL" -f packages/rag/migrations/0001_init_rag.sql
   ```
2. Configure embeddings via env: `OPENAI_API_KEY` (preferred) or
   `LOCAL_EMBEDDINGS_URL`. The embedding dimension must match the
   `vector(1536)` column.

## Usage

```ts
import { PrismaClient } from "@typebot.io/prisma";
import {
  createEmbeddingProvider,
  createPgVectorStore,
  ingestDocument,
  retrieve,
} from "@typebot.io/rag";

const prisma = new PrismaClient();
const store = createPgVectorStore(prisma);
const embeddings = createEmbeddingProvider(process.env);

// Ingest (content already extracted from the PDF/docx by a worker)
await ingestDocument({ store, embeddings }, {
  workspaceId,
  title: "Listino 2026",
  content: extractedText,
  sourceKey: "minio://docs/listino-2026.pdf",
});

// Query (called by the NucleoQuery forge block)
const chunks = await retrieve({ store, embeddings }, {
  workspaceId,
  query: "Qual è il prezzo del servizio premium?",
  topK: 5,
});
```

## Follow-ups
- Fold `RagDocument`/`RagChunk` into `packages/prisma` with
  `Unsupported("vector(1536)")` once the team is ready to manage the
  extension via Prisma.
- Document extraction workers (pdfplumber/mammoth equivalents) feed
  `content`; today extraction is the caller's responsibility.
- Optional reranking (cross-encoder) beyond ~10k chunks/tenant.
