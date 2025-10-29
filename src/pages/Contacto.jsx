import React, { useState, useEffect } from "react";
import "../assets/css/contacto.css";

export default function Contacto() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [comentario, setComentario] = useState("");
  const [errores, setErrores] = useState({
    nombre: "",
    correo: "",
    comentario: "",
  });

  useEffect(() => {
    const usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"));
    if (usuarioActual) {
      setNombre(usuarioActual.nombre || "");
      setCorreo(usuarioActual.correo || "");
    }
  }, []);

  const validarFormulario = () => {
    let valido = true;
    const nuevosErrores = { nombre: "", correo: "", comentario: "" };

    if (nombre.trim() === "") {
      nuevosErrores.nombre = "El nombre es obligatorio.";
      valido = false;
    } else if (nombre.length > 100) {
      nuevosErrores.nombre = "El nombre no puede superar los 100 caracteres.";
      valido = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (correo.trim() === "") {
      nuevosErrores.correo = "El correo es obligatorio.";
      valido = false;
    } else if (correo.length > 100) {
      nuevosErrores.correo = "El correo no puede superar los 100 caracteres.";
      valido = false;
    } else if (!emailRegex.test(correo)) {
      nuevosErrores.correo = "Ingresa un correo electrónico válido.";
      valido = false;
    }

    if (comentario.trim() === "") {
      nuevosErrores.comentario = "El comentario es obligatorio.";
      valido = false;
    } else if (comentario.length > 500) {
      nuevosErrores.comentario =
        "El comentario no puede superar los 500 caracteres.";
      valido = false;
    }

    setErrores(nuevosErrores);
    return valido;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validarFormulario()) return;

    const nuevoComentario = {
      nombre: nombre.trim(),
      correo: correo.trim(),
      comentario: comentario.trim(),
      fecha: new Date().toLocaleString("es-CL"),
    };

    const comentariosGuardados =
      JSON.parse(localStorage.getItem("comentarios")) || [];
    comentariosGuardados.push(nuevoComentario);
    localStorage.setItem("comentarios", JSON.stringify(comentariosGuardados));

    alert("✅ ¡Tu mensaje ha sido enviado correctamente!");
    setComentario("");

    const usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"));
    if (usuarioActual) {
      setNombre(usuarioActual.nombre || "");
      setCorreo(usuarioActual.correo || "");
    } else {
      setNombre("");
      setCorreo("");
    }
  };

  return (
    <main>
      <div className="contact-box">
        <h2>Contacto</h2>

        <form id="contactForm" onSubmit={handleSubmit}>
          <label htmlFor="nombre">Nombre Completo</label>
          <input
            type="text"
            id="nombre"
            maxLength="100"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
          {errores.nombre && (
            <span className="error">{errores.nombre}</span>
          )}

          <label htmlFor="correo">Correo</label>
          <input
            type="email"
            id="correo"
            maxLength="100"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            readOnly={!!JSON.parse(localStorage.getItem("usuarioActual"))}
            required
          />
          {errores.correo && (
            <span className="error">{errores.correo}</span>
          )}

          <label htmlFor="comentario">Comentario (máx 500*)</label>
          <textarea
            id="comentario"
            maxLength="500"
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            required
          />
          {errores.comentario && (
            <span className="error">{errores.comentario}</span>
          )}

          <button type="submit">Enviar</button>
        </form>
      </div>
    </main>
  );
}