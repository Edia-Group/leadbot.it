export const templateI18nPrefixBySlug: Record<string, string> = {
  "lead-gen": "templates.modal.marketing.leadGeneration",
  "customer-support": "templates.modal.product.customerSupport",
  quiz: "templates.modal.marketing.quiz",
  "lead-scoring": "templates.modal.marketing.leadScoring",
  "lead-magnet": "templates.modal.marketing.leadMagnet",
  "product-recommendation": "templates.modal.marketing.productRecommendation",
  nps: "templates.modal.product.npsSurvey",
  onboarding: "templates.modal.product.userOnboarding",
  "digital-product-payment": "templates.modal.other.digitalProductPayment",
  faq: "templates.modal.product.faq",
  "movie-recommendation": "templates.modal.other.movieRecommendation",
  "basic-chat-gpt": "templates.modal.other.basicChatGpt",
  "audio-chat-gpt": "templates.modal.other.audioChatGpt",
  "chat-gpt-personas": "templates.modal.other.chatGptPersonas",
  "lead-gen-ai": "templates.modal.marketing.leadGenWithAi",
  "dog-insurance-offer": "templates.modal.marketing.insuranceOffer",
  "openai-conditions": "templates.modal.other.openAiConditions",
  "high-ticket-lead-follow-up":
    "templates.modal.marketing.highTicketLeadFollowUp",
  "quick-carb-calculator": "templates.modal.marketing.quickCarbCalculator",
  "skin-typology": "templates.modal.marketing.skinTypology",
  "openai-assistant-chat": "templates.modal.other.openaiAssistantChat",
  "savings-estimator": "templates.modal.marketing.savingsEstimator",
  immobiliare: "templates.modal.marketing.agenziaImmobiliare",
  "legal-intake": "templates.modal.marketing.studioLegale",
  "accountant-onboarding": "templates.modal.marketing.commercialista",
};

export const getTemplateI18nPrefix = (slug: string) =>
  templateI18nPrefixBySlug[slug];

export const getTemplateTranslation = (
  t: (key: string) => string,
  slug: string,
  field: "name" | "summary" | "description",
  fallback: string,
) => {
  const prefix = getTemplateI18nPrefix(slug);
  if (!prefix) return fallback;
  const key = `${prefix}.${field}`;
  const translated = t(key);
  if (!translated || translated === key) return fallback;
  return translated;
};
