
import axios from 'axios';
import { getEnvVariables } from '../helpers';

// Extrae la URL base de la API desde las variables de entorno
const { VITE_API_URL } = getEnvVariables()

// Crea una instancia de axios con una configuración personalizada
const webbAppApi = axios.create({
    baseURL: VITE_API_URL // Define la URL base para todas las peticiones
})

//Todo: configurar interceptores 
webbAppApi.interceptors.request.use(config => {
    
    // Añade el token de autenticación a los headers de cada petición
    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')    //Comprobar si el usuario está autenticado
    }
    return config;
})

export default webbAppApi;
