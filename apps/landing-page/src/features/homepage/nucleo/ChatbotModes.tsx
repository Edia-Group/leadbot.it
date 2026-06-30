import { cn } from "@typebot.io/ui/lib/cn";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { CtaButtonLink } from "@/components/link";
import { registerUrl } from "@/constants";
import { Brain, Flow, Layers } from "./icons";

const modes = [
  {
    id: "guided",
    label: "Senza AI",
    badge: "Flussi guidati",
    Icon: Flow,
    title: "Chatbot deterministici che non sbagliano mai",
    description:
      "Perfetto per qualificare lead, raccogliere dati, prenotare appuntamenti e rispondere alle FAQ con percorsi che controlli tu al 100%. Nessun modello da addestrare: trascini i blocchi, pubblichi, funziona.",
    bullets: [
      "Domande a scelta multipla, logiche if/then e ramificazioni",
      "Integrazioni con Google Calendar, Sheets, webhook e CRM",
      "Costi prevedibili: zero token AI da pagare",
      "Ideale per studi professionali, agenzie e e-commerce",
    ],
    highlight: "Come un modulo intelligente, ma in chat.",
  },
  {
    id: "ai",
    label: "Con AI",
    badge: "RAG + LLM",
    Icon: Brain,
    title: "Risposte naturali basate sui tuoi documenti",
    description:
      "Carichi listini, procedure, FAQ e policy. L'AI risponde usando solo le tue fonti — non inventa. Aggiorni un file, tutte le risposte si aggiornano. Scegli il provider che preferisci: OpenAI, Mistral e altri.",
    bullets: [
      "Knowledge base aziendale con RAG permanente",
      "Risposte in linguaggio naturale su WhatsApp e sito web",
      "Controllo su fonti, tono di voce e limiti di risposta",
      "Perfetto per supporto clienti e assistenza interna",
    ],
    highlight: "Il tuo cervello aziendale, sempre aggiornato.",
  },
  {
    id: "hybrid",
    label: "Ibrido",
    badge: "Il meglio dei due",
    Icon: Layers,
    title: "AI quando serve, regole quando conta",
    description:
      "Inizia con un flusso guidato per qualificare il cliente, poi passa all'AI per domande aperte sui tuoi documenti. Oppure l'inverso: l'AI risponde, e se non è sicura escalda a un operatore o a un percorso strutturato.",
    bullets: [
      "Un solo bot, più modalità nella stessa conversazione",
      "Riduci allucinazioni su processi critici (prezzi, consensi, PEC)",
      "Massima conversione: struttura + flessibilità",
      "Configurazione no-code nel builder visuale",
    ],
    highlight: "La formula che usano le piattaforme enterprise — accessibile alle PMI.",
  },
] as const;

export const ChatbotModes = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeMode = modes[activeIndex];

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#0E5F52]">
            Scegli come lavora il tuo bot
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#14231E] md:text-4xl">
            Con AI, senza AI, o entrambi
          </h2>
          <p className="mt-4 text-lg text-[#586863]">
            Non tutti hanno bisogno di un LLM. NUCLEO ti lascia partire con
            flussi semplici e aggiungere l&apos;intelligenza artificiale solo
            quando crea valore reale.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {modes.map((mode, index) => (
            <button
              key={mode.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={cn(
                "rounded-full px-5 py-2.5 text-sm font-semibold transition",
                activeIndex === index
                  ? "bg-[#0E5F52] text-white shadow-lg shadow-[#093C33]/25"
                  : "bg-[#F1ECE1] text-[#586863] hover:bg-[#E4DCCE]",
              )}
            >
              {mode.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeMode.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-center"
          >
            <div className="order-2 lg:order-1">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#E6F1EB] px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#0E5F52]">
                <activeMode.Icon className="size-3.5" />
                {activeMode.badge}
              </span>
              <h3 className="mt-4 text-2xl font-bold text-[#14231E] md:text-3xl">
                {activeMode.title}
              </h3>
              <p className="mt-3 text-[#586863]">{activeMode.description}</p>
              <ul className="mt-6 flex flex-col gap-3">
                {activeMode.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex gap-3 text-sm text-[#586863] md:text-base"
                  >
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#0E5F52]" />
                    {bullet}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm font-medium text-[#0E5F52]">
                {activeMode.highlight}
              </p>
              <CtaButtonLink className="mt-8" size="lg" href={registerUrl}>
                Prova {activeMode.label.toLowerCase()}
              </CtaButtonLink>
            </div>

            <div className="order-1 lg:order-2">
              <ModePreview modeId={activeMode.id} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

const ModePreview = ({ modeId }: { modeId: (typeof modes)[number]["id"] }) => {
  const previews = {
    guided: {
      title: "Qualificazione lead immobiliare",
      steps: [
        { role: "bot", text: "Ciao! Cerchi casa in affitto o vendita?" },
        { role: "user", text: "Vendita" },
        { role: "bot", text: "In quale zona? (es. Milano, Monza…)" },
        { role: "user", text: "Monza" },
        { role: "bot", text: "Budget indicativo? Sotto 300k · 300–500k · Oltre 500k" },
      ],
      footer: "Flusso a regole fisse · 0 token AI",
    },
    ai: {
      title: "Supporto da knowledge base",
      steps: [
        { role: "user", text: "Quali sono i tempi per una perizia?" },
        {
          role: "bot",
          text: "Secondo la procedura interna aggiornata il 12/03, la perizia standard richiede 5–7 giorni lavorativi dalla ricezione della documentazione completa.",
        },
        { role: "user", text: "E se manca il certificato energetico?" },
        {
          role: "bot",
          text: "Senza APE la pratica resta in sospeso. Puoi caricarlo dal portale clienti o inviarlo a pratiche@…",
        },
      ],
      footer: "Risposta da documenti caricati · fonte citata",
    },
    hybrid: {
      title: "Prenotazione + domande libere",
      steps: [
        { role: "bot", text: "Vuoi prenotare una consulenza o hai una domanda?" },
        { role: "user", text: "Ho una domanda sul listino" },
        {
          role: "bot",
          text: "Con i piani a pagamento hai chat illimitate e bot illimitati. Vuoi il dettaglio completo o preferisci fissare una call?",
        },
        { role: "user", text: "Fissiamo una call" },
        { role: "bot", text: "Perfetto — passo al calendario. Quale giorno preferisci?" },
      ],
      footer: "AI → flusso guidato nella stessa chat",
    },
  } as const;

  const preview = previews[modeId];

  return (
    <div className="rounded-2xl border border-[#E4DCCE] bg-linear-to-b from-[#FBF8F1] to-white p-6 shadow-xl shadow-[#093C33]/10">
      <div className="mb-4 flex items-center justify-between border-b border-[#E4DCCE] pb-3">
        <span className="text-xs font-semibold uppercase tracking-wide text-[#9AA197]">
          Anteprima live
        </span>
        <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800">
          Online
        </span>
      </div>
      <p className="text-sm font-semibold text-[#2C3A34]">{preview.title}</p>
      <div className="mt-4 flex flex-col gap-3">
        {preview.steps.map((step, index) => (
          <div
            key={`${step.role}-${index}`}
            className={cn(
              "max-w-[90%] rounded-2xl px-4 py-2.5 text-sm",
              step.role === "bot"
                ? "self-start rounded-bl-md bg-[#0E5F52] text-white"
                : "self-end rounded-br-md bg-[#E0A24A] font-medium text-[#14231E]",
            )}
          >
            {step.text}
          </div>
        ))}
      </div>
      <p className="mt-4 text-center text-xs text-[#9AA197]">{preview.footer}</p>
    </div>
  );
};
