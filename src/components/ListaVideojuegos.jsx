import TarjetaVideojuego from './TarjetaVideojuego.jsx';

// Lista de videojuegos (se muestra en una cuadrícula CSS Grid)
// props: juegos, idsEnCarrito, onAgregar, onEliminar
function ListaVideojuegos({ juegos, idsEnCarrito, onAgregar, onEliminar }) {
  if (juegos.length === 0) {
    return (
      <div className="alert alert-info">No hay videojuegos en esta categoría.</div>
    );
  }

  return (
    <div className="grid-juegos">
      {juegos.map((juego) => (
        <TarjetaVideojuego
          key={juego.id}
          juego={juego}
          enCarrito={idsEnCarrito.includes(juego.id)}
          onAgregar={onAgregar}
          onEliminar={onEliminar}
        />
      ))}
    </div>
  );
}

export default ListaVideojuegos;
