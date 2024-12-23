Puedes crear un contenedor personalizado usando la imagen oficial de SQL Server e incluir los comandos necesarios para crear y llenar las tablas con la información que necesitas. Para lograrlo, puedes seguir estos pasos:

### 1. Crear un archivo `Dockerfile`
Este archivo contendrá las instrucciones para construir la imagen de Docker personalizada basada en la imagen oficial de SQL Server.

```Dockerfile
# Usar la imagen oficial de SQL Server como base
FROM mcr.microsoft.com/mssql/server:2019-latest

# Configurar las variables de entorno necesarias
ENV ACCEPT_EULA=Y
ENV SA_PASSWORD=Your_password123

# Copiar el script de inicialización en el contenedor
COPY init-db.sh /usr/src/app/init-db.sh

# Dar permisos de ejecución al script de inicialización
RUN chmod +x /usr/src/app/init-db.sh

# Ejecutar el script de inicialización al iniciar el contenedor
CMD /bin/bash /usr/src/app/init-db.sh & /opt/mssql/bin/sqlservr
```

### 2. Crear el script `init-db.sh`
Este script se ejecutará al iniciar el contenedor y contendrá los comandos necesarios para crear y llenar las tablas con la información que necesitas.

```bash
#!/bin/bash
# Esperar a que SQL Server inicie
sleep 20s

# Ejecutar los comandos SQL para crear y llenar las tablas
/opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P 'Your_password123' -d master -i /usr/src/app/setup.sql
```

### 3. Crear el script `setup.sql`
Este archivo contendrá los comandos SQL para crear y llenar las tablas en la base de datos.

```sql
CREATE DATABASE MiBaseDeDatos;

USE MiBaseDeDatos;

CREATE TABLE MiTabla (
    ID INT PRIMARY KEY,
    Nombre NVARCHAR(50),
    Valor INT
);

INSERT INTO MiTabla (ID, Nombre, Valor) VALUES (1, 'Elemento1', 100);
INSERT INTO MiTabla (ID, Nombre, Valor) VALUES (2, 'Elemento2', 200);
```

### 4. Construir la imagen de Docker personalizada
Ejecuta el siguiente comando en el directorio donde se encuentran tus archivos `Dockerfile`, `init-db.sh`, y `setup.sql` para construir la imagen de Docker:

```bash
docker build -t mi-sqlserver .
```

### 5. Ejecutar el contenedor
Una vez construida la imagen, puedes ejecutar un contenedor basado en ella:

```bash
docker run -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=Your_password123' -p 1433:1433 --name mi-sqlserver -d mi-sqlserver
```

### Resumen
- **Dockerfile**: Define la imagen personalizada y copia el script de inicialización.
- **init-db.sh**: Espera a que SQL Server inicie y luego ejecuta los comandos SQL.
- **setup.sql**: Contiene los comandos SQL para crear y llenar las tablas.
- **Construcción y ejecución**: Usa los comandos `docker build` y `docker run` para construir y ejecutar el contenedor.

De esta manera, al iniciar el contenedor, se ejecutarán los comandos necesarios para crear y llenar las tablas con la información necesaria.