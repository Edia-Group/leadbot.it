import type {
  Condition,
  ConditionGroup,
  ConditionNode,
  WorkflowEvent,
} from "./types";
import { getPath, toNumber } from "./util";

const isGroup = (node: ConditionNode): node is ConditionGroup =>
  "all" in node || "any" in node;

/** Evaluate a single leaf condition against the event payload. */
export const evaluateCondition = (
  condition: Condition,
  event: WorkflowEvent,
): boolean => {
  const actual = getPath(event.data, condition.field);
  const { operator, value } = condition;

  switch (operator) {
    case "exists":
      return actual !== undefined && actual !== null;
    case "notExists":
      return actual === undefined || actual === null;
    case "eq":
      return actual === value;
    case "neq":
      return actual !== value;
    case "gt":
    case "gte":
    case "lt":
    case "lte": {
      const a = toNumber(actual);
      const b = toNumber(value);
      if (a === undefined || b === undefined) return false;
      if (operator === "gt") return a > b;
      if (operator === "gte") return a >= b;
      if (operator === "lt") return a < b;
      return a <= b;
    }
    case "contains": {
      if (typeof actual === "string")
        return actual.includes(String(value));
      if (Array.isArray(actual)) return actual.includes(value);
      return false;
    }
    default:
      return false;
  }
};

/**
 * Evaluate a (possibly nested) condition tree. `undefined` means no gating,
 * i.e. the rule always matches.
 */
export const evaluateConditions = (
  node: ConditionNode | undefined,
  event: WorkflowEvent,
): boolean => {
  if (!node) return true;
  if (isGroup(node)) {
    if ("all" in node)
      return node.all.every((child) => evaluateConditions(child, event));
    return node.any.some((child) => evaluateConditions(child, event));
  }
  return evaluateCondition(node, event);
};
