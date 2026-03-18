require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta absoluta a uploads
const uploadsPath = path.resolve(__dirname, "../uploads");
console.log("Ruta uploads:", uploadsPath);

// Servir imágenes
app.use("/uploads", express.static(uploadsPath));

// Archivos estáticos (frontend)
app.use(express.static(path.join(__dirname, "..")));

// Mongo
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Mongo conectado"))
  .catch(err => console.log(err));

// Rutas
app.use("/api/autos", require("./routes/autos"));
app.use("/api/auth", require("./routes/auth"));

// Home
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../Index.html"));
});

// Puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto", PORT);
});