import { useEffect, useState } from 'react';
import { 
  Box, 
  Typography, 
  Container,
  Fade,
  Skeleton,
  Stack,
  Chip,
  Paper,
  Grid
} from '@mui/material';
import { 
  Inbox as InboxIcon,
  Notifications as NotificationsIcon,
  TrendingUp as TrendingUpIcon
} from '@mui/icons-material';
import { PostulacionCard } from '../componentes/PostulacionCard';
import { NoPostulaciones } from '../componentes/NoPostulaciones';
import { usePostulacionStore } from '../../hooks/usePostulacionStore';

export const PostulacionesPage = () => {
  const { cargarPostulacionesRecibidas, postulaciones, eliminarPostulacion } = usePostulacionStore();
  const [loading, setLoading] = useState(true);

  const handleDelete = (id) => eliminarPostulacion(id);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await cargarPostulacionesRecibidas();
      setLoading(false);
    };
    loadData();
  }, []);


  // Estadísticas rápidas
  const totalPostulaciones = postulaciones.length;
  

  return (
    <Box
      sx={{
        minHeight: '100vh',
        py: 4
      }}
    >
      <Container maxWidth="lg">
        <Fade in timeout={800}>
          <Box>
            {/* Header con estadísticas */}
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Typography
                variant="h3"
                sx={{
                  fontFamily: 'VT323, monospace',
                  textTransform: 'uppercase',
                  mb: 2,
                  background: 'linear-gradient(45deg, #071eec, #0066ff)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 'bold',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                 Postulaciones Recibidas
              </Typography>
              
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}
              >
                Gestiona las postulaciones a tus proyectos y encuentra a los colaboradores perfectos
              </Typography>

              {/* Estadísticas */}
              <Grid container spacing={2} justifyContent="center" sx={{ mb: 4 }}>
                <Grid item xs={12} sm={4} md={3}>
                  <Paper
                    elevation={2}
                    sx={{
                      p: 2,
                      textAlign: 'center',
                      borderRadius: 3,
                      background: 'linear-gradient(135deg,rgb(46, 80, 231) 0%,rgb(8, 166, 240) 100%)',
                      color: 'white'
                    }}
                  >
                    <InboxIcon sx={{ fontSize: 32, mb: 1 }} />
                    <Typography variant="h5" fontWeight="bold">
                      {totalPostulaciones}
                    </Typography>
                    <Typography variant="caption">
                      Total Postulaciones
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Box>

            {/* Lista de postulaciones */}
            <Box sx={{ position: 'relative' }}>
              {postulaciones.length === 0 ? (
                <Fade in timeout={1000}>
                  <Box>
                    <NoPostulaciones />
                  </Box>
                </Fade>
              ) : (
                <Stack spacing={3}>
                  {postulaciones.map((post, index) => (
                    <Fade 
                      key={post._id} 
                      in 
                      timeout={600 + (index * 100)}
                      style={{ transitionDelay: `${index * 50}ms` }}
                    >
                      <Box
                      >
                        <PostulacionCard
                          postulacion={post}
                          onDelete={handleDelete}
                        />
                      </Box>
                    </Fade>
                  ))}
                </Stack>
              )}
            </Box>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};