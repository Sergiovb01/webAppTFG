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
        <Typography variant="h5" align="center" gutterBottom fontWeight="bold" sx={{ color: '#071eec' }}>
          Favoritos
        </Typography>

        {favoritos.length === 0 ? (
          <Typography align="center" color="text.secondary">
            Aún no tienes proyectos guardados en favoritos.
          </Typography>
        ) : (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={2} // Espacio entre las tarjetas
          >
            {favoritos.map((proyecto) => (
              <Box
                key={proyecto._id}
                sx={{
                  width: { xs: '100%', sm: '80%', md: '60%', lg: '50%' }, // Limitar ancho y hacerlo responsive
                }}
              >
                <TarjetaFavorito proyecto={proyecto} />
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Fade>
  </div>
);
}
