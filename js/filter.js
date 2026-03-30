import { renderAutos } from "./cards.js";

let autosGlobal = [];

const minRange = document.getElementById("minRange");
const maxRange = document.getElementById("maxRange");
const precioMin = document.getElementById("precioMin");
const precioMax = document.getElementById("precioMax");
const marcaSelect = document.getElementById("marcaSelect"); // 🔥 tu ID real

function formatearPrecio(valor) {
  return "$" + valor.toLocaleString("es-AR");
}

// =======================
// GENERAR MARCAS
// =======================
function cargarMarcas() {
  const marcas = [...new Set(autosGlobal.map(a => a.marca))];

  marcaSelect.innerHTML = `<option value="todas">Todas</option>`;

  marcas.forEach(marca => {
    marcaSelect.innerHTML += `<option value="${marca}">${marca}</option>`;
  });
}

// =======================
// ACTUALIZAR PRECIOS
// =======================
function actualizarPrecios() {
  let min = parseInt(minRange.value);
  let max = parseInt(maxRange.value);

  if (min > max) {
    minRange.value = max;
    min = max;
  }

  precioMin.textContent = formatearPrecio(min);
  precioMax.textContent = formatearPrecio(max);

  filtrarAutos();
}

// =======================
// FILTRAR AUTOS
// =======================
function filtrarAutos() {
  const minPrecio = parseInt(minRange.value);
  const maxPrecio = parseInt(maxRange.value);
  const marca = marcaSelect.value;

  const autosFiltrados = autosGlobal.filter(auto => {
    const cumplePrecio =
      auto.precio >= minPrecio && auto.precio <= maxPrecio;

    const cumpleMarca =
      marca === "todas" || auto.marca === marca;

    return cumplePrecio && cumpleMarca;
  });

  renderAutos(autosFiltrados);
}

// =======================
// INIT
// =======================
export function initFiltros(autos) {
  autosGlobal = autos;

  cargarMarcas(); // 🔥 llena el select

  minRange.addEventListener("input", actualizarPrecios);
  maxRange.addEventListener("input", actualizarPrecios);
  marcaSelect.addEventListener("change", filtrarAutos); // 🔥 clave

  actualizarPrecios();
}