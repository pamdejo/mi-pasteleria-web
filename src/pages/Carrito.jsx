import React, { useEffect, useState } from "react";
import "../assets/css/carrito.css";

export default function Carrito() {
  const [carrito, setCarrito] = useState([]);
  const [usuarioActual, setUsuarioActual] = useState(null);
  const [total, setTotal] = useState(0);
  const [descuento, setDescuento] = useState(0);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("usuarioActual"));
    if (!user) {
      alert("Debes iniciar sesión o registrarte para acceder al carrito.");
      window.location.href = "/iniciosesion";
      return;
    }      
    setUsuarioActual(user);
    setDescuento(user.descuento || 0);

    const storedCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
    setCarrito(storedCarrito);
  }, []);

  useEffect(() => {
    const totalCalc = carrito.reduce(
      (sum, p) => sum + p.precio * (p.cantidad || 1),
      0
    );
    setTotal(totalCalc);
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const eliminarProducto = (index) => {
    const nuevo = carrito.filter((_, i) => i !== index);
    setCarrito(nuevo);
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const finalizarCompra = () => {
    if (carrito.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }

    const totalFinal = total * (1 - descuento / 100);

    const pedido = {
      usuario: usuarioActual.nombre,
      correo: usuarioActual.correo,
      productos: carrito,
      total: totalFinal,
      fecha: new Date().toLocaleString("es-CL"),
    };

    const pedidosGuardados = JSON.parse(localStorage.getItem("pedidos")) || [];
    pedidosGuardados.push(pedido);
    localStorage.setItem("pedidos", JSON.stringify(pedidosGuardados));

    setCarrito([]);
    alert("✅ Pedido completado correctamente. ¡Gracias por tu compra!");
  };

  return (
    <div className="overlay">
      <div className="recuadro">
        <main>
          <h2>Tu carrito de compras</h2>

          {carrito.length === 0 ? (
            <p>🛒 Tu carrito está vacío.</p>
          ) : (
            <div id="carrito-lista">
              {carrito.map((prod, i) => (
                <div className="item-carrito" key={i}>
                  <img
                    src={prod.imagen}
                    alt={prod.nombre}
                    className="img-carrito"
                  />
                  <p>
                    <strong>{prod.nombre}</strong> - $
                    {prod.precio.toLocaleString("es-CL")} x{" "}
                    {prod.cantidad || 1}
                  </p>
                  <button
                    className="eliminar"
                    onClick={() => eliminarProducto(i)}
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          )}

          <h3 id="total">
            Total: $
            {(total * (1 - descuento / 100)).toLocaleString("es-CL")}
            {descuento > 0 && ` (Descuento aplicado: ${descuento}%)`}
          </h3>

          <div className="botones-carrito">
            <button id="vaciar" onClick={vaciarCarrito}>
              Vaciar Carrito
            </button>
            <button id="finalizar" onClick={finalizarCompra}>
              Finalizar Compra
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}