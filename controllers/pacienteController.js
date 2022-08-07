import Paciente from "../db/models/Paciente.js"

const agregarPaciente = async (req, res) => {

    const paciente = new Paciente(req.body);
    paciente.veterinarioId = req.veterinario._id

    try {
        const pacienteAlmacenado = await paciente.save();
        return res.status(200).json( {
            msg: 'paciente registrado con éxito',
            data: pacienteAlmacenado
        })
    } catch (error) {
        console.log(error);
        return res.status(200).json( {
            msg: 'Error! No se pudo registrar al paciente!',
        })
    }
}

const obtenerPacientes = async (req, res) => {
    const pacientes = await Paciente.find()
        .where("veterinarioId")
        .equals(req.veterinario._id)
        .select('-__v');
 
    res.status(200).json(pacientes)
}

const obtenerPaciente = async function (req, res) {

    const { id } = req.params;
    const { veterinario }  = req;

    try {
        const paciente = await Paciente.findById(id);

        if(!paciente){
            return res.status(400).json({
                msg: "Paciente no encontrado!"
            })

        }

        if( paciente.veterinarioId.toString() != veterinario._id.toString() ){
            return res.status(400).json({
                msg: "Acción no valida!"
            })
        }

        return res.status(200).json({
            msg: "Paciente encontrado!",
            data: paciente
        })
        
    } catch (error) {
        console.log(error);
    }

}

const editarPaciente = async (req, res) => {
    
    const { id } = req.params;
    const { veterinario } = req;

    const pacienteEditar = await Paciente.findById(id);
    
    if(!pacienteEditar){
        const error = new Error("No se encontró ningún paciente");
        return res.status(400).json({ msg: error.message })
    }

    if (pacienteEditar.veterinarioId.toString() !== veterinario._id.toString()) {
        const error = new Error("Acción no valida");
        return res.status(400).json({ msg: error.message })
    }

    pacienteEditar.nombre = req.body.nombre || pacienteEditar.nombre; 
    pacienteEditar.propietario = req.body.propietario || pacienteEditar.propietario; 
    pacienteEditar.email = req.body.email || pacienteEditar.email; 
    pacienteEditar.fecha = req.body.fecha || pacienteEditar.fecha; 
    pacienteEditar.sintomas = req.body.sintomas || pacienteEditar.sintomas; 

    try {
        await pacienteEditar.save();
        return res.status(200).json({ msg: 'usuario actualizado', data: pacienteEditar });        
    } catch (error) {
        console.log(error);
    } 

}

const eliminarPaciente = async (req, res) => {

    const { id } = req.params;
    const { veterinario } = req;

    const pacienteEliminar= await Paciente.findById(id);
    
    if(!pacienteEliminar){
        const error = new Error("No se encontró ningún paciente");
        return res.status(400).json({ msg: error.message })
    }

    if (pacienteEliminar.veterinarioId.toString() !== veterinario._id.toString()) {
        const error = new Error("Acción no valida");
        return res.status(400).json({ msg: error.message })
    }

    try {
        await pacienteEliminar.deleteOne();
        return res.status(200).json({ 
            msg: 'Usuario Eliminado',
            data: 1
        })
    } catch (error) {
        console.log(error);
    }


}


export {
    agregarPaciente,
    obtenerPacientes,
    obtenerPaciente,
    editarPaciente,
    eliminarPaciente
}