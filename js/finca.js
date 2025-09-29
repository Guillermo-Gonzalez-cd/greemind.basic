const fincaForm = document.getElementById('fincaForm');
const fincasTableBody = document.getElementById('fincasTableBody');
let fincas = [];

fincaForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value.trim();
  const area = parseFloat(document.getElementById('area').value);
  const cultivo = document.getElementById('cultivo').value.trim();

  if (!nombre || !cultivo || isNaN(area) || area <= 0) {
    alert('Por favor, completa todos los campos correctamente.');
    return;
  }

  const nuevaFinca = { nombre, area, cultivo };
  fincas.push(nuevaFinca);
  renderFincas();
  fincaForm.reset();
});

function renderFincas() {
  fincasTableBody.innerHTML = '';
  fincas.forEach((finca, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${finca.nombre}</td>
      <td>${finca.area.toFixed(2)}</td>
      <td>${finca.cultivo}</td>
    `;
    fincasTableBody.appendChild(tr);
  });
}
