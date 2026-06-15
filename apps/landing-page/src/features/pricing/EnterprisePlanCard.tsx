import { CtaButtonLink } from "@/components/link";
import { enterpriseLeadFormUrl } from "@/constants";
import {
  PerkListItem,
  PricingCardFooter,
  PricingCardRoot,
} from "./components/pricing-card";

export const EnterprisePlanCard = () => (
  <PricingCardRoot className="pt-10 max-w-4xl">
    <div className="flex flex-col md:flex-row gap-10 items-center px-12">
      <div className="flex flex-col gap-3">
        <h2>Enterprise</h2>
        <p>
          Ideale per agenzie e aziende che vogliono generare lead e automatizzare
          il supporto clienti su larga scala
        </p>
      </div>
      <ul className="flex flex-col gap-3 shrink-0">
        <PerkListItem>Limite chat e postazioni personalizzati</PerkListItem>
        <PerkListItem>Contratto con SLA</PerkListItem>
        <PerkListItem>Supporto 24/7 con referente dedicato</PerkListItem>
        <PerkListItem>SSO e permessi di accesso granulari</PerkListItem>
        <PerkListItem>Indirizzo IP dedicato</PerkListItem>
        <PerkListItem>Sicurezza certificata ISO 27001</PerkListItem>
        <PerkListItem>Questionari di sicurezza personalizzati</PerkListItem>
        <PerkListItem>Sviluppo funzionalità su misura (add-on)</PerkListItem>
      </ul>
    </div>
    <PricingCardFooter>
      <CtaButtonLink variant="secondary" size="lg" href={enterpriseLeadFormUrl}>
        Richiedi un preventivo
      </CtaButtonLink>
    </PricingCardFooter>
  </PricingCardRoot>
);
