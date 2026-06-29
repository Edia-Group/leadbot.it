-- NUCLEO Motore Workflow - schema (Fase 2).
-- Rules are stored as JSON per tenant (no drag-and-drop initially); run history
-- powers the dashboard's status/audit view.

CREATE TABLE IF NOT EXISTS "WorkflowRule" (
  id            text PRIMARY KEY,
  "workspaceId" text NOT NULL,
  name          text NOT NULL,
  trigger       text NOT NULL,
  conditions    jsonb,
  actions       jsonb NOT NULL DEFAULT '[]',
  enabled       boolean NOT NULL DEFAULT true,
  "createdAt"   timestamptz NOT NULL DEFAULT now(),
  "updatedAt"   timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS "WorkflowRule_workspace_trigger_idx"
  ON "WorkflowRule" ("workspaceId", trigger) WHERE enabled;

CREATE TABLE IF NOT EXISTS "WorkflowRun" (
  id            text PRIMARY KEY,
  "workspaceId" text NOT NULL,
  "ruleId"      text NOT NULL REFERENCES "WorkflowRule"(id) ON DELETE CASCADE,
  status        text NOT NULL DEFAULT 'pending',
  error         text,
  "createdAt"   timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS "WorkflowRun_workspaceId_idx"
  ON "WorkflowRun" ("workspaceId");
