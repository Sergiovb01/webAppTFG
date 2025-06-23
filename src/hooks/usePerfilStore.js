import { useDispatch, useSelector } from 'react-redux';
import webbAppApi from '../api/webbAppApi';
import { setPerfilCreado, setPerfilNoCreado } from '../store/perfil/perfilSlice';
import { useState } from 'react';
import { uploadImageToCloudinary } from '../helpers/uploadImageToCloudinary';
import { useNavigate } from 'react-router-dom';


export const usePerfilStore = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Extrae del estado global si el perfil fue creado
  const { isPerfilCreated } = useSelector(state => state.perfil);
  // Estado local para almacenar el perfil del usuario
  const [perfil, setPerfil] = useState(null);

   const [perfiles, setPerfiles] = useState([]);

   const [loading, setLoading] = useState(false);


  // Función para crear el perfil del usuario
   const startCrearPerfil = async (formData) => {
    try {
      // Subir foto de perfil
      let photoUrl = '';
      if (formData.profilePhoto) {
        photoUrl = await uploadImageToCloudinary(formData.profilePhoto);
      }

      // Subir archivos del portafolio
      const portafolio = await Promise.all(
        formData.portfolioFiles.map(async (file) => {
          const url = await uploadImageToCloudinary(file);
          return {
            url,
            tipo: file.type.startsWith('video') ? 'video' : 'imagen',
          };
        })
      );

      // Transformar socialMedia
      const socialMedia = formData.social.map(item => {
        const [platform, account] = item.split(': ');
        return { platform, account };
      });

      // Crear objeto final del perfil
      const perfilData = {
        softwares: formData.software,
        skills: formData.skill,
        country: formData.country,
        city: formData.city,
        about: formData.about,
        socialMedia,
        portafolio,
        photo: photoUrl
      };



      // Enviar al backend
      const { data } = await webbAppApi.post('/perfil', perfilData);

      if (data.perfil) {
        dispatch(setPerfilCreado());
      } else {
        dispatch(setPerfilNoCreado());
      }
      navigate('/perfil'); // Redirigir al perfil después de crear

    } catch (error) {
      console.error('Error al crear el perfil:', error);
      dispatch(setPerfilNoCreado());
    }
  };

  const startActualizarPerfil = async (formData) => {
  try {
    
    // Subir foto de perfil si hay una nueva
    let photoUrl = formData.existingPhoto || '';
    if (formData.profilePhoto) {
      photoUrl = await uploadImageToCloudinary(formData.profilePhoto);
    }

    // Subir archivos nuevos del portafolio
    const nuevosArchivos = await Promise.all(
      (formData.portfolioFiles || []).map(async (file) => {
        const url = await uploadImageToCloudinary(file);
        return {
          url,
          tipo: file.type.startsWith('video') ? 'video' : 'imagen',
        };
      })
    );

    // Mantener los archivos existentes del portafolio
    const portafolio = [
      ...(formData.existingPortfolio || []),
      ...nuevosArchivos
    ];
    // Transformar socialMedia
    const socialMedia = formData.social.map(item => {
      const [platform, account] = item.split(': ');
      return { platform, account };
    });

    // Crear objeto final del perfil
    const perfilData = {
      softwares: formData.software,
      skills: formData.skill,
      country: formData.country,
      city: formData.city,
      about: formData.about,
      socialMedia,
      portafolio,
      photo: photoUrl
    };



    // Enviar al backend (PUT)
    const { data } = await webbAppApi.put('/perfil', perfilData);

    if (data.perfil) {
      dispatch(setPerfilCreado());
    } else {
      dispatch(setPerfilNoCreado());
    }
    navigate('/perfil'); // Redirigir al perfil después de actualizar

  } catch (error) {
    console.error('Error al actualizar el perfil:', error);
    dispatch(setPerfilNoCreado());
  }
};

 // Función para cargar el perfil del usuario desde el backend
  const startCargarPerfil = async () => {

    try {
      const { data } = await webbAppApi.get('/perfil/mi-perfil');
      // Almacena el perfil recibido en el estado local
      setPerfil(data.perfil);
    } catch (error) {
      console.error('Error al cargar el perfil:', error);
      return null;
    }
  }

  const startCargarPerfiles = async () => {
    try {
      setLoading(true);
      const { data } = await webbAppApi.get('/perfil/perfiles');
      console.log('Perfiles cargados:', data.perfiles);
      // Almacena el perfil recibido en el estado local
      setPerfiles(data.perfiles);
    } catch (error) {
      console.error('Error al cargar los perfiles:', error);
      return null;
    } finally {
      setLoading(false);
    }
  }
  // Función para cargar el perfil del usuario desde el backend
  const comprobarPerfil = async () => {

    try {
      
      const { data } = await webbAppApi.get('/perfil/mi-perfil');
      return data;
    } catch (error) {
      return null;
    }
  }

  const filtrarPerfiles = async (filtros) => {
    try {
      setLoading(true);
      console.log('Filtros aplicados:', filtros);
      const { data } = await webbAppApi.get('/perfil/perfiles/filter', { params: filtros });
      setPerfiles(data.perfiles);
    } catch (error) {
      console.error('Error al buscar perfiles con filtros:', error);
      setPerfiles([]); // Limpiar resultados si hay error
    } finally {
      setLoading(false);
    }
};

// Cargar un perfil específico por ID
const cargarPerfilId = async (id) => {
  try {
    setLoading(true);
    const { data } = await webbAppApi.get(`/perfil/${id}`);
    setPerfil(data.perfil);
  } catch (error) {
    console.error('Error al cargar perfil:', error);
  } finally {
    setLoading(false);
  }
};

const cargarPerfilUsuario = async (id) => {
  try {
    setLoading(true);
    const { data } = await webbAppApi.get(`/perfil/usuario/${id}`);
    console.log('Perfil cargado:', data.perfil);
    setPerfil(data.perfil);
  } catch (error) {
    console.error('Error al cargar perfil de usuario:', error);
  } finally {
    setLoading(false);
  }
};

  return {
    isPerfilCreated,
    startCrearPerfil,
    startCargarPerfiles,
    cargarPerfilUsuario,
    startActualizarPerfil,
    startCargarPerfil,
    comprobarPerfil,
    filtrarPerfiles,
    cargarPerfilId,
    perfil,
    perfiles,
    loading,
  };
};
