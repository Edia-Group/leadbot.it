/**
 * NUCLEO Motore Workflow types. "L'AI non risponde solo. Agisce." - rules are
 * stored per-tenant as JSON (no drag-and-drop initially) and interpreted at
 * runtime: when an event fires, matching rules dispatch async actions
 * (email / PDF / WhatsApp / task).
 */

export type WorkspaceId = string;

export interface WorkflowEvent {
  workspaceId: WorkspaceId;
  /** e.g. "quote.created", "request.received", "deadline.approaching". */
  type: string;
  /** Arbitrary payload that conditions and action params read from. */
  data: Record<string, unknown>;
  occurredAt?: Date;
}

export type ConditionOperator =
  | "eq"
  | "neq"
  | "gt"
  | "gte"
  | "lt"
  | "lte"
  | "contains"
  | "exists"
  | "notExists";

export interface Condition {
  /** Dot-path into the event data, e.g. "quote.total". */
  field: string;
  operator: ConditionOperator;
  value?: unknown;
}

export type ConditionGroup =
  | { all: ConditionNode[] }
  | { any: ConditionNode[] };

export type ConditionNode = Condition | ConditionGroup;

export interface Action {
  /** e.g. "send_email", "send_whatsapp", "generate_pdf", "notify_owner". */
  type: string;
  /** Action params; string values may contain {{event.path}} templates. */
  params: Record<string, unknown>;
}

export interface WorkflowRule {
  id: string;
  workspaceId: WorkspaceId;
  name: string;
  /** Event type this rule reacts to. */
  trigger: string;
  /** Optional gating conditions; omitted/empty means "always". */
  conditions?: ConditionNode;
  actions: Action[];
  enabled: boolean;
}

export interface ActionInvocation {
  ruleId: string;
  action: Action;
  event: WorkflowEvent;
}

export type WorkflowRunStatus =
  | "pending"
  | "running"
  | "completed"
  | "failed";

export interface WorkflowRun {
  id: string;
  workspaceId: WorkspaceId;
  ruleId: string;
  status: WorkflowRunStatus;
  error?: string;
  createdAt: Date;
}
