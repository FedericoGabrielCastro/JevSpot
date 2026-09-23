---
name: lint-format
description: Format and lint the Jev Location Intelligence apps. Use when the user mentions Prettier, ESLint, Black, Ruff, format, or lint.
---

# Lint and format

Cursor and Claude do not ship a first-party Prettier or Black skill. Use this project skill.

## Frontend

From `frontend/`:

```bash
pnpm lint
pnpm format
pnpm format:check
pnpm typecheck
```

- ESLint for lint
- Prettier for format
- `eslint-config-prettier` disables formatting rules that fight Prettier

## Backend

From `backend/`:

```bash
poetry run black .
poetry run black --check .
poetry run ruff check .
```

- Black for format
- Ruff for lint

Do not add a second formatter in either app.
