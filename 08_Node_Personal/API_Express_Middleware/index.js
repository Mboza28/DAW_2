import express from 'express';
import helmet from 'helmet';

const app = express();
const PORT = 4004;

app.use(helmet());

const logger = (req, res, next) => {
  console.log(`[INFO] Alguien ha solicitado acceder a la ruta: ${req.originalUrl}`);
  next();
}

const autorizacion = (req, res, next) => {
  req.nivelAcceso = 'Autorizado'; 
  console.log('[INFO] Nivel de acceso inyectado en la petición.');
  next();
}

app.use(logger);
app.use(autorizacion);

app.get('/', (req, res) => {
  res.send('<h1> Hola desde el endpoint landing</h1>');
});

app.get('/shinobis/:rango', (req, res) => {
  let rango = req.params.rango;
  res.send(`<h1>Buscando en la base de datos a los shinobis con el rango ${rango}</h1>`);
});

app.get('/shinobis/:nombre/misiones/:idMision', (req, res) => {
  let nombre = req.params.nombre;
  let idMision = req.params.idMision;
  let nivelAcceso = req.nivelAcceso;
  res.send(`<h1>Acceso: ${nivelAcceso}. Mostrando la misión ${idMision} del shinobi ${nombre}</h1>`);
});

app.listen(PORT, () => {
  console.log(`Servidor levantado en http://localhost:${PORT}`)
});