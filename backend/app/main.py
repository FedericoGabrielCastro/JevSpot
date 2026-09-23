from fastapi import FastAPI

from app.api.router import api_router
from app.core import APP_TITLE


def create_app() -> FastAPI:
    application = FastAPI(title=APP_TITLE)
    application.include_router(api_router, prefix="/api")
    return application


app = create_app()
