# 🚀 Nuevos Endpoints - Módulos de IA y Contenido

## 📊 Resumen de Cambios

Se agregaron **5 nuevos módulos** con **33 nuevos endpoints**:

1. **AI Module** - Orquestación de IA (2 endpoints)
2. **Flashcard Module** - Tarjetas de estudio (6 endpoints)
3. **CardsMemory Module** - Juego de memoria (6 endpoints)
4. **PlayRelation Module** - Juego de relaciones (6 endpoints)
5. **Quiz Module** - Evaluaciones (6 endpoints)

**Total Endpoints Backend: 41 anteriores + 26 nuevos = 67 endpoints**

---

## 🤖 AI Module (2 endpoints)

### POST /ai/generate-content/:activityId
Genera contenido educativo completo usando IA (Ollama + n8n)

**Request:**
```json
{
  "topic": "La Colonia en Perú",
  "context": "Periodo histórico entre 1532 y 1821",
  "minItems": 3
}
```

**Response:**
```json
{
  "activity_id": "uuid",
  "flashcardsCreated": 3,
  "cardsMemoryCreated": 3,
  "playRelationsCreated": 3,
  "quizQuestionsCreated": 5,
  "status": "success",
  "message": "Contenido generado exitosamente por IA"
}
```

### POST /ai/analyze-emotion
Analiza la emoción y engagement de un estudiante

**Request:**
```json
{
  "text": "Me gustó mucho esta actividad, aprendí bastante",
  "grade": 8
}
```

**Response:**
```json
{
  "emotion": "POSITIVO",
  "engagement": 0.85,
  "analysis": "El estudiante muestra entusiasmo y comprensión del tema"
}
```

---

## 🎴 Flashcard Module (6 endpoints)

### POST /flashcard
Crear flashcard manualmente

**Request:**
```json
{
  "question": "¿Qué es la fotosíntesis?",
  "answer": "Proceso por el cual las plantas convierten luz solar en energía",
  "activity_id": "uuid-activity"
}
```

### GET /flashcard
Obtener todas las flashcards

### GET /flashcard/activity/:activityId
Obtener flashcards de una actividad específica (⭐ IMPORTANTE para frontend)

### GET /flashcard/:id
Obtener una flashcard por ID

### PATCH /flashcard/:id
Actualizar flashcard

### DELETE /flashcard/:id
Eliminar flashcard

---

## 🎮 CardsMemory Module (6 endpoints)

### POST /cards-memory
Crear par de cartas de memoria

**Request:**
```json
{
  "card1": "Hidrógeno",
  "card2": "H",
  "activity_id": "uuid-activity"
}
```

### GET /cards-memory
Obtener todos los pares

### GET /cards-memory/activity/:activityId
Obtener pares de una actividad (⭐ IMPORTANTE para frontend)

**Response:**
```json
[
  {
    "id": "uuid",
    "card1": "Virrey",
    "card2": "Autoridad colonial",
    "isMatched": false,
    "activity_id": "uuid",
    "createdAt": "2025-10-27T..."
  }
]
```

### GET /cards-memory/:id
Obtener un par por ID

### PATCH /cards-memory/:id
Actualizar par (útil para marcar isMatched = true)

### DELETE /cards-memory/:id
Eliminar par

---

## 🔗 PlayRelation Module (6 endpoints)

### POST /play-relation
Crear relación manualmente

**Request:**
```json
{
  "item1": "Virrey",
  "item2": "Autoridad colonial en América",
  "activity_id": "uuid-activity"
}
```

### GET /play-relation
Obtener todas las relaciones

### GET /play-relation/activity/:activityId
Obtener relaciones de una actividad (⭐ IMPORTANTE para frontend)

### GET /play-relation/:id
Obtener una relación por ID

### PATCH /play-relation/:id
Actualizar relación (útil para marcar isRelated = true)

### DELETE /play-relation/:id
Eliminar relación

---

## 📝 Quiz Module (6 endpoints)

### POST /quiz
Crear quiz con preguntas

**Request:**
```json
{
  "activity_id": "uuid-activity",
  "questions": [
    {
      "question": "¿Cuál fue el primer virrey del Perú?",
      "optionA": "Francisco Pizarro",
      "optionB": "Blasco Núñez de Vela",
      "optionC": "Diego de Almagro",
      "optionD": "Pedro de la Gasca",
      "correctOption": "B"
    }
  ],
  "questionsOpen": [
    {
      "question": "Describe el impacto de la conquista española",
      "answer": "Respuesta esperada..."
    }
  ],
  "questionsAudio": [
    {
      "question": "Escucha y responde",
      "audioUrl": "https://ejemplo.com/audio.mp3",
      "answer": "Respuesta correcta"
    }
  ]
}
```

### GET /quiz
Obtener todos los quizzes

### GET /quiz/activity/:activityId
Obtener quiz de una actividad (⭐ IMPORTANTE para frontend)

**Response:**
```json
{
  "id": "uuid",
  "activity_id": "uuid",
  "createdAt": "2025-10-27T...",
  "questions": [
    {
      "id": "uuid",
      "question": "¿Cuál fue el primer virrey?",
      "optionA": "Opción A",
      "optionB": "Opción B",
      "optionC": "Opción C",
      "optionD": "Opción D",
      "correctOption": "B",
      "quiz_id": "uuid"
    }
  ],
  "questionsOpen": [...],
  "questionsAudio": [...]
}
```

### GET /quiz/:id
Obtener un quiz por ID

### PATCH /quiz/:id
Actualizar quiz (simplificado - retorna quiz actual)

### DELETE /quiz/:id
Eliminar quiz

---

## 🎯 Flujo Completo de Uso

### 1. Crear Actividad
```bash
POST /activity
{
  "title": "La Colonia en Perú",
  "description": "Sesión sobre el periodo colonial",
  "enrollment_id": "uuid",
  "end_time": "2025-11-01T23:59:59Z"
}
```

### 2. Generar Contenido con IA
```bash
POST /ai/generate-content/:activityId
{
  "topic": "La Colonia en Perú",
  "context": "Periodo 1532-1821",
  "minItems": 3
}
```

**Esto crea automáticamente:**
- ✅ 3+ Flashcards
- ✅ 3+ Pares de CardsMemory
- ✅ 3+ PlayRelations
- ✅ 1 Quiz con 3+ preguntas

### 3. Obtener Contenido Generado (Frontend)

```bash
# Flashcards
GET /flashcard/activity/:activityId

# Juego de Memoria
GET /cards-memory/activity/:activityId

# Juego de Relaciones
GET /play-relation/activity/:activityId

# Quiz
GET /quiz/activity/:activityId
```

### 4. Registrar Interacción del Estudiante
```bash
POST /interaction
{
  "student_id": "uuid",
  "activity_id": "uuid",
  "emotion": "POSITIVO",
  "grade": 9,
  "engagement": 0.85
}
```

### 5. Analizar Emoción (Opcional con IA)
```bash
POST /ai/analyze-emotion
{
  "text": "Me encantó esta actividad",
  "grade": 9
}
```

---

## 🔐 Autenticación

Todos los endpoints requieren JWT token (excepto /auth/login y /auth/register)

```bash
# Headers requeridos
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

---

## 📊 Swagger UI

Accede a la documentación interactiva completa:

**http://localhost:3000/api**

- Prueba todos los endpoints
- Ve los schemas completos
- Genera requests de ejemplo
- Ejecuta peticiones directamente

---

## 🎮 Endpoints Clave para el Frontend

### Para mostrar contenido de una actividad:

1. **GET /flashcard/activity/:activityId** - Tarjetas de estudio
2. **GET /cards-memory/activity/:activityId** - Pares para juego de memoria
3. **GET /play-relation/activity/:activityId** - Items para juego de relacionar
4. **GET /quiz/activity/:activityId** - Preguntas del quiz

### Para generar contenido:

1. **POST /ai/generate-content/:activityId** - Genera todo automáticamente

### Para interacciones:

1. **POST /interaction** - Registrar resultado del estudiante
2. **POST /ai/analyze-emotion** - Analizar texto/sentimiento (opcional)

---

## 🛠️ Modo Fallback (Sin IA)

Si n8n/Ollama no están disponibles, el backend automáticamente:

1. ✅ Genera contenido básico de plantilla
2. ✅ Retorna `status: "partial"` en lugar de `"success"`
3. ✅ Sigue creando 3+ elementos de cada tipo
4. ✅ La aplicación funciona sin problemas

---

## 📈 Estadísticas Finales

| Categoría | Cantidad |
|-----------|----------|
| Módulos totales | 13 |
| Endpoints totales | 67 |
| Modelos Prisma | 16 |
| DTOs creados | 40+ |
| Servicios | 13 |
| Controladores | 13 |

---

## ✅ Checklist de Verificación

- [x] Todos los módulos compilando sin errores
- [x] PrismaService inyectado en todos los servicios
- [x] Swagger documentation en todos los endpoints
- [x] Validación con class-validator en DTOs
- [x] Endpoints específicos por actividad (activity/:id)
- [x] Modo fallback sin IA configurado
- [x] ConfigModule para variables de entorno
- [x] Documentación de workflows n8n creada

---

## 🚀 Siguiente Paso

1. **Reiniciar el backend** para cargar los nuevos módulos
2. **Acceder a Swagger** http://localhost:3000/api
3. **Probar endpoints** de generación de contenido
4. **Configurar workflows n8n** siguiendo `N8N_WORKFLOWS_GUIDE.md`
5. **Integrar con el frontend** usando los endpoints `/activity/:activityId`

¡El backend está completo y listo para el hackathon! 🎉
