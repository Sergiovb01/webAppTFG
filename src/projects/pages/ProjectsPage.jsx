import { Card, CardContent, Typography, Avatar, TextField, MenuItem, IconButton, Button } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import SearchIcon from '@mui/icons-material/Search';

const filters = ["Categoría", "Skill", "Software"];

export const ProjectsPage = () => {
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
         <div className="col-md-3 text-end mt-2 mt-md-0">
          <Button variant="outlined">Crear Proyecto</Button>
        </div>
      </div>

      <div className="row">
        {[1, 2, 3, 4].map((project, idx) => (
          <div className="col-12 col-md-6 mb-4" key={idx}>
            <Card className="p-3">
              <div className="d-flex align-items-center mb-2">
                <Avatar className="me-2" />
                <Typography variant="subtitle2">Usuario</Typography>
              </div>
              <div className="position-relative mb-2" style={{ height: 180, backgroundColor: '#e0e0e0' }}>
                <IconButton className="position-absolute end-0 bottom-0">
                  <StarBorderIcon />
                </IconButton>
              </div>
              <Typography variant="h6" className="fw-bold">Proyecto {idx + 1}</Typography>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}

