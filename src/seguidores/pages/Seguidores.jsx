import React, { useState } from 'react';
import { Box, Divider } from '@mui/material';
import {ListaUsuarios} from '../componentes/ListaUsuarios';
import { seguidoresMock, siguiendoMock } from '../mock/relaciones';

export const SeguidoresPage = () => {
  const [seguidores, setSeguidores] = useState(seguidoresMock);
  const [siguiendo, setSiguiendo] = useState(siguiendoMock);

  const handleSeguir = (id) => {
    const user = seguidores.find((u) => u.id === id);
    if (!user || user.seguido) return;

    setSeguidores((prev) =>
      prev.map((u) => (u.id === id ? { ...u, seguido: true } : u))
    );
    setSiguiendo((prev) => [...prev, { id: user.id, nombre: user.nombre }]);
  };

  const handleDejarDeSeguir = (id) => {
    setSiguiendo((prev) => prev.filter((u) => u.id !== id));
    setSeguidores((prev) =>
      prev.map((u) => (u.id === id ? { ...u, seguido: false } : u))
    );
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
        mostrarSeguir={true}
        onAccion={handleSeguir}
      />

      <Divider
        orientation="vertical"
        flexItem
        sx={{ mx: 2, display: { xs: 'none', md: 'block' } }}
      />

      <ListaUsuarios
        titulo="Siguiendo"
        usuarios={siguiendo}
        mostrarSeguir={false}
        onAccion={handleDejarDeSeguir}
      />
    </Box>
  );
};


