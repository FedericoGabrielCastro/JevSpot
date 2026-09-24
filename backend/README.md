# Backend

FastAPI service for **Jev Location Intelligence**.

## Stack

- Package manager: **Poetry**
- FastAPI + Pydantic + Uvicorn
- pytest

The backend stays independent from the frontend. Do not commit secrets.

Google Places search needs `GOOGLE_PLACES_API_KEY` in the process environment. The key never goes to the browser.

## Commands

```bash
poetry install
poetry run uvicorn app.main:app --reload
poetry run pytest
poetry run black .
poetry run ruff check .
```

```bash
GOOGLE_PLACES_API_KEY=your_key poetry run uvicorn app.main:app --reload
```

Search places in Buenos Aires:

```http
POST /api/places/search
```

```json
{
  "business_type": "bakery",
  "territory": "buenos_aires"
}
```

API docs: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
