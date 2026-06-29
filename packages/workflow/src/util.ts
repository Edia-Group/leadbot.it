/** Resolve a dot-path (e.g. "quote.total") within a nested object. */
export const getPath = (
  data: Record<string, unknown>,
  path: string,
): unknown =>
  path.split(".").reduce<unknown>((acc, key) => {
    if (acc !== null && typeof acc === "object" && key in acc)
      return (acc as Record<string, unknown>)[key];
    return undefined;
  }, data);

/** Coerce a value to a finite number, or undefined if not numeric. */
export const toNumber = (value: unknown): number | undefined => {
  if (typeof value === "number") return Number.isFinite(value) ? value : undefined;
  if (typeof value === "string" && value.trim() !== "") {
    const n = Number(value);
    return Number.isFinite(n) ? n : undefined;
  }
  return undefined;
};
