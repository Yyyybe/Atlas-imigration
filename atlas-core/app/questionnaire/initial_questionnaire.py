from app.questionnaire.questions import Question


INITIAL_QUESTIONNAIRE = [

    Question(
        id="origin_country",
        title="Em que país você mora atualmente?",
        description="Selecione seu país de residência atual.",
        field="current_country",
    ),

    Question(
        id="nationality",
        title="Qual é sua nacionalidade?",
        description="Informe sua nacionalidade.",
        field="nationality",
    ),

    Question(
        id="destination",
        title="Para qual país deseja imigrar?",
        description="Escolha seu destino.",
        field="destination_country",
    ),

    Question(
        id="passport",
        title="Você possui passaporte válido?",
        description="O passaporte é obrigatório para a maioria dos processos.",
        field="passport",
    ),
]