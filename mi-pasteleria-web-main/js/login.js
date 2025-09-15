document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form-inis");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const correo = document.getElementById("correo").value.trim();
    const password = document.getElementById("password").value;

    // Recuperar usuarios registrados
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Buscar usuario que coincida
    const usuario = usuarios.find(u => u.correo === correo && u.password === password);

    if (usuario) {
      // Guardar usuario logueado
      localStorage.setItem("usuarioActual", JSON.stringify(usuario));

      alert(`¡Bienvenido ${usuario.nombre}!`);

      // Redirigir a la página principal (Home)
      window.location.href = "index.html";
    } else {
      alert("Correo o contraseña incorrectos.");
    }
  });
});