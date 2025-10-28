# 📚 API Reference - EduPlay Backend

Documentación completa de los 72 endpoints REST del sistema EduPlay.

**Base URL:** `http://localhost:3000`  
**Documentación Swagger:** http://localhost:3000/api

---

## 📑 Índice

- [🤖 AI - Inteligencia Artificial](#-ai---inteligencia-artificial-3-endpoints)
- [🎯 Activities - Actividades](#-activities---actividades-8-endpoints)
- [📇 Flashcards](#-flashcards-6-endpoints)
- [🧠 Cards Memory - Juego de Memoria](#-cards-memory---juego-de-memoria-6-endpoints)
- [🔗 Play Relations - Juego de Relaciones](#-play-relations---juego-de-relaciones-6-endpoints)
- [❓ Quiz](#-quiz-6-endpoints)
- [📚 Courses - Cursos](#-courses---cursos-5-endpoints)
- [🏫 Classrooms - Aulas](#-classrooms---aulas-6-endpoints)
- [📋 Enrollments - Inscripciones](#-enrollments---inscripciones-4-endpoints)
- [🎓 Students - Estudiantes](#-students---estudiantes-7-endpoints)
- [👨‍🏫 Teachers - Profesores](#-teachers---profesores-8-endpoints)
- [📊 Interactions - Analytics](#-interactions---analytics-6-endpoints)
- [👤 Users - Usuarios](#-users---usuarios-5-endpoints)
- [🔐 Authentication](#-authentication-3-endpoints)

---

## 🤖 AI - Inteligencia Artificial (3 endpoints)

### POST `/ai/generate-content/:activityId`
Genera contenido educativo gamificado completo usando IA (Ollama + n8n).

**Parámetros URL:**
- `activityId` (UUID) - ID de la actividad

**Body:**
```json
{
  "topic": "Fotosíntesis en Plantas",
  "context": "Proceso biológico donde plantas convierten luz en energía",
  "courseName": "Ciencias Naturales",
  "minItems": 3
}
```

**Respuesta (200 OK):**
```json
{
  "flashcards": [
    {"question": "¿Qué es la fotosíntesis?", "answer": "Proceso donde plantas..."}
  ],
  "cardsMemory": [
    {"card1": "Clorofila", "card2": "Pigmento verde"}
  ],
  "playRelations": [
    {"item1": "Luz solar", "item2": "Energía"}
  ],
  "quiz": {
    "questions": [
      {
        "question": "¿Dónde ocurre la fotosíntesis?",
        "optionA": "Raíz",
        "optionB": "Hoja",
        "optionC": "Tallo",
        "optionD": "Flor",
        "correctOption": "B"
      }
    ],
    "questionsOpen": [
      {"question": "Explica la fotosíntesis", "answer": "Es el proceso..."}
    ]
  }
}
```

**Tiempo promedio:** ~131 segundos

---

### POST `/ai/analyze-emotion`
Analiza la emoción y engagement del estudiante en base a su respuesta y calificación.

**Body:**
```json
{
  "text": "Me encantó esta actividad, aprendí mucho sobre historia",
  "grade": 9
}
```

**Respuesta (200 OK):**
```json
{
  "emotion": "POSITIVO",
  "engagement": 0.92,
  "analysis": "Estudiante muestra entusiasmo y satisfacción con el aprendizaje"
}
```

**Valores posibles:**
- `emotion`: `POSITIVO` | `NEUTRAL` | `NEGATIVO`
- `engagement`: `0.0` a `1.0`

**Tiempo promedio:** ~7 segundos

---

### POST `/ai/chat`
Chat conversacional motivador para introducir actividades a estudiantes.

**Body:**
```json
{
  "activityTitle": "La Colonia en Perú (1532-1821)",
  "activityDescription": "Sesión sobre el período colonial",
  "courseName": "Historia del Perú",
  "studentMessage": "Hola, ¿de qué trata esta actividad?",
  "conversationHistory": [
    {"role": "user", "text": "Hola"},
    {"role": "bot", "text": "¡Hola! Bienvenido"}
  ]
}
```

**Respuesta (200 OK):**
```json
{
  "botResponse": "¡Genial pregunta! Vamos a explorar el fascinante período colonial en Perú. Aprenderás sobre las costumbres, cultura y eventos históricos. 🚀"
}
```

**Tiempo promedio:** ~4 segundos

---

## 🎯 Activities - Actividades (8 endpoints)

### POST `/activity`
Crear nueva actividad educativa.

**Body:**
```json
{
  "title": "La Colonia en Perú",
  "description": "Período histórico 1532-1821",
  "type": "LESSON",
  "dueDate": "2025-12-31T23:59:59Z",
  "courseId": "uuid-del-curso"
}
```

**Respuesta (201 Created):**
```json
{
  "id": "uuid",
  "title": "La Colonia en Perú",
  "description": "Período histórico 1532-1821",
  "type": "LESSON",
  "dueDate": "2025-12-31T23:59:59.000Z",
  "courseId": "uuid-del-curso",
  "createdAt": "2025-10-28T10:00:00.000Z"
}
```

---

### GET `/activity`
Listar todas las actividades.

**Query Params (opcionales):**
- `page` (number) - Página (default: 1)
- `limit` (number) - Resultados por página (default: 20)

**Respuesta (200 OK):**
```json
{
  "data": [
    {
      "id": "uuid",
      "title": "La Colonia en Perú",
      "type": "LESSON",
      "dueDate": "2025-12-31T23:59:59.000Z"
    }
  ],
  "total": 50,
  "page": 1,
  "limit": 20
}
```

---

### GET `/activity/:id`
Obtener una actividad específica por ID.

**Respuesta (200 OK):**
```json
{
  "id": "uuid",
  "title": "La Colonia en Perú",
  "description": "Período histórico 1532-1821",
  "type": "LESSON",
  "dueDate": "2025-12-31T23:59:59.000Z",
  "course": {
    "id": "uuid",
    "name": "Historia del Perú"
  },
  "flashcards": [],
  "cardsMemory": [],
  "playRelations": [],
  "quiz": []
}
```

---

### PATCH `/activity/:id`
Actualizar actividad existente.

**Body (parcial):**
```json
{
  "title": "La Colonia en Perú - Actualizado",
  "description": "Nueva descripción"
}
```

---

### DELETE `/activity/:id`
Eliminar actividad.

**Respuesta (200 OK):**
```json
{
  "message": "Activity deleted successfully",
  "id": "uuid"
}
```

---

### GET `/activity/course/:courseId`
Obtener todas las actividades de un curso.

**Respuesta (200 OK):**
```json
[
  {
    "id": "uuid",
    "title": "La Colonia en Perú",
    "type": "LESSON",
    "dueDate": "2025-12-31T23:59:59.000Z"
  }
]
```

---

### GET `/activity/student/:studentId`
Obtener actividades asignadas a un estudiante.

---

### GET `/activity/upcoming`
Obtener actividades próximas a vencer.

**Query Params:**
- `days` (number) - Días hacia adelante (default: 7)

---

## 📇 Flashcards (6 endpoints)

### POST `/flashcard`
Crear nueva flashcard.

**Body:**
```json
{
  "question": "¿Qué es la fotosíntesis?",
  "answer": "Proceso donde las plantas convierten luz solar en energía química",
  "activityId": "uuid"
}
```

---

### GET `/flashcard`
Listar todas las flashcards.

---

### GET `/flashcard/:id`
Obtener una flashcard específica.

---

### GET `/flashcard/activity/:activityId`
Obtener todas las flashcards de una actividad.

**Respuesta (200 OK):**
```json
[
  {
    "id": "uuid",
    "question": "¿Qué es la fotosíntesis?",
    "answer": "Proceso donde las plantas...",
    "activityId": "uuid"
  }
]
```

---

### PATCH `/flashcard/:id`
Actualizar flashcard existente.

---

### DELETE `/flashcard/:id`
Eliminar flashcard.

---

## 🧠 Cards Memory - Juego de Memoria (6 endpoints)

### POST `/cards-memory`
Crear par de cartas para juego de memoria.

**Body:**
```json
{
  "card1": "Clorofila",
  "card2": "Pigmento verde de las plantas",
  "activityId": "uuid"
}
```

---

### GET `/cards-memory`
Listar todos los pares de memoria.

---

### GET `/cards-memory/:id`
Obtener un par específico.

---

### GET `/cards-memory/activity/:activityId`
Obtener todos los pares de una actividad.

---

### PATCH `/cards-memory/:id`
Actualizar par de cartas.

---

### DELETE `/cards-memory/:id`
Eliminar par de cartas.

---

## 🔗 Play Relations - Juego de Relaciones (6 endpoints)

### POST `/play-relation`
Crear relación entre items.

**Body:**
```json
{
  "item1": "Luz solar",
  "item2": "Fuente de energía",
  "isRelated": true,
  "activityId": "uuid"
}
```

---

### GET `/play-relation`
Listar todas las relaciones.

---

### GET `/play-relation/:id`
Obtener una relación específica.

---

### GET `/play-relation/activity/:activityId`
Obtener todas las relaciones de una actividad.

---

### PATCH `/play-relation/:id`
Actualizar relación.

---

### DELETE `/play-relation/:id`
Eliminar relación.

---

## ❓ Quiz (6 endpoints)

### POST `/quiz`
Crear quiz completo.

**Body:**
```json
{
  "activityId": "uuid",
  "questions": [
    {
      "question": "¿Dónde ocurre la fotosíntesis?",
      "optionA": "Raíz",
      "optionB": "Hoja",
      "optionC": "Tallo",
      "optionD": "Flor",
      "correctOption": "B"
    }
  ],
  "questionsOpen": [
    {
      "question": "Explica la fotosíntesis",
      "answer": "Es el proceso biológico..."
    }
  ]
}
```

---

### GET `/quiz`
Listar todos los quizzes.

---

### GET `/quiz/:id`
Obtener un quiz específico.

---

### GET `/quiz/activity/:activityId`
Obtener el quiz de una actividad.

**Respuesta (200 OK):**
```json
{
  "id": "uuid",
  "activityId": "uuid",
  "questions": [...],
  "questionsOpen": [...]
}
```

---

### PATCH `/quiz/:id`
Actualizar quiz.

---

### DELETE `/quiz/:id`
Eliminar quiz.

---

## 📚 Courses - Cursos (5 endpoints)

### POST `/course`
Crear nuevo curso.

**Body:**
```json
{
  "name": "Historia del Perú",
  "description": "Curso sobre la historia peruana",
  "teacherId": "uuid"
}
```

---

### GET `/course`
Listar todos los cursos.

---

### GET `/course/:id`
Obtener curso específico con actividades.

---

### PATCH `/course/:id`
Actualizar curso.

---

### DELETE `/course/:id`
Eliminar curso.

---

## 🏫 Classrooms - Aulas (6 endpoints)

### POST `/classroom`
Crear nueva aula.

**Body:**
```json
{
  "name": "Aula 5A",
  "section": "Primaria",
  "grade": 5,
  "teacherId": "uuid"
}
```

---

### GET `/classroom`
Listar todas las aulas.

---

### GET `/classroom/:id`
Obtener aula específica.

---

### GET `/classroom/teacher/:teacherId`
Obtener aulas de un profesor.

---

### PATCH `/classroom/:id`
Actualizar aula.

---

### DELETE `/classroom/:id`
Eliminar aula.

---

## 📋 Enrollments - Inscripciones (4 endpoints)

### POST `/enrollment`
Inscribir estudiante en un aula.

**Body:**
```json
{
  "studentId": "uuid",
  "classroomId": "uuid",
  "enrollmentDate": "2025-01-01T00:00:00Z"
}
```

---

### GET `/enrollment/student/:studentId`
Obtener inscripciones de un estudiante.

---

### GET `/enrollment/classroom/:classroomId`
Obtener estudiantes de un aula.

---

### DELETE `/enrollment/:id`
Eliminar inscripción.

---

## 🎓 Students - Estudiantes (7 endpoints)

### POST `/student`
Crear nuevo estudiante.

**Body:**
```json
{
  "name": "Juan Pérez",
  "email": "juan@eduplay.com",
  "age": 10,
  "grade": 5
}
```

---

### GET `/student`
Listar todos los estudiantes.

---

### GET `/student/:id`
Obtener estudiante específico.

---

### GET `/student/:id/activities`
Obtener actividades del estudiante.

---

### GET `/student/:id/progress`
Obtener progreso del estudiante.

**Respuesta (200 OK):**
```json
{
  "studentId": "uuid",
  "totalActivities": 20,
  "completedActivities": 15,
  "averageGrade": 8.5,
  "averageEngagement": 0.82,
  "emotionDistribution": {
    "POSITIVO": 12,
    "NEUTRAL": 3,
    "NEGATIVO": 0
  }
}
```

---

### PATCH `/student/:id`
Actualizar estudiante.

---

### DELETE `/student/:id`
Eliminar estudiante.

---

## 👨‍🏫 Teachers - Profesores (8 endpoints)

### POST `/teacher`
Crear nuevo profesor.

**Body:**
```json
{
  "name": "María López",
  "email": "maria@eduplay.com",
  "specialization": "Historia"
}
```

---

### GET `/teacher`
Listar todos los profesores.

---

### GET `/teacher/:id`
Obtener profesor específico.

---

### GET `/teacher/:id/courses`
Obtener cursos del profesor.

---

### GET `/teacher/:id/classrooms`
Obtener aulas del profesor.

---

### GET `/teacher/:id/dashboard`
Dashboard completo del profesor con estadísticas.

**Respuesta (200 OK):**
```json
{
  "teacher": {...},
  "totalStudents": 30,
  "totalCourses": 3,
  "totalActivities": 25,
  "recentInteractions": [...],
  "emotionStats": {
    "POSITIVO": 18,
    "NEUTRAL": 10,
    "NEGATIVO": 2
  },
  "averageEngagement": 0.78
}
```

---

### PATCH `/teacher/:id`
Actualizar profesor.

---

### DELETE `/teacher/:id`
Eliminar profesor.

---

## 📊 Interactions - Analytics (6 endpoints)

### POST `/interaction`
Registrar interacción estudiante-actividad.

**Body:**
```json
{
  "studentId": "uuid",
  "activityId": "uuid",
  "emotion": "POSITIVO",
  "engagement": 0.85,
  "grade": 9,
  "completedAt": "2025-10-28T10:30:00Z"
}
```

---

### GET `/interaction`
Listar todas las interacciones.

---

### GET `/interaction/:id`
Obtener interacción específica.

---

### GET `/interaction/student/:studentId`
Obtener interacciones de un estudiante.

---

### GET `/interaction/activity/:activityId`
Obtener interacciones de una actividad.

---

### GET `/interaction/activity/:activityId/statistics`
Obtener estadísticas de una actividad.

**Respuesta (200 OK):**
```json
{
  "activityId": "uuid",
  "totalInteractions": 25,
  "averageGrade": 8.2,
  "averageEngagement": 0.79,
  "emotionDistribution": {
    "POSITIVO": 18,
    "NEUTRAL": 5,
    "NEGATIVO": 2
  },
  "completionRate": 0.83
}
```

---

## 👤 Users - Usuarios (5 endpoints)

### POST `/user`
Crear nuevo usuario.

**Body:**
```json
{
  "email": "usuario@eduplay.com",
  "password": "SecurePass123",
  "role": "STUDENT"
}
```

---

### GET `/user`
Listar todos los usuarios.

---

### GET `/user/:id`
Obtener usuario específico.

---

### PATCH `/user/:id`
Actualizar usuario.

---

### DELETE `/user/:id`
Eliminar usuario.

---

## 🔐 Authentication (3 endpoints)

### POST `/auth/register`
Registrar nuevo usuario.

**Body:**
```json
{
  "email": "nuevo@eduplay.com",
  "password": "SecurePass123",
  "name": "Nombre Usuario",
  "role": "STUDENT"
}
```

**Respuesta (201 Created):**
```json
{
  "user": {
    "id": "uuid",
    "email": "nuevo@eduplay.com",
    "role": "STUDENT"
  },
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### POST `/auth/login`
Iniciar sesión.

**Body:**
```json
{
  "email": "usuario@eduplay.com",
  "password": "SecurePass123"
}
```

**Respuesta (200 OK):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "usuario@eduplay.com",
    "role": "STUDENT"
  }
}
```

---

### GET `/auth/profile`
Obtener perfil del usuario autenticado.

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Respuesta (200 OK):**
```json
{
  "id": "uuid",
  "email": "usuario@eduplay.com",
  "role": "STUDENT",
  "createdAt": "2025-10-01T00:00:00.000Z"
}
```

---

## 🔑 Autenticación JWT

Todos los endpoints (excepto `/auth/register` y `/auth/login`) requieren autenticación JWT.

**Header requerido:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Roles:**
- `STUDENT` - Acceso a actividades y juegos
- `TEACHER` - Gestión de cursos y actividades
- `ADMIN` - Acceso completo

---

## 📖 Recursos Adicionales

- **Swagger UI:** http://localhost:3000/api
- **Repositorio:** https://github.com/CarlitoUwU/backend-EduPlay
- **Guía n8n:** Ver [N8N_GUIDE.md](../N8N_GUIDE.md)
- **Base de datos:** Ver [DATABASE.md](./DATABASE.md)
- **Testing:** Ver [TESTING.md](./TESTING.md)

---

**Total:** 72 endpoints REST documentados
