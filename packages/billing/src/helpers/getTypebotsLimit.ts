import { Plan } from "@typebot.io/prisma/enum";
import type { Workspace } from "@typebot.io/workspaces/schemas";
import { typebotsLimits } from "../constants";

export const getTypebotsLimit = ({
  plan,
}: Pick<Workspace, "plan">): number | "inf" => {
  if (plan === Plan.FREE) return typebotsLimits.FREE;
  return "inf";
};
