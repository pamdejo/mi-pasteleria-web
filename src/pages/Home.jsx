import React, { useEffect } from "react";
import "../assets/css/style.css";

import logo from "../assets/img/logo2.png";
import imagenPrincipal from "../assets/img/eee.webp";
import pasteleria from "../assets/img/pasteleria1000sabores.png";

const Home = () => {
  useEffect(() => {
    const cartCount = document.getElementById("cart-count");
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    if (cartCount) {
      cartCount.innerText = carrito.length;
    }
  }, []);

  return (
    <div>
      <header>
        <div className="logo">
          <img src={logo} alt="Logo" />
          <h2>Pastelería Mil Sabores</h2>
        </div>
        <nav>
          <a href="#">Home</a>
          <a href="productos.html">Productos</a>
          <a href="#nosotros">Nosotros</a>
          <a href="blog.html">Blog</a>
          <a href="contacto.html">Contacto</a>
        </nav>
        <div className="user-options">
          <a href="iniciosesi.html">Iniciar sesión</a> |{" "}
          <a href="registro.html">Registrarse</a> |{" "}
          <a href="carrito.html">
            Carro (<span id="cart-count">0</span>)
          </a>
        </div>
      </header>

      <div className="overlay">
        <div className="presentacion">
          <h1>Pastelería Mil Sabores</h1>
          <p>Estamos emocionados de compartir nuestras delicias contigo</p>
          <h3>Descubre, saborea y crea momentos inolvidables con nosotros</h3>
        </div>
      </div>

      <div className="context">
        <img src={imagenPrincipal} alt="Imagen principal" />
      </div>

      <div className="text-box" id="nosotros">
        <p>
          Pastelería 1000 Sabores celebra su 50 aniversario como un referente en
          la repostería chilena. Famosa por su participación en un récord
          Guinness en 1995, cuando colaboró en la creación de la torta más
          grande del mundo, la pastelería busca renovar su sistema de ventas
          online para ofrecer una experiencia de compra moderna y accesible para
          sus clientes.
        </p>
      </div>

      <div className="text-box2">
        <h2>Nuestra misión</h2>
        <p>
          Ofrecer una experiencia dulce y memorable a nuestros clientes,
          proporcionando tortas y productos de repostería de alta calidad para
          todas las ocasiones, mientras celebramos nuestras raíces históricas y
          fomentamos la creatividad en la repostería.
        </p>
      </div>

      <div className="imagen2">
        <img src={pasteleria} alt="Imagen secundaria" />
      </div>

      <div className="text-box3">
        <h2>Nuestra visión</h2>
        <p>
          Convertirnos en la tienda online líder de productos de repostería en
          Chile, conocida por nuestra innovación, calidad y el impacto positivo
          en la comunidad, especialmente en la formación de nuevos talentos en
          gastronomía.
        </p>
      </div>
    </div>
  );
};

export default Home;