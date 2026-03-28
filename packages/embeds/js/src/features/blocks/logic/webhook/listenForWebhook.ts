import type { ClientSideActionContext } from "@/types";
import { guessApiHost } from "@/utils/guessApiHost";

type Props = {
  resultId?: string;
  sessionId: string;
  context: ClientSideActionContext;
};

const maxWaitMs = 125_000;

export const listenForWebhook = async ({
  sessionId,
  resultId,
  context,
}: Props) => {
  const apiBase = (
    context.apiHost ?? guessApiHost({ ignoreChatApiUrl: false })
  ).replace(/\/$/, "");
  const room = encodeURIComponent(getRoomName({ sessionId, resultId }));
  const url = `${apiBase}/api/v1/webhook-wait/${room}`;
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), maxWaitMs);
  try {
    const response = await fetch(url, { signal: controller.signal });
    window.clearTimeout(timeoutId);
    if (!response.ok) {
      return {
        replyToSend: undefined,
        logs: [
          {
            status: "error",
            description: "Webhook wait request failed",
            details: `${response.status} ${response.statusText}`,
          },
        ],
      };
    }
    const data = (await response.json()) as { body?: string };
    return { replyToSend: data.body };
  } catch (error) {
    window.clearTimeout(timeoutId);
    return {
      replyToSend: undefined,
      logs: [
        {
          status: "error",
          description: "Webhook wait failed",
          details: JSON.stringify(error, Object.getOwnPropertyNames(error), 2),
        },
      ],
    };
  }
};

const getRoomName = ({
  sessionId,
  resultId,
}: Pick<Props, "sessionId" | "resultId">) => {
  if (resultId) return `${resultId}/webhooks`;
  const [typebotId, userId] = sessionId.split("-");
  return `${userId}/${typebotId}/webhooks`;
};
