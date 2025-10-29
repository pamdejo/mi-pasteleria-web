import React, { useState, useEffect } from "react";
import "../assets/css/adminstyle.css";

export default function Admin() {
  const [seccionActiva, setSeccionActiva] = useState("productos");
  const [productos, setProductos] = useState([]);
  const [publicaciones, setPublicaciones] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [comentarios, setComentarios] = useState([]);

  useEffect(() => {
    const usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"));
    if (!usuarioActual || usuarioActual.tipo !== "admin") {
      alert("Acceso denegado. Debes iniciar sesión como administrador.");
      window.location.href = "/iniciosesi";
    }
  }, []);

  useEffect(() => {
    setProductos(JSON.parse(localStorage.getItem("productos")) || []);
    setPublicaciones(JSON.parse(localStorage.getItem("blog")) || []);
    setPedidos(JSON.parse(localStorage.getItem("pedidos")) || []);
    setUsuarios(JSON.parse(localStorage.getItem("usuarios")) || []);
    setComentarios(JSON.parse(localStorage.getItem("comentarios")) || []);
  }, []);

  useEffect(() => {
    localStorage.setItem("productos", JSON.stringify(productos));
  }, [productos]);

  useEffect(() => {
    localStorage.setItem("blog", JSON.stringify(publicaciones));
  }, [publicaciones]);

  useEffect(() => {
    localStorage.setItem("comentarios", JSON.stringify(comentarios));
  }, [comentarios]);


  const agregarProducto = (e) => {
    e.preventDefault();
    const nombre = e.target.nombreProd.value.trim();
    const precio = e.target.precioProd.value;
    const imagen = e.target.imagenProd.value.trim();
    if (!nombre || !precio || !imagen) return alert("Completa todos los campos.");
    setProductos([...productos, { nombre, precio: Number(precio), imagen }]);
    e.target.reset();
  };

  const eliminarProducto = (i) => {
    const nuevos = [...productos];
    nuevos.splice(i, 1);
    setProductos(nuevos);
  };

  const agregarPublicacion = (e) => {
    e.preventDefault();
    const titulo = e.target.tituloBlog.value.trim();
    const contenido = e.target.contenidoBlog.value.trim();
    const imagen = e.target.imagenBlog.value.trim() || "/img/defaultblog.jpg";
    if (!titulo || !contenido) return alert("Completa el título y contenido.");
    const nueva = {
      titulo,
      contenido,
      imagen,
      fecha: new Date().toLocaleDateString("es-CL"),
    };
    setPublicaciones([...publicaciones, nueva]);
    e.target.reset();
  };

  const eliminarPublicacion = (i) => {
    const nuevas = [...publicaciones];
    nuevas.splice(i, 1);
    setPublicaciones(nuevas);
  };

  const eliminarPedido = (i) => {
    if (window.confirm("¿Eliminar este pedido?")) {
      const nuevos = [...pedidos];
      nuevos.splice(i, 1);
      setPedidos(nuevos);
      localStorage.setItem("pedidos", JSON.stringify(nuevos));
    }
  };

  const eliminarComentario = (i) => {
    const nuevos = [...comentarios];
    nuevos.splice(i, 1);
    setComentarios(nuevos);
  };

  const salir = () => {
    localStorage.removeItem("usuarioActual");
    alert("Has cerrado sesión correctamente.");
    window.location.href = "/";
  };

  // === RENDER ===
  return (
    <div className="admin-container">
      <header>
        <div className="logo">
          <img src="/img/logo2.png" alt="Logo" />
          <h2>Panel de Administración</h2>
        </div>
        <nav>
          <a onClick={() => setSeccionActiva("productos")}>Productos</a>
          <a onClick={() => setSeccionActiva("blog")}>Blog</a>
          <a onClick={() => setSeccionActiva("pedidos")}>Pedidos</a>
          <a onClick={() => setSeccionActiva("usuarios")}>Usuarios</a>
          <a onClick={() => setSeccionActiva("comentarios")}>Comentarios</a>
          <a onClick={salir}>Salir</a>
        </nav>
      </header>

      <main>
        {seccionActiva === "productos" && (
          <section className="panel">
            <h2>Gestión de Productos</h2>
            <form onSubmit={agregarProducto}>
              <input name="nombreProd" type="text" placeholder="Nombre" required />
              <input name="precioProd" type="number" placeholder="Precio" required />
              <input name="imagenProd" type="text" placeholder="Ruta de imagen (img/...)" required />
              <button type="submit">Agregar producto</button>
            </form>

            <div id="listaProductos">
              {productos.length === 0 ? (
                <p>No hay productos registrados.</p>
              ) : (
                productos.map((p, i) => (
                  <div className="card" key={i}>
                    <img src={p.imagen} alt={p.nombre} />
                    <p>
                      <strong>{p.nombre}</strong> - ${p.precio.toLocaleString("es-CL")}
                    </p>
                    <button onClick={() => eliminarProducto(i)}>Eliminar</button>
                  </div>
                ))
              )}
            </div>
          </section>
        )}

        {seccionActiva === "blog" && (
          <section className="panel">
            <h2>Gestión del Blog</h2>
            <form onSubmit={agregarPublicacion}>
              <input name="tituloBlog" type="text" placeholder="Título" required />
              <textarea name="contenidoBlog" placeholder="Contenido..." required />
              <input name="imagenBlog" type="text" placeholder="Ruta o URL de imagen (img/...)" />
              <button type="submit">Publicar</button>
            </form>

            <div id="listaBlog">
              {publicaciones.length === 0 ? (
                <p>No hay publicaciones aún.</p>
              ) : (
                publicaciones.map((p, i) => (
                  <div className="card" key={i}>
                    <img src={p.imagen} alt={p.titulo} />
                    <h3>{p.titulo}</h3>
                    <small>{p.fecha}</small>
                    <p>{p.contenido}</p>
                    <button onClick={() => eliminarPublicacion(i)}>Eliminar</button>
                  </div>
                ))
              )}
            </div>
          </section>
        )}

        {seccionActiva === "pedidos" && (
          <section className="panel">
            <h2>Pedidos de Clientes</h2>
            <div id="listaPedidos">
              {pedidos.length === 0 ? (
                <p>No hay pedidos registrados.</p>
              ) : (
                pedidos.map((p, i) => (
                  <div className="card" key={i}>
                    <p><strong>Cliente:</strong> {p.usuario || "Desconocido"}</p>
                    <p><strong>Total:</strong> ${Number(p.total).toLocaleString("es-CL")}</p>
                    <button className="eliminar-pedido" onClick={() => eliminarPedido(i)}>Eliminar pedido</button>
                  </div>
                ))
              )}
            </div>
          </section>
        )}

        {seccionActiva === "usuarios" && (
          <section className="panel">
            <h2>Usuarios Registrados</h2>
            <div id="listaUsuarios">
              {usuarios.length === 0 ? (
                <p>No hay usuarios registrados.</p>
              ) : (
                usuarios.map((u, i) => (
                  <div className="card" key={i}>
                    <p><strong>{u.nombre}</strong> ({u.correo})</p>
                    <p>Edad: {u.edad}</p>
                    <p>Rol: {u.tipo || "cliente"}</p>
                  </div>
                ))
              )}
            </div>
          </section>
        )}

        {seccionActiva === "comentarios" && (
          <section className="panel">
            <h2>Comentarios de Usuarios</h2>
            <div id="listaComentarios">
              {comentarios.length === 0 ? (
                <p>No hay comentarios enviados aún.</p>
              ) : (
                comentarios.map((c, i) => (
                  <div className="card" key={i}>
                    <p><strong>Nombre:</strong> {c.nombre}</p>
                    <p><strong>Comentario:</strong> {c.comentario}</p>
                    <button onClick={() => eliminarComentario(i)}>Eliminar</button>
                  </div>
                ))
              )}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}