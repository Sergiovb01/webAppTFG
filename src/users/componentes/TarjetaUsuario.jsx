// components/UserCard.jsx
import { Card, Avatar, Typography, Box, Button, Chip, ImageList, ImageListItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { useEffect, useState } from "react";
import { useUsuarioStore } from "../../hooks/useUsuarioStore";
import { useAuthStore } from "../../hooks";

export const TarjetaUsuario = ({ user }) => {
console.log('User data:', user);
  const { seguirUsuario, dejarDeSeguirUsuario} = useUsuarioStore();
  const navigate = useNavigate();
  const [isFollowing, setIsFollowing] = useState(false);

  const { user: currentUser } = useAuthStore(); // Usuario autenticado

  // Verifica si el usuario autenticado ya sigue al usuario mostrado
  useEffect(() => {
  if (user.user.seguidores?.includes(currentUser.uid)) {
    setIsFollowing(true);
  }
}, [user, currentUser]);

// Maneja el evento de seguir/dejar de seguir
const handleFollowToggle = async () => {
  let success = false;
  if (isFollowing) {
    success = await dejarDeSeguirUsuario(user.user._id);
  } else {
    success = await seguirUsuario(user.user._id);
  }

  if (success) setIsFollowing(!isFollowing);
};
  const handleAvatarClick = () => {
    navigate(`/usuario/${user._id}`);
  };


  return (
    <Card sx={{ maxWidth: 800, margin: "1rem auto", p: 2, boxShadow: 0, backgroundColor: "transparent"}}>
      {/* Encabezado: Avatar y nombre */}
      <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
        <Avatar onClick={handleAvatarClick} src={user.photo} sx={{ width: 64, height: 64,  cursor: 'pointer',
                        '&:hover': {
                          transform: 'scale(1.1)',
                          transition: 'all 0.2s ease-in-out',
                        }, }}  />
        <Typography variant="h6" mt={1}>{user.user.name}</Typography>
      </Box>

      {/* Contenedor para galería */}
      <Box sx={{ width: "100%", border: "1px solid #ccc", borderRadius: 2, p: 2, mb: 2, backgroundColor: "#f9f9f9" }}>
        <ImageList sx={{ width: "100%" }} cols={3} rowHeight={164}>
          {user.portafolio.map((item, index) => (
            <ImageListItem key={index}>
              {item.tipo === 'imagen' ? (
              <img
                src={item.url}
                alt={`Proyecto ${index + 1}`}
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
             ) : item.tipo === 'video' ? (
              <video
                controls
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              >
                <source src={item.url} type="video/mp4" />
                Tu navegador no soporta la reproducción de video.
              </video>
            ) : null}
            </ImageListItem>
          ))}
        </ImageList>
      </Box>

      {/* Habilidades y botón */}
      <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap">
        <Box display="flex" gap={1} flexWrap="wrap">
          {user.skills.map((skill, i) => (
            <Chip key={i} label={skill} variant="outlined" />
          ))}
          {user.softwares.map((sw, i) => (
            <Chip key={i} label={sw} variant="outlined" color="primary" />
          ))}
        </Box>
        <Button
            onClick={handleFollowToggle}
            variant={isFollowing ? "outlined" : "contained"}
            color="primary"
            size="small"
            startIcon={isFollowing ? <PersonRemoveIcon /> : <PersonAddAlt1Icon />}
            sx={{ textTransform: 'none', borderRadius: 2 }}
        >
            {isFollowing ? "Dejar de seguir" : "Seguir"}
        </Button>
      </Box>
    </Card>
  );
};
