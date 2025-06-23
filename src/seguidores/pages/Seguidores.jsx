import React, { useEffect, useState } from 'react';
import { Box, Divider } from '@mui/material';
import {ListaUsuarios} from '../componentes/ListaUsuarios';
import { seguidoresMock, siguiendoMock } from '../mock/relaciones';
import { useUsuarioStore } from '../../hooks/useUsuarioStore';
import { useAuthStore } from '../../hooks';

export const SeguidoresPage = () => {

  const {
      seguidores,
      seguidos,
      obtenerSeguidoresYSeguidos,
      seguirUsuario,
      dejarDeSeguirUsuario
    } = useUsuarioStore();

    const { user } = useAuthStore(); // para obtener el usuario actual

    useEffect(() => {
      obtenerSeguidoresYSeguidos(); // al montar el componente
    }, []);

  const handleSeguir = async (id) => {
    const success = await seguirUsuario(id);
    if (success) {
      obtenerSeguidoresYSeguidos(); // Refrescar datos tras la acción
    }
  };

   const handleDejarDeSeguir = async (id) => {
    const success = await dejarDeSeguirUsuario(id);
    if (success) {
      obtenerSeguidoresYSeguidos(); // Refrescar datos tras la acción
    }
  };

  return (
    
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        px: { xs: 2, md: 6 },
        py: 4,
      }}
    >
      <ListaUsuarios
        titulo="Seguidores"
        usuarios={seguidores}
        onAccion={handleSeguir}
      />

      <Divider
        orientation="vertical"
        flexItem
        sx={{ mx: 2, display: { xs: 'none', md: 'block' } }}
      />

      <ListaUsuarios
        titulo="Siguiendo"
        usuarios={seguidos}
        mostrarSeguir={false}
        onAccion={handleDejarDeSeguir}
      />
    </Box>
  );
};


