import { Box, Card, CardContent, CardMedia, Typography, Avatar, IconButton, Chip, Stack, CardActionArea } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';

import { useNavigate } from "react-router-dom";
// Componente de tarjeta de proyecto
export const TarjetaProyecto = ({ project, onToggleFavorite }) => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/proyecto/${project.id}`);
  };
  return (
    <Card sx={{ 
      height: '100%', 
      display: 'flex',
      p: 1, 
      mx: 2,
      borderColor: 'rgba(0, 0, 0, 0.12)',
      borderWidth: 1,
      borderStyle: 'solid',
      flexDirection: 'column',
      backgroundColor: 'transparent',
      transition: 'transform 0.2s, box-shadow 0.2s',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
      }
    }}>
    <CardActionArea onClick={handleClick}>
      <Box position="relative">
        {/* Imagen del proyecto */}
        <CardMedia
          component="img"
          height="200"
          image={project.image}
          alt={project.name}
          sx={{ objectFit: 'cover' }}
        />

        {/* Usuario sobre la imagen */}
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            left: 8,
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            padding: '4px 8px',
            borderRadius: 2
          }}
        >
          <Avatar 
            src={project.user.avatar} 
            alt={project.user.name}
            sx={{ width: 30, height: 30, mr: 1 }}
          />
          <Typography variant="body2" color="text.primary">
            {project.user.name}
          </Typography>
        </Box>
      </Box>

      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Nombre del proyecto */}
        <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
          {project.name}
        </Typography>

        {/* Descripción */}
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
          {project.description}
        </Typography>

        {/* Tags */}
        <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap' }}>
          <Chip label={project.category} size="small" color="primary" variant="outlined" />
          <Chip label={project.skill} size="small" color="secondary" />
          <Chip label={project.software} size="small" />
        </Stack>

        {/* Botón de favoritos */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton 
            onClick={() => onToggleFavorite(project.id)}
            color={project.isFavorite ? 'error' : 'default'}
            sx={{ 
              '&:hover': { 
                backgroundColor: project.isFavorite ? 'rgba(244, 67, 54, 0.1)' : 'rgba(0, 0, 0, 0.04)' 
              }
            }}
          >
            {project.isFavorite ? <Favorite /> : <FavoriteBorder />}
          </IconButton>
        </Box>
      </CardContent>
      </CardActionArea>
    </Card>
  );
};
