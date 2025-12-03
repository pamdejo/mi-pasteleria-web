import React, { useState } from "react";
import "../assets/css/regstyle.css";

export default function Registro() {
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [codigoDescuento, setCodigoDescuento] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre || !edad || !correo || !password || !confirmar) {
      alert("Completa todos los campos.");
      return;
    }

    if (password !== confirmar) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    const nuevoUsuario = {
      nombre: nombre.trim(),
      edad: parseInt(edad, 10),
      correo: correo.trim(),
      password,
      // descuento lo calcula el backend según edad
    };

    try {
      const resp = await fetch("http://localhost:8080/api/auth/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoUsuario),
      });

      if (!resp.ok) {
        const msg = await resp.text();
        alert("Error en el registro: " + msg);
        return;
      }

      const usuarioGuardado = await resp.json();

      // Guardar usuario actual para que el carrito / sitio lo use
      localStorage.setItem("usuarioActual", JSON.stringify(usuarioGuardado));

      alert(
        `¡Registro exitoso! Tu descuento es del ${
          usuarioGuardado.descuento || 0
        }%`
      );

      // limpiar formulario
      setNombre("");
      setEdad("");
      setCorreo("");
      setPassword("");
      setConfirmar("");
      setCodigoDescuento("");
    } catch (error) {
      console.error(error);
      alert("No se pudo registrar. Intenta más tarde.");
    }
  };

  return (
    <div className="overlay">
      <div className="recuadro">
        <div className="presentacion">
          <h1>Registro</h1>
          <p>Crea tu cuenta para continuar</p>
        </div>

        <form
          className="form-registro"
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <label htmlFor="nombre">Nombre completo</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />

          <label htmlFor="edad">Edad</label>
          <input
            type="number"
            id="edad"
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
            min="1"
            max="120"
            required
          />

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

          <label htmlFor="confirmar">Confirmar contraseña</label>
          <input
            type="password"
            id="confirmar"
            value={confirmar}
            onChange={(e) => setConfirmar(e.target.value)}
            required
          />

          <label htmlFor="descuento">Código de descuento (opcional)</label>
          <input
            type="text"
            id="descuento"
            value={codigoDescuento}
            onChange={(e) => setCodigoDescuento(e.target.value)}
            placeholder="FELICES50"
          />

          <button type="submit">Registrarse</button>
        </form>
      </div>
    </div>
  );
}