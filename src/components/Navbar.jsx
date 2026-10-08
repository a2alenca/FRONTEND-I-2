// Barra de navegación (Bootstrap 5)
// props: cantidadCarrito -> número de juegos en el carrito
function Navbar({ cantidadCarrito }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        <a className="navbar-brand d-flex align-items-center gap-2" href="#inicio">
          <img
            src={`${import.meta.env.BASE_URL}img/logo.png`}
            alt="Logo GameStore"
            className="logo-nav"
          />
          GameStore
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#menuPrincipal"
          aria-controls="menuPrincipal"
          aria-expanded="false"
          aria-label="Abrir menú"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="menuPrincipal">
          <ul className="navbar-nav ms-auto align-items-lg-center">
            <li className="nav-item">
              <a className="nav-link" href="#inicio">Inicio</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#catalogo">Catálogo</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#agregar">Agregar juego</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#contacto">Contacto</a>
            </li>
            <li className="nav-item ms-lg-3">
              <a className="btn btn-primary btn-sm" href="#carrito">
                🛒 Carrito <span className="badge bg-light text-dark">{cantidadCarrito}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
