import { Router } from 'express';
import checkAuth from '../middlewares/authMiddleware.js';

const router = new Router();

import { 
    perfil, 
    register, 
    confirmar, 
    autenticar, 
    olvidePassword,
    comprobarToken,
    nuevoPassword
} from '../controllers/veterinarioController.js'

// Area pública
router.post('/', register);
router.get('/confirmar/:token', confirmar);
router.post('/login', autenticar);
router.post('/olvide-password', olvidePassword);
router.route('/olvide-password/:token').get(comprobarToken).post(nuevoPassword)

// Area privada
router.get('/perfil', checkAuth, perfil);

export default router;

