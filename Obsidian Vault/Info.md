# SQL Server App

# Autor: Yan Luis González Palomo

# Obsidian Vault 

> [!IMPORTANT]
> Para mayor manejo de la documentación, instalar Obsidian y abrir la aplicación en la bóveda de este repositorio.
> Así se tendrá más accesibilidad a la nueva información

---

# Instalación y despliegue

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

## 4. Configurar base de datos
- Crear base de datos si es necesario
- Ejecutar migraciones
```python manage.py migrate```

## 5. Crear superusuario (opcional)
```python manage.py createsuperuser```

## 6. Ejecutar servidor de desarrollo
```python manage.py runserver```

## 7. Verificar funcionamiento
- Abrir http://127.0.0.1:8000 o http://localhost:8000 en el navegador
- Comprobar que la aplicación funcione correctamente

# Requisitos Funcionales (actualizar)

### Sistema de gestión de usuarios

### Dashboard general de usuario
- Mostrar información general del estado de la cuenta del usuario y qué operaciones ha realizado.<br/>
- Permitir conectarse a un servidor de bases de datos, seleccionando de manera previa su sistema y versión.

### Log-in-to SGBD
- Inicio de sesión bajo el método de autenticación de SQL Server.

### Dashboard del Servidor de bases de datos
- Se debe mostrar información asociada a las acciones realizadas por ese usuario en ese servidor.

### Ejecución de auditoría de configuraciones de seguridad y buenas prácticas
- Ejecutar controles al servidor de bases de datos mediante su lógica de implementación dependiendo del gestor.<br/>
- Ejecutar un control, varios o todos los controles a la vez.  

### Informe de auditoría
- El informe debe contener información específica y detallada de cada control, dígase descripción, impacto, solución, alternativas de solución en caso de existir, referencias, algún otro detalle importante que sea precisado.<br/>
- En el informe se dejará constancia de el cumplimiento asociado a cada control realizado durante la auditoría, así como una relación total de controles correctos sobre controles ejecutados.<br/>
- Generar un documento PDF del informe.

## Estructura de las tablas principales 

(Vacío)

# En desarrollo ... 
