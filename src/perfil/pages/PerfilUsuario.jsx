
import { useEffect, useState } from 'react';
import { usePerfilStore } from '../../hooks';
import { useSelector } from 'react-redux';
import { Button, Avatar, Chip, Stack } from '@mui/material';
import BrushIcon from '@mui/icons-material/Brush';
import EngineeringIcon from '@mui/icons-material/Engineering';
import PlaceIcon from '@mui/icons-material/Place';

import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export const PerfilUsuario = () => {

  const { startCargarPerfil, perfil } = usePerfilStore();

  const { user } = useSelector(state => state.auth)

  const [userData, setUserData] = useState({
    projects: Array(9).fill(null) // 9 espacios para proyectos
  });

   const socialIcons = {
    Instagram: <InstagramIcon />,
    Twitter: <TwitterIcon />,
    LinkedIn: <LinkedInIcon />
  };


  useEffect(() => {
    startCargarPerfil();
  }, []);

console.log({perfil})
  if (!perfil) return <p className="text-center mt-10">Cargando perfil...</p>;



  return (
   <div className="min-vh-100 bg-light p-3">
      <div className="container-fluid">
        <div className="row g-4">
          
          {/* Sidebar Izquierdo */}
          <div className="col-lg-4 col-xl-3">
            <div className="d-flex flex-column gap-3">
              
              {/* Perfil Principal */}
              <div className="card shadow-sm">
                <div className="card-body text-center">
                  <div className="bg-secondary rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" 
                       style={{width: '80px', height: '80px'}}>
                    <i className="bi bi-person-fill fs-1 text-white"></i>
                  </div>
                  <h5 className="card-title mb-3">{user.name}</h5>
                  <div className="row text-center">
                    <div className="col-6">
                      <div className="fs-4 fw-bold">32</div>
                      <small className="text-muted">Seguidores</small>
                    </div>
                    <div className="col-6">
                      <div className="fs-4 fw-bold">45</div>
                      <small className="text-muted">Siguiendo</small>
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills y Software */}
              <div className="card shadow-sm">
                <div className="card-body">
                  <div className="mb-3">
                    <div className="d-flex align-items-center mb-2">
                      <EngineeringIcon/>
                      <small className="fw-medium">Softwares</small>
                    </div>
                    <div className="d-flex flex-wrap gap-1">
                       <Stack direction="row" spacing={1} flexWrap="wrap">
                        {perfil.softwares.map(item => (
                          <Chip
                            key={item}
                            label={item}
                            sx={{ bgcolor: '#e98d04', color: 'white' }}
                          />
                        ))}
                      </Stack>
                    </div>
                  </div>
                  
                  <div className="mb-0">
                    <div className="d-flex align-items-center mb-2">
                      <BrushIcon/>
                      <small className="fw-medium">Habilidades</small>
                    </div>
                    <div className="d-flex flex-wrap gap-1">
                      <Stack direction="row" spacing={1} flexWrap="wrap">
                        {perfil.skills.map(item => (
                          <Chip
                            key={item}
                            label={item}
                            sx={{ bgcolor: '#e98d04', color: 'white' }}
                          />
                        ))}
                      </Stack>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ubicación */}
              <div className="card shadow-sm">
                <div className="card-body">
                  <div className="d-flex align-items-center text-muted">
                    <PlaceIcon/>
                    <small>{perfil.country}, {perfil.city}</small>
                  </div>
                </div>
              </div>

              {/* Sobre mí */}
              <div className="card shadow-sm">
                <div className="card-body">
                  <h6 className="card-title">Sobre mí</h6>
                  <div className="d-flex flex-column gap-2">
                    <p>{perfil.about}</p>
                  </div>
                </div>
              </div>

              {/* Redes Sociales */}
              <div className="card shadow-sm">
                <div className="card-body">
                  <h6 className="card-title">Redes</h6>
                  <div className="d-flex gap-3">
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                      {perfil.socialMedia.map(item => {
                        return (
                        <Chip
                            key={item.platform}
                            label={item.account}
                            icon={socialIcons[item.platform]}
                            sx={{ bgcolor: '#e98d04', color: 'white', '& .MuiChip-icon': { color: 'white' } }}
                        />
                        );
                        })}
                    </Stack>
                  </div>
                </div>
              </div>

              {/* Botones de Navegación */}
              <div className="d-flex gap-2">
                 <Button variant="contained" type="submit" sx={{ bgcolor: '#1DB954', '&:hover': { bgcolor: '#1ed760' } }}>
                  Guardar perfil
                </Button>
                <Button variant="contained" type="submit" sx={{ bgcolor: '#1DB954', '&:hover': { bgcolor: '#1ed760' } }}>
                  Guardar perfil
                </Button>
              </div>
            </div>
          </div>

          {/* Contenido Principal - Grid de Proyectos */}
          <div className="col-lg-8 col-xl-9">
            <div className="row g-3">
              {userData.projects.map((project, index) => (
                <div key={index} className="col-sm-6 col-lg-4">
                  <div className="card h-100 border-2 border-dashed" 
                       style={{minHeight: '200px'}}>
                    <div className="card-body d-flex align-items-center justify-content-center">
                      {index === userData.projects.length - 1 ? (
                        <button className="btn btn-outline-secondary rounded-circle p-3">
                          <i className="bi bi-plus fs-4"></i>
                        </button>
                      ) : (
                        <div className="text-muted text-center">
                          <small>Proyecto {index + 1}</small>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};