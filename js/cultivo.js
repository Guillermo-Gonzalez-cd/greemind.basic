// ===============================
// VARIABLES Y REFERENCIAS
// ===============================
const cultivoForm = document.getElementById("cultivoForm");
const nombreInput = document.getElementById("nombre");
const variedadInput = document.getElementById("variedad");
const fechaInput = document.getElementById("fecha");
const quintalesInput = document.getElementById("quintales");
const kilometrajeInput = document.getElementById("kilometraje");
const tablaBody = document.getElementById("cultivosTableBody");

let cultivos = JSON.parse(localStorage.getItem("cultivos")) || [];
let editIndex = null;

// ===============================
// FUNCIONES PRINCIPALES
// ===============================

// Mostrar los cultivos guardados
function mostrarCultivos() {
  tablaBody.innerHTML = "";

  if (cultivos.length === 0) {
    tablaBody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align:center; color:#999;">
          No hay cultivos registrados aún.
        </td>
      </tr>
    `;
    return;
  }

  cultivos.forEach((c, i) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${c.nombre}</td>
      <td>${c.variedad}</td>
      <td>${c.fecha}</td>
      <td>${c.quintales} qq</td>
      <td>${c.kilometraje} km</td>
      <td>
        <button class="btn-editar" onclick="editarCultivo(${i})">✏️</button>
        <button class="btn-eliminar" onclick="eliminarCultivo(${i})">🗑️</button>
      </td>
    `;
    tablaBody.appendChild(fila);
  });

  localStorage.setItem("cultivos", JSON.stringify(cultivos));
}

// Agregar o actualizar cultivo
cultivoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = nombreInput.value.trim();
  const variedad = variedadInput.value.trim();
  const fecha = fechaInput.value;
  const quintales = parseFloat(quintalesInput.value);
  const kilometraje = parseFloat(kilometrajeInput.value);

  if (!nombre || !variedad || !fecha || isNaN(quintales) || isNaN(kilometraje)) {
    alert("⚠️ Por favor completa todos los campos correctamente.");
    return;
  }

  const nuevoCultivo = { nombre, variedad, fecha, quintales, kilometraje };

  if (editIndex !== null) {
    cultivos[editIndex] = nuevoCultivo;
    editIndex = null;
    cultivoForm.querySelector("button").textContent = "Agregar cultivo";
  } else {
    cultivos.push(nuevoCultivo);
  }

  cultivoForm.reset();
  mostrarCultivos();
});

// Editar cultivo
function editarCultivo(i) {
  const cultivo = cultivos[i];
  nombreInput.value = cultivo.nombre;
  variedadInput.value = cultivo.variedad;
  fechaInput.value = cultivo.fecha;
  quintalesInput.value = cultivo.quintales;
  kilometrajeInput.value = cultivo.kilometraje;

  editIndex = i;
  cultivoForm.querySelector("button").textContent = "Actualizar cultivo";
}

// Eliminar cultivo
function eliminarCultivo(i) {
  if (confirm("¿Seguro que deseas eliminar este cultivo?")) {
    cultivos.splice(i, 1);
    mostrarCultivos();
  }
}

// ===============================
// INICIALIZACIÓN
// ===============================
mostrarCultivos();
