# Frontend

Next.js App Router app for **Jev Location Intelligence**.

## Stack

- Package manager: **pnpm**
- Next.js + React + TypeScript
- Tailwind CSS v4
- TanStack Query (`useQuery`, `useMutation`)
- Vite + Vitest for unit tests

Next.js is the only frontend app and its bundler. Vite is only used by Vitest.

App logic lives in `logic/` and stays free of UI. React bindings live in `hooks/`. Components only render. Do not add env files.

## Commands

```bash
pnpm dev
pnpm lint
pnpm format
pnpm format:check
pnpm typecheck
pnpm test:run
pnpm build
```

Open [http://localhost:3000](http://localhost:3000). The map uses OpenFreeMap tiles. Analyze calls the local FastAPI server at `http://127.0.0.1:8000` through a Next.js rewrite.
