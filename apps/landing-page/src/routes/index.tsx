import { createFileRoute } from "@tanstack/react-router";
import { NucleoLanding } from "@/features/homepage/nucleo/Landing";
import { createMetaTags } from "@/lib/createMetaTags";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: createMetaTags({
      title: "NUCLEO AI — Sistema Operativo AI per PMI italiane",
      description:
        "NUCLEO AI conosce la tua azienda e agisce nei tuoi processi: risponde coi tuoi documenti, prenota appuntamenti, automatizza preventivi e notifiche. Chatbot, RAG, workflow e integrazioni gestionali. Dati in EU, chiavi in mano.",
      imagePath: "/images/default-og.png",
      path: "",
    }),
  }),
  component: Home,
});

function Home() {
  return <NucleoLanding />;
}
