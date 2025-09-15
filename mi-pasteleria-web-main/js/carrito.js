document.addEventListener("DOMContentLoaded", () => {
  const lista = document.getElementById("carrito-lista");
  const totalElem = document.getElementById("total");
  const vaciarBtn = document.getElementById("vaciar");

  // Recuperar carrito y usuario actual
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  let usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"));
  let descuento = usuarioActual ? usuarioActual.descuento : 0; // <-- aquí está el descuento

  function renderCarrito() {
    lista.innerHTML = "";
    let total = 0;

    // Agrupar productos por nombre e imagen
    let agrupado = {};
    carrito.forEach(prod => {
      const key = prod.nombre + "|" + prod.imagen;
      if (agrupado[key]) {
        agrupado[key].cantidad += 1;
      } else {
        agrupado[key] = { ...prod, cantidad: 1 };
      }
    });

    Object.values(agrupado).forEach((prod, index) => {
      const item = document.createElement("div");
      item.classList.add("item-carrito");

      item.innerHTML = `
        <img src="${prod.imagen}" alt="${prod.nombre}" class="img-carrito">
        <p><strong>${prod.nombre}</strong> - $${prod.precio.toLocaleString("es-CL")} x ${prod.cantidad}</p>
        <button class="eliminar" data-index="${index}">Eliminar</button>
      `;
      lista.appendChild(item);

      total += prod.precio * prod.cantidad;
    });

    // Aplicar descuento
    let totalConDescuento = total * (1 - descuento / 100);

    totalElem.innerText = `Total: $${totalConDescuento.toLocaleString("es-CL")}` +
                          (descuento > 0 ? ` (Descuento aplicado: ${descuento}%)` : "");

    // Botones eliminar
    document.querySelectorAll(".eliminar").forEach((btn, i) => {
      btn.addEventListener("click", () => {
        const prodEliminar = Object.values(agrupado)[i];
        carrito = carrito.filter(p => !(p.nombre === prodEliminar.nombre && p.imagen === prodEliminar.imagen));
        localStorage.setItem("carrito", JSON.stringify(carrito));
        renderCarrito();
      });
    });

    // Actualizar contador en el header
    document.getElementById("cart-count").innerText = carrito.length;
  }

  vaciarBtn.addEventListener("click", () => {
    carrito = [];
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderCarrito();
  });

  renderCarrito();
});