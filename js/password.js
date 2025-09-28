const togglePassword = document.getElementById('togglePassword');
const password = document.getElementById('password');

togglePassword.addEventListener('click', function () {
  // Cambiar tipo input
  const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
  password.setAttribute('type', type);
  
  // Cambiar icono
  this.classList.toggle('bx-show');
  this.classList.toggle('bx-low-vision');
});
