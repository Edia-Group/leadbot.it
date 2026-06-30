import { buttonVariants } from "@typebot.io/ui/components/Button";
import { ArrowDown01Icon } from "@typebot.io/ui/icons/ArrowDown01Icon";
import { ArrowUp01Icon } from "@typebot.io/ui/icons/ArrowUp01Icon";
import { cn } from "@typebot.io/ui/lib/cn";
import { motion } from "motion/react";
import { type ReactNode, useState } from "react";
import { TextLink } from "@/components/link";
import { docsUrl } from "../../../constants";

const data = [
  {
    title:
      "Quali sono i piani tariffari e quali funzionalità sono incluse nel piano gratuito?",
    content: (
      <>
        NUCLEO offre piani tariffari flessibili per adattarsi a liberi
        professionisti, startup e grandi aziende. Il piano{" "}
        <span className="font-bold">Gratuito</span> include{" "}
        <span className="font-bold">1 bot</span> e{" "}
        <span className="font-bold">50 chat al mese</span> — solo per dare
        un&apos;occhiata e provare la piattaforma. Integrazioni native, webhook
        e personalizzazione base incluse. <br />
        <br /> Per maggiori dettagli sui nostri piani Starter e Pro, consulta la{" "}
        <TextLink to="/pricing">Pagina dei Prezzi</TextLink>.
      </>
    ),
  },
  {
    title:
      "Quanto è facile integrare NUCLEO con i miei sistemi e piattaforme esistenti?",
    content: (
      <>
        Integrare NUCLEO con i tuoi sistemi è semplicissimo. Forniamo
        istruzioni chiare passo-passo per guidarti nel processo. NUCLEO
        supporta una vasta gamma di piattaforme, tra cui WhatsApp Business
        (fondamentale per il mercato italiano), WordPress, Shopify, Notion,
        Webflow e molte altre.
      </>
    ),
  },
  {
    title:
      "Che tipo di funzionalità di Intelligenza Artificiale offre NUCLEO?",
    content: (
      <>
        NUCLEO è agnostico rispetto ai fornitori di IA (OpenAI, Mistral, ecc.)
        e puoi usare il chatbot anche <span className="font-bold">senza AI</span>
        , con soli flussi guidati.
        <br />
        <br />
        Con l&apos;AI attiva, carichi documenti aziendali e crei un{" "}
        <span className="font-bold">cervello interno</span> per il team e/o un{" "}
        <span className="font-bold">cervello esterno</span> per clienti su sito
        e WhatsApp — stesse fonti, permessi diversi.
      </>
    ),
  },
  {
    title:
      "Che tipo di supporto e risorse sono disponibili se ho bisogno di aiuto?",
    content: (
      <>
        Se riscontri problemi o hai bisogno di assistenza, NUCLEO offre diverse
        opzioni:
        <ol className="list-decimal list-inside flex flex-col gap-6 py-6">
          <li>
            <TextLink href={docsUrl} target="_blank">
              Documentazione
            </TextLink>
            : La nostra documentazione completa è aggiornata regolarmente per
            coprire ogni possibile dubbio. Usa la barra di ricerca per trovare
            rapidamente le informazioni.
          </li>
          <li>
            <span className="font-bold">Supporto Diretto per Abbonati</span>:
            Gli utenti dei piani Starter o Pro possono scriverci direttamente
            tramite il widget di chat all'interno dell'app per ricevere supporto
            prioritario.
          </li>
        </ol>
      </>
    ),
  },
  {
    title: "Quanto è sicuro NUCLEO e come gestite la privacy dei dati?",
    content: (
      <p>
        NUCLEO è certificato ISO 27001, a dimostrazione del nostro impegno nel
        mantenere i più alti standard di sicurezza delle informazioni. Il nostro
        principio guida è raccogliere solo i dati necessari per fornirti il
        miglior servizio, nel pieno rispetto del GDPR.
        <br />
        <br />
        Per informazioni dettagliate, consulta la nostra{" "}
        <TextLink to="/$slug" params={{ slug: "privacy-policy" }}>
          privacy policy
        </TextLink>
      </p>
    ),
  },
];

export const Faq = () => {
  return (
    <div className="flex flex-col gap-8 max-w-4xl">
      <h2>FAQ</h2>
      <div className="flex flex-col gap-2">
        {data.map(({ title, content }) => (
          <Question key={title} title={title}>
            {content}
          </Question>
        ))}
      </div>
    </div>
  );
};

const Question = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <details
      className="p-4 rounded-xl bg-card text-card-foreground cursor-pointer"
      onToggle={(e) => setIsOpen((e.target as HTMLDetailsElement).open)}
    >
      <summary className="font-display font-medium text-2xl flex justify-between list-none md:gap-12">
        {title}
        <span
          className={cn(
            buttonVariants({ variant: "secondary", size: "icon" }),
            "shrink-0 [&_svg]:size-6",
          )}
        >
          {isOpen ? <ArrowUp01Icon className="size-8" /> : <ArrowDown01Icon />}
        </span>
      </summary>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.4, type: "spring", bounce: 0.15 }}
      >
        <hr className="my-4" />
        {children}
      </motion.div>
    </details>
  );
};
