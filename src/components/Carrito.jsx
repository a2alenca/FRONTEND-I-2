// Carrito de compras
// props: items, onQuitar, onVaciar
function Carrito({ items, onQuitar, onVaciar }) {
  const total = items.reduce((suma, juego) => suma + juego.precio, 0);

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        {items.length === 0 ? (
          <p className="text-muted text-center my-3">El carrito está vacío.</p>
        ) : (
          <>
            <ul className="list-group mb-3">
              {items.map((juego) => (
                <li
                  key={juego.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <h3 className="h6 my-0">{juego.nombre}</h3>
                    <small className="text-muted">${juego.precio.toLocaleString('es-CL')}</small>
                  </div>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => onQuitar(juego.id)}
                    aria-label={`Quitar ${juego.nombre}`}
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>

            <div className="d-flex justify-content-between align-items-center">
              <strong>Total: ${total.toLocaleString('es-CL')}</strong>
              <button className="btn btn-outline-secondary btn-sm" onClick={onVaciar}>
                Vaciar carrito
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Carrito;
