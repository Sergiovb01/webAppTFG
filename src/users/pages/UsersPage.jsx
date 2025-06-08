import { BusquedaFiltros } from "..";
import { TarjetaUsuario } from "../componentes/TarjetaUsuario";
import Grid from '@mui/material/Grid';

// pages/ArtistsPage.jsx


const mockUsers = [
  {
    username: "AnaArtista",
    profilePic: "https://via.placeholder.com/64",
    projects: [
      "https://via.placeholder.com/800x200?text=Proyecto+1",
      "https://via.placeholder.com/800x200?text=Proyecto+2",
    ],
    skills: ["Ilustración", "Sketch"],
    softwares: ["Photoshop", "Procreate"],
  },
  {
    username: "Carlos3D",
    profilePic: "https://via.placeholder.com/64",
    projects: [
      "https://via.placeholder.com/800x200?text=3D+1",
      "https://via.placeholder.com/800x200?text=3D+2",
      "https://via.placeholder.com/800x200?text=3D+3",
    ],
    skills: ["Modelado", "Animación"],
    softwares: ["Blender", "Unity"],
  },
  {
    username: "Carlos3D",
    profilePic: "https://via.placeholder.com/64",
    projects: [
      "https://via.placeholder.com/800x200?text=3D+1",
      "https://via.placeholder.com/800x200?text=3D+2",
      "https://via.placeholder.com/800x200?text=3D+3",
    ],
    skills: ["Modelado", "Animación"],
    softwares: ["Blender", "Unity"],
  },
];

export const UsersPage = () => {
  return (
    <div>
      <BusquedaFiltros />
     
      <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
         {mockUsers.map((user, i) => (
           <Grid size={6} key={i}>
              <TarjetaUsuario  user={user} />
          </Grid>
          ))}
      </Grid>
    
    </div>
  );
};


