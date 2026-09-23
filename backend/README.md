# Backend

FastAPI service for **Jev Location Intelligence**.

## Stack

- Package manager: **Poetry**
- FastAPI + Pydantic + Uvicorn
- pytest

The backend stays independent from the frontend. Do not add env files in this scaffold.

## Commands

```bash
poetry install
poetry run uvicorn app.main:app --reload
poetry run pytest
```

API docs: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
