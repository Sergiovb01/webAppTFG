import { useState } from 'react';
import { Box, Typography, TextField, MenuItem, Button, Stack, Select, FormControl, InputLabel, IconButton,  OutlinedInput,
  Chip } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const categorias = ["Ilustración", "Diseño", "3D", "Animación"];
const tiposArtista = ["Ilustrador", "Modelador 3D", "Diseñador", "Animador"];
const softwares = ["Photoshop", "Blender", "Figma", "Procreate"];

export const CrearProyecto = () => {
 const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState([]);
  const [tipoArtista, setTipoArtista] = useState([]);
  const [software, setSoftware] = useState([]);
  const [imagenes, setImagenes] = useState([]);

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImagenes(files);
  };

  return (
    <Box maxWidth="md" mx="auto" px={2} py={4}>
      <Typography variant="h4" fontWeight={600} textAlign="center" gutterBottom>
        Crear Nuevo Proyecto
      </Typography>

      <Box my={2}>
        <Typography variant="subtitle1" gutterBottom>Título</Typography>
        <TextField
          fullWidth
          placeholder="Ingresa el título de tu proyecto"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
      </Box>

      <Box my={2}>
        <Typography variant="subtitle1" gutterBottom>Descripción</Typography>
        <TextField
          fullWidth
          multiline
          rows={5}
          placeholder="Describe tu proyecto, objetivos, visión artística, historia, personajes, etc."
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
      </Box>

      <Box my={2}>
        <Typography variant="subtitle1" gutterBottom>Características del proyecto</Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <FormControl fullWidth>
            <InputLabel>Categoría</InputLabel>
            <Select
              multiple
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              input={<OutlinedInput label="Categoría" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              {categorias.map((cat) => (
                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Tipo de artista</InputLabel>
            <Select
              multiple
              value={tipoArtista}
              onChange={(e) => setTipoArtista(e.target.value)}
              input={<OutlinedInput label="Tipo de artista" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              {tiposArtista.map((tipo) => (
                <MenuItem key={tipo} value={tipo}>{tipo}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Software</InputLabel>
            <Select
              multiple
              value={software}
              onChange={(e) => setSoftware(e.target.value)}
              input={<OutlinedInput label="Software" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              {softwares.map((sw) => (
                <MenuItem key={sw} value={sw}>{sw}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </Box>

      <Box my={4}>
        <Typography variant="subtitle1" gutterBottom>Imágenes</Typography>
        <Box
          sx={{
            border: '2px dashed #ccc',
            borderRadius: 2,
            p: 4,
            textAlign: 'center',
            bgcolor: 'background.paper'
          }}
        >
          <IconButton color="primary">
            <Add fontSize="large" />
          </IconButton>
          <Typography>Arrastra y suelta tus imágenes aquí</Typography>
          <Typography variant="body2" color="text.secondary">o haz clic para seleccionar archivos</Typography>

          <Button
            component="label"
            variant="contained"
            sx={{ mt: 2 }}
          >
            Seleccionar Imágenes
            <input hidden multiple accept="image/*" type="file" onChange={handleImageChange} />
          </Button>
        </Box>
      </Box>
    <Box textAlign="center" display="flex" justifyContent="center" gap={2}>
        
        <Button
          className='volver'
          variant="outlined"
          color="secondary"
          onClick={() => navigate('/projects')}
          sx={{ px: 4, py: 1.5 }}
        >
          Volver
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={""} // Aquí deberías implementar la lógica para crear el proyecto
          sx={{ px: 4, py: 1.5 }}
        >
          Crear Proyecto
        </Button>
      </Box>
    </Box>
  );
};

