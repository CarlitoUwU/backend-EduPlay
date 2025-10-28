# 🧪 Guía de Pruebas - Backend EduPlay

## 📋 Credenciales de Acceso

### Docente
- **Email:** `maria.garcia@eduplay.com`
- **Password:** `password123`

### Estudiantes
1. **José Rodríguez**
   - Email: `jose.rodriguez@eduplay.com`
   - Password: `password123`

2. **Ana Martínez**
   - Email: `ana.martinez@eduplay.com`
   - Password: `password123`

---

## 🔗 URLs Importantes

- **Swagger UI:** http://localhost:3000/api/docs
- **API Base URL:** http://localhost:3000

---

## 🧪 Flujo de Pruebas Sugerido

### 1. Autenticación (Login)

#### Endpoint: `POST /auth/login`

**Request Body (Docente):**
```json
{
  "email": "maria.garcia@eduplay.com",
  "password": "password123"
}
```

**Respuesta Esperada:**
```json
{
  "user": {
    "id": "uuid-generado",
    "full_name": "María García",
    "email": "maria.garcia@eduplay.com",
    "role": "TEACHER"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 2. Listar Cursos

#### Endpoint: `GET /course`

**Respuesta Esperada:** Array con cursos (Historia del Perú, Matemáticas, Comunicación, Ciencias Naturales)

---

### 3. Listar Aulas

#### Endpoint: `GET /classroom`

**Respuesta Esperada:** Array con al menos "5to Grado A"

---

### 4. Listar Enrollments

#### Endpoint: `GET /enrollment`

**Respuesta Esperada:** Array con enrollments que incluyen información de teacher, classroom y course

**Filtrar por docente:**
```
GET /enrollment?teacherId={teacher_id}
```

---

### 5. Listar Actividades

#### Endpoint: `GET /activity`

**Respuesta Esperada:** Array con al menos la actividad "La Colonia en Perú (1532-1821)"

**Filtrar por enrollment:**
```
GET /activity?enrollmentId={enrollment_id}
```

---

### 6. Ver Detalle de Actividad

#### Endpoint: `GET /activity/{id}`

**Respuesta Esperada:** Objeto completo con:
- Información básica de la actividad
- Flashcards (3 creadas)
- Cartas de memoria (2 pares)
- Relaciones de juego (3 relaciones)
- Información del enrollment, curso, aula y docente

---

### 7. Crear Nueva Actividad

#### Endpoint: `POST /activity`

**Request Body:**
```json
{
  "title": "El Imperio Inca",
  "description": "Exploraremos la organización política, social y económica del Imperio Inca",
  "hasIntroduction": true,
  "enrollment_id": "{copiar-id-del-enrollment-existente}",
  "start_time": "2025-10-29T09:00:00Z",
  "end_time": "2025-10-29T11:00:00Z"
}
```

---

### 8. Actualizar Actividad

#### Endpoint: `PATCH /activity/{id}`

**Request Body (ejemplo):**
```json
{
  "title": "La Colonia en Perú - Actualizado",
  "hasIntroduction": false
}
```

---

### 9. Crear Enrollment

#### Endpoint: `POST /enrollment`

**Request Body:**
```json
{
  "teacher_id": "{id-del-docente}",
  "classroom_id": "{id-del-aula}",
  "course_id": "{id-del-curso}"
}
```

---

## ✅ Verificaciones Exitosas

Deberías poder:

1. ✅ **Login** con cualquiera de las 3 cuentas
2. ✅ **Listar** todos los recursos (courses, classrooms, enrollments, activities)
3. ✅ **Ver detalle** de una actividad con todo su contenido
4. ✅ **Crear** nuevas actividades asignadas a un enrollment
5. ✅ **Actualizar** actividades existentes
6. ✅ **Eliminar** actividades (DELETE /activity/{id})

---

## 🔍 Datos Precargados

### Cursos
- Historia del Perú
- Matemáticas
- Comunicación
- Ciencias Naturales

### Aula
- 5to Grado A (con 2 estudiantes)

### Actividad Completa
**"La Colonia en Perú (1532-1821)"** incluye:
- 3 Flashcards
- 2 Pares de cartas de memoria
- 3 Relaciones de juego
- 2 Interacciones de estudiantes registradas

---

## 🎯 Próximos Pasos

Una vez que verifiques que todo funciona:

1. **Módulo Student** - Endpoints para que estudiantes vean sus actividades
2. **Módulo Teacher** - Dashboard con estadísticas
3. **Módulo Interaction** - Registrar emociones y engagement
4. **Módulo AI/n8n** - Generar contenido con IA

---

## 🐛 Troubleshooting

### Error de conexión a BD
```bash
docker ps  # Verificar que postgres_n8n esté corriendo
docker-compose up -d postgres  # Si no está corriendo
```

### Servidor no responde
```bash
# Verificar que el servidor esté corriendo
# Terminal debe mostrar: "Nest application successfully started"
```

### Datos no aparecen
```bash
npm run seed  # Volver a ejecutar el seed
```

---

## 📚 Recursos

- **Swagger UI:** Documentación interactiva completa
- **Prisma Studio:** `npx prisma studio` para ver la base de datos visualmente
