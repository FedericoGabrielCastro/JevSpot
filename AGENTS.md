# Jev Location Intelligence

- Frontend: Next.js in `frontend/` with pnpm, ESLint, Prettier, and Vitest.
- Backend: FastAPI in `backend/` with Poetry, Black, Ruff, and pytest.
- CI: `.github/workflows/ci.yml` runs the same lint and test commands.

There is no first-party Cursor or Claude skill for Prettier, Black, or GitHub Actions. Use `.cursor/skills/lint-format/` and `.cursor/skills/ci-github-actions/`.
