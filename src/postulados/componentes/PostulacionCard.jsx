import { 
  Card, 
  CardContent, 
  Avatar, 
  Typography, 
  IconButton, 
  Box,
  Chip,
  Button,
  Divider,
  Stack
} from '@mui/material';
import {
  Close as CloseIcon,
  Email as EmailIcon,
  Person as PersonIcon,
  Schedule as ScheduleIcon,
  CheckCircle as AcceptIcon,
  Cancel as RejectIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export const PostulacionCard = ({ postulacion, onDelete }) => {

  const navigate = useNavigate();

  // Función para truncar mensaje largo
  const truncarMensaje = (mensaje, limite = 150) => {
    if (!mensaje) return 'Sin mensaje';
    return mensaje.length > limite ? mensaje.substring(0, limite) + '...' : mensaje;
  };

   const handleCardClick = () => {
    navigate(`/usuario/${postulacion.usuario.perfil._id}`);
  };


  return (
    <Card
      onClick={handleCardClick}
      variant="outlined"
      sx={{
        mb: 2,
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          transform: 'translateY(-2px)'
        }
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* Header con avatar, nombre y fecha */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
          <Avatar 
            src={postulacion.usuario.perfil?.photo || ''} 
            sx={{ 
              width: 64, 
              height: 64, 
              mr: 2,
              border: '3px solid',
              borderColor: 'primary.light'
            }}
          >
            <PersonIcon />
          </Avatar>
          
          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
              <Typography variant="h6" fontWeight={600} color="primary">
                {postulacion.usuario.name || 'Usuario sin nombre'}
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <EmailIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">
                {postulacion.usuario.email || 'Email no disponible'}
              </Typography>
            </Box>
          </Box>

          <IconButton
            aria-label="Cerrar postulación"
            onClick={() => onDelete(postulacion._id)}
            sx={{ 
              color: 'text.secondary',
              '&:hover': { color: 'error.main' }
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Información del proyecto */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Postulación para el proyecto:
          </Typography>
          <Typography variant="subtitle1" fontWeight={500} color="primary">
            {postulacion.publicacion?.titulo || 'Proyecto sin título'}
          </Typography>
        </Box>

        {/* Mensaje de postulación */}
        <Box sx={{ 
          bgcolor: 'grey.50', 
          borderRadius: 2, 
          p: 2, 
          mb: 2,
          borderLeft: '4px solid',
          borderLeftColor: 'primary.main'
        }}>
          <Typography variant="body2" color="text.primary" sx={{ fontStyle: 'italic' }}>
            "{truncarMensaje(postulacion.mensaje)}"
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};