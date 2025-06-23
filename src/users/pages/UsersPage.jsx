import { useEffect, useState } from "react";
import { BusquedaFiltros } from "..";
import { usePerfilStore } from "../../hooks";
import { TarjetaUsuario } from "../componentes/TarjetaUsuario";
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { SinPerfil } from "../../componentes/sinPerfil";
import { NoUsers } from "../componentes/NoUsers";
import { Fade } from "@mui/material";
export const UsersPage = () => {


  const { startCargarPerfiles, perfiles, filtrarPerfiles, loading, comprobarPerfil } = usePerfilStore();
   const [perfilExiste, setPerfilExiste] = useState(null); 


    useEffect(() => {
    const verificarPerfil = async () => {
      const perfil = await comprobarPerfil();
      if (perfil) {
        setPerfilExiste(true);
        startCargarPerfiles();
      } else {
        setPerfilExiste(false);
      }
    };

    verificarPerfil();
  }, []);

    const handleSearch = (filters) => {
    filtrarPerfiles(filters);
  }

    // Si no hay perfil, mostramos aviso
    if (!perfilExiste) {
      return <SinPerfil />;
    }

  return (
     <div>
      <Fade in timeout={800}>
  <Box>
    <BusquedaFiltros onSearch={handleSearch} />

    {perfiles.length === 0 ? (
      <Box display="flex" justifyContent="center" mt={4}>
        <NoUsers />
      </Box>
    ) : (
      <Grid container rowSpacing={2} justifyContent="center" columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
        {perfiles.map((user, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <TarjetaUsuario user={user} />
          </Grid>
        ))}
      </Grid>
    )}
  </Box>
</Fade>

  </div>
  );
};


