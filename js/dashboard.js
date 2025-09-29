let map;
let markers = [];

// Esperamos que el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
  // Inicializamos el mapa centrado en Nicaragua
  map = L.map('dashboard-map').setView([12.8654, -85.2072], 7);

  // Agregamos capa base OSM
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map);

  // Evento click en el mapa para obtener lat/lng y rellenar inputs
  map.on('click', e => {
    const { lat, lng } = e.latlng;
    document.getElementById('lat').value = lat.toFixed(6);
    document.getElementById('lng').value = lng.toFixed(6);
  });

  // Evento para agregar finca al enviar el formulario
  document.getElementById('form-finca').addEventListener('submit', e => {
    e.preventDefault();
    agregarFinca();
  });
});

// Función para agregar finca
function agregarFinca() {
  const nombre = document.getElementById('nombre').value.trim();
  const propietario = document.getElementById('propietario').value.trim();
  const direccion = document.getElementById('direccion').value.trim();
  const area = parseFloat(document.getElementById('area').value);
  const lat = parseFloat(document.getElementById('lat').value);
  const lng = parseFloat(document.getElementById('lng').value);

  if (!nombre || !propietario || !direccion || isNaN(area) || isNaN(lat) || isNaN(lng)) {
    alert('Por favor completa todos los campos con valores válidos.');
    return;
  }

  // Agregar marcador en el mapa
  const marker = L.marker([lat, lng]).addTo(map)
    .bindPopup(`<strong>${nombre}</strong><br>Propietario: ${propietario}<br>Área: ${area} ha<br>Dirección: ${direccion}`);

  markers.push(marker);

  // Agregar fila en la tabla
  const tbody = document.querySelector('#tabla-fincas tbody');
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>${nombre}</td>
    <td>${propietario}</td>
    <td>${direccion}</td>
    <td>${area.toFixed(2)}</td>
    <td>${lat.toFixed(6)}</td>
    <td>${lng.toFixed(6)}</td>
  `;
  tbody.appendChild(tr);

  // Limpiar formulario
  document.getElementById('form-finca').reset();
  // Limpiar lat/lng que son readonly, para evitar confusión
  document.getElementById('lat').value = '';
  document.getElementById('lng').value = '';
}
