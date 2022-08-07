import nodemailer from 'nodemailer';
import dotenv from "dotenv/config";

const { EMAIL_HOST, EMAIL_USER, EMAIL_PASS, EMAIL_PORT, FRONTEND_URL } = process.env

const emailOlvidePassword = async datos => {

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
        subject: "APV - Restablecer Contraseña",
        text: 'APV - Restablecer Contraseña',
        html: `
            <h2>APV - Administrador de Pacientes de Veterinarios</h2>
            <p>
                Hola ${nombre}, restablece la contraseña de cuenta de APV.
            </p>
            <p>
                Para restablecer la contraseña de tu cuenta solo debes hacer click en el siguiente 
                <a href="${FRONTEND_URL}/new-password/${token}">enlace</a>
            </p>
            <p>Si tu no solicitaste restablecer la contraseña, por favor ignora este mensaje</p>
        `
    })

    console.log("Mensaje enviado %s", info.messageId);
}

export default emailOlvidePassword;