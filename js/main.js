import { renderAutos } from "./cards.js";
import { initFiltros } from "./filter.js";

const API = "https://consecionaria-github-io-1.onrender.com/api/autos";

document.addEventListener("DOMContentLoaded", async () => {

  try {

    const res = await fetch(API);
    const autos = await res.json();

    renderAutos(autos);
    initFiltros(autos);

  } catch (error) {

    console.error("Error cargando autos:", error);

  }

});
