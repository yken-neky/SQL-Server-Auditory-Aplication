
---

> [!DONE] Añadidos:

### En esta versión:

> Backend: 

1. Funciones para **actualizar** información del usuario, **cambiar contraseña** y **eliminar cuenta**.
	- No se elimina la cuenta, se desactiva. 
	- Vistas de usuario común.

> Frontend: 

1. Modificada la lógica de obtención de los datos del usuario lográndolo a nivel global de la aplicación y no por partes. 
	- Se pasa el usuario gracias al contexto y entonces se usa ese usuario en los componentes.
2. Modificada estética de páginas de: 
	- Iniciar sesión.
	- Registrar usuario.

---

> [!WARNING] Pendientes: 

> Backend:

1. Crear vistas para las funciones de administrador.
2. Implementar *middleware* para manejar peticiones erróneas.
	- Buscar eliminar la devolución de códigos de error en momentos de error de la aplicación.
	- Aumentar medidas de seguridad.
3. Pendientes de [[Detalles de Versión - 0.6]]

> Frontend:

1. Crear páginas para las funciones de **cambiar contraseña** y **eliminar cuenta**
2. Crear página de inicio de sesión en SQL Server.
	- Todas las páginas para dentro de SQL Server. 
3. Pendientes de [[Detalles de Versión - 0.6]]

