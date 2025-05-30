import { TextField, MenuItem, Button, Avatar, Box, Chip, Stack, IconButton } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import AddIcon from '@mui/icons-material/Add';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useState } from 'react';
import { usePerfilStore } from '../../hooks';
import { useNavigate } from 'react-router-dom';


const softwareOptions = ['Photoshop', 'Blender', 'After Effects'];
const skillOptions = ['Modelado', 'Animación', 'Ilustración'];
const countryOptions = ['España', 'México', 'Argentina'];
const cityOptions = ['Madrid', 'Ciudad de México', 'Buenos Aires'];
const socialOptions = ['Instagram', 'Twitter', 'LinkedIn'];

// const uploadImageToCloudinary = async (file) => {
//   const formData = new FormData();
//   formData.append('file', file);
//   formData.append('upload_preset', 'tu_upload_preset'); // Reemplaza con tu preset

//   const res = await fetch('https://api.cloudinary.com/v1_1/tu_cloud_name/image/upload', {
//     method: 'POST',
//     body: formData
//   });

//   const data = await res.json();
//   return data.secure_url;
// };


export const GestionPerfil = () => {
  const { startCrearPerfil } = usePerfilStore();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    software: [],
    skill: [],
    country: '',
    city: '',
    about: '',
    social: [],
    socialAccount: '',
    currentSoftware: '',
    currentSkill: '',
    currentSocial: '',
    profilePhoto: null
  });

  const socialIcons = {
    Instagram: <InstagramIcon />,
    Twitter: <TwitterIcon />,
    LinkedIn: <LinkedInIcon />
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profilePhoto: file });
    }
  };

  const addToList = (field) => {
    if (formData[`current${field}`] && !formData[field.toLowerCase()].includes(formData[`current${field}`])) {
      setFormData({
        ...formData,
        [field.toLowerCase()]: [...formData[field.toLowerCase()], formData[`current${field}`]],
        [`current${field}`]: ''
      });
    }
  };

  const removeFromList = (field, value) => {
    setFormData({
      ...formData,
      [field]: formData[field].filter(item => item !== value)
    });
  };

  const CreatePerfilSubmit = async (e) => {
    e.preventDefault();
    try {
      // let imageUrl = '';

      // if (formData.profilePhoto) {
      //   imageUrl = await uploadImageToCloudinary(formData.profilePhoto);
      // } else {
      //   alert('Por favor sube una foto de perfil');
      //   return;
      // }

      const perfilData = {
        softwares: formData.software,
        skills: formData.skill,
        country: formData.country,
        city: formData.city,
        about: formData.about,
        // photo: imageUrl,
        socialMedia: formData.social.map(item => {
          const [platform, account] = item.split(': ');
          return { platform, account };
        })
      };
      await startCrearPerfil(perfilData);
      navigate('/perfil');
    } catch (error) {
      console.error('Error al crear perfil:', error);
      alert('Hubo un error al guardar el perfil.');
    }
  };

  return (
    <form onSubmit={CreatePerfilSubmit} className="container mt-4" style={{ color: 'white', padding: '2rem', borderRadius: '10px' }}>
      <div className="text-center mb-4">
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar
            sx={{ width: 100, height: 100 }}
            src={formData.profilePhoto ? URL.createObjectURL(formData.profilePhoto) : ''}
          />
          <p className="mt-2">Foto de perfil</p>
          <Button
            variant="contained"
            component="label"
          >
            Subir foto de perfil
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handlePhotoChange}
            />
          </Button>
        </Box>
      </div>

      <div className="row g-4">
        <div className="col-md-6">
          <div className="mb-3">
            <div className="d-flex gap-2 mb-2">
              <TextField
                select
                fullWidth
                label="Software"
                name="currentSoftware"
                value={formData.currentSoftware}
                onChange={handleChange}
              >
                {softwareOptions.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
              </TextField>
              <IconButton onClick={() => addToList('Software')}><AddIcon sx={{ color: '#e98d04' }} /></IconButton>
            </div>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {formData.software.map(item => (
                <Chip
                  key={item}
                  label={item}
                  onDelete={() => removeFromList('software', item)}
                  sx={{ bgcolor: '#e98d04', color: 'white' }}
                />
              ))}
            </Stack>
          </div>

          <div className="mb-3">
            <div className="d-flex gap-2 mb-2">
              <TextField
                select
                fullWidth
                label="Skills"
                name="currentSkill"
                value={formData.currentSkill}
                onChange={handleChange}
              >
                {skillOptions.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
              </TextField>
              <IconButton onClick={() => addToList('Skill')}><AddIcon sx={{ color: '#e98d04' }} /></IconButton>
            </div>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {formData.skill.map(item => (
                <Chip
                  key={item}
                  label={item}
                  onDelete={() => removeFromList('skill', item)}
                  sx={{ bgcolor: '#e98d04', color: 'white' }}
                />
              ))}
            </Stack>
          </div>

          <div className="d-flex gap-2 mb-3">
            <TextField
              select
              fullWidth
              label="País"
              name="country"
              value={formData.country}
              onChange={handleChange}
            >
              {countryOptions.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
            </TextField>

            <TextField
              select
              fullWidth
              label="Ciudad"
              name="city"
              value={formData.city}
              onChange={handleChange}
            >
              {cityOptions.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
            </TextField>
          </div>

          <TextField
            label="Información sobre ti"
            name="about"
            multiline
            rows={4}
            fullWidth
            value={formData.about}
            onChange={handleChange}
            className="mb-3"
          />

          <div className="mb-3">
            <div className="d-flex gap-2 mb-2">
              <TextField
                select
                fullWidth
                label="Red Social"
                name="currentSocial"
                value={formData.currentSocial}
                onChange={handleChange}
              >
                {socialOptions.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
              </TextField>

              <TextField
                label="Cuenta"
                name="socialAccount"
                fullWidth
                value={formData.socialAccount}
                onChange={handleChange}

              />

              <IconButton onClick={() => {
                if (formData.currentSocial && formData.socialAccount) {
                  const formatted = `${formData.currentSocial}: ${formData.socialAccount}`;
                  if (!formData.social.includes(formatted)) {
                    setFormData({
                      ...formData,
                      social: [...formData.social, formatted],
                      currentSocial: '',
                      socialAccount: ''
                    });
                  }
                }
              }}>
                <AddIcon sx={{ color: '#e98d04' }} />
              </IconButton>
            </div>
           <Stack direction="row" spacing={1} flexWrap="wrap">
                {formData.social.map(item => {
                    const [platform, account] = item.split(': ');
                    return (
                    <Chip
                        key={item}
                        label={account}
                        icon={socialIcons[platform]}
                        onDelete={() => removeFromList('social', item)}
                        sx={{ bgcolor: '#e98d04', color: 'white', '& .MuiChip-icon': { color: 'white' } }}
                    />
                    );
                })}
            </Stack>
          </div>
        </div>

        <div className="col-md-6 d-flex flex-column align-items-center justify-content-start">
          <h5 className="mb-3">Sube tus proyectos / portafolio</h5>
          <Box className="mb-3" sx={{ width: '100%', height: 390, bgcolor: '#2a2a2a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <UploadIcon sx={{ fontSize: 60, color: '#e98d04' }} />
          </Box>
          <Button variant="outlined" startIcon={<UploadIcon />} sx={{ color: '#1DB954', borderColor: '#1DB954' }}>
            Subir archivo
          </Button>
        </div>
      </div>

      <div className="text-center mt-4">
        <Button variant="contained" type="submit" sx={{ bgcolor: '#1DB954', '&:hover': { bgcolor: '#1ed760' } }}>
          Guardar perfil
        </Button>
      </div>
    </form>
  );
};
