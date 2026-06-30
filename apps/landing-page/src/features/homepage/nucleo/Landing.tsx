import { Cta } from "@/components/cta/Cta";
import { ForEveryDepartment } from "@/features/homepage/departments/ForEveryDepartment";
import { Faq } from "@/features/homepage/components/Faq";
import { GetStarted } from "@/features/homepage/get-started/GetStarted";
import { MainFeatures } from "@/features/homepage/main-features/MainFeatures";
import { UseCases } from "@/features/homepage/use-cases/UseCases";
import { ChannelsSection } from "./ChannelsSection";
import { ChatbotModes } from "./ChatbotModes";
import { CompanyBrainSection } from "./CompanyBrainSection";
import { ComparisonTable } from "./ComparisonTable";
import { ArrowRight } from "./icons";
import { NucleoHero } from "./NucleoHero";
import { PlatformBenefits } from "./PlatformBenefits";

export const NucleoLanding = () => (
  <div className="bg-[#F6F2EA] text-[#14231E]">
    <NucleoHero />

    <ChatbotModes />
    <CompanyBrainSection />
    <PlatformBenefits />

    <section className="flex flex-col items-center gap-16 px-4 py-20 md:gap-24 md:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#0E5F52]">
          Builder visuale
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
          Dal primo blocco alla prima conversazione
        </h2>
        <p className="mt-4 text-lg text-[#586863]">
          Trascina, collega, pubblica. Vedi il risultato in tempo reale mentre
          costruisci il tuo chatbot.
        </p>
      </div>
      <MainFeatures />
    </section>

    <ChannelsSection />

    <section className="flex flex-col items-center px-4 py-20 md:py-28">
      <UseCases className="md-scroll-use-cases-fade-in w-full max-w-7xl" />
    </section>

    <section className="flex flex-col items-center px-4 py-20 md:py-28">
      <ForEveryDepartment />
    </section>

    <ComparisonTable />

    <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-20 md:py-28">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#0E5F52]">
          Tre passi
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
          Lancia il tuo primo chatbot oggi
        </h2>
      </div>
      <GetStarted />
    </section>

    <section className="flex flex-col items-center px-4 py-20 md:py-28">
      <Faq />
    </section>

    <section id="demo" className="flex justify-center px-4 pb-16 pt-4">
      <Cta buttonLabel="Inizia gratis">
        Pronto a trasformare visitatori in clienti con un chatbot che funziona
        con o senza AI?
      </Cta>
    </section>

    <section className="border-t border-[#E4DCCE] bg-white py-10">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-6 text-center">
        <p className="text-sm text-[#586863]">
          Serve setup chiavi in mano per la tua azienda?
        </p>
        <a
          href="mailto:ciao@nucleoai.it"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#0E5F52] hover:text-[#0B4D42]"
        >
          Prenota una demo di 30 minuti <ArrowRight className="size-4" />
        </a>
      </div>
    </section>
  </div>
);
