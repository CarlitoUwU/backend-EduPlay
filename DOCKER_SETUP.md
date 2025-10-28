# 🚀 Guía de Configuración - Docker Services

## 📋 Servicios Incluidos

Este `docker-compose.yml` configura los siguientes servicios:

### 1. 🐘 PostgreSQL (puerto 5432)
- **Contenedor**: `postgres_eduplay`
- **Usuario**: `postgres`
- **Password**: `postgres`
- **Bases de datos**:
  - `eduplay` - Para el backend de NestJS
  - `n8n` - Para n8n workflows

### 2. 🔄 n8n (puerto 5678)
- **Contenedor**: `n8n`
- **UI**: http://localhost:5678
- **Credenciales**:
  - Usuario: `admin`
  - Password: `admin123`
- **Base de datos**: PostgreSQL (n8n database)
- **Conectado a**: Ollama para LLM

### 3. 🤖 Ollama (puerto 11434)
- **Contenedor**: `ollama`
- **API**: http://localhost:11434
- **Propósito**: Motor de IA para generación de contenido

---

## 🛠️ Configuración Inicial

### Paso 1: Detener servicios existentes
```powershell
docker-compose down
```

### Paso 2: Limpiar volúmenes antiguos (OPCIONAL - solo si hay conflictos)
```powershell
# ⚠️ ADVERTENCIA: Esto eliminará todos los datos existentes
docker volume rm backend-eduplay_postgres_data
# o eliminar manualmente la carpeta
Remove-Item -Recurse -Force ./postgres_data
```

### Paso 3: Levantar todos los servicios
```powershell
docker-compose up -d
```

### Paso 4: Verificar que los servicios estén corriendo
```powershell
docker ps
```

Deberías ver 3 contenedores:
- `postgres_eduplay` (postgres:15)
- `n8n` (n8nio/n8n)
- `ollama` (ollama/ollama:latest)

### Paso 5: Ver logs (opcional)
```powershell
# Ver logs de todos los servicios
docker-compose logs -f

# Ver logs de un servicio específico
docker-compose logs -f postgres
docker-compose logs -f n8n
docker-compose logs -f ollama
```

---

## 🗄️ Configuración de Base de Datos

### Las bases de datos se crean automáticamente con el script `init-db.sh`:

1. **eduplay** - Base de datos del backend
   ```
   postgresql://postgres:postgres@localhost:5432/eduplay
   ```

2. **n8n** - Base de datos para n8n workflows
   ```
   postgresql://postgres:postgres@localhost:5432/n8n
   ```

### Aplicar migraciones de Prisma
```powershell
# Después de levantar los contenedores
npx prisma migrate deploy

# O regenerar desde cero
npx prisma migrate reset
```

---

## 🤖 Configuración de Ollama

### Descargar un modelo (ejemplo: llama3.2)
```powershell
# Ejecutar dentro del contenedor de Ollama
docker exec -it ollama ollama pull llama3.2

# O modelos más ligeros para desarrollo
docker exec -it ollama ollama pull mistral
docker exec -it ollama ollama pull phi3
```

### Verificar modelos disponibles
```powershell
docker exec -it ollama ollama list
```

### Probar Ollama
```powershell
# Test directo
curl http://localhost:11434/api/generate -d '{
  "model": "llama3.2",
  "prompt": "¿Por qué es importante la educación?",
  "stream": false
}'
```

---

## 🔄 n8n Workflows

### Acceder a n8n
1. Abrir: http://localhost:5678
2. Login con:
   - Usuario: `admin`
   - Password: `admin123`

### Conectar n8n con Ollama
En tus workflows de n8n, usar la URL interna:
```
http://ollama:11434
```

### Webhook URL para el backend
```
http://localhost:5678/webhook/[webhook-path]
```

---

## 🐛 Troubleshooting

### Error: "port is already allocated"
```powershell
# Ver qué está usando el puerto
netstat -ano | findstr :5432
netstat -ano | findstr :5678
netstat -ano | findstr :11434

# Detener el proceso o cambiar el puerto en docker-compose.yml
```

### Error: PostgreSQL no inicia
```powershell
# Ver logs
docker logs postgres_eduplay

# Reiniciar el contenedor
docker restart postgres_eduplay
```

### Error: Base de datos no existe
```powershell
# Recrear las bases de datos
docker-compose down
Remove-Item -Recurse -Force ./postgres_data
docker-compose up -d
```

### Ollama: Modelo no encontrado
```powershell
# Descargar el modelo necesario
docker exec -it ollama ollama pull llama3.2
```

---

## 📊 Arquitectura de Red

```
┌─────────────────────────────────────────────┐
│          Docker Network: n8n_network        │
│                                             │
│  ┌──────────┐    ┌──────────┐    ┌───────┐│
│  │PostgreSQL│◄───│   n8n    │◄───│Ollama ││
│  │  :5432   │    │  :5678   │    │:11434 ││
│  └────┬─────┘    └─────┬────┘    └───────┘│
└───────┼────────────────┼──────────────────┘
        │                │
        ▼                ▼
   localhost:5432   localhost:5678
        ▲
        │
   ┌────┴─────┐
   │  Backend │
   │  NestJS  │
   │  :3000   │
   └──────────┘
```

---

## ✅ Verificación Final

### Checklist de servicios funcionando:

- [ ] PostgreSQL respondiendo en `localhost:5432`
- [ ] n8n UI accesible en `http://localhost:5678`
- [ ] Ollama API respondiendo en `http://localhost:11434`
- [ ] Base de datos `eduplay` creada
- [ ] Base de datos `n8n` creada
- [ ] Migraciones de Prisma aplicadas
- [ ] Modelo de Ollama descargado
- [ ] Backend NestJS conectado a la DB

### Comandos de verificación:

```powershell
# 1. Verificar contenedores
docker ps

# 2. Verificar bases de datos
docker exec -it postgres_eduplay psql -U postgres -c "\l"

# 3. Verificar n8n
curl http://localhost:5678

# 4. Verificar Ollama
curl http://localhost:11434/api/tags
```

---

## 🎯 Próximos Pasos

1. ✅ Configurar workflows en n8n para:
   - Generación de flashcards con IA
   - Generación de preguntas de quiz
   - Análisis de emociones
   - Generación de contenido educativo

2. ✅ Crear módulo AI en el backend para:
   - Comunicación con n8n webhooks
   - Procesamiento de respuestas de IA
   - Integración con el módulo de Activity

3. ✅ Probar el flujo completo:
   - Profesor solicita contenido → Backend → n8n → Ollama → Respuesta
