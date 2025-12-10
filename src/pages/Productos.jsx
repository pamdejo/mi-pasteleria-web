import React, { useState, useEffect } from "react";
import "../assets/css/prstyle.css";

// 👇 Cambia el puerto si tu backend corre en otro (ej: 8081)
const API_URL = "http://localhost:8080/api/productos";

export default function Productos() {
  const [filtro, setFiltro] = useState("");
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // 🔹 Cargar productos desde el backend y carrito desde localStorage
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setCargando(true);
        setError(null);

        const resp = await fetch(API_URL);
        if (!resp.ok) {
          throw new Error("Error al obtener productos");
        }

        const data = await resp.json();
        setProductos(data);

        const carritoGuardado =
          JSON.parse(localStorage.getItem("carrito")) || [];
        setCarrito(carritoGuardado);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar los productos");
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, []);

  // 🔹 (extra) sincronizar carrito -> localStorage si cambia
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  // 🔹 Filtrar por categoría
  const productosFiltrados = filtro
    ? productos.filter((p) => p.categoria === filtro)
    : productos;

  // 🔹 Agregar al carrito
  const agregarAlCarrito = (producto) => {
    const existe = carrito.find((item) => item.id === producto.id);

    let nuevoCarrito;
    if (existe) {
      nuevoCarrito = carrito.map((item) =>
        item.id === producto.id
          ? { ...item, cantidad: (item.cantidad || 1) + 1 }
          : item
      );
    } else {
      nuevoCarrito = [...carrito, { ...producto, cantidad: 1 }];
    }

    setCarrito(nuevoCarrito);
    // 👇 aseguramos que el carrito se guarda al instante
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
  };

  // 🔹 Contar productos en el carrito
  const contarCarrito = () =>
    carrito.reduce((acc, item) => acc + (item.cantidad || 1), 0);

  return (
    <div className="overlay">
      <div className="recuadro">
        <h2>Menú de Productos</h2>

        {cargando && <p style={{ color: "#e290a9" }}>Cargando productos...</p>}
        {error && (
          <p style={{ color: "red" }}>
            {error} (revisa si el backend está encendido)
          </p>
        )}

        {!cargando && !error && (
          <>
            <div className="filtros">
              <label htmlFor="filtroCategoria">Filtrar por categoría:</label>
              <select
                id="filtroCategoria"
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
              >
                <option value="">Todas</option>
                <option value="Tortas Cuadradas">Tortas Cuadradas</option>
                <option value="Tortas Circulares">Tortas Circulares</option>
                <option value="Tortas Especiales">Tortas Especiales</option>
                <option value="Productos Sin Azúcar">Sin Azúcar</option>
                <option value="Productos Vegana">Veganas</option>
                <option value="Productos Sin Gluten">Sin Gluten</option>
                <option value="Pastelería Tradicional">Tradicional</option>
                <option value="Postres Individuales">Postres Individuales</option>
              </select>
            </div>

            <div className="productos">
              {productosFiltrados.length === 0 ? (
                <p style={{ color: "#e290a9", marginTop: "20px" }}>
                  No hay productos para mostrar.
                </p>
              ) : (
                productosFiltrados.map((p) => (
                  <div className="producto" key={p.id ?? p.nombre}>
                    <div className="producto-img">
                      {p.imagen && (
                        <img
                          src={p.imagen}
                          alt={p.nombre}
                          onError={(e) => {
                            // e.target.src = "/img/default.jpg";
                          }}
                        />
                      )}
                    </div>
                    <div className="producto-info">
                      <h3>{p.nombre}</h3>
                      <p className="precio">${p.precio}</p>
                      <p className="categoria">{p.categoria}</p>
                      <p className="descripcion">{p.descripcion}</p>
                      <button
                        className="add-to-cart"
                        onClick={() => agregarAlCarrito(p)}
                      >
                        Añadir al carrito
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}

        <p style={{ color: "#e290a9", marginTop: "20px" }}>
          🛒 Carrito: {contarCarrito()} productos
        </p>
      </div>
    </div>
  );
}