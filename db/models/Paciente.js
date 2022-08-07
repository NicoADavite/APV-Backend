import mongoose from "mongoose";

const pacienteSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true 
    },
    propietario: {
        type: String,
        required: true,
        trim: true 
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    fecha: {
        type: Date,
        required: true,
        default: Date.now(),
        trim: true
    },
    sintomas: {
        type: String,
        required: true,
        trim: true
    },
    veterinarioId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Veterinario'
    }
});

const Paciente = mongoose.model('Paciente', pacienteSchema);

export default Paciente;