import { IconCheck, IconPlug } from "@/components/icons";

const integrations = [
  { name: "FattureInCloud", desc: "Fatture, clienti, articoli · OAuth2", status: "Connesso", c: "green" },
  { name: "WhatsApp Business", desc: "Meta Cloud API · canale bidirezionale", status: "Connesso", c: "green" },
  { name: "Google Calendar", desc: "Disponibilità + prenotazioni", status: "Connesso", c: "green" },
  { name: "Danea Easyfatt", desc: "Import XML/CSV schedulato", status: "Da configurare", c: "amber" },
  { name: "Zucchetti", desc: "Modulo A21 · export/import", status: "Non connesso", c: "gray" },
  { name: "Aruba / SDI", desc: "Lettura fatturazione elettronica", status: "Non connesso", c: "gray" },
];

export default function IntegrazioniPage() {
  return (
    <>
      <div className="page-head">
        <h2>Integrazioni gestionali</h2>
        <p>
          NUCLEO si collega ai gestionali italiani. Niente doppio inserimento:
          legge i dati già processati dove servono.
        </p>
      </div>

      <div className="grid grid-3">
        {integrations.map((i) => (
          <div className="card" key={i.name}>
            <div className="row" style={{ marginBottom: 12 }}>
              <div className="icon-box">
                <IconPlug />
              </div>
              <div className="grow">
                <div style={{ fontWeight: 700 }}>{i.name}</div>
              </div>
            </div>
            <p className="muted" style={{ minHeight: 38 }}>
              {i.desc}
            </p>
            <div
              className="row"
              style={{ justifyContent: "space-between", marginTop: 8 }}
            >
              <span className={`badge ${i.c}`}>
                {i.c === "green" ? <IconCheck style={{ width: 13, height: 13 }} /> : null}
                {i.status}
              </span>
              <button className={`btn ${i.c === "green" ? "ghost" : ""}`}>
                {i.c === "green" ? "Gestisci" : "Connetti"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
