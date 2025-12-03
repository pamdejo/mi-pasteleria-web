import "../assets/css/style.css";

function Home() {
  return (
    <>
      <div className="overlay">
        <div className="presentacion">
          <h1>Pastelería Mil Sabores</h1>
          <p>Estamos emocionados de compartir nuestras delicias contigo</p>
          <h3>Descubre, saborea y crea momentos inolvidables con nosotros</h3>
        </div>
      </div>

      <div className="context">
        <img src="/img/eee.webp" alt="Imagen principal" />
      </div>

      <div className="text-box" id="nosotros">
        <p>
          Pastelería Mil Sabores celebra su 50 aniversario como un referente en la repostería chilena.
          Famosa por su participación en un récord Guinness en 1995, cuando colaboró en la creación
          de la torta más grande del mundo, la pastelería busca renovar su sistema de ventas online
          para ofrecer una experiencia moderna y accesible.
        </p>
      </div>

      <div className="text-box2">
        <h2>Nuestra misión</h2>
        <p>
          Ofrecer una experiencia dulce y memorable a nuestros clientes, proporcionando tortas y productos
          de repostería de alta calidad para todas las ocasiones, mientras celebramos nuestras raíces
          históricas y fomentamos la creatividad en la repostería.
        </p>
      </div>

      <div className="imagen2">
        <img src="/img/pasteleria1000sabores.png" alt="Imagen secundaria" />
      </div>

      <div className="text-box3">
        <h2>Nuestra visión</h2>
        <p>
          Convertirnos en la tienda online líder de productos de repostería en Chile, conocida por nuestra
          innovación, calidad y el impacto positivo en la comunidad, especialmente en la formación de nuevos
          talentos en gastronomía.
        </p>
      </div>
    </>
  );
}

export default Home;

