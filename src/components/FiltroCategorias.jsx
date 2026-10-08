// Botones para filtrar por categoría
// props: categorias, categoriaActiva, onCambiar
function FiltroCategorias({ categorias, categoriaActiva, onCambiar }) {
  return (
    <div className="filtros mb-4" role="group" aria-label="Filtrar por categoría">
      {categorias.map((cat) => (
        <button
          key={cat}
          type="button"
          className={`btn ${categoriaActiva === cat ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => onCambiar(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

export default FiltroCategorias;
