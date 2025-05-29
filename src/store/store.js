import { configureStore } from "@reduxjs/toolkit";
import {  authSlice, perfilSlice } from "./";




export const store = configureStore({
    reducer: {
        auth:     authSlice.reducer,
        perfil:   perfilSlice.reducer

    },
    middleware: (getdefaultMiddleware) => getdefaultMiddleware({ //Para corregir el error de serializar las fechas 
        serializableCheck: false
    })
})