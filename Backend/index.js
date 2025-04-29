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

app.post(`/insertar-registro`, async (req, res) => {
  const {  datosEditados } = req.body;

  const camposPermitidos = ['origen', 'destino', 'duracion'];
  const { origen, destino, duracion } = datosEditados;

  for (const campo in datosEditados) {
    const valor = datosEditados[campo];

    if (!camposPermitidos.includes(campo)) {
      return res.status(400).json({ error: `Campo "${campo}" no permitido` });
    }

    if (typeof  valor !== 'number') {
      return res.status(400).json({ error: `El campo "${valor}" debe ser un número` });
    }

    if (( campo === 'origen' || campo === 'destino') && valor.toString().length !== 10) {
      return res.status(400).json({ error: `El número de ${campo} debe tener 10 dígitos` });
    }

    if ( campo === 'duracion' && (valor <= 29 || valor > 600)) {
      return res.status(400).json({ error: 'La duración de la llamada debe ser entre 30 y 600 segundos' });
    }

  }

  try {
    await conexion.execute(
      'INSERT INTO llamadas (origen, destino, duracion) VALUES (?, ?, ?)',
      [origen, destino, duracion]
    );

    const [filas] = await conexion.execute('SELECT * FROM llamadas');
    res.status(200).json(filas);
  } catch (error) {
    console.error('Error al insertar en la base de datos:', error);
    res.status(500).json({ error: 'Error al insertar en la base de datos' });
  }
})

app.put(`/editar-telefonos`, async (req, res) => {
  const { id_llamada, datosEditados } = req.body;

  const camposPermitidos = ['origen', 'destino', 'duracion'];

  const actualizar = async (id_llamada, campo, valor) => {
    const consulta = `UPDATE llamadas SET ${campo} = ? WHERE id_llamada = ?`;

    await conexion.execute(consulta, [valor, id_llamada]);
  };

  for (const campo in datosEditados) {
    const valor = datosEditados[campo];

    if (!camposPermitidos.includes(campo)) {
      return res.status(400).json({ error: `Campo "${campo}" no permitido` });
    }

    if (typeof valor !== 'number') {
      return res.status(400).json({ error: `El campo "${campo}" debe ser un número` });
    }

    if ((campo === 'origen' || campo === 'destino') && valor.toString().length !== 10) {
      return res.status(400).json({ error: `El número de ${campo} debe tener 10 dígitos` });
    }

    if (campo === 'duracion' && (valor <= 29 || valor > 600)) {
      return res.status(400).json({ error: 'La duración de la llamada debe ser entre 30 y 600 segundos' });
    }

    await actualizar(id_llamada, campo, valor);
  }

  const [filas] = await conexion.execute('SELECT * FROM llamadas');
  res.status(200).json(filas);
});


app.delete(`/borrar-telefonos`, async (req, res) => {
  const { id_llamada } = req.body;

  if (!id_llamada) {
    return res.status(400).json({ error: 'ID de llamada no proporcionado' });
  }

  try {
    const [resultado] = await conexion.execute(`DELETE FROM llamadas WHERE id_llamada = ?`, [id_llamada]);

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