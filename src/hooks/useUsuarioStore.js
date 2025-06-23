import webbAppApi from '../api/webbAppApi';
import { useState } from 'react';
import Swal from 'sweetalert2';

export const useUsuarioStore = () => {

  const [seguidores, setSeguidores] = useState([]);
  const [seguidos, setSeguidos] = useState([]);

  const seguirUsuario = async (usuarioId) => {
    try {
     await webbAppApi.post(`/usuarios/seguir/${usuarioId}`);
     return true;
    } catch (error) {
      console.error('Error al seguir usuario:', error);
      return false;
    }
  };

  const dejarDeSeguirUsuario = async (usuarioId) => {
    try {
      await webbAppApi.post(`/usuarios/dejar-de-seguir/${usuarioId}`);
      return true;
    } catch (error) {
      console.error('Error al dejar de seguir usuario:', error);
      return false;
    }
  };

  const obtenerSeguidoresYSeguidos = async () => {
    try {
      const { data } = await webbAppApi.get('/usuarios/seguidores-seguidos');
      setSeguidores(data.seguidores);
      setSeguidos(data.seguidos);
    } catch (error) {
      console.error('Error al obtener seguidores y seguidos:', error);
    }
  };

  return {
    seguidores,
    seguidos,
    seguirUsuario,
    dejarDeSeguirUsuario,
    obtenerSeguidoresYSeguidos,
  };
};





