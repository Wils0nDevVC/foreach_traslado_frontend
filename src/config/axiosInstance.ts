import axios from 'axios';
import { UNSAFE_createBrowserHistory } from 'react-router-dom';

export const history = UNSAFE_createBrowserHistory();

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3200/api', // Cambia esta URL según tu backend
});

// Interceptor para agregar el token a todas las peticiones
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de autenticación
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      history.push('/login');
      window.location.reload(); 
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
