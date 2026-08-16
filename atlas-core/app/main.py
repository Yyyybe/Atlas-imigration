from fastapi import FastAPI

from app.api.V1.health.routes import router as health_router

app = FastAPI(
    title="Atlas Core API",
    version="0.1.0",
    description="Backend oficial da Atlas.",
)


app.include_router(health_router)