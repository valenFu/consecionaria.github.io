const API = "https://consecionaria-github-io-1.onrender.com/api/autos";
const token = localStorage.getItem("token");

let autoEditando = null;

if (!token) {
  window.location.href = "admin.html";
}

const lista = document.getElementById("listaAutos");
const form = document.getElementById("autoForm");

// ========================
// Cargar autos
// ========================
async function cargarAutos() {
  const res = await fetch(API);
  const autos = await res.json();

  lista.innerHTML = "";

  if (autos.length === 0) {
    lista.innerHTML = `
      <p style="text-align:center; opacity:0.6;">
        No hay vehículos publicados todavía.
      </p>
    `;
    return;
  }

  autos.forEach(auto => {
    lista.innerHTML += `
      <div class="card-auto">

        <div class="card-img">
          ${
            auto.imagen
              ? `<img src="${auto.imagen}">`
              : `<img src="/assets/placeholder.jpg">`
          }
          <span class="badge">ADMIN</span>
        </div>

        <div class="card-content">

          <h3>${auto.marca} ${auto.modelo}</h3>

          <div class="card-info">
            <span>${auto.anio}</span>
            <span>${auto.kilometros} km</span>
          </div>

          <div class="card-footer">
            <span class="precio">$${auto.precio}</span>
          </div>

          <div class="admin-buttons">
            <button class="btn-edit" onclick="editarAuto('${auto._id}')">
              Editar
            </button>

            <button class="btn-delete" onclick="eliminarAuto('${auto._id}')">
              Eliminar
            </button>
          </div>

        </div>
      </div>
    `;
  });
}

cargarAutos();

// ========================
// Editar auto
// ========================
window.editarAuto = async function(id) {
  const res = await fetch(`${API}/${id}`);
  const auto = await res.json();

  autoEditando = id;

  form.marca.value = auto.marca;
  form.modelo.value = auto.modelo;
  form.anio.value = auto.anio;
  form.precio.value = auto.precio;
  form.kilometros.value = auto.kilometros;
  form.descripcion.value = auto.descripcion;

  // 🔥 IMPORTANTE: cargar imagen también
  form.imagen.value = auto.imagen.replace("/assets/", "");

  document.querySelector("#autoForm button").textContent = "Actualizar Vehículo";

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
};

// ========================
// Crear / Editar auto
// ========================
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    marca: form.marca.value,
    modelo: form.modelo.value,
    anio: form.anio.value,
    precio: form.precio.value,
    kilometros: form.kilometros.value,
    descripcion: form.descripcion.value,
    imagen: form.imagen.value // 🔥 clave
  };

  if (autoEditando) {
    await fetch(`${API}/${autoEditando}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      body: JSON.stringify(data)
    });

    autoEditando = null;
    document.querySelector("#autoForm button").textContent = "Guardar Vehículo";

  } else {
    await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      body: JSON.stringify(data)
    });
  }

  form.reset();
  cargarAutos();
});

// ========================
// Eliminar auto
// ========================
async function eliminarAuto(id) {
  const confirmar = confirm("¿Eliminar este vehículo?");
  if (!confirmar) return;

  await fetch(`${API}/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": token
    }
  });

  cargarAutos();
}

// ========================
// Logout
// ========================
function logout() {
  localStorage.removeItem("token");
  window.location.href = "admin.html";
}

window.logout = logout;