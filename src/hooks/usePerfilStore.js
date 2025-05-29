import { useDispatch, useSelector } from 'react-redux';
import webbAppApi from '../api/webbAppApi';
import { setPerfilCreado, setPerfilNoCreado } from '../store/perfil/perfilSlice';
import { useState } from 'react';

export const usePerfilStore = () => {

  const dispatch = useDispatch();

  // Extrae del estado global si el perfil fue creado
  const { isPerfilCreated } = useSelector(state => state.perfil);


  // Estado local para almacenar el perfil del usuario
  const [perfil, setPerfil] = useState(null);

  // Función para crear el perfil del usuario
  const startCrearPerfil = async (perfilData)  => {
    try {
      const { data } = await webbAppApi.post('/perfil', perfilData);
      if (data.perfil) {
        // Si se crea correctamente, actualiza el estado global
        dispatch(setPerfilCreado());
      } else {
        dispatch(setPerfilNoCreado());
      }
    } catch (error) {
      dispatch(setPerfilNoCreado());
    }
  };

 // Función para cargar el perfil del usuario desde el backend
  const startCargarPerfil = async () => {

    try {
      const { data } = await webbAppApi.get('/perfil');
      // Almacena el perfil recibido en el estado local
      setPerfil(data.perfil);
    } catch (error) {
      console.error('Error al cargar el perfil:', error);
      return null;
    }
  }

  return {
    isPerfilCreated,
    startCrearPerfil,
    startCargarPerfil,
    perfil
  };
};
