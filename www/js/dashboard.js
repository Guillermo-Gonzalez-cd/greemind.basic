let map;
let markers = [];
let fincas = [];

// Espera a que el DOM cargue
document.addEventListener('DOMContentLoaded', () => {
  initMap();
  cargarFincas();

  // Solo si existe el formulario de fincas
  const form = document.getElementById('form-finca');
  if (form) {
    form.addEventListener('submit', guardarFinca);
  }
});

// Inicializar el mapa centrado en Nicaragua
function initMap() {
  const nicaraguaBounds = L.latLngBounds([10.7, -87.7], [15.0, -82.9]);

  map = L.map('map', {
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

    // Si existe el formulario, actualiza los campos lat/lng
    const latInput = document.getElementById('lat');
    const lngInput = document.getElementById('lng');
    if (latInput && lngInput) {
      latInput.value = e.latlng.lat.toFixed(6);
      lngInput.value = e.latlng.lng.toFixed(6);
    }
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

  if (!finca.nombre || !finca.propietario || !finca.direccion || isNaN(finca.area) || isNaN(finca.lat) || isNaN(finca.lng)) {
    alert("Por favor completa todos los campos.");
    return;
  }

  const editIndex = document.getElementById('editIndex').value;

  if (editIndex === "") {
    fincas.push(finca); // Crear nueva finca
  } else {
    fincas[editIndex] = finca; // Actualizar finca existente
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

// Mostrar fincas en la tabla y en el mapa
function mostrarFincas() {
  const tbody = document.querySelector('#tabla-fincas tbody');
  if (tbody) tbody.innerHTML = "";

  // Limpiar markers antiguos
  markers.forEach(m => map.removeLayer(m));
  markers = [];

  let totalHectareas = 0;

  fincas.forEach((finca, index) => {
    totalHectareas += finca.area;

    // Tabla
    if (tbody) {
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
    }

    // Marker en el mapa
    const marker = L.marker([finca.lat, finca.lng])
      .addTo(map)
      .bindPopup(`<strong>${finca.nombre}</strong><br>${finca.propietario}<br>${finca.direccion}`);
    markers.push(marker);
  });

  // Actualizar cards
  const totalFincasCard = document.getElementById('totalFincas');
  const totalHectareasCard = document.getElementById('totalHectareas');
  const produccionMensualCard = document.getElementById('produccionMensual');

  if (totalFincasCard) totalFincasCard.textContent = fincas.length;
  if (totalHectareasCard) totalHectareasCard.textContent = totalHectareas.toFixed(2) + ' ha';
  if (produccionMensualCard) {
    // Aquí puedes poner tu lógica real de producción mensual
    const produccionMensual = totalHectareas * 100; // ejemplo: 100kg por hectárea
    produccionMensualCard.textContent = produccionMensual.toFixed(0) + ' kg';
  }
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
  const form = document.getElementById('form-finca');
  if (form) form.reset();
  const editIndex = document.getElementById('editIndex');
  if (editIndex) editIndex.value = "";
}

