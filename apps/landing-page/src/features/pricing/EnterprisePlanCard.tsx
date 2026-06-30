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
          Per aziende che vogliono cervello interno ed esterno, integrazioni
          gestionali e deployment dedicato — con chat illimitate e supporto su
          misura.
        </p>
      </div>
      <ul className="flex flex-col gap-3 shrink-0">
        <PerkListItem>Cervello documentale + bot interni ed esterni</PerkListItem>
        <PerkListItem>Import documenti, contatti e knowledge base</PerkListItem>
        <PerkListItem>Chat illimitate</PerkListItem>
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
