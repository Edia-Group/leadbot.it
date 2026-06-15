import { createFileRoute } from "@tanstack/react-router";
import { ContentPageWrapper } from "@/components/ContentPageWrapper";
import { WhyLeadBotCta } from "@/components/cta/WhyLeadbotCta";
import { createMetaTags } from "@/lib/createMetaTags";

export const Route = createFileRoute("/_layout/casi-duso")({
  head: () => ({
    meta: createMetaTags({
      title: "Casi d'uso | LeadBot",
      description:
        "Come professionisti e PMI italiane usano LeadBot per qualificare lead, fissare appuntamenti e rispondere ai clienti in automatico, anche su WhatsApp.",
      imagePath: "/images/default-og.png",
      path: "/casi-duso",
    }),
  }),
  component: RouteComponent,
});

const useCases = [
  {
    title: "Qualifica i contatti",
    description:
      "Raccogli budget, zona ed esigenze prima di richiamare, così parli solo con chi è davvero interessato e non perdi tempo al telefono.",
  },
  {
    title: "Fissa appuntamenti",
    description:
      "Il cliente sceglie data e ora direttamente in chat e la prenotazione finisce nel tuo calendario. Niente scambi di email avanti e indietro.",
  },
  {
    title: "Raccogli documenti",
    description:
      "Fai caricare documenti, foto e moduli direttamente nella conversazione: tutto ordinato e pronto, senza rincorrere il cliente.",
  },
  {
    title: "Rispondi 24/7 alle domande frequenti",
    description:
      "Orari, sedi, prezzi, come funziona il servizio: il bot risponde subito alle domande ricorrenti, anche di notte e nei weekend.",
  },
  {
    title: "Follow-up automatici",
    description:
      "Chi non risponde entro 48 ore riceve in automatico un promemoria via messaggio o email. Nessun lead lasciato per strada.",
  },
  {
    title: "Conversazioni su WhatsApp",
    description:
      "Incontra i clienti dove già scrivono ogni giorno: porta tutto il flusso su WhatsApp e aumenta i tassi di risposta.",
  },
];

const industries = [
  "Agenzie immobiliari",
  "Studi legali e avvocati",
  "Commercialisti e consulenti",
  "Assicurazioni e consulenti finanziari",
  "Agenzie di viaggio",
  "Studi medici e dentistici",
];

function RouteComponent() {
  return (
    <ContentPageWrapper>
      <div className="max-w-5xl mx-auto flex flex-col gap-16 w-full">
        <div className="flex flex-col gap-6 max-w-2xl">
          <h1>Casi d'uso</h1>
          <p className="text-xl text-muted-foreground">
            LeadBot aiuta professionisti e piccole imprese italiane a generare
            più clienti e a togliersi di dosso le attività ripetitive. Ecco
            come.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((useCase) => (
            <div
              key={useCase.title}
              className="flex flex-col gap-3 p-6 rounded-xl bg-white border border-border"
            >
              <h3 className="text-xl">{useCase.title}</h3>
              <p className="text-muted-foreground">{useCase.description}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-6">
          <h2>Pensato per il tuo settore</h2>
          <div className="flex flex-wrap gap-3">
            {industries.map((industry) => (
              <span
                key={industry}
                className="px-4 py-2 rounded-full bg-white border border-border text-sm"
              >
                {industry}
              </span>
            ))}
          </div>
        </div>
      </div>
      <WhyLeadBotCta />
    </ContentPageWrapper>
  );
}
