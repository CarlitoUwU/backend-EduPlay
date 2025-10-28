# 🐛 Troubleshooting - EduPlay Backend

Guía de solución de problemas comunes durante desarrollo y despliegue.

---

## 🐳 Docker y Servicios

### Docker no inicia

```powershell
# Limpiar contenedores y volúmenes
docker-compose down -v

# Reiniciar Docker Desktop
# Cerrar y abrir Docker Desktop

# Verificar recursos disponibles
docker system df

# Limpiar sistema (CUIDADO: elimina todo)
docker system prune -a --volumes
```

### Contenedor PostgreSQL no inicia

```powershell
# Ver logs detallados
docker logs postgres_eduplay -f

# Verificar puerto 5432 libre
netstat -ano | findstr :5432

# Si está ocupado, detener proceso o cambiar puerto en docker-compose.yml

# Eliminar volumen corrupto
docker-compose down -v
docker volume rm backend-eduplay_postgres_data
docker-compose up -d postgres_eduplay
```

### n8n no responde

```powershell
# Ver logs
docker logs n8n -f

# Reiniciar servicio
docker restart n8n

# Verificar puerto 5678
Test-NetConnection -ComputerName localhost -Port 5678

# Acceso con navegador
Start-Process http://localhost:5678
# User: admin, Pass: admin123
```

### Ollama no carga el modelo

```powershell
# Ver logs de descarga
docker logs ollama -f

# Verificar espacio en disco (modelo requiere ~2GB)
docker exec ollama df -h

# Listar modelos instalados
docker exec ollama ollama list

# Re-descargar modelo
docker exec ollama ollama rm gemma2:2b
docker exec -it ollama ollama pull gemma2:2b

# Verificar que descargó correctamente
docker exec ollama ollama list | findstr gemma2
```

---

## 🗄️ Base de Datos

### Error de conexión a PostgreSQL

```powershell
# 1. Verificar que el contenedor esté corriendo
docker ps | findstr postgres

# 2. Verificar variables de entorno en .env
Get-Content .env | Select-String "DATABASE_URL"

# 3. Test de conexión directa
docker exec -it postgres_eduplay psql -U eduplay_user -d eduplay_db -c "\conninfo"

# 4. Reiniciar contenedor
docker restart postgres_eduplay
```

### Prisma Client no actualizado

```powershell
# Regenerar cliente después de cambios en schema.prisma
npx prisma generate

# Verificar que se generó
Get-ChildItem node_modules\.prisma\client

# Si persiste, limpiar y regenerar
Remove-Item -Recurse -Force node_modules\.prisma
npx prisma generate
```

### Migraciones fallan

```powershell
# Ver estado de migraciones
npx prisma migrate status

# Resolver migraciones pendientes
npx prisma migrate resolve --applied "MIGRATION_NAME"

# Reset completo (CUIDADO: elimina datos)
npx prisma migrate reset

# Crear migración limpia desde schema actual
npx prisma migrate dev --name init
```

### "Relation does not exist" error

```powershell
# Aplicar todas las migraciones
npx prisma migrate deploy

# Si persiste, reset de base de datos
docker-compose down -v
docker-compose up -d postgres_eduplay
npx prisma migrate deploy
npm run seed
```

---

## 🤖 Workflows n8n

### Workflows no aparecen en n8n

```powershell
# Importar workflows manualmente
# 1. Ir a http://localhost:5678
# 2. Login: admin / admin123
# 3. Workflows → Import from File
# 4. Seleccionar: n8n-workflows/all-workflows.json
# 5. Activar cada workflow (toggle verde)
```

### Webhook no responde

```powershell
# 1. Verificar workflow está activo
# En n8n UI: toggle debe estar verde

# 2. Ver logs de n8n
docker logs n8n -f

# 3. Test directo al webhook
Invoke-RestMethod -Uri "http://localhost:5678/webhook/generate-content" `
  -Method POST `
  -Body '{"topic":"test"}' `
  -ContentType "application/json"

# 4. Reiniciar n8n
docker restart n8n
```

### Ollama no responde desde n8n

```powershell
# 1. Verificar que Ollama está en la misma red Docker
docker network inspect n8n_network

# 2. Test de conectividad desde n8n
docker exec n8n curl http://ollama:11434/api/tags

# 3. Si falla, recrear red
docker-compose down
docker-compose up -d
```

### Respuestas de IA muy lentas

```powershell
# 1. Verificar recursos de Docker
docker stats ollama

# 2. Ollama necesita mínimo 4GB RAM
# Ir a Docker Desktop → Settings → Resources
# Asignar al menos 6GB RAM

# 3. Verificar modelo ligero
docker exec ollama ollama list
# gemma2:2b (1.6GB) es más rápido que phi3 (2.3GB)

# 4. Reducir num_predict en workflows n8n
# En n8n: HTTP Request node → options.num_predict = 150 (más rápido)
```

---

## 🔧 Backend NestJS

### Puerto 3000 ocupado

```powershell
# Ver qué proceso usa el puerto
netstat -ano | findstr :3000

# Terminar proceso (reemplazar PID)
taskkill /PID 12345 /F

# O cambiar puerto en main.ts
# const port = process.env.PORT || 3001;
```

### "Cannot find module" error

```powershell
# Reinstalar dependencias
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install

# Verificar que TypeScript compila
npm run build
```

### JWT "invalid token" error

```powershell
# 1. Verificar JWT_SECRET en .env
Get-Content .env | Select-String "JWT_SECRET"

# 2. Generar nuevo token desde login
Invoke-RestMethod -Uri "http://localhost:3000/auth/login" `
  -Method POST `
  -Body '{"email":"admin@eduplay.com","password":"admin123"}' `
  -ContentType "application/json"

# 3. Usar token fresco en headers
# Authorization: Bearer NEW_TOKEN
```

### Seed data falla

```powershell
# 1. Verificar base de datos limpia
npx prisma migrate reset

# 2. Re-ejecutar seed
npm run seed

# 3. Ver errores detallados
node --trace-warnings prisma/seed.ts
```

---

## 🧪 Testing

### Tests E2E fallan

```powershell
# 1. Asegurar que backend NO esté corriendo
# Ctrl+C en terminal de npm run start:dev

# 2. Tests usan base de datos separada
# Verificar TEST_DATABASE_URL en .env

# 3. Limpiar y ejecutar
npm run test:e2e

# 4. Ver test específico
npm run test:e2e -- --testNamePattern="Activity"
```

### "Cannot connect to test database"

```powershell
# Crear base de datos de test manualmente
docker exec -it postgres_eduplay psql -U eduplay_user -c "CREATE DATABASE eduplay_test;"

# Aplicar migraciones a test DB
DATABASE_URL="postgresql://eduplay_user:eduplay_password@localhost:5432/eduplay_test" npx prisma migrate deploy
```

---

## 🌐 Red y Conectividad

### Backend no responde externamente

```powershell
# Verificar firewall de Windows
netsh advfirewall firewall add rule name="NestJS" dir=in action=allow protocol=TCP localport=3000

# Verificar IP local
ipconfig | Select-String "IPv4"

# Backend debe escuchar en 0.0.0.0, no 127.0.0.1
# En main.ts: await app.listen(3000, '0.0.0.0');
```

### CORS error desde frontend

```typescript
// En main.ts, configurar CORS
app.enableCors({
  origin: ['http://localhost:3001', 'http://localhost:4200'],
  credentials: true,
});
```

---

## 💾 Rendimiento

### Backend lento

```powershell
# 1. Verificar queries N+1 en Prisma
# Usar include/select para cargar relaciones

# 2. Habilitar logs de Prisma
# En prisma.service.ts:
# log: ['query', 'info', 'warn', 'error']

# 3. Ver queries lentas
docker exec postgres_eduplay psql -U eduplay_user -d eduplay_db -c "
  SELECT query, mean_exec_time 
  FROM pg_stat_statements 
  ORDER BY mean_exec_time DESC 
  LIMIT 10;"

# 4. Agregar índices necesarios
# En schema.prisma: @@index([field])
```

### Memoria alta en Docker

```powershell
# Ver consumo
docker stats --no-stream

# Limitar memoria de Ollama en docker-compose.yml
# deploy:
#   resources:
#     limits:
#       memory: 4G

# Reiniciar con límites
docker-compose down
docker-compose up -d
```

---

## 🔄 Reset Completo

Si nada funciona, reset completo del proyecto:

```powershell
# 1. Detener y eliminar todo Docker
docker-compose down -v
docker volume prune -f

# 2. Limpiar Node.js
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json

# 3. Reinstalar
npm install
npx prisma generate

# 4. Reiniciar Docker
docker-compose up -d

# 5. Esperar a Ollama (logs hasta ver "success")
docker logs ollama -f

# 6. Configurar base de datos
npx prisma migrate deploy
npm run seed

# 7. Importar workflows n8n
# http://localhost:5678 → Import → n8n-workflows/all-workflows.json

# 8. Iniciar backend
npm run start:dev
```

---

## 📞 Soporte

### Logs útiles para reportar bugs

```powershell
# Backend logs
npm run start:dev > logs/backend.log 2>&1

# Docker logs
docker-compose logs > logs/docker.log

# n8n logs
docker logs n8n > logs/n8n.log 2>&1

# Ollama logs
docker logs ollama > logs/ollama.log 2>&1

# Comprimir logs
Compress-Archive -Path logs/ -DestinationPath logs.zip
```

### Información del sistema

```powershell
# Versiones instaladas
node --version
npm --version
docker --version
docker-compose --version

# Recursos de Docker
docker info | Select-String "CPUs|Total Memory"

# Espacio en disco
Get-PSDrive C | Select-Object Used,Free
```

---

## 📚 Recursos Adicionales

- **Documentación NestJS**: https://docs.nestjs.com
- **Documentación Prisma**: https://www.prisma.io/docs
- **Documentación n8n**: https://docs.n8n.io
- **Documentación Ollama**: https://ollama.ai/docs

- **Issues del proyecto**: https://github.com/CarlitoUwU/backend-EduPlay/issues
- **Discusiones**: https://github.com/CarlitoUwU/backend-EduPlay/discussions

---

**🛠️ Si el problema persiste, abre un issue en GitHub con los logs relevantes.**
