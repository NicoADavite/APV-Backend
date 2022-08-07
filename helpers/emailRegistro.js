import nodemailer from 'nodemailer';
import dotenv from "dotenv/config";

const { EMAIL_HOST, EMAIL_USER, EMAIL_PASS, EMAIL_PORT, FRONTEND_URL } = process.env

const emailRegistro = async datos => {

    const { nombre, email, token } = datos;

    const transporter = nodemailer.createTransport({
        host: EMAIL_HOST,
        port: EMAIL_PORT,
        auth: {
          user: EMAIL_USER,
          pass: EMAIL_PASS
        }
    });
    
    
    const info = await transporter.sendMail({
        from: "APV - Administrador de Pacientes de Veterinarios",
        to: email, 
        subject: "APV - Confirma tu cuenta",
        text: 'APV - Confirma tu cuenta',
        html: `
            <h2>APV - Administrador de Pacientes de Veterinarios</h2>
            <p>
                Hola ${nombre}, tu cuenta fue registrada exitosamente en APV.
            </p>
            <p>
                Para confirmar tu cuenta solo debes hacer click en el siguiente 
                <a href="${FRONTEND_URL}/confirm/${token}">enlace</a>
            </p>
            <p>Si tu no intentaste registrarte en nuestra plataforma, por favor ignora este mensaje</p>
        `
    })

    console.log("Mensaje enviado %s", info.messageId);
}

export default emailRegistro;