import { useEffect, useState } from 'react';
import { usePerfilStore } from '../../hooks';
import { useSelector } from 'react-redux';
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
  Container,
  Modal
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
import { useUsuarioStore } from '../../hooks/useUsuarioStore';

export const PerfilUsuario = () => {
  const { startCargarPerfil, perfil } = usePerfilStore();
  const { user } = useSelector(state => state.auth);
  const {obtenerSeguidoresYSeguidos, seguidores, seguidos} = useUsuarioStore();

  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);



  const socialIcons = {
    Instagram: <InstagramIcon />, 
    Twitter: <TwitterIcon />, 
    LinkedIn: <LinkedInIcon />
  };
console.log('perfil', perfil);
  const navigate = useNavigate();

  useEffect(() => {
    startCargarPerfil();
    obtenerSeguidoresYSeguidos();
  }, []);

   const handleOpen = (item) => {
    setSelectedItem(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedItem(null);
  };

  if (!perfil) return <Typography align="center" mt={10}>Cargando perfil...</Typography>;

  return (
    <Box sx={{ minHeight: '100vh', p: 2 }}>
      <Container maxWidth="xl">
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={10}>
          {/* Perfil a la izquierda */}
          <Box sx={{ flexShrink: 0, minWidth: 300, maxWidth: 400, width: '100%' }}>
            <Stack spacing={2}>
              <Card elevation={1} sx={{ borderRadius: 2, backgroundColor: 'white' }}>
                <CardContent sx={{ textAlign: 'center', py: 3 }}>
                  <Avatar
                    sx={{ width: 80, height: 80, mx: 'auto', mb: 2, bgcolor: '#6c757d' }}
                    src={perfil.photo || ''}
                  >
                    {!perfil.photo && <PersonIcon sx={{ fontSize: 40, color: 'white' }} />}
                  </Avatar>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 500 }}>{user.name}</Typography>
                  <Box display="flex" justifyContent="center" gap={4}>
                    <Box
                      textAlign="center"
                      onClick={() => navigate('/seguidores')}
                      sx={{
                        cursor: 'pointer',
                        '&:hover': {
                          color: '#071eec',
                          transform: 'scale(1.03)',
                          transition: 'all 0.2s ease-in-out',
                        },
                      }}
                    >
                      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 0.5}}>{seguidores.length}</Typography>
                      <Typography variant="caption" color="text.secondary">Seguidores</Typography>
                    </Box>
                    <Box
                      textAlign="center"
                      onClick={() => navigate('/seguidores')}
                      sx={{
                        cursor: 'pointer',
                        '&:hover': {
                          color: '#071eec',
                          transform: 'scale(1.03)',
                          transition: 'all 0.2s ease-in-out',
                        },
                      }}
                    >
                      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 0.5 }}>{seguidos.length}</Typography>
                      <Typography variant="caption" color="text.secondary">Siguiendo</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>

              <Card elevation={1} sx={{ borderRadius: 2, backgroundColor: 'white' }}>
                <CardContent sx={{ py: 2.5 }}>
                  <Box sx={{ mb: 2.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                      <EngineeringIcon sx={{ mr: 1, fontSize: 18 }} />
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>Softwares</Typography>
                    </Box>
                    <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
                      {perfil.softwares.map((item, index) => (
                        <Chip key={index} label={item} size="small" sx={{ bgcolor: '#071eec', color: 'white', fontSize: '0.75rem', height: 24 }} />
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
                        <Chip key={index} label={item} size="small" sx={{ bgcolor: '#071eec', color: 'white', fontSize: '0.75rem', height: 24 }} />
                      ))}
                    </Stack>
                  </Box>
                </CardContent>
              </Card>

              <Card elevation={1} sx={{ borderRadius: 2, backgroundColor: 'white' }}>
                <CardContent sx={{ py: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <PlaceIcon sx={{ mr: 1, fontSize: 18, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">{perfil.country}, {perfil.city}</Typography>
                  </Box>
                </CardContent>
              </Card>

              <Card elevation={1} sx={{ borderRadius: 2, backgroundColor: 'white' }}>
                <CardContent sx={{ py: 2.5 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>Sobre mí</Typography>
                  <Typography variant="body2" color="text.secondary">{perfil.about}</Typography>
                </CardContent>
              </Card>

              <Card elevation={1} sx={{ borderRadius: 2, backgroundColor: 'white' }}>
                <CardContent sx={{ py: 2.5 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>Redes</Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    {perfil.socialMedia.map(item => (
                      <Chip
                        key={item.platform}
                        label={item.account}
                        icon={socialIcons[item.platform]}
                        sx={{ bgcolor: '#071eec', color: 'white', '& .MuiChip-icon': { color: 'white' } }}
                      />
                    ))}
                  </Stack>
                </CardContent>
              </Card>

              <Stack direction="row" spacing={1} justifyContent="center">
                <Button variant="contained" sx={{ bgcolor: '#000', color: '#d4ff00', '&:hover': { bgcolor: '#222' }, fontWeight: 700, fontSize: '0.75rem', borderRadius: 1, px: 3, py: 1.2 }} onClick={() => navigate('/mis-proyectos')}>
                  MIS PROYECTOS
                </Button>
                <Button variant="contained" sx={{ bgcolor: '#000', color: '#d4ff00', '&:hover': { bgcolor: '#222' }, fontWeight: 700, fontSize: '0.75rem', borderRadius: 1, px: 3, py: 1.2 }} onClick={() => navigate('/favoritos')}>
                  FAVORITOS
                </Button>
                <Button variant="contained" sx={{ bgcolor: '#000', color: '#d4ff00', '&:hover': { bgcolor: '#222' }, fontWeight: 700, fontSize: '0.75rem', borderRadius: 1, px: 3, py: 1.2 }} onClick={() => navigate('/editar-perfil')}>
                  EDITAR
                </Button>
              </Stack>
            </Stack>
          </Box>

          {/* Portafolio a la derecha */}
          <Box flex={1}>
            <Grid container spacing={2}>
              {perfil.portafolio.length > 0 ? (
                perfil.portafolio.map((item, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <Card 
                      elevation={2}
                      sx={{ borderRadius: 2, bgcolor: '#f5f5f5', cursor: 'pointer' }}
                      onClick={() => handleOpen(item)}>
                      {item.tipo === 'imagen' ? (
                        <Box
                          component="img"
                          src={item.url}
                          alt={`portafolio-${index}`}
                          sx={{ width: '100%', height: 180, objectFit: 'cover', borderRadius: 2 }}
                        />
                      ) : (
                        <video
                          src={item.url}
                          controls
                          style={{ width: '100%', height: 180, borderRadius: 8, objectFit: 'cover' }}
                        />
                      )}
                    </Card>
                  </Grid>
                ))
              ) : (
                <Grid item xs={12}>
                  <Card elevation={0} sx={{ height: 200, border: '2px dashed #90caf9', bgcolor: '#e3f2fd', borderRadius: 2 }}>
                    <CardContent sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                        No hay elementos de portafolio aún.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              )}
            </Grid>

        {/* Modal para ver la imagen/video ampliado */}
          <Modal open={open} onClose={handleClose} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
            <Box sx={{ maxWidth: 800, maxHeight: 450, width: '100%', borderRadius: 2 }}>
              {selectedItem && selectedItem.tipo === 'imagen' ? (
                <Box
                  component="img"
                  src={selectedItem.url}
                  alt="portafolio ampliado"
                  sx={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 2 }}
                />
              ) : selectedItem && selectedItem.tipo === 'video' ? (
                <Box
                  component="video"
                  controls
                  src={selectedItem.url}
                  sx={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 2 }}
                />
              ) : null}
            </Box>
          </Modal>

          </Box>
        </Box>
      </Container>
    </Box>
  );
};