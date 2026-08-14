from dataclasses import dataclass


@dataclass
class Question:
    id: str
    title: str
    description: str
    field: str
    required: bool = True