import React from 'react';
import { Card, Avatar, Typography, IconButton, Box } from '@mui/material';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import CloseIcon from '@mui/icons-material/Close';

export const UsuarioCard = ({ nombre, mostrarSeguir, onAction }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: 1.5,
        mb: 1.5,
        borderRadius: '12px',
      }}
    >
      <Avatar sx={{ mr: 2 }} />
      <Typography
        sx={{ fontFamily: 'VT323, monospace', flexGrow: 1, fontSize: '1.2rem' }}
      >
        {nombre}
      </Typography>

      <IconButton onClick={onAction}>
        {mostrarSeguir ? <PersonAddAlt1Icon /> : <CloseIcon />}
      </IconButton>
    </Card>
  );
};


