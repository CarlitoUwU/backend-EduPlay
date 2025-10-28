# 🚀 Script de Setup Automatizado - Backend EduPlay
# Este script configura todo el proyecto automáticamente

Write-Host "🎓 Iniciando setup de Backend EduPlay..." -ForegroundColor Cyan
Write-Host ""

# Verificar que estamos en el directorio correcto
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Error: No se encuentra package.json" -ForegroundColor Red
    Write-Host "   Por favor ejecuta este script desde la raíz del proyecto" -ForegroundColor Yellow
    exit 1
}

# 1. Verificar que Docker esté corriendo
Write-Host "📦 Verificando Docker..." -ForegroundColor Yellow
try {
    docker ps | Out-Null
    Write-Host "✅ Docker está corriendo" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker no está corriendo. Por favor inicia Docker Desktop" -ForegroundColor Red
    exit 1
}

# 2. Verificar si existe .env
Write-Host ""
Write-Host "📝 Verificando archivo .env..." -ForegroundColor Yellow
if (-not (Test-Path ".env")) {
    if (Test-Path ".env.example") {
        Write-Host "📋 Copiando .env.example a .env..." -ForegroundColor Cyan
        Copy-Item .env.example .env
        Write-Host "✅ Archivo .env creado" -ForegroundColor Green
    } else {
        Write-Host "⚠️  No existe .env ni .env.example" -ForegroundColor Yellow
        Write-Host "   Necesitas crear un archivo .env manualmente" -ForegroundColor Yellow
        exit 1
    }
} else {
    Write-Host "✅ Archivo .env existe" -ForegroundColor Green
}

# 3. Instalar dependencias de Node.js
Write-Host ""
Write-Host "📦 Instalando dependencias de Node.js..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error al instalar dependencias" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Dependencias instaladas" -ForegroundColor Green

# 4. Levantar servicios Docker
Write-Host ""
Write-Host "🐳 Levantando servicios Docker..." -ForegroundColor Yellow
docker-compose up -d
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error al levantar Docker services" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Servicios Docker iniciados" -ForegroundColor Green

# Esperar a que PostgreSQL esté listo
Write-Host ""
Write-Host "⏳ Esperando a que PostgreSQL esté listo..." -ForegroundColor Yellow
$maxRetries = 30
$retryCount = 0
$isReady = $false

while (-not $isReady -and $retryCount -lt $maxRetries) {
    $retryCount++
    Write-Host "   Intento $retryCount/$maxRetries..." -ForegroundColor Cyan
    
    $result = docker exec postgres_eduplay pg_isready -U postgres 2>&1
    if ($LASTEXITCODE -eq 0) {
        $isReady = $true
        Write-Host "✅ PostgreSQL está listo!" -ForegroundColor Green
    } else {
        Start-Sleep -Seconds 2
    }
}

if (-not $isReady) {
    Write-Host "❌ PostgreSQL no respondió después de 60 segundos" -ForegroundColor Red
    Write-Host "   Verifica los logs: docker logs postgres_eduplay" -ForegroundColor Yellow
    exit 1
}

# 5. CRÍTICO: Generar Prisma Client PRIMERO
Write-Host ""
Write-Host "🔧 Generando Prisma Client (CRÍTICO)..." -ForegroundColor Yellow

# Limpiar Prisma Client antiguo para evitar errores de cache
if (Test-Path "node_modules\.prisma") {
    Write-Host "   Limpiando Prisma Client antiguo..." -ForegroundColor Cyan
    Remove-Item -Recurse -Force node_modules\.prisma -ErrorAction SilentlyContinue
    Remove-Item -Recurse -Force node_modules\@prisma\client -ErrorAction SilentlyContinue
}

npx prisma generate
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error al generar Prisma Client" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Prisma Client generado correctamente" -ForegroundColor Green

# 6. Aplicar migraciones
Write-Host ""
Write-Host "🗄️  Aplicando migraciones de base de datos..." -ForegroundColor Yellow
npx prisma migrate deploy
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error al aplicar migraciones" -ForegroundColor Red
    Write-Host "   Verifica que PostgreSQL esté corriendo: docker ps" -ForegroundColor Yellow
    exit 1
}
Write-Host "✅ Migraciones aplicadas" -ForegroundColor Green

# 7. Ejecutar seed
Write-Host ""
Write-Host "🌱 Poblando base de datos con datos de prueba..." -ForegroundColor Yellow
npm run seed
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error al ejecutar seed" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Base de datos poblada con datos de prueba" -ForegroundColor Green

# 8. Descargar modelo Ollama (en background)
Write-Host ""
Write-Host "🤖 Descargando modelo Ollama phi3 (esto puede tardar)..." -ForegroundColor Yellow
Write-Host "   Puedes continuar con otros pasos mientras se descarga" -ForegroundColor Cyan
Start-Job -ScriptBlock {
    docker exec ollama ollama pull phi3
}

# Resumen final
Write-Host ""
Write-Host "════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "✅ ¡Setup completado exitosamente!" -ForegroundColor Green
Write-Host "════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
Write-Host "📌 Servicios disponibles:" -ForegroundColor Yellow
Write-Host "   • Backend NestJS:    http://localhost:3000" -ForegroundColor White
Write-Host "   • Swagger API Docs:  http://localhost:3000/api" -ForegroundColor White
Write-Host "   • n8n UI:            http://localhost:5678" -ForegroundColor White
Write-Host "   • PostgreSQL:        localhost:5432" -ForegroundColor White
Write-Host "   • Ollama:            http://localhost:11434" -ForegroundColor White
Write-Host ""
Write-Host "🔐 Credenciales de prueba:" -ForegroundColor Yellow
Write-Host "   Profesor:  carlos.gomez@eduplay.com / password123" -ForegroundColor White
Write-Host "   Estudiante 1: jose.rodriguez@eduplay.com / password123" -ForegroundColor White
Write-Host "   Estudiante 2: ana.martinez@eduplay.com / password123" -ForegroundColor White
Write-Host ""
Write-Host "🚀 Para iniciar el backend, ejecuta:" -ForegroundColor Yellow
Write-Host "   npm run start:dev" -ForegroundColor Cyan
Write-Host ""
Write-Host "📚 Documentación adicional:" -ForegroundColor Yellow
Write-Host "   • README.md - Visión general del proyecto" -ForegroundColor White
Write-Host "   • DEPLOYMENT.md - Guía de despliegue detallada" -ForegroundColor White
Write-Host "   • TESTING_GUIDE.md - Guía de testing" -ForegroundColor White
Write-Host ""
