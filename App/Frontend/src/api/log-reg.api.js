import axios from "axios";
import Cookies from 'js-cookie';

const LogRegAPI = axios.create({
    baseURL : "http://localhost:8000/",
    headers: {
          'Content-Type': 'application/json'
        }
});

// Interceptor para agregar el token a cada solicitud
LogRegAPI.interceptors.request.use(
  (config) => {
      const token = Cookies.get('authToken');
      if (token) {
          config.headers['Authorization'] = `Token ${token}`;
      }
      return config;
  },
  (error) => {
      return Promise.reject(error);
  }
);

export const LoginUser = (data) => LogRegAPI.post('/api/users/login/', data);
export const RegisterUser = (data) => LogRegAPI.post('/api/users/register/', data);
export const getUserProfile = () => LogRegAPI.get('/api/users/profile/');
export const LogOutUser = () => LogRegAPI.post('/api/users/logout/');

export const ConnectToDB = (data) => LogRegAPI.post('sql/connect/', data, { withCredentials: true });
export const LogOutDB = () => LogRegAPI.post('sql/disconnect/');
