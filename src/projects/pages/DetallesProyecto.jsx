// src/pages/ProyectoDetalle.jsx
import { Box, Typography, Avatar, Button, Divider, Chip, Stack, Grid } from "@mui/material";

export const DetallesProyecto = () => {
  return (
    <Box display="flex" flexDirection={{ xs: "column", md: "row" }} p={4} gap={4}>
      {/* Columna izquierda */}
      <Box flex={2}>
        <Typography variant="h5" fontWeight="bold" mb={2}>
          Proyecto
        </Typography>
         <Box sx={{ border: "1px solid #ccc", height: 700, mb: 2 }} /> {/* Aqui tienen que ir las imagenes del proeycto */}
        
      </Box>

      {/* Columna derecha */}
      <Box
        flex={1}
        display="flex"
        flexDirection="column"
        alignItems="center"
        border="1px solid #ddd"
        borderRadius={2}
        p={3}
      >
        <Typography variant="h6" fontWeight="bold">Autor</Typography>
        <Box display="flex" alignItems="center" gap={1} mt={1} mb={2}>
          <Avatar />
          <Typography>Usuario</Typography>
          <Button size="small" variant="outlined">Seguir</Button>
        </Box>

        <Divider sx={{ width: "100%", my: 1 }} />
        <Typography variant="subtitle1" fontWeight="bold" alignSelf="flex-start">
          Descripción
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus, nulla ut commodo sagittis, sapien dui mattis dui, non pulvinar lorem felis nec erat.
        </Typography>

        <Divider sx={{ width: "100%", my: 1 }} />
        <Typography variant="subtitle1" fontWeight="bold" alignSelf="flex-start">
          Categoría
        </Typography>
        <Stack direction="row" spacing={1} my={1} flexWrap="wrap">
          <Chip className="chip-custom" label="Categoría" variant="outlined" />
          <Chip label="Categoría" variant="outlined" />
        </Stack>

        <Divider sx={{ width: "100%", my: 1 }} />
        <Typography variant="subtitle1" fontWeight="bold" alignSelf="flex-start">
          Perfiles Necesarios
        </Typography>
        <Grid container spacing={1} my={1}>
            {Array.from({ length: 6 }).map((_, i) => (
                <Grid size={3} key={i}>
                    <Chip className="chip-custom" label={`Perfil ${i + 1}`} variant="outlined" fullWidth />
                </Grid>
            ))}
        </Grid>

        <Button variant="contained" sx={{ mt: 3, width: "100%" }}>
          Postular
        </Button>
      </Box>
    </Box>
  );
};
