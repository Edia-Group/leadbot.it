import { createFileRoute } from "@tanstack/react-router";
import { ContentPageWrapper } from "@/components/ContentPageWrapper";
import { EnterprisePlanCard } from "@/features/pricing/EnterprisePlanCard";
import { Faq } from "@/features/pricing/Faq";
import {
  FreePlanCard,
  FreePlanPerksList,
} from "@/features/pricing/free-plan-card";
import { ManagedPlanCards } from "@/features/pricing/ManagedPlanCards";
import { PricingHeading } from "@/features/pricing/PricingHeading";
import { ProPerksList, ProPlanCard } from "@/features/pricing/pro-plan-card";
import {
  StarterPlanCard,
  StarterPlanPerksList,
} from "@/features/pricing/starter-plan-card";
import { createMetaTags } from "@/lib/createMetaTags";

export const Route = createFileRoute("/_layout/pricing")({
  head: () => ({
    meta: createMetaTags({
      title: "Prezzi | NUCLEO",
      description:
        "Prova gratis con 1 bot e 50 chat. Piani a pagamento con chat illimitate, knowledge base e WhatsApp. Da 35 €/mese o chiavi in mano da 149 €.",
      imagePath: "/images/default-og.png",
      path: "/pricing",
    }),
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ContentPageWrapper>
      <div className="flex flex-col items-center w-full gap-24">
        <div className="flex flex-col max-w-7xl w-full gap-12 md:gap-20">
          <PricingHeading />
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">Fai da te (self-serve)</h2>
            <p className="text-slate-600 max-w-2xl">
              Il piano Gratis serve solo per provare. I piani a pagamento
              includono chat illimitate e tutto il necessario per andare live.
            </p>
          </div>
          <div className="flex flex-col gap-8 items-center w-full">
            <div className="flex flex-col md:flex-row gap-8 w-full">
              <FreePlanCard>
                <FreePlanPerksList />
              </FreePlanCard>
              <StarterPlanCard>
                <StarterPlanPerksList />
              </StarterPlanCard>
              <ProPlanCard>
                <ProPerksList />
              </ProPlanCard>
            </div>
            <EnterprisePlanCard />
          </div>
        </div>
        <ManagedPlanCards />
        <Faq />
      </div>
    </ContentPageWrapper>
  );
}
