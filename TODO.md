# LeadBot MVP - Lista Priorità

Data ultimo aggiornamento: 2026-06-18

## BLOCCANTI per il deploy su Dokploy

- [x] Dockerfile per builder e viewer (multi-stage, ottimizzato per Dokploy) ✓
- [x] Redis nel docker-compose.yml ✓
- [x] Health check su DB e Redis nel compose ✓
- [x] Entrypoint che esegue `prisma migrate deploy` all'avvio ✓
- [x] `docker-compose.yml` builda builder e viewer dalla repo (`build:` context) invece di immagini Typebot upstream ✓

## Alta priorità (MVP funzionante)

- [ ] Configurare `.env` di produzione su Dokploy (ENCRYPTION_SECRET 32 char, DATABASE_URL, NEXTAUTH_URL, NEXT_PUBLIC_VIEWER_URL, SMTP, S3)
- [ ] S3 / object storage per upload file (MinIO self-hosted o Cloudflare R2) — senza questo i file caricati dai bot non funzionano
- [ ] SMTP produzione (Resend / SendGrid / SES) — senza questo il login magic-link non funziona
- [x] Landing page: aggiunta al compose Dokploy come servizio separato `leadbot-landing` (`Dockerfile.landing`, porta 8082, healthcheck `/healthz`) ✓
- [ ] Reverse proxy / dominio: configurare Traefik o Nginx davanti a builder (porta 8080) e viewer (porta 8081)

## Media priorità (dopo il primo deploy)

- [ ] Health check HTTP nei servizi builder/viewer del compose (curl `/api/healthz`)
- [ ] Backup automatico PostgreSQL (cron job o Dokploy scheduled backup)
- [ ] Variabili d'ambiente validate all'avvio (startup check che fallisce loud invece di errori silenziosi a runtime)
- [ ] ADMIN_EMAIL impostata correttamente per il primo accesso bootstrap
- [ ] Graceful shutdown su SIGTERM negli entrypoint

## Bassa priorità / post-MVP

- [ ] Aggiornare GitHub Actions release workflow da `baptistearno/typebot-*` a registry LeadBot
- [ ] Osservabilità: structured logging, metriche (uptime, latenza)
- [ ] WhatsApp Business API: documentare variabili d'ambiente e setup
- [ ] Docs (`apps/docs`) tradotte e aggiornate per branding LeadBot
- [ ] Landing page copy italiano finalizzata con prezzi e template specifici

## Completati

- [x] Rebranding completo Typebot → LeadBot
- [x] Localizzazione italiana UI builder e viewer
- [x] Redis reso obbligatorio nel compose (già presente)
- [x] Sentry/telemetria rimossi per privacy
- [x] Immagini Docker snellite (slim)
- [x] Build parallelism/memory capped per Dokploy (evita OOM)
- [x] Dockerfile.landing per landing page TanStack Start
