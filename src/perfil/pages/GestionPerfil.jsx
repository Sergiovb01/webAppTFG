import {
  TextField, MenuItem, Button, Avatar, Box, Chip, Stack, IconButton, Typography
} from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import AddIcon from '@mui/icons-material/Add';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const softwareOptions = [ 'Photoshop', 'Blender', 'After Effects', 'Maya', 'Nuke', 'DaVinci Resolve', 'Substance Painter', '3ds Max', 'Cinema 4D', 'ZBrush', 'Houdini', 'Premiere Pro', 'Unreal Engine', 'Unity', 'Krita', 'Fusion'];
const skillOptions = ['Modelado','Animación','Ilustración','Iluminación','Composición','Rotoscopia','Simulación de partículas','Tracking de cámara','Motion Graphics','Texturizado','Rigging','Postproducción','Layout','Storyboarding','Dirección de arte','Edición de video','Color Grading','Concept Art','Renderizado'];

const countryOptions = ['España', 'México', 'Argentina'];
const cityByCountry = {
  'España': ['Madrid', 'Barcelona'],
  'México': ['Ciudad de México', 'Guadalajara'],
  'Argentina': ['Buenos Aires', 'Córdoba']
};
const socialOptions = ['Instagram', 'Twitter', 'LinkedIn'];

const socialIcons = {
  Instagram: <InstagramIcon />, Twitter: <TwitterIcon />, LinkedIn: <LinkedInIcon />
};

export const GestionPerfil = ({ initialData = null, onSubmit }) => {
  const [formData, setFormData] = useState({
    software: [], skill: [], country: '', city: '', about: '',
    social: [], profilePhoto: null,
    portfolioFiles: [],
    existingPortfolio: initialData?.portafolio || [],
    existingPhoto: initialData?.photo || null
  });

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
        icon: 'warning', title: 'Campos incompletos', text: 'Por favor completa todos los campos obligatorios.'
      });
      return;
    }
    onSubmit(formData);
  };

  return (
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
        <Typography mt={1}>Foto de perfil</Typography>
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
              <TextField select fullWidth label="Software" name="currentSoftware" value={formData.currentSoftware} onChange={handleChange}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addToList('Software'))}>
                {softwareOptions.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
              </TextField>
              <IconButton onClick={() => addToList('Software')}><AddIcon sx={{ color: '#1976d2' }} /></IconButton>
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
              <TextField select fullWidth label="Skills" name="currentSkill" value={formData.currentSkill} onChange={handleChange}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addToList('Skill'))}>
                {skillOptions.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
              </TextField>
              <IconButton onClick={() => addToList('Skill')}><AddIcon sx={{ color: '#1976d2' }} /></IconButton>
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
            <TextField select fullWidth label="País" name="country" value={formData.country} onChange={handleChange}>
              {countryOptions.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
            </TextField>
            <TextField select fullWidth label="Ciudad" name="city" value={formData.city} onChange={handleChange}>
              {(cityByCountry[formData.country] || []).map(city => (
                <MenuItem key={city} value={city}>{city}</MenuItem>
              ))}
            </TextField>
          </Box>

          <TextField label="Información sobre ti" name="about" multiline rows={4} fullWidth value={formData.about} onChange={handleChange} />

          {/* REDES SOCIALES */}
          <Box mt={3}>
            <Box display="flex" gap={1}>
              <TextField select fullWidth label="Red Social" name="currentSocial" value={formData.currentSocial} onChange={handleChange}>
                {socialOptions.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
              </TextField>
              <TextField label="Cuenta" name="socialAccount" fullWidth value={formData.socialAccount} onChange={handleChange} />
              <IconButton onClick={() => {
                const { currentSocial, socialAccount } = formData;
                if (currentSocial && socialAccount) {
                  const formatted = `${currentSocial}: ${socialAccount}`;
                  if (!formData.social.includes(formatted)) {
                    setFormData({ ...formData, social: [...formData.social, formatted], currentSocial: '', socialAccount: '' });
                  }
                }
              }}>
                <AddIcon sx={{ color: '#1976d2' }} />
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
        <Box flex={1} display="flex" flexDirection="column" alignItems="center">
          <Typography mb={2}>Sube tus proyectos / portafolio</Typography>
          <Box sx={{ width: '100%', height: 390, bgcolor: '#f0f0f0', p: 2, overflowY: 'auto', borderRadius: 2 }}>
            {formData.existingPortfolio.length === 0 && formData.portfolioFiles.length === 0? (
              <Box display="flex" alignItems="center" justifyContent="center" height="100%">
                <UploadIcon sx={{ fontSize: 60, color: '#1976d2' }} />
              </Box>
            ) : (
              <Stack direction="row" spacing={2} flexWrap="wrap">
                {formData.existingPortfolio.map((item, idx) => (
                  <Box key={`existing-${idx}`} sx={{ position: 'relative', width: 100, height: 100, overflow: 'hidden', borderRadius: 1, border: '1px solid #ccc' }}>
                    <img src={item.url} alt={`existing-${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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

                {formData.portfolioFiles.map((file, idx) => (
                  <Box key={`new-${idx}`} sx={{ position: 'relative', width: 100, height: 100, overflow: 'hidden', borderRadius: 1, border: '1px solid #ccc' }}>
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`new-${idx}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
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
                ))}
              </Stack>

            )}
          </Box>
          <Button variant="outlined" component="label" startIcon={<UploadIcon />} sx={{ color: '#1DB954', borderColor: '#1DB954', mt: 2 }}>
            Subir archivo
            <input type="file" hidden multiple accept="image/*" onChange={handlePortfolioUpload} />
          </Button>
        </Box>
      </Box>

      <Box textAlign="center" mt={4}>
        <Button variant="contained" type="submit" sx={{ bgcolor: '#1DB954', '&:hover': { bgcolor: '#1ed760' } }}>
          Guardar perfil
        </Button>
      </Box>
    </form>
  );
};
