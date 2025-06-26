// src/pages/ProyectoDetalle.jsx
import { Box, Typography, Avatar, Button, Divider, Chip, Stack, Grid, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProyectoStore } from "../../hooks/useProyectoStore";
import { useAuthStore } from "../../hooks/useAuthStore"; 
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { usePostulacionStore } from "../../hooks/usePostulacionStore";
import { useUsuarioStore } from "../../hooks/useUsuarioStore";

export const DetallesProyecto = () => {

  const { cargarPublicacion, publicacion } = useProyectoStore();
  const { enviarPostulacion } = usePostulacionStore();
  const { seguirUsuario, dejarDeSeguirUsuario} = useUsuarioStore();
  const [ isFollowing, setIsFollowing ] = useState(false);

  const { user } = useAuthStore();
  const { user: currentUser } = useAuthStore(); // Usuario autenticado
  const { id } = useParams(); //Cogemos el id del proyecto que se pasa por parámetros

  const [mensaje, setMensaje] = useState('');
  const [openModal, setOpenModal] = useState(false);
  
  const navigate = useNavigate();

useEffect(() => {
  if (publicacion && publicacion.usuario && publicacion.usuario.seguidores) {
    setIsFollowing(publicacion.usuario.seguidores.includes(currentUser.uid));
  }
}, [publicacion, currentUser]);

// Maneja el evento de seguir/dejar de seguir
const handleFollowToggle = async () => {
  let success = false;
  if (isFollowing) {
    success = await dejarDeSeguirUsuario(publicacion.usuario._id);
  } else {
    success = await seguirUsuario(publicacion.usuario._id);
  }

  if (success) setIsFollowing(!isFollowing);
};

const handleAvatarClick = () => {
    navigate(`/usuario/${publicacion.usuario.perfil._id}`);
  };

  const handleEnviarPostulacion = () => {
    if(!mensaje){
       Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor, tienes que enviar un mensaje.',
        confirmButtonColor: '#3085d6'
      });
        return;
  }
   enviarPostulacion({
    publicacionId: publicacion._id,
    mensaje
  });
   setMensaje('');
  setOpenModal(false);
}

  useEffect(() => {
    cargarPublicacion(id);
  }, []);
console.log('Publicación data:', publicacion);
  if (!publicacion) {
  return <div>Cargando publicación...</div>; // esperar a que cargue la publicación
}



  return (
   
    <Box display="flex" flexDirection={{ xs: "column", md: "row" }} p={4} gap={4}>
      {/* Columna izquierda */}
      <Box
    flex={2}
    display="flex"
    flexDirection="column"
    backgroundColor="#fff"
    borderRadius={2}
    boxShadow={2}
  >
   
    <Box p={2}>
      <Typography variant="h5" fontWeight="bold" textAlign="center">
        {publicacion.titulo || "Título del proyecto no disponible"}
      </Typography>
    </Box>

    
    <Box
      p={3}
      sx={{
        overflowY: 'auto',
        height: '70vh',
      }}
    >
      {publicacion.imagenes?.map((img, index) => (
        <Box
          key={index}
          component="img"
          src={img}
          alt={`Imagen ${index + 1}`}
          sx={{
            width: '100%',
            height: '66vh',
            borderRadius: 2,
            mb: 2,
            objectFit: 'cover',
          }}
        />
      ))}
    </Box>
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
        backgroundColor="#fff"
        boxShadow={2}
        height="auto" 
        sx={{ alignSelf: 'flex-start' }} // solo ocupa lo que necesita
      >
        <Box display="flex" alignItems="center" gap={1} mt={1} mb={2}>
          <Avatar onClick={handleAvatarClick}  src={publicacion.usuario.perfil.photo} sx={{ width: 64, height: 64,  cursor: 'pointer',
                        '&:hover': {
                          transform: 'scale(1.1)',
                          transition: 'all 0.2s ease-in-out',
                        }, }} />
          <Typography>{publicacion.usuario.name}</Typography>
           {publicacion.usuario._id !== user.uid && (
            <Button
            onClick={handleFollowToggle}
              variant={isFollowing ? "outlined" : "contained"}
              color="primary"
              size="small"
              startIcon={isFollowing ? <PersonRemoveIcon /> : <PersonAddAlt1Icon />}
              sx={{ textTransform: 'none', borderRadius: 2 }}
            >
              {isFollowing ? "Dejar de seguir" : "Seguir"}
            </Button>
          )}
        </Box>

        <Divider sx={{ width: "100%", my: 1 }} />
        <Typography variant="subtitle1" fontWeight="bold" alignSelf="flex-start">
          Descripción
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
         {publicacion.descripcion || "Descripción del proyecto no disponible."}
        </Typography>

        <Divider sx={{ width: "100%", my: 1 }} />
        <Typography variant="subtitle1" fontWeight="bold" alignSelf="flex-start">
          Categoría
        </Typography>
        <Stack direction="row" spacing={1} my={1} flexWrap="wrap">
          {publicacion.categoria?.map((cat, index) => (
            <Chip key={index}  label={cat}  sx={{ bgcolor: '#9CCC65', color: 'white', fontSize: '0.75rem', height: 27, borderColor:'#9CCC65'}} />
          ))}
        </Stack>

        <Divider sx={{ width: "100%", my: 1 }} />
        <Typography variant="subtitle1" fontWeight="bold" alignSelf="flex-start">
          Perfiles Necesarios
        </Typography>
        <Grid container spacing={1} my={1}>
          {publicacion.tipoArtista?.map((tipo, index) => (
            <Grid item xs={6} sm={4} md={3} key={index}>
              <Chip  label={tipo}  sx={{ bgcolor: '#29B6F6', color: 'white', fontSize: '0.75rem', height: 27, borderColor:'#29B6F6' }}  />
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ width: "100%", my: 1 }} />
        <Typography variant="subtitle1" fontWeight="bold" alignSelf="flex-start">
          Softwares Utilizados
        </Typography>
        <Stack direction="row" spacing={1} my={1} flexWrap="wrap">
          {publicacion.software?.map((soft, index) => (
             <Grid item xs={6} sm={4} md={3} key={index}>
              <Chip label={soft}  sx={{ bgcolor: '#F06292', color: 'white', fontSize: '0.75rem', height: 27 }}  />
            </Grid>
          ))}
          </Stack>


       {publicacion.usuario._id === user.uid ? (
          <Button
            variant="outlined"
            sx={{ mt: 3, width: '100%' }}
            onClick={() => navigate(`/proyecto/editar/${publicacion._id}`)}
          >
            Editar
          </Button>
        ) :  publicacion.estado === 'cerrada' ?(
          <Box
          sx={{
            mt: 3,
            width: '100%',
            backgroundColor: '#f5f5f5',
            color: '#666',
            p: 2,
            borderRadius: 2,
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '1rem',
            border: '2px dashed #bdbdbd'
          }}
        >
          Esta publicación está cerrada y no acepta más postulaciones.
        </Box>
      ) : (
        <Button
          onClick={() => setOpenModal(true)}
          variant="contained"
          sx={{ mt: 3, width: "100%" }}
        >
          Postular
        </Button>
      )}
      </Box>

          <Dialog open={openModal} onClose={() => setOpenModal(false)} fullWidth maxWidth="sm">
          <DialogTitle>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box>
                <Typography variant="h6" component="div">
                  Enviar Postulación a:
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                  <Avatar 
                    src={publicacion.usuario.perfil.photo} 
                    sx={{ width: 40, height: 40 }}
                  />
                  <Typography variant="subtitle1" fontWeight={500}>
                    {publicacion.usuario.name}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </DialogTitle>
          
          <DialogContent>
            <TextField
              label="Envía un mensaje de postulación"
              multiline
              rows={4}
              fullWidth
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              sx={{ mt: '8px' }}
            />
          </DialogContent>
          
          <DialogActions>
            <Button onClick={() => setOpenModal(false)} color="secondary">
              Cancelar
            </Button>
            <Button  onClick={handleEnviarPostulacion} variant="contained" color="primary">
              Enviar
            </Button>
          </DialogActions>
        </Dialog>

    </Box>
  
    

    
  );
};
