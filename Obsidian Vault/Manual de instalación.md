
---
> [!NOTE] Nota 
> Para que funcione correctamente la aplicación deben estar instaladas en el host los siguientes programas: 
> - **Python**: Versión 3.8 o superior
> - **Node.js**: Versión 20.0 o superior

---
# Instalación y despliegue **{Backend}**
  
### 1. Copiar contenido de la aplicación

- Crear carpeta para almacenar la aplicación.
- Copiar contenido del comprimido hacia la nueva carpeta destino.

## 2. Crear y activar entorno virtual

- Con **python** crea un entorno virtual para manejar y trabajar con el servidor de django

> [!DONE] En Windows:  
> ```sh
> # crear entorno virtual "venv" en carpeta raíz
> python -m venv venv
> # activar entorno virtual
> .\venv\Scripts\activate

> [!TIP] En Linux:
> ```sh 
> # crear entorno virtual "venv" en carpeta raíz
> python3 -m venv venv
> # activar entorno virtual
> source .\venv\bin\activate
## 3. Instalar dependencias

- Una vez activado el entorno virtual, instalar los requerimientos desde requirements.txt

```pip install -r requirements.txt```
## 4. Configurar base de datos

- En caso de necesitarse, realizar migraciones con los comandos siguientes:

```sh
# Windows
python manage.py migrate
# Linux
python3 manage.py migrate
```
## 5. Crear superusuario (opcional)

- Por defecto ya existirá el superusuario **admin/admin** en la base de datos (Siempre que se use la dada en el comprimido)
- Para crear otro superusuario, puede hacerlo desde el panel de administración en http://localhost:8000/admin o utilizando la terminal de comandos del sistema usando la siguiente línea: 

```sh
# Windows
python manage.py createsuperuser
# Linux
python3 manage.py createsuperuser
```
## 6. Ejecutar servidor de desarrollo

```sh
# Windows
python manage.py runserver
# Linux
python3 manage.py runserver
```

## 7. Verificar funcionamiento

- Abrir http://127.0.0.1:8000 o http://localhost:8000 en el navegador

- Comprobar que la aplicación funcione correctamente
---
# Instalación y despliegue **{Frontend}**
  
### 1. Copiar contenido de la aplicación

> [!WARNING] 
> Moverse a la carpeta *Frontend* si ya existe

- Crear carpeta para almacenar la aplicación.
- Copiar contenido del comprimido hacia la nueva carpeta destino.

### 2. Instalar dependencias

- Una vez dentro de la carpeta del servidor Frontend abra la terminal y ejecute el siguiente comando: 

```sh
npm install
```

*Esto instalará los módulos necesarios para que funcione correctamente el servidor Frontend. Esta es una acción que requiere conexión a internet en la terminal que se esté usando.*

### 3. Ejecutar servidor de desarrollo

- Una vez instalados los módulos correctamente, ejecutar el siguiente comando para iniciar el servidor Frontend: 

```sh
npm run dev
```

### 4. Verificar funcionamiento

- Abrir http://127.0.0.1:5173 o http://localhost:5173 en el navegador

- Comprobar que la aplicación funcione correctamente




