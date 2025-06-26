import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Avatar, 
  IconButton, 
  Card, 
  Chip,
  Fade,
  Tooltip,
  CardActionArea,
  CardContent,
  CardMedia,
  alpha
} from '@mui/material';
import { 
  Close as CloseIcon,
  Favorite as FavoriteIcon,
  Visibility as VisibilityIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import { useFavoritosStore } from '../../hooks/useFavoritosStore';
import { useNavigate } from 'react-router-dom';

export const TarjetaFavorito = ({ proyecto }) => {
  const { startEliminarDeFavoritos } = useFavoritosStore();
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = async (e) => {
    e.stopPropagation(); // Prevenir navegación al hacer clic en eliminar
    setIsRemoving(true);
    
    // Pequeña demora para mostrar la animación
    setTimeout(() => {
      startEliminarDeFavoritos(proyecto._id);
    }, 300);
  };

  const handleClick = () => {
    if (!isRemoving) {
      navigate(`/proyecto/${proyecto._id}`);
    }
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <Fade in={!isRemoving} timeout={300}>
      <Card 
        sx={{ 
          mb: 3, 
          borderRadius: 3,
          overflow: 'hidden',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          cursor: 'pointer',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: (theme) => `0 12px 40px ${alpha(theme.palette.primary.main, 0.15)}`,
          },
          '&:active': {
            transform: 'translateY(-2px)',
          }
        }}
      >
        <CardActionArea onClick={handleClick} sx={{ position: 'relative' }}>
          {/* Imagen del proyecto */}
          <Box sx={{ position: 'relative', overflow: 'hidden' }}>
            <CardMedia
              component="img"
              height="250"
              image={proyecto.imagenes?.[0] || '/placeholder-image.jpg'}
              alt={proyecto.titulo || 'Proyecto'}
              onLoad={handleImageLoad}
              sx={{
                transition: 'transform 0.5s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
                opacity: imageLoaded ? 1 : 0,
                transition: 'opacity 0.5s ease'
              }}
            />
            
            {/* Overlay con información adicional */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 100%)',
                opacity: 0,
                transition: 'opacity 0.3s ease',
                display: 'flex',
                alignItems: 'flex-end',
                p: 2,
                '&:hover': {
                  opacity: 1,
                }
              }}
            >
              <Box display="flex" gap={1}>
                 {proyecto.categoria?.map((cat, idx) => (
                    <Chip 
                        key={`cat-${idx}`}
                        label={cat}
                        size="small"
                        sx={{ 
                        backgroundColor: alpha('#fff', 0.2),
                        color: 'white',
                        backdropFilter: 'blur(10px)'
                        }} 
                    />
                    ))}

                    {proyecto.tipoArtista?.map((tipo, idx) => (
                    <Chip 
                        key={`tipo-${idx}`}
                        label={tipo}
                        size="small"
                        sx={{ 
                        backgroundColor: alpha('#fff', 0.2),
                        color: 'white',
                        backdropFilter: 'blur(10px)'
                        }} 
                    />
                    ))}

                    {proyecto.software?.map((soft, idx) => (
                    <Chip 
                        key={`soft-${idx}`}
                        label={soft}
                        size="small"
                        sx={{ 
                        backgroundColor: alpha('#fff', 0.2),
                        color: 'white',
                        backdropFilter: 'blur(10px)'
                        }} 
                    />
                    ))}
                
              </Box>
            </Box>

            {/* Botón de eliminar de favoritos */}
            <Tooltip  placement="left">
              <IconButton
                onClick={handleRemove}
                sx={{
                  position: 'absolute',
                  top: 12,
                  right: 12,
                  backgroundColor: alpha('#fff', 0.9),
                  color: 'error.main',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: 'error.main',
                    color: 'white',
                    transform: 'scale(1.1)',
                  },
                  zIndex: 2
                }}
                size="small"
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>

          {/* Contenido de la tarjeta */}
          <CardContent sx={{ p: 2.5 }}>
            {/* Información del usuario */}
            <Box display="flex" alignItems="center" gap={1.5} mb={1.5}>
              <Avatar 
                src={proyecto.usuario?.perfil?.photo} 
                sx={{ 
                  width: 32, 
                  height: 32,
                  border: '2px solid',
                  borderColor: 'primary.main'
                }}
              >
                <PersonIcon />
              </Avatar>
              <Box>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ 
                    fontWeight: 500,
                    lineHeight: 1.2
                  }}
                >
                  {proyecto.usuario?.name || 'Usuario Anónimo'}
                </Typography>
                {proyecto.fechaCreacion && (
                  <Typography variant="caption" color="text.disabled">
                    {new Date(proyecto.fechaCreacion).toLocaleDateString()}
                  </Typography>
                )}
              </Box>
            </Box>

            {/* Título del proyecto */}
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 600,
                lineHeight: 1.3,
                mb: 1,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                minHeight: '2.6em'
              }}
            >
              {proyecto.titulo || 'Proyecto Sin Título'}
            </Typography>

            {/* Descripción del proyecto */}
            {proyecto.descripcion && (
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  lineHeight: 1.4,
                  mb: 1
                }}
              >
                {proyecto.descripcion}
              </Typography>
            )}

            {/* Tags */}
            {proyecto.tecnologias && proyecto.tecnologias.length > 0 && (
              <Box display="flex" gap={0.5} flexWrap="wrap" mt={1}>
                {proyecto.tecnologias.slice(0, 3).map((tech, index) => (
                  <Chip
                    key={index}
                    label={tech}
                    size="small"
                    variant="outlined"
                    sx={{ 
                      fontSize: '0.75rem',
                      height: 24,
                      '& .MuiChip-label': {
                        px: 1
                      }
                    }}
                  />
                ))}
                {proyecto.tecnologias.length > 3 && (
                  <Chip
                    label={`+${proyecto.tecnologias.length - 3}`}
                    size="small"
                    variant="outlined"
                    sx={{ 
                      fontSize: '0.75rem',
                      height: 24,
                      '& .MuiChip-label': {
                        px: 1
                      }
                    }}
                  />
                )}
              </Box>
            )}
          </CardContent>
        </CardActionArea>
      </Card>
    </Fade>
  );
};