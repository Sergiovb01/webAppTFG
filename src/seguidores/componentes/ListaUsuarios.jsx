import { Typography, Box } from '@mui/material';
import { UsuarioCard } from './UsuarioCard';
import { useUsuarioStore } from '../../hooks/useUsuarioStore';

export const ListaUsuarios = ({ titulo, usuarios, onAccion, contexto }) => {
  const { seguidos } = useUsuarioStore();

  return (
    <Box align="center" sx={{ flex: 1, px: 2 }}>
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

      {usuarios.map((usuario) => {
        console.log('Usuario:', usuario);
        const yaLoSigo = seguidos.some(u => u._id === usuario._id);
      console.log('Comparando usuario:', usuario, 'vs seguidos:', seguidos);
        let variant = 'ninguno';
        if (titulo === 'Siguiendo') {
          variant = 'eliminar';
        } else if (titulo === 'Seguidores' && !yaLoSigo) {
          variant = 'ninguno';
        }

        return (
          <UsuarioCard
            key={usuario._id}
            nombre={usuario.name}
            avatar={usuario.perfil?.photo}
            id={usuario._id}
            onAction={() => onAccion(usuario._id)}
            variant={variant}
          />
        );
      })}
    </Box>
  );
};
