const router = require("express").Router();
const Auto = require("../models/Auto");
const auth = require("../middleware/auth");
const upload = require("../middleware/upload"); // 🔥 IMPORTANTE

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
// POST (crear auto)
// =====================
router.post("/", auth, upload.single("imagen"), async (req, res) => {
  try {

    console.log("📥 BODY:", req.body);
    console.log("🖼 FILE:", req.file); // 🔥 DEBUG CLOUDINARY

    const nuevoAuto = new Auto({
      marca: req.body.marca,
      modelo: req.body.modelo,
      anio: req.body.anio,
      precio: req.body.precio,
      kilometros: req.body.kilometros,
      descripcion: req.body.descripcion,
      imagen: req.file ? req.file.path : "" // 🔥 URL CLOUDINARY
    });

    await nuevoAuto.save();

    console.log("✅ AUTO GUARDADO:", nuevoAuto);

    res.json(nuevoAuto);

  } catch (error) {
    console.error("❌ ERROR POST:", error);
    res.status(500).json({ message: "Error al crear auto" });
  }
});

// =====================
// PUT (editar auto)
// =====================
router.put("/:id", auth, upload.single("imagen"), async (req, res) => {
  try {

    console.log("📥 BODY UPDATE:", req.body);
    console.log("🖼 FILE UPDATE:", req.file);

    const datos = {
      marca: req.body.marca,
      modelo: req.body.modelo,
      anio: req.body.anio,
      precio: req.body.precio,
      kilometros: req.body.kilometros,
      descripcion: req.body.descripcion
    };

    // 🔥 SOLO actualiza imagen si subieron una nueva
    if (req.file) {
      datos.imagen = req.file.path;
    }

    const autoActualizado = await Auto.findByIdAndUpdate(
      req.params.id,
      datos,
      { new: true }
    );

    console.log("✅ AUTO ACTUALIZADO:", autoActualizado);

    res.json(autoActualizado);

  } catch (error) {
    console.error("❌ ERROR PUT:", error);
    res.status(500).json({ message: "Error al actualizar auto" });
  }
});

// =====================
// DELETE
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
// GET por ID
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