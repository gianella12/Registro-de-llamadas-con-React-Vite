import express from 'express';
import llamadasRoutes from './rutas/llamadas.js';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const PUERTO = 3000;
app.use('/llamadas', llamadasRoutes);


app.listen(PUERTO, () => {
  console.log('server on port :', PUERTO)
})