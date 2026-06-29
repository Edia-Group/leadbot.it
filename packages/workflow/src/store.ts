import type { WorkflowRule, WorkflowRun, WorkspaceId } from "./types";

export type NewWorkflowRun = Omit<WorkflowRun, "id" | "createdAt">;

/**
 * Persistence boundary. Rules and run history live in PostgreSQL (see
 * migrations/0001_init_workflow.sql); a Prisma/pgvector-style raw-SQL adapter
 * mirrors packages/rag and is a follow-up.
 */
export interface WorkflowStore {
  /** Enabled rules for a workspace, optionally filtered by trigger type. */
  loadRules(workspaceId: WorkspaceId, trigger?: string): Promise<WorkflowRule[]>;
  recordRun(run: NewWorkflowRun): Promise<WorkflowRun>;
  updateRun(
    id: string,
    patch: Partial<Pick<WorkflowRun, "status" | "error">>,
  ): Promise<void>;
}

/** In-memory store: fully functional for demos/tests (no DB required). */
export class InMemoryWorkflowStore implements WorkflowStore {
  private readonly rules: WorkflowRule[];
  private readonly runs = new Map<string, WorkflowRun>();

  constructor(rules: WorkflowRule[] = []) {
    this.rules = rules;
  }

  async loadRules(
    workspaceId: WorkspaceId,
    trigger?: string,
  ): Promise<WorkflowRule[]> {
    return this.rules.filter(
      (rule) =>
        rule.workspaceId === workspaceId &&
        rule.enabled &&
        (trigger === undefined || rule.trigger === trigger),
    );
  }

  async recordRun(run: NewWorkflowRun): Promise<WorkflowRun> {
    const stored: WorkflowRun = {
      ...run,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };
    this.runs.set(stored.id, stored);
    return stored;
  }

  async updateRun(
    id: string,
    patch: Partial<Pick<WorkflowRun, "status" | "error">>,
  ): Promise<void> {
    const existing = this.runs.get(id);
    if (existing) this.runs.set(id, { ...existing, ...patch });
  }
}
