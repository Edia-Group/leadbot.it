import { IconPlus } from "@/components/icons";

const rules = [
  {
    name: "Preventivo oltre soglia",
    trigger: "quote.created",
    cond: "quote.total > 5.000€",
    actions: ["notify_owner", "create_task"],
    enabled: true,
  },
  {
    name: "Richiesta da WhatsApp",
    trigger: "message.received",
    cond: "channel = whatsapp",
    actions: ["create_task", "send_email"],
    enabled: true,
  },
  {
    name: "Scadenza pratica",
    trigger: "deadline.approaching",
    cond: "days_left ≤ 3",
    actions: ["notify_owner", "send_whatsapp"],
    enabled: true,
  },
  {
    name: "Nuovo lead → benvenuto",
    trigger: "lead.created",
    cond: "sempre",
    actions: ["send_email"],
    enabled: false,
  },
];

const runs = [
  { rule: "Preventivo oltre soglia", status: "Completato", c: "green", when: "2 min fa" },
  { rule: "Richiesta da WhatsApp", status: "Completato", c: "green", when: "15 min fa" },
  { rule: "Scadenza pratica", status: "In corso", c: "amber", when: "ora" },
  { rule: "Preventivo oltre soglia", status: "Fallito", c: "red", when: "1 h fa" },
];

export default function WorkflowPage() {
  return (
    <>
      <div className="page-head">
        <h2>Motore Workflow</h2>
        <p>
          L&apos;AI non risponde solo. Agisce. If-this-then-that aziendale: se un
          evento accade, NUCLEO esegue le azioni giuste.
        </p>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <div className="card-title">
          <h3>Regole attive</h3>
          <button className="btn">
            <IconPlus /> Nuova regola
          </button>
        </div>
        <div className="list">
          {rules.map((r) => (
            <div
              className="row"
              key={r.name}
              style={{
                border: "1px solid var(--border)",
                borderRadius: 10,
                padding: 14,
              }}
            >
              <div className="grow">
                <div style={{ fontWeight: 700, marginBottom: 8 }}>{r.name}</div>
                <div className="flow">
                  <span className="chip">⚡ {r.trigger}</span>
                  <span className="arrow">→</span>
                  <span className="chip">se {r.cond}</span>
                  <span className="arrow">→</span>
                  {r.actions.map((a) => (
                    <span className="chip" key={a} style={{ color: "var(--brand-700)" }}>
                      {a}
                    </span>
                  ))}
                </div>
              </div>
              <span className={`badge ${r.enabled ? "green" : "gray"}`}>
                {r.enabled ? "● Attiva" : "○ Disattiva"}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="card-title">
          <h3>Esecuzioni recenti</h3>
          <span className="muted">audit trail</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Regola</th>
              <th>Stato</th>
              <th>Quando</th>
            </tr>
          </thead>
          <tbody>
            {runs.map((r, i) => (
              <tr key={i}>
                <td>{r.rule}</td>
                <td>
                  <span className={`badge ${r.c}`}>{r.status}</span>
                </td>
                <td className="muted">{r.when}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
