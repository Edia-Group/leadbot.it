type WaitEntry = {
  resolve: (body: string) => void;
  reject: (error: Error) => void;
  timeout: ReturnType<typeof setTimeout>;
};

const pendingByRoomKey = new Map<string, WaitEntry>();

const defaultMaxWaitMs = 120_000;

export const waitForWebhookPayload = (
  roomKey: string,
  maxWaitMs = defaultMaxWaitMs,
): Promise<string> =>
  new Promise((resolve, reject) => {
    const previous = pendingByRoomKey.get(roomKey);
    if (previous) {
      clearTimeout(previous.timeout);
      previous.reject(new Error("Webhook wait superseded"));
    }
    const timeout = setTimeout(() => {
      pendingByRoomKey.delete(roomKey);
      reject(new Error("Webhook wait timed out"));
    }, maxWaitMs);
    pendingByRoomKey.set(roomKey, {
      resolve: (body: string) => {
        clearTimeout(timeout);
        pendingByRoomKey.delete(roomKey);
        resolve(body);
      },
      reject: (error: Error) => {
        clearTimeout(timeout);
        pendingByRoomKey.delete(roomKey);
        reject(error);
      },
      timeout,
    });
  });

export const notifyWebhookPayload = (
  roomKey: string,
  body: string,
): boolean => {
  const entry = pendingByRoomKey.get(roomKey);
  if (!entry) return false;
  entry.resolve(body);
  return true;
};
