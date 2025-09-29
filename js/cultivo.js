const cultivoForm = document.getElementById('cultivoForm');
const cultivosTableBody = document.getElementById('cultivosTableBody');
let cultivos = [];

cultivoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const nombre = document.getElementById('nombre').value.trim();
  const variedad = document.getElementById('variedad').value.trim();
  const fecha = document.getElementById('fecha').value;

  if (!nombre || !variedad || !fecha) {
    alert('Completa todos los campos.');
    return;
  }

  cultivos.push({ nombre, variedad, fecha });
  renderCultivos();
  cultivoForm.reset();
});

function renderCultivos() {
  cultivosTableBody.innerHTML = '';
  cultivos.forEach(cultivo => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${cultivo.nombre}</td>
      <td>${cultivo.variedad}</td>
      <td>${cultivo.fecha}</td>
    `;
    cultivosTableBody.appendChild(tr);
  });
}
