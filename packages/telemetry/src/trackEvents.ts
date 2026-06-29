import type { TelemetryEvent } from "./schemas";

// Product analytics (PostHog) was used by Typebot cloud. Disabled in NUCLEO.
// Kept as a no-op so the many callers across the codebase don't need to change.
export const trackEvents = async (
  _events: TelemetryEvent[],
): Promise<void> => {};
