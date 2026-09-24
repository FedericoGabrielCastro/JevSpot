---
name: backend-pytest
description: Write and run pytest tests for the FastAPI backend. Use when adding backend tests, TestClient checks, or when the user mentions pytest, backend test, or poetry run pytest.
---

# Backend pytest

Cursor has no first-party pytest marketplace skill. Use this project skill for backend tests.

## Commands

Run from `backend/`:

```bash
poetry run pytest
poetry run pytest tests/test_health.py
```

## What to test

| Layer | How |
| --- | --- |
| Routes | `TestClient(create_app())` |
| Schemas | Construct Pydantic models and expect validation errors |
| Services / analysis | Call functions directly |
| Adapters | Fake the vendor behind the adapter. Do not hit Google or scrape. |

## Rules

- Keep tests in `backend/tests/test_*.py`.
- Do not add unittest.
- Do not invent competitor, rent, or geography values and treat them as fixtures of the real world.
- Prefer one behavior per test.
- Code comments stay in English.
