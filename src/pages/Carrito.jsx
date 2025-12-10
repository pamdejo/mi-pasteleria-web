import React, { useEffect, useState } from "react";
import "../assets/css/carrito.css";

const API_PEDIDOS = "http://localhost:8080/api/pedidos";

export default function Carrito() {
  const [carrito, setCarrito] = useState([]);
  const [usuarioActual, setUsuarioActual] = useState(null);
  const [total, setTotal] = useState(0);
  const [descuento, setDescuento] = useState(0);
  const [procesando, setProcesando] = useState(false);

  // 🔹 Cargar usuario y carrito desde localStorage UNA sola vez
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

  // 🔹 Calcular total cada vez que cambie el carrito o el descuento
  useEffect(() => {
    const totalCalc = carrito.reduce(
      (sum, p) => sum + (p.precio || 0) * (p.cantidad || 1),
      0
    );
    setTotal(totalCalc);
  }, [carrito, descuento]);

  const eliminarProducto = (index) => {
    const nuevo = carrito.filter((_, i) => i !== index);
    setCarrito(nuevo);
    localStorage.setItem("carrito", JSON.stringify(nuevo));
  };

  const vaciarCarrito = () => {
    setCarrito([]);
    localStorage.removeItem("carrito");
  };

  const finalizarCompra = async () => {
    if (carrito.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }

    if (!usuarioActual) {
      alert("Debes iniciar sesión.");
      return;
    }

    const totalFinal = total * (1 - descuento / 100);

    // Objeto que se enviará al backend
    const pedido = {
      nombreCliente: usuarioActual.nombre,
      correoCliente: usuarioActual.correo,
      total: totalFinal,
      descuentoAplicado: descuento,
      detalle: JSON.stringify(
        carrito.map(({ id, nombre, precio, cantidad, imagen }) => ({
          id,
          nombre,
          precio,
          cantidad: cantidad || 1,
          imagen,
        }))
      ),
      // fecha y estado los llena el backend
    };

    try {
      setProcesando(true);
      const resp = await fetch(API_PEDIDOS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pedido),
      });

      if (!resp.ok) {
        const msg = await resp.text();
        throw new Error(msg || "Error al registrar el pedido");
      }

      vaciarCarrito();
      alert("✅ Pedido completado correctamente. ¡Gracias por tu compra!");
    } catch (error) {
      console.error(error);
      alert("No se pudo registrar el pedido. Intenta más tarde.");
    } finally {
      setProcesando(false);
    }
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
                  {prod.imagen && (
                    <img
                      src={prod.imagen}
                      alt={prod.nombre}
                      className="img-carrito"
                    />
                  )}
                  <p>
                    <strong>{prod.nombre}</strong> - $
                    {Number(prod.precio || 0).toLocaleString("es-CL")} x{" "}
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
            <button id="vaciar" onClick={vaciarCarrito} disabled={procesando}>
              Vaciar Carrito
            </button>
            <button
              id="finalizar"
              onClick={finalizarCompra}
              disabled={procesando}
            >
              {procesando ? "Procesando..." : "Finalizar Compra"}
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
