import Grid from '@mui/material/Grid';
import { BusquedaProyectos } from "../componentes/BusquedaProyectos";
import { TarjetaProyecto } from '../componentes/TarjetaProyecto';



const mockProjects = [
  {
    id: 1,
    name: "Sistema de Gestión Web",
    description: "Aplicación web para gestión de inventarios",
    category: "Web Development",
    skill: "React",
    software: "Visual Studio Code",
    user: {
      name: "Ana García",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop",
    isFavorite: false
  },
  {
    id: 2,
    name: "App Móvil de Fitness",
    description: "Aplicación para seguimiento de ejercicios",
    category: "Mobile Development",
    skill: "Flutter",
    software: "Android Studio",
    user: {
      name: "Carlos Ruiz",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop",
    isFavorite: true
  },
  {
    id: 3,
    name: "Dashboard Analítico",
    description: "Panel de control con métricas en tiempo real",
    category: "Data Analysis",
    skill: "Python",
    software: "Jupyter Notebook",
    user: {
      name: "María López",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop",
    isFavorite: false
  },
  {
    id: 4,
    name: "E-commerce Platform",
    description: "Plataforma de comercio electrónico completa",
    category: "Web Development",
    skill: "Node.js",
    software: "VS Code",
    user: {
      name: "Roberto Silva",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
    },
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=200&fit=crop",
    isFavorite: false
  },
  {
    id: 5,
    name: "Sistema IoT Domótico",
    description: "Control inteligente del hogar",
    category: "IoT",
    skill: "Arduino",
    software: "Arduino IDE",
    user: {
      name: "Laura Martín",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
    },
    image: "https://images.unsplash.com/photo-1558618663-fcd4c64cd2ec?w=400&h=200&fit=crop",
    isFavorite: true
  },
  {
    id: 6,
    name: "Machine Learning Model",
    description: "Modelo predictivo para análisis de ventas",
    category: "AI/ML",
    skill: "TensorFlow",
    software: "Google Colab",
    user: {
      name: "David Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=400&h=200&fit=crop",
    isFavorite: false
  }
];

export const ProjectsPage = () => {
  return (
    <div>
          <BusquedaProyectos />
         
          <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 1, md: 5 }}>
             {mockProjects.map((project, i) => (
               <Grid size={6} key={i}>
                  <TarjetaProyecto  project={project} />
              </Grid>
              ))}
          </Grid>
        
        </div>
  )
}

