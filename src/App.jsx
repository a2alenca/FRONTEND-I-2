import { useEffect, useState } from 'react';
import Navbar from './components/Navbar.jsx';
import FiltroCategorias from './components/FiltroCategorias.jsx';
import ListaVideojuegos from './components/ListaVideojuegos.jsx';
import Carrito from './components/Carrito.jsx';
import FormularioVideojuego from './components/FormularioVideojuego.jsx';
import FormularioContacto from './components/FormularioContacto.jsx';
import Footer from './components/Footer.jsx';

function App() {
  // Estado de la aplicación
  const [videojuegos, setVideojuegos] = useState([]);
  const [categoriaActiva, setCategoriaActiva] = useState('Todos');
  const [carrito, setCarrito] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);

  // Carga los videojuegos desde el archivo productos.json
  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}productos.json`)
      .then((respuesta) => {
        if (!respuesta.ok) throw new Error('Error al cargar los datos');
        return respuesta.json();
      })
      .then((datos) => setVideojuegos(datos))
      .catch(() => setError(true))
      .finally(() => setCargando(false));
  }, []);

  // Categorías disponibles (se calculan a partir de los juegos)
  const categorias = ['Todos', ...new Set(videojuegos.map((j) => j.categoria))];

  // Si se elimina el último juego de una categoría, se vuelve a "Todos"
  const categoriaValida = categorias.includes(categoriaActiva) ? categoriaActiva : 'Todos';

  // Juegos filtrados según la categoría elegida
  const juegosFiltrados =
    categoriaValida === 'Todos'
      ? videojuegos
      : videojuegos.filter((j) => j.categoria === categoriaValida);

  // Agrega un videojuego nuevo a la lista
  const agregarVideojuego = (nuevo) => {
    const id = videojuegos.length > 0 ? Math.max(...videojuegos.map((j) => j.id)) + 1 : 1;
    setVideojuegos([...videojuegos, { ...nuevo, id }]);
  };

  // Elimina un videojuego de la lista (y del carrito si estaba)
  const eliminarVideojuego = (id) => {
    setVideojuegos(videojuegos.filter((j) => j.id !== id));
    setCarrito(carrito.filter((j) => j.id !== id));
  };

  // Funciones del carrito
  const agregarAlCarrito = (juego) => {
    if (!carrito.some((j) => j.id === juego.id)) {
      setCarrito([...carrito, juego]);
    }
  };
  const quitarDelCarrito = (id) => setCarrito(carrito.filter((j) => j.id !== id));
  const vaciarCarrito = () => setCarrito([]);

  return (
    <>
      <Navbar cantidadCarrito={carrito.length} />

      <header id="inicio" className="hero text-center">
        <div className="container">
          <h1 className="display-4 fw-bold">GameStore</h1>
          <p className="lead mb-0">Los mejores videojuegos al mejor precio</p>
        </div>
      </header>

      <main className="container py-5">
        <section id="catalogo" className="mb-5">
          <h2 className="mb-3">Catálogo de videojuegos</h2>

          {cargando && (
            <div className="text-center my-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
            </div>
          )}

          {error && (
            <div className="alert alert-danger">
              No se pudieron cargar los videojuegos. Intenta nuevamente más tarde.
            </div>
          )}

          {!cargando && !error && (
            <>
              <FiltroCategorias
                categorias={categorias}
                categoriaActiva={categoriaValida}
                onCambiar={setCategoriaActiva}
              />
              <ListaVideojuegos
                juegos={juegosFiltrados}
                idsEnCarrito={carrito.map((j) => j.id)}
                onAgregar={agregarAlCarrito}
                onEliminar={eliminarVideojuego}
              />
            </>
          )}
        </section>

        <div className="row g-5">
          <section id="carrito" className="col-lg-5">
            <h2 className="mb-3">Tu carrito</h2>
            <Carrito items={carrito} onQuitar={quitarDelCarrito} onVaciar={vaciarCarrito} />
          </section>

          <section id="agregar" className="col-lg-7">
            <h2 className="mb-3">Agregar videojuego</h2>
            <FormularioVideojuego onAgregar={agregarVideojuego} />
          </section>
        </div>

        <section id="contacto" className="mt-5">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <h2 className="mb-3">Contacto</h2>
              <p className="text-muted">
                ¿Tienes dudas? Escríbele al administrador del sitio.
              </p>
              <FormularioContacto />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default App;
