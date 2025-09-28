document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      if (email && password) {
        // Aquí puedes agregar lógica para validar credenciales con un backend
        // Por ahora, redirige directamente al dashboard
        window.location.href = "dashboard.html";
      } else {
        alert("Por favor, completa todos los campos.");
      }
    });
  }
});
