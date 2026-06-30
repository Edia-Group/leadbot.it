import { createBlock } from "@typebot.io/forge";
import { queryKnowledgeBase } from "./actions/queryKnowledgeBase";
import { auth } from "./auth";
import { baseOptions } from "./baseOptions";
import { NucleoLogo } from "./logo";

export const nucleoQueryBlock = createBlock({
  id: "nucleo-query",
  name: "NUCLEO Knowledge Base",
  tags: ["ai", "document", "rag", "nucleo"],
  LightLogo: NucleoLogo,
  auth,
  options: baseOptions,
  actions: [queryKnowledgeBase],
});
