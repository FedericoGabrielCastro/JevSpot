---
name: ci-github-actions
description: Maintain GitHub Actions CI for lint and tests. Use when editing .github/workflows, CI, GitHub Actions, or when the user asks to verify lint or tests in CI.
---

# GitHub Actions CI

Cursor and Claude do not ship a first-party GitHub Actions skill. Use this project skill.

Lint lives in `.github/workflows/ci.yml`. Tests belong in a separate workflow and PR.

## Lint jobs

| Job | Checks |
| --- | --- |
| `frontend-lint` | `pnpm lint`, `pnpm format:check`, `pnpm typecheck` |
| `backend-lint` | `poetry run black --check .`, `poetry run ruff check .` |

## Rules

- Keep frontend and backend as separate jobs so they fail independently.
- Use pnpm 11.1.2 and Python 3.12 to match the local stack.
- Install frontend deps with `--frozen-lockfile`.
- Do not add test or deploy jobs to `ci.yml`. Tests go in `.github/workflows/test.yml`.
- If a lint check is added locally, add the same command to CI.
