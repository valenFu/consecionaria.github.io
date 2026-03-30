import { renderAutos } from "./cards.js";

let autosGlobal = []; // 🔥 acá guardamos los autos

const minRange = document.getElementById("minRange");
const maxRange = document.getElementById("maxRange");
const precioMin = document.getElementById("precioMin");
const precioMax = document.getElementById("precioMax");

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

function filtrarAutos() {
  const minPrecio = parseInt(minRange.value);
  const maxPrecio = parseInt(maxRange.value);

  const autosFiltrados = autosGlobal.filter(auto => {
    return auto.precio >= minPrecio && auto.precio <= maxPrecio;
  });

  renderAutos(autosFiltrados);
}

export function initFiltros(autos) {
  autosGlobal = autos; // 🔥 CLAVE

  minRange.addEventListener("input", actualizarPrecios);
  maxRange.addEventListener("input", actualizarPrecios);

  actualizarPrecios(); // inicializa
}