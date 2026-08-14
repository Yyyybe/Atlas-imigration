from dataclasses import dataclass


@dataclass
class Document:
    name: str
    description: str
    mandatory: bool
    uploaded: bool = False