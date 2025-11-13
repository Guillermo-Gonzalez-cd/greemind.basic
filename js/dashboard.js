let map;
let markers = [];
let fincas = [];

// Espera a que el DOM cargue
document.addEventListener('DOMContentLoaded', () => {
  initMap();
  cargarFincas();
  document.getElementById('form-finca').addEventListener('submit', guardarFinca);
});

// Inicializar el mapa centrado en Nicaragua
function initMap() {
  const nicaraguaBounds = L.latLngBounds([10.7, -87.7], [15.0, -82.9]);

  map = L.map('dashboard-map', {
    center: [12.8654, -85.2072],
    zoom: 7,
    minZoom: 6,
    maxZoom: 15,
    maxBounds: nicaraguaBounds,
    maxBoundsViscosity: 1.0
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  map.on('click', e => {
    if (!nicaraguaBounds.contains(e.latlng)) {
      alert("Solo puedes marcar dentro de Nicaragua");
      return;
    }
    document.getElementById('lat').value = e.latlng.lat.toFixed(6);
    document.getElementById('lng').value = e.latlng.lng.toFixed(6);
  });
}

// Guardar o actualizar finca
function guardarFinca(e) {
  e.preventDefault();

  const finca = {
    nombre: document.getElementById('nombre').value.trim(),
    propietario: document.getElementById('propietario').value.trim(),
    direccion: document.getElementById('direccion').value.trim(),
    area: parseFloat(document.getElementById('area').value),
    lat: parseFloat(document.getElementById('lat').value),
    lng: parseFloat(document.getElementById('lng').value)
  };

  if (!finca.nombre || !finca.propietario || !finca.direccion || isNaN(finca.area) || isNaN(finca.lat)) {
    alert("Por favor completa todos los campos.");
    return;
  }

  const editIndex = document.getElementById('editIndex').value;

  if (editIndex === "") {
    fincas.push(finca); // Crear
  } else {
    fincas[editIndex] = finca; // Actualizar
    document.getElementById('editIndex').value = "";
  }

  localStorage.setItem('fincas', JSON.stringify(fincas));
  limpiarFormulario();
  mostrarFincas();
}

// Cargar fincas desde localStorage
function cargarFincas() {
  const guardadas = JSON.parse(localStorage.getItem('fincas')) || [];
  fincas = guardadas;
  mostrarFincas();
}

// Mostrar fincas en la tabla
function mostrarFincas() {
  const tbody = document.querySelector('#tabla-fincas tbody');
  tbody.innerHTML = "";
  markers.forEach(m => map.removeLayer(m));
  markers = [];

  fincas.forEach((finca, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${finca.nombre}</td>
      <td>${finca.propietario}</td>
      <td>${finca.direccion}</td>
      <td>${finca.area.toFixed(2)}</td>
      <td>${finca.lat.toFixed(6)}</td>
      <td>${finca.lng.toFixed(6)}</td>
      <td>
        <button onclick="editarFinca(${index})">✏️</button>
        <button onclick="eliminarFinca(${index})">🗑️</button>
      </td>
    `;
    tbody.appendChild(tr);

    const marker = L.marker([finca.lat, finca.lng])
      .addTo(map)
      .bindPopup(`<strong>${finca.nombre}</strong><br>${finca.propietario}<br>${finca.direccion}`);
    markers.push(marker);
  });
}

// Editar finca
function editarFinca(index) {
  const f = fincas[index];
  document.getElementById('editIndex').value = index;
  document.getElementById('nombre').value = f.nombre;
  document.getElementById('propietario').value = f.propietario;
  document.getElementById('direccion').value = f.direccion;
  document.getElementById('area').value = f.area;
  document.getElementById('lat').value = f.lat;
  document.getElementById('lng').value = f.lng;
}

// Eliminar finca
function eliminarFinca(index) {
  if (confirm("¿Seguro que deseas eliminar esta finca?")) {
    fincas.splice(index, 1);
    localStorage.setItem('fincas', JSON.stringify(fincas));
    mostrarFincas();
  }
}

// Limpiar formulario
function limpiarFormulario() {
  document.getElementById('form-finca').reset();
  document.getElementById('editIndex').value = "";
}
