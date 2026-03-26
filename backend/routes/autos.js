const router = require("express").Router();
const Auto = require("../models/Auto");
const auth = require("../middleware/auth");

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
// POST privado
// =====================
router.post("/", auth, async (req, res) => {
  try {

    console.log(" BODY RECIBIDO:", req.body); //  DEBUG

    const nuevoAuto = new Auto({
      marca: req.body.marca,
      modelo: req.body.modelo,
      anio: req.body.anio,
      precio: req.body.precio,
      kilometros: req.body.kilometros,
      descripcion: req.body.descripcion,
      imagen: `/assets/autos/${req.body.imagen}`
    });

    console.log(" AUTO A GUARDAR:", nuevoAuto); //  DEBUG

    await nuevoAuto.save();

    console.log(" AUTO GUARDADO"); //DEBUG

    res.json(nuevoAuto);

  } catch (error) {
    console.error(" ERROR EN POST:", error); // DEBUG
    res.status(500).json({ message: "Error al crear auto" });
  }
});

// =====================
// PUT privado
// =====================
router.put("/:id", auth, async (req, res) => {
  try {

    console.log(" BODY UPDATE:", req.body); // DEBUG

    const datos = {
      marca: req.body.marca,
      modelo: req.body.modelo,
      anio: req.body.anio,
      precio: req.body.precio,
      kilometros: req.body.kilometros,
      descripcion: req.body.descripcion,
      imagen: `/assets/autos/${req.body.imagen}`
    };

    console.log(" DATOS A ACTUALIZAR:", datos); //  DEBUG

    const autoActualizado = await Auto.findByIdAndUpdate(
      req.params.id,
      datos,
      { new: true }
    );

    console.log(" AUTO ACTUALIZADO:", autoActualizado); //DEBUG

    res.json(autoActualizado);

  } catch (error) {
    console.error(" ERROR EN PUT:", error); // DEBUG
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