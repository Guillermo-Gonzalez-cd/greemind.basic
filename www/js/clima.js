const climaForm = document.getElementById('climaForm');
const climaTableBody = document.getElementById('climaTableBody');

let climaData = []; // Aquí se puede reemplazar por DB o API

climaForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const registro = {
    finca: document.getElementById('finca').value,
    fecha: document.getElementById('fecha').value,
    temperatura: parseFloat(document.getElementById('temperatura').value),
    lluvia: parseFloat(document.getElementById('lluvia').value),
    humedad: parseFloat(document.getElementById('humedad').value),
    viento: parseFloat(document.getElementById('viento').value) || 0,
    observaciones: document.getElementById('observaciones').value
  };

  climaData.push(registro);
  mostrarClima();
  climaForm.reset();
});

function mostrarClima() {
  climaTableBody.innerHTML = '';
  climaData.forEach((c, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${c.fecha}</td>
      <td>${c.finca}</td>
      <td>${c.temperatura}</td>
      <td>${c.lluvia}</td>
      <td>${c.humedad}</td>
      <td>${c.viento}</td>
      <td>${c.observaciones}</td>
      <td>
        <button class="action-btn edit" onclick="editar(${index})">✏️</button>
        <button class="action-btn delete" onclick="eliminar(${index})">🗑️</button>
      </td>
    `;
    climaTableBody.appendChild(tr);
  });
}

function editar(index) {
  const c = climaData[index];
  document.getElementById('finca').value = c.finca;
  document.getElementById('fecha').value = c.fecha;
  document.getElementById('temperatura').value = c.temperatura;
  document.getElementById('lluvia').value = c.lluvia;
  document.getElementById('humedad').value = c.humedad;
  document.getElementById('viento').value = c.viento;
  document.getElementById('observaciones').value = c.observaciones;
  climaData.splice(index, 1);
  mostrarClima();
}

function eliminar(index) {
  climaData.splice(index, 1);
  mostrarClima();
}
