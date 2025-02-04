
---
## Lógica y Flujo de Trabajo

1. **Autenticación del Usuario a la Aplicación Central**:
   - El usuario inicia sesión en la aplicación central y se establece una cookie de sesión.
   - Ejemplo de nombre de cookie: `session_token`.

2. **Inicio de Sesión en un Servicio Específico**:
   - Cuando el usuario elige un servicio (por ejemplo, auditoría de SQL), se inicia sesión en ese servicio específico.
   - Se crean dos cookies adicionales:
     - `OnService` (para indicar que el usuario está en un servicio).
     - `SQLSaudit` (para especificar el servicio activo).

3. **Control de Acceso en las Rutas**:
   - En cada solicitud, se verifica la existencia de las cookies `OnService` y del servicio específico.
   - Si `OnService` está activa y la cookie del servicio específico está presente, se permite el acceso solo a las rutas dentro de ese servicio.
   - Si `OnService` está activa pero la cookie del servicio no coincide, se deniega el acceso.

4. **Cierre de Sesión del Servicio**:
   - Al cerrar sesión en un servicio, se eliminan las cookies `OnService` y del servicio específico.
   - El usuario es redirigido a la aplicación central, donde puede elegir otro servicio.

## Backend con Django Rest Framework

### Configuración Básica

Asegúrate de tener los paquetes necesarios instalados:
```sh
pip install django djangorestframework django-rest-framework-simplejwt
```

#### `settings.py`

```python
INSTALLED_APPS = [
    ...
    'rest_framework',
    'rest_framework_simplejwt',
]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
}

SIMPLE_JWT = {
    'AUTH_HEADER_TYPES': ('Bearer',),
}
```

#### `views.py`

1. **Vista de Login para la Aplicación Central**:
```python
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view
from django.http import JsonResponse

class LoginView(generics.GenericAPIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user:
            refresh = RefreshToken.for_user(user)
            response = Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })
            response.set_cookie('session_token', str(refresh.access_token), httponly=True)
            return response
        return Response({'msg': 'Credenciales inválidas'}, status=401)

@api_view(['POST'])
def service_login(request):
    service_name = request.data.get('service_name')
    response = JsonResponse({'msg': f'Logged into {service_name}'})
    response.set_cookie('OnService', 'true', httponly=True)
    response.set_cookie(service_name, 'active', httponly=True)
    return response

@api_view(['POST'])
def logout(request):
    service_name = request.data.get('service_name')
    response = JsonResponse({'msg': 'Logout exitoso'})
    response.delete_cookie('session_token')
    response.delete_cookie('OnService')
    response.delete_cookie(service_name)
    return response

class AuditView(generics.GenericAPIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        if request.COOKIES.get('OnService') == 'true' and request.COOKIES.get('SQLSaudit') == 'active':
            return Response({'msg': 'Bienvenido a la sección de auditoría de bases de datos'})
        return Response({'msg': 'Acceso denegado'}, status=403)
```

#### `urls.py`

```python
from django.urls import path
from .views import LoginView, service_login, logout, AuditView

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('service-login/', service_login, name='service_login'),
    path('logout/', logout, name='logout'),
    path('audit/', AuditView.as_view(), name='audit'),
]
```

### Frontend con React y Vite.js

1. **Login Component**:
```javascript
import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login/', { username, password });
      document.cookie = `session_token=${response.data.access}; path=/; HttpOnly`;
      window.location.href = '/services';
    } catch (error) {
      console.error('Login fallido', error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Usuario" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" required />
      <button type="submit">Iniciar Sesión</button>
    </form>
  );
};

export default Login;
```

2. **Service Login Component**:
```javascript
import React from 'react';
import axios from 'axios';

const ServiceLogin = ({ service }) => {
  const handleServiceLogin = async () => {
    try {
      const response = await axios.post('/api/service-login/', { service_name: service });
      window.location.href = `/${service}`;
    } catch (error) {
      console.error(`Login to ${service} failed`, error);
    }
  };

  return (
    <div>
      <h2>{service} Service</h2>
      <button onClick={handleServiceLogin}>Iniciar Sesión en {service}</button>
    </div>
  );
};

export default ServiceLogin;
```

3. **ProtectedRoute Component**:
```javascript
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, service, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      document.cookie.includes('OnService=true') && document.cookie.includes(`${service}=active`) ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

export default ProtectedRoute;
```

4. **App Component**:
```javascript
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/Login';
import ServiceLogin from './components/ServiceLogin';
import ProtectedRoute from './components/ProtectedRoute';
import Audit from './components/Audit';

const App = () => (
  <Router>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/services" component={() => <ServiceLogin service="SQLSaudit" />} />
      <ProtectedRoute path="/SQLSaudit" component={Audit} service="SQLSaudit" />
      <Redirect from="/" to="/login" />
    </Switch>
  </Router>
);

export default App;
```

### Resumen

- **Cookies de Sesión**: Utilizamos cookies de sesión para manejar el estado de autenticación y el acceso a los servicios específicos.
- **Control de Acceso**: Implementamos verificación de cookies en cada ruta tanto en el backend como en el frontend para asegurar que los usuarios solo puedan acceder a las páginas permitidas.

---

> [!NOTE] **rest_framework.authtoken**
> La biblioteca **rest_framework.authtoken** puede ser una excelente alternativa para manejar la autenticación y el control de acceso en tu aplicación.

### Lógica con `rest_framework.authtoken`

1. **Autenticación del Usuario**:
   - Utiliza `rest_framework.authtoken` para generar y gestionar tokens de autenticación al iniciar sesión en la aplicación central.

2. **Inicio de Sesión en un Servicio Específico**:
   - Cuando el usuario selecciona un servicio, se autentica en ese servicio específico y se generan cookies adicionales (`OnService` y la cookie específica del servicio).

3. **Control de Acceso en las Rutas**:
   - El middleware verifica la presencia de las cookies `OnService` y la cookie del servicio específico para permitir o denegar el acceso.

### Implementación con `rest_framework.authtoken`

#### Backend (Django Rest Framework)

1. **Instalación y Configuración**:
   Asegúrate de tener `djangorestframework` y `djangorestframework.authtoken` instalados:
   ```sh
   pip install djangorestframework djangorestframework.authtoken
   ```

2. **Configuración en `settings.py`**:
   ```python
   INSTALLED_APPS = [
       ...
       'rest_framework',
       'rest_framework.authtoken',
   ]

   REST_FRAMEWORK = {
       'DEFAULT_AUTHENTICATION_CLASSES': (
           'rest_framework.authentication.TokenAuthentication',
       ),
   }
   ```

3. **Modelos y Vistas**:

   **`views.py`**:
   ```python
   from rest_framework import generics, permissions
   from rest_framework.response import Response
   from rest_framework.authtoken.models import Token
   from django.contrib.auth import authenticate
   from rest_framework.decorators import api_view
   from django.http import JsonResponse

   class LoginView(generics.GenericAPIView):
       permission_classes = (permissions.AllowAny,)

       def post(self, request):
           username = request.data.get('username')
           password = request.data.get('password')
           user = authenticate(username=username, password=password)
           if user:
               token, created = Token.objects.get_or_create(user=user)
               response = Response({'token': token.key})
               response.set_cookie('session_token', token.key, httponly=True)
               return response
           return Response({'msg': 'Credenciales inválidas'}, status=401)

   @api_view(['POST'])
   def service_login(request):
       service_name = request.data.get('service_name')
       response = JsonResponse({'msg': f'Logged into {service_name}'})
       response.set_cookie('OnService', 'true', httponly=True)
       response.set_cookie(service_name, 'active', httponly=True)
       return response

   @api_view(['POST'])
   def logout(request):
       service_name = request.data.get('service_name')
       response = JsonResponse({'msg': 'Logout exitoso'})
       response.delete_cookie('session_token')
       response.delete_cookie('OnService')
       response.delete_cookie(service_name)
       return response

   class AuditView(generics.GenericAPIView):
       permission_classes = (permissions.IsAuthenticated,)

       def get(self, request):
           if request.COOKIES.get('OnService') == 'true' and request.COOKIES.get('SQLSaudit') == 'active':
               return Response({'msg': 'Bienvenido a la sección de auditoría de bases de datos'})
           return Response({'msg': 'Acceso denegado'}, status=403)
   ```

   **`urls.py`**:
   ```python
   from django.urls import path
   from .views import LoginView, service_login, logout, AuditView

   urlpatterns = [
       path('login/', LoginView.as_view(), name='login'),
       path('service-login/', service_login, name='service_login'),
       path('logout/', logout, name='logout'),
       path('audit/', AuditView.as_view(), name='audit'),
   ]
   ```

### Frontend con React y Vite.js

#### Login Component

1. **Componente de Login**:
   ```javascript
   import React, { useState } from 'react';
   import axios from 'axios';

   const Login = () => {
     const [username, setUsername] = useState('');
     const [password, setPassword] = useState('');

     const handleLogin = async (e) => {
       e.preventDefault();
       try {
         const response = await axios.post('/api/login/', { username, password });
         document.cookie = `session_token=${response.data.token}; path=/; HttpOnly`;
         window.location.href = '/services';
       } catch (error) {
         console.error('Login fallido', error);
       }
     };

     return (
       <form onSubmit={handleLogin}>
         <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Usuario" required />
         <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" required />
         <button type="submit">Iniciar Sesión</button>
       </form>
     );
   };

   export default Login;
   ```

#### Service Login Component

2. **Componente de Login del Servicio**:
   ```javascript
   import React from 'react';
   import axios from 'axios';

   const ServiceLogin = ({ service }) => {
     const handleServiceLogin = async () => {
       try {
         const response = await axios.post('/api/service-login/', { service_name: service });
         window.location.href = `/${service}`;
       } catch (error) {
         console.error(`Login to ${service} failed`, error);
       }
     };

     return (
       <div>
         <h2>{service} Service</h2>
         <button onClick={handleServiceLogin}>Iniciar Sesión en {service}</button>
       </div>
     );
   };

   export default ServiceLogin;
   ```

#### ProtectedRoute Component

3. **Componente de Rutas Protegidas**:
   ```javascript
   import React from 'react';
   import { Route, Redirect } from 'react-router-dom';

   const ProtectedRoute = ({ component: Component, service, ...rest }) => (
     <Route
       {...rest}
       render={props =>
         document.cookie.includes('OnService=true') && document.cookie.includes(`${service}=active`) ? (
           <Component {...props} />
         ) : (
           <Redirect to="/login" />
         )
       }
     />
   );

   export default ProtectedRoute;
   ```

#### App Component

4. **Componente Principal (App)**:
   ```javascript
   import React from 'react';
   import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
   import Login from './components/Login';
   import ServiceLogin from './components/ServiceLogin';
   import ProtectedRoute from './components/ProtectedRoute';
   import Audit from './components/Audit';

   const App = () => (
     <Router>
       <Switch>
         <Route path="/login" component={Login} />
         <Route path="/services" component={() => <ServiceLogin service="SQLSaudit" />} />
         <ProtectedRoute path="/SQLSaudit" component={Audit} service="SQLSaudit" />
         <Redirect from="/" to="/login" />
       </Switch>
     </Router>
   );

   export default App;
   ```

### Resumen

- **`rest_framework.authtoken`**: Utiliza tokens para la autenticación y manejo de sesiones.
- **Control de Acceso**: Las cookies adicionales (`OnService` y la del servicio específico) permiten controlar el acceso a las diferentes rutas y servicios de la aplicación.
- **Permisos Personalizados**: Las clases de permisos personalizadas en el backend y las rutas protegidas en el frontend aseguran que los usuarios solo accedan a las secciones permitidas.

