<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Jev Location Intelligence frontend

- Package manager: pnpm.
- Tailwind CSS v4 lives in `app/globals.css`. Do not add a JS Tailwind config.
- Vite is the Vitest runner only. Do not introduce a Vite app config for the product UI.
- Keep analysis, competitor, rental, and map values empty until the backend returns them.
- Preferred docs for RAG: this file, `../.cursor/rules/`, `../.cursor/skills/frontend-next/SKILL.md`, and `node_modules/next/dist/docs/`.
