const numeroWhatsApp = "3549448090";

export function crearCard(auto) {

    const mensaje = `Hola, estoy interesado en el ${auto.marca} ${auto.modelo} ${auto.anio} con ${auto.kilometros.toLocaleString()} km publicado por $${auto.precio.toLocaleString("es-AR")}. 
¿Sigue disponible? Me gustaría coordinar una visita.`;

    const mensajeCodificado = encodeURIComponent(mensaje);

    const linkWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensajeCodificado}`;

    return `
        <div class="card-auto">
            <div class="card-img">
                <img src="${auto.imagen}" alt="${auto.marca} ${auto.modelo}" loading="lazy">
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
                        class="btn-whatsapp">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12.04 2C6.55 2 2.1 6.45 2.1 11.94c0 1.89.5 3.72 1.46 5.33L2 22l4.9-1.54a9.89 9.89 0 005.14 1.42h.01c5.49 0 9.94-4.45 9.94-9.94S17.53 2 12.04 2zm0 18.14h-.01a8.16 8.16 0 01-4.16-1.14l-.3-.18-2.9.91.95-2.82-.2-.29a8.15 8.15 0 01-1.26-4.37c0-4.51 3.67-8.18 8.18-8.18 4.51 0 8.18 3.67 8.18 8.18 0 4.51-3.67 8.18-8.18 8.18zm4.48-6.11c-.25-.12-1.48-.73-1.71-.82-.23-.08-.4-.12-.57.12-.17.25-.65.82-.8.99-.15.17-.3.19-.55.06-.25-.12-1.05-.39-2-1.25-.74-.66-1.24-1.48-1.39-1.73-.15-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.17-.25.25-.42.08-.17.04-.31-.02-.43-.06-.12-.57-1.38-.78-1.89-.21-.5-.42-.43-.57-.44h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.02 2.57.12.17 1.75 2.67 4.23 3.75.59.25 1.05.4 1.41.51.59.19 1.13.16 1.55.1.47-.07 1.48-.6 1.69-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.17-.48-.29z"/></svg>
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
