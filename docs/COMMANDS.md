# 🛠️ Comandos Útiles - EduPlay Backend

Referencia rápida de comandos para desarrollo, testing y administración.

---

## 📦 NPM Scripts

### Desarrollo
```powershell
npm run start:dev          # Iniciar en modo desarrollo con hot-reload
npm run start:debug        # Modo desarrollo con debugging
npm run build              # Compilar TypeScript a JavaScript
npm run start:prod         # Ejecutar versión de producción
```

### Testing
```powershell
npm run test               # Tests unitarios
npm run test:watch         # Tests en modo watch
npm run test:cov           # Tests con cobertura
npm run test:e2e           # Tests end-to-end
```

### Linting y Formato
```powershell
npm run lint               # Ejecutar ESLint
npm run format             # Formatear código con Prettier
```

---

## 🗃️ Prisma ORM

### Generación y Migraciones
```powershell
# Generar cliente Prisma (después de cambios en schema)
npx prisma generate

# Crear migración en desarrollo
npx prisma migrate dev --name nombre_migracion

# Aplicar migraciones en producción
npx prisma migrate deploy

# Resetear base de datos (¡CUIDADO! Elimina todos los datos)
npx prisma migrate reset

# Ver estado de migraciones
npx prisma migrate status
```

### GUI y Utilidades
```powershell
# Abrir Prisma Studio (GUI para explorar DB)
npx prisma studio

# Formatear schema.prisma
npx prisma format

# Validar schema.prisma
npx prisma validate
```

### Seed Data
```powershell
# Cargar datos de prueba
npm run seed

# O directamente:
npx prisma db seed
```

---

## 🐳 Docker & Docker Compose

### Gestión de Servicios
```powershell
# Iniciar todos los servicios (postgres, n8n, ollama)
docker-compose up -d

# Ver logs en tiempo real
docker-compose logs -f

# Ver logs de un servicio específico
docker-compose logs -f postgres_eduplay
docker-compose logs -f n8n
docker-compose logs -f ollama

# Detener servicios
docker-compose down

# Detener y eliminar volúmenes (¡CUIDADO! Elimina datos)
docker-compose down -v

# Reiniciar un servicio específico
docker-compose restart n8n
docker-compose restart ollama
docker-compose restart postgres_eduplay
```

### Inspección
```powershell
# Ver servicios corriendo
docker ps

# Ver todos los contenedores (incluyendo detenidos)
docker ps -a

# Ver uso de recursos
docker stats

# Inspeccionar un contenedor
docker inspect n8n
docker inspect ollama
```

### Limpieza
```powershell
# Eliminar contenedores detenidos
docker container prune

# Eliminar imágenes no usadas
docker image prune

# Eliminar volúmenes no usados
docker volume prune

# Limpieza completa del sistema
docker system prune -a --volumes
```

---

## 🧠 Ollama (IA)

### Gestión de Modelos
```powershell
# Listar modelos instalados
docker exec ollama ollama list

# Descargar modelo
docker exec -it ollama ollama pull gemma2:2b
docker exec -it ollama ollama pull phi3

# Eliminar modelo
docker exec ollama ollama rm phi3

# Ver información del modelo
docker exec ollama ollama show gemma2:2b
```

### Testing Directo
```powershell
# Probar modelo interactivamente
docker exec -it ollama ollama run gemma2:2b

# Test con curl
curl http://localhost:11434/api/tags

# Generar texto con API
curl -X POST http://localhost:11434/api/generate `
  -H "Content-Type: application/json" `
  -d '{
    "model": "gemma2:2b",
    "prompt": "Explica la fotosíntesis",
    "stream": false
  }'
```

---

## 🤖 n8n Workflows

### Gestión
```powershell
# Acceder a n8n UI
Start-Process http://localhost:5678
# Credenciales: admin / admin123

# Ver logs de n8n
docker logs n8n -f

# Reiniciar n8n
docker restart n8n
```

### Exportar/Importar Workflows
```powershell
# Exportar todos los workflows
docker exec n8n n8n export:workflow --all --output=/home/node/.n8n/workflows-backup.json

# Copiar al proyecto
docker cp n8n:/home/node/.n8n/workflows-backup.json ./n8n-workflows/all-workflows.json

# Importar workflows (desde UI)
# http://localhost:5678 → Import from File → Seleccionar JSON
```

### Test de Webhooks
```powershell
# Test Workflow 1: Generate Content
Invoke-RestMethod -Uri "http://localhost:5678/webhook/generate-content" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"topic":"Fotosíntesis","minItems":3}'

# Test Workflow 2: Analyze Emotion
Invoke-RestMethod -Uri "http://localhost:5678/webhook/analyze-emotion" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"text":"Me encantó esta clase","grade":9}'

# Test Workflow 3: Chat
.\test-chat-workflow.ps1
```

---

## 🗄️ PostgreSQL

### Acceso Directo
```powershell
# Conectar a PostgreSQL dentro del contenedor
docker exec -it postgres_eduplay psql -U eduplay_user -d eduplay_db

# Desde PowerShell con psql instalado
psql -h localhost -p 5432 -U eduplay_user -d eduplay_db
# Contraseña: eduplay_password
```

### Comandos SQL Útiles
```sql
-- Listar tablas
\dt

-- Describir tabla
\d Activity

-- Ver todas las actividades
SELECT * FROM "Activity";

-- Contar registros
SELECT COUNT(*) FROM "Student";

-- Ver interacciones recientes
SELECT * FROM "Interaction" ORDER BY "completedAt" DESC LIMIT 10;

-- Estadísticas de emociones
SELECT emotion, COUNT(*) 
FROM "Interaction" 
GROUP BY emotion;

-- Salir
\q
```

### Backup y Restore
```powershell
# Backup completo
docker exec postgres_eduplay pg_dump -U eduplay_user eduplay_db > backup.sql

# Restore desde backup
docker exec -i postgres_eduplay psql -U eduplay_user eduplay_db < backup.sql

# Backup de solo datos (sin esquema)
docker exec postgres_eduplay pg_dump -U eduplay_user --data-only eduplay_db > data-only.sql
```

---

## 🧪 Testing y Desarrollo

### Test Manual de Endpoints
```powershell
# Generar contenido con IA
$body = @{
    topic = "La Colonia en Perú"
    context = "Período 1532-1821"
    courseName = "Historia"
    minItems = 3
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/ai/generate-content/ACTIVITY_ID" `
  -Method POST `
  -Body $body `
  -ContentType "application/json"

# Analizar emoción
$body = @{
    text = "Me gustó mucho esta actividad"
    grade = 8
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/ai/analyze-emotion" `
  -Method POST `
  -Body $body `
  -ContentType "application/json"

# Login y obtener JWT
$body = @{
    email = "admin@eduplay.com"
    password = "admin123"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "http://localhost:3000/auth/login" `
  -Method POST `
  -Body $body `
  -ContentType "application/json"

$token = $response.access_token

# Usar JWT en requests
$headers = @{
    Authorization = "Bearer $token"
}

Invoke-RestMethod -Uri "http://localhost:3000/auth/profile" `
  -Method GET `
  -Headers $headers
```

### Verificar Servicios
```powershell
# Backend
curl http://localhost:3000

# Swagger
Start-Process http://localhost:3000/api

# n8n
curl http://localhost:5678

# Ollama
curl http://localhost:11434/api/tags

# PostgreSQL
docker ps | findstr postgres
```

---

## 🔄 Git Workflow

### Branches
```bash
# Crear rama feature
git checkout -b feature/nueva-funcionalidad

# Crear rama fix
git checkout -b fix/corregir-error

# Ver ramas
git branch -a

# Cambiar de rama
git checkout main
```

### Commits Convencionales
```bash
# Feature
git commit -m "feat: agregar endpoint de analytics"

# Fix
git commit -m "fix: corregir validación de email"

# Docs
git commit -m "docs: actualizar README con nuevos endpoints"

# Refactor
git commit -m "refactor: simplificar lógica de autenticación"

# Test
git commit -m "test: agregar tests para módulo de IA"
```

### Sync
```bash
# Pull con rebase
git pull --rebase origin main

# Push
git push origin feature/nueva-funcionalidad

# Ver estado
git status

# Ver log
git log --oneline --graph --all
```

---

## 📊 Monitoring y Debugging

### Ver Logs de Aplicación
```powershell
# Logs del backend
npm run start:dev

# Logs de Docker
docker-compose logs -f

# Logs específicos con filtro
docker logs n8n 2>&1 | Select-String "error"
docker logs ollama 2>&1 | Select-String "model"
```

### Health Checks
```powershell
# Verificar todos los servicios
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

# Test de conectividad
Test-NetConnection -ComputerName localhost -Port 3000  # Backend
Test-NetConnection -ComputerName localhost -Port 5432  # PostgreSQL
Test-NetConnection -ComputerName localhost -Port 5678  # n8n
Test-NetConnection -ComputerName localhost -Port 11434 # Ollama
```

### Debugging
```powershell
# Iniciar con debugging
npm run start:debug

# Attach VS Code debugger (F5)
# Configuración en .vscode/launch.json

# Ver variables de entorno
docker exec n8n env | Select-String "N8N"
docker exec ollama env | Select-String "OLLAMA"
```

---

## 🚀 Deployment

### Build para Producción
```powershell
# Compilar
npm run build

# Verificar dist/
Get-ChildItem ./dist

# Ejecutar producción
npm run start:prod
```

### Environment Variables
```powershell
# Copiar template
cp .env.example .env

# Editar con Notepad
notepad .env

# Validar variables
Get-Content .env | Select-String "DATABASE_URL"
```

---

## 🧹 Limpieza y Mantenimiento

### Limpiar Dependencias
```powershell
# Eliminar node_modules
Remove-Item -Recurse -Force node_modules

# Eliminar lockfile
Remove-Item package-lock.json

# Reinstalar
npm install
```

### Limpiar Prisma
```powershell
# Eliminar generado
Remove-Item -Recurse -Force prisma/generated

# Regenerar
npx prisma generate
```

### Reset Completo
```powershell
# 1. Detener Docker
docker-compose down -v

# 2. Limpiar node_modules
Remove-Item -Recurse -Force node_modules

# 3. Reinstalar
npm install

# 4. Regenerar Prisma
npx prisma generate

# 5. Iniciar Docker
docker-compose up -d

# 6. Migrar DB
npx prisma migrate deploy

# 7. Seed
npm run seed

# 8. Iniciar backend
npm run start:dev
```

---

## 📖 Recursos

- **Swagger API:** http://localhost:3000/api
- **n8n UI:** http://localhost:5678
- **Prisma Studio:** `npx prisma studio`
- **Documentación completa:** Ver [README.md](../README.md)

---

**🎮 EduPlay Backend** - Comandos de referencia rápida
