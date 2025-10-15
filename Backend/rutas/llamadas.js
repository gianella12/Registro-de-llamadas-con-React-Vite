import { Router } from 'express';
import {
  obtenerLlamadas,
  generarTelefonos,
  insertarRegistro,
  editarTelefonos,
  borrarTelefonos
} from '../controladores/llamadasController.js';

const router = Router();

router.get('/', obtenerLlamadas);
router.get('/generar-telefonos/:cantidad', generarTelefonos);
router.post('/insertar-registro', insertarRegistro);
router.put('/editar-telefonos', editarTelefonos);
router.delete('/borrar-telefonos', borrarTelefonos);

export default router;