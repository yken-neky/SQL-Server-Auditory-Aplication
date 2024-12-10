# Activar proyecto Django en una nueva computadora

## 1. Clonar el repositorio
- Clonar el repositorio del proyecto desde GitHub/GitLab a la nueva computadora
```git clone <url-repositorio>```

## 2. Crear y activar entorno virtual
- Crear nuevo entorno virtual
```python -m venv venv```

- Activar el entorno virtual
  - Windows: ```venv\Scripts\activate```
  - Linux/Mac: ```source venv/bin/activate```

## 3. Instalar dependencias
- Instalar los requerimientos desde requirements.txt
```pip install -r requirements.txt```

## 4. Configurar variables de entorno
- Crear archivo .env en la raíz del proyecto
- Copiar variables necesarias del .env.example
- Configurar valores de las variables de entorno

## 5. Configurar base de datos
- Crear base de datos si es necesario
- Ejecutar migraciones
```python manage.py migrate```

## 6. Crear superusuario (opcional)
```python manage.py createsuperuser```

## 7. Ejecutar servidor de desarrollo
```python manage.py runserver```

## 8. Verificar funcionamiento
- Abrir http://127.0.0.1:8000 en el navegador
- Comprobar que la aplicación funcione correctamente
