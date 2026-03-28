import {
  protectedProcedure,
  publicProcedure,
} from "@typebot.io/config/orpc/viewer/middlewares";
import { z } from "zod";
import {
  executeTestWebhookInputSchema,
  handleExecuteTestWebhook,
} from "./handleExecuteTestWebhook";
import {
  executeTestWebhookWhatsAppInputSchema,
  handleExecuteTestWebhookWhatsApp,
} from "./handleExecuteTestWebhookWhatsApp";
import {
  executeWebhookInputSchema,
  handleExecuteWebhook,
} from "./handleExecuteWebhook";
import {
  handleWaitForWebhook,
  waitForWebhookInputSchema,
} from "./handleWaitForWebhook";

export const webhookRouter = {
  waitForWebhookProcedure: publicProcedure
    .route({
      method: "GET",
      path: "/v1/webhook-wait/{+room}",
      summary: "Wait for webhook payload",
      description:
        "Long-polling endpoint used by the chat client while the flow is paused on a webhook block. The POST executeWebhook endpoints resolve the wait.",
      tags: ["Webhook"],
      inputStructure: "detailed",
    })
    .input(waitForWebhookInputSchema)
    .output(z.object({ body: z.string() }))
    .handler(handleWaitForWebhook),

  executeWebhookProcedure: protectedProcedure
    .route({
      method: "POST",
      path: "/v1/typebots/{typebotId}/blocks/{blockId}/results/{resultId}/executeWebhook",
      summary: "Execute webhook",
      description:
        "Deliver a webhook payload to a live chat session waiting on a webhook block (or WhatsApp flow).",
      tags: ["Webhook"],
      inputStructure: "detailed",
    })
    .input(executeWebhookInputSchema)
    .output(z.object({ message: z.string() }))
    .handler(handleExecuteWebhook),

  executeTestWebhookProcedure: protectedProcedure
    .route({
      method: "POST",
      path: "/v1/typebots/{typebotId}/blocks/{blockId}/web/executeTestWebhook",
      summary: "Execute test webhook (web)",
      description:
        "Test a webhook block execution in web preview mode. Delivers the payload to an active test listener in the builder.",
      tags: ["Webhook"],
      inputStructure: "detailed",
    })
    .input(executeTestWebhookInputSchema)
    .output(z.object({ message: z.string() }))
    .handler(handleExecuteTestWebhook),

  executeTestWebhookWhatsAppProcedure: protectedProcedure
    .route({
      method: "POST",
      path: "/v1/typebots/{typebotId}/blocks/{blockId}/whatsapp/{phone}/executeTestWebhook",
      summary: "Execute test webhook (WhatsApp)",
      description:
        "Test a webhook block execution in WhatsApp preview mode. Resumes the WhatsApp flow with webhook data.",
      tags: ["Webhook"],
      inputStructure: "detailed",
    })
    .input(executeTestWebhookWhatsAppInputSchema)
    .output(z.object({ message: z.string() }))
    .handler(handleExecuteTestWebhookWhatsApp),
};
