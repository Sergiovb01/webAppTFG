import { Box, FormControl, InputLabel, Select, MenuItem, IconButton, Stack, Chip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";


const locations = ['España', 'México', 'Argentina'];
const skills = ['Modelado','Animación','Ilustración','Iluminación','Composición','Rotoscopia','Simulación de partículas','Tracking de cámara','Motion Graphics','Texturizado','Rigging','Postproducción','Layout','Storyboarding','Dirección de arte','Edición de video','Color Grading','Concept Art','Renderizado'];
const softwares = [ 'Photoshop', 'Blender', 'After Effects', 'Maya', 'Nuke', 'DaVinci Resolve', 'Substance Painter', '3ds Max', 'Cinema 4D', 'ZBrush', 'Houdini', 'Premiere Pro', 'Unreal Engine', 'Unity', 'Krita', 'Fusion'];

export const BusquedaFiltros = ({ onSearch }) => {

  const [filters, setFilters] = useState({
    location: "",
    skill: "",
    software: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const clearFilter = (field) => {
    setFilters((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSearchClick = () => {
    // Aquí podrías implementar la lógica de búsqueda
    onSearch(filters);
  }

  

  return (
    <Box p={2}>
      {/* Filtros */}
      <Box
        display="flex"
        gap={2}
        alignItems="center"
        flexWrap="wrap"
        justifyContent="center"
      >

        {/* Ubicación */}
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel id="location-label">Ubicación</InputLabel>
          <Select
            labelId="location-label"
            name="location"
            value={filters.location}
            onChange={handleChange}
            label="Ubicación"
          >
            <MenuItem value=""><em>Ninguno</em></MenuItem>
            {locations.map((loc) => (
              <MenuItem key={loc} value={loc}>{loc}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Skill */}
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel id="skill-label">Skill</InputLabel>
          <Select
            labelId="skill-label"
            name="skill"
            value={filters.skill}
            onChange={handleChange}
            label="Skill"
          >
            <MenuItem value=""><em>Ninguno</em></MenuItem>
            {skills.map((sk) => (
              <MenuItem key={sk} value={sk}>{sk}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Software */}
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel id="software-label">Software</InputLabel>
          <Select
            labelId="software-label"
            name="software"
            value={filters.software}
            onChange={handleChange}
            label="Software"
          >
            <MenuItem value=""><em>Ninguno</em></MenuItem>
            {softwares.map((sw) => (
              <MenuItem key={sw} value={sw}>{sw}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <IconButton  onClick={handleSearchClick}>
          <SearchIcon sx={{color:'#071eec'}} />
        </IconButton>
      </Box>

      {/* Filtros activos */}
      <Stack direction="row" spacing={1} flexWrap="wrap" mt={2} justifyContent="center">
        {filters.category && (
          <Chip
            label={`Categoría: ${filters.category}`}
            onDelete={() => clearFilter("category")}
            color="primary"
            variant="outlined"
          />
        )}
        {filters.location && (
          <Chip
            label={`Ubicación: ${filters.location}`}
            onDelete={() => clearFilter("location")}
            color="primary"
            variant="outlined"
          />
        )}
        {filters.skill && (
          <Chip
            label={`Skill: ${filters.skill}`}
            onDelete={() => clearFilter("skill")}
            color="primary"
            variant="outlined"
          />
        )}
        {filters.software && (
          <Chip
            label={`Software: ${filters.software}`}
            onDelete={() => clearFilter("software")}
            color="primary"
            variant="outlined"
          />
        )}
      </Stack>
    </Box>
  );
};
