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
| Server state | TanStack Query (`useQuery`, `useMutation`) |

Next.js is the only frontend. Read `frontend/AGENTS.md` and `frontend/node_modules/next/dist/docs/` before using Next.js APIs.

## Commands

Run from `frontend/`:

```bash
pnpm dev
pnpm lint
pnpm format
pnpm format:check
pnpm typecheck
pnpm test:run
pnpm build
```

## Layout

```text
frontend/
  app/                 # Next.js routes
  logic/               # API client, query keys, types
  hooks/               # useQuery / useMutation
  components/          # UI only
  __tests__/
```

## Rules

- Package manager is pnpm.
- Do not add Vite as a second application bundler.
- Keep fetchers and query keys in `logic/`. Keep `useQuery` / `useMutation` in `hooks/`. Keep JSX in `components/` or `app/`.
- Do not add env files or read `process.env`.
- Do not present fake geographic or commercial data as real.
- Keep the map as the primary UI once map work starts.
- Code comments stay in English.
