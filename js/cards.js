const numeroWhatsApp = "543549507205"; // ← cambia por tu número real

export function crearCard(auto) {

  const mensaje = `Hola, estoy interesado en el ${auto.marca} ${auto.modelo} ${auto.anio} con ${auto.kilometros.toLocaleString()} km publicado por $${auto.precio.toLocaleString("es-AR")}. 
    ¿Sigue disponible? Me gustaría coordinar una visita.`;

  const mensajeCodificado = encodeURIComponent(mensaje);

  const linkWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensajeCodificado}`;

  return `
    <div class="card-auto">
      <div class="card-img">
        <img src="http://localhost:5000${auto.imagen}" alt="${auto.marca} ${auto.modelo}" loading="lazy">
        ${auto.destacado ? '<span class="badge">Destacado</span>' : ''}
      </div>

      <div class="card-content">
        <h3>${auto.marca} ${auto.modelo}</h3>

        <div class="card-info">
          <span>${auto.anio}</span>
          <span>${auto.kilometros.toLocaleString()} km</span>
        </div>

        <div class="card-footer">
          <p class="precio">$${auto.precio.toLocaleString("es-AR")}</p>

          <a href="${linkWhatsApp}"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-card btn-whatsapp">
            Consultar disponibilidad
          </a>
        </div>
      </div>
    </div>
  `;
}
  
export function renderAutos(lista) {
  const container = document.getElementById("autosContainer");
  container.innerHTML = "";

  const html = lista.map(auto => crearCard(auto)).join("");
  container.innerHTML = html;
}