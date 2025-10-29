import React from "react";
import { Link } from "react-router-dom";
import "../assets/css/header.css"; // si tienes estilos del header

export default function Header() {
  return (
    <header>
      <div className="logo">
        <img src="/img/logo2.png" alt="Logo" />
        <h2>Pastelería Mil Sabores</h2>
      </div>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/productos">Productos</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/contacto">Contacto</Link>
      </nav>

      <div className="user-options">
        <Link to="/iniciosesion">Iniciar sesión</Link> |
        <Link to="/registro">Registrarse</Link> |
        <Link to="/carrito">
          Carro (<span id="cart-count">0</span>)
        </Link>
      </div>
    </header>
  );
}