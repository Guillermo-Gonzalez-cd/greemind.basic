function openModal(id) {
  document.getElementById(id).style.display = 'flex';
}

function closeModal(id) {
  document.getElementById(id).style.display = 'none';
}

// Cerrar al hacer clic en la "X"
document.querySelectorAll('.close').forEach(btn => {
  btn.addEventListener('click', function () {
    const modalId = this.getAttribute('data-close');
    closeModal(modalId);
  });
});

// Cerrar al hacer clic fuera del contenido
window.addEventListener('click', function (e) {
  document.querySelectorAll('.modal').forEach(modal => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
});
