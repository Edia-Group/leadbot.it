import { CtaButtonLink } from "@/components/link";
import { enterpriseLeadFormUrl } from "@/constants";
import {
  PerkListItem,
  PlanNamePill,
  PricingCardFooter,
  PricingCardRoot,
} from "./components/pricing-card";

const managedPlans = [
  {
    name: "Gestito Base",
    price: "149",
    setup: "1.500",
    items: [
      "Setup e configurazione inclusi",
      "Chat illimitate",
      "Chatbot esterno (sito + WhatsApp)",
      "Cervello documentale (RAG)",
      "Caricamento documenti e FAQ",
      "1 bot pubblicato + supporto onboarding",
    ],
    highlight: false,
  },
  {
    name: "Gestito Professional",
    price: "199",
    setup: "2.500",
    items: [
      "Tutto di Gestito Base",
      "Cervello interno per il team",
      "Workflow e notifiche automatiche",
      "Appuntamenti AI + calendario",
      "Integrazione contatti / rubrica",
    ],
    highlight: true,
  },
  {
    name: "Gestito Enterprise",
    price: "249",
    setup: "4.000",
    items: [
      "Tutto di Gestito Professional",
      "Portale B2B clienti",
      "Integrazioni gestionali (Danea, Zucchetti…)",
      "Self-hosting / dati in EU",
      "Referente dedicato + SLA",
    ],
    highlight: false,
  },
] as const;

export const ManagedPlanCards = () => (
  <div className="flex w-full max-w-7xl flex-col gap-8">
    <div className="flex flex-col gap-3">
      <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
        Piani chiavi in mano
      </h2>
      <p className="max-w-3xl text-[#586863]">
        Non hai tempo di configurare? Configuriamo noi chatbot, documenti,
        contatti e integrazioni. Setup una tantum + canone mensile flat.
      </p>
    </div>

    <div className="grid gap-8 md:grid-cols-3">
      {managedPlans.map((plan) => (
        <PricingCardRoot
          key={plan.name}
          className={
            plan.highlight ? "border-violet-400 border-4" : undefined
          }
        >
          <PlanNamePill
            className={
              plan.highlight
                ? "bg-violet-400 text-white"
                : "bg-[#0E5F52] text-white"
            }
          >
            {plan.name}
          </PlanNamePill>
          <div className="flex flex-col items-center gap-2 px-4">
            <h2 className="text-4xl font-semibold">
              {plan.price} €
              <span className="text-lg font-normal text-[#586863]">/mese</span>
            </h2>
            <p className="text-sm text-[#586863]">
              + {plan.setup} € setup una tantum
            </p>
          </div>
          <ul className="flex w-full flex-col gap-3 px-8">
            {plan.items.map((item) => (
              <PerkListItem key={item}>{item}</PerkListItem>
            ))}
          </ul>
          <PricingCardFooter>
            <CtaButtonLink
              variant="secondary"
              size="lg"
              href={enterpriseLeadFormUrl}
            >
              Richiedi preventivo
            </CtaButtonLink>
          </PricingCardFooter>
        </PricingCardRoot>
      ))}
    </div>
  </div>
);
