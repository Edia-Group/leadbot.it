import { createActionHandler } from "@typebot.io/forge";
import { ky } from "@typebot.io/lib/ky";
import { parseUnknownError } from "@typebot.io/lib/parseUnknownError";
import { isEmpty } from "@typebot.io/lib/utils";
import { HTTPError } from "ky";
import { queryKnowledgeBase } from "./actions/queryKnowledgeBase";
import { defaultApiBaseUrl } from "./constants";
import type { NucleoQueryResponse } from "./types";

export default [
  createActionHandler(queryKnowledgeBase, {
    server: async ({
      credentials: { apiKey },
      options: { apiBaseUrl, query, responseMapping },
      variables,
      logs,
    }) => {
      if (isEmpty(query))
        return logs.add(
          "No question provided to query the knowledge base.",
        );

      const baseUrl = isEmpty(apiBaseUrl) ? defaultApiBaseUrl : apiBaseUrl;
      try {
        const res: NucleoQueryResponse = await ky
          .post(`${baseUrl}/query`, {
            headers: {
              Authorization: `Bearer ${apiKey}`,
            },
            json: { query },
            timeout: false,
          })
          .json();

        responseMapping?.forEach((mapping) => {
          if (!mapping.variableId) return;
          const item = mapping.item ?? "Context";
          if (item === "Context")
            variables.set([{ id: mapping.variableId, value: res.context }]);
          if (item === "Sources")
            variables.set([
              {
                id: mapping.variableId,
                value: res.sources.map((s) => s.title).join("\n"),
              },
            ]);
        });
      } catch (error) {
        if (error instanceof HTTPError)
          return logs.add(
            await parseUnknownError({
              err: error,
              context: "While querying NUCLEO knowledge base",
            }),
          );
      }
    },
  }),
];
