import webbAppApi from '../api/webbAppApi';
import Swal from 'sweetalert2';
import { useState } from 'react';



export const usePostulacionStore = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [postulaciones, setPostulaciones] = useState([]);

  // Enviar una postulación a un proyecto
  const enviarPostulacion = async ({ publicacionId, mensaje }) => {
    setIsLoading(true);
    try {
      await webbAppApi.post('/postulaciones', {
        publicacion: publicacionId,
        mensaje
      });
     Swal.fire({
        icon: 'success',
        title: 'Postulación enviada',
        text: 'Tu postulación ha sido enviada correctamente.',
        confirmButtonColor: '#3085d6',
      });
    } catch (error) {
      console.error('Error al postular:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo enviar la postulación.',
      });
    } finally {
      setIsLoading(false);
    }
  };


const cargarPostulacionesRecibidas = async () => {
  setIsLoading(true);
  try {
    const { data } = await webbAppApi.get('/postulaciones/recibidas/mis-proyectos');
    setPostulaciones(data.postulaciones);
  } catch (error) {
    console.error('Error al cargar postulaciones recibidas:', error);
  } finally {
    setIsLoading(false);
  }
};


  const eliminarPostulacion = async (id) => {
    try {
      await webbAppApi.delete(`/postulaciones/${id}`);
      setPostulaciones((prev) => prev.filter((p) => p._id !== id));

      Swal.fire({
        icon: 'success',
        title: 'Postulación eliminada',
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error('Error al eliminar la postulación:', error);
      Swal.fire('Error', 'No se pudo eliminar la postulación', 'error');
    }
  };


  return {

    enviarPostulacion,
    cargarPostulacionesRecibidas,
    eliminarPostulacion,
    postulaciones,
    isLoading,
    
  }
}


