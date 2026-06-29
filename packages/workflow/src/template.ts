import { getPath } from "./util";

/** Replace {{ event.path }} placeholders with values from `data`. */
export const renderString = (
  template: string,
  data: Record<string, unknown>,
): string =>
  template.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (_match, path: string) => {
    const value = getPath(data, path);
    return value === undefined || value === null ? "" : String(value);
  });

/** Render every string param; non-string params pass through unchanged. */
export const renderParams = (
  params: Record<string, unknown>,
  data: Record<string, unknown>,
): Record<string, unknown> => {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(params))
    out[key] = typeof value === "string" ? renderString(value, data) : value;
  return out;
};
