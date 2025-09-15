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

    
    if (password !== confirmar) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    
    if (usuarios.some(u => u.correo === correo)) {
      alert("Este correo ya está registrado.");
      return;
    }

    
    let descuento = 0;
    if (edad >= 50) {
      descuento = 50; 
    } else if (codigoDescuento.toUpperCase() === "FELICES50") {
      descuento = 10; 
    }

    
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

    
    window.location.href = "index.html";
  });
});