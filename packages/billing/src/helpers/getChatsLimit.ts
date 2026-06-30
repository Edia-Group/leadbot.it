import type { Workspace } from "@typebot.io/workspaces/schemas";
import { chatsLimits } from "../constants";

export const getChatsLimit = ({
  plan,
  customChatsLimit,
}: Pick<Workspace, "plan"> & {
  customChatsLimit?: Workspace["customChatsLimit"];
}) => {
  if (customChatsLimit) return customChatsLimit;
  if (plan === "FREE") return chatsLimits.FREE;
  return "inf";
};
