import { ORPCError } from "@orpc/server";
import { LogicBlockType } from "@typebot.io/blocks-logic/constants";
import { getSession } from "@typebot.io/chat-session/queries/getSession";
import { parseGroups } from "@typebot.io/groups/helpers/parseGroups";
import { byId } from "@typebot.io/lib/utils";
import { notifyWebhookPayload } from "@typebot.io/lib/webhookRelay";
import prisma from "@typebot.io/prisma";
import type { Prisma } from "@typebot.io/prisma/types";
import { isTypebotVersionAtLeastV6 } from "@typebot.io/schemas/helpers/isTypebotVersionAtLeastV6";
import { isReadTypebotForbidden } from "@typebot.io/typebot/helpers/isReadTypebotForbidden";
import { resumeWhatsAppFlow } from "@typebot.io/whatsapp/resumeWhatsAppFlow";
import { z } from "zod";

export const executeWebhookInputSchema = z.object({
  params: z.object({
    typebotId: z.string(),
    blockId: z.string(),
    resultId: z.string(),
  }),
  body: z.unknown(),
});

type Context = {
  user: Pick<Prisma.User, "email" | "id">;
};

export const handleExecuteWebhook = async ({
  input: {
    params: { typebotId, blockId, resultId },
    body,
  },
  context: { user },
}: {
  input: z.infer<typeof executeWebhookInputSchema>;
  context: Context;
}) => {
  const typebot = await prisma.typebot.findUnique({
    where: { id: typebotId },
    select: {
      version: true,
      groups: true,
      settings: true,
      whatsAppCredentialsId: true,
      workspace: {
        select: {
          id: true,
          isSuspended: true,
          isPastDue: true,
          members: {
            select: {
              userId: true,
            },
          },
        },
      },
      collaborators: {
        select: {
          userId: true,
        },
      },
    },
  });

  if (!typebot || (await isReadTypebotForbidden(typebot, user)))
    throw new ORPCError("NOT_FOUND", {
      message: "Typebot not found",
    });

  if (!isTypebotVersionAtLeastV6(typebot.version))
    throw new ORPCError("INTERNAL_SERVER_ERROR", {
      message: "Typebot version not supported",
    });

  const block = parseGroups(typebot.groups, {
    typebotVersion: typebot.version,
  })
    .flatMap((g) => g.blocks)
    .find(byId(blockId));

  if (!block || block.type !== LogicBlockType.WEBHOOK)
    throw new ORPCError("NOT_FOUND", {
      message: "Webhook block not found",
    });

  const result = await prisma.result.findUnique({
    where: {
      id: resultId,
    },
    select: {
      lastChatSessionId: true,
    },
  });

  if (!result?.lastChatSessionId)
    throw new ORPCError("NOT_FOUND", {
      message: "No chat session found",
    });

  const chatSession = await getSession(result.lastChatSessionId);

  if (chatSession?.state?.whatsApp) {
    if (!typebot.whatsAppCredentialsId)
      throw new ORPCError("INTERNAL_SERVER_ERROR", {
        message: "Found WA session but no credentialsId in typebot",
      });

    const from = chatSession.id.split("-").at(-1);
    if (!from)
      throw new ORPCError("INTERNAL_SERVER_ERROR", {
        message:
          "Expected session ID to be in format: wa-{phoneNumberId}-{receivedMessage.from}",
      });

    await resumeWhatsAppFlow({
      receivedMessages: [
        {
          from,
          timestamp: new Date().toISOString(),
          type: "webhook",
          webhook: {
            data: parseBodyForWhatsApp(body),
          },
        },
      ],
      workspaceId: typebot.workspace.id,
      sessionId: chatSession.id,
      credentialsId: typebot.whatsAppCredentialsId,
      callFrom: "webhook",
    });

    return { message: "OK" };
  }

  const payload = parseBody(body);
  const delivered = notifyWebhookPayload(`${resultId}/webhooks`, payload ?? "");
  if (!delivered)
    throw new ORPCError("NOT_FOUND", {
      message:
        "No active chat session is waiting for this webhook (ensure the bot is paused on the webhook block and the viewer process that serves the chat is the same one receiving this request).",
    });

  return { message: "OK" };
};

const parseBodyForWhatsApp = (body: unknown): string | undefined => {
  if (!body) return;
  return typeof body === "string"
    ? JSON.stringify({ data: JSON.parse(body) })
    : JSON.stringify({ data: body }, null, 2);
};

const parseBody = (body: unknown): string | undefined => {
  if (!body) return;
  return typeof body === "string" ? body : JSON.stringify(body, null, 2);
};
