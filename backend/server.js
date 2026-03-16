require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// carpeta para imágenes
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// servir archivos estáticos (CSS, JS, etc.) desde la raíz
app.use(express.static(path.join(__dirname, "..")));

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Mongo conectado"))
  .catch(err => console.log(err));

// Rutas API
app.use("/api/autos", require("./routes/autos"));
app.use("/api/auth", require("./routes/auth"));

// Página principal
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../Index.html")); // Mayúscula I
});

// Puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto", PORT);
});