import webbAppApi from '../api/webbAppApi';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { uploadImageToCloudinary } from '../helpers/uploadImageToCloudinary';
import Swal from 'sweetalert2';



export const useProyectoStore = () => {
  const navigate = useNavigate();

  const [proyecto, setProyecto] = useState(null);
  const [publicaciones, setPublicaciones] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [publicacion, setPublicacion] = useState(null);
  const [misPublicaciones, setMisPublicaciones] = useState([]);
  const [publicacionesUsuario, setPublicacionesUsuario] = useState([]);


  // Crear un nuevo proyecto
  const startCrearProyecto = async ({ titulo, descripcion, categoria, tipoArtista, software, imagenesNuevas }) => {
    try {
      // Subir imágenes primero
      const urls = await Promise.all(imagenesNuevas.map(img => uploadImageToCloudinary(img)));

      const body = {
        titulo,
        descripcion,
        categoria,
        tipoArtista,
        software,
        imagenes: urls
      };

      const { data } = await webbAppApi.post('/publicaciones', body);
      setProyecto(data.publicacion);

      Swal.fire({
        icon: 'success',
        title: '¡Proyecto creado!',
        text: 'Tu proyecto ha sido publicado correctamente.',
        confirmButtonColor: '#3085d6'
        });

      navigate('/projects'); // Redirige tras crear
    } catch (error) {
      console.error('Error al crear el proyecto:', error);
    }
  };

// Cargar una publicación específica por ID
const cargarPublicacion = async (id) => {
  try {
    setIsLoading(true);
    const { data } = await webbAppApi.get(`/publicaciones/${id}`);
    setPublicacion(data.publicacion);
  } catch (error) {
    console.error('Error al cargar publicacion:', error);
  } finally {
    setIsLoading(false);
  }
};

// Cargar todas las publicaciones
const cargarPublicaciones = async () => {
  try {
    setIsLoading(true);
    const { data } = await webbAppApi.get('/publicaciones');
    setPublicaciones(data.publicaciones);
  } catch (error) {
    console.error('Error al cargar publicaciones:', error);
  } finally {
    setIsLoading(false);
  }
};

// Cargar todas las publicaciones del usuario actual
const cargarMisPublicaciones = async () => {
  try {
    setIsLoading(true);
    const { data } = await webbAppApi.get('/publicaciones/mis-publicaciones');
    setMisPublicaciones(data.publicaciones);
  } catch (error) {
    console.error('Error al cargar publicaciones:', error);
  } finally {
    setIsLoading(false);
  }
};

const startActualizarProyecto = async (id, formData) => {
  try {
   
     // 1. Subir imágenes nuevas a Cloudinary
    const nuevasImagenes = await Promise.all(
      (formData.imagenesNuevas || []).map(async (file) => {
        const url = await uploadImageToCloudinary(file);
        return url;
      })
    );

    
    // 2. Mantener imágenes existentes y añadir nuevas
    const imagenesFinales = [
      ...(formData.imagenes || []),
      ...nuevasImagenes
    ];

    // 3. Construir objeto final del proyecto
    const proyectoActualizado = {
      titulo: formData.titulo,
      descripcion: formData.descripcion,
      categoria: formData.categoria,
      tipoArtista: formData.tipoArtista,
      software: formData.software,
      imagenes: imagenesFinales,
    };

    // 4. Enviar al backend (PUT /publicaciones/:id)
   await webbAppApi.put(`/publicaciones/${id}`, proyectoActualizado);

     // 6. Redirigir o notificar
    Swal.fire({
      icon: 'success',
      title: 'Proyecto actualizado',
      showConfirmButton: false,
      timer: 1500
    });
    navigate('/mis-proyectos');

  } catch (error) {
    console.error('Error al actualizar el proyecto:', error);
  }
};

const filtrarProyectos = async (filtros) => {
  const { categoria, tipoArtista, software } = filtros;
  try {
    setIsLoading(true);
    const { data } = await webbAppApi.get('/publicaciones/filter', { params: filtros });
    setPublicaciones(data.publicaciones);
  } catch (error) {
    console.error('Error al buscar proyectos con filtros:', error);
    setMisPublicaciones([]); // Limpiar resultados si hay error
  } finally {
    setIsLoading(false);
  }
};

const obtenrPublicacionesPorUsuario = async (userId) => {
  try {
    setIsLoading(true);

    const { data } = await webbAppApi.get(`/publicaciones/usuario/${userId}`);
console.log('Publicaciones obtenidas:', data);
    if (data?.publicaciones && data.publicaciones.length > 0) {
      setPublicacionesUsuario(data.publicaciones);
    } else {
      console.warn('No se encontraron publicaciones para este usuario.');
      setPublicacionesUsuario([]); // Opcional: limpia el estado si no hay resultados
    }
    
  } catch (error) {
    console.error('Error al obtener publicaciones por usuario:', error);
    // Aquí puedes lanzar un toast o setear un estado de error si quieres mostrarlo en pantalla
  } finally {
    setIsLoading(false); // Garantizas que siempre se desactive el loading
  }
}

  return {
    startCrearProyecto,
    proyecto,
    cargarPublicacion,
    cargarPublicaciones,
    cargarMisPublicaciones,
    startActualizarProyecto,
    filtrarProyectos,
    publicaciones,
    publicacionesUsuario,
    obtenrPublicacionesPorUsuario,
    publicacion,
    misPublicaciones,
    isLoading
  };
};


