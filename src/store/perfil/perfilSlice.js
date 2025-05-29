import { createSlice } from '@reduxjs/toolkit';

//Gestionar si ek perfil esta creado o no
export const perfilSlice = createSlice({
  name: 'perfil',
  initialState: {
    isPerfilCreated: false
  },
  reducers: {
    setPerfilCreado: (state) => {
      state.isPerfilCreated = true;
    },
    setPerfilNoCreado: (state) => {
      state.isPerfilCreated = false;
    }
  }
});

export const { setPerfilCreado, setPerfilNoCreado } = perfilSlice.actions;
