from dataclasses import dataclass


@dataclass
class ExplorerProfile:

    has_passport: bool = False

    passport_valid: bool = False

    has_visa: bool = False

    has_criminal_record_certificate: bool = False

    criminal_record_apostilled: bool = False

    has_birth_certificate: bool = False

    birth_certificate_apostilled: bool = False