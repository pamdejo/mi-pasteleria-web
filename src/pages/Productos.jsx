import React, { useState, useEffect } from "react";
import "../assets/css/prstyle.css";

export default function Productos() {
  const [filtro, setFiltro] = useState("");
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const data = [
      {
        nombre: "Torta Cuadrada de Chocolate",
        precio: 45000,
        categoria: "Tortas Cuadradas",
        descripcion:
          "Deliciosa torta de chocolate con capas de ganache y un toque de avellanas. Personalizable con mensajes especiales.",
        imagen: "/img/tortacc.jpg",
      },
      {
        nombre: "Torta Cuadrada de Frutas",
        precio: 50000,
        categoria: "Tortas Cuadradas",
        descripcion:
          "Una mezcla de frutas frescas y crema chantilly sobre un suave bizcocho de vainilla, ideal para celebraciones.",
        imagen: "/img/tortacf.jpg",
      },
      {
        nombre: "Torta Circular de Vainilla",
        precio: 40000,
        categoria: "Tortas Circulares",
        descripcion:
          "Bizcocho de vainilla clásico relleno con crema pastelera y cubierto con un glaseado dulce, perfecto para cualquier ocasión.",
        imagen: "/img/tortaccv.jpg",
      },
      {
        nombre: "Torta Circular de Manjar",
        precio: 42000,
        categoria: "Tortas Circulares",
        descripcion:
          "Torta tradicional chilena con manjar y nueces, un deleite para los amantes de los sabores dulces y clásicos.",
        imagen: "/img/tortaccm.jpg",
      },
      {
        nombre: "Mousse de Chocolate",
        precio: 5000,
        categoria: "Postres Individuales",
        descripcion:
          "Postre individual cremoso y suave, hecho con chocolate de alta calidad, ideal para los amantes del chocolate.",
        imagen: "/img/mousseCh.jpg",
      },
      {
        nombre: "Tiramisú Clásico",
        precio: 5500,
        categoria: "Postres Individuales",
        descripcion:
          "Un postre italiano individual con capas de café, mascarpone y cacao, perfecto para finalizar cualquier comida.",
        imagen: "/img/tiramisuclss.jpg",
      },
      {
        nombre: "Torta Sin Azúcar de Naranja",
        precio: 48000,
        categoria: "Productos Sin Azúcar",
        descripcion:
          "Torta ligera y deliciosa, endulzada naturalmente, ideal para quienes buscan opciones más saludables.",
        imagen: "/img/tortassn.jpg",
      },
      {
        nombre: "Cheesecake Sin Azúcar",
        precio: 47000,
        categoria: "Productos Sin Azúcar",
        descripcion:
          "Suave y cremoso, este cheesecake es una opción perfecta para disfrutar sin culpa.",
        imagen: "/img/cheesecakesa.jpg",
      },
      {
        nombre: "Empanada de Manzana",
        precio: 3000,
        categoria: "Pastelería Tradicional",
        descripcion:
          "Pastelería tradicional rellena de manzanas especiadas, perfecta para un dulce desayuno o merienda.",
        imagen: "/img/empm.jpg",
      },
      {
        nombre: "Tarta de Santiago",
        precio: 6000,
        categoria: "Pastelería Tradicional",
        descripcion:
          "Tradicional tarta española hecha con almendras, azúcar y huevos, una delicia para los amantes de los postres clásicos.",
        imagen: "/img/tortastgo.jpg",
      },
      {
        nombre: "Brownie Sin Gluten",
        precio: 4000,
        categoria: "Productos Sin Gluten",
        descripcion:
          "Rico y denso, este brownie es perfecto para quienes necesitan evitar el gluten sin sacrificar el sabor.",
        imagen: "/img/browniesg.jpg",
      },
      {
        nombre: "Pan Sin Gluten",
        precio: 3500,
        categoria: "Productos Sin Gluten",
        descripcion:
          "Suave y esponjoso, ideal para sándwiches o para acompañar cualquier comida.",
        imagen: "/img/pansg.jpg",
      },
      {
        nombre: "Torta Vegana de Chocolate",
        precio: 50000,
        categoria: "Productos Vegana",
        descripcion:
          "Torta de chocolate húmeda y deliciosa, hecha sin productos de origen animal, perfecta para veganos.",
        imagen: "/img/tortavegc.jpg",
      },
      {
        nombre: "Galletas Veganas de Avena",
        precio: 4500,
        categoria: "Productos Vegana",
        descripcion:
          "Crujientes y sabrosas, estas galletas son una excelente opción para un snack saludable y vegano.",
        imagen: "/img/gallevega.webp",
      },
      {
        nombre: "Torta Especial de Cumpleaños",
        precio: 55000,
        categoria: "Tortas Especiales",
        descripcion:
          "Diseñada especialmente para celebraciones, personalizable con decoraciones y mensajes únicos.",
        imagen: "/img/tortaespcum.jpg",
      },
      {
        nombre: "Torta Especial de Boda",
        precio: 60000,
        categoria: "Tortas Especiales",
        descripcion:
          "Elegante y deliciosa, esta torta está diseñada para ser el centro de atención en cualquier boda.",
        imagen: "/img/toertaespbod.jpg",
      },
    ];

    setProductos(data);
    const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
    setCarrito(carritoGuardado);
  }, []);

  const productosFiltrados = filtro
    ? productos.filter((p) => p.categoria === filtro)
    : productos;

  const agregarAlCarrito = (producto) => {
    const existe = carrito.find((item) => item.nombre === producto.nombre);

    let nuevoCarrito;
    if (existe) {
      nuevoCarrito = carrito.map((item) =>
        item.nombre === producto.nombre
          ? { ...item, cantidad: (item.cantidad || 1) + 1 }
          : item
      );
    } else {
      nuevoCarrito = [...carrito, { ...producto, cantidad: 1 }];
    }

    setCarrito(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
    alert(`${producto.nombre} añadido al carrito.`);
  };

  const contarCarrito = () =>
    carrito.reduce((acc, item) => acc + (item.cantidad || 1), 0);

  return (
    <div className="overlay">
      <div className="recuadro">
        <h2>Menú de Productos</h2>

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
          {productosFiltrados.map((p, i) => (
            <div className="producto" key={i}>
              <img src={p.imagen} alt={p.nombre} />
              <div className="info-producto">
                <p className="nombre">{p.nombre}</p>
                <p className="precio">${p.precio.toLocaleString("es-CL")}</p>
                <p className="categoria">{p.categoria}</p>
                <p className="descripcion">{p.descripcion}</p>
                <button className="add-to-cart" onClick={() => agregarAlCarrito(p)}>
                  Añadir al carrito
                </button>
              </div>
            </div>
          ))}
        </div>

        <p style={{ color: "#e290a9", marginTop: "20px" }}>
          🛒 Carrito: {contarCarrito()} productos
        </p>
      </div>
    </div>
  );
}