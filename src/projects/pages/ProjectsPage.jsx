import Grid from '@mui/material/Grid';
import { BusquedaProyectos } from "../componentes/BusquedaProyectos";
import { TarjetaProyecto } from '../componentes/TarjetaProyecto';
import { useProyectoStore } from '../../hooks/useProyectoStore';
import { useEffect, useState } from 'react';
import { Fade, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { SinPerfil } from '../../componentes/sinPerfil';
import { usePerfilStore } from '../../hooks';
import { NoProjects } from '../componentes/NoProjects';



export const ProjectsPage = () => {

  const { publicaciones, cargarPublicaciones, filtrarProyectos} = useProyectoStore()
  const [perfilExiste, setPerfilExiste] = useState(null); 
  const { comprobarPerfil } = usePerfilStore();

   useEffect(() => {
    const verificarPerfil = async () => {
      const perfil = await comprobarPerfil();
      if (perfil) {
        setPerfilExiste(true);
        cargarPublicaciones();
      } else {
        setPerfilExiste(false);
      }
    };

    verificarPerfil();
  }, []);

 const handleSearch = (filters) => {
    filtrarProyectos(filters);
}

  // Si no hay perfil, mostramos aviso
  if (!perfilExiste) {
    return <SinPerfil />;
  }
  return (
     <div>
      <Fade in timeout={800}>
        <Box> 
          <BusquedaProyectos onSearch={handleSearch} />
         {publicaciones.length === 0 ? (
              <Box display="flex" justifyContent="center" mt={4}>
                <NoProjects />
              </Box>
            ) : (
          <Grid  
            container 
            spacing={3} // Espaciado uniforme
            justifyContent="center">
            {publicaciones.map((project, i) => (
              <Grid  size={6} key={i}>
                <TarjetaProyecto project={project} />
              </Grid>
            ))}
          </Grid>
          )}
        </Box>
      </Fade>
    </div>
  )
}

