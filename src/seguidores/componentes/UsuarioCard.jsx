import React from 'react';
import { Card, Avatar, Typography, IconButton, Tooltip } from '@mui/material';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import CloseIcon from '@mui/icons-material/Close';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { useNavigate } from 'react-router-dom';
import { usePerfilStore } from '../../hooks';
import { ConstructionOutlined } from '@mui/icons-material';

export const UsuarioCard = ({ 
  nombre, 
  avatar, 
  id,
  onAction, 
  disabled = false,
  variant = 'ninguno' // 'seguir', 'eliminar'
}) => {
 const getIcon = () => {
  switch (variant) {
    case 'eliminar':
      return <PersonRemoveIcon />;
    case 'seguir':
      return <PersonAddAlt1Icon />;
    case 'cerrar':
      return <CloseIcon />;
    default:
      return null; // en caso de 'ninguno'
  }
};
const {cargarPerfilUsuario, perfil} = usePerfilStore()
const navigate = useNavigate();


const handleCardClick = async () => {
  //Cargar el perfil del usuario y guardarlo en una constante para sacar el id de ese perfil cargado y cogemos el id del perfil para mandarlo a la ruta
   try {
    await cargarPerfilUsuario(id); 
    console.log('Perfil encontrado:', perfil);
    if (perfil?._id) {
      navigate(`/usuario/${perfil._id}`);
    } else {
      console.warn('Perfil no encontrado');
    }
  } catch (error) {
    console.error('Error al cargar perfil:', error);
  }
};

  return (
    <Card
      onClick={handleCardClick}
      variant="outlined"
      align="center"
      sx={{
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        p: 1.5,
        mb: 1.5,
        borderRadius: '12px',
        transition: 'all 0.2s ease-in-out',
         maxWidth: 400, 
        '&:hover': {
          boxShadow: 2,
          transform: 'translateY(-1px)',
          
        },
        opacity: disabled ? 0.6 : 1,
      }}
    >
      <Avatar 
        sx={{ mr: 2 }}
        src={avatar}
        alt={`Avatar de ${nombre}`}
      >
        {!avatar && nombre?.charAt(0)?.toUpperCase()}
      </Avatar>
      
      <Typography
        sx={{ 
          fontFamily: 'VT323, monospace', 
          flexGrow: 1, 
          fontSize: '1.2rem',
          color: disabled ? 'text.disabled' : 'text.primary'
        }}
      >
        {nombre}
      </Typography>
{variant !== 'ninguno' && (
    <span>
      <IconButton 
        onClick={() => onAction(id)}
        disabled={disabled}
        color="primary"
        size="medium"
      >
        {getIcon()}
      </IconButton>
    </span>
)}
    </Card>
  );
};