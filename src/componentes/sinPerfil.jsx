import { 
  Box, 
  Typography, 
  Button, 
  Paper,
  Stack,
  Avatar,
  Fade,
  Container
} from "@mui/material";
import { 
  PersonAdd as PersonAddIcon,
  AccountCircle as AccountCircleIcon,
  ArrowForward as ArrowForwardIcon,
  Star as StarIcon
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export const SinPerfil = () => {
  const navigate = useNavigate();

  const beneficios = [
    {
      icon: <PersonAddIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      titulo: "Crea tu identidad",
      descripcion: "Muestra quién eres y qué te apasiona"
    },
    {
      icon: <StarIcon sx={{ fontSize: 40, color: 'warning.main' }} />,
      titulo: "Destaca tus habilidades",
      descripcion: "Comparte tu experiencia y talentos únicos"
    },
    {
      icon: <AccountCircleIcon sx={{ fontSize: 40, color: 'success.main' }} />,
      titulo: "Conecta con otros",
      descripcion: "Encuentra colaboradores perfectos para tus ideas"
    }
  ];

  return (
    <Container maxWidth="md">
      <Fade in timeout={800}>
        <Box
          sx={{
            minHeight: '80vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            py: 4
          }}
        >
          <Paper
            elevation={8}
            sx={{
              p: { xs: 4, md: 6 },
              borderRadius: 4,
              textAlign: 'center',
              background: 'linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%)',
              border: '1px solid rgba(0,0,0,0.05)',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'linear-gradient(90deg, #667eea 0%,rgb(3, 65, 199) 100%)'
              }
            }}
          >
            {/* Icono principal */}
            <Box sx={{ mb: 3 }}>
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  mx: 'auto',
                  background: 'linear-gradient(135deg, #667eea 0%,rgb(15, 38, 240) 100%)',
                  mb: 2
                }}
              >
                <PersonAddIcon sx={{ fontSize: 40 }} />
              </Avatar>
            </Box>

            {/* Título principal */}
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                background: 'linear-gradient(45deg, #667eea,rgb(9, 90, 240))',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2
              }}
            >
              ¡Tu perfil te está esperando! 🚀
            </Typography>

            {/* Subtítulo */}
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ mb: 4, maxWidth: 500, mx: 'auto', lineHeight: 1.6 }}
            >
              Para explorar y colaborar en proyectos increíbles, necesitas completar tu perfil primero
            </Typography>

            {/* Beneficios */}
            <Stack
              direction={{ xs: 'column', md: 'row' }}
              spacing={3}
              sx={{ mb: 5 }}
            >
              {beneficios.map((beneficio, index) => (
                <Fade key={index} in timeout={1000 + (index * 200)}>
                  <Box
                    sx={{
                      flex: 1,
                      p: 3,
                      borderRadius: 3,
                      background: 'rgba(255,255,255,0.7)',
                      border: '1px solid rgba(0,0,0,0.05)',
                    }}
                  >
                    <Box sx={{ mb: 2 }}>
                      {beneficio.icon}
                    </Box>
                    <Typography variant="h6" fontWeight="600" gutterBottom>
                      {beneficio.titulo}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {beneficio.descripcion}
                    </Typography>
                  </Box>
                </Fade>
              ))}
            </Stack>

            {/* Botones de acción */}
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              justifyContent="center"
              sx={{ mb: 3 }}
            >
              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowForwardIcon />}
                onClick={() => navigate('/crear-perfil')}
                sx={{
                  py: 1.5,
                  px: 4,
                  borderRadius: 3,
                  background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
                  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #5a6fd8 30%, #6a4190 90%)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 20px rgba(102, 126, 234, 0.6)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Crear mi perfil
              </Button>
            </Stack>

            {/* Mensaje adicional */}
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontStyle: 'italic',
                opacity: 0.8
              }}
            >
              💡 Solo te tomará unos minutos y podrás acceder a todas las funcionalidades
            </Typography>
          </Paper>
        </Box>
      </Fade>
    </Container>
  );
};