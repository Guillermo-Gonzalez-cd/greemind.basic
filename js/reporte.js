document.addEventListener('DOMContentLoaded', () => {
  // Recuperar fincas desde localStorage
  const fincas = JSON.parse(localStorage.getItem("fincas")) || [];

  let costoTotal = 0;
  let ingresos = 0;

  // Calcular costos e ingresos por finca
  fincas.forEach(finca => {
    // Ejemplo de cálculo: puedes ajustar según tu modelo
    const costo = finca.area * 1000;    // costo por hectárea
    const ingreso = finca.area * 1500;  // ingreso por hectárea

    costoTotal += costo;
    ingresos += ingreso;
  });

  const utilidad = ingresos - costoTotal;

  // Mostrar resultados en el HTML
  document.getElementById('costoTotal').textContent = costoTotal.toFixed(2);
  document.getElementById('ingresos').textContent = ingresos.toFixed(2);
  document.getElementById('utilidad').textContent = utilidad.toFixed(2);

  // Opcional: generar tabla de detalle de fincas
  const tablaContainer = document.createElement('div');
  tablaContainer.innerHTML = `
    <h2>Detalle de Fincas</h2>
    <table border="1" cellpadding="8" cellspacing="0">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Área (ha)</th>
          <th>Propietario</th>
          <th>Costo ($)</th>
          <th>Ingreso ($)</th>
        </tr>
      </thead>
      <tbody>
        ${fincas.map(finca => `
          <tr>
            <td>${finca.nombre}</td>
            <td>${finca.area.toFixed(2)}</td>
            <td>${finca.propietario}</td>
            <td>${(finca.area * 1000).toFixed(2)}</td>
            <td>${(finca.area * 1500).toFixed(2)}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
  document.querySelector('.main-content').appendChild(tablaContainer);
});
