import  { useState } from 'react';
import { Box, Typography } from '@mui/material';
import {PostulacionCard} from '../componentes/PostulacionCard';
import {NoPostulaciones} from '../componentes/NoPostulaciones';
import { postulaciones as mockData } from '../mock/postulaciones';

export const PostulacionesPage = () => {
  // state local con mock
  const [postulaciones, setPostulaciones] = useState(mockData);

  // callback “eliminar”
  const handleDelete = (id) =>
    setPostulaciones((prev) => prev.filter((p) => p.id !== id));

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
         <Typography
            variant="h4"
            textalign="center"
            sx={{
                fontFamily: 'VT323, monospace',
                textTransform: 'uppercase',
                mb: 5,
                color: '#071eec', 
                borderBottom: '2px solidrgb(3, 12, 255)',
                display: 'inline-block',
                mx: 'auto',
            }}
      >
        Postulaciones a tus proyectos
      </Typography>
      {postulaciones.length === 0 ? (
        <NoPostulaciones />
      ) : (
        postulaciones.map((post) => (
          <PostulacionCard
            key={post.id}
            postulacion={post}
            onDelete={handleDelete}
          />
        ))
      )}
    </Box>
  );
};


