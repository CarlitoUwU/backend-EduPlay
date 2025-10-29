# Prompts de IA por Tipo de Contenido Educativo

Prompts especializados para n8n. Cada prompt genera UN SOLO TIPO de contenido educativo.

**IMPORTANTE:** El backend envía estos campos a n8n:
- `topic`: Tema principal
- `context`: Contexto adicional (opcional, puede ser null)
- `courseName`: Nombre del curso
- `minItems`: Cantidad mínima de items (default: 3)

---

## 1. Generación de FLASHCARDS

**Webhook n8n:** `POST http://localhost:5678/webhook/generate-flashcards`

**Datos recibidos del backend:**
```json
{
    "topic": "La fotosíntesis",
    "context": "Proceso de las plantas para crear alimento",
    "courseName": "Biología 6to grado",
    "quantity": 8
}
```

**Prompt n8n:**
```json
{
    "model": "gemma2:2b",
    "prompt": "Eres un asistente educativo especializado en crear flashcards educativas.\n\nCURSO: {{ $json.body.courseName }}\nTEMA: {{ $json.body.topic }}\nCONTEXTO: {{ $json.body.context }}\nCANTIDAD: {{ $json.body.quantity }} flashcards\n\nOBJETIVO: Generar flashcards que ayuden a memorizar y comprender conceptos clave.\n\nREQUERIMIENTOS:\n- Generar EXACTAMENTE {{ $json.body.quantity }} flashcards\n- Cada flashcard debe tener una pregunta clara y una respuesta concisa\n- Incluir ejemplos o contexto cuando sea necesario\n- Adaptar el lenguaje al nivel educativo del curso\n\nFORMATO DE RESPUESTA JSON:\n{\n  \"flashcards\": [\n    { \"question\": \"¿Pregunta directa sobre el concepto?\", \"answer\": \"Respuesta clara con ejemplo si es necesario\" },\n    { \"question\": \"¿Pregunta sobre aplicación?\", \"answer\": \"Respuesta explicativa\" }\n  ]\n}\n\nDESARROLLA LAS FLASHCARDS AHORA.",
    "stream": false,
    "options": {
        "num_predict": 2000,
        "temperature": 0.6
    }
}
```

**Respuesta esperada:**
```json
{
    "flashcards": [
        {
            "question": "¿Qué es la fotosíntesis?",
            "answer": "Proceso mediante el cual las plantas convierten luz solar en energía química"
        }
    ]
}
```

---

## 2. Generación de PARES DE MEMORIA

**Webhook n8n:** `POST http://localhost:5678/webhook/generate-memory-pairs`

**Datos recibidos del backend:**
```json
{
    "topic": "La fotosíntesis",
    "context": "Proceso de las plantas",
    "courseName": "Biología 6to grado",
    "quantity": 6
}
```

**Prompt n8n:**
```json
{
    "model": "gemma2:2b",
    "prompt": "Eres un asistente educativo especializado en crear pares de memoria para juegos educativos.\n\nCURSO: {{ $json.body.courseName }}\nTEMA: {{ $json.body.topic }}\nCONTEXTO: {{ $json.body.context }}\nCANTIDAD: {{ $json.body.quantity }} pares\n\nOBJETIVO: Generar pares de términos relacionados que los estudiantes puedan asociar en un juego de memoria.\n\nREQUERIMIENTOS:\n- Generar EXACTAMENTE {{ $json.body.quantity }} pares de memoria\n- Cada par debe relacionar un concepto con su definición, ejemplo o equivalente\n- Las relaciones deben ser claras e inequívocas\n- Usar vocabulario apropiado para el nivel educativo\n\nFORMATO DE RESPUESTA JSON:\n{\n  \"cardsMemory\": [\n    { \"card1\": \"Término o concepto\", \"card2\": \"Definición simple o equivalente\" }\n  ]\n}\n\nDESARROLLA LOS PARES DE MEMORIA AHORA.",
    "stream": false,
    "options": {
        "num_predict": 1500,
        "temperature": 0.5
    }
}
```

**Respuesta esperada:**
```json
{
    "cardsMemory": [
        {
            "card1": "Clorofila",
            "card2": "Pigmento verde que captura luz solar"
        }
    ]
}
```

---

## 3. Generación de RELACIONES

**Webhook n8n:** `POST http://localhost:5678/webhook/generate-relations`

**Datos recibidos del backend:**
```json
{
    "topic": "La fotosíntesis",
    "context": "Proceso de las plantas",
    "courseName": "Biología 6to grado",
    "correctCount": 6,
    "incorrectCount": 4
}
```

**Prompt n8n:**
```json
{
    "model": "gemma2:2b",
    "prompt": "Eres un asistente educativo especializado en crear ejercicios de relaciones entre conceptos.\n\nCURSO: {{ $json.body.courseName }}\nTEMA: {{ $json.body.topic }}\nCONTEXTO: {{ $json.body.context }}\nCORRECTAS: {{ $json.body.correctCount }} relaciones\nINCORRECTAS: {{ $json.body.incorrectCount }} relaciones\n\nOBJETIVO: Generar relaciones entre conceptos para que los estudiantes identifiquen cuáles son correctas e incorrectas.\n\nREQUERIMIENTOS:\n- Generar EXACTAMENTE {{ $json.body.correctCount }} relaciones CORRECTAS\n- Generar EXACTAMENTE {{ $json.body.incorrectCount }} relaciones INCORRECTAS\n- Las relaciones incorrectas deben ser plausibles para desafiar al estudiante\n\nFORMATO DE RESPUESTA JSON:\n{\n  \"playRelations\": [\n    { \"item1\": \"Elemento A\", \"item2\": \"Elemento B\", \"isCorrect\": true },\n    { \"item1\": \"Concepto X\", \"item2\": \"Concepto Z\", \"isCorrect\": false }\n  ]\n}\n\nNOTA: Las primeras {{ $json.body.correctCount }} deben tener isCorrect: true, las últimas {{ $json.body.incorrectCount }} deben tener isCorrect: false.\n\nDESARROLLA LAS RELACIONES AHORA.",
    "stream": false,
    "options": {
        "num_predict": 2000,
        "temperature": 0.5
    }
}
```

**Respuesta esperada:**
```json
{
    "playRelations": [
        {
            "item1": "Luz solar",
            "item2": "Fuente de energía para fotosíntesis",
            "isCorrect": true
        },
        {
            "item1": "Fotosíntesis",
            "item2": "Proceso que consume oxígeno",
            "isCorrect": false
        }
    ]
}
```

---

## 4. Generación de PREGUNTAS DE QUIZ

**Webhook n8n:** `POST http://localhost:5678/webhook/generate-quiz`

**Datos recibidos del backend:**
```json
{
    "topic": "La fotosíntesis",
    "context": "Proceso de las plantas",
    "courseName": "Biología 6to grado",
    "multipleChoiceCount": 5,
    "openQuestionsCount": 2
}
```

**Prompt n8n:**
```json
{
    "model": "gemma2:2b",
    "prompt": "Eres un asistente educativo especializado en crear preguntas de evaluación.\n\nCURSO: {{ $json.body.courseName }}\nTEMA: {{ $json.body.topic }}\nCONTEXTO: {{ $json.body.context }}\nPREGUNTAS OPCIÓN MÚLTIPLE: {{ $json.body.multipleChoiceCount }}\nPREGUNTAS ABIERTAS: {{ $json.body.openQuestionsCount }}\n\nOBJETIVO: Generar preguntas de quiz con opciones múltiples y preguntas abiertas.\n\nREQUERIMIENTOS:\n- Generar EXACTAMENTE {{ $json.body.multipleChoiceCount }} preguntas de opción múltiple (4 opciones: A, B, C, D)\n- Generar EXACTAMENTE {{ $json.body.openQuestionsCount }} preguntas abiertas con respuesta modelo\n- Solo una opción es correcta en las de opción múltiple\n- Los distractores deben ser plausibles\n- Las preguntas abiertas deben requerir análisis y reflexión\n\nFORMATO DE RESPUESTA JSON:\n{\n  \"quiz\": {\n    \"questions\": [\n      {\n        \"question\": \"¿Pregunta sobre el concepto?\",\n        \"optionA\": \"Opción A\",\n        \"optionB\": \"Opción B (correcta)\",\n        \"optionC\": \"Opción C\",\n        \"optionD\": \"Opción D\",\n        \"correctOption\": \"B\"\n      }\n    ],\n    \"questionsOpen\": [\n      {\n        \"question\": \"¿Pregunta que requiere explicación detallada?\",\n        \"answer\": \"Respuesta modelo completa con: definición, explicación, ejemplo\"\n      }\n    ]\n  }\n}\n\nDESARROLLA LAS PREGUNTAS AHORA.",
    "stream": false,
    "options": {
        "num_predict": 3000,
        "temperature": 0.5
    }
}
```

**Respuesta esperada:**
```json
{
    "quiz": {
        "questions": [
            {
                "question": "¿Qué gas absorben las plantas durante la fotosíntesis?",
                "optionA": "Oxígeno",
                "optionB": "Dióxido de carbono",
                "optionC": "Nitrógeno",
                "optionD": "Hidrógeno",
                "correctOption": "B"
            }
        ],
        "questionsOpen": [
            {
                "question": "Explica el proceso completo de la fotosíntesis y su importancia para la vida en la Tierra.",
                "answer": "La fotosíntesis es el proceso mediante el cual las plantas convierten la energía solar en energía química..."
            }
        ]
    }
}
```

---

## 5. Workflow COMPLETO (Actual)

**Webhook n8n:** `POST http://localhost:5678/webhook/generate-content`

**Datos recibidos del backend:**
```json
{
    "activityId": "uuid-de-la-actividad",
    "topic": "La fotosíntesis",
    "context": "Proceso de las plantas para crear alimento",
    "courseName": "Biología 6to grado",
    "minItems": 3
}
```

**Prompt n8n actual (genera TODO):**
```json
{
    "model": "gemma2:2b",
    "prompt": "Eres un asistente educativo especializado en crear contenido completo para actividades educativas.\n\nCURSO: {{ $json.body.courseName }}\nTEMA: {{ $json.body.topic }}\nCONTEXTO: {{ $json.body.context }}\nMÍNIMO DE ITEMS: {{ $json.body.minItems }}\n\nOBJETIVO: Generar contenido educativo completo incluyendo flashcards, pares de memoria, relaciones y preguntas de quiz.\n\nREQUERIMIENTOS:\n- Generar AL MENOS {{ $json.body.minItems }} elementos de cada tipo\n- Adaptar el lenguaje al nivel educativo del curso\n- Todo el contenido debe estar relacionado con el tema\n\nFORMATO DE RESPUESTA JSON:\n{\n  \"flashcards\": [\n    { \"question\": \"¿Pregunta?\", \"answer\": \"Respuesta\" }\n  ],\n  \"cardsMemory\": [\n    { \"card1\": \"Término\", \"card2\": \"Definición\" }\n  ],\n  \"playRelations\": [\n    { \"item1\": \"Elemento A\", \"item2\": \"Elemento B\", \"isCorrect\": true }\n  ],\n  \"quiz\": {\n    \"questions\": [\n      {\n        \"question\": \"¿Pregunta?\",\n        \"optionA\": \"A\",\n        \"optionB\": \"B\",\n        \"optionC\": \"C\",\n        \"optionD\": \"D\",\n        \"correctOption\": \"B\"\n      }\n    ],\n    \"questionsOpen\": [\n      { \"question\": \"¿Pregunta abierta?\", \"answer\": \"Respuesta modelo\" }\n    ]\n  }\n}\n\nDESARROLLA EL CONTENIDO COMPLETO AHORA.",
    "stream": false,
    "options": {
        "num_predict": 5000,
        "temperature": 0.6
    }
}
```

---

## Comparativa de Enfoques

| Enfoque | Ventajas | Desventajas |
|---------|----------|-------------|
| **Workflow Único (Actual)** | - 1 solo webhook<br>- 1 llamada HTTP<br>- Menos complejidad | - Genera todo aunque no lo necesites<br>- Más tokens usados<br>- Más lento |
| **Workflows Separados** | - Genera solo lo necesario<br>- Más rápido<br>- Menos tokens<br>- Más flexible | - 5 webhooks<br>- Más endpoints en backend<br>- Más complejidad |

---

## Recomendación

**Opción Híbrida (Recomendada):**
- Mantener `/generate-content` para generar todo (uso rápido)
- Agregar endpoints especializados opcionales para casos específicos
- Ejemplo:
    ```
    POST /ai/activities/:id/generate-content (genera todo)
    POST /ai/activities/:id/generate-flashcards (solo flashcards)
    POST /ai/activities/:id/generate-quiz (solo quiz)
    ```

**Nota:** Los prompts de las secciones 2-4 contenían variables como `grade`, `prompt`, `quantity`, etc. que **no están en el objeto enviado desde el backend**. Los prompts han sido simplificados para usar solo las variables realmente disponibles: `courseName`, `topic`, `context` y cantidades específicas derivadas de `minItems`.
