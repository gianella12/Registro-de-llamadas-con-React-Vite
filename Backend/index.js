import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

const PUERTO = 3000;

app.get('/generar-telefonos/:cantidad', (req, res) => {
    const cantidad = parseInt(req.params.cantidad);
  
    // Validación del número
    if (isNaN(cantidad) || cantidad <= 0) {
      return res.status(400).json({ error: 'Cantidad inválida' });
    }
  
    const llamadas = [];

    for (let i = 0; i < cantidad; i++) {
      const origen = Math.floor(Math.random() * (9999999999 - 1111111111) + 1111111111);
      const destino = Math.floor(Math.random() * (9999999999 - 1111111111) + 1111111111);
      const duracionDeLlamada = Math.floor(Math.random() * (600 - 30 + 1) + 30);
  
      llamadas.push({ origen, destino, duracionDeLlamada });
    }
  
    res.json(llamadas);
  });
   
app.listen(PUERTO, () => {
    console.log('server on port :', PUERTO)
})