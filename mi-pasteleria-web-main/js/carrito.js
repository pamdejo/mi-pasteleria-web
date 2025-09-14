document.addEventListener("DOMContentLoaded", () => {
  const lista = document.getElementById("carrito-lista");
  const totalElem = document.getElementById("total");
  const vaciarBtn = document.getElementById("vaciar");

  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  function renderCarrito() {
    lista.innerHTML = "";
    let total = 0;

    carrito.forEach((prod, index) => {
      const item = document.createElement("div");
      item.classList.add("item-carrito");

      item.innerHTML = `
        <p><strong>${prod.nombre}</strong> - $${prod.precio.toLocaleString("es-CL")}</p>
        <button class="eliminar" data-index="${index}">Eliminar</button>
      `;
      lista.appendChild(item);

      // Sumar al total
      total += prod.precio;
    });

    // Mostrar total
    totalElem.innerText = "Total: $" + total.toLocaleString("es-CL");

    // Botones eliminar
    document.querySelectorAll(".eliminar").forEach(btn => {
      btn.addEventListener("click", e => {
        const index = e.target.dataset.index;
        carrito.splice(index, 1);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        renderCarrito();
      });
    });
  }

  // Botón vaciar carrito
  vaciarBtn.addEventListener("click", () => {
    carrito = [];
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderCarrito();
  });

  // Render inicial
  renderCarrito();
});