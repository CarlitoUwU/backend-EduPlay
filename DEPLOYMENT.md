# 🚀 Guía de Despliegue - Backend EduPlay

Esta guía te ayudará a levantar el backend completo de EduPlay en cualquier máquina desde cero.

---

## 📋 Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

- ✅ **Node.js** v18+ ([Descargar](https://nodejs.org/))
- ✅ **Git** ([Descargar](https://git-scm.com/))
- ✅ **Docker Desktop** ([Descargar](https://www.docker.com/products/docker-desktop/))
- ✅ **npm** o **yarn** (viene con Node.js)

### Verificar instalaciones:
```powershell
node --version    # v18.0.0 o superior
npm --version     # 9.0.0 o superior
git --version     # 2.0.0 o superior
docker --version  # 20.0.0 o superior
```

---

## 🔧 Paso 1: Clonar el Repositorio

```powershell
# Clonar el repositorio
git clone https://github.com/CarlitoUwU/backend-EduPlay.git

# Entrar al directorio
cd backend-EduPlay

# Cambiar a la rama de desarrollo (si no estás en main)
git checkout feature/complete-backend-implementation
```

---

## 📝 Paso 2: Configurar Variables de Entorno

### Opción A: Copiar el archivo .env de ejemplo

Si el repositorio incluye un `.env.example`:
```powershell
# En PowerShell
Copy-Item .env.example .env

# En Linux/Mac
cp .env.example .env
```

### Opción B: Crear el archivo .env manualmente

Crea un archivo llamado `.env` en la raíz del proyecto con el siguiente contenido:

```env
# Base de datos
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/eduplay?schema=public"

# n8n Webhooks
N8N_WEBHOOK_URL="http://localhost:5678/webhook"

# Ollama (AI)
OLLAMA_URL="http://localhost:11434"

# Servidor
PORT=3000
NODE_ENV=development

# JWT
JWT_SECRET="eduplay_hackathon_secret_2025"
JWT_EXPIRES_IN="7d"
```

> ⚠️ **IMPORTANTE**: En producción, cambia `JWT_SECRET` por una clave segura aleatoria.

---

## 🐳 Paso 3: Levantar Servicios Docker

### 3.1 Verificar que Docker Desktop esté corriendo

```powershell
# Verificar que Docker esté activo
docker ps
```

Si aparece un error, inicia Docker Desktop manualmente.

### 3.2 Levantar los contenedores

```powershell
# Levantar PostgreSQL, n8n y Ollama
docker-compose up -d
```

Esto iniciará:
- **PostgreSQL** en puerto 5432
- **n8n** en puerto 5678
- **Ollama** en puerto 11434

### 3.3 Verificar que los contenedores estén corriendo

```powershell
docker ps
```

Deberías ver 3 contenedores activos:
- `postgres_eduplay`
- `n8n`
- `ollama`

### 3.4 Verificar logs (opcional)

```powershell
# Ver logs de todos los servicios
docker-compose logs -f

# O de un servicio específico
docker-compose logs -f postgres
```

---

## 📦 Paso 4: Instalar Dependencias de Node.js

```powershell
# Instalar todas las dependencias
npm install

# O si usas yarn
yarn install
```

Esto instalará:
- NestJS y sus módulos
- Prisma ORM
- JWT, bcrypt
- Todas las dependencias del proyecto

---

## 🗄️ Paso 5: Configurar la Base de Datos

### 5.1 Verificar que las bases de datos existan

```powershell
# Listar bases de datos
docker exec -it postgres_eduplay psql -U postgres -c "\l"
```

Deberías ver:
- ✅ `eduplay` - Base de datos del backend
- ✅ `n8n` - Base de datos para n8n

> 💡 Si las bases de datos NO existen, el script `init-db.sh` debería haberlas creado automáticamente. Si no, ejecuta:
> ```powershell
> docker exec -it postgres_eduplay psql -U postgres -c "CREATE DATABASE eduplay;"
> docker exec -it postgres_eduplay psql -U postgres -c "CREATE DATABASE n8n;"
> ```

### 5.2 Aplicar migraciones de Prisma

```powershell
# Aplicar todas las migraciones
npx prisma migrate deploy

# O si prefieres resetear desde cero
npx prisma migrate reset
```

### 5.3 Generar Prisma Client

```powershell
# Generar el cliente de Prisma
npx prisma generate
```

### 5.4 Poblar la base de datos con datos de prueba

```powershell
# Ejecutar el seed script
npm run seed
```

Esto creará:
- 3 usuarios (1 profesor, 2 estudiantes)
- 4 cursos
- 1 aula con estudiantes
- 1 actividad con contenido (flashcards, juegos, quiz)
- Datos de interacciones

---

## 🤖 Paso 6: Configurar Ollama (Opcional pero Recomendado)

### 6.1 Descargar un modelo de IA

```powershell
# Descargar modelo phi3 (ligero, ~2.2GB)
docker exec -it ollama ollama pull phi3

# O descargar modelo mistral (más potente, ~4GB)
docker exec -it ollama ollama pull mistral

# O descargar llama3.2 (muy potente, ~2GB)
docker exec -it ollama ollama pull llama3.2
```

### 6.2 Verificar modelos instalados

```powershell
docker exec -it ollama ollama list
```

### 6.3 Probar Ollama

```powershell
# Test rápido
curl http://localhost:11434/api/tags
```

---

## 🚀 Paso 7: Iniciar el Backend

### Modo desarrollo (con hot reload)

```powershell
npm run start:dev
```

### Modo producción

```powershell
# Compilar
npm run build

# Ejecutar
npm run start:prod
```

El servidor iniciará en **http://localhost:3000**

---

## ✅ Paso 8: Verificar que Todo Funcione

### 8.1 Verificar el servidor

```powershell
# Test simple
curl http://localhost:3000

# Ver todos los endpoints en Swagger
# Abrir en navegador: http://localhost:3000/api/docs
```

### 8.2 Verificar n8n

Abrir en navegador: **http://localhost:5678**

Credenciales:
- Usuario: `admin`
- Password: `admin123`

### 8.3 Probar un endpoint

```powershell
# Login
curl -X POST http://localhost:3000/auth/login `
  -H "Content-Type: application/json" `
  -d '{\"email\": \"maria.garcia@eduplay.com\", \"password\": \"password123\"}'
```

---

## 📊 Credenciales de Prueba

Una vez que ejecutes el seed, tendrás estas cuentas disponibles:

### Profesor:
- **Email**: `maria.garcia@eduplay.com`
- **Password**: `password123`
- **Rol**: TEACHER

### Estudiantes:
1. **Email**: `jose.rodriguez@eduplay.com` | **Password**: `password123`
2. **Email**: `ana.martinez@eduplay.com` | **Password**: `password123`

---

## 🔄 Comandos Útiles

### Gestión de Docker

```powershell
# Detener todos los servicios
docker-compose down

# Detener y eliminar volúmenes (CUIDADO: elimina datos)
docker-compose down -v

# Reiniciar un servicio específico
docker restart postgres_eduplay
docker restart n8n
docker restart ollama

# Ver logs en tiempo real
docker-compose logs -f
```

### Gestión de Base de Datos

```powershell
# Conectarse a PostgreSQL
docker exec -it postgres_eduplay psql -U postgres -d eduplay

# Resetear base de datos
npx prisma migrate reset

# Crear nueva migración
npx prisma migrate dev --name nombre_migracion

# Ver estado de migraciones
npx prisma migrate status
```

### Prisma Studio (UI para ver datos)

```powershell
# Abrir Prisma Studio
npx prisma studio
```

Se abrirá en **http://localhost:5555**

---

## 🐛 Troubleshooting

### Error: "Port 5432 is already in use"

**Problema**: Otro servicio está usando el puerto de PostgreSQL.

**Solución**:
```powershell
# Ver qué proceso usa el puerto
netstat -ano | findstr :5432

# Detener PostgreSQL local si existe
# O cambiar el puerto en docker-compose.yml
```

### Error: "Cannot connect to PostgreSQL"

**Problema**: PostgreSQL no está corriendo o no está listo.

**Solución**:
```powershell
# Ver logs de PostgreSQL
docker logs postgres_eduplay

# Reiniciar el contenedor
docker restart postgres_eduplay

# Esperar 10 segundos y reintentar
```

### Error: "Prisma Client not found"

**Problema**: El cliente de Prisma no está generado.

**Solución**:
```powershell
# Regenerar Prisma Client
npx prisma generate
```

### Error: "Database does not exist"

**Problema**: Las bases de datos no se crearon automáticamente.

**Solución**:
```powershell
# Detener servicios
docker-compose down -v

# Eliminar datos antiguos
Remove-Item -Recurse -Force ./postgres_data

# Volver a levantar
docker-compose up -d

# Esperar 10 segundos
Start-Sleep -Seconds 10

# Aplicar migraciones
npx prisma migrate deploy
```

### Error: "Module not found" o errores de TypeScript

**Problema**: Dependencias no instaladas o desactualizadas.

**Solución**:
```powershell
# Eliminar node_modules y reinstalar
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install

# Regenerar Prisma Client
npx prisma generate
```

### Error: Ollama no responde

**Problema**: Ollama no tiene modelos descargados.

**Solución**:
```powershell
# Verificar que Ollama esté corriendo
docker ps | findstr ollama

# Descargar un modelo
docker exec -it ollama ollama pull phi3

# Verificar modelos
docker exec -it ollama ollama list
```

---

## 🏗️ Arquitectura de Servicios

```
┌─────────────────────────────────────────────────────┐
│                   LOCALHOST                         │
│                                                     │
│  ┌───────────────┐  ┌──────────────┐              │
│  │   Backend     │  │   Swagger    │              │
│  │   NestJS      │  │   Docs       │              │
│  │   :3000       │  │ :3000/api    │              │
│  └───────┬───────┘  └──────────────┘              │
│          │                                          │
│          ▼                                          │
│  ┌─────────────────────────────────────────┐      │
│  │        Docker Network (n8n_network)     │      │
│  │                                         │      │
│  │  ┌──────────┐  ┌──────┐  ┌─────────┐  │      │
│  │  │PostgreSQL│  │ n8n  │  │ Ollama  │  │      │
│  │  │  :5432   │  │:5678 │  │ :11434  │  │      │
│  │  │          │  │      │  │         │  │      │
│  │  │ DB:      │  │ UI + │  │   AI    │  │      │
│  │  │ eduplay  │  │ API  │  │ Models  │  │      │
│  │  │ n8n      │  │      │  │         │  │      │
│  │  └──────────┘  └──────┘  └─────────┘  │      │
│  └─────────────────────────────────────────┘      │
└─────────────────────────────────────────────────────┘
```

---

## 📚 URLs de Acceso

| Servicio | URL | Descripción |
|----------|-----|-------------|
| **Backend API** | http://localhost:3000 | API REST principal |
| **Swagger Docs** | http://localhost:3000/api/docs | Documentación interactiva |
| **n8n UI** | http://localhost:5678 | Workflows de automatización |
| **Ollama API** | http://localhost:11434 | Motor de IA local |
| **Prisma Studio** | http://localhost:5555 | UI para base de datos |

---

## 🎯 Checklist de Despliegue

Usa este checklist para asegurarte de que todo esté configurado:

- [ ] Node.js v18+ instalado
- [ ] Docker Desktop instalado y corriendo
- [ ] Repositorio clonado
- [ ] Archivo `.env` configurado
- [ ] Dependencias instaladas (`npm install`)
- [ ] Docker containers corriendo (`docker ps` muestra 3 contenedores)
- [ ] Bases de datos creadas (eduplay y n8n)
- [ ] Migraciones aplicadas (`npx prisma migrate deploy`)
- [ ] Seed ejecutado (`npm run seed`)
- [ ] Modelo de Ollama descargado (opcional)
- [ ] Backend corriendo (`npm run start:dev`)
- [ ] Swagger accesible en http://localhost:3000/api/docs
- [ ] n8n accesible en http://localhost:5678

---

## 🔐 Seguridad en Producción

Si vas a desplegar en un servidor público, considera:

1. **Cambiar credenciales**:
   - Cambiar `JWT_SECRET` a una clave aleatoria segura
   - Cambiar passwords de PostgreSQL
   - Cambiar credenciales de n8n
   - Usar variables de entorno del sistema

2. **Configurar HTTPS**:
   - Usar un proxy reverso (Nginx, Caddy)
   - Obtener certificados SSL (Let's Encrypt)

3. **Configurar firewall**:
   - Cerrar puertos innecesarios
   - Permitir solo 80/443 desde internet
   - Restrictor acceso a PostgreSQL solo a localhost

4. **Backup de base de datos**:
   ```powershell
   docker exec postgres_eduplay pg_dump -U postgres eduplay > backup.sql
   ```

---

## 📞 Soporte

Si encuentras problemas:

1. Revisa la sección de **Troubleshooting** arriba
2. Verifica los logs: `docker-compose logs -f`
3. Consulta la documentación adicional:
   - `DOCKER_SETUP.md` - Configuración detallada de Docker
   - `TESTING_GUIDE.md` - Guía de testing
   - `PROJECT_STATUS.md` - Estado del proyecto

---

## ✅ ¡Listo!

Si completaste todos los pasos, tu backend EduPlay debería estar funcionando correctamente. 

**Prueba tu primer request:**
```powershell
curl http://localhost:3000/course
```

¡Feliz desarrollo! 🚀
