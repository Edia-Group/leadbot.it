import { IconBrain, IconCalendar, IconChat, IconZap } from "@/components/icons";

const stats = [
  { label: "Conversazioni (30g)", value: "1.284", delta: "+18%", up: true },
  { label: "Lead qualificati", value: "212", delta: "+9%", up: true },
  { label: "Documenti indicizzati", value: "486", delta: "+34", up: true },
  { label: "Automazioni eseguite", value: "3.907", delta: "+12%", up: true },
];

const activity = [
  { t: "Preventivo €7.200 → notifica titolare", tag: "Workflow", when: "2 min fa", c: "blue" },
  { t: "Nuovo documento: «Listino 2026.pdf» indicizzato", tag: "Cervello", when: "18 min fa", c: "green" },
  { t: "Appuntamento prenotato — Mar 12:30 (WhatsApp)", tag: "Appuntamenti", when: "41 min fa", c: "amber" },
  { t: "Ticket #318 aperto da Studio Bianchi", tag: "Portale B2B", when: "1 h fa", c: "gray" },
  { t: "Sync FattureInCloud: 23 fatture aggiornate", tag: "Integrazioni", when: "2 h fa", c: "blue" },
];

const modules = [
  { icon: <IconBrain />, name: "Cervello Documentale", desc: "486 chunk · 3 KB attive" },
  { icon: <IconZap />, name: "Motore Workflow", desc: "12 regole attive" },
  { icon: <IconCalendar />, name: "Appuntamenti AI", desc: "9 slot oggi" },
  { icon: <IconChat />, name: "Chatbot", desc: "4 bot · web + WhatsApp" },
];

export default function DashboardPage() {
  return (
    <>
      <div className="page-head">
        <h2>Buongiorno, Filippo 👋</h2>
        <p>
          Panoramica del workspace <strong>Studio Rossi SRL</strong>. ChatGPT
          scrive, NUCLEO lavora.
        </p>
      </div>

      <div className="grid grid-4" style={{ marginBottom: 16 }}>
        {stats.map((s) => (
          <div className="card stat" key={s.label}>
            <div className="label">{s.label}</div>
            <div className="value">{s.value}</div>
            <div className={`delta ${s.up ? "up" : "down"}`}>
              {s.delta} vs mese scorso
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-2">
        <div className="card">
          <div className="card-title">
            <h3>Attività recente</h3>
            <span className="badge gray">Live</span>
          </div>
          <div className="list">
            {activity.map((a) => (
              <div className="row" key={a.t}>
                <div className="grow">
                  <div style={{ fontWeight: 600 }}>{a.t}</div>
                  <div className="hint">{a.when}</div>
                </div>
                <span className={`badge ${a.c}`}>{a.tag}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-title">
            <h3>Moduli</h3>
            <span className="muted">Tutti operativi</span>
          </div>
          <div className="list">
            {modules.map((m) => (
              <div className="row" key={m.name}>
                <div className="icon-box">{m.icon}</div>
                <div className="grow">
                  <div style={{ fontWeight: 600 }}>{m.name}</div>
                  <div className="hint">{m.desc}</div>
                </div>
                <span className="badge green">● Attivo</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
