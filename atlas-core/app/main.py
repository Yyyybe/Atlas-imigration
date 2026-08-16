from fastapi import FastAPI

from app.api.V1.health.routes import router as health_router
from app.api.V1.journeys.routes import router as journeys_router

app = FastAPI(
    title="Atlas Core API",
    version="0.1.0",
    description="Backend oficial da Atlas.",
)


app.include_router(health_router)
app.include_router(journeys_router)