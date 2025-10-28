# 🤖 Guía Completa - n8n Workflows para EduPlay

Configuración paso a paso de los 3 workflows de inteligencia artificial que alimentan el sistema EduPlay.

## 📋 Prerrequisitos

```powershell
# Verificar servicios activos
docker ps

# Verificar Ollama
curl http://localhost:11434/api/tags

# Descargar modelo (si no existe)
docker exec -it ollama ollama pull gemma2:2b
```

**Requisitos:**
- ✅ Docker Compose corriendo
- ✅ n8n accesible en http://localhost:5678
- ✅ Ollama con modelo gemma2:2b descargado
- ✅ Backend en http://localhost:3000

---

## 🎯 Workflow 1: Generate Educational Content

**Propósito:** Generar flashcards, juegos de memoria, relaciones y quiz automáticamente.

### Configuración

| Parámetro | Valor |
|-----------|-------|
| Endpoint | `POST /webhook/generate-content` |
| Modelo | `gemma2:2b` |
| num_predict | `3500` |
| temperature | `0.7` |
| Tiempo | ~131 segundos |

### Paso 1: Crear Workflow

1. Ir a http://localhost:5678 (admin/admin123)
2. Click **"+ Add workflow"**
3. Nombre: **"Generate Educational Content"**

### Paso 2: Agregar Nodos

**Nodo 1: Webhook**
- HTTP Method: `POST`
- Path: `generate-content`
- Response Mode: `When Last Node Finishes`

**Nodo 2: HTTP Request (Ollama)**
- Method: `POST`
- URL: `http://ollama:11434/api/generate`
- Body (JSON):
```json
{
  "model": "gemma2:2b",
  "prompt": "Genera contenido educativo sobre el tema: {{ $json.body.topic }}.\n\nContexto: {{ $json.body.context }}\nCurso: {{ $json.body.courseName }}\n\nCrea MÍNIMO {{ $json.body.minItems }} elementos de cada tipo:\n\n1. FLASHCARDS (pregunta/respuesta)\n2. MEMORIA (pares de conceptos relacionados)\n3. RELACIONES (items que se relacionan lógicamente)\n4. QUIZ (preguntas de múltiple opción)\n\nFormato JSON:\n{\n  \"flashcards\": [{\"question\":\"...\",\"answer\":\"...\"}],\n  \"cardsMemory\": [{\"card1\":\"...\",\"card2\":\"...\"}],\n  \"playRelations\": [{\"item1\":\"...\",\"item2\":\"...\"}],\n  \"quiz\": {\n    \"questions\": [{\"question\":\"...\",\"optionA\":\"...\",\"optionB\":\"...\",\"optionC\":\"...\",\"optionD\":\"...\",\"correctOption\":\"A\"}],\n    \"questionsOpen\": [{\"question\":\"...\",\"answer\":\"...\"}]\n  }\n}\n\nResponde SOLO con el JSON:",
  "stream": false,
  "options": {
    "num_predict": 3500,
    "temperature": 0.7
  }
}
```

**Nodo 3: Code (Parsear respuesta)**
```javascript
const ollamaResponse = $input.item.json.response;

try {
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

**Nodo 4: Respond to Webhook**
- Response Mode: `Using 'Respond to Webhook' Node`
- Response: `JSON` (automático desde nodo anterior)

### Paso 3: Conectar y Activar

```
[Webhook] → [HTTP Request] → [Code] → [Respond]
```

1. Conectar nodos en orden
2. Activar workflow (toggle verde)
3. Guardar: `Ctrl+S`

### Prueba

```powershell
$body = @{
    topic = "La Colonia en Perú"
    context = "Período histórico 1532-1821"
    courseName = "Historia del Perú"
    minItems = 3
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5678/webhook/generate-content" -Method POST -Body $body -ContentType "application/json"
```

---

## 💭 Workflow 2: Analyze Student Emotion

**Propósito:** Analizar emoción y engagement del estudiante en base a texto y calificación.

### Configuración

| Parámetro | Valor |
|-----------|-------|
| Endpoint | `POST /webhook/analyze-emotion` |
| Modelo | `gemma2:2b` |
| num_predict | `200` |
| temperature | `0.3` |
| Tiempo | ~5-10 segundos |

### Paso 1: Crear Workflow

1. Click **"+ Add workflow"**
2. Nombre: **"Analyze Student Emotion"**

### Paso 2: Agregar Nodos

**Nodo 1: Webhook**
- HTTP Method: `POST`
- Path: `analyze-emotion`
- Response Mode: `When Last Node Finishes`

**Nodo 2: HTTP Request (Ollama)**
- Method: `POST`
- URL: `http://ollama:11434/api/generate`
- Body (JSON):
```json
{
  "model": "gemma2:2b",
  "prompt": "Analiza el siguiente texto de un estudiante y su calificación.\n\nTexto: \"{{ $json.body.text }}\"\nCalificación: {{ $json.body.grade }}/10\n\nDetermina:\n1. Emoción (POSITIVO, NEUTRAL, o NEGATIVO)\n2. Nivel de engagement (0.0 a 1.0)\n3. Análisis breve\n\nRespuesta en JSON:\n{\n  \"emotion\": \"POSITIVO|NEUTRAL|NEGATIVO\",\n  \"engagement\": 0.85,\n  \"analysis\": \"Descripción del análisis\"\n}\n\nResponde SOLO con el JSON:",
  "stream": false,
  "options": {
    "num_predict": 200,
    "temperature": 0.3
  }
}
```

**Nodo 3: Code (Parsear emoción)**
```javascript
const ollamaResponse = $input.item.json.response;

try {
  const analysis = JSON.parse(ollamaResponse);
  
  // Validar y normalizar valores
  let emotion = analysis.emotion;
  if (!['POSITIVO', 'NEUTRAL', 'NEGATIVO'].includes(emotion)) {
    emotion = 'NEUTRAL';
  }
  
  let engagement = parseFloat(analysis.engagement) || 0.5;
  engagement = Math.max(0, Math.min(1, engagement)); // Clamp 0-1
  
  return [{
    json: {
      emotion: emotion,
      engagement: Number(engagement.toFixed(2)),
      analysis: analysis.analysis || 'Sin análisis disponible'
    }
  }];
} catch (error) {
  return [{
    json: {
      emotion: 'NEUTRAL',
      engagement: 0.5,
      analysis: 'Error en análisis automático'
    }
  }];
}
```

**Nodo 4: Respond to Webhook**
- Response Mode: `Using 'Respond to Webhook' Node`
- Response: `JSON` (automático)

### Paso 3: Conectar y Activar

```
[Webhook] → [HTTP Request] → [Code] → [Respond]
```

### Prueba

```powershell
$body = @{
    text = "Me encantó esta clase, aprendí mucho sobre historia"
    grade = 9
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5678/webhook/analyze-emotion" -Method POST -Body $body -ContentType "application/json"
```

---

## 💬 Workflow 3: Chat Conversation

**Propósito:** Generar respuestas conversacionales motivadoras durante la introducción a actividades.

### Configuración

| Parámetro | Valor |
|-----------|-------|
| Endpoint | `POST /webhook/chat` |
| Modelo | `gemma2:2b` |
| num_predict | `150` |
| temperature | `0.8` |
| Tiempo | ~3-6 segundos |

### Paso 1: Crear Workflow

1. Click **"+ Add workflow"**
2. Nombre: **"Student Chat Conversation"**

### Paso 2: Agregar Nodos

**Nodo 1: Webhook**
- HTTP Method: `POST`
- Path: `chat`
- Response Mode: `When Last Node Finishes`

**Nodo 2: HTTP Request (Ollama)**
- Method: `POST`
- URL: `http://ollama:11434/api/generate`
- Body (JSON):
```json
{
  "model": "gemma2:2b",
  "prompt": "Eres un asistente educativo amigable y motivador para niños de 10-11 años. Tu objetivo es introducir al estudiante a una nueva actividad de aprendizaje de forma breve, entusiasta y cercana.\n\n📚 CONTEXTO DE LA ACTIVIDAD:\n- Curso: {{ $json.body.courseName }}\n- Actividad: {{ $json.body.activityTitle }}\n- Descripción: {{ $json.body.activityDescription }}\n\n💬 CONVERSACIÓN PREVIA:\n{{ $json.body.conversationHistory.length > 0 ? $json.body.conversationHistory.map(m => `${m.role === 'user' ? 'Estudiante' : 'Bot'}: ${m.text}`).join('\\n') : 'Primera interacción' }}\n\n🗣️ MENSAJE DEL ESTUDIANTE:\n{{ $json.body.studentMessage }}\n\n📝 INSTRUCCIONES:\n- Responde en MÁXIMO 2-3 oraciones (no más de 60 palabras)\n- Sé motivador, cercano y entusiasta\n- Usa emojis ocasionalmente (máximo 1-2)\n- Conecta con los intereses del estudiante\n- Si es el primer mensaje, da una bienvenida breve\n- Si pregunta algo específico, responde directamente\n- Si menciona dudas o nervios, tranquiliza y motiva\n- Anima al estudiante a comenzar cuando esté listo\n- NO repitas información del historial\n- NO hagas preguntas largas o complejas\n\n✨ RESPUESTA DEL BOT:",
  "stream": false,
  "options": {
    "num_predict": 150,
    "temperature": 0.8,
    "top_p": 0.9,
    "repeat_penalty": 1.1
  }
}
```

**Nodo 3: Code (Limpiar respuesta)**
```javascript
const ollamaResponse = $input.item.json.response;

// Limpiar la respuesta
let botResponse = ollamaResponse
  .replace(/\n\n+/g, ' ')
  .replace(/\n/g, ' ')
  .trim();

// Eliminar prefijos comunes
botResponse = botResponse
  .replace(/^(Respuesta:|Bot:|Asistente:)/i, '')
  .trim();

// Limitar longitud
if (botResponse.length > 300) {
  const lastPeriod = botResponse.substring(0, 297).lastIndexOf('.');
  if (lastPeriod > 150) {
    botResponse = botResponse.substring(0, lastPeriod + 1);
  } else {
    botResponse = botResponse.substring(0, 297) + '...';
  }
}

// Fallback si está vacía
if (!botResponse || botResponse.length < 10) {
  botResponse = '¡Genial! Estás listo para comenzar esta aventura de aprendizaje. 🚀';
}

return {
  botResponse: botResponse
};
```

**Nodo 4: Respond to Webhook**
- Response Mode: `Using 'Respond to Webhook' Node`
- Response: `JSON` (automático)

### Paso 3: Conectar y Activar

```
[Webhook] → [HTTP Request] → [Code] → [Respond]
```

### Prueba Automatizada

```powershell
.\test-chat-workflow.ps1
```

### Prueba Manual

```powershell
$body = @{
    activityTitle = "La Colonia en Perú (1532-1821)"
    activityDescription = "Sesión sobre el período colonial en Perú"
    courseName = "Historia del Perú"
    studentMessage = "Hola, ¿de qué trata esta actividad?"
    conversationHistory = @()
} | ConvertTo-Json -Depth 10

Invoke-RestMethod -Uri "http://localhost:5678/webhook/chat" -Method POST -Body $body -ContentType "application/json"
```

---

## 📊 Comparativa de Workflows

| Workflow | Propósito | Tokens | Tiempo | Temperature | Uso |
|----------|-----------|--------|--------|-------------|-----|
| **1. Generate Content** | Crear flashcards, juegos, quiz | 3500 | ~131 seg | 0.7 | Una vez por actividad |
| **2. Analyze Emotion** | Detectar emoción/engagement | 200 | ~7 seg | 0.3 | Cada interacción |
| **3. Chat** | Respuestas conversacionales | 150 | ~4 seg | 0.8 | 3-5 veces en introducción |

---

## 🔧 Troubleshooting

### Error: "Cannot connect to Ollama"
```powershell
docker restart ollama
docker logs ollama -f
```

### Error: "Model not found"
```powershell
docker exec -it ollama ollama pull gemma2:2b
docker exec -it ollama ollama list
```

### Error: "Webhook not responding"
1. Verificar workflow activo (toggle verde)
2. Ver logs: `docker logs n8n -f`
3. Verificar path correcto del webhook

### Respuestas lentas
- Verificar recursos: `docker stats`
- Ollama requiere mínimo 4GB RAM
- gemma2:2b es más rápido que phi3

### JSON parse error en Workflow 1
- Aumentar `num_predict` si el contenido se corta
- Verificar que el prompt pida explícitamente JSON
- Revisar logs de Ollama: `docker logs ollama -f`

---

## 🎯 Optimizaciones

### Para respuestas más rápidas:
- Reducir `num_predict`
- Aumentar `temperature` (más creatividad, menos precisión)

### Para mejor calidad:
- Aumentar `num_predict`
- Reducir `temperature` (más precisión, menos creatividad)

### Para evitar repeticiones:
- Aumentar `repeat_penalty` (1.1 → 1.3)

---

## ✅ Checklist de Implementación

- [ ] Docker Compose corriendo
- [ ] Modelo gemma2:2b descargado
- [ ] n8n accesible (http://localhost:5678)
- [ ] Workflow 1 creado y activo
- [ ] Workflow 2 creado y activo
- [ ] Workflow 3 creado y activo
- [ ] Test Workflow 1 exitoso
- [ ] Test Workflow 2 exitoso
- [ ] Test Workflow 3 exitoso (`.\test-chat-workflow.ps1`)
- [ ] Backend probado con endpoints:
  - [ ] POST /ai/generate-content/:id
  - [ ] POST /ai/analyze-emotion
  - [ ] POST /ai/chat

---

## 📚 Recursos

- **Swagger Backend:** http://localhost:3000/api
- **n8n UI:** http://localhost:5678
- **Ollama API:** http://localhost:11434/api/tags
- **Test Script:** `.\test-chat-workflow.ps1`

---

**¡Sistema de IA Completo! 🎉** Tres workflows configurados y listos para usar.
