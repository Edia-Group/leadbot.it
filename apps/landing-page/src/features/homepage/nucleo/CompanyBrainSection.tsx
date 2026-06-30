import { CtaButtonLink } from "@/components/link";
import { registerUrl } from "@/constants";
import { Brain, Message, Users } from "./icons";

const sources = [
  "PDF, Word e policy interne",
  "Listini, preventivi e cataloghi",
  "Procedure operative e FAQ",
  "Contatti, clienti e rubrica aziendale",
  "Google Drive, Notion, sito web (via integrazioni)",
] as const;

const internalUses = [
  "Onboarding nuovi collaboratori",
  "Procedure HR e compliance",
  "Supporto interno IT / amministrazione",
  "Ricerca rapida su documenti sparsi",
] as const;

const externalUses = [
  "FAQ e supporto clienti 24/7",
  "Qualificazione lead e preventivi",
  "Prenotazione appuntamenti",
  "Assistenza su WhatsApp e sito web",
] as const;

export const CompanyBrainSection = () => (
  <section id="cervello-aziendale" className="bg-white py-20 md:py-28">
    <div className="mx-auto max-w-6xl px-6">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#0E5F52]">
          Integrazione nel contesto aziendale
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#14231E] md:text-4xl">
          Un cervello che conosce la tua azienda
        </h2>
        <p className="mt-4 text-lg text-[#586863]">
          Carichi documenti, contatti e conoscenza operativa una sola volta.
          NUCLEO li collega ai tuoi processi: un assistente per il team interno
          e uno per i clienti — stessi dati, accessi diversi.
        </p>
      </div>

      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-[#E4DCCE] bg-[#F6F2EA] p-7 lg:col-span-1">
          <div className="grid size-11 place-items-center rounded-xl bg-[#E6F1EB] text-[#0E5F52]">
            <Brain className="size-5" />
          </div>
          <h3 className="mt-4 text-lg font-bold text-[#14231E]">
            Le tue fonti
          </h3>
          <p className="mt-2 text-sm text-[#586863]">
            Tutto ciò che serve per rispondere con dati reali, non
            allucinazioni.
          </p>
          <ul className="mt-5 flex flex-col gap-2.5">
            {sources.map((source) => (
              <li
                key={source}
                className="flex gap-2 text-sm text-[#586863] before:mt-2 before:size-1.5 before:shrink-0 before:rounded-full before:bg-[#0E5F52] before:content-['']"
              >
                {source}
              </li>
            ))}
          </ul>
        </div>

        <BrainCard
          icon={Users}
          title="Cervello interno"
          subtitle="Per il tuo team"
          description="Un assistente che i dipendenti interrogano su procedure, documenti e informazioni operative — senza disturbare colleghi o cercare in cartelle."
          uses={internalUses}
          accent="border-[#0E5F52] bg-linear-to-b from-[#E6F1EB] to-white"
        />

        <BrainCard
          icon={Message}
          title="Cervello esterno"
          subtitle="Per i tuoi clienti"
          description="Lo stesso patrimonio informativo, esposto su sito e WhatsApp: risponde ai clienti con tono e limiti che decidi tu."
          uses={externalUses}
          accent="border-emerald-200 bg-linear-to-b from-emerald-50/80 to-white"
        />
      </div>

      <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-[#586863]">
        Aggiorni un documento → tutte le risposte si aggiornano. Permessi e
        canali separati: ciò che è interno resta interno, ciò che è pubblico
        resta sotto controllo.
      </p>

      <div className="mt-8 flex justify-center">
        <CtaButtonLink size="lg" href={registerUrl}>
          Prova con i tuoi documenti
        </CtaButtonLink>
      </div>
    </div>
  </section>
);

const BrainCard = ({
  icon: Icon,
  title,
  subtitle,
  description,
  uses,
  accent,
}: {
  icon: typeof Users;
  title: string;
  subtitle: string;
  description: string;
  uses: readonly string[];
  accent: string;
}) => (
  <div className={`rounded-2xl border p-7 ${accent}`}>
    <div className="flex items-center gap-3">
      <div className="grid size-11 place-items-center rounded-xl bg-white text-[#0E5F52] shadow-sm">
        <Icon className="size-5" />
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-[#9AA197]">
          {subtitle}
        </p>
        <h3 className="text-lg font-bold text-[#14231E]">{title}</h3>
      </div>
    </div>
    <p className="mt-4 text-sm text-[#586863]">{description}</p>
    <ul className="mt-5 flex flex-col gap-2">
      {uses.map((use) => (
        <li key={use} className="text-sm text-[#586863]">
          · {use}
        </li>
      ))}
    </ul>
  </div>
);
