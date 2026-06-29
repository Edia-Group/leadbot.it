import { createAuth, option } from "@typebot.io/forge";

export const auth = createAuth({
  type: "encryptedCredentials",
  name: "NUCLEO RAG account",
  schema: option.object({
    apiKey: option.string.meta({
      layout: {
        label: "API key",
        isRequired: true,
        inputType: "password",
        withVariableButton: false,
        isDebounceDisabled: true,
        helperText:
          "Workspace-scoped NUCLEO RAG API key. The key identifies the tenant whose documents are searched.",
      },
    }),
  }),
});
