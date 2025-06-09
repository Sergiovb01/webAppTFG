import { Box, Typography } from '@mui/material';

export const NoPostulaciones = () => (
  <Box sx={{ textAlign: 'center', mt: 8 }}>
    <Typography variant="h6">
      No hay postulaciones por el momento
    </Typography>
    <Typography variant="body2" color="text.secondary">
      ¡Vuelve más tarde!
    </Typography>
  </Box>
);