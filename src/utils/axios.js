import axios from 'axios';

// Crear una instancia de Axios
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

// Interceptores de solicitud
axiosInstance.interceptors.request.use(
  (config) => {
    //Si la autenticacion va por Headers
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptores de respuesta
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.error('No autorizado. Redirigiendo al login...');
      }
    } else {
      console.error('Error de red:', error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
