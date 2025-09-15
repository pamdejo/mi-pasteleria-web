document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form-registro");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const edad = parseInt(document.getElementById("edad").value);
    const correo = document.getElementById("correo").value.trim();
    const password = document.getElementById("password").value;
    const confirmar = document.getElementById("confirmar").value;
    const codigoDescuento = document.getElementById("descuento").value.trim();

    // Validar contraseñas
    if (password !== confirmar) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    // Recuperar usuarios existentes
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Verificar si el email ya está registrado
    if (usuarios.some(u => u.correo === correo)) {
      alert("Este correo ya está registrado.");
      return;
    }

    // Determinar descuento
    let descuento = 0;
    if (edad >= 50) {
      descuento = 50; // 50% para mayores de 50 años
    } else if (codigoDescuento.toUpperCase() === "FELICES50") {
      descuento = 10; // 10% si ingresan el código
    }

    // Crear usuario
    const usuario = {
      nombre,
      edad,
      correo,
      password,
      descuento
    };

    usuarios.push(usuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert(`Registro exitoso! Tu descuento es del ${descuento}%`);
    form.reset();

    // Redirigir a la página principal
    window.location.href = "index.html";
  });
});