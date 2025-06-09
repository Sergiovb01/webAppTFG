import { Card, CardContent, Avatar, Typography, IconButton, Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export const PostulacionCard = ({ postulacion, onDelete }) => {
  const { usuario, mensaje, proyecto, id } = postulacion;

  return (
    <Card
      variant="outlined"
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: 2,
        mb: 2,
      }}
    >
      <Avatar sx={{ width: 56, height: 56, mr: 2 }} />
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="body1">
          <strong>{usuario}</strong> ha postulado al proyecto{' '}
          <strong>{proyecto}</strong>
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 0.5 }}
        >
          {mensaje}
        </Typography>
      </Box>

      {/* acción delegada al contenedor */}
      <IconButton
        aria-label="Eliminar postulación"
        onClick={() => onDelete(id)}
      >
        <CloseIcon />
      </IconButton>
    </Card>
  );
};