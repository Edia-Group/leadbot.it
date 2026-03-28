import { ORPCError } from "@orpc/server";
import { LogicBlockType } from "@typebot.io/blocks-logic/constants";
import { parseGroups } from "@typebot.io/groups/helpers/parseGroups";
import { byId } from "@typebot.io/lib/utils";
import { notifyWebhookPayload } from "@typebot.io/lib/webhookRelay";
import prisma from "@typebot.io/prisma";
import type { Prisma } from "@typebot.io/prisma/types";
import { isTypebotVersionAtLeastV6 } from "@typebot.io/schemas/helpers/isTypebotVersionAtLeastV6";
import { isReadTypebotForbidden } from "@typebot.io/typebot/helpers/isReadTypebotForbidden";
import { z } from "zod";

export const executeTestWebhookInputSchema = z.object({
  params: z.object({
    typebotId: z.string(),
    blockId: z.string(),
  }),
  body: z.unknown(),
});

type Context = {
  user: Pick<Prisma.User, "email" | "id">;
};

export const handleExecuteTestWebhook = async ({
  input: {
    params: { typebotId, blockId },
    body,
  },
  context: { user },
}: {
  input: z.infer<typeof executeTestWebhookInputSchema>;
  context: Context;
}) => {
  const typebot = await prisma.typebot.findUnique({
    where: { id: typebotId },
    select: {
      version: true,
      groups: true,
      workspace: {
        select: {
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
    throw new ORPCError("BAD_REQUEST", {
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

  const payload = parseBody(body);
  const delivered = notifyWebhookPayload(
    `${user.id}/${typebotId}/webhooks`,
    payload ?? "",
  );
  if (!delivered)
    throw new ORPCError("NOT_FOUND", {
      message:
        "No test listener is active. Open the webhook block settings and click “Listen for test event” first.",
    });

  return { message: "OK" };
};

const parseBody = (body: unknown): string | undefined => {
  if (!body) return;
  return typeof body === "string" ? body : JSON.stringify(body, null, 2);
};
