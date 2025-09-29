document.addEventListener('DOMContentLoaded', () => {
  // Inicializar el mapa en el div #dashboard-map
  const map = L.map('dashboard-map').setView([12.8654, -85.2072], 7);

  // Cargar capa base de OpenStreetMap
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  // Agregar un marcador de ejemplo
  L.marker([12.8654, -85.2072])
    .addTo(map)
    .bindPopup('Ubicación de ejemplo')
    .openPopup();
});

