from app.models.explorer_profile import ExplorerProfile
from app.models.person import Person
from app.schemas.journey import JourneyRequest, JourneyResponse
from app.services.journey_service import JourneyService
from fastapi import APIRouter

router = APIRouter(
    prefix="/journeys",
    tags=["Journeys"],
)


@router.post("/next-step", response_model=JourneyResponse)
def get_next_step(request: JourneyRequest):
    profile = ExplorerProfile(
        has_passport=request.has_passport,
        passport_valid=request.passport_valid,
        has_criminal_record_certificate=request.has_criminal_record_certificate,
        criminal_record_apostilled=request.criminal_record_apostilled,
        has_visa=request.has_visa,
    )

    explorer = Person(
        id=request.id,
        full_name=request.full_name,
        nationality=request.nationality,
        current_country=request.current_country,
        destination_country=request.destination_country,
        profile=profile,
    )

    service = JourneyService()

    next_step = service.get_next_step(explorer)

    return JourneyResponse(
        explorer_id=explorer.id,
        destination=explorer.destination_country,
        next_step=next_step,
    )