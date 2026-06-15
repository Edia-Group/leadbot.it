import { FormatIcu } from "@tolgee/format-icu";
import { Tolgee } from "@tolgee/react";
import { env } from "@typebot.io/env";
import en from "../i18n/en.json";
import it from "../i18n/it.json";

export const tolgee = Tolgee()
  .use(FormatIcu())
  .init({
    apiKey: env.NEXT_PUBLIC_TOLGEE_API_KEY,
    apiUrl: env.NEXT_PUBLIC_TOLGEE_API_URL,
    defaultLanguage: "it",
    availableLanguages: ["it", "en"],
    fallbackLanguage: "en",
    staticData: {
      en,
      it,
    },
  });
