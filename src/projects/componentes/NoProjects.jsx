
import {
  Box,
  Typography,

  Card,
  CardContent,
  useTheme,
  alpha
} from '@mui/material';
import {
  SearchOff as SearchOffIcon,
} from '@mui/icons-material';

export const NoProjects = () => {
  const theme = useTheme();
  
  // Paleta de azul eléctrico personalizada
  const electricBlue = '#0080FF';
  const electricBlueDark = '#0066CC';

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh',
        padding: 3,
      }}
    >
      <Card
        elevation={3}
        sx={{
          maxWidth: 500,
          width: '100%',
          background: 'white',
          borderRadius: 3,
          border: `2px solid ${alpha(electricBlue, 0.2)}`,
        }}
      >
        <CardContent sx={{ textAlign: 'center', padding: 4 }}>
          {/* Icono principal */}
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${electricBlue} 0%, ${electricBlueDark} 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px auto',
              animation: 'pulse 2s infinite',
              '@keyframes pulse': {
                '0%': {
                  transform: 'scale(1)',
                  boxShadow: `0 0 0 0 ${alpha(electricBlue, 0.7)}`
                },
                '70%': {
                  transform: 'scale(1.05)',
                  boxShadow: `0 0 0 10px ${alpha(electricBlue, 0)}`
                },
                '100%': {
                  transform: 'scale(1)',
                  boxShadow: `0 0 0 0 ${alpha(electricBlue, 0)}`
                }
              }
            }}
          >
            <SearchOffIcon sx={{ fontSize: 40, color: 'white' }} />
          </Box>

          {/* Título */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: 'bold',
              color: electricBlueDark,
              marginBottom: 2
            }}
          >
            No se encontraron resultados
          </Typography>

          {/* Mensaje descriptivo */}
          <Typography
            variant="body1"
            sx={{
              color: theme.palette.text.secondary,
              marginBottom: 3,
              lineHeight: 1.6
            }}
          >
              'No hay elementos que coincidan con los filtros seleccionados'   
          </Typography>

          {/* Sugerencias */}
          <Box
            sx={{
              backgroundColor: alpha(electricBlue, 0.08),
              borderRadius: 2,
              padding: 2,
              marginBottom: 3,
              border: `1px solid ${alpha(electricBlue, 0.2)}`
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: electricBlueDark,
                fontWeight: 500,
                marginBottom: 1
              }}
            >
              Sugerencias:
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.secondary,
                textAlign: 'left',
                lineHeight: 1.5
              }}
            >
              • Elimina algunos filtros para ampliar los resultados<br/>
            </Typography>
          </Box>

          {/* Botones de acción */}
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}
          >
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
