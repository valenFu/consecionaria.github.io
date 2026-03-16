require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// carpeta para imágenes
app.use("/uploads", express.static("uploads"));

// servir frontend
app.use(express.static(path.join(__dirname, "../frontend")));

// conexión a mongo
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Mongo conectado"))
  .catch(err => console.log(err));

// rutas
app.use("/api/autos", require("./routes/autos"));
app.use("/api/auth", require("./routes/auth"));

// index
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto", PORT);
});