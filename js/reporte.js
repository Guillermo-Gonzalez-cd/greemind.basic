const reporteForm = document.getElementById('reporteForm');
const reporteTableBody = document.getElementById('reporteTableBody');

reporteForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Limpiar tabla antes de agregar resultados
  reporteTableBody.innerHTML = '';

  const fechaInicio = document.getElementById('fechaInicio').value;
  const fechaFin = document.getElementById('fechaFin').value;
  const tipoReporte = document.getElementById('tipoReporte').value;

  // Ejemplo de resultados (reemplazar con fetch o API real)
  const resultadosEjemplo = [
    { fecha: '2025-11-01', finca: 'Finca A', parcela: 'Parcela 1', tipo: tipoReporte, valor: '100 kg', observaciones: 'Ninguna' },
    { fecha: '2025-11-02', finca: 'Finca B', parcela: 'Parcela 2', tipo: tipoReporte, valor: '150 kg', observaciones: 'Revisar humedad' },
  ];

  resultadosEjemplo.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.fecha}</td>
      <td>${item.finca}</td>
      <td>${item.parcela}</td>
      <td>${item.tipo}</td>
      <td>${item.valor}</td>
      <td>${item.observaciones}</td>
    `;
    reporteTableBody.appendChild(row);
  });
});

