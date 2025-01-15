#!/bin/bash

# Inicia el servidor SQL en segundo plano
/opt/mssql/bin/sqlservr &

# Espera a que el servidor SQL esté disponible
echo "Esperando a que SQL Server inicie..."
sleep 25s

# Verifica la disponibilidad del servidor SQL y ejecuta los scripts SQL
until /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P $SA_PASSWORD -Q "SELECT 1" -C; do
    echo "Esperando a que SQL Server esté listo..."
    sleep 5s
done

echo "SQL Server está listo. Ejecutando scripts SQL..."

# Ejecuta los scripts SQL
/opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P $SA_PASSWORD -C -i /scripts/exportar_tabla_Control_Information.sql
/opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P $SA_PASSWORD -C -i /scripts/exportar_tabla_Control_Scripts.sql

echo "Scripts SQL ejecutados exitosamente."

# Mantiene el contenedor en ejecución
wait
