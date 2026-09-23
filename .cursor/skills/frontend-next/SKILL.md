---
name: frontend-next
description: Scaffold and change the Jev Location Intelligence frontend. Use when working in frontend/, adding Next.js pages or components, Tailwind styles, pnpm scripts, Vite, or Vitest tests.
---

# Frontend Next.js

## Stack

| Role | Tool |
| --- | --- |
| App | Next.js App Router in `frontend/` |
| Package manager | pnpm |
| Styles | Tailwind CSS v4 |
| App bundler | Next.js (not Vite) |
| Tests | Vitest + Vite + Testing Library |

Read `frontend/AGENTS.md` and `frontend/node_modules/next/dist/docs/` before using Next.js APIs.

## Commands

Run from `frontend/`:

```bash
pnpm dev
pnpm lint
pnpm test:run
pnpm build
```

## Layout

```text
frontend/
  app/                 # routes, layout, globals.css
  components/map/
  components/analysis/
  components/zones/
  components/competitors/
  hooks/
  lib/
  types/
  __tests__/
```

## Rules

- Do not add Vite as a second application bundler.
- Do not present fake geographic or commercial data as real.
- Keep the map as the primary UI once map work starts.
- Keep the frontend independent from the backend.
- Code comments stay in English.
