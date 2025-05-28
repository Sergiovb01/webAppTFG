import { Card, CardContent, Typography, Avatar, Button, TextField, MenuItem, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const filters = ["Categoría", "Ubicación", "Skill", "Software"];

export const UsersPage = () => {
  return (
     <div className="container py-5">
      <div className="row justify-content-center mb-4">
        {filters.map((label, idx) => (
          <div className="col-6 col-md-2 mb-2" key={idx}>
            <TextField
              select
              fullWidth
              size="small"
              label={label}
              defaultValue=""
            >
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="opcion1">Opción 1</MenuItem>
              <MenuItem value="opcion2">Opción 2</MenuItem>
            </TextField>
          </div>
        ))}
        <div className="col-2 d-flex align-items-center justify-content-center">
          <IconButton>
            <SearchIcon />
          </IconButton>
        </div>
      </div>

      <div className="text-center mb-4">
        <Avatar style={{ width: 60, height: 60, margin: '0 auto' }} />
        <Typography variant="subtitle1">Usuario</Typography>
      </div>

      <div className="row justify-content-center mb-3">
        {[1, 2, 3, 4, 5].map((item) => (
          <div className="col-6 col-md-2 mb-3" key={item}>
            <Card>
              <div style={{ height: '100px', backgroundColor: '#e0e0e0' }} />
            </Card>
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-between flex-wrap">
        <div className="d-flex gap-2 flex-wrap">
          <Button variant="outlined">Skill</Button>
          <Button variant="outlined">Software</Button>
          <Button variant="outlined">Skill</Button>
        </div>
        <Button variant="outlined" endIcon={<PersonAddIcon />}>Seguir</Button>
      </div>
    </div>
  )
}


