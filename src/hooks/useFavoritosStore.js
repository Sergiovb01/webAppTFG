import webbAppApi from '../api/webbAppApi';
import Swal from 'sweetalert2';
import { useState } from 'react';



export const useFavoritosStore = () => {
const [favoritos, setFavoritos] = useState([]);

  const startCargarFavoritos = async () => {
    try {
      const { data } = await webbAppApi.get('/usuarios/favoritos');
      setFavoritos(data.favoritos);
    } catch (error) {
      console.error('Error al cargar favoritos:', error);
    }
  };

  const startAgregarAFavoritos = async (id) => {
    console.log('Agregando a favoritos:', id);
    try {
      const { data } = await webbAppApi.post(`/usuarios/favoritos/${id}`);
      setFavoritos([...favoritos, data.favorito]);
    } catch (error) {
      console.error('Error al agregar a favoritos:', error);
      Swal.fire('Error', 'No se pudo agregar a favoritos', 'error');
    }
  };

  const startEliminarDeFavoritos = async (id) => {
    try {
      await webbAppApi.delete(`/usuarios/favoritos/${id}`);
      setFavoritos(favoritos.filter(fav => fav.id !== id));
    } catch (error) {
      console.error('Error al eliminar de favoritos:', error);
      Swal.fire('Error', 'No se pudo eliminar de favoritos', 'error');
    }
  };

    return {
      startCargarFavoritos,
      startAgregarAFavoritos,
      startEliminarDeFavoritos,
      favoritos
    }

};
