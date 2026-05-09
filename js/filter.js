import { renderAutos } from "./cards.js";

let autosGlobal = [];

let minRange, maxRange, precioMin, precioMax, marcaSelect, anioSelect, kmSelect;

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

function cargarMarcas() {
    const marcasUnicas = [...new Set(autosGlobal.map(a => a.marca))];
    marcasUnicas.sort();

    marcaSelect.innerHTML = `<option value="todas">Todas</option>`;

    marcasUnicas.forEach(marca => {
        const option = document.createElement("option");
        option.value = marca;
        option.textContent = marca.charAt(0).toUpperCase() + marca.slice(1).toLowerCase();
        marcaSelect.appendChild(option);
    });
}

function cargarAnios() {
    const aniosUnicos = [...new Set(autosGlobal.map(a => a.anio))];
    aniosUnicos.sort((a, b) => b - a);

    anioSelect.innerHTML = `<option value="todos">Todos</option>`;

    aniosUnicos.forEach(anio => {
        const option = document.createElement("option");
        option.value = anio;
        option.textContent = anio;
        anioSelect.appendChild(option);
    });
}

function filtrarAutos() {
    const minPrecio = parseInt(minRange.value);
    const maxPrecio = parseInt(maxRange.value);
    const marca = marcaSelect.value;
    const anio = anioSelect ? anioSelect.value : "todos";
    const km = kmSelect ? kmSelect.value : "todos";

    const autosFiltrados = autosGlobal.filter(auto => {
        const cumplePrecio =
            auto.precio >= minPrecio && auto.precio <= maxPrecio;

        const cumpleMarca =
            marca === "todas" || auto.marca === marca;

        const cumpleAnio =
            anio === "todos" || auto.anio.toString() === anio;

        const cumpleKm =
            km === "todos" || auto.kilometros <= parseInt(km);

        return cumplePrecio && cumpleMarca && cumpleAnio && cumpleKm;
    });

    renderAutos(autosFiltrados);
}

export function initFiltros(autos) {
    autosGlobal = autos;

    minRange = document.getElementById("minRange");
    maxRange = document.getElementById("maxRange");
    precioMin = document.getElementById("precioMin");
    precioMax = document.getElementById("precioMax");
    marcaSelect = document.getElementById("marcaSelect");
    anioSelect = document.getElementById("anioSelect");
    kmSelect = document.getElementById("kmSelect");

    if (!marcaSelect) {
        console.error("No se encontró #marcaSelect");
        return;
    }

    cargarMarcas();
    if (anioSelect) cargarAnios();

    minRange.addEventListener("input", actualizarPrecios);
    maxRange.addEventListener("input", actualizarPrecios);
    marcaSelect.addEventListener("change", filtrarAutos);
    if (anioSelect) anioSelect.addEventListener("change", filtrarAutos);
    if (kmSelect) kmSelect.addEventListener("change", filtrarAutos);

    actualizarPrecios();
}
