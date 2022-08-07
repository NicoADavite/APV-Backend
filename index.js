import express from 'express';
import cors from 'cors';
import dotenv from "dotenv/config";
import conectarDB from './db/config/db.js';
import veterinarioRouter from './routes/veterinarioRoutes.js';
import pacienteRouter from './routes/pacienteRoutes.js';

const app = express();

conectarDB();

const dominiosPermitidos = [process.env.FRONTEND_URL];

const corsOptions = {
    origin: ( origin, callback ) => {
        dominiosPermitidos.indexOf(origin) !== -1 ? callback( null, true ) : callback( new Error("Acceso no permitido por CORS") );
    }
}

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/veterinarios", veterinarioRouter)
app.use("/api/pacientes", pacienteRouter)


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));