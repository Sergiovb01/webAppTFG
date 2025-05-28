import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage } from "../auth";
import { AppRoutes } from "../routes/AppRoutes";
import { useAuthStore } from "../hooks";
import { useEffect } from "react";
import { CircularProgress } from "@mui/material";




export const AppRouter = () => {

  // Obtiene el estado de autenticación y la función para verificar el token
  const {checkAuthToken, status} = useAuthStore()

  // Verifica si el usuario tiene un token válido para mantener la sesión
    useEffect(()=>{
      checkAuthToken()
    },[])

    // Mientras se está verificando el token, muestra un mensaje de carga
    if(status === 'checking'){
      return(
        <CircularProgress />
      )
    }

  return (
       <Routes>
      {
        (status === 'not-authenticated')
          ? (
              <>
                {/* Ruta para el login u otras páginas dentro de /auth */}        
                <Route path="/auth/*" element={<LoginPage />} />
                 {/* Cualquier otra ruta redirige al login */}
                <Route path="/*" element={<Navigate to="/auth/login" />} />
              </>
            )
          : (
              <>
               {/* Todas las rutas se gestionan en AppRoutes */}
                <Route path="/*" element={<AppRoutes />} />
                  {/* Si intenta ir a /auth, lo redirige al inicio */}
                <Route path="/auth/*" element={<Navigate to="/" />} />
              </>
            )
      }     
    </Routes>
  )
}

