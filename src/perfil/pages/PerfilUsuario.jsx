import { useEffect, useState } from 'react';
import { usePerfilStore } from '../../hooks';
import { useSelector } from 'react-redux';
import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Avatar,
  Typography,
  Chip,
  Stack,
  Button,
  Container
} from '@mui/material';
import {
  Engineering as EngineeringIcon,
  Brush as BrushIcon,
  Place as PlaceIcon,
  Person as PersonIcon,
  Instagram as InstagramIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export const PerfilUsuario = () => {
  const { startCargarPerfil, perfil } = usePerfilStore();
  const { user } = useSelector(state => state.auth);

  const [userData] = useState({
    projects: Array(5).fill(null)
  });

  const socialIcons = {
    Instagram: <InstagramIcon />, 
    Twitter: <TwitterIcon />, 
    LinkedIn: <LinkedInIcon />
  };

  const navigate = useNavigate();
  
  useEffect(() => {
    startCargarPerfil();
  }, []);

  if (!perfil) return <Typography align="center" mt={10}>Cargando perfil...</Typography>;

  return (
    <Box sx={{ minHeight: '100vh', p: 2 }}>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item xs={12} md={4} lg={3}>
            <Stack spacing={2}>
              <Card elevation={1} sx={{ borderRadius: 2, backgroundColor: 'transparent' }}>
                <CardContent sx={{ textAlign: 'center', py: 3 }}>
                  <Avatar sx={{ width: 80, height: 80, mx: 'auto', mb: 2, bgcolor: '#6c757d' }}>
                    <PersonIcon sx={{ fontSize: 40, color: 'white' }} />
                  </Avatar>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 500 }}>{user.name}</Typography>
                  <Box display="flex" justifyContent="center" gap={4}>
                    <Box 
                      textAlign="center"  
                      onClick={() => navigate('/seguidores')}
                      sx={{
                        cursor: 'pointer',
                        '&:hover': {
                          color: '#3498db',
                          transform: 'scale(1.03)',
                          transition: 'all 0.2s ease-in-out',
                        },
                      }}
                      >
                      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 0.5 }}>32</Typography>
                      <Typography variant="caption" color="text.secondary">Seguidores</Typography>
                    </Box>
                    <Box 
                      textAlign="center"  
                      onClick={() => navigate('/seguidores')}
                      sx={{
                        cursor: 'pointer',
                        '&:hover': {
                          color: '#3498db',
                          transform: 'scale(1.03)',
                          transition: 'all 0.2s ease-in-out',
                        },
                      }}
                      >
                      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 0.5 }}>45</Typography>
                      <Typography variant="caption" color="text.secondary">Siguiendo</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>

              <Card elevation={1} sx={{ borderRadius: 2, backgroundColor: 'transparent' }}>
                <CardContent sx={{ py: 2.5 }}>
                  <Box sx={{ mb: 2.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                      <EngineeringIcon sx={{ mr: 1, fontSize: 18 }} />
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>Softwares</Typography>
                    </Box>
                    <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
                      {perfil.softwares.map((item, index) => (
                        <Chip key={index} label={item} size="small" sx={{ bgcolor: '#f0932b', color: 'white', fontSize: '0.75rem', height: 24 }} />
                      ))}
                    </Stack>
                  </Box>
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                      <BrushIcon sx={{ mr: 1, fontSize: 18 }} />
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>Habilidades</Typography>
                    </Box>
                    <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
                      {perfil.skills.map((item, index) => (
                        <Chip key={index} label={item} size="small" sx={{ bgcolor: '#f0932b', color: 'white', fontSize: '0.75rem', height: 24 }} />
                      ))}
                    </Stack>
                  </Box>
                </CardContent>
              </Card>

              <Card elevation={1} sx={{ borderRadius: 2, backgroundColor: 'transparent' }}>
                <CardContent sx={{ py: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <PlaceIcon sx={{ mr: 1, fontSize: 18, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">{perfil.country}, {perfil.city}</Typography>
                  </Box>
                </CardContent>
              </Card>

              <Card elevation={1} sx={{ borderRadius: 2, backgroundColor: 'transparent' }}>
                <CardContent sx={{ py: 2.5 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>Sobre mí</Typography>
                  <Typography variant="body2" color="text.secondary">{perfil.about}</Typography>
                </CardContent>
              </Card>

              <Card elevation={1} sx={{ borderRadius: 2, backgroundColor: 'transparent' }}>
                <CardContent sx={{ py: 2.5 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>Redes</Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    {perfil.socialMedia.map(item => (
                      <Chip
                        key={item.platform}
                        label={item.account}
                        icon={socialIcons[item.platform]}
                        sx={{ bgcolor: '#e98d04', color: 'white', '& .MuiChip-icon': { color: 'white' } }}
                      />
                    ))}
                  </Stack>
                </CardContent>
              </Card>

              <Stack direction="row" spacing={2} justifyContent="center">
                <Button variant="contained" sx={{ bgcolor: '#000', color: '#d4ff00', '&:hover': { bgcolor: '#222' }, fontWeight: 700, fontSize: '0.75rem', borderRadius: 1, px: 3, py: 1.2 }}>
                  MIS PROYECTOS
                </Button>
                <Button variant="contained" sx={{ bgcolor: '#000', color: '#d4ff00', '&:hover': { bgcolor: '#222' }, fontWeight: 700, fontSize: '0.75rem', borderRadius: 1, px: 3, py: 1.2 }}>
                  FAVORITOS
                </Button>
                <Button variant="contained" sx={{ bgcolor: '#000', color: '#d4ff00', '&:hover': { bgcolor: '#222' }, fontWeight: 700, fontSize: '0.75rem', borderRadius: 1, px: 3, py: 1.2 }}>
                  EDITAR
                </Button>
              </Stack>
            </Stack>
          </Grid>

          <Grid item xs={12} md={8} lg={9}>
            <Grid container spacing={2}>
              {userData.projects.map((_, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card elevation={0} sx={{ height: 200, border: '2px dashed #d1d5db', bgcolor: 'white', borderRadius: 2, '&:hover': { borderColor: '#9ca3af', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' } }}>
                    <CardContent sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                        Proyecto {index + 1}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
