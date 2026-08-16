from pydantic import BaseModel


class JourneyRequest(BaseModel):
    id: str
    full_name: str
    nationality: str
    current_country: str
    destination_country: str

    has_passport: bool = False
    passport_valid: bool = False

    has_criminal_record_certificate: bool = False
    criminal_record_apostilled: bool = False

    has_visa: bool = False


class JourneyResponse(BaseModel):
    explorer_id: str
    destination: str
    next_step: str