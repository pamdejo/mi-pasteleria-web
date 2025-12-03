import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/rstyle.css";

export default function Login() {
  const navigate = useNavigate();

  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const resp = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correo, password }),
    });

    if (!resp.ok) {
      const msg = await resp.text();
      alert("Error al iniciar sesión: " + msg);
      return;
    }

    const usuario = await resp.json();

    localStorage.setItem("usuarioActual", JSON.stringify(usuario));

    if (usuario.tipo === "admin") {
      alert("Bienvenido, administrador");
      navigate("/admin");
    } else {
      alert(`¡Bienvenido ${usuario.nombre}!`);
      navigate("/");
    }
  } catch (error) {
    console.error(error);
    alert("No se pudo iniciar sesión. Intenta más tarde.");
  }
};
  return (
    <div className="overlay">
      <div className="recuadro">
        <div className="presentacion">
          <h1>Iniciar Sesión</h1>
          <p>¿No tienes cuenta todavía?</p>
          <a href="/registro">Regístrate aquí</a>
        </div>

        <form className="form-inis" onSubmit={handleSubmit}>
          <label htmlFor="correo">Correo electrónico</label>
          <input
            type="email"
            id="correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />

          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Iniciar sesión</button>
        </form>
      </div>
    </div>
  );
}