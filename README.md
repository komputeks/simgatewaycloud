# SIM Gateway Cloud

Production-grade SaaS platform to turn Android phones into SMS gateways.

**Stack:** Next.js 15 (App Router) • React 19 • Turborepo • Supabase • TypeScript 5 • TailwindCSS 4

## Monorepo

```
apps/
  web       - Next.js dashboard (port 3000)
  admin     - Admin panel
  android   - Kotlin app
  docs      - Documentation

packages/
  ui, db, auth, types, config, utils, api-client
```

## Quick Start

```bash
npm install
npm run dev
```

## Deploy

Auto-deploys to Vercel on push to main.

**Env vars:**
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY
- LIPIA_API_KEY
- RESEND_API_KEY

## Features

- Device pairing via QR
- Real-time SMS delivery tracking
- Campaign management
- Queue with retries
- Lipia payments
- RBAC & audit logs

Demo: demo@simgateway.cloud / demo123456
