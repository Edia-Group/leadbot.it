import { renderParams } from "./template";
import type { Action, ActionInvocation } from "./types";

export interface ActionContext {
  invocation: ActionInvocation;
  /** Params with {{templates}} already resolved against the event data. */
  params: Record<string, unknown>;
}

/** Implements a single action type (email, whatsapp, pdf, ...). */
export interface ActionExecutor {
  readonly type: string;
  execute(action: Action, ctx: ActionContext): Promise<void>;
}

/**
 * Routes an invocation to the executor registered for its action type. The
 * "router agent" of the plan decides the path; here we resolve it by type.
 */
export class ActionDispatcher {
  private readonly executors = new Map<string, ActionExecutor>();

  register(executor: ActionExecutor): this {
    this.executors.set(executor.type, executor);
    return this;
  }

  has(type: string): boolean {
    return this.executors.has(type);
  }

  async dispatch(invocation: ActionInvocation): Promise<void> {
    const executor = this.executors.get(invocation.action.type);
    if (!executor)
      throw new Error(
        `No executor registered for action type "${invocation.action.type}"`,
      );
    const params = renderParams(
      invocation.action.params,
      invocation.event.data,
    );
    await executor.execute(invocation.action, { invocation, params });
  }
}
