import {Navigate, Routes, Route } from 'react-router-dom';
import { Navbar } from '../ui';
import { CalendarPage } from '../calendar/pages/CalendarPage';
import { UsersPage } from '../users/pages/UsersPage';
import { ProjectsPage } from '../projects/pages/ProjectsPage';
import { HomePage } from '../init/HomePage';
import { GestionPerfil } from "../perfil/pages/GestionPerfil";
import { PerfilUsuario } from '../perfil/pages/PerfilUsuario';


export const AppRoutes = () => {

  return (
    <>
      <Navbar/>

        <Routes>
            <Route path='projects' element={<ProjectsPage/>}/>
            <Route path='users' element={<UsersPage/>}/> 
            <Route path='calendar' element={<CalendarPage/>}/> 
            <Route path="editPerfil" element={<GestionPerfil />} />
            <Route path="perfil" element={<PerfilUsuario />} />
            <Route path='*' element={<HomePage/>}/>
            
        </Routes>
  
    </>
  )
}


