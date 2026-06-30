import { evaluateConditions } from "./conditions";
import type { ActionInvocation, WorkflowEvent, WorkflowRule } from "./types";

/**
 * Pure core: given an event and the workspace's rules, return the ordered list
 * of action invocations to run. Side-effect free and trivially testable.
 */
export const evaluateRules = (
  event: WorkflowEvent,
  rules: WorkflowRule[],
): ActionInvocation[] => {
  const invocations: ActionInvocation[] = [];
  for (const rule of rules) {
    if (!rule.enabled) continue;
    if (rule.trigger !== event.type) continue;
    if (!evaluateConditions(rule.conditions, event)) continue;
    for (const action of rule.actions)
      invocations.push({ ruleId: rule.id, action, event });
  }
  return invocations;
};
