import  { useEffect } from 'react';
import { Box, Fade, Typography } from '@mui/material';
import { useFavoritosStore } from '../../hooks/useFavoritosStore';
import { TarjetaFavorito } from '../componentes/TarjetaFavorito';

export const FavoritosPage = () => {
  const { favoritos, startCargarFavoritos } = useFavoritosStore();

  useEffect(() => {
    startCargarFavoritos();
  }, [favoritos, startCargarFavoritos]);

  return (
     <div>
      <Fade in timeout={800}>
        <Box sx={{ px: { xs: 2, md: 6 }, py: 4 }}>
          <Typography variant="h6" align="center" gutterBottom fontWeight="bold">
            Favoritos
          </Typography>

          {favoritos.length === 0 ? (
            <Typography align="center" color="text.secondary">
              Aún no tienes proyectos guardados en favoritos.
            </Typography>
          ) : (
            favoritos.map((proyecto) => (
              <TarjetaFavorito key={proyecto._id} proyecto={proyecto} />
            ))
          )}
        </Box>
    </Fade>
    </div>
  );
};
