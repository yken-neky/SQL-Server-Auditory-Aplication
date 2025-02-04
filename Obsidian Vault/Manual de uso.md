
---
> Preguntas frecuentes
### ¿ Qué es ? 

La aplicación en cuestión intenta ser una herramienta web intuitiva para auditorías de seguridad a diferentes tipos de tecnologías. Hasta esta versión solo se ha implementado el servicio de auditoría hacia sistemas gestores de bases de datos como por ejemplo, y en su caso específico, **Microsoft SQL Server**. 

### ¿ Qué hace ? 

Permite al *usuario registrado* en la aplicación **acceder a los servicios de auditoría** disponibles y hacer uso de ellos, así como ver su historial de uso dentro de cada servicio y directamente sobre la aplicación. En un futuro será posible la comparación de auditorías realizadas y la exportación de los reportes de estas como documento legible. 

### ¿ Cómo funciona ?

Para acceder a la aplicación es necesario estar registrado dentro de ella. Debe crearse una cuenta (registrarse) antes de poder acceder a la aplicación. Si se tiene una cuenta registrada basta con solo iniciar sesión utilizando las credenciales correspondientes.

Una vez dentro, se podrá acceder a la información del perfil así como editarla, cambiar la contraseña y eliminar la cuenta del sistema. 

Para acceder a los servicios de auditoría es necesario que:
- El usuario se encuentre en la misma red que la tecnología a auditar.
- Las configuraciones de red en la tecnología a auditar no estén bloqueando la conexión remota de la aplicación a ella. 
- El usuario cuente con una credencial de administración en la tecnología que auditará (en caso de necesitarse).

Dentro de los servicios, el usuario **NO PUEDE** acceder a las páginas de fuera del servicio hasta cerrar sesión en el mismo.

Usar la interfaz de la aplicación web para realizar las auditorías y consumir las otras funcionalidades de la aplicación. 

---
# Documentación de ENDPOINTS

La aplicación cuenta con 4 aplicaciones esenciales:
1. **Users_App**: encargada de toda la gestión de usuarios dentro de la aplicación.
2. **Connecting_App**: encargada de toda la lógica de conexión hacia el servicio.
3. **Inside_App**: encargada de toda la lógica de funcionamiento de la aplicación dentro de los servicios.
4. **Logs_App**: encargada de guardar registros sobre todas las acciones que el usuario (cliente o administrador) ejecute dentro de la aplicación a nivel general (tanto dentro como fuera de los servicios)

Cada aplicación cuenta con **endpoints** para consumir las funcionalidades que brinda. 

## ENDPOINTS POR APLICACIÓN:

> Sin contar con los **endpoints** de inicio de sesión y registro, todos los demás están protegidos con un sistema de autorización por Tokens
 
### 1. Users_App

Controlados por un único **ViewSet** y bajo estas configuraciones:

```python
router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')

urlpatterns = [
    path('api/', include(router.urls)),
]
```

Las *URL* de los **endpoints** son: 
- **POST api/users/register/** para registrar usuarios.
> Se espera un JSON bajo la siguiente estructura: 
> ```json
> {
> 	"username":"",
> 	"email":"",
> 	"password":"",
> 	"confirm_password":""
> }
- **POST api/users/login/** para iniciar sesión.
> Se espera un JSON bajo la siguiente estructura: 
> ```json
> {
> 	"username":"",
> 	"password":""
> }
- **GET  api/users/profile/** para obtener el perfil del usuario autenticado.
- **POST api/users/logout/** para cerrar sesión.
> No espera JSON
- **PUT api/users/update_profile/** para editar perfil de usuario.
> Se espera un JSON (en caso de ser cliente) bajo la siguiente estructura: 
> ```json
> {
> 	"username":"",
> 	"email":"",
> 	"first_name":"",
> 	"last_name":""
> }
- **POST api/users/change_password/** para cambiar contraseña.
> Se espera un JSON bajo la siguiente estructura: 
> ```json
> {
> 	"current_password":"",
> 	"new_password":"",
> 	"confirm_password":""
> }
- **POST api/users/deactivate_account/** para desactivar la cuenta autenticada.
> No espera JSON

### 2. Connecting_App

Cuenta con un **ViewSet** y dos **APIView** para automatizar el CRUD de las conexiones a los servicios, así como la generación de sus logs correspondientes.

```python
router = DefaultRouter()
router.register(r'connections', ConnectionViewSet, basename='connections')

urlpatterns = [
    path('api/sql_conn/', include(router.urls)),
    path('api/sql_conn/admin/active_connections/', ActiveConnectionListCreate.as_view(), name='activeconnection-list-create'),
    path('api/sql_conn/admin/active_connections/<int:pk>/', ActiveConnectionDetail.as_view(), name='activeconnection-detail'),
]
```

Las *URL* de los **endpoints** son: 
- **POST api/sql_conn/connections/connect/** para conectarse a la tecnología a auditar.
> Se espera un JSON bajo la siguiente estructura: 
> ```json
> {
> 	"driver":"",
> 	"server":"",
> 	"db_user":"",
> 	"password":""
> }
- **POST api/sql_conn/connections/disconnect/** para desconectarse y salir del servicio.
> No espera JSON.
- **GET  api/sql_conn/admin/active_connections/** para obtener la lista de conexiones activas en el servicio.
- **GET  api/sql_conn/admin/active_connections/<int:pk>/** para obtener toda la información de la conexión especificada en el índice

### 3. Inside_App

Cuenta con dos **APIView** para el manejo de la información de los parámetros a auditar (controles a aplicar) y una ***función como vista*** para ejecutar las auditorías, ya sean completas, múltiples o individuales. 

> [!TIP] Para el servicio de auditoría a SQL Server:
> Esta aplicación maneja los modelos **Controls_Information** y **Controls_Scripts**. Modelos **clave** para el funcionamiento de la aplicación ya que en ellos están almacenados los datos esenciales de cada parámetro a auditar y su script de auditoría. 

```python
...

urlpatterns = [
    path('api/sql/controls/controls_info/', ControlsInformationList.as_view(), name='controls_information_list'),
    path('api/sql/controls/control_info/<int:pk>/', ControlInformationDetail.as_view(), name='control_information_detail'),
    path('api/sql/controls/execute/', views.execute_query, name = 'exec_query'),
]

...
```

> Las vistas que trabajan con el modelo **Controls_Scripts** están permitidas solo para los administradores. Sus *URL* no están definidas en la aplicación <aún>.

Las *URL* de los **endpoints** son: 
- **GET api/sql/controls/controls_info/** para listar todos los controles
- **GET api/sql/controls/controls_info/<int:pk>/** para ver información detallada de un control en específico.
> Solo los clientes pueden acceder a los servicios, por ende un administrador no puede ni acceder al servicio, ni a endpoints como estos que son propios de la lógica de negocio del servicio. 
- **GET api/sql/controls/execute/** para ejecutar todos los controles. 
- **GET api/sql/controls/execute/?indexes=1/** para ejecutar solo un control. 
- **GET api/sql/controls/execute/?indexes=1&indexes=3/** para ejecutar múltiples controles. 

### 4. Logs_App

Cuenta con tres **APIView** para el manejo de los registros. 

```python
...

urlpatterns = [
    path('api/logs/admin/connection_logs_list/', AllConnectionLogList.as_view(), name='connection_log_list_admin'),
    path('api/logs/admin/auditory_logs_list/', AllAuditoryLogList.as_view(), name='auditory_log_list_admin'),
    path('api/logs/connection_logs_list/', ConnectionLogList.as_view(), name='connection_log_list'),
    path('api/logs/connection_logs_details/<int:pk>/', ConnectionLogDetail.as_view(), name='connection_log_detail'),
    path('api/logs/auditory_logs_list/', AuditoryLogList.as_view(), name='auditory_log_list'),
    path('api/logs/auditory_logs_detail/<int:pk>', AuditoryLogDetail.as_view(), name='auditory_log_detail'),
]

...
```

Las *URL* de los **endpoints** son: 
- **(ADMIN) GET api/logs/admin/connection_logs_list/** para listar todos los logs de conexiones al servicio
- **(ADMIN) GET api/logs/admin/auditory_logs_list/** para listar todos los logs de auditorías al servicio 
- **GET api/logs/connection_logs_list/** para listar los logs de conexión del usuario registrado
- **GET api/logs/connection_logs_details/<int:pk>/** para ver la información específica de un log de conexión
- **GET api/logs/auditory_logs_list/** para listar todos los logs de auditoría del usuario registrado
- **GET api/logs/auditory_logs_detail/<int:pk>/** para ver la información específica de un log de auditoría

---
### Dependencias del servidor de Backend (requirements.txt)

```txt
asgiref==3.8.1
certifi==2024.12.14
charset-normalizer==3.4.1
coreapi==2.3.3
coreschema==0.0.4
Django==5.0.10
django-cors-headers==4.6.0
django-mssql-backend==2.8.1
djangorestframework==3.15.2
idna==3.10
itypes==1.2.0
Jinja2==3.1.5
MarkupSafe==3.0.2
mssql-django==1.5
pyodbc==5.2.0
pytz==2024.2
requests==2.32.3
setuptools==75.6.0
sqlparse==0.5.2
tzdata==2024.2
uritemplate==4.1.1
urllib3==2.3.0
```

---
> [!ERROR] Para pruebas a la aplicación: 
> 1. Dado que todavía no están implementadas el 100% de las páginas que conforman la aplicación, se sugiere usar la extensión ***Thunder Client*** de Visual Studio Code para probar el funcionamiento de la solución.
> 2. En teoría, en el campo **"server"** del **endpoint** de la vista *connect*, si se escribe el nombre del servidor host + coma + puerto por el que está corriendo SQL Server debería funcionar correctamente. Esto no fue probado dado que se necesitaba montar otro servidor en un puerto diferente, con datos diferentes, para comprobar a cual se conectaba y por excases de recursos de hardware se quedó como ***pendiente a prueba*** por lo que se recomienda probar usando el puerto por defecto para SQL Server, 1433. 
> 3. Se recomienda utilizar la imagen oficial de Microsoft de SQL Server en versiones iguales o mayores a la 2019 para pruebas. 



