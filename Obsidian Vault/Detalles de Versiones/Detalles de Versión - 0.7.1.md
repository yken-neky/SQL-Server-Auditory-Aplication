
----
# En esta versión: 

> [!DONE] Añadidos: 

### Backend: 
1. ViewSet para la información del dashboard. 
	1. Auditorías realizadas por usuario
	2. Conexiones realizadas por usuario
	3. Porcentaje de criticidad de la última auditoría
2. Campo *type* en el modelo de *AuditoryLog* para filtrar por tipo de auditorías. 

### Frontend: 
1. Completada página dashboard inicial
2. Reajuste en la plantilla

> [!WARNING] En la versión 0.7
> Versión no documentada. Se modificó la lógica de permisos para acceder a las diferentes vistas. Antes estaba basado en cookies en el lado del servidor. Ahora esa lógica de permisos se basa en si existe o no una conexión activa bajo el usuario que intenta acceder a una vista que no debe (por la parte del backend) y con un sistema de cookies para permitir acceso a las diferentes páginas (por parte del frontend).

---
# Pendiente a implementar: 

> Backend

1. Abordar temas de vulnerabilidades y/o criticidad por resultado de control. 
2. ViewSet para dashboard de OnService filtrando sus vistas al servidor autenticado + usuario autenticado en servicio

> Frontend

1. Página de lista completa de registros (Conexiones y auditorías)
2. Página para ver detalles de registros
3. Formulario para ejecución de las auditorías
4. Plantilla de OnService con las opciones únicas de OnService 
5. Dashboard de OnService con sus opciones propias para el servidor autenticado
6. Página de visualización de resultados de auditoría completa

