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
export const updateUserProfile = (data) => LogRegAPI.put('/api/users/update_profile/', data);
export const changeUserPassword = (data) => LogRegAPI.post('/api/users/change_password/', data);
export const deactivateUserAccount = () => LogRegAPI.post('/api/users/deactivate_account/');

// SQL Server 
export const ConnectToDB = (data) => LogRegAPI.post('api/sql_conn/connections/connect/', data, { withCredentials: true });
export const LogOutDB = () => LogRegAPI.post('api/sql_conn/connections/disconnect/');
export const FetchConnectionLogListUser = () => LogRegAPI.get('api/logs/connection_logs_list/');
// Dashboard
export const FetchConnectionAmountUser = () => LogRegAPI.get('api/dashGET/connectionAmount/');
export const FetchAuditoryAmountUser = () => LogRegAPI.get('api/dashGET/auditoryAmount/');
export const FetchLastAuditoryPercentageUser = () => LogRegAPI.get('api/dashGET/correctRate/');
