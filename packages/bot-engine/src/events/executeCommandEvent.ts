import { ORPCError } from "@orpc/server";
import type { SessionState } from "@typebot.io/chat-session/schemas";
import { EventType } from "@typebot.io/events/constants";
import type { CommandEvent } from "@typebot.io/events/schemas";
import { byId } from "@typebot.io/lib/utils";
import { addDummyFirstBlockToGroupIfMissing } from "../addDummyFirstBlockToGroupIfMissing";

type Props = {
  state: SessionState;
  command: string;
};
export const executeCommandEvent = ({ state, command }: Props) => {
  const event = state.typebotsQueue[0].typebot.events?.find(
    (e) => e.type === EventType.COMMAND && e.options?.command === command,
  ) as CommandEvent | undefined;

  if (!event)
    throw new ORPCError("BAD_REQUEST", {
      message: "Command event not found",
    });

  let newSessionState = state;
  if (newSessionState.currentBlockId) {
    newSessionState.returnMark = {
      status: "pending",
      blockId: newSessionState.currentBlockId,
    };
  }

  const nextEdge = newSessionState.typebotsQueue[0].typebot.edges.find(
    byId(event.outgoingEdgeId),
  );
  if (!nextEdge)
    throw new ORPCError("BAD_REQUEST", {
      message: "Command event doesn't have a connected edge",
    });
  const nextGroup = newSessionState.typebotsQueue[0].typebot.groups.find(
    byId(nextEdge.to.groupId),
  );
  if (!nextGroup)
    throw new ORPCError("BAD_REQUEST", {
      message: "Command event doesn't have a connected group",
    });
  const nextBlockIndex = nextGroup.blocks.findIndex(byId(nextEdge.to.blockId));
  const newBlockId = `virtual-${event.id}-block`;
  newSessionState = addDummyFirstBlockToGroupIfMissing(
    newBlockId,
    newSessionState,
    {
      groupId: nextGroup.id,
      index: nextBlockIndex !== -1 ? nextBlockIndex : 0,
    },
  );
  return {
    ...newSessionState,
    currentBlockId: newBlockId,
  };
};
