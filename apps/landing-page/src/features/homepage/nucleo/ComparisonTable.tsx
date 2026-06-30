import { Check, XMark } from "./icons";

const rows = [
  ["Chatbot visuale no-code", "Limitato", "Builder completo"],
  ["Funziona senza AI (flussi guidati)", false, true],
  ["RAG su documenti aziendali", "Base", "Avanzato, multi-fonte"],
  ["WhatsApp Business nativo", false, true],
  ["Integrazioni (Calendar, CRM, webhook)", "Via plugin", "Native"],
  ["White-label sul tuo dominio", false, true],
  ["Self-hosting / dati in EU", false, true],
  ["Prezzo prevedibile per PMI", "Per utente", "Piano flat + free tier"],
] as const;

export const ComparisonTable = () => (
  <section className="bg-white py-20 md:py-28">
    <div className="mx-auto max-w-4xl px-6">
      <div className="text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-[#14231E] md:text-4xl">
          Perché non basta ChatGPT
        </h2>
        <p className="mt-3 text-[#586863]">
          ChatGPT è un assistente generico. NUCLEO è il chatbot che lavora sui
          tuoi canali, con i tuoi processi.
        </p>
      </div>

      <div className="mt-10 overflow-hidden rounded-2xl border border-[#E4DCCE] shadow-sm">
        <div className="grid grid-cols-[1fr_100px_1fr] bg-[#14231E] text-sm font-semibold text-white sm:grid-cols-[1fr_120px_1fr]">
          <div className="px-4 py-4 sm:px-5">Funzionalità</div>
          <div className="px-4 py-4 text-center text-[#9AA197] sm:px-5">
            ChatGPT
          </div>
          <div className="px-4 py-4 text-center text-[#E0A24A] sm:px-5">
            NUCLEO
          </div>
        </div>
        {rows.map(([feature, chatgpt, nucleo], index) => (
          <div
            key={feature}
            className={`grid grid-cols-[1fr_100px_1fr] items-center text-sm sm:grid-cols-[1fr_120px_1fr] ${
              index % 2 ? "bg-[#F6F2EA]" : "bg-white"
            }`}
          >
            <div className="px-4 py-3.5 font-medium text-[#14231E] sm:px-5">
              {feature}
            </div>
            <div className="flex justify-center px-4 py-3.5 sm:px-5">
              {chatgpt === false ? (
                <XMark className="size-5 text-[#9FC9BD]" />
              ) : (
                <span className="text-center text-xs text-[#586863] sm:text-sm">
                  {chatgpt}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 px-4 py-3.5 sm:px-5">
              {nucleo === true ? (
                <Check className="size-5 shrink-0 text-emerald-600" />
              ) : (
                <>
                  <Check className="size-5 shrink-0 text-emerald-600" />
                  <span className="text-[#586863]">{nucleo}</span>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
