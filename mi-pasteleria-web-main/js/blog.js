document.addEventListener("DOMContentLoaded", () => {
  const postsContainer = document.getElementById("posts");

  // Ejemplo de posts
  const posts = [
    {
      titulo: "Cómo decorar tortas como un profesional",
      resumen: "Aprende técnicas sencillas para que tus tortas luzcan espectaculares en cualquier ocasión.",
      imagen: "img/blog1.jpg",
    },
    {
      titulo: "Postres saludables y deliciosos",
      resumen: "Ideas de postres sin azúcar y aptos para dietas especiales, ¡que todos amarán!",
      imagen: "img/blog2.jpg",
    },
    {
      titulo: "Tips para conservar tus tortas frescas",
      resumen: "Consejos prácticos para que tus tortas se mantengan perfectas durante más tiempo.",
      imagen: "img/blog3.jpg",
    },
  ];

  posts.forEach(post => {
    const div = document.createElement("div");
    div.classList.add("post");

    div.innerHTML = `
      <img src="${post.imagen}" alt="${post.titulo}">
      <div>
        <h2>${post.titulo}</h2>
        <p>${post.resumen}</p>
      </div>
    `;

    postsContainer.appendChild(div);
  });
});