from dataclasses import dataclass
from datetime import date


@dataclass
class LegalRequirement:
    title: str
    description: str
    country: str
    source: str
    effective_from: date
    effective_until: date | None = None