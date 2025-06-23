import { useEffect, useState } from "react";
import { useAuthStore, usePerfilStore } from "../../hooks";
import { useNavigate, useParams } from "react-router-dom";
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

import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { useUsuarioStore } from "../../hooks/useUsuarioStore";

export const PerfilUserId = () => {
  const { id } = useParams();
  const { cargarPerfilId, perfil, loading } = usePerfilStore();
  const { seguirUsuario, dejarDeSeguirUsuario} = useUsuarioStore();
  const [isFollowing, setIsFollowing] = useState(false);
  const { user: currentUser } = useAuthStore(); // Usuario autenticado
  const navigate = useNavigate();
   const socialIcons = {
    Instagram: <InstagramIcon />, 
    Twitter: <TwitterIcon />, 
    LinkedIn: <LinkedInIcon />
  };

  useEffect(() => {
    cargarPerfilId(id);
  }, [id]);
console.log('Perfil data:', perfil);
  // Verifica si el usuario autenticado ya sigue al usuario mostrado
  useEffect(() => {
  if (perfil && perfil.user && perfil.user.seguidores?.includes(currentUser.uid)) {
    setIsFollowing(true);
  }
}, [perfil, currentUser]);

// Maneja el evento de seguir/dejar de seguir
const handleFollowToggle = async () => {
  let success = false;
  if (isFollowing) {
    success = await dejarDeSeguirUsuario(perfil.user._id);
  } else {
    success = await seguirUsuario(perfil.user._id);
  }

  if (success) setIsFollowing(!isFollowing);
};
  if (loading || !perfil) {
    return <div>Cargando...</div>;
  }

  return (
     <Box sx={{ minHeight: '100vh', p: 2 }}>
      <Container maxWidth="xl">
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={4}>
          {/* Perfil a la izquierda */}
          <Box sx={{ flexShrink: 0, minWidth: 300, maxWidth: 400, width: '100%' }}>
            <Stack spacing={1}>
              <Card elevation={1} sx={{ borderRadius: 2, backgroundColor: 'white' }}>
                <CardContent sx={{ textAlign: 'center', py: 3 }}>
                  <Avatar
                    sx={{ width: 80, height: 80, mx: 'auto', mb: 2, bgcolor: '#6c757d' }}
                    src={perfil.photo || ''}
                  >
                    {!perfil.photo && <PersonIcon sx={{ fontSize: 40, color: 'white' }} />}
                  </Avatar>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 500 }}>{perfil.user.name}</Typography>
                   <Box display="flex" justifyContent="center" sx={{ mb: 3 }}>
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
                  {/* <Box display="flex" justifyContent="center" gap={4}>
                    <Box
                      textAlign="center"
                      sx={{
                        cursor: 'default',
                      }}
                    >
                      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 0.5 }}>32</Typography>
                      <Typography variant="caption" color="text.secondary">Seguidores</Typography>
                    </Box>
                    <Box
                      textAlign="center"
                      sx={{
                        cursor: 'default',
                      }}
                    >
                      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 0.5 }}>45</Typography>
                      <Typography variant="caption" color="text.secondary">Siguiendo</Typography>
                    </Box>
                  </Box> */}
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

              <Stack direction="row" spacing={2} justifyContent="center">
                <Button variant="contained" sx={{ bgcolor: '#000', color: '#d4ff00', '&:hover': { bgcolor: '#222' }, fontWeight: 700, fontSize: '0.75rem', borderRadius: 1, px: 3, py: 1.2 }} onClick={() => navigate(`/proyectos-usuario/${perfil.user._id}`)}>
                 PROYECTOS
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
                    <Card elevation={2} sx={{ borderRadius: 2, bgcolor: '#f5f5f5' }}>
                      {item.tipo === 'imagen' ? (
                        <Box
                          component="img"
                          src={item.url}
                          alt={`portafolio-${index}`}
                          sx={{ width: '100%', height: 180, objectFit: 'cover', borderRadius: 2 }}
                        />
                      ) : (
                        <Box component="video" controls src={item.url} sx={{ width: '100%', height: 180, borderRadius: 2 }} />
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
          </Box>
        </Box>
      </Container>
    </Box>
  )
}


