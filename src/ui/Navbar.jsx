import { Link, Navigate, NavLink } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout'
import IconButton from '@mui/material/IconButton';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import ChatIcon from '@mui/icons-material/Chat';
import { useAuthStore, usePerfilStore } from '../hooks';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
    //Cojo la función startLogout para poder cerrar sesión
    const {startLogout} = useAuthStore()
    const {comprobarPerfil} = usePerfilStore()

    const navigate = useNavigate();

    const checkPerfil = async () => {
    const perfil = await comprobarPerfil();   
    
    if (perfil) {
       navigate('/perfil');
    } else {
         navigate('/editPerfil');
    }
    };

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark p.2">
        <div className="container-fluid">
             <Link to="/" className="navbar-brand">
                MiApp
            </Link>
            <div className='navbar-collapse justify-content-center'>
                <div className='navbar-nav'>
                    <NavLink
                        to="/users"
                        className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''}`}
                    >
                        Usuarios
                    </NavLink>
                    <NavLink
                        to="/projects"
                        className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''}`}
                    >
                        Publicaciones
                    </NavLink>
                    <NavLink
                        to="/calendar"
                        className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''}`}
                    >
                        Eventos
                    </NavLink>
                </div>
            </div>
            <div className=" d-flex ms-auto">
             <IconButton  aria-label="logout">
                <ChatIcon sx={{ color: 'white' }} />
             </IconButton>
              <IconButton  aria-label="settings" onClick={checkPerfil}>
                <PersonIcon sx={{ color: 'white' }} />
             </IconButton>
             <IconButton  aria-label="settings">
                <SettingsIcon sx={{ color: 'white' }}/>
             </IconButton>
              <IconButton  aria-label="logout" onClick={startLogout}>
                <LogoutIcon color="error"/>
             </IconButton>
            </div>
        </div>
    </nav>

  );
}