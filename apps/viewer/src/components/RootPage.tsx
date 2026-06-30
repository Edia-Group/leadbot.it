export const RootPage = ({ dashboardUrl }: { dashboardUrl: string }) => (
  <div
    style={{
      height: "100dvh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    }}
  >
    <div>
      <h1 style={{ fontWeight: "bold", fontSize: "30px" }}>
        Benvenuto in NUCLEO
      </h1>
      <p>
        NUCLEO è il Sistema Operativo AI per PMI italiane: chatbot con la memoria
        della tua azienda, integrati su sito web e WhatsApp.
      </p>
      <p>
        Go to the <a href={dashboardUrl}>dashboard</a>.
      </p>
    </div>
  </div>
);
