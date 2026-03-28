import { waitForWebhookPayload } from "@typebot.io/lib/webhookRelay";
import { z } from "zod";

export const waitForWebhookInputSchema = z.object({
  params: z.object({
    room: z.string().min(1),
  }),
});

export const handleWaitForWebhook = async ({
  input: {
    params: { room },
  },
}: {
  input: z.infer<typeof waitForWebhookInputSchema>;
}) => {
  const body = await waitForWebhookPayload(decodeURIComponent(room));
  return { body };
};
