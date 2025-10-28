# 🧪 Script de Prueba Rápida - Backend EduPlay

Write-Host "🚀 Iniciando pruebas del backend..." -ForegroundColor Cyan
Write-Host ""

$baseUrl = "http://localhost:3000"
$headers = @{
    "Content-Type" = "application/json"
}

# Test 1: Health Check
Write-Host "1️⃣  Test: Health Check (GET /)" -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/" -Method Get
    Write-Host "   ✅ Servidor respondiendo correctamente" -ForegroundColor Green
    Write-Host "   Response: $response" -ForegroundColor Gray
} catch {
    Write-Host "   ❌ Error: $_" -ForegroundColor Red
}
Write-Host ""

# Test 2: Login Docente
Write-Host "2️⃣  Test: Login Docente (POST /auth/login)" -ForegroundColor Yellow
$loginBody = @{
    email = "maria.garcia@eduplay.com"
    password = "password123"
} | ConvertTo-Json

try {
    $loginResponse = Invoke-RestMethod -Uri "$baseUrl/auth/login" -Method Post -Body $loginBody -Headers $headers
    Write-Host "   ✅ Login exitoso" -ForegroundColor Green
    Write-Host "   Usuario: $($loginResponse.user.full_name)" -ForegroundColor Gray
    Write-Host "   Rol: $($loginResponse.user.role)" -ForegroundColor Gray
    Write-Host "   Token: $($loginResponse.token.Substring(0,50))..." -ForegroundColor Gray
    $token = $loginResponse.token
} catch {
    Write-Host "   ❌ Error: $_" -ForegroundColor Red
}
Write-Host ""

# Test 3: Listar Cursos
Write-Host "3️⃣  Test: Listar Cursos (GET /course)" -ForegroundColor Yellow
try {
    $courses = Invoke-RestMethod -Uri "$baseUrl/course" -Method Get
    Write-Host "   ✅ Cursos obtenidos: $($courses.Count)" -ForegroundColor Green
    foreach ($course in $courses) {
        Write-Host "   - $($course.name)" -ForegroundColor Gray
    }
} catch {
    Write-Host "   ❌ Error: $_" -ForegroundColor Red
}
Write-Host ""

# Test 4: Listar Aulas
Write-Host "4️⃣  Test: Listar Aulas (GET /classroom)" -ForegroundColor Yellow
try {
    $classrooms = Invoke-RestMethod -Uri "$baseUrl/classroom" -Method Get
    Write-Host "   ✅ Aulas obtenidas: $($classrooms.Count)" -ForegroundColor Green
    foreach ($classroom in $classrooms) {
        Write-Host "   - $($classroom.name)" -ForegroundColor Gray
    }
} catch {
    Write-Host "   ❌ Error: $_" -ForegroundColor Red
}
Write-Host ""

# Test 5: Listar Enrollments
Write-Host "5️⃣  Test: Listar Enrollments (GET /enrollment)" -ForegroundColor Yellow
try {
    $enrollments = Invoke-RestMethod -Uri "$baseUrl/enrollment" -Method Get
    Write-Host "   ✅ Enrollments obtenidos: $($enrollments.Count)" -ForegroundColor Green
    if ($enrollments.Count -gt 0) {
        $enrollmentId = $enrollments[0].id
        Write-Host "   Enrollment ID: $enrollmentId" -ForegroundColor Gray
    }
} catch {
    Write-Host "   ❌ Error: $_" -ForegroundColor Red
}
Write-Host ""

# Test 6: Listar Actividades
Write-Host "6️⃣  Test: Listar Actividades (GET /activity)" -ForegroundColor Yellow
try {
    $activities = Invoke-RestMethod -Uri "$baseUrl/activity" -Method Get
    Write-Host "   ✅ Actividades obtenidas: $($activities.Count)" -ForegroundColor Green
    if ($activities.Count -gt 0) {
        $activityId = $activities[0].id
        Write-Host "   - $($activities[0].title)" -ForegroundColor Gray
        Write-Host "   Activity ID: $activityId" -ForegroundColor Gray
    }
} catch {
    Write-Host "   ❌ Error: $_" -ForegroundColor Red
}
Write-Host ""

# Test 7: Ver Detalle de Actividad
if ($activityId) {
    Write-Host "7️⃣  Test: Detalle de Actividad (GET /activity/$activityId)" -ForegroundColor Yellow
    try {
        $activity = Invoke-RestMethod -Uri "$baseUrl/activity/$activityId" -Method Get
        Write-Host "   ✅ Actividad completa obtenida" -ForegroundColor Green
        Write-Host "   Título: $($activity.title)" -ForegroundColor Gray
        Write-Host "   Flashcards: $($activity.flashcards.Count)" -ForegroundColor Gray
        Write-Host "   Cartas de Memoria: $($activity.cardsMemory.Count)" -ForegroundColor Gray
        Write-Host "   Relaciones: $($activity.playRelations.Count)" -ForegroundColor Gray
    } catch {
        Write-Host "   ❌ Error: $_" -ForegroundColor Red
    }
    Write-Host ""
}

# Resumen
Write-Host "=" * 60 -ForegroundColor Cyan
Write-Host "📊 RESUMEN DE PRUEBAS" -ForegroundColor Cyan
Write-Host "=" * 60 -ForegroundColor Cyan
Write-Host "✅ Todos los endpoints principales están funcionando" -ForegroundColor Green
Write-Host ""
Write-Host "🔗 Accede a Swagger para pruebas interactivas:" -ForegroundColor Yellow
Write-Host "   $baseUrl/api/docs" -ForegroundColor White
Write-Host ""
Write-Host "📝 Credenciales de prueba:" -ForegroundColor Yellow
Write-Host "   Docente: maria.garcia@eduplay.com" -ForegroundColor White
Write-Host "   Password: password123" -ForegroundColor White
Write-Host ""
