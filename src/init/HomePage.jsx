import { Card, CardContent, Typography } from '@mui/material';

export const HomePage = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 text-center">
      <div className="mb-5">
        <h5 className="fw-bold">
          Conecta. Colabora. Crea. La red profesional para artistas del cine y la animación.
        </h5>
      </div>

      <div className="row justify-content-center w-100 px-3">
        {[1, 2, 3, 4].map((item) => (
          <div className="col-12 col-sm-6 col-md-3 mb-4 d-flex justify-content-center" key={item}>
            <Card className="h-500 w-100 card-large">
              <CardContent>
                <Typography variant="body2" color="textSecondary">
                  Proyecto
                </Typography>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};