document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const nombreInput = document.getElementById("nombre");
  const correoInput = document.getElementById("correo");
  const comentarioInput = document.getElementById("comentario");

  const nombreError = document.getElementById("nombreError");
  const correoError = document.getElementById("correoError");
  const comentarioError = document.getElementById("comentarioError");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let isValid = true;

    
    nombreError.textContent = "";
    correoError.textContent = "";
    comentarioError.textContent = "";

    
    const nombreValue = nombreInput.value.trim();
    if (nombreValue === "") {
      nombreError.textContent = "El nombre es obligatorio.";
      isValid = false;
    } else if (nombreValue.length > 100) {
      nombreError.textContent = "El nombre no puede superar los 100 caracteres.";
      isValid = false;
    }

    
    const correoValue = correoInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (correoValue === "") {
      correoError.textContent = "El correo es obligatorio.";
      isValid = false;
    } else if (correoValue.length > 100) {
      correoError.textContent = "El correo no puede superar los 100 caracteres.";
      isValid = false;
    } else if (!emailRegex.test(correoValue)) {
      correoError.textContent = "Ingresa un correo electrónico válido.";
      isValid = false;
    }

    
    const comentarioValue = comentarioInput.value.trim();
    if (comentarioValue === "") {
      comentarioError.textContent = "El comentario es obligatorio.";
      isValid = false;
    } else if (comentarioValue.length > 500) {
      comentarioError.textContent = "El comentario no puede superar los 500 caracteres.";
      isValid = false;
    }

    
    if (isValid) {
      console.log("Formulario de contacto enviado");
      console.log("Nombre:", nombreValue);
      console.log("Correo:", correoValue);
      console.log("Comentario:", comentarioValue);

      form.reset(); 
    }
  });
});
