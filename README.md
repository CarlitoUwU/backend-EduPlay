# 🎮 EduPlay Backend

Backend de la plataforma educativa gamificada **EduPlay** - Sistema de gestión de actividades educativas con integración de IA para personalización y análisis de emociones.

[![NestJS](https://img.shields.io/badge/NestJS-11.0.1-E0234E?logo=nestjs)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.18.0-2D3748?logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791?logo=postgresql)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker)](https://www.docker.com/)

---
0
## 📋 Descripción

**EduPlay** es una plataforma educativa que combina gamificación con inteligencia artificial para crear experiencias de aprendizaje personalizadas. El backend proporciona:

- 🔐 Sistema de autenticación con JWT
- 👨‍🏫 Gestión de profesores y estudiantes
- 🏫 Administración de aulas y cursos
- 🎮 Actividades interactivas (flashcards, juegos de memoria, quiz)
- 💭 Tracking de emociones y engagement
- 📊 Dashboard con analytics para profesores
- 🤖 Integración con IA (n8n + Ollama) para generación de contenido
- 📚 API REST completa con Swagger/OpenAPI

---

## 🚀 Quick Start

### Prerrequisitos
- Node.js v18+
- Docker Desktop
- Git

### Opción A: Setup Automatizado (Recomendado)

```powershell
# 1. Clonar repositorio
git clone https://github.com/CarlitoUwU/backend-EduPlay.git
cd backend-EduPlay

# 2. Ejecutar script de setup automático
.\setup.ps1

# 3. Iniciar servidor
npm run start:dev
```

### Opción B: Setup Manual

```bash
# 1. Clonar repositorio
git clone https://github.com/CarlitoUwU/backend-EduPlay.git
cd backend-EduPlay

# 2. Configurar variables de entorno
cp .env.example .env

# 3. Levantar servicios Docker
docker-compose up -d

# 4. Instalar dependencias
npm install

# 5. Generar Prisma Client (CRÍTICO)
npx prisma generate

# 6. Aplicar migraciones
npx prisma migrate deploy

# 7. Poblar base de datos
npm run seed

# 8. Iniciar servidor
npm run start:dev
```

✅ **Backend corriendo en**: http://localhost:3000  
📚 **Swagger UI**: http://localhost:3000/api/docs

> ⚠️ **IMPORTANTE**: Siempre ejecuta `npx prisma generate` después de clonar el repositorio o cambiar el schema, ANTES de ejecutar migraciones o seed.

---

## 📖 Documentación Completa

📘 **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Guía paso a paso para desplegar en cualquier PC  
🐳 **[DOCKER_SETUP.md](./DOCKER_SETUP.md)** - Configuración detallada de Docker services  
🧪 **[TESTING_GUIDE.md](./TESTING_GUIDE.md)** - Guía de testing de endpoints  
📊 **[PROJECT_STATUS.md](./PROJECT_STATUS.md)** - Estado del proyecto y roadmap

---

## 🏗️ Arquitectura

### Stack Tecnológico

| Categoría | Tecnología |
|-----------|------------|
| **Framework** | NestJS 11 |
| **Lenguaje** | TypeScript 5 |
| **Base de Datos** | PostgreSQL 15 |
| **ORM** | Prisma 6.18 |
| **Autenticación** | JWT + Bcrypt |
| **Documentación** | Swagger/OpenAPI |
| **Workflows IA** | n8n |
| **IA Local** | Ollama (phi3/mistral) |
| **Containerización** | Docker Compose |

### Diagrama de Servicios

```
┌─────────────────────────────────────────────────┐
│                  Backend NestJS                 │
│                  localhost:3000                 │
│                                                 │
│  Modules: Auth, Course, Classroom, Activity,   │
│  Enrollment, Interaction, Student, Teacher     │
└──────────┬──────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────┐
│           Docker Network (n8n_network)          │
│                                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────────┐│
│  │PostgreSQL│  │   n8n    │  │   Ollama     ││
│  │  :5432   │  │  :5678   │  │   :11434     ││
│  │          │  │          │  │              ││
│  │ eduplay  │  │ Workflows│  │  AI Models   ││
│  │ n8n (db) │  │ UI + API │  │  (phi3/etc)  ││
│  └──────────┘  └──────────┘  └──────────────┘│
└─────────────────────────────────────────────────┘
```

---

## 📦 Módulos Implementados

### 🔐 Auth Module
**Endpoints**: 1  
Autenticación con JWT, login, manejo de tokens.

### 📚 Course Module
**Endpoints**: 5 (CRUD completo)  
Gestión de cursos educativos.

### 🏫 Classroom Module
**Endpoints**: 5 (CRUD completo)  
Administración de aulas y asignación de estudiantes.

### 🎮 Activity Module
**Endpoints**: 5 (CRUD completo)  
Actividades con flashcards, juegos de memoria, relaciones y quiz.

### 📝 Enrollment Module
**Endpoints**: 4  
Relación entre profesores, aulas y cursos.

### 💭 Interaction Module
**Endpoints**: 6  
Tracking de emociones, calificaciones y engagement de estudiantes.

### 👨‍🎓 Student Module
**Endpoints**: 7  
Perfil de estudiante, actividades disponibles, historial.

### 👨‍🏫 Teacher Module
**Endpoints**: 8  
Dashboard con estadísticas, identificación de riesgo, métricas por aula.

**Total**: **41 endpoints REST**

---

## 🗄️ Modelo de Datos

El schema de Prisma incluye 16 modelos:

- `User` (con roles: STUDENT, TEACHER, ADMIN)
- `Student` / `Teacher`
- `Classroom` / `Course` / `Enrollment`
- `Activity` (sesiones de aprendizaje)
- `Flashcard` / `CardsMemory` / `PlayRelation`
- `Quiz` / `Question` / `QuestionOpen` / `QuestionAudio`
- `ExtraMaterial`
- `Interaction` (con emociones: POSITIVO, NEUTRAL, NEGATIVO)

Ver `prisma/schema.prisma` para detalles completos.

---

## 🔧 Comandos Disponibles

### Desarrollo

```bash
# Modo desarrollo con hot reload
npm run start:dev

# Compilar proyecto
npm run build

# Modo producción
npm run start:prod
```

### Base de Datos

```bash
# Aplicar migraciones
npx prisma migrate deploy

# Crear nueva migración
npx prisma migrate dev --name nombre_migracion

# Poblar datos de prueba
npm run seed

# Abrir Prisma Studio (UI)
npx prisma studio
```

### Docker

```bash
# Levantar servicios
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener servicios
docker-compose down

# Resetear todo (⚠️ elimina datos)
docker-compose down -v
```

### Testing

```bash
# Tests unitarios
npm run test

# Tests e2e
npm run test:e2e

# Coverage
npm run test:cov
```

---

## 🔑 Credenciales de Prueba

Después de ejecutar `npm run seed`:

### Profesor
- **Email**: maria.garcia@eduplay.com
- **Password**: password123

### Estudiantes
- **Email**: jose.rodriguez@eduplay.com | **Password**: password123
- **Email**: ana.martinez@eduplay.com | **Password**: password123

### n8n UI
- **URL**: http://localhost:5678
- **Usuario**: admin
- **Password**: admin123

---

## 📊 APIs Disponibles

### Core Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `POST` | `/auth/login` | Login con JWT |
| `GET` | `/course` | Listar cursos |
| `GET` | `/classroom` | Listar aulas |
| `GET` | `/activity` | Listar actividades |
| `GET` | `/student/:id/activities` | Actividades de estudiante |
| `GET` | `/teacher/:id/dashboard` | Dashboard del profesor |
| `GET` | `/interaction/activity/:id/statistics` | Estadísticas de actividad |

Ver documentación completa en: **http://localhost:3000/api/docs**

---

## 🤖 Integración con IA

### n8n Workflows
URL: http://localhost:5678

Casos de uso:
- Generación automática de flashcards
- Creación de preguntas de quiz
- Análisis de sentimientos
- Generación de material educativo

### Ollama (Local AI)
URL: http://localhost:11434

```bash
# Descargar modelo
docker exec -it ollama ollama pull phi3

# Listar modelos
docker exec -it ollama ollama list
```

---

## 🐛 Troubleshooting

### Puerto en uso
```bash
# Verificar qué usa el puerto
netstat -ano | findstr :3000
netstat -ano | findstr :5432
```

### Database no existe
```bash
# Resetear Docker
docker-compose down -v
Remove-Item -Recurse -Force ./postgres_data
docker-compose up -d
npx prisma migrate deploy
```

### Errores de Prisma
```bash
# Regenerar cliente
npx prisma generate

# Resetear DB
npx prisma migrate reset
```

Ver más en [DEPLOYMENT.md](./DEPLOYMENT.md#-troubleshooting)

---

## 📁 Estructura del Proyecto

```
backend-EduPlay/
├── prisma/
│   ├── schema.prisma          # Modelo de datos
│   ├── seed.ts                # Script de seed
│   └── migrations/            # Historial de migraciones
├── src/
│   ├── app/                   # Módulo principal
│   ├── modules/
│   │   ├── auth/              # Autenticación JWT
│   │   ├── course/            # Gestión de cursos
│   │   ├── classroom/         # Gestión de aulas
│   │   ├── activity/          # Actividades gamificadas
│   │   ├── enrollment/        # Inscripciones
│   │   ├── interaction/       # Tracking de emociones
│   │   ├── student/           # Perfil de estudiante
│   │   └── teacher/           # Dashboard profesor
│   ├── prisma.service.ts      # Servicio Prisma
│   └── main.ts                # Bootstrap
├── docker-compose.yml         # Servicios Docker
├── .env.example               # Variables de entorno ejemplo
├── DEPLOYMENT.md              # Guía de despliegue
├── DOCKER_SETUP.md            # Configuración Docker
└── README.md                  # Este archivo
```

---

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/amazing-feature`)
3. Commit tus cambios (`git commit -m 'Add amazing feature'`)
4. Push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto es parte de un hackathon educativo.

---

## 🌟 Equipo

Desarrollado con ❤️ para **Hack4Edu**

---

## 📞 Soporte

- 📚 Documentación: Ver archivos `.md` en el repo
- 🐛 Issues: [GitHub Issues](https://github.com/CarlitoUwU/backend-EduPlay/issues)
- 💬 Swagger UI: http://localhost:3000/api/docs

---

## ✨ Características Destacadas

- ✅ **100% TypeScript** con tipado estricto
- ✅ **Swagger/OpenAPI** documentación automática
- ✅ **Prisma ORM** con migraciones versionadas
- ✅ **Docker Compose** para desarrollo local
- ✅ **JWT Authentication** seguro con bcrypt
- ✅ **Seed data** para testing rápido
- ✅ **41 endpoints REST** completamente funcionales
- ✅ **Integración IA** lista con n8n + Ollama
- ✅ **Dashboard analytics** para profesores
- ✅ **Tracking de emociones** en tiempo real

---

**¡Listo para educar con gamificación e IA!** 🚀📚🎮
