import React, { useEffect, useState } from "react";
import "../assets/css/blog.css";

export default function Blog() {
  const [publicaciones, setPublicaciones] = useState([]);

  useEffect(() => {
    let blogGuardado = JSON.parse(localStorage.getItem("blog")) || [];

    if (blogGuardado.length === 0) {
      blogGuardado = [
        {
          titulo: "Cómo decorar tortas como un profesional",
          contenido:
            "Aprende técnicas sencillas para que tus tortas luzcan espectaculares en cualquier ocasión.",
          imagen: "/img/tortablog1.jpg",
          fecha: new Date().toLocaleDateString("es-CL"),
        },
        {
          titulo: "Postres saludables y deliciosos",
          contenido:
            "Ideas de postres sin azúcar y aptos para dietas especiales, ¡que todos amarán!",
          imagen: "/img/postresab.webp",
          fecha: new Date().toLocaleDateString("es-CL"),
        },
        {
          titulo: "Tips para conservar tus tortas frescas",
          contenido:
            "Consejos prácticos para que tus tortas se mantengan perfectas durante más tiempo.",
          imagen: "/img/tortafresh.jpg",
          fecha: new Date().toLocaleDateString("es-CL"),
        },
      ];
    }

    setPublicaciones(blogGuardado);
  }, []);

  return (
    <div className="overlay">
      <div className="recuadro">
        <h1>Blog</h1>
        <div className="posts">
          {publicaciones.map((post, index) => (
            <div className="post" key={index}>
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
      </div>
    </div>
  );
}