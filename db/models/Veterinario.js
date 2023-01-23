import mongoose from "mongoose";
import { genSalt, hash, compare } from "bcrypt";
import generarId from "../../helpers/generarId.js";

const veterinarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  telefono: {
    type: String,
    default: null,
    trim: true,
  },
  web: {
    type: String,
    default: null,
  },
  token: {
    type: String,
    default: generarId(),
  },
  confirmado: {
    type: Boolean,
    default: false,
  },
});

veterinarioSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await genSalt(10);
  this.password = await hash(this.password, salt);
});

veterinarioSchema.methods.comprobarPassword = async function (formPassword) {
  return await compare(formPassword, this.password);
};

const Veterinario = mongoose.model("Veterinario", veterinarioSchema);

export default Veterinario;
