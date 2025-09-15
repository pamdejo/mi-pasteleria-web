document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form-inis");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const correo = document.getElementById("correo").value.trim();
    const password = document.getElementById("password").value;

    
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    
    const usuario = usuarios.find(u => u.correo === correo && u.password === password);

    if (usuario) {
     
      localStorage.setItem("usuarioActual", JSON.stringify(usuario));

      alert(`¡Bienvenido ${usuario.nombre}!`);

      
      window.location.href = "index.html";
    } else {
      alert("Correo o contraseña incorrectos.");
    }
  });
});