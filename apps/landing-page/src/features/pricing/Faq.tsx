import { buttonVariants } from "@typebot.io/ui/components/Button";
import { ArrowDown01Icon } from "@typebot.io/ui/icons/ArrowDown01Icon";
import { ArrowUp01Icon } from "@typebot.io/ui/icons/ArrowUp01Icon";
import { cn } from "@typebot.io/ui/lib/cn";
import { motion } from "motion/react";
import { type ReactNode, useState } from "react";

const data = [
  {
    title: "Cosa si intende per chat mensile?",
    content: (
      <>
        Una chat viene conteggiata ogni volta che un utente avvia una
        conversazione, indipendentemente dal numero di messaggi inviati e
        ricevuti. Ad esempio, se un utente avvia una conversazione e invia 10
        messaggi al bot, conta come 1 chat. Se l'utente torna a scrivere più
        tardi e la sua sessione viene ricordata, non viene conteggiata come una
        nuova chat. <br />
        <br />
        Un modo semplice per pensarci: 1 chat equivale a una riga nella tua
        tabella Risultati.
      </>
    ),
  },
  {
    title: "Cosa succede quando raggiungo il limite di chat incluse?",
    content: (
      <>
        Ottimo, i tuoi bot stanno lavorando a pieno ritmo. 🚀
        <br />
        <br />
        Riceverai prima un'email di avviso quando raggiungi l'80% del limite
        incluso. Una volta arrivato al 100%, riceverai un'ulteriore notifica via
        email.
        <br />
        <br />
        Dopodiché, il tuo limite di chat passerà automaticamente alla fascia
        successiva.
      </>
    ),
  },
  {
    title: "Posso disdire o cambiare l'abbonamento in qualsiasi momento?",
    content: (
      <>
        Sì, puoi disdire, fare upgrade o downgrade dell'abbonamento in qualsiasi
        momento. Non c'è alcun vincolo di durata minima.
        <br />
        <br />
        Quando fai upgrade o downgrade, hai subito accesso alle nuove opzioni. La
        fattura successiva riporterà un importo proporzionale.
      </>
    ),
  },
  {
    title: "Offrite pagamenti annuali?",
    content: (
      <>
        No, poiché il prezzo degli abbonamenti si basa sull'utilizzo delle chat,
        possiamo offrire solo piani mensili.
      </>
    ),
  },
];

export const Faq = () => {
  return (
    <div className="flex flex-col gap-8 max-w-4xl w-full">
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
      className="p-4 rounded-xl bg-white border border-border cursor-pointer"
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
