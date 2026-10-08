// Tarjeta de un videojuego 
// props: juego, enCarrito, onAgregar, onEliminar

// Si la imagen es local se le agrega la ruta base del sitio
function rutaImagen(src) {
  return src.startsWith('http') ? src : `${import.meta.env.BASE_URL}${src}`;
}

function TarjetaVideojuego({ juego, enCarrito, onAgregar, onEliminar }) {
  return (
    <article className="card h-100 shadow-sm tarjeta-juego">
      <img src={rutaImagen(juego.imagen)} className="card-img-top" alt={juego.nombre} />

      <div className="card-body d-flex flex-column">
        <span className="badge bg-secondary align-self-start mb-2">{juego.categoria}</span>
        <h3 className="card-title h5">{juego.nombre}</h3>
        <p className="fw-bold text-success fs-5 mb-2">
          ${juego.precio.toLocaleString('es-CL')}
        </p>
        <p className="card-text small text-muted">{juego.descripcion}</p>

        <div className="mt-auto d-grid gap-2">
          <button
            className={`btn ${enCarrito ? 'btn-success' : 'btn-primary'}`}
            onClick={() => onAgregar(juego)}
            disabled={enCarrito}
          >
            {enCarrito ? '✓ En el carrito' : 'Agregar al carrito'}
          </button>
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={() => onEliminar(juego.id)}
          >
            Eliminar de la tienda
          </button>
        </div>
      </div>
    </article>
  );
}

export default TarjetaVideojuego;
