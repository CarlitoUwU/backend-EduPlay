# 🎮 EduPlay Backend# 🎮 EduPlay Backend# 🎮 EduPlay Backend



Plataforma educativa gamificada con IA integrada para personalización y análisis emocional en tiempo real.



[![NestJS](https://img.shields.io/badge/NestJS-11.0.1-E0234E?logo=nestjs)](https://nestjs.com/)Plataforma educativa gamificada con IA integrada para personalización y análisis emocional en tiempo real.Plataforma educativa gamificada con IA integrada para personalización y análisis emocional en tiempo real.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)

[![Prisma](https://img.shields.io/badge/Prisma-6.18.0-2D3748?logo=prisma)](https://www.prisma.io/)

[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791?logo=postgresql)](https://www.postgresql.org/)

[![NestJS](https://img.shields.io/badge/NestJS-11.0.1-E0234E?logo=nestjs)](https://nestjs.com/)[![NestJS](https://img.shields.io/badge/NestJS-11.0.1-E0234E?logo=nestjs)](https://nestjs.com/)

---

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)

## ✨ Características

[![Prisma](https://img.shields.io/badge/Prisma-6.18.0-2D3748?logo=prisma)](https://www.prisma.io/)[![Prisma](https://img.shields.io/badge/Prisma-6.18.0-2D3748?logo=prisma)](https://www.prisma.io/)

- 🤖 **IA Generativa**: Contenido educativo automático con Ollama (gemma2:2b)

- 💭 **Análisis Emocional**: Tracking en tiempo real de emociones y engagement[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791?logo=postgresql)](https://www.postgresql.org/)[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791?logo=postgresql)](https://www.postgresql.org/)

- 💬 **Chat Conversacional**: Introducciones dinámicas con chatbot motivador

- 🎮 **Gamificación**: Flashcards, juegos de memoria, relaciones, quiz interactivos

- 🔐 **Auth Segura**: JWT + Bcrypt con sistema de roles (estudiante/profesor/admin)

- 📊 **Analytics**: Dashboard completo para profesores con métricas de aprendizaje## ✨ Características## ✨ Características

- 📚 **72 Endpoints REST**: API completamente documentada con Swagger/OpenAPI



**Stack Tecnológico:** NestJS + PostgreSQL + Prisma + n8n + Ollama

- 🤖 **IA Generativa**: Contenido educativo automático (flashcards, juegos, quiz)- 🤖 **IA Generativa**: Contenido educativo automático (flashcards, juegos, quiz)

---

- 💭 **Análisis Emocional**: Tracking en tiempo real con gemma2:2b- 💭 **Análisis Emocional**: Tracking en tiempo real de emociones y engagement

## 🚀 Quick Start

- 💬 **Chat Conversacional**: Introducciones dinámicas con chatbot motivador- 💬 **Chat Conversacional**: Introductions dinámicas con chatbot motivador

```powershell

# 1. Clonar repositorio- 🎮 **Gamificación**: Flashcards, memoria, relaciones, quiz interactivos- 🎮 **Gamificación**: Flashcards, memoria, relaciones, quiz interactivos

git clone https://github.com/CarlitoUwU/backend-EduPlay.git

cd backend-EduPlay- 🔐 **Auth Segura**: JWT + Bcrypt con roles- 🔐 **Auth Segura**: JWT + Bcrypt con roles (estudiante, profesor, admin)



# 2. Configurar entorno- 📊 **Analytics**: Dashboard para profesores- 📊 **Analytics**: Dashboard para profesores con métricas de aprendizaje

cp .env.example .env

- 📚 **72 Endpoints REST** con documentación Swagger- 📚 **API REST**: 72 endpoints documentados con Swagger

# 3. Iniciar servicios Docker

docker-compose up -d



# 4. Instalar dependencias y configurar DB**Stack:** NestJS + PostgreSQL + Prisma + n8n + Ollama**Stack:** NestJS + PostgreSQL + Prisma + n8n + Ollama (gemma2:2b)

npm install

npx prisma generate

npx prisma migrate deploy

npm run seed------



# 5. Iniciar backend

npm run start:dev

```## 🚀 Quick Start## 🚀 Quick Start



**Servicios disponibles:**

- 📚 **API Backend**: http://localhost:3000

- 📖 **Swagger Docs**: http://localhost:3000/api```powershell```powershell

- 🤖 **n8n UI**: http://localhost:5678 (admin/admin123)

- 🗄️ **Prisma Studio**: `npx prisma studio` → http://localhost:5555# 1. Clonar y configurar# 1. Clonar repositorio



---git clone https://github.com/CarlitoUwU/backend-EduPlay.gitgit clone https://github.com/CarlitoUwU/backend-EduPlay.git



## 🏗️ Arquitectura del Sistemacd backend-EduPlaycd backend-EduPlay



```cp .env.example .env

┌─────────────┐

│   Frontend  │# 2. Configurar entorno

│  (React/    │

│   Vue/Next) │# 2. Iniciar servicioscp .env.example .env

└──────┬──────┘

       │ HTTP/RESTdocker-compose up -d

       ▼

┌──────────────────────────┐# 3. Iniciar servicios Docker

│  Backend NestJS :3000    │

│  • 72 Endpoints REST     │# 3. Setup backenddocker-compose up -d

│  • JWT Auth              │

│  • Swagger Docs          │npm install

└────┬────────────┬────────┘

     │            │npx prisma generate# 4. Instalar dependencias

     ▼            ▼

┌─────────┐  ┌───────────┐npx prisma migrate deploynpm install

│PostgreSQL│  │  n8n :5678│

│  :5432   │  │ Workflows │npm run seed

└──────────┘  └─────┬─────┘

                    │# 5. Configurar base de datos

                    ▼

              ┌──────────┐# 4. Iniciar desarrollonpx prisma generate

              │  Ollama  │

              │ gemma2:2b│npm run start:devnpx prisma migrate deploy

              │  :11434  │

              └──────────┘```npm run seed

```



**Flujo de IA:**

1. 👨‍🏫 Profesor crea actividad**Accesos:**# 6. Iniciar backend

2. 🔄 Backend llama workflow n8n

3. 🤖 n8n genera contenido con Ollama (gemma2:2b)- 📚 API: http://localhost:3000npm run start:dev

4. 💾 Backend guarda en PostgreSQL

5. 👨‍🎓 Estudiante interactúa → Análisis emocional en tiempo real- 📖 Swagger: http://localhost:3000/api```



---- 🤖 n8n: http://localhost:5678 (admin/admin123)



## 🤖 Sistema de Inteligencia Artificial**Accesos:**



### 3 Workflows n8n Activos---- 📚 API: http://localhost:3000



| Workflow | Función | Tiempo Promedio | Endpoint |- 📖 Swagger: http://localhost:3000/api

|----------|---------|----------------|----------|

| **Generate Educational Content** | Crear flashcards, juegos de memoria, relaciones y quiz | ~2 min | `/webhook/generate-content` |## 🏗️ Arquitectura- 🤖 n8n: http://localhost:5678 (admin/admin123)

| **Analyze Student Emotion** | Detectar emoción (POSITIVO/NEUTRAL/NEGATIVO) y engagement (0-1) | ~7 seg | `/webhook/analyze-emotion` |

| **Chat Conversation** | Respuestas conversacionales motivadoras para introducciones | ~4 seg | `/webhook/chat` |



**📖 Guía completa de configuración:** Ver `N8N_GUIDE.md````---



### Configuración Inicial de OllamaFrontend → Backend (NestJS) → PostgreSQL



```powershell              ↓## 🏗️ Arquitectura

# Descargar modelo gemma2:2b (1.6GB - optimizado para velocidad)

docker exec -it ollama ollama pull gemma2:2b          n8n Workflows → Ollama (gemma2:2b)



# Verificar modelos instalados``````

docker exec -it ollama ollama list

Frontend → Backend (NestJS) → PostgreSQL

# Verificar que Ollama responde

curl http://localhost:11434/api/tags**Flujo de IA:**              ↓

```

1. Teacher crea actividad            n8n Workflows → Ollama (IA)

---

2. Backend llama n8n```

## 📊 Endpoints Principales (72 Total)

3. n8n genera contenido con Ollama

### 🤖 AI - Inteligencia Artificial (3 endpoints)

```typescript4. Backend guarda en DB**Flujo de IA:**

POST /ai/generate-content/:activityId  // Generar contenido completo con IA

POST /ai/analyze-emotion                // Analizar emoción del estudiante5. Student interactúa → Análisis emocional1. Teacher crea actividad → Backend llama n8n

POST /ai/chat                           // Chat conversacional

```2. n8n genera contenido con Ollama (gemma2:2b)



### 🎯 Actividades (8 endpoints)---3. Backend guarda flashcards/juegos/quiz en DB

```typescript

POST   /activity                // Crear actividad4. Student interactúa → Análisis emocional en tiempo real

GET    /activity                // Listar todas las actividades

GET    /activity/:id            // Obtener una actividad## 🤖 Sistema de IA (n8n + Ollama)

PATCH  /activity/:id            // Actualizar actividad

DELETE /activity/:id            // Eliminar actividad---

GET    /activity/course/:id     // Actividades por curso

GET    /activity/student/:id    // Actividades por estudiante### 3 Workflows Activos

GET    /activity/upcoming       // Actividades próximas

```## 🤖 Sistema de IA



### 📇 Flashcards (6 endpoints)| Workflow | Función | Tiempo |

```typescript

POST   /flashcard               // Crear flashcard|----------|---------|--------|### 3 Workflows n8n Activos

GET    /flashcard               // Listar todas

GET    /flashcard/:id           // Obtener una| **Generate Content** | Crear flashcards, juegos, quiz | ~2 min |

GET    /flashcard/activity/:id  // Flashcards por actividad

PATCH  /flashcard/:id           // Actualizar| **Analyze Emotion** | Detectar emoción y engagement | ~7 seg || Workflow | Propósito | Tiempo | Endpoint |

DELETE /flashcard/:id           // Eliminar

```| **Chat** | Respuestas conversacionales | ~4 seg ||----------|-----------|--------|----------|



### 🎮 Juegos (CardsMemory, PlayRelation - 6 endpoints cada uno)| **Generate Content** | Crear flashcards, juegos, quiz | ~2 min | `/generate-content` |

```typescript

// Similar estructura para:**Setup:** Ver guía completa en `N8N_GUIDE.md`| **Analyze Emotion** | Detectar emoción y engagement | ~7 seg | `/analyze-emotion` |

POST   /cards-memory             // Crear par de memoria

POST   /play-relation            // Crear relación| **Chat Conversation** | Respuestas conversacionales | ~4 seg | `/chat` |

// + GET, GET/:id, GET/activity/:id, PATCH, DELETE

```### Descargar Modelo



### 📝 Quiz (6 endpoints)**Setup n8n:** Ver guía completa en `N8N_GUIDE.md`

```typescript

POST   /quiz                     // Crear quiz```powershell

GET    /quiz                     // Listar todos

GET    /quiz/:id                 // Obtener unodocker exec -it ollama ollama pull gemma2:2b### Modelo Ollama

GET    /quiz/activity/:id        // Quiz por actividad

PATCH  /quiz/:id                 // Actualizardocker exec -it ollama ollama list

DELETE /quiz/:id                 // Eliminar

`````````powershell



**📖 Documentación interactiva completa:** http://localhost:3000/api# Descargar modelo



------docker exec -it ollama ollama pull gemma2:2b



## 🗃️ Base de Datos (16 Modelos Prisma)



```## 📊 Endpoints Principales# Verificar instalación

User (id, full_name, email, password, role)

  ├─→ Student (age, grade, risk_score)docker exec -it ollama ollama list

  └─→ Teacher (specialty, assignedGrade)

### AI (3 endpoints)```

Classroom (id, name)

  └─→ Student (classroom_id)```typescript



Course (id, name)POST /ai/generate-content/:activityId  // Generar contenido completo---



Enrollment (teacher_id, classroom_id, course_id)POST /ai/analyze-emotion                // Analizar emoción

  └─→ Activity (title, description, hasIntroduction, start_time, end_time)

        ├─→ Flashcard (question, answer)POST /ai/chat                           // Chat conversacional## 📊 Endpoints Principales

        ├─→ CardsMemory (card1, card2, isMatched)

        ├─→ PlayRelation (item1, item2, isRelated)```

        ├─→ ExtraMaterial (title, url)

        ├─→ Quiz (id, createdAt)### AI (3 endpoints)

        │     ├─→ Question (question, optionA, optionB, optionC, optionD, correctOption)

        │     ├─→ QuestionOpen (question, answer)### Actividades (8 endpoints)```typescript

        │     └─→ QuestionAudio (question, audioUrl, answer)

        └─→ Interaction (student_id, emotion, grade, engagement, createdAt)```typescriptPOST /ai/generate-content/:activityId  // Generar contenido completo

```

POST   /activity              GET    /activityPOST /ai/analyze-emotion                // Analizar emoción

**Ver schema completo:** `prisma/schema.prisma`

GET    /activity/:id          PATCH  /activity/:idPOST /ai/chat                           // Chat conversacional

---

DELETE /activity/:id          GET    /activity/course/:id```

## 🧪 Testing y Datos de Prueba

GET    /activity/student/:id  GET    /activity/upcoming

### Datos de Seed

```### Actividades (8 endpoints)

```powershell

npm run seed```typescript

```

### Flashcards (6 endpoints)POST   /activity              // Crear actividad

**Datos creados:**

- 1 Aula: "5to Grado A"```typescriptGET    /activity              // Listar todas

- 1 Profesor: María García

- 2 Estudiantes: José ("Pepe"), Ana ("Anita")POST   /flashcard             GET    /flashcardGET    /activity/:id          // Obtener una

- 4 Cursos: Historia del Perú, Matemáticas, Comunicación, Ciencias Naturales

- 1 Actividad de ejemplo: "La Colonia en Perú (1532-1821)" con flashcards, juegosGET    /flashcard/:id         GET    /flashcard/activity/:idPATCH  /activity/:id          // Actualizar



**Credenciales de prueba:**PATCH  /flashcard/:id         DELETE /flashcard/:idDELETE /activity/:id          // Eliminar

- **Docente:** `maria.garcia@eduplay.com` / `password123`

- **Estudiante 1:** `jose.rodriguez@eduplay.com` / `password123````GET    /activity/course/:id   // Por curso

- **Estudiante 2:** `ana.martinez@eduplay.com` / `password123`

GET    /activity/student/:id  // Por estudiante

### Test de Workflows n8n

**Total:** 72 endpoints REST | **Docs:** http://localhost:3000/apiGET    /activity/upcoming     // Próximas

```powershell

# Test automatizado completo```

.\test-chat-workflow.ps1

```---



### Test Manual de Endpoints### Flashcards (6 endpoints)



```powershell## 🗃️ Modelos de Datos```typescript

# 1. Generar contenido con IA

curl -X POST http://localhost:3000/ai/generate-content/ACTIVITY_ID `POST   /flashcard                  // Crear flashcard

  -H "Content-Type: application/json" `

  -d '{"topic":"La Colonia en Perú","context":"Período 1532-1821","minItems":3}'```typescriptGET    /flashcard                  // Listar todas



# 2. Analizar emociónUser → Student/Teacher → Classroom → Enrollment → ActivityGET    /flashcard/:id              // Obtener una

curl -X POST http://localhost:3000/ai/analyze-emotion `

  -H "Content-Type: application/json" `                                                      ↓GET    /flashcard/activity/:id     // Por actividad

  -d '{"text":"Me gustó mucho esta clase","grade":9}'

                          ┌───────────────────────────┼────────────┐PATCH  /flashcard/:id              // Actualizar

# 3. Chat conversacional

curl -X POST http://localhost:3000/ai/chat `                          ↓                           ↓            ↓DELETE /flashcard/:id              // Eliminar

  -H "Content-Type: application/json" `

  -d '{"student_id":"UUID","activity_id":"UUID","message":"Hola, ¿de qué trata?","conversation_history":[]}'                      Flashcard                 CardsMemory   PlayRelation```

```

                          ↓                                        

---

                        Quiz ← Question + QuestionOpen + QuestionAudio**Total:** 72 endpoints REST | Ver Swagger: http://localhost:3000/api

## 🔧 Comandos Útiles

                          ↓

### Desarrollo

```powershell                     Interaction (emotion, engagement, grade)---

npm run start:dev          # Modo desarrollo con hot-reload

npm run build              # Compilar TypeScript```

npm run start:prod         # Modo producción

npm run test               # Tests unitarios## 🗃️ Modelos de Datos

npm run test:e2e           # Tests end-to-end

```**16 modelos Prisma** | Ver: `prisma/schema.prisma`



### Base de Datos```typescript

```powershell

npx prisma studio          # UI visual para datos (puerto 5555)---User → Student/Teacher → Classroom

npx prisma migrate dev     # Crear nueva migración

npx prisma migrate deploy  # Aplicar migraciones       ↓

npm run seed               # Poblar datos de prueba

npx prisma generate        # Generar Prisma Client (CRÍTICO después de clonar)## 🧪 TestingCourse → Enrollment → Activity

```

                      ↓

### Docker

```powershell### Datos de Prueba       ┌──────────────┼──────────────┐

docker-compose up -d       # Iniciar servicios en background

docker-compose down        # Detener servicios```powershell       ↓              ↓              ↓

docker-compose down -v     # Detener y eliminar volúmenes

docker ps                  # Ver contenedores activosnpm run seed   Flashcard    CardsMemory    PlayRelation

docker logs n8n -f         # Ver logs de n8n en tiempo real

docker logs ollama -f      # Ver logs de Ollama```       ↓              ↓              ↓

docker restart n8n         # Reiniciar n8n

docker restart ollama      # Reiniciar Ollama     Quiz ← Question + QuestionOpen + QuestionAudio

```

**Credenciales:**       ↓

### Ollama (IA)

```powershell- Docente: `maria.garcia@eduplay.com` / `password123`  Interaction (emotion, engagement, grade)

docker exec -it ollama ollama pull gemma2:2b  # Descargar modelo

docker exec -it ollama ollama list            # Listar modelos instalados- Estudiante 1: `jose.rodriguez@eduplay.com` / `password123````

docker exec -it ollama ollama rm phi3         # Eliminar modelo viejo

curl http://localhost:11434/api/tags          # Ver modelos vía API- Estudiante 2: `ana.martinez@eduplay.com` / `password123`

```

**16 modelos Prisma** | Schema: `prisma/schema.prisma`

---

### Test Workflows

## 📁 Estructura del Proyecto

```powershell---

```

backend-EduPlay/.\test-chat-workflow.ps1

├── src/

│   ├── modules/                 # 13 módulos funcionales```## 🧪 Testing

│   │   ├── ai/                  # IA (3 endpoints: generate, emotion, chat)

│   │   ├── user/                # Users (5 endpoints CRUD)

│   │   ├── activity/            # Actividades (8 endpoints)

│   │   ├── flashcard/           # Flashcards (6 endpoints)### Test Manual### Datos de Prueba (Seed)

│   │   ├── cards-memory/        # Juego de memoria (6 endpoints)

│   │   ├── play-relation/       # Juego de relaciones (6 endpoints)```powershell

│   │   ├── quiz/                # Quiz (6 endpoints)

│   │   ├── classroom/           # Aulas (6 endpoints)# Generar contenido con IA```powershell

│   │   ├── course/              # Cursos (5 endpoints)

│   │   ├── enrollment/          # Inscripciones (4 endpoints)curl -X POST http://localhost:3000/ai/generate-content/ACTIVITY_ID `npm run seed

│   │   ├── interaction/         # Analytics (6 endpoints)

│   │   ├── student/             # Estudiantes (7 endpoints)  -H "Content-Type: application/json" ````

│   │   └── teacher/             # Profesores (8 endpoints)

│   ├── app/                     # Módulo raíz  -d '{"topic":"La Colonia en Perú","minItems":3}'

│   ├── main.ts                  # Bootstrap de la aplicación

│   └── prisma.service.ts        # Servicio Prisma**Credenciales de prueba:**

├── prisma/

│   ├── schema.prisma            # 16 modelos de datos# Chat conversacional- **Docente:** maria.garcia@eduplay.com / password123

│   ├── migrations/              # Historial de migraciones

│   └── seed.ts                  # Script de datos de pruebacurl -X POST http://localhost:3000/ai/chat `- **Estudiante 1:** jose.rodriguez@eduplay.com / password123

├── docker-compose.yml           # PostgreSQL + n8n + Ollama

├── .env.example                 # Template de variables de entorno  -H "Content-Type: application/json" `- **Estudiante 2:** ana.martinez@eduplay.com / password123

├── test-chat-workflow.ps1       # Script de pruebas de workflows

├── N8N_GUIDE.md                 # 📖 Guía completa de workflows n8n  -d '{"student_id":"UUID","activity_id":"UUID","message":"Hola"}'

└── README.md                    # 📖 Este archivo

``````### Test Workflow Chat



---



## 🔒 Seguridad---```powershell



- ✅ Passwords hasheados con bcrypt (10 salt rounds).\test-chat-workflow.ps1

- ✅ JWT para autenticación stateless

- ✅ Validación de DTOs con class-validator## 🔧 Comandos Útiles```

- ✅ CORS configurado

- ✅ Helmet para headers de seguridad HTTP

- ✅ Variables sensibles en `.env` (no versionadas)

```powershell### Test Manual de Endpoints

**⚠️ Producción:** 

- Configurar `JWT_SECRET` seguro aleatorio# Desarrollo

- Usar `DATABASE_URL` con credenciales robustas

- Habilitar HTTPSnpm run start:dev          # Hot reload```powershell

- Configurar rate limiting

npm run build              # Compilar# Generar contenido con IA

---

npm run start:prod         # Produccióncurl -X POST http://localhost:3000/ai/generate-content/ACTIVITY_ID `

## 🐳 Docker Services

  -H "Content-Type: application/json" `

| Servicio | Puerto | Credenciales | Descripción |

|----------|--------|--------------|-------------|# Base de datos  -d '{"topic":"La Colonia en Perú","minItems":3}'

| **PostgreSQL** | 5432 | postgres/postgres | Base de datos principal + n8n |

| **n8n** | 5678 | admin/admin123 | Workflows de automatización |npx prisma studio          # UI datos

| **Ollama** | 11434 | - | Motor de IA (modelo gemma2:2b) |

npx prisma migrate dev     # Nueva migración# Chat conversacional

**Volúmenes persistentes:**

- `./postgres_data` - Datos de PostgreSQLnpm run seed               # Poblar datoscurl -X POST http://localhost:3000/ai/chat `

- `./n8n_data` - Workflows y configuración de n8n

- `./ollama_data` - Modelos de IA descargados  -H "Content-Type: application/json" `



---# Docker  -d '{"student_id":"UUID","activity_id":"UUID","message":"Hola"}'



## 🚨 Troubleshootingdocker-compose up -d       # Iniciar servicios```



### ❌ Error: "Prisma Client not generated"docker-compose down        # Detener servicios

```powershell

# Solucióndocker logs n8n -f         # Ver logs n8n---

npx prisma generate

docker logs ollama -f      # Ver logs Ollama

# Si persiste

Remove-Item -Recurse -Force node_modules\.prisma```## 🔧 Comandos Útiles

Remove-Item -Recurse -Force node_modules\@prisma\client

npx prisma generate

```

---```powershell

### ❌ Error: "Cannot connect to Ollama"

```powershell# Desarrollo

# Verificar que Ollama esté corriendo

docker ps | findstr ollama## 📁 Estructuranpm run start:dev          # Modo desarrollo con hot-reload



# Reiniciar Ollamanpm run build              # Compilar TypeScript

docker restart ollama

```npm run start:prod         # Producción

# Descargar modelo si no existe

docker exec -it ollama ollama pull gemma2:2bbackend-EduPlay/

```

├── src/# Base de datos

### ❌ Error: "n8n workflow no responde"

**Diagnóstico:**│   ├── modules/          # 13 módulos (ai, user, activity, flashcard...)npx prisma studio          # UI para ver/editar datos

1. Verificar que workflow esté **activo** (toggle verde en n8n UI)

2. Ver logs: `docker logs n8n -f`│   ├── app/              # Módulo raíznpx prisma migrate dev     # Crear migración

3. Verificar path del webhook (debe ser exacto: `/generate-content`, `/analyze-emotion`, `/chat`)

4. Probar webhook directo: `curl http://localhost:5678/webhook/generate-content`│   ├── main.ts           # Entry pointnpm run seed               # Poblar datos de prueba



### ❌ Performance lento / Timeout│   └── prisma.service.ts

```powershell

# Verificar recursos de Docker├── prisma/# Docker

docker stats

│   ├── schema.prisma     # 16 modelosdocker-compose up -d       # Iniciar servicios

# Ollama requiere mínimo 4GB RAM

# Si es insuficiente, aumentar memoria en Docker Desktop: Settings → Resources → Memory│   ├── migrations/docker-compose down        # Detener servicios

```

│   └── seed.tsdocker ps                  # Ver contenedores activos

**Optimización:**

- Modelo gemma2:2b (1.6GB) es más rápido que phi3 (2.2GB)├── docker-compose.yml    # PostgreSQL + n8n + Ollamadocker logs n8n -f         # Ver logs de n8n

- Workflow 1: ~131 segundos es normal para generación completa

- Workflow 2: ~7 segundos es normal├── N8N_GUIDE.md          # 📖 Guía workflows n8ndocker logs ollama -f      # Ver logs de Ollama

- Workflow 3: ~4 segundos es normal

└── README.md             # 📖 Este archivo

---

```# Testing

## 📖 Documentación Adicional

npm run test               # Tests unitarios

| Archivo | Descripción |

|---------|-------------|---npm run test:e2e           # Tests end-to-end

| **`N8N_GUIDE.md`** | Guía completa de configuración de los 3 workflows n8n (paso a paso) |

| **Swagger UI** | Documentación interactiva de endpoints: http://localhost:3000/api |```

| **`prisma/schema.prisma`** | Definición completa de los 16 modelos de datos |

| **`.env.example`** | Template de variables de entorno necesarias |## 🔒 Seguridad



------



## 🤝 Contribuir- ✅ Passwords con bcrypt (10 rounds)



```bash- ✅ JWT autenticación## 📁 Estructura del Proyecto

# 1. Fork el proyecto

git clone https://github.com/tu-usuario/backend-EduPlay.git- ✅ Validación DTOs con class-validator



# 2. Crear rama de feature- ✅ CORS y Helmet configurados```

git checkout -b feature/nueva-funcionalidad

- ✅ Variables sensibles en `.env`backend-EduPlay/

# 3. Commit cambios

git commit -m "feat: descripción de la nueva funcionalidad"├── src/



# 4. Push a tu fork---│   ├── modules/          # 13 módulos funcionales

git push origin feature/nueva-funcionalidad

│   │   ├── ai/           # IA (3 endpoints)

# 5. Abrir Pull Request

```## 🐳 Docker Services│   │   ├── user/         # Users (5 endpoints)



**Convenciones:**│   │   ├── activity/     # Actividades (8 endpoints)

- `feat:` Nueva funcionalidad

- `fix:` Corrección de bug| Servicio | Puerto | Credenciales |│   │   ├── flashcard/    # Flashcards (6 endpoints)

- `docs:` Cambios en documentación

- `style:` Formateo de código|----------|--------|--------------|│   │   ├── classroom/    # Aulas (6 endpoints)

- `refactor:` Refactorización

- `test:` Agregar tests| **PostgreSQL** | 5432 | postgres/postgres |│   │   └── ...           # +8 módulos más



---| **n8n** | 5678 | admin/admin123 |│   ├── app/              # Módulo raíz



## 📝 Licencia| **Ollama** | 11434 | - |│   ├── main.ts           # Entry point



MIT License - Proyecto educativo **Hack4Edu 2025**│   └── prisma.service.ts # Prisma client



------├── prisma/



## 👥 Equipo│   ├── schema.prisma     # 16 modelos de datos



**Hack4Edu 2025** - Sistema EduPlay con IA Generativa## 🚨 Troubleshooting│   ├── migrations/       # Historial de migraciones



---│   └── seed.ts           # Datos de prueba



## 🆘 Soporte### Error: "Prisma Client not generated"├── docker-compose.yml    # PostgreSQL + n8n + Ollama



**¿Problemas o dudas?**```powershell├── N8N_GUIDE.md          # 📖 Guía completa de workflows n8n

- 📖 Ver guía n8n: `N8N_GUIDE.md`

- 🔍 Revisar Swagger: http://localhost:3000/apinpx prisma generate└── README.md             # 📖 Este archivo

- 🐛 Abrir issue en GitHub

``````

---



**¡Sistema completo con IA generativa lista para producción! 🚀📚🎮**

### Error: "Cannot connect to Ollama"---

```powershell

docker restart ollama## 🔒 Seguridad

docker exec -it ollama ollama pull gemma2:2b

```- ✅ Passwords hasheados con bcrypt (salt rounds: 10)

- ✅ JWT para autenticación stateless

### Error: "n8n workflow no responde"- ✅ Validación de DTOs con class-validator

1. Verificar workflow activo (toggle verde)- ✅ CORS configurado

2. `docker logs n8n -f`- ✅ Helmet para headers de seguridad

3. Verificar path webhook correcto- ✅ Variables sensibles en `.env`



### Performance lento**Producción:** Configurar JWT_SECRET, DATABASE_URL seguras

```powershell

docker stats  # Verificar RAM (mín 4GB para Ollama)---

```

## 🐳 Docker Services

---

```yaml

## 📖 Documentaciónservices:

  postgres_eduplay:  # Puerto 5432

- **`N8N_GUIDE.md`** - Guía completa workflows n8n (3 workflows paso a paso)  n8n:               # Puerto 5678 (admin/admin123)

- **Swagger UI** - http://localhost:3000/api  ollama:            # Puerto 11434 (gemma2:2b)

- **Prisma Schema** - `prisma/schema.prisma````



---**Volúmenes persistentes:** `./n8n_data`, `./ollama_data`



## 🤝 Contribuir---



```bash## 🚨 Troubleshooting

git checkout -b feature/nueva-funcionalidad

git commit -m "feat: descripción"### Error: "Prisma Client not generated"

git push origin feature/nueva-funcionalidad```powershell

```npx prisma generate

```

---

### Error: "Cannot connect to Ollama"

## 📝 Licencia```powershell

docker restart ollama

MIT License - Hack4Edu 2025docker exec -it ollama ollama pull gemma2:2b

```

---

### Error: "n8n workflow no responde"

**¿Problemas?** Ver `N8N_GUIDE.md` o abrir issue en GitHub1. Verificar workflow activo (toggle verde en n8n)

2. Ver logs: `docker logs n8n -f`

---3. Verificar path webhook correcto



**¡Sistema completo con IA generativa! 🚀📚🎮**### Performance lento

- Verificar RAM disponible: `docker stats`
- Ollama requiere mínimo 4GB RAM
- gemma2:2b es más rápido que phi3

---

## 📖 Documentación Adicional

- **`N8N_GUIDE.md`** - Guía completa de workflows n8n (3 workflows paso a paso)
- **Swagger UI** - http://localhost:3000/api (documentación interactiva)
- **Prisma Schema** - `prisma/schema.prisma` (modelos de datos)

---

## 🤝 Contribuir

```bash
git checkout -b feature/nueva-funcionalidad
git commit -m "feat: descripción del cambio"
git push origin feature/nueva-funcionalidad
```

---

## 📝 Licencia

MIT License - Proyecto educativo Hack4Edu 2025

---

## 👥 Equipo

**Hack4Edu 2025** - Sistema EduPlay con IA generativa

---

**¿Problemas?** Ver `N8N_GUIDE.md` o abrir un issue en GitHub
│  │ • eduplay  │ │ UI+API  │ │ AI Models │ │
│  │ • n8n (db) │ │Workflows│ │ (phi3)    │ │
│  └────────────┘ └─────────┘ └───────────┘ │
└──────────────────────────────────────────────┘

Flujo de Generación AI:
Backend → n8n webhook → Ollama (phi3) → Genera contenido → Guarda en DB
```

**Stack Tecnológico:**
- **Framework**: NestJS 11 + TypeScript 5
- **Base de datos**: PostgreSQL 15 + Prisma ORM 6.18
- **Auth**: JWT + Bcrypt
- **IA**: n8n (workflows) + Ollama (LLM local)
- **Docs**: Swagger/OpenAPI
- **Container**: Docker Compose

---

## 📦 Módulos y Endpoints

| Módulo | Endpoints | Descripción |
|--------|-----------|-------------|
| **Auth** | 1 | Login con JWT |
| **Course** | 5 | CRUD de cursos |
| **Classroom** | 5 | CRUD de aulas |
| **Activity** | 5 | CRUD de actividades (flashcards, quiz, juegos) |
| **Enrollment** | 4 | Inscripciones profesor-aula-curso |
| **Interaction** | 6 | Tracking de emociones, grades y engagement |
| **Student** | 7 | Perfil, actividades, historial |
| **Teacher** | 8 | Dashboard, estadísticas, identificación de riesgo |
| **🤖 AI** | 2 | **Generación de contenido con IA + Análisis de emociones** |
| **Flashcard** | 6 | CRUD de flashcards + por actividad |
| **CardsMemory** | 6 | CRUD de juego de memoria + por actividad |
| **PlayRelation** | 6 | CRUD de juego de relaciones + por actividad |
| **Quiz** | 6 | CRUD de quiz + por actividad |

**Total: 67 endpoints REST** (41 base + 26 AI/Content)

### Endpoints principales:

```bash
# Autenticación
POST   /auth/login              # Login con JWT

# Gestión básica
GET    /course                  # Listar cursos
GET    /classroom               # Listar aulas
GET    /activity                # Listar actividades

# Estudiante
GET    /student/:id/activities  # Actividades del estudiante

# Profesor
GET    /teacher/:id/dashboard   # Dashboard completo del profesor

# Analytics
GET    /interaction/activity/:id/statistics  # Estadísticas de actividad

# 🤖 IA - Generación de Contenido (NUEVO)
POST   /ai/generate-content/:activityId      # Generar todo con IA (min 3 de cada tipo)
POST   /ai/analyze-emotion                    # Analizar emoción del estudiante

# Contenido por Actividad (NUEVO - crítico para frontend)
GET    /flashcard/activity/:activityId        # Obtener flashcards
GET    /cards-memory/activity/:activityId     # Obtener pares de memoria
GET    /play-relation/activity/:activityId    # Obtener relaciones
GET    /quiz/activity/:activityId             # Obtener quiz completo
```

**Ver documentación completa:** http://localhost:3000/api

**Guía de workflows n8n:** `N8N_WORKFLOWS_GUIDE.md`

**Documentación de endpoints AI:** `NEW_ENDPOINTS.md`

---

## 🗄️ Base de Datos

### Modelos de Prisma (16 total)

**Usuarios y Roles:**
- `User` (STUDENT | TEACHER | ADMIN)
- `Student` - Perfil estudiante con risk_score
- `Teacher` - Perfil profesor con specialty

**Organización:**
- `Classroom` - Aulas con estudiantes
- `Course` - Cursos educativos
- `Enrollment` - Relación profesor-aula-curso

**Actividades:**
- `Activity` - Sesiones de aprendizaje
- `Flashcard` - Tarjetas de estudio
- `CardsMemory` - Juego de memoria
- `PlayRelation` - Juego de relacionar conceptos
- `ExtraMaterial` - Material adicional

**Evaluación:**
- `Quiz` - Exámenes
- `Question` / `QuestionOpen` / `QuestionAudio` - Tipos de preguntas

**Analytics:**
- `Interaction` - Emociones (POSITIVO | NEUTRAL | NEGATIVO), grades, engagement

Ver schema completo: `prisma/schema.prisma`

---

## 🤖 Sistema de IA (Generación de Contenido)

### Arquitectura AI

```
┌─────────────┐      POST      ┌──────────┐    Webhook    ┌─────────┐
│   Frontend  │ ─────────────> │  NestJS  │ ────────────> │   n8n   │
│             │  /ai/generate  │  AI Svc  │  localhost    │Workflow │
└─────────────┘                └──────────┘     :5678     └────┬────┘
                                     ▲                          │
                                     │                          │ Prompt
                                     │ Guarda DB                ▼
                                     │                    ┌──────────┐
                                     └────────────────────│  Ollama  │
                                       3+ items/tipo      │  (phi3)  │
                                                          └──────────┘
```

### Funcionalidades AI

**1. Generación Automática de Contenido:**
```typescript
POST /ai/generate-content/:activityId
Body: {
  "topic": "La Colonia en Perú",
  "context": "Periodo histórico 1532-1821",
  "minItems": 3  // Mínimo de elementos a generar por tipo
}
```

Genera automáticamente:
- ✅ Mínimo 3 Flashcards (pregunta/respuesta)
- ✅ Mínimo 3 CardsMemory (pares de conceptos)
- ✅ Mínimo 3 PlayRelation (relaciones lógicas)
- ✅ Mínimo 3 Preguntas de Quiz (múltiple opción)

**2. Análisis de Emociones:**
```typescript
POST /ai/analyze-emotion
Body: {
  "text": "Me gustó mucho, aprendí bastante",
  "grade": 8
}
```

Retorna:
- Emoción detectada (POSITIVO/NEUTRAL/NEGATIVO)
- Nivel de engagement (0-1)
- Análisis detallado del sentimiento

### Modo Fallback

Si n8n/Ollama no están disponibles, el sistema automáticamente:
- Genera contenido básico de plantilla
- Análisis de emoción basado en calificación
- Garantiza que la app funcione sin dependencias AI

### Configuración n8n

Ver guía completa: **`N8N_WORKFLOWS_GUIDE.md`**

**Quick Setup:**
1. Acceder a http://localhost:5678
2. Login: `admin` / `admin123`
3. Importar workflows desde la guía
4. Configurar webhooks en `/webhook/generate-content` y `/webhook/analyze-emotion`
5. Conectar con Ollama node (`http://ollama:11434`)

**Variables de entorno:**
```bash
N8N_WEBHOOK_URL=http://localhost:5678/webhook  # En .env
```

---

## 🔧 Comandos Disponibles

### Desarrollo
```bash
npm run start:dev        # Hot reload
npm run build            # Compilar
npm run start:prod       # Producción
```

### Base de Datos
```bash
npx prisma generate              # Generar Prisma Client
npx prisma migrate deploy        # Aplicar migraciones
npx prisma migrate dev --name X  # Nueva migración
npx prisma migrate reset         # Resetear DB
npm run seed                     # Poblar datos
npx prisma studio                # UI para ver datos (:5555)
```

### Docker
```bash
docker-compose up -d             # Levantar servicios
docker-compose down              # Detener servicios
docker-compose down -v           # Detener + eliminar volúmenes
docker-compose logs -f           # Ver logs en vivo
docker restart postgres_eduplay  # Reiniciar PostgreSQL
docker restart n8n               # Reiniciar n8n
docker restart ollama            # Reiniciar Ollama
```

### Testing
```bash
npm run test        # Tests unitarios
npm run test:e2e    # Tests end-to-end
npm run test:cov    # Coverage
```

### Ollama (IA)
```bash
docker exec -it ollama ollama pull phi3    # Descargar modelo
docker exec -it ollama ollama list         # Listar modelos
curl http://localhost:11434/api/tags       # Ver modelos (API)
```

---

## 🔑 Credenciales de Prueba

Después de ejecutar `npm run seed`:

**Profesor:**
- Email: `maria.garcia@eduplay.com`
- Password: `password123`

**Estudiantes:**
- Email: `jose.rodriguez@eduplay.com` | Password: `password123`
- Email: `ana.martinez@eduplay.com` | Password: `password123`

**n8n:**
- URL: http://localhost:5678
- Usuario: `admin` | Password: `admin123`

**PostgreSQL:**
- Host: `localhost:5432`
- Usuario: `postgres` | Password: `postgres`
- Databases: `eduplay`, `n8n`

---

## 🐳 Docker Services

### PostgreSQL (puerto 5432)
```yaml
Contenedor: postgres_eduplay
Credentials: postgres / postgres
Databases: eduplay, n8n
Volume: ./postgres_data
```

### n8n (puerto 5678)
```yaml
Contenedor: n8n
UI: http://localhost:5678
DB: PostgreSQL (database n8n)
Ollama URL: http://ollama:11434
```

### Ollama (puerto 11434)
```yaml
Contenedor: ollama
API: http://localhost:11434
Purpose: Local LLM for AI content generation
Volume: ./ollama_data
```

**Network:** `n8n_network` (comunicación interna entre servicios)

---

## 🤖 Integración con IA

### n8n Workflows
- **URL**: http://localhost:5678
- **Casos de uso**:
  - Generación automática de flashcards desde temas
  - Creación de preguntas de quiz con múltiples opciones
  - Análisis de sentimientos en respuestas
  - Generación de material educativo personalizado

### Ollama (LLM Local)
- **URL**: http://localhost:11434
- **Modelos recomendados**:
  - `phi3` - Rápido, 2.2GB
  - `mistral` - Más preciso, 4.1GB
  - `llama3.2` - Última versión

**Descargar modelo:**
```bash
docker exec -it ollama ollama pull phi3
```

---

## 🐛 Troubleshooting

### ❌ Error: "Module '@prisma/client' has no exported member 'Emotion'"

**Causa**: Prisma Client no se generó después de clonar el repo.

**Solución**:
```powershell
Remove-Item -Recurse -Force node_modules\.prisma
Remove-Item -Recurse -Force node_modules\@prisma\client
npx prisma generate
# Reiniciar TypeScript: Ctrl+Shift+P → "TypeScript: Restart TS Server"
```

> ⚠️ **Siempre ejecuta `npx prisma generate` después de clonar el repositorio**

### ❌ Error: "Port 5432 is already in use"

**Solución**:
```powershell
netstat -ano | findstr :5432  # Ver qué proceso usa el puerto
# Detener PostgreSQL local o cambiar puerto en docker-compose.yml
```

### ❌ Error: "Cannot connect to PostgreSQL"

**Solución**:
```powershell
docker logs postgres_eduplay     # Ver logs
docker restart postgres_eduplay  # Reiniciar
# Esperar 10 segundos y reintentar
```

### ❌ Error: "Database does not exist"

**Solución**:
```powershell
docker-compose down -v
Remove-Item -Recurse -Force ./postgres_data
docker-compose up -d
Start-Sleep -Seconds 15
npx prisma migrate deploy
```

### ❌ Ollama no responde

**Solución**:
```powershell
docker ps | findstr ollama              # Verificar que esté corriendo
docker exec -it ollama ollama list      # Ver modelos instalados
docker exec -it ollama ollama pull phi3 # Descargar modelo
```

### ❌ Error de dependencias / TypeScript

**Solución**:
```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
npx prisma generate
```

---

## 📁 Estructura del Proyecto

```
backend-EduPlay/
├── prisma/
│   ├── schema.prisma          # Modelo de datos (16 modelos)
│   ├── seed.ts                # Script de datos de prueba
│   └── migrations/            # Historial de migraciones
├── src/
│   ├── app/                   # Módulo principal
│   ├── modules/
│   │   ├── auth/              # JWT authentication
│   │   ├── course/            # Gestión de cursos
│   │   ├── classroom/         # Gestión de aulas
│   │   ├── activity/          # Actividades gamificadas
│   │   ├── enrollment/        # Inscripciones
│   │   ├── interaction/       # Tracking emociones
│   │   ├── student/           # Perfil estudiante
│   │   └── teacher/           # Dashboard profesor
│   ├── prisma.service.ts      # Servicio Prisma
│   └── main.ts                # Bootstrap app
├── docker-compose.yml         # PostgreSQL + n8n + Ollama
├── setup.ps1                  # Script de setup automático
├── .env.example               # Template de variables
├── PROJECT_STATUS.md          # Estado y roadmap
└── README.md                  # Esta documentación
```

---

## 🔒 Configuración (.env)

```env
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/eduplay?schema=public"

# Server
PORT=3000
NODE_ENV=development

# JWT
JWT_SECRET="eduplay_hackathon_secret_2025"
JWT_EXPIRES_IN="7d"

# n8n
N8N_WEBHOOK_URL="http://localhost:5678/webhook"

# Ollama
OLLAMA_URL="http://localhost:11434"
```

> ⚠️ En producción, usa un `JWT_SECRET` seguro aleatorio

---

## ✨ Características Destacadas

- ✅ **100% TypeScript** con tipado estricto
- ✅ **Swagger/OpenAPI** documentación automática
- ✅ **Prisma ORM** con migraciones versionadas
- ✅ **Docker Compose** desarrollo local sin configuración
- ✅ **JWT + Bcrypt** autenticación segura
- ✅ **Seed data** para testing inmediato
- ✅ **41 endpoints REST** totalmente funcionales
- ✅ **IA integrada** lista con n8n + Ollama
- ✅ **Dashboard analytics** con métricas en tiempo real
- ✅ **Tracking de emociones** POSITIVO/NEUTRAL/NEGATIVO
- ✅ **Identificación de riesgo** para estudiantes
- ✅ **Setup automatizado** con `setup.ps1`

---

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama: `git checkout -b feature/amazing-feature`
3. Commit: `git commit -m 'Add amazing feature'`
4. Push: `git push origin feature/amazing-feature`
5. Abre un Pull Request

---

## 📞 Soporte

- 📚 **Documentación adicional**: [PROJECT_STATUS.md](./PROJECT_STATUS.md)
- 🐛 **Issues**: [GitHub Issues](https://github.com/CarlitoUwU/backend-EduPlay/issues)
- 💬 **API Docs**: http://localhost:3000/api

---

## 📄 Licencia

Proyecto desarrollado para **Hack4Edu Hackathon**

---

**¡Listo para educar con gamificación e IA!** 🚀📚🎮
