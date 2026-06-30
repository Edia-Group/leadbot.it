# @typebot.io/workflow

NUCLEO **Motore Workflow**. *"L'AI non risponde solo. Agisce."* When an event
fires (a quote over threshold, an incoming request, a deadline approaching), the
workspace's rules are evaluated and matching actions are dispatched.

Dependency-free core so it can be embedded in the platform API or a worker.

## Model
- **Rule**: `{ trigger, conditions?, actions[] }`, stored as JSON per tenant.
- **Condition tree**: leaf `{ field, operator, value }` (operators: eq/neq/gt/gte/lt/lte/contains/exists/notExists) combined with `{ all: [...] }` / `{ any: [...] }`.
- **Action**: `{ type, params }`; string params support `{{event.path}}` templates.
- **Executors**: you register an `ActionExecutor` per action type
  (`send_email`, `send_whatsapp`, `generate_pdf`, ...).

## Example: "preventivo oltre soglia → notifica titolare"

```ts
import {
  ActionDispatcher,
  InMemoryWorkflowStore,
  handleEvent,
  type WorkflowRule,
} from "@typebot.io/workflow";

const rule: WorkflowRule = {
  id: "r1",
  workspaceId: "ws_1",
  name: "Preventivo oltre soglia",
  trigger: "quote.created",
  conditions: { all: [{ field: "quote.total", operator: "gt", value: 5000 }] },
  actions: [
    {
      type: "notify_owner",
      params: { message: "Nuovo preventivo da {{quote.total}}€ per {{client.name}}" },
    },
  ],
  enabled: true,
};

const dispatcher = new ActionDispatcher().register({
  type: "notify_owner",
  async execute(_action, ctx) {
    console.log(ctx.params.message); // params already templated
  },
});

await handleEvent(
  { store: new InMemoryWorkflowStore([rule]), dispatcher },
  { workspaceId: "ws_1", type: "quote.created", data: { quote: { total: 7200 }, client: { name: "Rossi SRL" } } },
);
```

## Follow-ups
- Postgres adapter for `WorkflowStore` (raw SQL, mirror `packages/rag`).
- Back `JobQueue` with the existing Redis/BullMQ for async execution + retries.
- Concrete executors wired to `@typebot.io/emails`, `@typebot.io/whatsapp`, PDF.
