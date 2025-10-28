#!/bin/bash
set -e

# Script para crear múltiples bases de datos en PostgreSQL

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    -- Crear base de datos para n8n
    CREATE DATABASE n8n;
    GRANT ALL PRIVILEGES ON DATABASE n8n TO postgres;

    -- Crear base de datos para EduPlay backend
    CREATE DATABASE eduplay;
    GRANT ALL PRIVILEGES ON DATABASE eduplay TO postgres;

    -- Listar las bases de datos creadas
    \l
EOSQL

echo "✅ Bases de datos 'n8n' y 'eduplay' creadas exitosamente"
