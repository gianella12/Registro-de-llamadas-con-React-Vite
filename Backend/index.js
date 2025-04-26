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

app.get('/generar-telefonos/:cantidad', async (req, res) => {
  const cantidad = parseInt(req.params.cantidad);

  if (isNaN(cantidad) || cantidad <= 0) {
    return res.status(400).json({ error: 'Cantidad inválida' });
  }

  try {
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

    res.json(filas);
  } catch (error) {
    console.error('❌ Error al generar e insertar llamadas:', error.message);
    console.error(error.stack);
    res.status(500).json({ error: 'Error del servidor' });
  }
});


app.post(`/editar-telefonos`,async (req, res) => {
  const { indice, datosEditados } = req.body;

  for (const valorEditado in datosEditados) {
    if (typeof datosEditados[valorEditado] !== 'number') {
      return res.status(400).json({ error: `El campo "${valorEditado}" debe ser un número` });
    }
  }

  const { origen, destino, duracion } = datosEditados;
  const [idfilas] = await conexion.execute(`SELECT id_llamada FROM llamadas LIMIT ${indice}, 1`);

  if (!idfilas.length) {
    return res.status(404).json({ error: 'No se encontró la llamada con ese índice' });
  }

  if (origen !== undefined) {
    if (origen.toString().length === 10) {
      const idLlamada = idfilas[0].id_llamada;

      await conexion.execute(
        'UPDATE llamadas SET origen = ? WHERE id_llamada = ?',
        [origen, idLlamada]
      );

    } else {
      return res.status(400).json({ error: 'El número de origen debe tener 10 dígitos' });
    }
  }

  if (destino !== undefined) {
    if (destino.toString().length === 10) {
      const idLlamada = idfilas[0].id_llamada;

      await conexion.execute(
        'UPDATE llamadas SET destino = ? WHERE id_llamada = ?',
        [destino, idLlamada]
      );
    } else {
      return res.status(400).json({ error: 'El número de destino debe tener 10 dígitos' });
    }
  }

  if (duracion !== undefined) {
    if (duracion > 29 && duracion <= 600) {
      const idLlamada = idfilas[0].id_llamada;

      await conexion.execute(
        'UPDATE llamadas SET duracion = ? WHERE id_llamada = ?',
        [duracion, idLlamada]
      );
    } else {
      return res.status(400).json({ error: 'La duración de la llamada debe ser entre 30 y 600 segundos' });
    }
  }
  
  const [filas] = await conexion.execute('SELECT * FROM llamadas');

    res.status(200).json(filas);
});


app.post(`/borrar-telefonos`, async (req, res) => {
  const { id_llamada } = req.body;

  if (!id_llamada) {
    return res.status(400).json({ error: 'ID de llamada no proporcionado' });
  }

  try {
    const [resultado] = await conexion.execute('DELETE FROM llamadas WHERE id_llamada = ?', [id_llamada]);

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ error: 'Llamada no encontrada' });
    }

    const [filas] = await conexion.execute('SELECT * FROM llamadas ORDER BY id_llamada ASC');
    res.status(200).json(filas);

  } catch (error) {
    console.error('Error al eliminar llamada:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
})

app.listen(PUERTO, () => {
  console.log('server on port :', PUERTO)
})