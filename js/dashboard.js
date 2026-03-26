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

    // quitar /assets/autos/
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
    marca: form.marca.value.trim(),
    modelo: form.modelo.value.trim(),
    anio: Number(form.anio.value),
    precio: Number(form.precio.value),
    kilometros: Number(form.kilometros.value),
    descripcion: form.descripcion.value.trim(),
    imagen: form.imagen.value.trim()
  };

  // 🔥 VALIDACIÓN CLAVE
  if (!data.imagen) {
    alert("Ingresá el nombre de la imagen (ej: ford-focus.png)");
    return;
  }

  console.log("📤 DATOS ENVIADOS:", data);

  try {

    const res = await fetch(
      autoEditando ? `${API}/${autoEditando}` : API,
      {
        method: autoEditando ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
      }
    );

    const result = await res.json();

    console.log("📥 RESPUESTA BACKEND:", result);

    if (!res.ok) {
      alert(result.message || "Error al guardar el auto");
      return;
    }

    form.reset();
    autoEditando = null;
    document.querySelector("#autoForm button").textContent = "Guardar Vehículo";

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
        "Authorization": `Bearer ${token}`
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