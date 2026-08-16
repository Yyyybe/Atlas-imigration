from dataclasses import dataclass
from datetime import date

from app.models.explorer_profile import ExplorerProfile


@dataclass
class Person:
    id: str
    full_name: str
    nationality: str
    current_country: str
    destination_country: str
    profile: ExplorerProfile
    birth_date: date | None = None
    email: str | None = None