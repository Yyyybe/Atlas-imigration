from datetime import date

from app.models.legal_requirement import LegalRequirement


def test_legal_requirement_has_source():
    requirement = LegalRequirement(
        title="Certidão de antecedentes criminais",
        description="Apresentar certificado de antecedentes criminais.",
        country="Portugal",
        source="Fonte jurídica oficial",
        effective_from=date(2026, 1, 1),
    )

    assert requirement.source == "Fonte jurídica oficial"


def test_legal_requirement_has_effective_date():
    requirement = LegalRequirement(
        title="Certidão de antecedentes criminais",
        description="Apresentar certificado de antecedentes criminais.",
        country="Portugal",
        source="Fonte jurídica oficial",
        effective_from=date(2026, 1, 1),
    )

    assert requirement.effective_from == date(2026, 1, 1)


def test_legal_requirement_can_have_end_date():
    requirement = LegalRequirement(
        title="Requisito temporário",
        description="Requisito válido durante determinado período.",
        country="Portugal",
        source="Fonte jurídica oficial",
        effective_from=date(2026, 1, 1),
        effective_until=date(2026, 12, 31),
    )

    assert requirement.effective_until == date(2026, 12, 31)