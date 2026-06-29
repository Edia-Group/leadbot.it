// PostHog identity aliasing was used by Typebot cloud. Disabled in NUCLEO.
// Kept as a no-op so callers don't need to change.
export const mergeIds = async (_params: {
  visitorId: string;
  userId: string;
}): Promise<void> => {};
