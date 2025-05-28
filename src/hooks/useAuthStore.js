import { useDispatch, useSelector } from "react-redux"
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store/auth/authSlice"
import webbAppApi from "../api/webbAppApi"


export const useAuthStore = () => {

     // Extrae valores del estado auth del store (Redux)
    const {status, user, errorMessage} = useSelector(state => state.auth)

    // Permite despachar acciones al store
    const dispatch = useDispatch()
        
    const startLogin = async({email, password}) => {
        // Cambia el estado a "checking" mientras se verifica el login
       dispatch(onChecking())
        try{
            const {data} = await webbAppApi.post('/auth',{email, password}); // Hace la petición POST a la API para autenticar al usuario
            localStorage.setItem('token', data.token);// Guarda el token recibido en localStorage para mantener la sesión
            localStorage.setItem('token-init-date', new Date().getTime()); // Guarda la fecha en que se inició sesión (útil para renovar token después)

            // Despacha la acción de login exitoso con los datos del usuario
            dispatch(onLogin({name: data.name, udi: data.udi }))

        }catch(error){
            // Si ocurre un error, despacha logout con mensaje de error
           dispatch(onLogout('Credenciales incorrectas'));
           setTimeout(() => {
             dispatch(clearErrorMessage());
           }, 10)//10 milesimas de segundos despues se ejecuta esta función para limpiar el mensaje del store 
        }
    }

    const startRegister = async({email, password, name}) => {
        dispatch(onChecking())
         try{
             const {data} = await webbAppApi.post('/auth/new',{email, password, name});
             console.log(data)
             localStorage.setItem('token', data.token);
             localStorage.setItem('token-init-date', new Date().getTime());
             
             dispatch(onLogin({name: data.name, udi: data.udi }))
 
         }catch(error){
            dispatch(onLogout(error.response.data?.msg || '--' ));//Coger el error y mostrarlo
            setTimeout(() => {
              dispatch(clearErrorMessage());
            }, 10)//10 milesimas de segundos despues se ejcuta esat función
         }
     }

    const checkAuthToken = async() => {
         // Obtiene el token del localStorage (si existe)
        const token = localStorage.getItem('token');
         // Si no hay token, se considera no autenticado y se despacha logout
        if(!token) return dispatch(onLogout());

        try{
             // Intenta renovar el token con una petición al backend
            const {data} = await webbAppApi.get('auth/renew');
             // Si la renovación es exitosa, guarda el nuevo token
            localStorage.setItem('token', data.token);
            // Guarda la nueva fecha de inicio del token (útil para renovar periódicamente)
            localStorage.setItem('token-init-date', new Date().getTime());
            // Autentica al usuario con los datos recibidos
            dispatch(onLogin({name: data.name, uid: data.udi }))

        }catch(error){
            // Si hay un error al renovar el token:
            // Limpia el localStorage y fuerza cierre de sesión
            localStorage.clear();
            dispatch(onLogout('Credenciales incorrectas'));
        }
    }
    

    const startLogout = () => {
       localStorage.clear(); //Limpiar el token
       dispatch(onLogout());
    }
    

    return {
        //Propiedades
        status,
        errorMessage,
        user,


        //Métodos
        checkAuthToken,
        startLogin,
        startRegister,
        startLogout,
    }
}