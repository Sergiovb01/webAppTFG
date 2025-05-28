import { configureStore } from "@reduxjs/toolkit";
import {  authSlice } from "./";


export const store = configureStore({
    reducer: {
        auth:     authSlice.reducer,

    },
    middleware: (getdefaultMiddleware) => getdefaultMiddleware({ //Para corregir el error de serializar las fechas 
        serializableCheck: false
    })
})