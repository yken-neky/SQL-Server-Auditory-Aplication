
---
> [!DONE] Añadidos:
### En esta versión: 

> Solo se realizaron cambios en el Frontend

  1.  Páginas de Login, Register, Profile y Dashboard
  2.  Conexiones de Frontend con Backend implementadas bajo los endpoints:

> [!NOTE] log-rep.api.js 
> Archivo para manejar las conexiones con el backend

	- POST /users/register/ para registrar usuarios.
	- POST /users/login/ para iniciar sesión.
	- GET  /users/profile/ para obtener el perfil del usuario autenticado.
	- POST /users/logout/ para cerrar sesión.

  3.  Se añadieron todas las funciones básicas de la aplicación:

	- Contexto de autenticación para el manejo de las solicitudes que requieran enviar en su cabecera la información del Token de autenticación.
	- Componentes de protección de rutas:
	1. PROTECTED_ROUTE
	2. PUBLIC_ROUTE

4.   Creación de plantilla para las diferentes vistas dentro de la aplicación web. Dicha plantilla **(Layout)** cuenta con:

	- Barra de navegación superior
	- Menu lateral
	- Pie de página




--- 
> [!WARNING] Pendientes: 

### En esta versión: 

> Frontend

  1.   Corregir botones de página inicial Dashboard.
  2.   Agregar páginas para las demás vistas sobre los demás **endpoints** del backend:
	  - Inicio de sesión en SQL Server.
	  - Realización de controles
	  - Ver resultado de ejecución de controles
  3.   Manejar posibles errores de autenticación desde el Frontend

> Backend 

1.   Terminar de llenar controles de seguridad para SQL Server en la base de datos
2.   Una vez llena la base de datos, migrar su información a SQL Server

```
Tener en cuenta opción de migrar desde ahora el modelo y llenar la base de datos en ese nuevo servidor. 

Tener en cuenta el uso de contenedores de Docker. 
```

3.  En una versión más futura implementar mecanismo de control por roles y crear API para gestión del contenido de las bases de datos y la aplicación en general desde un panel de administrador propio.


