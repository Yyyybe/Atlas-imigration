from app.models.explorer_profile import ExplorerProfile
from app.models.person import Person
from app.services.journey_service import JourneyService


def create_explorer(
    destination_country: str = "Portugal",
    has_passport: bool = False,
    passport_valid: bool = False,
    has_criminal_record_certificate: bool = False,
    criminal_record_apostilled: bool = False,
    has_visa: bool = False,
) -> Person:
    profile = ExplorerProfile(
        has_passport=has_passport,
        passport_valid=passport_valid,
        has_criminal_record_certificate=has_criminal_record_certificate,
        criminal_record_apostilled=criminal_record_apostilled,
        has_visa=has_visa,
    )

    return Person(
        id="test-001",
        full_name="Explorer Teste",
        nationality="Brasil",
        current_country="Brasil",
        destination_country=destination_country,
        profile=profile,
    )


def test_missing_passport():
    explorer = create_explorer()

    service = JourneyService()

    assert service.get_next_step(explorer) == (
        "Solicitar emissão do passaporte."
    )


def test_invalid_passport():
    explorer = create_explorer(
        has_passport=True,
        passport_valid=False,
    )

    service = JourneyService()

    assert service.get_next_step(explorer) == (
        "Renovar o passaporte."
    )


def test_portugal_missing_criminal_record_certificate():
    explorer = create_explorer(
        has_passport=True,
        passport_valid=True,
    )

    service = JourneyService()

    assert service.get_next_step(explorer) == (
        "Providenciar o certificado de antecedentes criminais."
    )


def test_portugal_missing_apostille():
    explorer = create_explorer(
        has_passport=True,
        passport_valid=True,
        has_criminal_record_certificate=True,
    )

    service = JourneyService()

    assert service.get_next_step(explorer) == (
        "Providenciar a Apostila de Haia dos antecedentes criminais."
    )


def test_spain_missing_visa():
    explorer = create_explorer(
        destination_country="Espanha",
        has_passport=True,
        passport_valid=True,
    )

    service = JourneyService()

    assert service.get_next_step(explorer) == (
        "Verificar o tipo de visto necessário."
    )


def test_complete_portugal_profile():
    explorer = create_explorer(
        has_passport=True,
        passport_valid=True,
        has_criminal_record_certificate=True,
        criminal_record_apostilled=True,
    )

    service = JourneyService()

    assert service.get_next_step(explorer) == (
        "Nenhuma pendência encontrada."
    )