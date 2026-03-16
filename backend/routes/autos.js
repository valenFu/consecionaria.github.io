const router = require("express").Router();
const Auto = require("../models/Auto");
const auth = require("../middleware/auth");
const multer = require("multer");

// Configuración de multer
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });


// =====================
// GET públicos
// =====================
router.get("/", async (req, res) => {
  try {
    const autos = await Auto.find().sort({ createdAt: -1 });
    res.json(autos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener autos" });
  }
});


// =====================
// POST privado (crear auto)
// =====================
router.post("/", auth, upload.single("imagen"), async (req, res) => {
  try {
    const nuevoAuto = new Auto({
      ...req.body,
      imagen: req.file ? `/uploads/${req.file.filename}` : "",
    });

    await nuevoAuto.save();
    res.json(nuevoAuto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear auto" });
  }
});


// =====================
// PUT privado (editar auto)
// =====================
router.put("/:id", auth, upload.single("imagen"), async (req, res) => {
  try {

    const datos = {
      ...req.body
    };

    if (req.file) {
      datos.imagen = `/uploads/${req.file.filename}`;
    }

    const autoActualizado = await Auto.findByIdAndUpdate(
      req.params.id,
      datos,
      { new: true }
    );

    res.json(autoActualizado);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar auto" });
  }
});


// =====================
// DELETE privado
// =====================
router.delete("/:id", auth, async (req, res) => {
  try {
    await Auto.findByIdAndDelete(req.params.id);
    res.json({ message: "Auto eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar auto" });
  }
});

// =====================
// GET auto por ID
// =====================
router.get("/:id", async (req, res) => {
  try {
    const auto = await Auto.findById(req.params.id);
    res.json(auto);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener auto" });
  }
});

module.exports = router;