import type { ActionDispatcher } from "./actions";
import { evaluateRules } from "./engine";
import type { JobQueue } from "./queue";
import type { WorkflowStore } from "./store";
import type { ActionInvocation, WorkflowEvent } from "./types";

export interface RunnerDeps {
  store: WorkflowStore;
  dispatcher: ActionDispatcher;
  /** If provided, invocations are enqueued instead of run inline. */
  queue?: JobQueue;
}

export interface HandleEventResult {
  matched: number;
  dispatched: number;
  failures: Array<{ invocation: ActionInvocation; error: string }>;
}

/**
 * Entry point: load the workspace rules for the event, evaluate them, and run
 * (or enqueue) the resulting actions. Each invocation is recorded as a
 * WorkflowRun so the dashboard can show status/audit.
 */
export const handleEvent = async (
  deps: RunnerDeps,
  event: WorkflowEvent,
): Promise<HandleEventResult> => {
  const rules = await deps.store.loadRules(event.workspaceId, event.type);
  const invocations = evaluateRules(event, rules);

  const result: HandleEventResult = {
    matched: invocations.length,
    dispatched: 0,
    failures: [],
  };

  for (const invocation of invocations) {
    const run = await deps.store.recordRun({
      workspaceId: event.workspaceId,
      ruleId: invocation.ruleId,
      status: deps.queue ? "pending" : "running",
    });
    try {
      if (deps.queue) {
        await deps.queue.enqueue(invocation);
      } else {
        await deps.dispatcher.dispatch(invocation);
        await deps.store.updateRun(run.id, { status: "completed" });
      }
      result.dispatched++;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      await deps.store.updateRun(run.id, {
        status: "failed",
        error: message,
      });
      result.failures.push({ invocation, error: message });
    }
  }

  return result;
};
