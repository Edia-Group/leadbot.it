import type { RagStore } from "../store";
import type {
  ChunkInput,
  DocumentInput,
  RetrievalQuery,
  RetrievedChunk,
  StoredDocument,
} from "../types";

/**
 * Minimal surface of the Prisma client needed by the pgvector store, so this
 * package does not have to depend on `@prisma/client` directly. Pass the real
 * Prisma client from `@typebot.io/prisma` at the call site.
 */
export interface RawSqlClient {
  $executeRawUnsafe(query: string, ...values: unknown[]): Promise<number>;
  $queryRawUnsafe<T = unknown>(query: string, ...values: unknown[]): Promise<T>;
}

export interface PgVectorStoreOptions {
  /** Table holding documents. Default "RagDocument". */
  documentTable?: string;
  /** Table holding chunks + embeddings. Default "RagChunk". */
  chunkTable?: string;
}

const toVectorLiteral = (embedding: number[]): string =>
  `[${embedding.join(",")}]`;

interface DocumentRow {
  id: string;
  createdAt: Date;
}

interface ChunkRow {
  id: string;
  documentId: string;
  documentTitle: string;
  content: string;
  distance: number;
  metadata: Record<string, unknown> | null;
}

/**
 * Postgres + pgvector implementation of {@link RagStore}. Tables are created
 * by migrations/0001_init_rag.sql (kept outside the Prisma schema for now;
 * folding them in with an `Unsupported("vector")` column is a follow-up).
 */
export const createPgVectorStore = (
  client: RawSqlClient,
  options: PgVectorStoreOptions = {},
): RagStore => {
  const docTable = options.documentTable ?? "RagDocument";
  const chunkTable = options.chunkTable ?? "RagChunk";

  return {
    async insertDocument(doc: DocumentInput): Promise<StoredDocument> {
      const id = crypto.randomUUID();
      const metadata = doc.metadata ?? {};
      const rows = await client.$queryRawUnsafe<DocumentRow[]>(
        `INSERT INTO "${docTable}" (id, "workspaceId", title, metadata, "sourceKey")
         VALUES ($1, $2, $3, $4::jsonb, $5)
         RETURNING id, "createdAt"`,
        id,
        doc.workspaceId,
        doc.title,
        JSON.stringify(metadata),
        doc.sourceKey ?? null,
      );
      const row = rows[0];
      return {
        id,
        workspaceId: doc.workspaceId,
        title: doc.title,
        metadata,
        sourceKey: doc.sourceKey,
        createdAt: row?.createdAt ?? new Date(),
      };
    },

    async insertChunks(chunks: ChunkInput[]): Promise<void> {
      if (chunks.length === 0) return;
      const values: unknown[] = [];
      const tuples: string[] = [];
      let p = 1;
      for (const chunk of chunks) {
        tuples.push(
          `($${p++}, $${p++}, $${p++}, $${p++}, $${p++}, $${p++}::vector, $${p++}::jsonb)`,
        );
        values.push(
          crypto.randomUUID(),
          chunk.documentId,
          chunk.workspaceId,
          chunk.index,
          chunk.content,
          toVectorLiteral(chunk.embedding),
          JSON.stringify(chunk.metadata ?? {}),
        );
      }
      await client.$executeRawUnsafe(
        `INSERT INTO "${chunkTable}"
           (id, "documentId", "workspaceId", "index", content, embedding, metadata)
         VALUES ${tuples.join(", ")}`,
        ...values,
      );
    },

    async deleteDocument(
      workspaceId: string,
      documentId: string,
    ): Promise<void> {
      // Chunks cascade via FK; delete the document row.
      await client.$executeRawUnsafe(
        `DELETE FROM "${docTable}" WHERE id = $1 AND "workspaceId" = $2`,
        documentId,
        workspaceId,
      );
    },

    async similaritySearch(
      query: RetrievalQuery & { embedding: number[] },
    ): Promise<RetrievedChunk[]> {
      const topK = query.topK ?? 5;
      const rows = await client.$queryRawUnsafe<ChunkRow[]>(
        `SELECT c.id,
                c."documentId"            AS "documentId",
                d.title                   AS "documentTitle",
                c.content,
                c.metadata,
                (c.embedding <=> $1::vector) AS distance
         FROM "${chunkTable}" c
         JOIN "${docTable}" d ON d.id = c."documentId"
         WHERE c."workspaceId" = $2
         ORDER BY c.embedding <=> $1::vector
         LIMIT $3`,
        toVectorLiteral(query.embedding),
        query.workspaceId,
        topK,
      );
      const minScore = query.minScore ?? 0;
      return rows
        .map((row) => ({
          id: row.id,
          documentId: row.documentId,
          documentTitle: row.documentTitle,
          content: row.content,
          // cosine distance -> similarity
          score: 1 - row.distance,
          metadata: row.metadata ?? {},
        }))
        .filter((chunk) => chunk.score >= minScore);
    },
  };
};
