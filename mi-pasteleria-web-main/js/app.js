document.addEventListener("DOMContentLoaded", () => {
  const filtro = document.getElementById("filtroCategoria");
  const productos = document.querySelectorAll(".producto");
  const cartCount = document.getElementById("cart-count");

  
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  cartCount.innerText = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  
  filtro.addEventListener("change", () => {
    const categoria = filtro.value;
    productos.forEach(prod => {
      const cat = prod.querySelector(".categoria").innerText;
      prod.style.display = categoria === "" || cat === categoria ? "block" : "none";
    });
  });

  
  productos.forEach((prod) => {
    const btn = prod.querySelector(".add-to-cart");
    btn.addEventListener("click", () => {
      const nombre = prod.querySelector(".nombre").innerText;
      const precioTexto = prod.querySelector(".precio").innerText;
      const precio = Number(precioTexto.replace(/[^\d]/g, ""));
      const imagen = prod.querySelector("img").src;

      
      const indexExistente = carrito.findIndex(item => item.nombre === nombre);

      if (indexExistente !== -1) {
        
        carrito[indexExistente].cantidad += 1;
      } else {
       
        carrito.push({ nombre, precio, imagen, cantidad: 1 });
      }

      
      localStorage.setItem("carrito", JSON.stringify(carrito));

      
      cartCount.innerText = carrito.reduce((acc, item) => acc + item.cantidad, 0);

      alert(`${nombre} añadido al carrito.`);
    });
  });
});
