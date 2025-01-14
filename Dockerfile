# Usa la imagen oficial de Python como base
FROM python:3.11-slim

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el archivo de requisitos y lo instala
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copia todo el contenido del proyecto en el contenedor
COPY ./App /app

# Exponer el puerto en el que Django correrá
EXPOSE 8000

# Define el comando por defecto para correr el servidor de desarrollo de Django
CMD ["sh", "-c", "cd /app/App/Backend && python manage.py runserver 0.0.0.0:8000"]
