import { useEffect, useState } from 'react';
import { Box, Typography, TextField, MenuItem, Button, Stack, Select, FormControl, InputLabel, IconButton,  OutlinedInput,
  Chip } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useProyectoStore } from '../../hooks/useProyectoStore';
import DeleteIcon from '@mui/icons-material/Delete';
import { usePerfilStore } from '../../hooks';
import { SinPerfil } from '../../componentes/sinPerfil';



const categorias = ["Ciencia Ficción","Espacial","Fantasia","Cyberpunk","Postapocalíptico","Medieval","Steampunk","Superhéroes","Terror","Realismo","Low Poly","Cartoon","Pixel Art", "Western", "Anime", "Horror", "Slice of Life", "Aventura", "Comedia", "Romance", "Thriller", "Drama"];
const tiposArtista = [ "Ilustrador", "Modelador 3D", "Diseñador Gráfico", "Animador 2D", "Animador 3D", "Concept Artist", "Diseñador UI/UX", "Storyboard Artist", "Diseñador de Personajes", "Diseñador de Entornos", "Rigging Artist", "VFX Artist", "Director de Arte", "Editor de Video", "Motion Grapher", "Escultor Digital"];
const softwares = [ "Photoshop", "Blender", "Figma", "Procreate", "After Effects", "Maya", "ZBrush", "Substance Painter", "Illustrator", "Cinema 4D", "Unreal Engine", "Unity", "Premiere Pro", "Krita", "Clip Studio Paint", "3ds Max", "Houdini", "DaVinci Resolve", "Nuke"];


export const CrearProyecto = ( { initialData = null, onSubmit }) => {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState([]);
  const [tipoArtista, setTipoArtista] = useState([]);
  const [software, setSoftware] = useState([]);
  const [imagenes, setImagenes] = useState([]);
  const [imagenesNuevas, setImagenesNuevas] = useState([]); 

   const { comprobarPerfil } = usePerfilStore();
   const [perfilExiste, setPerfilExiste] = useState(null); 
   const {startCerrarProyecto} = useProyectoStore();


  const navigate = useNavigate();

  // Cuando initialData cambia, rellenamos el formulario
  useEffect(() => {
    if (initialData) {
      setTitulo(initialData.titulo || "");
      setDescripcion(initialData.descripcion || "");
      setCategoria(initialData.categoria || []);
      setTipoArtista(initialData.tipoArtista || []);
      setSoftware(initialData.software || []);
      setImagenes(initialData.imagenes || []);
      setImagenesNuevas([]); // Limpio las nuevas
    }
  }, [initialData]);

   useEffect(() => {
    const verificarPerfil = async () => {
      const perfil = await comprobarPerfil();
      if (perfil) {
        setPerfilExiste(true);
      } else {
        setPerfilExiste(false);
      }
    };

    verificarPerfil();
  }, []);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    // Filtrar para evitar duplicados
    const nuevos = files.filter(file =>
      !imagenesNuevas.some(img => img.name === file.name && img.lastModified === file.lastModified)
    );

    setImagenesNuevas(prev => [...prev, ...nuevos]);
  };
  const cerrarProyecto = () => {
    startCerrarProyecto(initialData._id);
    navigate('/mis-proyectos');
  }

  const handleCrearProyecto = () => {
  if (!titulo || !descripcion || categoria.length === 0 || tipoArtista.length === 0 || software.length === 0) {
   Swal.fire({
    icon: 'warning',
    title: 'Campos incompletos',
    text: 'Por favor, completa todos los campos obligatorios.',
    confirmButtonColor: '#3085d6'
  });
    return;
  }

 const data = { titulo, descripcion, categoria, tipoArtista, software, imagenes, imagenesNuevas };

 onSubmit(data);
};

 // Si no hay perfil, mostramos aviso
    if (!perfilExiste) {
      return <SinPerfil />;
    }

  return (
    <Box maxWidth="md" mx="auto" px={2} py={4}>
      {
        (initialData ? (
          <Typography variant="h4" fontWeight={600} textAlign="center" gutterBottom sx={{ color: '#071eec' }}>
        Editar Proyecto
      </Typography>
        ):(
          <Typography variant="h4" fontWeight={600} textAlign="center" gutterBottom sx={{ color: '#071eec' }}>
        Crear Nuevo Proyecto
      </Typography>
        ))
      }
      

      <Box my={2}>
        <Typography variant="subtitle1" gutterBottom>Título *</Typography>
        <TextField
          fullWidth
          placeholder="Ingresa el título de tu proyecto"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
      </Box>

      <Box my={2}>
        <Typography variant="subtitle1" gutterBottom>Descripción *</Typography>
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
        <Typography variant="subtitle1" gutterBottom>Características del proyecto *</Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <FormControl fullWidth>
            <InputLabel>Categoría *</InputLabel>
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
            <InputLabel>Tipo de artista *</InputLabel>
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
            <InputLabel>Software *</InputLabel>
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

      <Box
  sx={{
    border: '2px dashed #ccc',
    borderRadius: 2,
    p: 4,
    textAlign: 'center',
    bgcolor: 'background.paper'
  }}
>
  <Typography variant="body2" color="text.secondary">
    Puedes seleccionar imágenes para mostrar en tu proyecto.
  </Typography>

  <Box mt={2}>
    <Button
      component="label"
      variant="contained"
    >
      Seleccionar Imágenes
      <input hidden multiple accept="image/*" type="file" onChange={handleImageChange} />
    </Button>
  </Box>

  {/* Previsualización de imágenes */}
  {(imagenes.length > 0 || imagenesNuevas.length > 0) && (
    <Box mt={4} display="flex" flexWrap="wrap" gap={2} justifyContent="center">
      {[...imagenes, ...imagenesNuevas].map((file, idx) => {
          const src = typeof file === 'string' ? file : URL.createObjectURL(file);//Comprobar si es una URL ya de cloudinary o un archivo nuevo
          return (
        <Box key={idx} sx={{ position: 'relative', width: 120, height: 120, border: '1px solid #ccc', borderRadius: 1, overflow: 'hidden' }}>
          <img
            src={src}
            alt={`preview-${idx}`}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <IconButton
            size="small"
            onClick={() => {
                const all = [...imagenes, ...imagenesNuevas];
                const updated = all.filter((_, i) => i !== idx);

                // Repartir actualizados entre `imagenes` y `imagenesNuevas`
                const nuevas = updated.filter(f => typeof f !== 'string');
                const existentes = updated.filter(f => typeof f === 'string');

                setImagenes(existentes);
                setImagenesNuevas(nuevas);
              }}
            sx={{ position: 'absolute', top: 4, right: 4, bgcolor: 'rgba(255,255,255,0.7)' }}
          >
            <DeleteIcon sx={{ fontSize: 16, color: '#d32f2f' }} />
          </IconButton>
        </Box>
         );
      })}
    </Box>
  )}
</Box>

    <Box mt={2} textAlign="center" display="flex" justifyContent="center" gap={2}>
        
        <Button
          className='volver'
          variant="outlined"
          color="secondary"
          onClick={() => navigate('/mis-proyectos')}
          sx={{ px: 4, py: 1.5 }}
        >
          Volver
        </Button>
        {(initialData ? (
          <>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCrearProyecto}
            sx={{ px: 4, py: 1.5 }}
          >
            Actualizar Proyecto
          </Button>

          <Button
          className='boton-cerrar'
          variant="outlined"
          color="secondary"
          onClick={cerrarProyecto}
          sx={{ px: 4, py: 1.5 }}
        >
          Cerrar Proyecto
        </Button>
        </>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={handleCrearProyecto}
            sx={{ px: 4, py: 1.5 }}
          >
            Crear Proyecto
          </Button>
          
        ))}

      </Box>
    </Box>
  );
};

