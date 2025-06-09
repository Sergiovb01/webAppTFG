
import { Typography, Box } from '@mui/material';
import {UsuarioCard} from './UsuarioCard';

export const ListaUsuarios = ({ titulo, usuarios, mostrarSeguir, onAccion }) => (
  <Box sx={{ flex: 1, px: 2 }}>
    <Typography
      variant="h6"
      align="center"
      sx={{
        fontFamily: 'VT323, monospace',
        mb: 2,
        textTransform: 'uppercase',
        fontSize: '1.5rem',
      }}
    >
      {titulo}
    </Typography>

    {usuarios.map((usuario) => (
      <UsuarioCard
        key={usuario.id}
        nombre={usuario.nombre}
        mostrarSeguir={mostrarSeguir}
        onAction={() => onAccion(usuario.id)}
      />
    ))}
  </Box>
);


