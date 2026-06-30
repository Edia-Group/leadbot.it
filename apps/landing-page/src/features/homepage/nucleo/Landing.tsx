import type { SVGProps } from "react";

/* ---------- icons (coherent with the platform dashboard) ---------- */
const s = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};
type P = SVGProps<SVGSVGElement>;
const Brain = (p: P) => (
  <svg {...s} {...p}>
    <path d="M9 3a3 3 0 0 0-3 3 3 3 0 0 0-1 5.8A3 3 0 0 0 6 17a3 3 0 0 0 3 3 2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Z" />
    <path d="M15 3a3 3 0 0 1 3 3 3 3 0 0 1 1 5.8A3 3 0 0 1 18 17a3 3 0 0 1-3 3 2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
  </svg>
);
const Zap = (p: P) => (
  <svg {...s} {...p}>
    <path d="M13 2 4 14h7l-1 8 9-12h-7z" />
  </svg>
);
const Calendar = (p: P) => (
  <svg {...s} {...p}>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </svg>
);
const Chat = (p: P) => (
  <svg {...s} {...p}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);
const Check = (p: P) => (
  <svg {...s} {...p}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
);
const X = (p: P) => (
  <svg {...s} {...p}>
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);
const Arrow = (p: P) => (
  <svg {...s} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
const NucleoMark = (p: P) => (
  <svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" {...p}>
    <rect width="36" height="36" rx="9" fill="#1E40AF" />
    <circle cx="18" cy="18" r="4.6" fill="#fff" />
    <circle cx="18" cy="7" r="2.1" fill="#93C5FD" />
    <circle cx="18" cy="29" r="2.1" fill="#93C5FD" />
    <circle cx="7" cy="18" r="2.1" fill="#93C5FD" />
    <circle cx="29" cy="18" r="2.1" fill="#93C5FD" />
    <path
      d="M18 11.4v-2.3M18 24.6v2.3M11.4 18H9.1M24.6 18h2.3"
      stroke="#60A5FA"
      strokeWidth="1.6"
    />
  </svg>
);

/* ---------- data ---------- */
const modules = [
  {
    icon: Brain,
    name: "Cervello Documentale",
    desc: "Carichi una volta i documenti aziendali. L'AI risponde con dati reali, non allucinazioni. Aggiorni un file, tutte le risposte si aggiornano.",
  },
  {
    icon: Zap,
    name: "Motore Workflow",
    desc: "L'AI non risponde solo: agisce. Preventivo oltre soglia? Notifica il titolare. Pratica in scadenza? Avvisa. If-this-then-that aziendale.",
  },
  {
    icon: Calendar,
    name: "Appuntamenti AI",
    desc: "Il cliente prenota da sito o WhatsApp. L'AI controlla la disponibilità, blocca lo slot su Google Calendar, invia conferma e reminder.",
  },
  {
    icon: Chat,
    name: "Chatbot Aziendale",
    desc: "Non un generico bot: ha la memoria dell'intera azienda. Risponde col tuo listino, i tuoi orari, le tue procedure. White-label sul tuo sito.",
  },
];

const comparison: Array<[string, boolean, string]> = [
  ["Knowledge base aziendale persistente", false, "RAG permanente, aggiornabile"],
  ["Prenotazione appuntamenti automatica", false, "Calendario + WhatsApp"],
  ["Workflow operativi (approvazioni, notifiche)", false, "Engine regole + AI"],
  ["Chatbot white-label sul tuo sito", false, "Branded, multi-canale"],
  ["WhatsApp Business nativo", false, "Canale bidirezionale"],
  ["Integrazione gestionali italiani", false, "Danea, Zucchetti, FattureInCloud"],
  ["Self-hosting / dati in EU (GDPR)", false, "VPS Italia / EU"],
  ["Setup chiavi in mano", false, "Configuriamo tutto noi"],
];

const plans = [
  {
    name: "BASE",
    setup: "€1.500",
    price: "€149",
    items: ["Chatbot Aziendale", "Cervello Documentale"],
    highlight: false,
  },
  {
    name: "PROFESSIONAL",
    setup: "€2.500",
    price: "€199",
    items: ["Tutto di BASE", "Motore Workflow", "Appuntamenti AI"],
    highlight: true,
  },
  {
    name: "ENTERPRISE",
    setup: "€4.000",
    price: "€249",
    items: ["Tutto di PRO", "Portale B2B", "Integrazioni gestionali"],
    highlight: false,
  },
];

/* ---------- page ---------- */
export const NucleoLanding = () => (
  <div className="bg-[#f8fafc] text-[#0f172a]">
    {/* Hero */}
    <section className="bg-[#0f172a] text-white">
      <div className="mx-auto max-w-5xl px-6 pt-36 pb-24 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-medium text-blue-200">
          <NucleoMark className="size-4" /> Sistema Operativo AI per PMI italiane
        </span>
        <h1 className="mx-auto mt-7 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
          ChatGPT scrive.{" "}
          <span className="text-[#60a5fa]">NUCLEO lavora.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
          L'AI che conosce la tua azienda e agisce nei tuoi processi: risponde
          coi tuoi documenti, prenota appuntamenti, automatizza preventivi e
          notifiche. Chiavi in mano, dati in EU.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#contatti"
            className="inline-flex items-center gap-2 rounded-xl bg-[#2563eb] px-6 py-3 font-semibold text-white transition hover:bg-[#1d4ed8]"
          >
            Richiedi una demo <Arrow className="size-4" />
          </a>
          <a
            href="#moduli"
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
          >
            Scopri i moduli
          </a>
        </div>
        <p className="mt-6 text-sm text-slate-400">
          Pensato per PMI da 10 a 50 dipendenti · Servizi, commercio,
          professionisti, officine, studi
        </p>
      </div>
    </section>

    {/* Moduli */}
    <section id="moduli" className="mx-auto max-w-6xl px-6 py-20">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
          Quattro moduli, un solo cervello
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-slate-500">
          Non un altro abbonamento AI da configurare a mano. Un sistema che
          integra l'AI nei processi reali della tua impresa.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {modules.map((m) => {
          const Icon = m.icon;
          return (
            <div
              key={m.name}
              className="rounded-2xl border border-[#e2e8f0] bg-white p-7 transition hover:shadow-lg hover:shadow-slate-200/60"
            >
              <div className="mb-4 grid size-12 place-items-center rounded-xl bg-[#dbeafe] text-[#1e40af]">
                <Icon className="size-6" />
              </div>
              <h3 className="text-lg font-bold">{m.name}</h3>
              <p className="mt-2 text-slate-500">{m.desc}</p>
            </div>
          );
        })}
      </div>
    </section>

    {/* Confronto */}
    <section className="bg-white py-20">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
            ChatGPT Business vs NUCLEO AI
          </h2>
          <p className="mt-3 text-slate-500">
            ChatGPT è un assistente generico. NUCLEO è il tuo sistema operativo.
          </p>
        </div>
        <div className="overflow-hidden rounded-2xl border border-[#e2e8f0]">
          <div className="grid grid-cols-[1fr_120px_1fr] bg-[#0f172a] text-sm font-semibold text-white">
            <div className="px-5 py-4">Funzionalità</div>
            <div className="px-5 py-4 text-center text-slate-300">
              ChatGPT
            </div>
            <div className="px-5 py-4 text-center text-[#60a5fa]">NUCLEO</div>
          </div>
          {comparison.map(([feat, , nucleo], i) => (
            <div
              key={feat}
              className={`grid grid-cols-[1fr_120px_1fr] items-center text-sm ${
                i % 2 ? "bg-[#f8fafc]" : "bg-white"
              }`}
            >
              <div className="px-5 py-3.5 font-medium">{feat}</div>
              <div className="flex justify-center px-5 py-3.5">
                <X className="size-5 text-slate-300" />
              </div>
              <div className="flex items-center gap-2 px-5 py-3.5 text-[#15803d]">
                <Check className="size-5 shrink-0" />
                <span className="text-slate-600">{nucleo}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Pricing */}
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
          Pacchetti chiari, chiavi in mano
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-slate-500">
          Setup una tantum + canone mensile flat. Configuriamo tutto noi.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((p) => (
          <div
            key={p.name}
            className={`flex flex-col rounded-2xl border p-7 ${
              p.highlight
                ? "border-[#2563eb] bg-white shadow-xl shadow-blue-200/40 ring-1 ring-[#2563eb]"
                : "border-[#e2e8f0] bg-white"
            }`}
          >
            {p.highlight && (
              <span className="mb-3 w-fit rounded-full bg-[#dbeafe] px-3 py-1 text-xs font-bold text-[#1e40af]">
                PIÙ SCELTO
              </span>
            )}
            <h3 className="text-sm font-bold tracking-widest text-slate-500">
              {p.name}
            </h3>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-4xl font-extrabold">{p.price}</span>
              <span className="text-slate-500">/mese</span>
            </div>
            <div className="mt-1 text-sm text-slate-500">
              + {p.setup} setup una tantum
            </div>
            <ul className="mt-6 flex flex-col gap-3">
              {p.items.map((it) => (
                <li key={it} className="flex items-center gap-2.5 text-sm">
                  <Check className="size-4 shrink-0 text-[#15803d]" />
                  {it}
                </li>
              ))}
            </ul>
            <a
              href="#contatti"
              className={`mt-7 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold transition ${
                p.highlight
                  ? "bg-[#2563eb] text-white hover:bg-[#1d4ed8]"
                  : "border border-[#e2e8f0] bg-[#f8fafc] text-[#0f172a] hover:bg-slate-100"
              }`}
            >
              Richiedi {p.name}
            </a>
          </div>
        ))}
      </div>
    </section>

    {/* CTA */}
    <section id="contatti" className="bg-[#0f172a] text-white">
      <div className="mx-auto max-w-4xl px-6 py-20 text-center">
        <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
          Pronto a far lavorare l'AI nella tua azienda?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-slate-300">
          Ti mostriamo NUCLEO sui tuoi documenti reali in una demo di 30 minuti.
          Nessun impegno.
        </p>
        <a
          href="mailto:ciao@nucleoai.it"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#2563eb] px-7 py-3.5 font-semibold text-white transition hover:bg-[#1d4ed8]"
        >
          Prenota la demo <Arrow className="size-4" />
        </a>
      </div>
    </section>
  </div>
);
