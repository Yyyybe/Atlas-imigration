from app.models.person import Person


class JourneyService:

    def get_next_step(self, explorer: Person):

        profile = explorer.profile

        if not profile.has_passport:
            return "Solicitar emissão do passaporte."

        if not profile.passport_valid:
            return "Renovar o passaporte."

        if (
            explorer.destination_country == "Portugal"
            and not profile.has_criminal_record_certificate
        ):
            return "Providenciar o certificado de antecedentes criminais."

        if (
            explorer.destination_country == "Portugal"
            and not profile.criminal_record_apostilled
        ):
            return "Providenciar a Apostila de Haia dos antecedentes criminais."

        if (
            explorer.destination_country == "Espanha"
            and not profile.has_visa
        ):
            return "Verificar o tipo de visto necessário."

        return "Nenhuma pendência encontrada."