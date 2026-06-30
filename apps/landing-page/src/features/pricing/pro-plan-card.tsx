import { prices, seatsLimits } from "@typebot.io/billing/constants";
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

export const ProPlanCard = ({ children }: { children?: React.ReactNode }) => (
  <PricingCardRoot className="border-violet-400 border-4">
    <PlanNamePill className="bg-violet-400 text-white absolute top-0 flex flex-col">
      Pro
    </PlanNamePill>
    <div className="flex flex-col gap-10 items-center">
      <h2>
        {formatPrice(prices.PRO)}
        <span className="text-lg">/mese</span>
      </h2>
      {children}
    </div>
    <PricingCardFooter>
      <CtaButtonLink
        variant="secondary"
        size="lg"
        href={`${registerUrl}?subscribePlan=${Plan.PRO}`}
      >
        Abbonati ora
      </CtaButtonLink>
    </PricingCardFooter>
  </PricingCardRoot>
);

export const ProPerksList = () => (
  <ul className="flex flex-col gap-3">
    <PerkListItem>Tutto del piano Starter e...</PerkListItem>
    <PerkListItem>
      <span>
        <span className="font-bold">{seatsLimits.PRO} postazioni</span> incluse
      </span>
    </PerkListItem>
    <PerkListItem>
      <span className="font-bold">Chat illimitate</span>
    </PerkListItem>
    <PerkListItem>Knowledge base avanzata (documenti illimitati)</PerkListItem>
    <PerkListItem>Cervello interno + esterno (team e clienti)</PerkListItem>
    <PerkListItem>Integrazione WhatsApp</PerkListItem>
    <PerkListItem>Domini personalizzati</PerkListItem>
    <PerkListItem>Analisi avanzate</PerkListItem>
  </ul>
);
