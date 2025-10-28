# 🎮 EduPlay Backend

Plataforma educativa gamificada con **IA integrada** para personalización de contenido y análisis emocional en tiempo real.

[![NestJS](https://img.shields.io/badge/NestJS-11.0.1-E0234E?logo=nestjs)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.18.0-2D3748?logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791?logo=postgresql)](https://www.postgresql.org/)

---

## 📋 Descripción

Sistema backend para plataforma educativa que combina gamificación con inteligencia artificial:

- 🤖 **IA Generativa (Ollama + gemma2:2b)**: Genera automáticamente flashcards, juegos y quiz
- 💭 **Análisis Emocional**: Detecta emoción y engagement del estudiante en tiempo real
- 💬 **Chatbot Motivador**: Asistente conversacional para guiar actividades
- 🎮 **Gamificación**: 4 tipos de juegos educativos interactivos
- 📊 **Analytics**: Dashboard con métricas de aprendizaje

**Stack:** NestJS 11 + PostgreSQL 15 + Prisma ORM + n8n + Ollama (gemma2:2b)  
**API:** 72 endpoints REST documentados con Swagger

---

## 🚀 Instalación Rápida

### Prerrequisitos

- Node.js 18+
- Docker y Docker Compose
- Git

### Paso 1: Clonar y Configurar

```bash
git clone https://github.com/CarlitoUwU/backend-EduPlay.git
cd backend-EduPlay
cp .env.example .env
```

### Paso 2: Iniciar Servicios Docker

```bash
docker-compose up -d
```

Esto inicia: PostgreSQL (5432), n8n (5678), Ollama (11434)

### Paso 3: Configurar Backend

```bash
npm install
npx prisma generate
npx prisma migrate deploy
npm run seed
```

### Paso 4: Descargar Modelo de IA

```bash
docker exec -it ollama ollama pull gemma2:2b
```

### Paso 5: Importar Workflows n8n

1. Acceder a http://localhost:5678 (admin/admin123)
2. **Workflows** → **Import from File** → `n8n-workflows/all-workflows.json`
3. **Activar** los 3 workflows (toggle verde)

📖 Guía detallada: [n8n-workflows/README.md](./n8n-workflows/README.md)

### Paso 6: Iniciar Backend

```bash
npm run start:dev
```

### ✅ Verificar Instalación

- 📚 **API**: http://localhost:3000
- 📖 **Swagger**: http://localhost:3000/api/docs
- 🤖 **n8n**: http://localhost:5678
- 🧠 **Ollama**: http://localhost:11434

---

## 🏗️ Arquitectura

```
Frontend (React/Vue)
        │
        ▼ HTTP REST
Backend API (NestJS)
    │         │
    ▼         ▼
PostgreSQL   n8n + Ollama
+ Prisma     (IA)
```

### Flujo de IA

1. Profesor crea actividad → Backend
2. Backend invoca n8n → Workflow
3. n8n llama Ollama → gemma2:2b (1.6GB)
4. IA genera contenido → Flashcards/Juegos/Quiz
5. Backend guarda en PostgreSQL
6. Estudiante interactúa → Análisis emocional

### Workflows n8n

| Workflow | Función | Tiempo |
|----------|---------|--------|
| Generate Content | Crear contenido gamificado | ~131 seg |
| Analyze Emotion | Detectar emoción/engagement | ~7 seg |
| Chat | Respuestas motivadoras | ~4 seg |

📖 Configuración: [N8N_GUIDE.md](./N8N_GUIDE.md)

---

## 📁 Estructura

```
backend-EduPlay/
├── src/modules/          # 13 módulos (72 endpoints)
│   ├── ai/               # 3 endpoints IA
│   ├── activity/         # 8 endpoints
│   ├── flashcard/        # 6 endpoints
│   └── ... (10 más)
├── prisma/schema.prisma  # 16 modelos
├── n8n-workflows/        # Workflows exportados
├── docs/                 # Documentación detallada
└── docker-compose.yml
```

---

## 📚 Documentación

| Archivo | Contenido |
|---------|-----------|
| [docs/API.md](./docs/API.md) | 72 endpoints REST |
| [docs/COMMANDS.md](./docs/COMMANDS.md) | Comandos útiles |
| [docs/TROUBLESHOOTING.md](./docs/TROUBLESHOOTING.md) | Solución de problemas |
| [N8N_GUIDE.md](./N8N_GUIDE.md) | Workflows n8n paso a paso |

---

## 🔐 Autenticación

JWT con 3 roles: `STUDENT`, `TEACHER`, `ADMIN`

```typescript
POST /auth/register  // Registrar
POST /auth/login     // Login (JWT)
GET  /auth/profile   // Perfil
```

---

## 📖 Recursos

- **Swagger:** http://localhost:3000/api/docs
- **GitHub:** https://github.com/CarlitoUwU/backend-EduPlay
- **n8n:** http://localhost:5678
- **Prisma Studio:** `npx prisma studio`

---

**🎮 EduPlay** - Educación gamificada con IA