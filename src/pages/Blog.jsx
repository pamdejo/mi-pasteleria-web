import React, { useEffect, useState } from "react";
import "../assets/css/blog.css";

const API_BLOG = "http://localhost:8080/api/blog";

export default function Blog() {
  const [publicaciones, setPublicaciones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarBlog = async () => {
      try {
        setCargando(true);
        setError(null);

        const resp = await fetch(API_BLOG);
        if (!resp.ok) {
          throw new Error("Error al obtener publicaciones del blog");
        }

        const data = await resp.json();

        if (Array.isArray(data) && data.length > 0) {
          // 👉 Hay publicaciones en la BD
          setPublicaciones(data);
        } else {
          // 👉 BD vacía: mostramos las 3 de ejemplo
          setPublicaciones([
            {
              id: 1,
              titulo: "Cómo decorar tortas como un profesional",
              contenido:
                "Aprende técnicas sencillas para que tus tortas luzcan espectaculares en cualquier ocasión.",
              imagen: "/img/tortablog1.jpg",
              fecha: new Date().toLocaleDateString("es-CL"),
            },
            {
              id: 2,
              titulo: "Postres saludables y deliciosos",
              contenido:
                "Ideas de postres sin azúcar y aptos para dietas especiales, ¡que todos amarán!",
              imagen: "/img/postresab.webp",
              fecha: new Date().toLocaleDateString("es-CL"),
            },
            {
              id: 3,
              titulo: "Tips para conservar tus tortas frescas",
              contenido:
                "Consejos prácticos para que tus tortas se mantengan perfectas durante más tiempo.",
              imagen: "/img/tortafresh.jpg",
              fecha: new Date().toLocaleDateString("es-CL"),
            },
          ]);
        }
      } catch (err) {
        console.error(err);
        setError("No se pudo cargar el blog. Revisa si el backend está activo.");
        // 👉 Si falla el backend, también mostramos las 3 de ejemplo
        setPublicaciones([
          {
            id: 1,
            titulo: "Cómo decorar tortas como un profesional",
            contenido:
              "Aprende técnicas sencillas para que tus tortas luzcan espectaculares en cualquier ocasión.",
            imagen: "/img/tortablog1.jpg",
            fecha: new Date().toLocaleDateString("es-CL"),
          },
          {
            id: 2,
            titulo: "Postres saludables y deliciosos",
            contenido:
              "Ideas de postres sin azúcar y aptos para dietas especiales, ¡que todos amarán!",
            imagen: "/img/postresab.webp",
            fecha: new Date().toLocaleDateString("es-CL"),
          },
          {
            id: 3,
            titulo: "Tips para conservar tus tortas frescas",
            contenido:
              "Consejos prácticos para que tus tortas se mantengan perfectas durante más tiempo.",
            imagen: "/img/tortafresh.jpg",
            fecha: new Date().toLocaleDateString("es-CL"),
          },
        ]);
      } finally {
        setCargando(false);
      }
    };

    cargarBlog();
  }, []);

  return (
    <div className="overlay">
      <div className="recuadro">
        <h1>Blog</h1>

        {cargando && <p>Cargando publicaciones...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {!cargando && (
          <div className="posts">
            {publicaciones.map((post, index) => (
              <div className="post" key={post.id ?? index}>
                <img
                  src={
                    post.imagen && post.imagen.trim() !== ""
                      ? post.imagen
                      : "/img/defaultblog.jpg"
                  }
                  alt={post.titulo}
                />
                <div>
                  <h2>{post.titulo}</h2>
                  <p>{post.contenido}</p>
                  <small>{post.fecha}</small>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}