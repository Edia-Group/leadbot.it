import { IconChat, IconPlus } from "@/components/icons";

const bots = [
  { name: "Assistente Sito", channels: "Web · WhatsApp", convos: 642, conv: "21%", c: "green" },
  { name: "Qualifica Lead", channels: "Web", convos: 318, conv: "34%", c: "green" },
  { name: "Supporto Clienti", channels: "WhatsApp", convos: 224, conv: "—", c: "blue" },
  { name: "Prenotazioni", channels: "Web · WhatsApp", convos: 100, conv: "48%", c: "green" },
];

export default function ChatbotPage() {
  return (
    <>
      <div className="page-head">
        <h2>Chatbot Aziendale</h2>
        <p>
          Non un generico bot: ha la memoria dell&apos;intera azienda. Risponde
          con il tuo listino, i tuoi orari, le tue procedure. White-label sul
          sito del cliente.
        </p>
      </div>

      <div className="grid grid-4" style={{ marginBottom: 16 }}>
        <div className="card stat">
          <div className="label">Bot attivi</div>
          <div className="value">4</div>
        </div>
        <div className="card stat">
          <div className="label">Conversazioni (30g)</div>
          <div className="value">1.284</div>
        </div>
        <div className="card stat">
          <div className="label">Conversione media</div>
          <div className="value">31%</div>
        </div>
        <div className="card stat">
          <div className="label">Canali</div>
          <div className="value" style={{ fontSize: 18, marginTop: 12 }}>
            Web + WhatsApp
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-title">
          <h3>I tuoi bot</h3>
          <button className="btn">
            <IconPlus /> Nuovo bot
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Bot</th>
              <th>Canali</th>
              <th>Conversazioni</th>
              <th>Conversione</th>
              <th>Stato</th>
            </tr>
          </thead>
          <tbody>
            {bots.map((b) => (
              <tr key={b.name}>
                <td>
                  <div className="row" style={{ gap: 10 }}>
                    <div className="icon-box" style={{ width: 32, height: 32 }}>
                      <IconChat style={{ width: 16, height: 16 }} />
                    </div>
                    <strong>{b.name}</strong>
                  </div>
                </td>
                <td className="muted">{b.channels}</td>
                <td>{b.convos.toLocaleString("it-IT")}</td>
                <td>{b.conv}</td>
                <td>
                  <span className={`badge ${b.c}`}>● Pubblicato</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
