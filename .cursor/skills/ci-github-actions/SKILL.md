---
name: ci-github-actions
description: Maintain GitHub Actions CI for lint and tests. Use when editing .github/workflows, CI, GitHub Actions, or when the user asks to verify lint or tests in CI.
---

# GitHub Actions CI

Cursor and Claude do not ship a first-party GitHub Actions skill. Use this project skill.

## Workflows

| File | Jobs |
| --- | --- |
| `.github/workflows/ci.yml` | `frontend-lint`, `backend-lint` |
| `.github/workflows/test.yml` | `frontend-test`, `backend-test` |

## Test jobs

| Job | Command |
| --- | --- |
| `frontend-test` | `pnpm test:run` |
| `backend-test` | `poetry run pytest` |

## Rules

- Keep lint and tests in separate workflows.
- Keep frontend and backend as separate jobs so they fail independently.
- Use pnpm 11.1.2 and Python 3.12 to match the local stack.
- Install frontend deps with `--frozen-lockfile`.
- Do not add deploy or CD steps until there is something to deploy.
- If a local test command changes, update `test.yml`.
