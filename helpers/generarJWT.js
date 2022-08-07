import jwt from 'jsonwebtoken';
import dotenv from "dotenv/config";

const { JWT_SECRET } = process.env;

const generarJWT = (id) => {
    return jwt.sign( { id }, JWT_SECRET, { expiresIn: "30d" } );
}

export default generarJWT;