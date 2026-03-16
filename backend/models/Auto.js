const mongoose = require("mongoose");

const autoSchema = new mongoose.Schema({
  marca: { type: String, required: true },
  modelo: { type: String, required: true },
  anio: { type: Number, required: true },
  precio: { type: Number, required: true },
  kilometros: { type: Number },
  descripcion: { type: String },
  imagen: { type: String },
  creadoEn: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Auto", autoSchema);