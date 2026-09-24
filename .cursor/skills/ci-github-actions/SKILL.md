---
name: ci-github-actions
description: Maintain GitHub Actions CI for lint and tests. Use when editing .github/workflows, CI, GitHub Actions, or when the user asks to verify lint or tests in CI.
---

# GitHub Actions CI

Cursor and Claude do not ship a first-party GitHub Actions skill. Use this project skill.

The workflow lives at `.github/workflows/ci.yml`.

## Jobs

| Job | Checks |
| --- | --- |
| `frontend` | `pnpm lint`, `pnpm format:check`, `pnpm typecheck` (`next typegen` then `tsc`), `pnpm test:run` |
| `backend` | `poetry run black --check .`, `poetry run ruff check .`, `poetry run pytest` |

## Rules

- Keep frontend and backend as separate jobs so they fail independently.
- Use pnpm 11.1.2 and Python 3.12 to match the local stack.
- Install frontend deps with `--frozen-lockfile`.
- Do not add deploy or CD steps until there is something to deploy.
- If a check is added locally, add the same command to CI.
