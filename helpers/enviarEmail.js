import nodemailer from "nodemailer";
import "dotenv/config";

import { EMAIL_OPTIONS } from "../constants/Email.js";
import { STRING_FLAGS } from "../constants/Flags.js";

const { EMAIL_HOST, EMAIL_USER, EMAIL_PASS, EMAIL_PORT, FRONTEND_URL } =
  process.env;

const enviarEmail = async (datos, option) => {
  const { nombre, email, token } = datos;

  const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  const { from, subject, text, html } = EMAIL_OPTIONS[option] || {};

  const info = await transporter.sendMail({
    from,
    to: email,
    subject,
    text,
    html: html
      .replace(STRING_FLAGS.nombre, nombre)
      .replace(STRING_FLAGS.frontEndUrl, FRONTEND_URL)
      .replace(STRING_FLAGS.token, token),
  });

  console.log("Mensaje enviado %s", info.messageId);
};

export default enviarEmail
