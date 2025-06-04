// components/SearchFilters.jsx
import { Box, TextField, MenuItem, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

const categories = ["Ilustración", "Diseño", "3D"];
const locations = ["Madrid", "Barcelona", "Online"];
const skills = ["Photoshop", "Blender", "Illustrator"];
const softwares = ["Figma", "Unity", "Maya"];

export const BusquedaFiltros = () => {
  const [filters, setFilters] = useState({
    category: "",
    location: "",
    skill: "",
    software: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <Box  
    display="flex"
      gap={2}
      alignItems="center"
      flexWrap="wrap"
      p={2}
      justifyContent="center">
      <TextField   select label="Categoría" name="category" value={filters.category} onChange={handleChange} sx={{ minWidth: 150 }} size="small">
        {categories.map((cat) => (
          <MenuItem key={cat} value={cat}>{cat}</MenuItem>
        ))}
      </TextField>

      <TextField select label="Ubicación" name="location" value={filters.location} onChange={handleChange} sx={{ minWidth: 150 }} size="small">
        {locations.map((loc) => (
          <MenuItem key={loc} value={loc}>{loc}</MenuItem>
        ))}
      </TextField>

      <TextField select label="Skill" name="skill" value={filters.skill} onChange={handleChange} sx={{ minWidth: 150 }} size="small">
        {skills.map((sk) => (
          <MenuItem key={sk} value={sk}>{sk}</MenuItem>
        ))}
      </TextField>

      <TextField select label="Software" name="software" value={filters.software} onChange={handleChange} sx={{ minWidth: 150 }} size="small">
        {softwares.map((sw) => (
          <MenuItem key={sw} value={sw}>{sw}</MenuItem>
        ))}
      </TextField>

      <IconButton>
        <SearchIcon />
      </IconButton>
    </Box>
  );
};


