from app.models.explorer_profile import ExplorerProfile
from app.models.person import Person


def create_explorer(
    destination_country: str = "Portugal",
    has_passport: bool = False,
    passport_valid: bool = False,
) -> Person:
    profile = ExplorerProfile(
        has_passport=has_passport,
        passport_valid=passport_valid,
    )

    return Person(
        id="test-001",
        full_name="Explorer Teste",
        nationality="Brasil",
        current_country="Brasil",
        destination_country=destination_country,
        profile=profile,
    )


def test_explorer_has_destination():
    explorer = create_explorer()

    assert explorer.destination_country == "Portugal"


def test_explorer_without_passport():
    explorer = create_explorer()

    assert explorer.profile.has_passport is False


def test_explorer_with_valid_passport():
    explorer = create_explorer(
        has_passport=True,
        passport_valid=True,
    )

    assert explorer.profile.has_passport is True
    assert explorer.profile.passport_valid is True