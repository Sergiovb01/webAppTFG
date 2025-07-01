import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import ChatIcon from '@mui/icons-material/Chat';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import EventIcon from '@mui/icons-material/Event';
import { useNavigate, NavLink } from 'react-router-dom';
import { useAuthStore, usePerfilStore } from '../hooks';

export const Navbar = () => {
  const { startLogout } = useAuthStore();
  const { comprobarPerfil } = usePerfilStore();
  const navigate = useNavigate();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const checkPerfil = async () => {
    const perfil = await comprobarPerfil();
    if (perfil) {
      navigate('/perfil');
    } else {
      navigate('/crear-perfil');
    }
  };

  const iconColor = '#0044CC';
  
  const navLinks = [
    { label: 'Usuarios', path: '/users', icon: <PeopleAltIcon  /> },
    { label: 'Proyectos', path: '/projects', icon: <MovieFilterIcon /> },
    { label: 'Eventos', path: '/calendar', icon: <EventIcon /> },
  ];



  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: 'transparent',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(0, 102, 255, 0.1)',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          
          <Box 
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} 
            onClick={() => navigate('/')}
          >
            <Box
              component="img"
              src="/img/logo.png"
              alt="Logo"
              sx={{ width: 40, height: 40 }}
            />
            <Typography
              variant="h6"
              component="div"
              sx={{ fontWeight: 'bold', color: '#0044CC', ml: 0.5 }}
            >
              CollabSphere
            </Typography>
            
          </Box>

          {isMobile ? (
            <>
              <IconButton
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={() => setDrawerOpen(true)}
              >
                <MenuIcon sx={{ color: iconColor }} />
              </IconButton>
            </>
          ) : (
            <>
              <Box sx={{ display: 'flex', gap: 3 }}>
                {navLinks.map(({ label, path }) => (
                  <NavLink
                    key={label}
                    to={path}
                    style={({ isActive }) => ({
                      textDecoration: 'none',
                      color: isActive ? iconColor : '#0066FF',
                      fontWeight: isActive ? 600 : 400,
                      borderBottom: isActive ? `2px solid ${iconColor}` : 'none',
                    })}
                  >
                    {label}
                  </NavLink>
                ))}
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton onClick={() => navigate('/postulados')}>
                  <ChatIcon sx={{ color: iconColor }} />
                </IconButton>
                <IconButton onClick={checkPerfil}>
                  <PersonIcon sx={{ color: iconColor }} />
                </IconButton>
                <IconButton onClick={startLogout}>
                  <LogoutIcon sx={{ color: '#FF5C5C' }} />
                </IconButton>
              </Box>
            </>
          )}
        </Toolbar>
      </AppBar>

     
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 240 }} role="presentation" onClick={() => setDrawerOpen(false)}>
          <List>
            {navLinks.map(({ label, path, icon }) => (
              <ListItem key={label} disablePadding>
                <ListItemButton onClick={() => navigate(path)}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={label} />
                </ListItemButton>
              </ListItem>
            ))}
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate('/postulados')}>
                <ListItemIcon>
                  <ChatIcon />
                </ListItemIcon>
                <ListItemText primary="Postulados" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={checkPerfil}>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Perfil" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Ajustes" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={startLogout}>
                <ListItemIcon>
                  <LogoutIcon sx={{ color: '#FF5C5C' }} />
                </ListItemIcon>
                <ListItemText primary="Cerrar sesión" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};
