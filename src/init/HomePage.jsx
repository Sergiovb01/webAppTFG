
import { Card, CardContent, Typography, Box, Container, Grid, Fade } from '@mui/material';
import { Add, People, Search } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {

  const navigate = useNavigate();

  const features = [
    {
      title: 'CONECTA',
      description: 'Conecta con profesionales del cine y la animación',
      icon: <People sx={{ fontSize: 48, color: '#0066FF' }} />,
      onClick: () => navigate('/users')
    },
    {
      title: 'CREAR',
      description: 'Crea nuevos proyectos y da vida a tus ideas',
      icon: <Add sx={{ fontSize: 48, color: '#0066FF' }} />,
      onClick: () => navigate("/crearProyecto")
    },
    {
      title: 'DESCUBRE',
      description: 'Descubre proyectos increíbles y colabora',
      icon: <Search sx={{ fontSize: 48, color: '#0066FF' }} />,
      onClick: () =>  navigate('/projects')
    }
  ];

  return (
    <Container maxWidth="lg">
      <Fade in timeout={800}>
      <Box
        sx={{
          minHeight: '80vh', // <- menos altura mínima
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          pt: 6, // <- padding top ajustado
          pb: 4
        }}
      >
        <Box sx={{ mb: 6 }}>
          <Typography 
            variant="h4" 
            component="h1" 
            sx={{ 
              fontWeight: 'bold',
              color: '#0066FF',
              mb: 2,
              maxWidth: '800px'
            }}
          >
            Conecta. Colabora. Crea.
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              color: '#333',
              maxWidth: '600px',
              mx: 'auto'
            }}
          >
            La red profesional para artistas del cine y la animación
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card 
                onClick={feature.onClick}
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  border: '2px solid #0066FF',
                  borderRadius: 3,
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 24px rgba(0, 102, 255, 0.15)',
                    cursor: 'pointer'
                  }
                }}
              >
                <CardContent 
                  sx={{ 
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 4,
                    textAlign: 'center'
                  }}
                >
                  <Box sx={{ mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography 
                    variant="h5" 
                    component="h2" 
                    sx={{ 
                      fontWeight: 'bold',
                      color: '#0066FF',
                      mb: 2
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: '#666',
                      lineHeight: 1.6
                    }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      </Fade>
    </Container>
  );
}