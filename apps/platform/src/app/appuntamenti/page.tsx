const appts = [
  { time: "09:00", client: "Mario Bianchi", type: "Consulenza", channel: "Web", c: "blue" },
  { time: "10:30", client: "Verdi & Co", type: "Sopralluogo", channel: "WhatsApp", c: "green" },
  { time: "12:30", client: "Studio Neri", type: "Prima visita", channel: "WhatsApp", c: "green" },
  { time: "15:00", client: "Anna Russo", type: "Follow-up", channel: "Web", c: "blue" },
];

const slots = ["08:30", "09:00", "11:00", "14:30", "15:00", "16:30", "17:00"];
const taken = new Set(["09:00", "15:00"]);

export default function AppuntamentiPage() {
  return (
    <>
      <div className="page-head">
        <h2>Appuntamenti AI</h2>
        <p>
          Il cliente prenota via sito o WhatsApp. L&apos;AI controlla la
          disponibilità in tempo reale, blocca lo slot su Google Calendar, invia
          conferma e reminder. Zero telefonate per il tuo staff.
        </p>
      </div>

      <div className="grid grid-3" style={{ marginBottom: 16 }}>
        <div className="card stat">
          <div className="label">Oggi</div>
          <div className="value">9</div>
          <div className="hint">appuntamenti confermati</div>
        </div>
        <div className="card stat">
          <div className="label">Tasso conferma</div>
          <div className="value">94%</div>
          <div className="delta up">reminder T-24h / T-1h</div>
        </div>
        <div className="card stat">
          <div className="label">Calendario</div>
          <div className="value" style={{ fontSize: 18, marginTop: 12 }}>
            Google Calendar
          </div>
          <div className="hint">via blocco calCom · sincronizzato</div>
        </div>
      </div>

      <div className="grid grid-2">
        <div className="card">
          <div className="card-title">
            <h3>Agenda di oggi</h3>
            <span className="badge green">Mar 30 giu</span>
          </div>
          <div className="list">
            {appts.map((a) => (
              <div className="row" key={a.time}>
                <div
                  className="chip"
                  style={{ fontVariantNumeric: "tabular-nums", minWidth: 56, textAlign: "center" }}
                >
                  {a.time}
                </div>
                <div className="grow">
                  <div style={{ fontWeight: 600 }}>{a.client}</div>
                  <div className="hint">{a.type}</div>
                </div>
                <span className={`badge ${a.c}`}>{a.channel}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-title">
            <h3>Slot disponibili — domani</h3>
            <span className="muted">durata 30m · buffer 10m</span>
          </div>
          <div className="flow" style={{ gap: 10 }}>
            {slots.map((s) => (
              <span
                key={s}
                className="chip"
                style={
                  taken.has(s)
                    ? { opacity: 0.4, textDecoration: "line-through" }
                    : { borderColor: "var(--brand-500)", color: "var(--brand-700)" }
                }
              >
                {s}
              </span>
            ))}
          </div>
          <div className="hint" style={{ marginTop: 16 }}>
            Gli slot occupati sono nascosti automaticamente al cliente; la
            conferma e i reminder partono come job WhatsApp (template Meta).
          </div>
        </div>
      </div>
    </>
  );
}
