// Datos simulados (estos vendrían del backend en una app real)
const costos = 1200.50;
const ingresos = 2500.00;
const utilidad = ingresos - costos;

document.getElementById('costoTotal').textContent = costos.toFixed(2);
document.getElementById('ingresos').textContent = ingresos.toFixed(2);
document.getElementById('utilidad').textContent = utilidad.toFixed(2);
