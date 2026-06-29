/**
 * @typebot.io/workflow - NUCLEO Motore Workflow.
 *
 * If-this-then-that automation: an event fires, the workspace's JSON rules are
 * evaluated, and matching actions (email / PDF / WhatsApp / task) are run or
 * enqueued. Pure core (engine/conditions) + pluggable side-effects
 * (ActionExecutor, JobQueue, WorkflowStore).
 */
export type {
  WorkspaceId,
  WorkflowEvent,
  Condition,
  ConditionGroup,
  ConditionNode,
  ConditionOperator,
  Action,
  WorkflowRule,
  ActionInvocation,
  WorkflowRun,
  WorkflowRunStatus,
} from "./types";

export { evaluateRules } from "./engine";
export { evaluateCondition, evaluateConditions } from "./conditions";
export { renderString, renderParams } from "./template";
export { getPath, toNumber } from "./util";

export {
  ActionDispatcher,
  type ActionExecutor,
  type ActionContext,
} from "./actions";
export {
  type JobQueue,
  type Job,
  InMemoryJobQueue,
} from "./queue";
export {
  type WorkflowStore,
  type NewWorkflowRun,
  InMemoryWorkflowStore,
} from "./store";
export {
  handleEvent,
  type RunnerDeps,
  type HandleEventResult,
} from "./runner";
