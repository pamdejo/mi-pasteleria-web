document.addEventListener("DOMContentLoaded", () => {
  const filtro = document.getElementById("filtroCategoria");
  const productos = document.querySelectorAll(".producto");

  filtro.addEventListener("change", () => {
    const categoria = filtro.value;

    productos.forEach(prod => {
      const cat = prod.querySelector(".categoria").innerText;

      if (categoria === "" || cat === categoria) {
        prod.style.display = "block";  // se muestra
      } else {
        prod.style.display = "none";   // se oculta
      }
    });
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const botones = document.querySelectorAll(".add-to-cart");
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  botones.forEach((btn) => {
    btn.addEventListener("click", () => {
      const productoElem = btn.closest(".producto");
      const nombre = productoElem.querySelector(".nombre").innerText;
      const precioTexto = productoElem.querySelector(".precio").innerText;

      // Convertir el precio "$45.000" → 45000
      const precio = Number(precioTexto.replace(/[^\d]/g, ""));

      const producto = { nombre, precio };

      carrito.push(producto);
      localStorage.setItem("carrito", JSON.stringify(carrito));

      // Actualizar contador en el header
      document.getElementById("cart-count").innerText = carrito.length;

      alert(`${nombre} añadido al carrito.`);
    });
  });

  // Refrescar contador al cargar la página
  document.getElementById("cart-count").innerText = carrito.length;
});
