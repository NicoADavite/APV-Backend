import { STRING_FLAGS } from "./Flags.js";

export const EMAIL_OPTIONS = {
  register: {
    from: "APV - Administrador de Pacientes de Veterinarios",
    subject: "APV - Confirma tu cuenta",
    text: "APV - Confirma tu cuenta",
    html: `
          <h2>APV - Administrador de Pacientes de Veterinarios</h2>
          <p>
              Hola ${STRING_FLAGS.nombre}, tu cuenta fue registrada exitosamente en APV.
          </p>
          <p>
              Para confirmar tu cuenta solo debes hacer click en el siguiente 
              <a href="${STRING_FLAGS.frontEndUrl}/confirm/${STRING_FLAGS.token}">enlace</a>
          </p>
          <p>Si tu no intentaste registrarte en nuestra plataforma, por favor ignora este mensaje</p>
      `,
  },
  forgetPassword: {
    from: "APV - Administrador de Pacientes de Veterinarios",
    subject: "APV - Restablecer Contraseña",
    text: "APV - Restablecer Contraseña",
    html: `
          <h2>APV - Administrador de Pacientes de Veterinarios</h2>
          <p>
              Hola ${STRING_FLAGS.nombre}, restablece la contraseña de cuenta de APV.
          </p>
          <p>
              Para restablecer la contraseña de tu cuenta solo debes hacer click en el siguiente 
              <a href="${STRING_FLAGS.frontEndUrl}/new-password/${STRING_FLAGS.token}">enlace</a>
          </p>
          <p>Si tu no solicitaste restablecer la contraseña, por favor ignora este mensaje</p>
      `,
  },
};
