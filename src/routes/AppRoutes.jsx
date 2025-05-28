import {Navigate, Routes, Route } from 'react-router-dom';
import { Navbar } from '../ui';
import { CalendarPage } from '../calendar/pages/CalendarPage';
import { UsersPage } from '../users/pages/UsersPage';
import { ProjectsPage } from '../projects/pages/ProjectsPage';
import { HomePage } from '../init/HomePage';

export const AppRoutes = () => {

  const authState = 'authenticated'
  return (
    <>
      <Navbar/>

      
        <Routes>
            <Route path='projects' element={<ProjectsPage/>}/>
            <Route path='users' element={<UsersPage/>}/> 
            <Route path='calendar' element={<CalendarPage/>}/> 
            <Route path='*' element={<HomePage/>}/>
        </Routes>
  
    </>
  )
}


