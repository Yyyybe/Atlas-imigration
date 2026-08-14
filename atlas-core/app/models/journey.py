from dataclasses import dataclass, field

from app.models.document import Document
from app.models.task import Task


@dataclass
class Journey:
    origin_country: str
    destination_country: str

    documents: list[Document] = field(default_factory=list)
    tasks: list[Task] = field(default_factory=list)