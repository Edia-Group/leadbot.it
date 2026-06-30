import { CtaButtonLink } from "@/components/link";
import { registerUrl } from "@/constants";
import { ArrowRight, NucleoMark } from "./icons";
import { VantaCloudsBackground } from "./VantaCloudsBackground";

export const NucleoHero = () => (
  <section className="dark relative isolate overflow-hidden bg-[#093C33] text-white">
    <VantaCloudsBackground />
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 bg-linear-to-b from-[#093C33]/30 via-[#093C33]/10 to-[#093C33]/85"
    />

    <div className="relative z-10 mx-auto max-w-6xl px-6 pb-24 pt-36 text-center md:pb-32 md:pt-40">
      <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#093C33]/40 px-4 py-1.5 text-sm font-medium text-[#BFE3D4] backdrop-blur-md">
        <NucleoMark className="size-4" />
        Chatbot per PMI italiane — con o senza AI
      </span>

      <h1 className="mx-auto mt-8 max-w-4xl text-balance text-4xl font-semibold leading-[1.08] tracking-tight drop-shadow-sm md:text-6xl md:leading-[1.05]">
        Vai oltre le risposte automatiche.{" "}
        <span className="bg-linear-to-r from-[#BFE3D4] to-[#E0A24A] bg-clip-text text-transparent">
          Risolvi, qualifica, converte.
        </span>
      </h1>

      <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-[#BFE3D4] md:text-xl">
        Crea chatbot su WhatsApp e sul tuo sito in pochi minuti. Carica
        documenti e contatti per un cervello aziendale interno ed esterno — con
        flussi guidati senza AI, con intelligenza artificiale, o entrambi.
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <CtaButtonLink size="lg" href={registerUrl}>
          Inizia gratis
        </CtaButtonLink>
        <a
          href="#demo"
          className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-[#093C33]/40 px-6 py-3 text-base font-semibold text-white backdrop-blur-md transition hover:bg-white/10"
        >
          Richiedi una demo <ArrowRight className="size-4" />
        </a>
      </div>

      <p className="mt-5 text-sm text-[#9FC9BD]">
        Nessuna carta richiesta · 1 bot e 50 chat gratis per provare · Online in
        pochi minuti
      </p>
    </div>
  </section>
);
