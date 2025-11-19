const transporteForm = document.getElementById("transporteForm");
const tableBody = document.getElementById("transporteTableBody");

let transportes = JSON.parse(localStorage.getItem("transportes")) || [];
let editIndex = null;

function mostrarTransportes() {
  tableBody.innerHTML = "";

  if (transportes.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="10" style="text-align:center; color:#999;">No hay registros</td></tr>`;
    return;
  }

  transportes.forEach((t, i) => {
    const costoKm = (t.costo / t.distancia).toFixed(2);
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${t.fecha}</td>
      <td>${t.origen}</td>
      <td>${t.destino}</td>
      <td>${t.distancia}</td>
      <td>${t.carga}</td>
      <td>${t.vehiculo}</td>
      <td>${t.conductor}</td>
      <td>$${t.costo.toFixed(2)}</td>
      <td>$${costoKm}</td>
      <td>
        <button class="btn-editar" onclick="editarTransporte(${i})">✏️</button>
        <button class="btn-eliminar" onclick="eliminarTransporte(${i})">🗑️</button>
      </td>
    `;
    tableBody.appendChild(fila);
  });

  localStorage.setItem("transportes", JSON.stringify(transportes));
}

transporteForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const t = {
    origen: document.getElementById("origen").value.trim(),
    destino: document.getElementById("destino").value.trim(),
    distancia: parseFloat(document.getElementById("distancia").value),
    carga: parseFloat(document.getElementById("carga").value),
    vehiculo: document.getElementById("vehiculo").value.trim(),
    conductor: document.getElementById("conductor").value.trim(),
    costo: parseFloat(document.getElementById("costo").value),
    fecha: document.getElementById("fecha").value,
    observaciones: document.getElementById("observaciones").value.trim(),
  };

  if (editIndex !== null) {
    transportes[editIndex] = t;
    editIndex = null;
    transporteForm.querySelector("button").textContent = "Registrar viaje";
  } else {
    transportes.push(t);
  }

  transporteForm.reset();
  mostrarTransportes();
});

function editarTransporte(i) {
  const t = transportes[i];
  document.getElementById("origen").value = t.origen;
  document.getElementById("destino").value = t.destino;
  document.getElementById("distancia").value = t.distancia;
  document.getElementById("carga").value = t.carga;
  document.getElementById("vehiculo").value = t.vehiculo;
  document.getElementById("conductor").value = t.conductor;
  document.getElementById("costo").value = t.costo;
  document.getElementById("fecha").value = t.fecha;
  document.getElementById("observaciones").value = t.observaciones;

  editIndex = i;
  transporteForm.querySelector("button").textContent = "Actualizar registro";
}

function eliminarTransporte(i) {
  if (confirm("¿Seguro que deseas eliminar este registro?")) {
    transportes.splice(i, 1);
    mostrarTransportes();
  }
}

// Inicializar tabla
mostrarTransportes();
