from dataclasses import dataclass
from datetime import date
from typing import Optional
from app.models.explorer_profile import ExplorerProfile


@dataclass
class Person:
    id: str
    full_name: str
    nationality: str
    current_country: str
    destination_country: str
    birth_date: Optional[date] = None
    email: Optional[str] = None
   