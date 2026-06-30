const channels = [
  { name: "WhatsApp Business", desc: "Il canale #1 in Italia" },
  { name: "Sito web", desc: "Widget embed o popup" },
  { name: "Link diretto", desc: "Condividi ovunque" },
  { name: "Instagram / Messenger", desc: "Via integrazioni" },
  { name: "Email & webhook", desc: "Notifiche e CRM" },
  { name: "API & codice", desc: "Per chi vuole custom" },
] as const;

export const ChannelsSection = () => (
  <section className="dark bg-[#14231E] py-16 text-white">
    <div className="mx-auto max-w-6xl px-6">
      <div className="flex flex-col items-center gap-10 md:flex-row md:justify-between">
        <div className="max-w-md text-center md:text-left">
          <h2 className="text-2xl font-semibold md:text-3xl">
            Un chatbot. Ogni canale.
          </h2>
          <p className="mt-3 text-[#9FC9BD]">
            Progetta una volta, distribuisci dove sono i tuoi clienti — sito,
            WhatsApp, link diretto e integrazioni.
          </p>
        </div>
        <div className="grid w-full max-w-2xl grid-cols-2 gap-3 sm:grid-cols-3">
          {channels.map((channel) => (
            <div
              key={channel.name}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm"
            >
              <p className="text-sm font-semibold">{channel.name}</p>
              <p className="mt-0.5 text-xs text-[#9AA197]">{channel.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
