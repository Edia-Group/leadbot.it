import { chatsLimits } from "@typebot.io/billing/constants";
import { CtaButtonLink } from "@/components/link";
import { registerUrl } from "@/constants";
import {
  PerkListItem,
  PlanNamePill,
  PricingCardFooter,
  PricingCardRoot,
} from "./components/pricing-card";

export const FreePlanCard = ({ children }: { children?: React.ReactNode }) => (
  <PricingCardRoot>
    <PlanNamePill className="bg-stone-950 text-white absolute top-0">
      Prova
    </PlanNamePill>
    <div className="flex flex-col gap-10 items-center">
      <h2>Gratis</h2>
      {children}
    </div>

    <PricingCardFooter>
      <CtaButtonLink href={registerUrl} variant="secondary" size="lg">
        Prova gratis
      </CtaButtonLink>
    </PricingCardFooter>
  </PricingCardRoot>
);

export const FreePlanPerksList = () => (
  <ul className="flex flex-col gap-3">
    <PerkListItem>
      <span className="font-bold">1 bot</span> per dare un&apos;occhiata
    </PerkListItem>
    <PerkListItem>
      <span>
        <span className="font-bold">
          {new Intl.NumberFormat().format(chatsLimits.FREE)} chat
        </span>
        /mese
      </span>
    </PerkListItem>
    <PerkListItem>Flussi guidati senza AI</PerkListItem>
    <PerkListItem>Integrazioni native</PerkListItem>
    <PerkListItem>Webhook</PerkListItem>
    <PerkListItem>Supporto community e documentazione</PerkListItem>
    <li className="text-sm text-muted-foreground">
      Ideale solo per provare la piattaforma
    </li>
  </ul>
);
