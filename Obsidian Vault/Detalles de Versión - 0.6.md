
---

> [!DONE] Añadidos

### En esta versión: 

> Solo se trabajó en el Frontend haciendo énfasis en los estilos y la propiedad responsive de la aplicación.

1. Ahora el componente **Layout** es el que maneja los datos del usuario y mediante un contexto de usuario (**UserContext**) recientemente implementado se le pasa a cada uno de los demás componentes hijos los datos correspondientes del usuario autenticado. 

> [!ERROR] Todos los demás cambios fueron estéticos. 

---

> [!WARNING] Pendintes


### Frontend

1. Seguir desarrollando las demás vistas de la aplicación, actualmente faltan: 
	- Vista de inicio de sesión en SQL Server 
	- Todas las vistas de SQL Server
2. Modificar las páginas existentes para que tomen los datos necesarios y reales del backend y los muestren correctamente
3. Crear páginas para roles específicos
4. Crear páginas de acceso denegado y demás pantallas de error. 

### Backend

1. Implementar vistas de Editar perfil, cambiar contraseña y eliminar perfil 
2. Crear campo para foto de perfil en la tabla de usuarios de la base de datos de la aplicación
3. Todo lo pendiente relacionado al backend propuesto en la [[Detalles de Versión - 0.5.1]]