import { option } from "@typebot.io/forge";
import { defaultApiBaseUrl } from "./constants";

export const baseOptions = option.object({
  apiBaseUrl: option.string.meta({
    layout: {
      accordion: "Customize provider",
      label: "RAG API base URL",
      placeholder: defaultApiBaseUrl,
      moreInfoTooltip:
        "Base URL of the NUCLEO RAG endpoint. Leave empty to use the default deployment.",
    },
  }),
});
