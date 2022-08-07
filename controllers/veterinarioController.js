import Veterinario from "../db/models/Veterinario.js";
import generarJWT from "../helpers/generarJWT.js";
import generarId from "../helpers/generarId.js";
import emailRegistro from "../helpers/emailRegistro.js";
import emailOlvidePassword from "../helpers/emailOlvidePassword.js";

const register = async (req, res) => {
    const { email, nombre } = req.body;

    const existeUsuario = await Veterinario.findOne({ email });

    if(existeUsuario){
        const error = new Error("Usuario ya registrado");
        return res.status(400).json({ msg: error.message })
    }

    try {
        const veterinario = new Veterinario(req.body);
        const veterinarioGuardado = await veterinario.save();

        // Enviar Email de confirmación
        emailRegistro({
            email,
            nombre,
            token: veterinarioGuardado.token
        })

        const datosVeterinario = await Veterinario.findById(veterinarioGuardado._id).select('-password');

        const response = {
            msg: `Veterinario Registrado con Éxito!`,
            info: datosVeterinario
        }

        res.status(200).json(response);

    } catch (error) {
        console.log(error);
    }

}

const perfil = (req, res) => {

    const { veterinario } = req;
    
    const response = veterinario

    res.status(200).json(response);
}

const confirmar = async (req, res) => {
    const { token } = req.params;

    const usuarioConfirmar = await Veterinario.findOne({ token })

    if(!usuarioConfirmar){
        const error = new Error("Token no válido!")
        return res.status(400).json({ msg: error.message });
    }

    try {
        usuarioConfirmar.token = null;
        usuarioConfirmar.confirmado = true;

        // Hacer esto es lo mismo que
        await usuarioConfirmar.save();
        // hacer esto otro
        // await Veterinario.findByIdAndUpdate(
        //     { _id: usuarioConfirmar.id},
        //     { $set: usuarioConfirmar },
        //     { returnOriginal: false }
        // );

        return res.status(200).json({
            msg: "Veterinario Confirmado con Exito!",
            data: usuarioConfirmar
        })
    } catch (error) {
        console.log(error);
    }
}

const autenticar = async (req, res) => {
    const { email, password } = req.body;

    try {
        const usuario = await Veterinario.findOne({ email });

        // Chequear si existe el usuario en la base de datos
        if(!usuario){
            const error = new Error("El correo o la contraseña ingresados no son válidos")
            return res.status(403).json({ msg: error.message});
        }

        // Chequear si la contraseña ingresada coincide con la almacenada
        if(! await usuario.comprobarPassword(password) ){
            const error = new Error("El correo o la contraseña ingresados no son válidos")
            return res.status(403).json({ msg: error.message});
        }

        // Chequear si el usuario confirmo su cuenta
        if(!usuario.confirmado){
            const error = new Error("Su cuenta aun no ha sido confirmada")
            return res.status(403).json({ msg: error.message});
        }        

        return res.status(200).json({
            token: generarJWT(usuario._id)
        })    

        
    } catch (error) {
        console.log(error);
    }

}

const olvidePassword = async (req, res) => {
    const { email } = req.body;

    const usuario = await Veterinario.findOne({ email });

    if(!usuario){
        const error = new Error('correo no válido!');
        return res.status(400).json({ msg: error.message });
    }
    
    try {
        usuario.token = generarId();
        await usuario.save();
        // Enviar email con el link para generar una nueva password
        emailOlvidePassword({
            nombre: usuario.nombre, 
            email: usuario.email,
            token: usuario.token 
        });
        
        return res.status(200).json({ msg: 'Hemos enviado un mail con las instrucciones' });
    } catch (error) {
        console.log(error); 
    }

};

const comprobarToken = async (req, res) => {

    const { token } = req.params;

    const tokenValido =  await Veterinario.findOne({ token });

    if(!tokenValido){
        const error = new Error('token no válido!');
        return res.status(400).json({ msg: error.message });
    }

    return res.status(200).json({ msg: 'Token valido' });
}

const nuevoPassword = async (req, res) => {

    const { token } = req.params;
    const { password } = req.body;

    const usuario = await Veterinario.findOne({ token });

    if(!usuario){
        const error = new Error('token no válido!');
        return res.status(400).json({ msg: error.message });
    }

    try {
        usuario.token = null;
        usuario.password = password;
        await usuario.save();
        return res.status(200).json({ msg: 'Contraseña actualizada' })
    } catch (error) {
        console.log(error);
    }
    
}

export { 
    register, 
    perfil,
    confirmar, 
    autenticar, 
    olvidePassword, 
    comprobarToken, 
    nuevoPassword 
}



