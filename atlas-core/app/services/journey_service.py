from app.models.person import Person


class JourneyService:

    def get_next_step(self, explorer: Person):

        if explorer.destination_country == "Portugal":
            return "Verificar validade do passaporte."

        if explorer.destination_country == "Espanha":
            return "Verificar tipo de visto necessário."

        return "Destino ainda não suportado."