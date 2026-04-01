import { renderAutos } from "./cards.js";

let autosGlobal = [];

// variables del DOM
let minRange, maxRange, precioMin, precioMax, marcaSelect;

function formatearPrecio(valor) {
  return "$" + valor.toLocaleString("es-AR");
}

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

// genera las marcas dinámicamente
function cargarMarcas() {
  const marcas = [...new Set(autosGlobal.map(a => a.marca))];

  marcaSelect.innerHTML = `<option value="todas">Todas</option>`;

  marcas.forEach(marca => {
    const option = document.createElement("option");
    option.value = marca;
    option.textContent = marca;
    marcaSelect.appendChild(option);
  });
}

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

export function initFiltros(autos) {
  autosGlobal = autos;

  // obtener elementos cuando el DOM ya existe
  minRange = document.getElementById("minRange");
  maxRange = document.getElementById("maxRange");
  precioMin = document.getElementById("precioMin");
  precioMax = document.getElementById("precioMax");
  marcaSelect = document.getElementById("marcaSelect");

  // seguridad básica
  if (!marcaSelect) {
    console.error("No se encontró #marcaSelect");
    return;
  }

  cargarMarcas();

  minRange.addEventListener("input", actualizarPrecios);
  maxRange.addEventListener("input", actualizarPrecios);
  marcaSelect.addEventListener("change", filtrarAutos);

  actualizarPrecios();
}