import {Navigate, Routes, Route, useParams } from 'react-router-dom';
import { Navbar } from '../ui';
import { CalendarPage } from '../calendar/pages/CalendarPage';
import { UsersPage } from '../users/pages/UsersPage';
import { ProjectsPage } from '../projects/pages/ProjectsPage';
import { HomePage } from '../init/HomePage';
import { GestionPerfil } from "../perfil/pages/GestionPerfil";
import { PerfilUsuario } from '../perfil/pages/PerfilUsuario';
import { CrearProyecto, DetallesProyecto } from '../projects/index';
import { PostulacionesPage } from '../postulados/pages/PostulacionesPage';
import { SeguidoresPage } from '../seguidores/pages/Seguidores';
import { usePerfilStore } from '../hooks';
import { useEffect } from 'react';
import { MisProyectos } from '../perfil/pages/MisProyectos';
import { useProyectoStore } from '../hooks/useProyectoStore';
import { PerfilUserId } from '../perfil/pages/PerfilUserId';
import { FavoritosPage } from '../perfil/pages/Favoritos';
import { ProyectosUsuario } from '../perfil/pages/ProyectosUsuario';




// Para crear perfil
const CrearPerfilPage = () => {
  const { startCrearPerfil } = usePerfilStore();
  return <GestionPerfil onSubmit={startCrearPerfil} />;
};

// Para editar perfil existente
const EditarPerfilPage = () => {
  const { perfil, startActualizarPerfil, startCargarPerfil } = usePerfilStore();

   useEffect(() => {
    startCargarPerfil(); 
  }, []);


  return <GestionPerfil initialData={perfil} onSubmit={startActualizarPerfil} />;
};

const CrearProyectoPage = () => {
  const { startCrearProyecto } = useProyectoStore();
  return <CrearProyecto onSubmit={startCrearProyecto} />;
};

const EditarProyectoPage = () => {
  const { id } = useParams();// Obtenemos el ID del proyecto desde los parámetros de la URL
  const { publicacion, startActualizarProyecto, cargarPublicacion } = useProyectoStore();

  useEffect(() => {
    cargarPublicacion(id);
  }, []);

  if (!publicacion) return <div>Cargando proyecto...</div>;

  return <CrearProyecto initialData={publicacion} onSubmit={(formData) => startActualizarProyecto(publicacion._id, formData)} />;
};
export const AppRoutes = () => {

  return (
    <>
      <Navbar/>

        <Routes>
            {/* Home y navegación general */}
            <Route path='*' element={<HomePage/>}/>
            <Route path='projects' element={<ProjectsPage/>}/>
            <Route path='users' element={<UsersPage/>}/> 
            <Route path='calendar' element={<CalendarPage/>}/> 
           
            
             {/* Perfil */}
            <Route path="/crear-perfil" element={<CrearPerfilPage />} />
            <Route path="/editar-perfil" element={<EditarPerfilPage />} />
            <Route path="perfil" element={<PerfilUsuario />} />
            <Route path="/usuario/:id" element={<PerfilUserId />} />

            {/* RUTAS PROYECTOS */}
            <Route path='crearProyecto' element={<CrearProyectoPage/>}/>
            <Route path='/proyecto/editar/:id' element={<EditarProyectoPage/>}/>
            <Route path="/proyecto/:id" element={<DetallesProyecto/>} />
            <Route path="/mis-proyectos" element={<MisProyectos />} />
            <Route path="/proyectos-usuario/:userId" element={<ProyectosUsuario />} />

            {/* POSTULADOS */}
            <Route path='postulados' element={<PostulacionesPage/>}/>

             {/* SEGUIDORES Y SEGUIDOS */}
             <Route path='seguidores' element={<SeguidoresPage/>}/>

            {/* FAVORITOS */}
            <Route path='favoritos' element={<FavoritosPage/>} />
        </Routes>
  
    </>
  )
}


