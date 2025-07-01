import {
  TextField, MenuItem, Button, Avatar, Box, Chip, Stack, IconButton, Typography,
  Fab
} from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import AddIcon from '@mui/icons-material/Add';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball'; 
import BrushIcon from '@mui/icons-material/Brush'; 
import { Backdrop, CircularProgress } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { usePerfilStore } from '../../hooks/usePerfilStore';

const softwareOptions = [ 'Photoshop', 'Blender', 'After Effects', 'Maya', 'Nuke', 'DaVinci Resolve', 'Substance Painter', '3ds Max', 'Cinema 4D', 'ZBrush', 'Houdini', 'Premiere Pro', 'Unreal Engine', 'Unity', 'Krita', 'Fusion'];
const skillOptions = ['Modelado','Animación','Ilustración','Iluminación','Composición','Rotoscopia','Simulación de partículas','Tracking de cámara','Motion Graphics','Texturizado','Rigging','Postproducción','Layout','Storyboarding','Dirección de arte','Edición de video','Color Grading','Concept Art','Renderizado'];

const countryOptions = ['España', 'México', 'Argentina', 'Colombia', 'Chile', 'Perú', 'Estados Unidos', 'Brasil', 'Francia', 'Italia', 'Alemania', 'Reino Unido', 'Japón', 'Canadá'];
const cityByCountry = {
  'España': [ 'Madrid','Barcelona','Sevilla','Valencia','Bilbao','Málaga','Zaragoza','Granada','Salamanca','San Sebastián','Alicante','Córdoba','Valladolid','La Coruña','Santander','Toledo','Pamplona','Murcia','Oviedo','Gijón'],
  'México': ['Ciudad de México', 'Guadalajara', 'Monterrey', 'Cancún', 'Puebla', 'Tijuana'],
  'Argentina': ['Buenos Aires', 'Córdoba', 'Rosario', 'Mendoza', 'La Plata'],
  'Colombia': ['Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena'],
  'Chile': ['Santiago', 'Valparaíso', 'Concepción', 'La Serena', 'Antofagasta'],
  'Perú': ['Lima', 'Arequipa', 'Cusco', 'Trujillo', 'Piura'],
  'Estados Unidos': ['Nueva York', 'Los Ángeles', 'San Francisco', 'Chicago', 'Miami', 'Seattle'],
  'Brasil': ['São Paulo', 'Río de Janeiro', 'Brasilia', 'Belo Horizonte', 'Salvador'],
  'Francia': ['París', 'Lyon', 'Marsella', 'Toulouse', 'Niza'],
  'Italia': ['Roma', 'Milán', 'Florencia', 'Venecia', 'Nápoles'],
  'Alemania': ['Berlín', 'Hamburgo', 'Múnich', 'Colonia', 'Frankfurt'],
  'Reino Unido': ['Londres', 'Manchester', 'Edimburgo', 'Birmingham', 'Liverpool'],
  'Japón': ['Tokio', 'Osaka', 'Kioto', 'Yokohama', 'Nagoya'],
  'Canadá': ['Toronto', 'Vancouver', 'Montreal', 'Ottawa', 'Calgary']
};

const socialOptions = ['Instagram', 'Twitter', 'LinkedIn', 'Behance', 'Dribbble', 'Facebook', 'YouTube'];


const socialIcons = {
  Instagram: <InstagramIcon />,
  Twitter: <TwitterIcon />,
  LinkedIn: <LinkedInIcon />,
  Behance: <BrushIcon />,
  Dribbble: <SportsBasketballIcon />,
  Facebook: <FacebookIcon />,
  YouTube: <YouTubeIcon />
};


export const GestionPerfil = ({ initialData = null, onSubmit }) => {
  const [formData, setFormData] = useState({
    software: [], skill: [], country: '', city: '', about: '',
    social: [], profilePhoto: null,
    portfolioFiles: [],
    existingPortfolio: initialData?.portafolio || [],
    existingPhoto: initialData?.photo || null
  });
const {loading} =usePerfilStore();

  useEffect(() => {
    if (initialData) {
      setFormData({
        software: initialData.softwares || [],
        skill: initialData.skills || [],
        country: initialData.country || '',
        city: initialData.city || '',
        about: initialData.about || '',
        social: (initialData.socialMedia || []).map(s => `${s.platform}: ${s.account}`),
        profilePhoto: initialData.photo || null, portfolioFiles: [],
        existingPhoto: initialData.photo || null,
        existingPortfolio: initialData.portafolio || []
      });
    }
    console.log(loading);
  }, [initialData]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) setFormData({ ...formData, profilePhoto: file });
  };

  const handlePortfolioUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, portfolioFiles: [...formData.portfolioFiles, ...files] });
  };

  const addToList = (field) => {
    const key = `current${field}`;
    const targetField = field.toLowerCase();
    if (formData[key] && !formData[targetField].includes(formData[key])) {
      setFormData({
        ...formData,
        [targetField]: [...formData[targetField], formData[key]],
        [key]: ''
      });
    }
  };

  const removeFromList = (field, value) => {
    setFormData({ ...formData, [field]: formData[field].filter(item => item !== value) });
  };

  const CreatePerfilSubmit = async (e) => {
    e.preventDefault();
    if (!formData.software.length || !formData.skill.length || !formData.country || !formData.city || !formData.about) {
      Swal.fire({
        icon: 'warning', title: 'Campos incompletos', text: 'Por favor completa todos los campos obligatorios.', confirmButtonColor: '#3085d6'
      });
      return;
    }
    onSubmit(formData);
     console.log(loading);
  };

  return (
    <>
    <form onSubmit={CreatePerfilSubmit} style={{ color: 'white', padding: '2rem' }}>
      <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
       <Avatar
        sx={{ width: 100, height: 100 }}
        src={
          formData.profilePhoto
            ? typeof formData.profilePhoto === 'string'
              ? formData.profilePhoto
              : URL.createObjectURL(formData.profilePhoto)
            : formData.existingPhoto || ''
        }
      />
        <Typography mt={1} sx={{color: '#071eec'}}>Foto de perfil</Typography>
        <Button variant="outlined" component="label" sx={{ mt: 1, color: '#1976d2', borderColor: '#1976d2' }}>
          Subir foto de perfil
          <input type="file" hidden accept="image/*" onChange={handlePhotoChange} />
        </Button>
      </Box>

      <Box display="flex" gap={4}>
        <Box flex={1}>
          {/* SOFTWARE */}
          <Box mb={3}>
            <Box display="flex" gap={1}>
              <TextField  select fullWidth label="Software" name="currentSoftware" value={formData.currentSoftware} onChange={handleChange} 
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addToList('Software'))}>
                {softwareOptions.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
              </TextField>
              <Fab size="small" onClick={() => addToList('Software')} sx={{ bgcolor: '#1976d2', color: 'white', '&:hover': { bgcolor: '#115293' } }}><AddIcon /></Fab>
            </Box>
            <Stack direction="row" spacing={1} flexWrap="wrap" mt={1}>
              {formData.software.map(item => (
                <Chip key={item} label={item} onDelete={() => removeFromList('software', item)}
                  sx={{ bgcolor: '#1976d2', color: 'white' }} />
              ))}
            </Stack>
          </Box>

          {/* SKILLS */}
          <Box mb={3}>
            <Box display="flex" gap={1}>
              <TextField   select fullWidth label="Skills" name="currentSkill" value={formData.currentSkill} onChange={handleChange}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addToList('Skill'))}>
                {skillOptions.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
              </TextField>
              <Fab size="small" onClick={() => addToList('Skill')} sx={{ bgcolor: '#1976d2', color: 'white', '&:hover': { bgcolor: '#115293' } }}><AddIcon /></Fab>
            </Box>
            <Stack direction="row" spacing={1} flexWrap="wrap" mt={1}>
              {formData.skill.map(item => (
                <Chip key={item} label={item} onDelete={() => removeFromList('skill', item)}
                  sx={{ bgcolor: '#1976d2', color: 'white' }} />
              ))}
            </Stack>
          </Box>

          {/* PAÍS y CIUDAD */}
          <Box display="flex" gap={2} mb={3}>
            <TextField   select fullWidth label="País" name="country" value={formData.country} onChange={handleChange}>
              {countryOptions.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
            </TextField>
            <TextField   select fullWidth label="Ciudad" name="city" value={formData.city} onChange={handleChange}>
              {(cityByCountry[formData.country] || []).map(city => (
                <MenuItem key={city} value={city}>{city}</MenuItem>
              ))}
            </TextField>
          </Box>

          <TextField   label="Información sobre ti" name="about" multiline rows={4} fullWidth value={formData.about} onChange={handleChange} />

          {/* REDES SOCIALES */}
          <Box mt={3}>
            <Box display="flex" gap={1}>
              <TextField   select fullWidth label="Red Social" name="currentSocial" value={formData.currentSocial} onChange={handleChange}>
                {socialOptions.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
              </TextField>
              <TextField label="Cuenta" name="socialAccount" fullWidth value={formData.socialAccount} onChange={handleChange} />
              
              <IconButton 
              sx={{ bgcolor: '#1976d2', color: 'white', '&:hover': { bgcolor: '#115293' } }}
              onClick={() => {
                const { currentSocial, socialAccount } = formData;
                if (currentSocial && socialAccount) {
                  const formatted = `${currentSocial}: ${socialAccount}`;
                  if (!formData.social.includes(formatted)) {
                    setFormData({ ...formData, social: [...formData.social, formatted], currentSocial: '', socialAccount: '' });
                  }
                }
              }}>
                <AddIcon  />
              </IconButton>
            </Box>
            <Stack direction="row" spacing={1} flexWrap="wrap" mt={1}>
              {formData.social.map(item => {
                const [platform, account] = item.split(': ');
                return (
                  <Chip key={item} label={account} icon={socialIcons[platform]}
                    onDelete={() => removeFromList('social', item)}
                    sx={{ bgcolor: '#1976d2', color: 'white', '& .MuiChip-icon': { color: 'white' } }} />
                );
              })}
            </Stack>
          </Box>
        </Box>

        {/* PORTAFOLIO */}
        <Box flex={1} display="flex" flexDirection="column" alignItems="center" >
          <Typography mb={2} sx={{color: '#071eec'}}>Crea tu portafolio</Typography>
          <Box sx={{ width: '100%', height: 390, bgcolor: 'background.paper', p: 2, overflowY: 'auto', borderRadius: 2, border: '2px dashed #ccc', }}>
            {formData.existingPortfolio.length === 0 && formData.portfolioFiles.length === 0 ? (
              <Box display="flex" alignItems="center" justifyContent="center" height="100%">
                <UploadIcon sx={{ fontSize: 60, color: '#1976d2' }} />
              </Box>
            ) : (
              <Stack direction="row" spacing={2} flexWrap="wrap">
                {/* Archivos EXISTENTES */}
                {formData.existingPortfolio.map((item, idx) => (
                  <Box key={`existing-${idx}`} sx={{ position: 'relative', width: 100, height: 100, overflow: 'hidden', borderRadius: 1, border: '1px solid #ccc' }}>
                    {item.tipo === 'video' ? (
                      <video src={item.url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} controls />
                    ) : (
                      <img src={item.url} alt={`existing-${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    )}
                    <IconButton
                      size="small"
                      onClick={() => {
                        const updated = formData.existingPortfolio.filter((_, i) => i !== idx);
                        setFormData({ ...formData, existingPortfolio: updated });
                      }}
                      sx={{ position: 'absolute', top: 4, right: 4, bgcolor: 'rgba(255,255,255,0.7)' }}
                    >
                      <DeleteIcon sx={{ fontSize: 16, color: '#d32f2f' }} />
                    </IconButton>
                  </Box>
                ))}

                {/* Archivos NUEVOS */}
                {formData.portfolioFiles.map((file, idx) => {
                  const isVideo = file.type.startsWith('video/');
                  return (
                    <Box key={`new-${idx}`} sx={{ position: 'relative', width: 100, height: 100, overflow: 'hidden', borderRadius: 1, border: '1px solid #ccc' }}>
                      {isVideo ? (
                        <video src={URL.createObjectURL(file)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} controls />
                      ) : (
                        <img src={URL.createObjectURL(file)} alt={`new-${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      )}
                      <IconButton
                        size="small"
                        onClick={() => {
                          const updated = formData.portfolioFiles.filter((_, i) => i !== idx);
                          setFormData({ ...formData, portfolioFiles: updated });
                        }}
                        sx={{ position: 'absolute', top: 4, right: 4, bgcolor: 'rgba(255,255,255,0.7)' }}
                      >
                        <DeleteIcon sx={{ fontSize: 16, color: '#d32f2f' }} />
                      </IconButton>
                    </Box>
                  );
                })}
              </Stack>
            )}
          </Box>

          {/* Cambiar el input para aceptar imágenes y vídeos */}
          <Button variant="outlined" component="label" startIcon={<UploadIcon />} sx={{ color: '#1DB954', borderColor: '#1DB954', mt: 2 }}>
            Subir archivo
            <input type="file" hidden multiple accept="image/*,video/*" onChange={handlePortfolioUpload} />
          </Button>
      </Box>

      </Box>

      <Box textAlign="center" mt={4}>
        <Button variant="contained" type="submit" sx={{ bgcolor: '#1DB954', '&:hover': { bgcolor: '#1ed760' } }}>
          Guardar perfil
        </Button>
      </Box>
    </form>
    <Backdrop
      sx={{ color: '#071eec', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={loading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
    </>
  );
};
