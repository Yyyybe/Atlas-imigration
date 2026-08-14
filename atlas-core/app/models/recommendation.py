from dataclasses import dataclass
from typing import Optional


@dataclass
class Recommendation:
    title: str
    description: str
    priority: str
    estimated_days: Optional[int] = None
    legal_reference: Optional[str] = None