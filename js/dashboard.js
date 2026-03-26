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
  try {
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

  } catch (error) {
    console.error("Error cargando autos:", error);
    alert("Error cargando autos");
  }
}

cargarAutos();

// ========================
// Editar auto
// ========================
window.editarAuto = async function(id) {
  try {
    const res = await fetch(`${API}/${id}`);
    const auto = await res.json();

    autoEditando = id;

    form.marca.value = auto.marca;
    form.modelo.value = auto.modelo;
    form.anio.value = auto.anio;
    form.precio.value = auto.precio;
    form.kilometros.value = auto.kilometros;
    form.descripcion.value = auto.descripcion;

    // FIX ruta imagen
    form.imagen.value = auto.imagen.replace("/assets/autos/", "");

    document.querySelector("#autoForm button").textContent = "Actualizar Vehículo";

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  } catch (error) {
    console.error("Error editando auto:", error);
  }
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
    imagen: form.imagen.value
  };

  try {

    if (autoEditando) {
      await fetch(`${API}/${autoEditando}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // 🔥 FIX
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
          "Authorization": `Bearer ${token}` // 🔥 FIX
        },
        body: JSON.stringify(data)
      });
    }

    form.reset();
    cargarAutos();

  } catch (error) {
    console.error("Error guardando auto:", error);
    alert("Error al guardar auto");
  }
});

// ========================
// Eliminar auto
// ========================
async function eliminarAuto(id) {
  const confirmar = confirm("¿Eliminar este vehículo?");
  if (!confirmar) return;

  try {
    await fetch(`${API}/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}` // 🔥 FIX
      }
    });

    cargarAutos();

  } catch (error) {
    console.error("Error eliminando auto:", error);
  }
}

// ========================
// Logout
// ========================
function logout() {
  localStorage.removeItem("token");
  window.location.href = "admin.html";
}

window.logout = logout;