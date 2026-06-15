import type { SessionStore } from "@typebot.io/runtime-session-store";
import type { TypebotV6 } from "@typebot.io/typebot/schemas/typebot";

type Params = {
  debug: boolean;
};

// Risk scoring was part of Typebot-cloud's anti-abuse for its public platform.
// LeadBot self-hosting serves known clients, so risk is always 0 (never blocks
// publishing). Signature kept so callers don't need to change.
export const computeRiskLevel = async (
  _typebot: TypebotV6,
  _params: { sessionStore: SessionStore } & Params,
): Promise<number> => 0;
