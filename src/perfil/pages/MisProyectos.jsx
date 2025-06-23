import { Box, Typography, Card, CardContent, CardMedia, Button, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useProyectoStore } from '../../hooks/useProyectoStore';
import { useEffect } from 'react';

export const MisProyectos = () => {
  const navigate = useNavigate();

  const { cargarMisPublicaciones, misPublicaciones } = useProyectoStore();

  useEffect(() => {
    cargarMisPublicaciones();
  }, []);
  const handleClick = (id) => {
    navigate(`/proyecto/${id}`);
  };
  return (
    <Box px={4} py={6}>
      <Typography variant="h5" textAlign="center" fontWeight={600} gutterBottom>
        Tus Proyectos
      </Typography>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={4}
        mt={4}
      >
        {misPublicaciones.map((proyecto, index) => (
          <Box key={proyecto._id || index} width="100%" maxWidth={1000}>
           <Card elevation={3} 
              sx={{
                borderRadius: 3, 
                transition: 'transform 0.2s, box-shadow 0.2s', 
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                }
              }}
            >
              <CardActionArea onClick={() => handleClick(proyecto._id)}>
                {proyecto.imagenes?.[0] && (
                  <CardMedia
                    component="img"
                    height="300"
                    image={proyecto.imagenes[0]}
                    alt={proyecto.titulo}
                    sx={{ objectFit: 'cover' }}
                  />
                )}
                <CardContent>
                  <Typography variant="h6" fontWeight={600} textAlign="center">
                    {proyecto.titulo}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>

            <Box display="flex" justifyContent="flex-end" mt={1}>
              <Button
                variant="outlined"
                onClick={() => navigate(`/proyecto/editar/${proyecto._id}`)}
              >
                Editar
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};


