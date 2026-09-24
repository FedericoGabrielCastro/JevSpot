---
name: backend-fastapi
description: Scaffold and change the Jev Location Intelligence FastAPI backend. Use when working in backend/, adding Poetry dependencies, FastAPI routes, Pydantic schemas, adapters, or pytest tests.
---

# Backend FastAPI

Cursor has no first-party FastAPI or Poetry marketplace skill. Use this project skill plus `backend/` source as the RAG for backend work.

## Stack

| Role | Tool |
| --- | --- |
| App | FastAPI in `backend/app` |
| Package manager | Poetry |
| Schemas | Pydantic v2 |
| Server | Uvicorn |
| Tests | pytest + httpx |

## Commands

Run from `backend/`:

```bash
poetry install
poetry run uvicorn app.main:app --reload
poetry run pytest
poetry run black .
poetry run ruff check .
```

## Layout

```text
backend/
  app/
    api/                 # thin HTTP routes
    schemas/             # Pydantic request/response models
    models/              # persistence models, later
    services/            # orchestration
    adapters/            # Google Places, rentals, geo
    analysis/            # deterministic scores
    jev/                 # decision engine integration
    core/                # shared constants
  alembic/
  tests/
```

## Rules

- Package manager is Poetry.
- Next.js is the only frontend; this service is the only backend API.
- Do not add env files.
- Do not invent analysis data or geographic boundaries.
- Keep adapters replaceable. Routes must not call vendor SDKs directly.
- Tests use pytest. See [backend-pytest](../backend-pytest/SKILL.md).
- Code comments stay in English.
