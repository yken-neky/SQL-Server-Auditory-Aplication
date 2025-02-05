
---
### Pasos a seguir para la correcta integración:

1. Crear la imagen de **sqlserver_custom** a partir del **Dockerfile** correspondiente.

```sh
docker build -t sqlserver_custom .
```

2. Crear y correr el contenedor. Asegurarse que la contraseña definida en el **Dockerfile** coincida con la definida en comando.

```dockerfile
# Asegurarse que la contraseña definida en esta línea del Dockerfile
ENV SA_PASSWORD=SQL.Server*1234
```

```sh
# es la misma que la escrita aquí
docker run -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=SQL.Server*1234' -p 1433:1433 --name sqlserver_custom -d sqlserver_custom
```

3.  Modificar las configuraciones del backend para trabajar con el servidor. 

```sh
# Instalar dependencias específicas *Supuestamente instaladas previamente*
pip install mssql-django 
```

```python 
# settings.py
DATABASES = {
    'default': {
        'ENGINE': 'mssql',
        'NAME': 'DjangoDatabase',
        'USER': 'sa',
        'PASSWORD': 'SQL.Server*1234',
        'HOST': 'localhost',
        'PORT': '1433',
        'OPTIONS': {
            'driver': 'ODBC Driver 18 for SQL Server',
            'TrustServerCertificate': 'yes',
            'Encrypt': 'no',  # Desactiva la encriptación para simplificar
            'extra_params': 'TrustServerCertificate=yes;Encrypt=no',
        },
    }
}
```

4. Realizar las migraciones correspondientes. 

```sh
# Realizar migraciones por orden de prioridad. 
# CustomUser debe migrarse primero para evitar conflictos en las relaciones
python manage.py makemigrations Users_App --name customuser_initial
python manage.py migrate Users_App 0001_customuser_initial

# luego realizar migraciones de todas las demás aplicaciones siguiendo esta sintáxis
python manage.py makemigrations <Nombre_Aplicación>
python manage.py migrate
```

5. Correr el servidor. 

```sh 
python manage.py runserver 8000
```

---

> [!TIP]
> Para modelos basados en tablas que existen en la base de datos:
> ```python 
> # añadir en el modelo correspondiente:
> class Meta:
> 	db_table = 'NombreTablaEnBaseDeDatos'
> 	managed = False



---

> **Dockerfile**

```dockerfile
# Usa la imagen oficial de SQL Server como base
FROM mcr.microsoft.com/mssql/server:2019-latest

# Cambia a usuario root para instalar paquetes
USER root

# Instala los mssql-tools y las dependencias necesarias
RUN apt-get update && apt-get install -y curl apt-transport-https gnupg && \
    curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add - && \
    curl https://packages.microsoft.com/config/ubuntu/20.04/prod.list > /etc/apt/sources.list.d/mssql-release.list && \
    apt-get update && ACCEPT_EULA=Y apt-get install -y msodbcsql18 mssql-tools18 unixodbc-dev && \
    echo 'export PATH="$PATH:/opt/mssql-tools18/bin"' >> ~/.bashrc && \
    /bin/bash -c "source ~/.bashrc"

# Cambia de nuevo al usuario mssql
USER mssql

# Configura las variables de entorno
ENV ACCEPT_EULA=Y
ENV SA_PASSWORD=SQL.Server*1234

# Copia los scripts SQL y el script de inicialización al contenedor
COPY ./scripts /scripts
COPY init-db.sh /usr/src/app/init-db.sh

USER root
# Haz el script ejecutable
RUN chmod +x /usr/src/app/init-db.sh

USER mssql

EXPOSE 1433

# Establece el comando por defecto para iniciar SQL Server y ejecutar el script
CMD /bin/bash /usr/src/app/init-db.sh
```

> init-db.sh

```sh
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
```

