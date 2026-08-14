from app.models.person import Person
from app.models.recommendation import Recommendation


class JourneyService:

    def get_next_step(self, explorer: Person) -> Recommendation:

        profile = explorer.profile

        if not profile.has_passport:
            return Recommendation(
                title="Solicitar Passaporte",
                description="O passaporte é necessário para iniciar o processo de imigração.",
                priority="HIGH",
                estimated_days=15,
            )

        if not profile.passport_valid:
            return Recommendation(
                title="Renovar Passaporte",
                description="Seu passaporte não possui validade suficiente.",
                priority="HIGH",
            )

        if explorer.destination_country == "Portugal":

            if not profile.criminal_record_apostilled:
                return Recommendation(
                    title="Apostilar Antecedentes Criminais",
                    description="Providencie a Apostila de Haia para o certificado de antecedentes criminais.",
                    priority="MEDIUM",
                )

        if explorer.destination_country == "Espanha":

            if not profile.has_visa:
                return Recommendation(
                    title="Verificar Visto",
                    description="Identifique qual categoria de visto é adequada para sua situação.",
                    priority="HIGH",
                )

        return Recommendation(
            title="Tudo em ordem",
            description="Nenhuma pendência encontrada no momento.",
            priority="LOW",
        )