import { Box, Typography, Card, CardContent, CardMedia, Button, CardActionArea, Chip } from '@mui/material';
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

   if (misPublicaciones.length === 0) {
    return (
      <Box px={4} py={6} display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h5" fontWeight={600} gutterBottom sx={{ color: '#071eec' }}>
          Tus Proyectos
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Aún no has creado ningún proyecto.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/crearProyecto')}
          sx={{ mt: 2 }}
        >
          Crear un Proyecto
        </Button>
      </Box>
    );
  }

  return (
    <Box px={4} py={6}>
      <Typography variant="h4" textAlign="center" fontWeight={600} gutterBottom sx={{ color: '#071eec' }}>
        Tus Proyectos
      </Typography>

      <Box display="flex" flexDirection="column" alignItems="center" gap={4} mt={4}>
        {misPublicaciones.map((proyecto, index) => (
          <Box key={proyecto._id || index} width="100%" maxWidth={1000}>
            <Card
              elevation={3}
              sx={{
                borderRadius: 3,
                transition: 'transform 0.2s, box-shadow 0.2s',
                position: 'relative',
                overflow: 'hidden',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                },
              }}
            >
              {/* Chip visible sobre la imagen si está cerrada */}
              {proyecto.estado === 'cerrada' && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    zIndex: 10,
                  }}
                >
                  <Chip
                    label="Cerrada "
                    color="#error"
                    sx={{
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      backgroundColor: '#607D8B',
                      color: 'white',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                    }}
                  />
                </Box>
              )}

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

            {/* Solo mostrar botón Editar si no está cerrado */}
            {proyecto.estado !== 'cerrada' && (
              <Box display="flex" justifyContent="flex-end" mt={1}>
                <Button
                  variant="outlined"
                  onClick={() => navigate(`/proyecto/editar/${proyecto._id}`)}
                >
                  Editar
                </Button>
              </Box>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};
