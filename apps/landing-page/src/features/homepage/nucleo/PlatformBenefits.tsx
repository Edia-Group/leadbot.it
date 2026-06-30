import { Brain, Clock, Globe, Message, Plug, Shield, Zap } from "./icons";

const benefits = [
  {
    Icon: Brain,
    title: "Knowledge base aziendale",
    description:
      "Carica documenti e contatti. Un cervello per il team interno, uno per i clienti — aggiornamento centralizzato.",
  },
  {
    Icon: Clock,
    title: "Online in pochi minuti",
    description:
      "Template pronti per lead gen, appuntamenti e FAQ. Pubblica su sito o WhatsApp senza sviluppatori.",
  },
  {
    Icon: Message,
    title: "Ogni canale, un solo bot",
    description:
      "WhatsApp Business, widget sul sito, link condivisibile. Un flusso, tutti i punti di contatto.",
  },
  {
    Icon: Zap,
    title: "AI opzionale, non obbligatoria",
    description:
      "Parti con regole e bottoni. Aggiungi RAG e LLM solo sui flussi dove serve davvero.",
  },
  {
    Icon: Plug,
    title: "Integrazioni che contano",
    description:
      "Google Calendar, Sheets, webhook, OpenAI, Meta Pixel, analytics e i tuoi strumenti preferiti.",
  },
  {
    Icon: Shield,
    title: "Dati sotto controllo",
    description:
      "GDPR, hosting EU, self-hosting disponibile. I tuoi documenti e le conversazioni restano tuoi.",
  },
  {
    Icon: Globe,
    title: "Fatto per l'Italia",
    description:
      "WhatsApp-first, copy in italiano, supporto locale. Pensato per PMI, studi e agenzie.",
  },
] as const;

export const PlatformBenefits = () => (
  <section className="bg-[#F6F2EA] py-20 md:py-28">
    <div className="mx-auto max-w-6xl px-6">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#0E5F52]">
          Piattaforma chatbot completa
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#14231E] md:text-4xl">
          Progettato per far crescere il business, non solo rispondere
        </h2>
        <p className="mt-4 text-lg text-[#586863]">
          Tutto ciò che ti aspetti da una piattaforma enterprise — builder
          visuale, multicanale e automazioni — con la semplicità che le PMI
          italiane meritano.
        </p>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {benefits.map((benefit) => (
          <div
            key={benefit.title}
            className="rounded-2xl border border-[#E4DCCE]/80 bg-white p-7 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#093C33]/10"
          >
            <div className="grid size-11 place-items-center rounded-xl bg-[#E6F1EB] text-[#0E5F52]">
              <benefit.Icon className="size-5" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-[#14231E]">
              {benefit.title}
            </h3>
            <p className="mt-2 text-[#586863]">{benefit.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
