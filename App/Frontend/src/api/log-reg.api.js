import axios from "axios";
import Cookies from 'js-cookie';

const LogRegAPI = axios.create({
    baseURL : "http://localhost:8000/",
    headers: {
          'Content-Type': 'application/json'
        }
    }
);

// Interceptor para agregar el token a cada solicitud
LogRegAPI.interceptors.request.use(
  (config) => {
      const token = Cookies.get('authToken');
      const onServiceCookie = Cookies.get('OnService')
      if (token) {
          config.headers['Authorization'] = `Token ${token}`;
      }
      if (onServiceCookie) { 
        config.headers['OnService'] = onServiceCookie; 
    }
      return config;
  },
  (error) => {
      return Promise.reject(error);
  }
);

LogRegAPI.interceptors.response.use( 
    (response) => { return response; }, 
    (error) => { 
        // Código de error 403 - Prohibido 
        if (error.response && error.response.status === 403) { 
            // Redirigir al usuario a la página de acceso denegado 
            window.location.href = "/access-denied"; 
        } 
        return Promise.reject(error);
    } 
);

export const LoginUser = (data) => LogRegAPI.post('/api/users/login/', data);
export const RegisterUser = (data) => LogRegAPI.post('/api/users/register/', data);
export const getUserProfile = () => LogRegAPI.get('/api/users/profile/');
export const LogOutUser = () => LogRegAPI.post('/api/users/logout/');

// Nuevas funciones
export const updateUserProfile = (data) => LogRegAPI.put('/api/users/update_profile/', data);
export const changeUserPassword = (data) => LogRegAPI.post('/api/users/change_password/', data);
export const deactivateUserAccount = () => LogRegAPI.post('/api/users/deactivate_account/');

// SQL Server 
export const ConnectToDB = (data) => LogRegAPI.post('api/sql_conn/connections/connect/', data, { withCredentials: true });
export const LogOutDB = () => LogRegAPI.post('sql/disconnect/');