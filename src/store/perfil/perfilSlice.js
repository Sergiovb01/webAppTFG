import { createSlice } from '@reduxjs/toolkit';

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

export const { setPerfil, setPerfilCreado, setPerfilNoCreado } = perfilSlice.actions;
