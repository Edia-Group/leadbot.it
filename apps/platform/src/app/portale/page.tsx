const clients = [
  { name: "Studio Bianchi", contact: "m.bianchi@studio.it", invoices: 12, tickets: 1, c: "amber" },
  { name: "Verdi & Co SRL", contact: "info@verdico.it", invoices: 34, tickets: 0, c: "green" },
  { name: "Officina Neri", contact: "neri@officinaneri.it", invoices: 8, tickets: 2, c: "red" },
  { name: "Anna Russo", contact: "anna.russo@pec.it", invoices: 5, tickets: 0, c: "green" },
];

const tickets = [
  { id: "#318", subject: "Richiesta nota di credito", client: "Studio Bianchi", c: "amber", s: "Aperto" },
  { id: "#317", subject: "Problema accesso area riservata", client: "Officina Neri", c: "red", s: "Urgente" },
  { id: "#315", subject: "Conferma appuntamento", client: "Verdi & Co", c: "green", s: "Risolto" },
];

export default function PortalePage() {
  return (
    <>
      <div className="page-head">
        <h2>Portale B2B</h2>
        <p>
          Area riservata per i clienti del tenant: login, storico fatture,
          ticket. Auth separata (magic link / JWT), isolata dall&apos;auth
          interna.
        </p>
      </div>

      <div className="grid grid-3" style={{ marginBottom: 16 }}>
        <div className="card stat">
          <div className="label">Clienti attivi</div>
          <div className="value">48</div>
        </div>
        <div className="card stat">
          <div className="label">Ticket aperti</div>
          <div className="value">7</div>
          <div className="delta down">2 urgenti</div>
        </div>
        <div className="card stat">
          <div className="label">Fatture sincronizzate</div>
          <div className="value">1.204</div>
          <div className="hint">da FattureInCloud</div>
        </div>
      </div>

      <div className="grid grid-2">
        <div className="card">
          <div className="card-title">
            <h3>Clienti</h3>
            <span className="badge blue">area riservata</span>
          </div>
          <table>
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Fatture</th>
                <th>Ticket</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((c) => (
                <tr key={c.name}>
                  <td>
                    <div style={{ fontWeight: 600 }}>{c.name}</div>
                    <div className="hint">{c.contact}</div>
                  </td>
                  <td>{c.invoices}</td>
                  <td>
                    <span className={`badge ${c.c}`}>{c.tickets}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card">
          <div className="card-title">
            <h3>Ticket recenti</h3>
          </div>
          <div className="list">
            {tickets.map((t) => (
              <div
                className="row"
                key={t.id}
                style={{ border: "1px solid var(--border)", borderRadius: 10, padding: 12 }}
              >
                <div className="grow">
                  <div style={{ fontWeight: 600 }}>
                    <span className="muted">{t.id}</span> {t.subject}
                  </div>
                  <div className="hint">{t.client}</div>
                </div>
                <span className={`badge ${t.c}`}>{t.s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
