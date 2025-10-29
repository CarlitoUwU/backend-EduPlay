# n8n Workflows - EduPlay

Esta carpeta contiene los workflows de n8n necesarios para el sistema de IA de EduPlay.

## 📁 Archivos Disponibles

- **`all-workflows.json`**: Todos los workflows en un solo archivo (exportación completa actualizada)
- **`1-generate-content.json`**: Workflow modular para generar contenido educativo (5 endpoints especializados)
- **`2-analyze-emotion.json`**: Workflow para análisis emocional de estudiantes con prompts mejorados
- **`3-chat-conversation.json`**: Workflow para conversaciones dinámicas con estudiantes

**Última actualización:** 29 de Octubre 2025 - Workflows actualizados con prompts basados en AI_PROMPTS.md

## 🚀 Importar Workflows en Otra Computadora

### Opción 1: Importar Todos los Workflows (Recomendado)

1. **Acceder a n8n**:
   ```bash
   # Iniciar Docker Compose
   docker-compose up -d
   
   # Acceder a http://localhost:5678
   # Usuario: admin
   # Contraseña: admin123
   ```

2. **Importar workflows**:
   - Ir a **Workflows** en el menú lateral
   - Clic en **Import from File**
   - Seleccionar `all-workflows.json`
   - ✅ Se importarán los 3 workflows automáticamente

### Opción 2: Importar Workflows Individuales

Si prefieres importar uno por uno:

1. **Workflow 1 - Generate Content**:
   - Import from File → `1-generate-content.json`
   - Activar workflow

2. **Workflow 2 - Analyze Emotion**:
   - Import from File → `2-analyze-emotion.json`
   - Activar workflow

3. **Workflow 3 - Chat Conversation**:
   - Import from File → `3-chat-conversation.json`
   - Activar workflow

## ⚙️ Configuración Posterior a la Importación

### 1. Verificar URLs de Webhooks

Después de importar, verifica que las URLs sean correctas:

```
Workflow 1: http://localhost:5678/webhook/generate-content
Workflow 2: http://localhost:5678/webhook/analyze-emotion
Workflow 3: http://localhost:5678/webhook/chat
```

### 2. Activar Todos los Workflows

Asegúrate de que todos los workflows estén **activos** (toggle en ON).

### 3. Verificar Conexión con Ollama

Los workflows usan `http://ollama:11434/api/generate`. Verifica que:
- El contenedor Ollama esté corriendo
- El modelo `gemma2:2b` esté descargado

```bash
# Verificar Ollama
docker exec ollama ollama list

# Descargar modelo si no existe
docker exec ollama ollama pull gemma2:2b
```

## 🧪 Probar Workflows

### Test Rápido con PowerShell

```powershell
# Probar Workflow 1 - Generate Content
Invoke-RestMethod -Uri "http://localhost:5678/webhook/generate-content" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"prompt": "Photosynthesis in plants"}'

# Probar Workflow 2 - Analyze Emotion
Invoke-RestMethod -Uri "http://localhost:5678/webhook/analyze-emotion" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"text": "Me encantó esta actividad!", "grade": 95}'

# Probar Workflow 3 - Chat
Invoke-RestMethod -Uri "http://localhost:5678/webhook/chat" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{
    "courseName": "Ciencias",
    "activityTitle": "Fotosíntesis",
    "activityDescription": "Aprende sobre el proceso de fotosíntesis",
    "studentMessage": "Hola, estoy listo para empezar",
    "conversationHistory": []
  }'
```

### Test Completo

Usa el script de prueba completo:

```powershell
.\test-chat-workflow.ps1
```

## 📊 Descripción de Workflows

### Workflow 1: Generate Educational Content (MODULAR)
- **Endpoints disponibles:**
  - `/webhook/generate-flashcards` - Solo flashcards
  - `/webhook/generate-memory-pairs` - Solo pares de memoria
  - `/webhook/generate-relations` - Solo relaciones
  - `/webhook/generate-quiz` - Solo quiz
  - `/webhook/generate-content` - Todo el contenido completo
- **Modelo**: gemma2:2b
- **Características**: Prompts especializados basados en AI_PROMPTS.md para cada tipo de contenido
- **Tiempo aprox**: Variable según endpoint (15-131 seg)

### Workflow 2: Analyze Student Emotion
- **Entrada**: `{ "text": "respuesta", "grade": 85 }`
- **Salida**: emotion, engagement, reason, timestamp
- **Tiempo aprox**: ~7 segundos
- **Modelo**: gemma2:2b
- **Temperatura**: 0.3 (preciso)
- **Características**: Psicólogo educativo experto, análisis contextual peruano

### Workflow 3: Student Chat Conversation
- **Entrada**: courseName, activityTitle, studentMessage, conversationHistory
- **Salida**: botResponse
- **Tiempo aprox**: ~4 segundos
- **Modelo**: gemma2:2b
- **Temperatura**: 0.8 (conversacional)
- **Características**: Asistente motivador, respuestas breves y entusiastas

## 🔧 Troubleshooting

### Error: "Workflow not found"
- **Solución**: Importa los workflows desde los archivos JSON

### Error: "Cannot connect to Ollama"
- **Verificar**: `docker ps` para ver si Ollama está corriendo
- **Solución**: `docker-compose up -d ollama`

### Error: "Model not found"
- **Verificar**: `docker exec ollama ollama list`
- **Solución**: `docker exec ollama ollama pull gemma2:2b`

### Webhooks no responden
- **Verificar**: Los workflows deben estar activos (toggle ON)
- **Verificar**: n8n debe estar corriendo en puerto 5678
- **Solución**: Reactivar workflows manualmente

## 📝 Exportar Workflows (Backup)

Si haces cambios y quieres guardarlos:

```bash
# Exportar todos los workflows
docker exec n8n n8n export:workflow --all --output=/home/node/.n8n/workflows-backup.json

# Copiar al proyecto
docker cp n8n:/home/node/.n8n/workflows-backup.json ./n8n-workflows/all-workflows.json
```

## 🔄 Versionamiento

Los workflows están versionados en Git. Cuando hagas cambios:

```bash
git add n8n-workflows/
git commit -m "update: workflows n8n actualizados"
git push
```

## 📚 Documentación Adicional

Para más detalles sobre la configuración de workflows, consulta:
- **N8N_GUIDE.md**: Guía detallada de configuración paso a paso
- **README.md**: Documentación general del proyecto
