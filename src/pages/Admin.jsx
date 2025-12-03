import React, { useState, useEffect } from "react";
import "../assets/css/adminstyle.css";

const API_URL = "http://localhost:8080/api/productos"; // cambia a 8081 si tu backend usa ese puerto

export default function Admin() {
  const [seccionActiva, setSeccionActiva] = useState("productos");

  // Estados principales
  const [productos, setProductos] = useState([]);
  const [publicaciones, setPublicaciones] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [cargandoUsuarios, setCargandoUsuarios] = useState(true);
  const [errorUsuarios, setErrorUsuarios] = useState(null);
  const [comentarios, setComentarios] = useState([]);

  const [cargandoProductos, setCargandoProductos] = useState(true);
  const [errorProductos, setErrorProductos] = useState(null);

  // 🔐 Proteger acceso: solo admin
  useEffect(() => {
    const usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"));
    if (!usuarioActual || usuarioActual.tipo !== "admin") {
      alert("Acceso denegado. Debes iniciar sesión como administrador.");
      window.location.href = "/iniciosesion";
    }
  }, []);

  // 🔹 Cargar productos (backend) + resto (localStorage) + usuarios (backend)
  useEffect(() => {
    const cargarProductos = async () => {
      try {
        setCargandoProductos(true);
        setErrorProductos(null);

        const resp = await fetch(API_URL);
        if (!resp.ok) {
          throw new Error("Error al obtener productos");
        }
        const data = await resp.json();
        setProductos(data);
      } catch (err) {
        console.error(err);
        setErrorProductos("No se pudieron cargar los productos");
      } finally {
        setCargandoProductos(false);
      }
    };

    const cargarUsuarios = async () => {
      try {
        setCargandoUsuarios(true);
        setErrorUsuarios(null);

        const resp = await fetch("http://localhost:8080/api/usuarios");
        if (!resp.ok) {
          throw new Error("Error al obtener usuarios");
        }
        const data = await resp.json();
        setUsuarios(data);
      } catch (err) {
        console.error(err);
        setErrorUsuarios("No se pudieron cargar los usuarios");
      } finally {
        setCargandoUsuarios(false);
      }
    };

    cargarProductos();
    cargarUsuarios();

    // Resto de secciones desde localStorage (como en el zip original)
    setPublicaciones(JSON.parse(localStorage.getItem("blog")) || []);
    setPedidos(JSON.parse(localStorage.getItem("pedidos")) || []);
    setComentarios(JSON.parse(localStorage.getItem("comentarios")) || []);
  }, []);

  // 🔹 Persistir secciones en localStorage (igual que antes, menos productos/usuarios)
  useEffect(() => {
    localStorage.setItem("blog", JSON.stringify(publicaciones));
  }, [publicaciones]);

  useEffect(() => {
    localStorage.setItem("pedidos", JSON.stringify(pedidos));
  }, [pedidos]);

  useEffect(() => {
    localStorage.setItem("comentarios", JSON.stringify(comentarios));
  }, [comentarios]);

  // =========================
  //  PRODUCTOS (BACKEND)
  // =========================

  const recargarProductos = async () => {
    try {
      setCargandoProductos(true);
      const resp = await fetch(API_URL);
      if (!resp.ok) throw new Error("Error al obtener productos");
      const data = await resp.json();
      setProductos(data);
    } catch (err) {
      console.error(err);
      setErrorProductos("No se pudieron recargar los productos");
    } finally {
      setCargandoProductos(false);
    }
  };

  const agregarProducto = async (e) => {
    e.preventDefault();
    const nombre = e.target.nombreProd.value.trim();
    const precio = e.target.precioProd.value;
    const imagen = e.target.imagenProd.value.trim();

    if (!nombre || !precio || !imagen) {
      alert("Completa todos los campos.");
      return;
    }

    const nuevo = {
      nombre,
      precio: Number(precio),
      categoria: "Sin categoría",
      descripcion: "",
      imagen,
    };

    try {
      const resp = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevo),
      });

      if (!resp.ok) {
        const msg = await resp.text();
        throw new Error(msg || "Error al crear producto");
      }

      await recargarProductos();
      e.target.reset();
      alert("Producto agregado correctamente");
    } catch (err) {
      console.error(err);
      alert("No se pudo agregar el producto");
    }
  };

  const eliminarProducto = async (id) => {
    if (!window.confirm("¿Eliminar este producto?")) return;

    try {
      const resp = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!resp.ok && resp.status !== 204) {
        const msg = await resp.text();
        throw new Error(msg || "Error al eliminar producto");
      }

      await recargarProductos();
      alert("Producto eliminado");
    } catch (err) {
      console.error(err);
      alert("No se pudo eliminar el producto");
    }
  };

  // =========================
  //  BLOG (LOCALSTORAGE)
  // =========================

  const agregarPublicacion = (e) => {
    e.preventDefault();
    const titulo = e.target.tituloBlog.value.trim();
    const contenido = e.target.contenidoBlog.value.trim();
    const imagen =
      e.target.imagenBlog.value.trim() || "/img/defaultblog.jpg";

    if (!titulo || !contenido) {
      alert("Completa el título y contenido.");
      return;
    }

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

  // =========================
  //  PEDIDOS (LOCALSTORAGE)
  // =========================

  const eliminarPedido = (i) => {
    if (window.confirm("¿Eliminar este pedido?")) {
      const nuevos = [...pedidos];
      nuevos.splice(i, 1);
      setPedidos(nuevos);
    }
  };

  // =========================
  //  COMENTARIOS (LOCALSTORAGE)
  // =========================

  const eliminarComentario = (i) => {
    const nuevos = [...comentarios];
    nuevos.splice(i, 1);
    setComentarios(nuevos);
  };

  // =========================
  //  SALIR
  // =========================

  const salir = () => {
    localStorage.removeItem("usuarioActual");
    alert("Has cerrado sesión correctamente.");
    window.location.href = "/";
  };

  // =========================
  //  RENDER
  // =========================

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
        {/* ================== PRODUCTOS ================== */}
        {seccionActiva === "productos" && (
          <section className="panel">
            <h2>Gestión de Productos</h2>

            {cargandoProductos && <p>Cargando productos...</p>}
            {errorProductos && (
              <p style={{ color: "red" }}>{errorProductos}</p>
            )}

            <form onSubmit={agregarProducto}>
              <input
                name="nombreProd"
                type="text"
                placeholder="Nombre"
                required
              />
              <input
                name="precioProd"
                type="number"
                placeholder="Precio"
                required
              />
              <input
                name="imagenProd"
                type="text"
                placeholder="Ruta o URL de imagen (img/...)"
                required
              />
              <button type="submit">Agregar producto</button>
            </form>

            <div id="listaProductos">
              {productos.length === 0 ? (
                <p>No hay productos registrados.</p>
              ) : (
                productos.map((p) => (
                  <div className="card" key={p.id}>
                    {p.imagen && <img src={p.imagen} alt={p.nombre} />}
                    <p>
                      <strong>{p.nombre}</strong> - $
                      {Number(p.precio).toLocaleString("es-CL")}
                    </p>
                    <button onClick={() => eliminarProducto(p.id)}>
                      Eliminar
                    </button>
                  </div>
                ))
              )}
            </div>
          </section>
        )}

        {/* ================== BLOG ================== */}
        {seccionActiva === "blog" && (
          <section className="panel">
            <h2>Gestión del Blog</h2>
            <form onSubmit={agregarPublicacion}>
              <input
                name="tituloBlog"
                type="text"
                placeholder="Título"
                required
              />
              <textarea
                name="contenidoBlog"
                placeholder="Contenido..."
                required
              />
              <input
                name="imagenBlog"
                type="text"
                placeholder="Ruta o URL de imagen (img/...)"
              />
              <button type="submit">Publicar</button>
            </form>

            <div id="listaBlog">
              {publicaciones.length === 0 ? (
                <p>No hay publicaciones aún.</p>
              ) : (
                publicaciones.map((p, i) => (
                  <div className="card" key={i}>
                    {p.imagen && <img src={p.imagen} alt={p.titulo} />}
                    <h3>{p.titulo}</h3>
                    <small>{p.fecha}</small>
                    <p>{p.contenido}</p>
                    <button onClick={() => eliminarPublicacion(i)}>
                      Eliminar
                    </button>
                  </div>
                ))
              )}
            </div>
          </section>
        )}

        {/* ================== PEDIDOS ================== */}
        {seccionActiva === "pedidos" && (
          <section className="panel">
            <h2>Pedidos</h2>
            <div id="listaPedidos">
              {pedidos.length === 0 ? (
                <p>No hay pedidos registrados.</p>
              ) : (
                pedidos.map((p, i) => (
                  <div className="card" key={i}>
                    <p>
                      <strong>Cliente:</strong> {p.usuario || "Desconocido"}
                    </p>
                    <p>
                      <strong>Total:</strong> $
                      {Number(p.total).toLocaleString("es-CL")}
                    </p>
                    <button
                      className="eliminar-pedido"
                      onClick={() => eliminarPedido(i)}
                    >
                      Eliminar pedido
                    </button>
                  </div>
                ))
              )}
            </div>
          </section>
        )}

        {/* ================== USUARIOS ================== */}
        {seccionActiva === "usuarios" && (
          <section className="panel">
            <h2>Usuarios Registrados</h2>

            {cargandoUsuarios && <p>Cargando usuarios...</p>}
            {errorUsuarios && (
              <p style={{ color: "red" }}>{errorUsuarios}</p>
            )}

            <div id="listaUsuarios">
              {!cargandoUsuarios &&
                !errorUsuarios &&
                usuarios.length === 0 && (
                  <p>No hay usuarios registrados.</p>
                )}

              {!cargandoUsuarios &&
                !errorUsuarios &&
                usuarios.length > 0 &&
                usuarios.map((u) => (
                  <div className="card" key={u.id}>
                    <p>
                      <strong>{u.nombre}</strong> ({u.correo})
                    </p>
                    <p>Edad: {u.edad}</p>
                    <p>Rol: {u.tipo || "cliente"}</p>
                    <p>Descuento: {u.descuento ?? 0}%</p>
                  </div>
                ))}
            </div>
          </section>
        )}

        {/* ================== COMENTARIOS ================== */}
        {seccionActiva === "comentarios" && (
          <section className="panel">
            <h2>Comentarios de Usuarios</h2>
            <div id="listaComentarios">
              {comentarios.length === 0 ? (
                <p>No hay comentarios enviados aún.</p>
              ) : (
                comentarios.map((c, i) => (
                  <div className="card" key={i}>
                    <p>
                      <strong>Nombre:</strong> {c.nombre}
                    </p>
                    <p>
                      <strong>Comentario:</strong> {c.comentario}
                    </p>
                    <button onClick={() => eliminarComentario(i)}>
                      Eliminar
                    </button>
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