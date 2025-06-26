import { Box, Card, CardContent, CardMedia, Typography, Avatar, IconButton, Chip, Stack, CardActionArea } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";
import { useFavoritosStore } from '../../hooks/useFavoritosStore';
import { useEffect } from 'react';

export const TarjetaProyecto = ({ project }) => {

  const navigate = useNavigate();
  const { startAgregarAFavoritos, startEliminarDeFavoritos, favoritos, startCargarFavoritos } = useFavoritosStore();

  const handleClick = () => {
    navigate(`/proyecto/${project._id}`);
  };

  const handleToggleFavorito = async (id) => {
    const yaEsFavorito = favoritos.some(f => f._id === id);

    if (yaEsFavorito) {
      await startEliminarDeFavoritos(id);
    } else {
      await startAgregarAFavoritos(id);
    }
  };

  useEffect(() => {
    startCargarFavoritos();
  }, [favoritos]);

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
      transition: 'transform 0.2s, box-shadow 0.2s',
      position: 'relative', // Necesario para posicionar el Chip
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
      }
    }}>
      <CardActionArea onClick={handleClick}>
        <Box position="relative">
          <CardMedia
            component="img"
            height="200"
            image={project.imagenes[0]}
            alt={project.name}
            sx={{ objectFit: 'cover' }}
          />

          <Box
            sx={{
              position: 'absolute',
              top: 8,
              left: 8,
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.94)',
              padding: '4px 8px',
              borderRadius: 2
            }}
          >
            <Avatar
              src={project.usuario.perfil.photo}
              alt={project.usuario.name}
              sx={{ width: 30, height: 30, mr: 1 }}
            />
            <Typography variant="body2" color="text.primary">
              {project.usuario.name}
            </Typography>
          </Box>
        </Box>

        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
            {project.titulo}
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
            {project.descripcion}
          </Typography>

          <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap' }}>
            {project.categoria.map((item, index) => (
              <Chip key={index} label={item} size="small" sx={{ bgcolor: '#9CCC65', color: 'white', fontSize: '0.75rem', height: 24 }} />
            ))}
            {project.tipoArtista.map((item, index) => (
              <Chip key={index} label={item} size="small" sx={{ bgcolor: '#29B6F6', color: 'white', fontSize: '0.75rem', height: 24 }} />
            ))}
            {project.software.map((item, index) => (
              <Chip key={index} label={item} size="small" sx={{ bgcolor: '#F06292', color: 'white', fontSize: '0.75rem', height: 24 }} />
            ))}
          </Stack>
        </CardContent>
      </CardActionArea>

      {/* Botón de favoritos */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <IconButton
          onClick={() => handleToggleFavorito(project._id)}
          color={favoritos?.some(f => f && f._id === project._id) ? 'error' : 'default'}
          sx={{
            '&:hover': {
              backgroundColor: favoritos?.some(f => f && f._id === project._id)
                ? 'rgba(244, 67, 54, 0.1)'
                : 'rgba(0, 0, 0, 0.04)'
            }
          }}
        >
          {favoritos?.some(f => f && f._id === project._id)
            ? <Favorite color="error" />
            : <FavoriteBorder />}
        </IconButton>
      </Box>

      {/* Mostrar "CERRADA" en rojo si la publicación está cerrada */}
      {project.estado === 'cerrada' && (
        <Box sx={{ position: 'absolute', bottom: 8, left: 8 }}>
          <Chip
            label="CERRADA"
            color="error"
            sx={{
              fontSize: '0.85rem',
              fontWeight: 'bold',
              padding: '4px 10px',
              borderRadius: '6px',
              backgroundColor: '#e53935',
              color: 'white',
              boxShadow: '0 2px 6px rgba(0,0,0,0.3)'
            }}
          />
        </Box>
      )}
    </Card>
  );
};
