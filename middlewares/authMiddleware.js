import jwt from 'jsonwebtoken';
import "dotenv/config";

import Veterinario from '../db/models/Veterinario.js';

const checkAuth = async ( req, res, next ) => { 

    let token;
    const { JWT_SECRET } = process.env;
    
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){    
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, JWT_SECRET);
            req.veterinario = await Veterinario.findById(decoded.id).select('-password -token -confirmado -__v')
            return next();
        } catch (error) {
            const e = new Error("Token no valido");
            return res.status(403).json({ msg: e.message });
        }
    }

    const error = new Error("Token no valido o inexistente");
    return res.status(403).json({ msg: error.message });

    next();
}

export default checkAuth;