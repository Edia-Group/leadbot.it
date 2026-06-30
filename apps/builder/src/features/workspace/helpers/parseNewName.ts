import type { Workspace } from "@typebot.io/workspaces/schemas";
import { tolgee } from "@/lib/tolgee";

export const parseNewName = (
  userFullName: string | undefined,
  existingWorkspaces: Pick<Workspace, "name">[],
) => {
  const workspaceName = userFullName
    ? tolgee.t("workspace.defaultNameWithUser", { name: userFullName })
    : tolgee.t("workspace.defaultName");
  let newName = workspaceName;
  let i = 1;
  while (existingWorkspaces.find((w) => w.name === newName)) {
    newName = `${workspaceName} (${i})`;
    i++;
  }
  return newName;
};
