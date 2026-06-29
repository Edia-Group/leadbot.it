import { createAction, option } from "@typebot.io/forge";
import { isDefined } from "@typebot.io/lib/utils";
import { auth } from "../auth";

export const queryKnowledgeBase = createAction({
  auth,
  name: "Query Knowledge Base",
  options: option.object({
    query: option.string.meta({
      layout: {
        label: "Question",
        inputType: "textarea",
        placeholder: "Qual è il prezzo del servizio premium?",
      },
    }),
    responseMapping: option
      .saveResponseArray(["Context", "Sources"])
      .meta({
        layout: {
          accordion: "Save response",
        },
      }),
  }),
  getSetVariableIds: ({ responseMapping }) =>
    responseMapping?.map((r) => r.variableId).filter(isDefined) ?? [],
});
