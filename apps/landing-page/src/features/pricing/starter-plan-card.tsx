import {
  prices,
  seatsLimits,
} from "@typebot.io/billing/constants";
import { formatPrice } from "@typebot.io/billing/helpers/formatPrice";
import { Plan } from "@typebot.io/prisma/enum";
import { CtaButtonLink } from "@/components/link";
import { registerUrl } from "@/constants";
import {
  PerkListItem,
  PlanNamePill,
  PricingCardFooter,
  PricingCardRoot,
} from "./components/pricing-card";

export const StarterPlanCard = ({
  children,
}: {
  children?: React.ReactNode;
}) => (
  <PricingCardRoot>
    <PlanNamePill className="bg-orange-400 text-white absolute top-0 flex flex-col">
      Starter
    </PlanNamePill>
    <div className="flex flex-col gap-10 items-center">
      <h2>
        {formatPrice(prices.STARTER)}
        <span className="text-lg">/mese</span>
      </h2>
      {children}
    </div>
    <PricingCardFooter>
      <CtaButtonLink
        variant="secondary"
        size="lg"
        href={`${registerUrl}?subscribePlan=${Plan.STARTER}`}
      >
        Abbonati ora
      </CtaButtonLink>
    </PricingCardFooter>
  </PricingCardRoot>
);

export const StarterPlanPerksList = () => (
  <ul className="flex flex-col gap-3">
    <PerkListItem>Tutto del piano Gratis e...</PerkListItem>
    <PerkListItem>
      <span className="font-bold">Bot illimitati</span>
    </PerkListItem>
    <PerkListItem>
      <span>
        <span className="font-bold">{seatsLimits.STARTER} postazioni</span>{" "}
        incluse
      </span>
    </PerkListItem>
    <PerkListItem>
      <span className="font-bold">Chat illimitate</span>
    </PerkListItem>
    <PerkListItem>Knowledge base + RAG (1 fonte documenti)</PerkListItem>
    <PerkListItem>Chatbot esterno per clienti (sito web)</PerkListItem>
    <PerkListItem>Integrazioni native</PerkListItem>
    <PerkListItem>Branding rimosso</PerkListItem>
    <PerkListItem>Raccolta file dagli utenti</PerkListItem>
    <PerkListItem>Creazione cartelle</PerkListItem>
    <PerkListItem>Supporto prioritario diretto</PerkListItem>
  </ul>
);
