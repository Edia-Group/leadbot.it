# NUCLEO Knowledge Base block (`nucleo-query`)

Forge block that grounds chatbot answers in a tenant's documents. It calls the
NUCLEO RAG endpoint (see `@typebot.io/rag`) with a workspace-scoped API key and
saves the retrieved **Context** (and optional **Sources**) into variables —
typically piped into an LLM block next.

- **Auth:** `apiKey` (workspace-scoped; identifies the tenant).
- **Base URL:** `apiBaseUrl` option, default `https://app.nucleoai.it/api/rag`.
- **Action:** *Query Knowledge Base* → `POST {baseUrl}/query { query }` →
  `{ context, sources }`.

## Registration (follow-up — not yet wired into the builder)

This block compiles standalone (`bun run check-types`) but is **not** registered
in the forge registry yet, so it does not appear in the editor. To enable it:

1. Add the dependency in `packages/forge/repository/package.json`:
   `"@typebot.io/nucleo-query-block": "workspace:*"`.
2. Re-run the forge codegen (regenerates the "do not edit" files):
   `packages/forge/repository/src/{definitions,handlers,schemas,constants}.ts`.
   Either run the CLI (`cd packages/forge/cli && bun start`) or add manually:
   - `definitions.ts`: `import { nucleoQueryBlock } from "@typebot.io/nucleo-query-block";` and `[nucleoQueryBlock.id]: nucleoQueryBlock,`
   - `handlers.ts` / `schemas.ts`: mirror an existing block's entries.
3. `bun install` to link the new workspace package, then
   `bun run check-types` at the repo root.
4. Add editor i18n labels if needed and a server endpoint that implements
   `POST /api/rag/query` backed by `@typebot.io/rag`.
