# 🤖 Guía de Workflows n8n para EduPlay

Esta guía te ayudará a configurar los workflows de n8n que integran Ollama (IA) con el backend de EduPlay.

## 📋 Requisitos Previos

- ✅ Docker corriendo con los 3 servicios: postgres, n8n, ollama
- ✅ Acceso a n8n en http://localhost:5678 (admin/admin123)
- ✅ Modelo phi3 descargado en Ollama
- ✅ Backend de NestJS corriendo en http://localhost:3000

## 🔧 Verificar que Ollama está Listo

```powershell
# Verificar que Ollama está corriendo
curl http://localhost:11434/api/tags

# Debería mostrar el modelo phi3
```

Si phi3 no está instalado:
```powershell
docker exec -it ollama ollama pull phi3
```

---

## 🎯 Workflow 1: Generación de Contenido Educativo

### Endpoint del Webhook
`POST http://localhost:5678/webhook/generate-content`

### Flujo del Workflow

```
[Webhook] → [Preparar Prompt] → [Ollama] → [Parsear JSON] → [Responder]
```

### Pasos para Crear en n8n:

1. **Accede a n8n**: http://localhost:5678
   - Usuario: `admin`
   - Contraseña: `admin123`

2. **Crear Nuevo Workflow**:
   - Click en "+ Add workflow"
   - Nombre: "Generate Educational Content"

3. **Agregar nodo Webhook**:
   - Busca "Webhook" en el panel izquierdo
   - Arrastra al canvas
   - Configuración:
     - **HTTP Method**: POST
     - **Path**: `generate-content`
     - **Response Mode**: "When Last Node Finishes"
     - **Response Data**: "Last Node"

4. **Agregar nodo "Set" (Preparar Prompt)**:
   - Busca "Set" y agrástalo
   - Conecta desde Webhook
   - Configuración:
     ```json
     {
       "values": {
         "prompt": "=Eres un profesor experto. Genera contenido educativo en español para el tema: \"{{ $json.body.topic }}\".\n\nContexto: {{ $json.body.context }}\nCurso: {{ $json.body.courseName }}\n\nGenera EXACTAMENTE {{ $json.body.minItems }} elementos de cada tipo en formato JSON:\n\n{\n  \"flashcards\": [\n    {\"question\": \"¿Pregunta?\", \"answer\": \"Respuesta\"}\n  ],\n  \"cardsMemory\": [\n    {\"card1\": \"Concepto\", \"card2\": \"Definición\"}\n  ],\n  \"playRelations\": [\n    {\"item1\": \"Término\", \"item2\": \"Relación\"}\n  ],\n  \"quiz\": {\n    \"questions\": [\n      {\n        \"question\": \"¿Pregunta?\",\n        \"optionA\": \"Opción A\",\n        \"optionB\": \"Opción B\",\n        \"optionC\": \"Opción C\",\n        \"optionD\": \"Opción D\",\n        \"correctOption\": \"A\"\n      }\n    ],\n    \"questionsOpen\": [\n      {\"question\": \"Pregunta abierta\", \"answer\": \"Respuesta esperada\"}\n    ]\n  }\n}\n\nRespuesta SOLO JSON sin texto adicional:"
       }
     }
     ```

5. **Agregar nodo "Ollama"**:
   - Busca "HTTP Request" (usaremos esto para Ollama)
   - Configuración:
     - **Method**: POST
     - **URL**: `http://ollama:11434/api/generate`
     - **Body Content Type**: JSON
     - **Body**:
       ```json
       {
         "model": "phi3",
         "prompt": "={{ $json.prompt }}",
         "stream": false,
         "format": "json"
       }
       ```

6. **Agregar nodo "Code" (Parsear Respuesta)**:
   - Busca "Code" y agrástalo
   - Código JavaScript:
     ```javascript
     const ollamaResponse = items[0].json.response;
     
     try {
       // Intentar parsear la respuesta de Ollama
       const generatedContent = JSON.parse(ollamaResponse);
       
       return [{
         json: {
           flashcards: generatedContent.flashcards || [],
           cardsMemory: generatedContent.cardsMemory || [],
           playRelations: generatedContent.playRelations || [],
           quiz: generatedContent.quiz || { questions: [], questionsOpen: [] }
         }
       }];
     } catch (error) {
       // Si falla el parsing, retornar estructura vacía
       return [{
         json: {
           flashcards: [],
           cardsMemory: [],
           playRelations: [],
           quiz: { questions: [], questionsOpen: [] },
           error: "Error parseando respuesta de IA"
         }
       }];
     }
     ```

7. **Activar el Workflow**:
   - Toggle en "Active" (arriba a la derecha)
   - Click en "Save"

---

## 💭 Workflow 2: Análisis de Emoción

### Endpoint del Webhook
`POST http://localhost:5678/webhook/analyze-emotion`

### Flujo del Workflow

```
[Webhook] → [Preparar Prompt] → [Ollama] → [Parsear Emoción] → [Responder]
```

### Pasos para Crear:

1. **Crear Nuevo Workflow**:
   - Click en "+ Add workflow"
   - Nombre: "Analyze Student Emotion"

2. **Agregar nodo Webhook**:
   - **HTTP Method**: POST
   - **Path**: `analyze-emotion`
   - **Response Mode**: "When Last Node Finishes"

3. **Agregar nodo "Set" (Preparar Prompt)**:
   ```json
   {
     "values": {
       "prompt": "=Analiza el siguiente texto de un estudiante y su calificación.\n\nTexto: \"{{ $json.body.text }}\"\nCalificación: {{ $json.body.grade }}/10\n\nDetermina:\n1. Emoción (POSITIVO, NEUTRAL, o NEGATIVO)\n2. Nivel de engagement (0.0 a 1.0)\n3. Análisis breve\n\nRespuesta en JSON:\n{\n  \"emotion\": \"POSITIVO|NEUTRAL|NEGATIVO\",\n  \"engagement\": 0.85,\n  \"analysis\": \"Descripción del análisis\"\n}\n\nRespuesta SOLO JSON:"
     }
   }
   ```

4. **Agregar nodo "HTTP Request" (Ollama)**:
   - **Method**: POST
   - **URL**: `http://ollama:11434/api/generate`
   - **Body**:
     ```json
     {
       "model": "phi3",
       "prompt": "={{ $json.prompt }}",
       "stream": false,
       "format": "json"
     }
     ```

5. **Agregar nodo "Code" (Parsear)**:
   ```javascript
   const ollamaResponse = items[0].json.response;
   
   try {
     const analysis = JSON.parse(ollamaResponse);
     
     // Validar y normalizar valores
     let emotion = analysis.emotion;
     if (!['POSITIVO', 'NEUTRAL', 'NEGATIVO'].includes(emotion)) {
       emotion = 'NEUTRAL';
     }
     
     let engagement = parseFloat(analysis.engagement) || 0.5;
     engagement = Math.max(0, Math.min(1, engagement));
     
     return [{
       json: {
         emotion: emotion,
         engagement: engagement,
         analysis: analysis.analysis || 'Análisis completado'
       }
     }];
   } catch (error) {
     // Fallback básico
     return [{
       json: {
         emotion: 'NEUTRAL',
         engagement: 0.5,
         analysis: 'Error en análisis de IA'
       }
     }];
   }
   ```

6. **Activar el Workflow**:
   - Toggle en "Active"
   - Click en "Save"

---

## 🧪 Probar los Workflows

### Prueba desde Backend

```powershell
# Probar generación de contenido
curl -X POST http://localhost:3000/ai/generate-content/ACTIVITY_ID `
  -H "Content-Type: application/json" `
  -d '{
    "topic": "La Independencia del Perú",
    "context": "Periodo histórico 1821",
    "minItems": 3
  }'

# Probar análisis de emoción
curl -X POST http://localhost:3000/ai/analyze-emotion `
  -H "Content-Type: application/json" `
  -d '{
    "text": "Me encantó esta clase, aprendí mucho sobre historia",
    "grade": 9
  }'
```

### Prueba Directa en n8n

1. En el workflow, click en el nodo Webhook
2. Click en "Listen for Test Event"
3. Ejecuta el curl desde PowerShell
4. Verás la data llegando en n8n

---

## 🔍 Troubleshooting

### ❌ Error: "Cannot connect to Ollama"
```powershell
# Verificar que Ollama está corriendo
docker ps | findstr ollama

# Reiniciar Ollama
docker restart ollama
```

### ❌ Error: "Model phi3 not found"
```powershell
# Descargar modelo
docker exec -it ollama ollama pull phi3

# Verificar modelos instalados
docker exec -it ollama ollama list
```

### ❌ Error: "Webhook not responding"
- Verifica que el workflow esté **Active** (toggle verde)
- Verifica que n8n esté corriendo: http://localhost:5678
- Revisa los logs de n8n:
  ```powershell
  docker logs n8n
  ```

### ❌ Error: "JSON parsing failed"
- Ollama a veces genera texto adicional antes del JSON
- El nodo "Code" tiene fallback para estos casos
- Intenta ajustar el prompt para ser más específico

---

## 📊 Monitoreo de Workflows

### Ver Ejecuciones en n8n:
1. Click en "Executions" (panel izquierdo)
2. Verás todas las ejecuciones con estado (success/error)
3. Click en una ejecución para ver detalles y debug

### Logs del Sistema:
```powershell
# Logs de n8n
docker logs -f n8n

# Logs de Ollama
docker logs -f ollama

# Logs del backend NestJS
# Desde la carpeta del proyecto
npm run start:dev
```

---

## 🎓 Tips para Mejores Resultados

1. **Prompts Específicos**: Mientras más detallado el contexto, mejor el contenido generado
2. **Temperatura del Modelo**: Puedes ajustar en Ollama para más creatividad vs precisión
3. **Validación**: El backend tiene fallback si la IA falla
4. **Caché**: n8n guarda ejecuciones - útil para debugging

---

## 📚 Próximos Pasos

Una vez configurados los workflows:

1. ✅ Probar generación de contenido desde Swagger: http://localhost:3000/api
2. ✅ Crear una actividad con `POST /activity`
3. ✅ Generar contenido con `POST /ai/generate-content/:activityId`
4. ✅ Verificar que se crearon flashcards, juegos y quiz
5. ✅ Consultar contenido específico:
   - `GET /flashcard/activity/:activityId`
   - `GET /cards-memory/activity/:activityId`
   - `GET /play-relation/activity/:activityId`
   - `GET /quiz/activity/:activityId`

---

## 🆘 Ayuda

Si tienes problemas:
1. Verifica que los 3 contenedores Docker estén corriendo
2. Revisa los logs de cada servicio
3. Usa el modo fallback del backend (funciona sin IA)
4. Consulta la documentación de n8n: https://docs.n8n.io
5. Consulta la documentación de Ollama: https://ollama.ai/docs

¡Buena suerte con tu hackathon! 🚀
