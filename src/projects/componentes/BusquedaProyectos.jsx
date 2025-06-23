import React, { useState } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Button,
  Chip,
  Stack
} from '@mui/material';
import { Search, Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const categories = ["Ilustración", "Diseño", "3D", "Animación"];
const skills = ["Ilustrador", "Modelador 3D", "Diseñador", "Animador"]
const software = ["Photoshop", "Blender", "Figma", "Procreate"];

export const BusquedaProyectos = ({ onSearch }) => {
  const [filters, setFilters] = useState({
    category: '',
    skill: '',
    software: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    onSearch(filters);
  };

  return (
    <Box p={2}>
      {/* Fila principal: filtros a la izquierda, botón a la derecha */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        gap={2}
      >
        {/* Filtros */}
        <Box display="flex" gap={2} flexWrap="wrap" >
          {/* Categoría */}
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel id="category-label">Categoría</InputLabel>
            <Select
              labelId="category-label"
              name="category"
              value={filters.category}
              onChange={handleChange}
              label="Categoría"
            >
              <MenuItem value=""><em>Ninguno</em></MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
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
              {skills.map((skill) => (
                <MenuItem key={skill} value={skill}>{skill}</MenuItem>
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
              {software.map((soft) => (
                <MenuItem key={soft} value={soft}>{soft}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <IconButton onClick={handleSearch}>
            <Search />
          </IconButton>
        </Box>

        {/* Botón crear proyecto */}
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => navigate("/crearProyecto")}
          sx={{
            minWidth: 180,
            height: 40,
            backgroundColor: '#1976d2',
            '&:hover': {
              backgroundColor: '#1565c0'
            }
          }}
        >
          Crear Proyecto
        </Button>
      </Box>

      {/* Chips de filtros activos */}
      <Stack direction="row" spacing={1} flexWrap="wrap" mt={2}>
        {filters.category && (
          <Chip
            label={`Categoría: ${filters.category}`}
            onDelete={() => setFilters(prev => ({ ...prev, category: '' }))}
            color="primary"
            variant="outlined"
          />
        )}
        {filters.skill && (
          <Chip
            label={`Skill: ${filters.skill}`}
            onDelete={() => setFilters(prev => ({ ...prev, skill: '' }))}
            color="primary"
            variant="outlined"
          />
        )}
        {filters.software && (
          <Chip
            label={`Software: ${filters.software}`}
            onDelete={() => setFilters(prev => ({ ...prev, software: '' }))}
            color="primary"
            variant="outlined"
          />
        )}
      </Stack>
    </Box>
  );
};
