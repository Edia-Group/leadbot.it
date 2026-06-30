import { IconDoc, IconUpload } from "@/components/icons";

const docs = [
  { name: "Listino prezzi 2026.pdf", chunks: 84, status: "Indicizzato", c: "green", when: "Oggi" },
  { name: "Contratto tipo servizi.docx", chunks: 41, status: "Indicizzato", c: "green", when: "Ieri" },
  { name: "Procedure interne.pdf", chunks: 132, status: "Indicizzato", c: "green", when: "2 giorni fa" },
  { name: "Condizioni generali.pdf", chunks: 0, status: "In elaborazione", c: "amber", when: "ora" },
];

export default function CervelloPage() {
  return (
    <>
      <div className="page-head">
        <h2>Cervello Documentale</h2>
        <p>
          Carichi una volta i documenti aziendali. L&apos;AI risponde usando dati
          reali, non allucinazioni. Aggiorni un file, tutte le risposte si
          aggiornano.
        </p>
      </div>

      <div className="grid grid-3" style={{ marginBottom: 16 }}>
        <div className="card stat">
          <div className="label">Documenti</div>
          <div className="value">24</div>
        </div>
        <div className="card stat">
          <div className="label">Chunk indicizzati</div>
          <div className="value">486</div>
        </div>
        <div className="card stat">
          <div className="label">Embedding</div>
          <div className="value" style={{ fontSize: 18, marginTop: 12 }}>
            text-embedding-3-small
          </div>
          <div className="hint">pgvector · HNSW · 1536d</div>
        </div>
      </div>

      <div className="grid grid-2">
        <div className="card" style={{ gridColumn: "span 1" }}>
          <div className="card-title">
            <h3>Documenti</h3>
            <button className="btn">
              <IconUpload /> Carica documento
            </button>
          </div>
          <table>
            <thead>
              <tr>
                <th>Documento</th>
                <th>Chunk</th>
                <th>Stato</th>
                <th>Aggiornato</th>
              </tr>
            </thead>
            <tbody>
              {docs.map((d) => (
                <tr key={d.name}>
                  <td>
                    <div className="row" style={{ gap: 9 }}>
                      <IconDoc style={{ width: 17, height: 17, color: "#64748b" }} />
                      {d.name}
                    </div>
                  </td>
                  <td>{d.chunks || "—"}</td>
                  <td>
                    <span className={`badge ${d.c}`}>{d.status}</span>
                  </td>
                  <td className="muted">{d.when}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card">
          <div className="card-title">
            <h3>Prova la Knowledge Base</h3>
            <span className="badge blue">blocco NucleoQuery</span>
          </div>
          <div
            className="chip"
            style={{ display: "block", padding: "12px 14px", marginBottom: 12 }}
          >
            Qual è il prezzo del servizio premium?
          </div>
          <div
            style={{
              background: "var(--bg)",
              border: "1px solid var(--border)",
              borderRadius: 10,
              padding: 14,
            }}
          >
            <div style={{ fontWeight: 600, marginBottom: 6 }}>Risposta</div>
            <p className="muted">
              Il <strong>servizio premium</strong> ha un costo di
              <strong> €249/mese</strong> (pacchetto Enterprise), setup €4.000,
              include portale B2B e integrazioni gestionali.
            </p>
            <div className="hint" style={{ marginTop: 10 }}>
              Fonti: Listino prezzi 2026.pdf · Condizioni generali.pdf
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
