# 🎮 EduPlay Backend

Backend de la plataforma educativa gamificada **EduPlay** - Sistema de gestión de actividades educativas con integración de IA para personalización y análisis de emociones.

[![NestJS](https://img.shields.io/badge/NestJS-11.0.1-E0234E?logo=nestjs)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.18.0-2D3748?logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791?logo=postgresql)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker)](https://www.docker.com/)

---

## 📋 Descripción

**EduPlay** es una plataforma educativa que combina gamificación con inteligencia artificial para crear experiencias de aprendizaje personalizadas.

**Características principales:**
- 🔐 Autenticación JWT + Bcrypt
- 👥 Gestión de profesores, estudiantes y aulas
- 🎮 Actividades gamificadas (flashcards, memoria, quiz)
- 💭 Tracking de emociones y engagement
- 📊 Dashboard analytics para profesores
- 🤖 **IA integrada (n8n + Ollama)** para generación automática de contenido
- 🎯 **Generación AI** de flashcards, juegos y quiz por tema
- 📚 API REST con documentación Swagger/OpenAPI
- 🐳 Stack completo con Docker Compose

**67 endpoints REST** implementados | **16 modelos de datos** | **13 módulos funcionales**

---

## 🚀 Quick Start

### Prerrequisitos

```bash
node --version    # v18.0.0+
docker --version  # 20.0.0+
git --version     # 2.0.0+
```

### Opción A: Setup Automatizado (Recomendado) ⚡

```powershell
git clone https://github.com/CarlitoUwU/backend-EduPlay.git
cd backend-EduPlay
.\setup.ps1
npm run start:dev
```

✅ **¡Listo!** El script configura todo automáticamente.

### Opción B: Setup Manual

```bash
# 1. Clonar y configurar
git clone https://github.com/CarlitoUwU/backend-EduPlay.git
cd backend-EduPlay
cp .env.example .env

# 2. Docker
docker-compose up -d

# 3. Dependencias y Prisma
npm install
npx prisma generate  # ⚠️ CRÍTICO - Hacer antes de migrations
npx prisma migrate deploy

# 4. Seed y ejecutar
npm run seed
npm run start:dev
```

### Acceder a los servicios:

| Servicio | URL | Credenciales |
|----------|-----|--------------|
| **Backend API** | http://localhost:3000 | - |
| **Swagger Docs** | http://localhost:3000/api | - |
| **n8n UI** | http://localhost:5678 | admin / admin123 |
| **Prisma Studio** | http://localhost:5555 | `npx prisma studio` |

---

## 🏗️ Arquitectura

```
┌──────────────────────────────────────────────┐
│         Backend NestJS :3000                 │
│  67 Endpoints | 13 Módulos | Swagger Docs   │
│  🤖 AI Integration (Ollama + n8n)           │
└──────────┬───────────────────────────────────┘
           │
           ▼
┌──────────────────────────────────────────────┐
│      Docker Network (n8n_network)            │
│                                              │
│  ┌────────────┐ ┌─────────┐ ┌───────────┐ │
│  │PostgreSQL  │ │  n8n    │ │  Ollama   │ │
│  │   :5432    │ │ :5678   │ │  :11434   │ │
│  │            │ │         │ │           │ │
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
