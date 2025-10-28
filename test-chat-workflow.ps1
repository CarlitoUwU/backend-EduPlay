# 🧪 Script de Prueba - Workflow 3: Chat Conversacional
# Este script prueba el flujo completo de chat con los datos del seed

Write-Host "═══════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  🤖 Test: Workflow 3 - Chat Conversacional" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# Verificar que n8n está corriendo
Write-Host "🔍 Verificando n8n..." -ForegroundColor Yellow
try {
    $n8nStatus = Invoke-RestMethod -Uri "http://localhost:5678" -TimeoutSec 5 -ErrorAction Stop
    Write-Host "✅ n8n está corriendo" -ForegroundColor Green
} catch {
    Write-Host "❌ ERROR: n8n no está respondiendo en http://localhost:5678" -ForegroundColor Red
    Write-Host "   Ejecuta: docker-compose up -d" -ForegroundColor Yellow
    exit 1
}

# Verificar que Ollama está corriendo
Write-Host "🔍 Verificando Ollama..." -ForegroundColor Yellow
try {
    $ollamaStatus = Invoke-RestMethod -Uri "http://localhost:11434/api/tags" -TimeoutSec 5 -ErrorAction Stop
    Write-Host "✅ Ollama está corriendo" -ForegroundColor Green
    
    # Verificar que gemma2:2b está instalado
    $hasGemma = $ollamaStatus.models | Where-Object { $_.name -like "*gemma2:2b*" }
    if ($hasGemma) {
        Write-Host "✅ Modelo gemma2:2b encontrado" -ForegroundColor Green
    } else {
        Write-Host "⚠️  Modelo gemma2:2b no encontrado" -ForegroundColor Yellow
        Write-Host "   Ejecuta: docker exec -it ollama ollama pull gemma2:2b" -ForegroundColor Yellow
    }
} catch {
    Write-Host "❌ ERROR: Ollama no está respondiendo en http://localhost:11434" -ForegroundColor Red
    Write-Host "   Ejecuta: docker-compose up -d" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "═══════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  📝 Prueba 1: Primera Interacción (Sin historial)" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

$test1Body = @{
    activityTitle = "La Colonia en Perú (1532-1821)"
    activityDescription = "Sesión sobre el período colonial en Perú, desde la conquista hasta la independencia. Exploraremos el sistema de gobierno virreinal, las encomiendas, y la vida cotidiana durante la colonia."
    courseName = "Historia del Perú"
    studentMessage = "Hola, ¿de qué trata esta actividad?"
    conversationHistory = @()
} | ConvertTo-Json -Depth 10

Write-Host "📤 Enviando mensaje: 'Hola, ¿de qué trata esta actividad?'" -ForegroundColor Yellow
Write-Host ""

try {
    $startTime = Get-Date
    $response1 = Invoke-RestMethod -Uri "http://localhost:5678/webhook/chat" -Method POST -Body $test1Body -ContentType "application/json" -TimeoutSec 30
    $endTime = Get-Date
    $duration = ($endTime - $startTime).TotalSeconds
    
    Write-Host "✅ Respuesta recibida en $([math]::Round($duration, 2)) segundos" -ForegroundColor Green
    Write-Host ""
    Write-Host "🤖 Bot: " -ForegroundColor Cyan -NoNewline
    Write-Host $response1.botResponse -ForegroundColor White
    Write-Host ""
    Write-Host "📊 Longitud de respuesta: $($response1.botResponse.Length) caracteres" -ForegroundColor Gray
    Write-Host ""
} catch {
    Write-Host "❌ ERROR en Prueba 1:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    Write-Host ""
    Write-Host "💡 Verifica que el Workflow 3 esté:" -ForegroundColor Yellow
    Write-Host "   1. Creado en n8n" -ForegroundColor Yellow
    Write-Host "   2. Activo (toggle verde)" -ForegroundColor Yellow
    Write-Host "   3. Path del webhook: 'chat'" -ForegroundColor Yellow
    exit 1
}

Start-Sleep -Seconds 2

Write-Host "═══════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  📝 Prueba 2: Conversación con Historial" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

$test2Body = @{
    activityTitle = "La Colonia en Perú (1532-1821)"
    activityDescription = "Sesión sobre el período colonial en Perú"
    courseName = "Historia del Perú"
    studentMessage = "Me gustan los juegos, ¿hay alguno aquí?"
    conversationHistory = @(
        @{ role = "user"; text = "Hola, ¿de qué trata esta actividad?" }
        @{ role = "bot"; text = $response1.botResponse }
    )
} | ConvertTo-Json -Depth 10

Write-Host "📤 Enviando mensaje: 'Me gustan los juegos, ¿hay alguno aquí?'" -ForegroundColor Yellow
Write-Host ""

try {
    $startTime = Get-Date
    $response2 = Invoke-RestMethod -Uri "http://localhost:5678/webhook/chat" -Method POST -Body $test2Body -ContentType "application/json" -TimeoutSec 30
    $endTime = Get-Date
    $duration = ($endTime - $startTime).TotalSeconds
    
    Write-Host "✅ Respuesta recibida en $([math]::Round($duration, 2)) segundos" -ForegroundColor Green
    Write-Host ""
    Write-Host "🤖 Bot: " -ForegroundColor Cyan -NoNewline
    Write-Host $response2.botResponse -ForegroundColor White
    Write-Host ""
    Write-Host "📊 Longitud de respuesta: $($response2.botResponse.Length) caracteres" -ForegroundColor Gray
    Write-Host ""
} catch {
    Write-Host "❌ ERROR en Prueba 2:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    exit 1
}

Start-Sleep -Seconds 2

Write-Host "═══════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  📝 Prueba 3: Estudiante con Dudas" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

$test3Body = @{
    activityTitle = "La Colonia en Perú (1532-1821)"
    activityDescription = "Sesión sobre el período colonial"
    courseName = "Historia del Perú"
    studentMessage = "No sé si pueda hacer esto, se ve difícil"
    conversationHistory = @(
        @{ role = "user"; text = "Hola, ¿de qué trata esta actividad?" }
        @{ role = "bot"; text = $response1.botResponse }
        @{ role = "user"; text = "Me gustan los juegos, ¿hay alguno aquí?" }
        @{ role = "bot"; text = $response2.botResponse }
    )
} | ConvertTo-Json -Depth 10

Write-Host "📤 Enviando mensaje: 'No sé si pueda hacer esto, se ve difícil'" -ForegroundColor Yellow
Write-Host ""

try {
    $startTime = Get-Date
    $response3 = Invoke-RestMethod -Uri "http://localhost:5678/webhook/chat" -Method POST -Body $test3Body -ContentType "application/json" -TimeoutSec 30
    $endTime = Get-Date
    $duration = ($endTime - $startTime).TotalSeconds
    
    Write-Host "✅ Respuesta recibida en $([math]::Round($duration, 2)) segundos" -ForegroundColor Green
    Write-Host ""
    Write-Host "🤖 Bot: " -ForegroundColor Cyan -NoNewline
    Write-Host $response3.botResponse -ForegroundColor White
    Write-Host ""
    Write-Host "📊 Longitud de respuesta: $($response3.botResponse.Length) caracteres" -ForegroundColor Gray
    Write-Host ""
} catch {
    Write-Host "❌ ERROR en Prueba 3:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "═══════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  📊 Resumen de Conversación Completa" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

Write-Host "Turno 1:" -ForegroundColor Yellow
Write-Host "👤 Estudiante: Hola, ¿de qué trata esta actividad?" -ForegroundColor White
Write-Host "🤖 Bot: $($response1.botResponse)" -ForegroundColor Cyan
Write-Host ""

Write-Host "Turno 2:" -ForegroundColor Yellow
Write-Host "👤 Estudiante: Me gustan los juegos, ¿hay alguno aquí?" -ForegroundColor White
Write-Host "🤖 Bot: $($response2.botResponse)" -ForegroundColor Cyan
Write-Host ""

Write-Host "Turno 3:" -ForegroundColor Yellow
Write-Host "👤 Estudiante: No sé si pueda hacer esto, se ve difícil" -ForegroundColor White
Write-Host "🤖 Bot: $($response3.botResponse)" -ForegroundColor Cyan
Write-Host ""

Write-Host "═══════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  ✅ TODAS LAS PRUEBAS COMPLETADAS EXITOSAMENTE" -ForegroundColor Green
Write-Host "═══════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
Write-Host "📝 Siguiente paso: Probar endpoint completo /ai/chat" -ForegroundColor Yellow
Write-Host "   Ver: N8N_WORKFLOW_3_CHAT.md - Sección 'Integración con Backend'" -ForegroundColor Gray
Write-Host ""
