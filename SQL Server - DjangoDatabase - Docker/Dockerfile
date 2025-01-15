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
