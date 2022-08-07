import { Router } from 'express';
import checkAuth from '../middlewares/authMiddleware.js';

const router = new Router(); 

import { 
    agregarPaciente,
    obtenerPacientes,
    obtenerPaciente,
    editarPaciente,
    eliminarPaciente
} from '../controllers/pacienteController.js';

router.route('/')
    .post(checkAuth, agregarPaciente)
    .get(checkAuth, obtenerPacientes);

router.route('/:id')
    .get(checkAuth, obtenerPaciente)
    .put(checkAuth, editarPaciente)
    .delete(checkAuth, eliminarPaciente);

export default router;