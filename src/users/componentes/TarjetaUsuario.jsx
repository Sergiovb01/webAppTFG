// components/UserCard.jsx
import { Card, Avatar, Typography, Box, Button, Chip, ImageList, ImageListItem } from "@mui/material";

export const TarjetaUsuario = ({ user }) => {
  return (
    <Card sx={{ maxWidth: 800, margin: "1rem auto", p: 2, boxShadow: 0, backgroundColor: "transparent"}}>
      {/* Encabezado: Avatar y nombre */}
      <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
        <Avatar src={user.profilePic} sx={{ width: 64, height: 64 }} />
        <Typography variant="h6" mt={1}>{user.username}</Typography>
      </Box>

      {/* Contenedor para galería */}
      <Box sx={{ width: "100%", border: "1px solid #ccc", borderRadius: 2, p: 2, mb: 2 }}>
        <ImageList sx={{ width: "100%" }} cols={3} rowHeight={164}>
          {user.projects.map((img, index) => (
            <ImageListItem key={index}>
              <img
                src={img}
                alt={`Proyecto ${index + 1}`}
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>

      {/* Habilidades y botón */}
      <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap">
        <Box display="flex" gap={1} flexWrap="wrap">
          {user.skills.map((skill, i) => (
            <Chip key={i} label={skill} variant="outlined" />
          ))}
          {user.softwares.map((sw, i) => (
            <Chip key={i} label={sw} variant="outlined" color="primary" />
          ))}
        </Box>
        <Button variant="contained" size="small" sx={{ mt: { xs: 2, sm: 0 } }}>Seguir</Button>
      </Box>
    </Card>
  );
};
