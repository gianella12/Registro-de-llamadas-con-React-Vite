import express from 'express';
import conexion from './basededatos.js';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const PUERTO = 3000;

app.get('/', async (req, res) => {
  const [filas] = await conexion.execute('SELECT * FROM llamadas');
  res.json(filas);
});

app.get('/generar-telefonos/:cantidad', async(req, res) => {
    const cantidad = parseInt(req.params.cantidad);
  
    if (isNaN(cantidad) || cantidad <= 0) {
      return res.status(400).json({ error: 'Cantidad inválida' });
    }

    try{ 
   await conexion.execute('DELETE FROM llamadas');

    for (let i = 0; i < cantidad; i++) {
      const origen = Math.floor(Math.random() * (9999999999 - 1111111111) + 1111111111);
      const destino = Math.floor(Math.random() * (9999999999 - 1111111111) + 1111111111);
      const duracion = Math.floor(Math.random() * (600 - 30 + 1) + 30);
  
     await conexion.execute(
        'INSERT INTO llamadas (origen, destino, duracion) VALUES (?, ?, ?)',
        [origen, destino, duracion]
      );
    }
    
    const [filas] = await conexion.execute('SELECT * FROM llamadas');
     console.log('¿Qué devuelve execute?:', filas);
    
    res.json(filas);
  } catch (error){
      console.error('❌ Error al generar e insertar llamadas:', error.message);
      console.error(error.stack);
      res.status(500).json({ error: 'Error del servidor' });
    }
  });
  

app.post(`/editar-telefonos`, (req, res) => {
    const { indice, datosEditados } = req.body;
   
    for (const valorEditado in datosEditados) {
      if (typeof datosEditados[valorEditado] !== 'number') {
        return res.status(400).json({ error: `El campo "${valorEditado}" debe ser un número` });
      }
    }

    const { origen, destino, duracionDeLlamada } = datosEditados;

    if (origen !== undefined) {
      if (origen.toString().length === 10) {
        llamadas[indice].origen = origen;
      } else {
        return res.status(400).json({ error: 'El número de origen debe tener 10 dígitos' });
      }
    }

    if (destino !== undefined) {
      if (destino.toString().length === 10) {
        llamadas[indice].destino = destino;
      } else {
        return res.status(400).json({ error: 'El número de destino debe tener 10 dígitos' });
      }
    }
  
    if (duracionDeLlamada !== undefined) {
      if (duracionDeLlamada > 29 && duracionDeLlamada <= 600) {
        llamadas[indice].duracionDeLlamada = duracionDeLlamada;
      } else {
        return res.status(400).json({ error: 'La duración de la llamada debe ser entre 30 y 600 segundos' });
      }
    }
    res.status(200).json(llamadas);
  });
  
app.post(`/borrar-telefonos`, (req, res) => {
  const { index } = req.body

  if(typeof index !== 'number' || index < 0 || index >= llamadas.length){
  return res.status(400).json({ error: 'error de indice' });
  }
    llamadas.splice(index, 1);
  
  res.status(200).json(llamadas);
 })

app.listen(PUERTO, () => {
    console.log('server on port :', PUERTO)
})