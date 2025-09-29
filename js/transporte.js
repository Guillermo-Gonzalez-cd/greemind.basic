const transporteForm = document.getElementById('transporteForm');
const transporteTableBody = document.getElementById('transporteTableBody');
let transportes = [];

transporteForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const origen = document.getElementById('origen').value.trim();
  const destino = document.getElementById('destino').value.trim();
  const costo = parseFloat(document.getElementById('costo').value);

  if (!origen || !destino || isNaN(costo)) {
    alert('Completa todos los campos.');
    return;
  }

  transportes.push({ origen, destino, costo });
  renderTransportes();
  transporteForm.reset();
});

function renderTransportes() {
  transporteTableBody.innerHTML = '';
  transportes.forEach(t => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${t.origen}</td>
      <td>${t.destino}</td>
      <td>$${t.costo.toFixed(2)}</td>
    `;
    transporteTableBody.appendChild(tr);
  });
}

