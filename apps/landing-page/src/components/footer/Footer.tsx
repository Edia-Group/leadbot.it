import { LeadBotLogoFull } from "@/components/LeadBotLogo";
import { TextLink } from "@/components/link";
import gradientSeparatorSrc from "./assets/gradient-separator.png";

const data = [
  {
    title: "Prodotto",
    links: [
      {
        label: "Prezzi",
        to: "/pricing",
      },
      {
        label: "Template",
        to: "/templates",
      },
    ],
  },
  {
    title: "Risorse",
    links: [
      {
        label: "Blog",
        to: "/blog",
      },
      {
        label: "Chatbot per generazione lead",
        to: "/blog/$slug",
        params: {
          slug: "lead-generation-chatbot",
        },
      },
    ],
  },
  {
    title: "Azienda",
    links: [
      {
        label: "Chi siamo",
        to: "/about",
      },
      {
        label: "Termini di Servizio",
        to: "/$slug",
        params: {
          slug: "terms-of-service",
        },
      },
      {
        label: "Privacy Policy",
        to: "/$slug",
        params: {
          slug: "privacy-policy",
        },
      },
      {
        label: "Cookie Policy",
        to: "/$slug",
        params: {
          slug: "cookie-policy",
        },
      },
      {
        label: "Business Continuity",
        to: "/$slug",
        params: {
          slug: "business-continuity",
        },
      },
    ],
  },
] as const;

export const Footer = () => {
  return (
    <footer className="dark flex flex-col pb-12">
      <img src={gradientSeparatorSrc} alt="separator" className="w-full h-2" />
      <div className="flex flex-col max-w-7xl mx-auto px-6 md:px-4 w-full">
        <div className="flex flex-col md:flex-row gap-12 py-12 items-start">
          <LeadBotLogoFull className="mt-1" />
          <div className="flex flex-col md:flex-row gap-8 md:justify-around w-full">
            {data.map((item) => (
              <div className="flex flex-col gap-3" key={item.title}>
                <h3 className="text-2xl">{item.title}</h3>
                <ul className="flex flex-col gap-1">
                  {item.links.map((link) => (
                    <li key={link.label}>
                      <TextLink
                        to={link.to}
                        params={"params" in link ? link.params : undefined}
                        className="text-muted-foreground font-normal"
                        size="sm"
                      >
                        {link.label}
                      </TextLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <p className="text-foreground/70 text-sm">
          Tutti i diritti riservati 2026 - NUCLEO
        </p>
      </div>
    </footer>
  );
};
