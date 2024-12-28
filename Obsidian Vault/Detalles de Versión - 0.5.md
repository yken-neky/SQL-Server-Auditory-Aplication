
---

> [!DONE] Añadidos:
### En esta versión: 

> Backend:

  1. Creación de clases de permisos basados en roles. 
	  1. El Rol es definido como un atributo del usuario.
	  2. Rol predeterminado -> cliente.
  2. Modificación de vistas y su permiso requerido para acceder a ella.
	  1. Listar todos los logs de conexiones al servidor de base de datos **ahora requiere** ser #administrador.
	  2. Listar logs de conexiones al servidor de bases de datos bajo el usuario autenticado **ahora requiere** ser #cliente y estar autenticado en el servidor.
	  3. Listar todos los logs de auditorías realizadas **ahora requiere** ser #administrador.
	  4. Listar los logs de auditorías realizadas por el usuario autenticado **ahora requiere** ser #cliente.
	  5. Ver detalles de una conexión al servidor de bases de datos **ahora requiere** ser #cliente y ser #dueño de esa conexión.
	  6. Ver detalles de una auditoría al servidor de bases de datos **ahora requiere** ser #cliente y ser el #dueño de esa auditoría.
	  7. Solo es posible **listar** logs. **Ningún rol puede** modificar, eliminar o crear un log de forma manual.
3. En ```
App/Backend/Connection_App/views.py``` se manejan ahora las vistas de conexión al servidor de bases de datos mediante un ViewSet. 
4. Corregidas las rutas de acceso a las vistas para mayor claridad.
5. Añadido módulo para documentar automáticamente las rutas de la API. **[CoreAPI]**
	- ```IP_Address:Port/api/docs/```


> [!ERROR] IMPORTANTE:
> Al parecer por algún cambio en el modelo de datos se eliminaron los controles existentes en la base de datos con su nuevo diseño de validación desde la consulta SQL. 

> [!TIP]
> Crear una salva de los scripts de los controles con el nuevo diseño de validación. 

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
  4.   Corregir Componentes de ruteo para la protección de rutas públicas y privadas para que no entre a la aplicación sin ningún usuario conectado. 
  5.   Crear panel de administración de la aplicación.

> Backend 

1.   Terminar de llenar controles de seguridad para SQL Server en la base de datos
2.   Una vez llena la base de datos, migrar su información a SQL Server

```
Tener en cuenta opción de migrar desde ahora el modelo y llenar la base de datos en ese nuevo servidor. 

Tener en cuenta el uso de contenedores de Docker. 
```
3.   Vistas para el panel de administración. || Terminar de implementar. 


