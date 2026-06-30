import { createFileRoute } from "@tanstack/react-router";
import { NucleoLanding } from "@/features/homepage/nucleo/Landing";
import { createMetaTags } from "@/lib/createMetaTags";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: createMetaTags({
      title: "NUCLEO AI — Chatbot per PMI italiane, con o senza AI",
      description:
        "Crea chatbot su WhatsApp e sito web in pochi minuti. Flussi guidati senza AI, intelligenza artificiale sui tuoi documenti, o entrambi. No-code, multicanale, GDPR. Inizia gratis.",
      imagePath: "/images/default-og.png",
      path: "",
    }),
  }),
  component: Home,
});

function Home() {
  return <NucleoLanding />;
}
