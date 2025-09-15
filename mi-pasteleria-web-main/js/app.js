document.addEventListener("DOMContentLoaded", () => {
  const filtro = document.getElementById("filtroCategoria");
  const productos = document.querySelectorAll(".producto");
  const cartCount = document.getElementById("cart-count");

  // Recuperar carrito existente
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  cartCount.innerText = carrito.length;

  // Filtro por categoría
  filtro.addEventListener("change", () => {
    const categoria = filtro.value;
    productos.forEach(prod => {
      const cat = prod.querySelector(".categoria").innerText;
      prod.style.display = categoria === "" || cat === categoria ? "block" : "none";
    });
  });

  // Agregar productos al carrito
  productos.forEach((prod) => {
    const btn = prod.querySelector(".add-to-cart");
    btn.addEventListener("click", () => {
      const nombre = prod.querySelector(".nombre").innerText;
      const precioTexto = prod.querySelector(".precio").innerText;
      const precio = Number(precioTexto.replace(/[^\d]/g, "")); // "$45.000" → 45000
      const imagen = prod.querySelector("img").src;

      const producto = { nombre, precio, imagen };

      carrito.push(producto);
      localStorage.setItem("carrito", JSON.stringify(carrito));

      cartCount.innerText = carrito.length;
      alert(`${nombre} añadido al carrito.`);
    });
  });
});
