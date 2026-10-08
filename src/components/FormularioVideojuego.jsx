import { useState } from 'react';

const FORM_INICIAL = {
  nombre: '',
  categoria: '',
  precio: '',
  descripcion: '',
  imagen: '',
};

// Formulario para agregar un videojuego nuevo a la lista
// props: onAgregar 
function FormularioVideojuego({ onAgregar }) {
  const [datos, setDatos] = useState(FORM_INICIAL);
  const [errores, setErrores] = useState({});
  const [exito, setExito] = useState(false);

  const handleChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
    setExito(false);
  };

  // Valida los campos y devuelve un objeto con los errores
  const validar = () => {
    const nuevos = {};
    if (datos.nombre.trim().length < 2) nuevos.nombre = 'Ingresa el nombre del juego.';
    if (datos.categoria.trim().length < 3) nuevos.categoria = 'Ingresa una categoría.';
    if (!datos.precio || Number(datos.precio) <= 0) nuevos.precio = 'Ingresa un precio mayor a 0.';
    if (datos.descripcion.trim().length < 10) nuevos.descripcion = 'La descripción debe tener al menos 10 caracteres.';
    return nuevos;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevos = validar();
    setErrores(nuevos);
    if (Object.keys(nuevos).length > 0) return;

    onAgregar({
      nombre: datos.nombre.trim(),
      categoria: datos.categoria.trim(),
      precio: Number(datos.precio),
      descripcion: datos.descripcion.trim(),
      // Si no se indica imagen se usa el logo de la tienda
      imagen: datos.imagen.trim() || 'img/logo.png',
    });
    setDatos(FORM_INICIAL);
    setExito(true);
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="card card-body shadow-sm">
      {exito && (
        <div className="alert alert-success" role="alert">
          Videojuego agregado al catálogo.
        </div>
      )}

      <div className="row g-3">
        <div className="col-md-6">
          <label htmlFor="juego-nombre" className="form-label">Nombre</label>
          <input
            id="juego-nombre"
            name="nombre"
            type="text"
            className={`form-control ${errores.nombre ? 'is-invalid' : ''}`}
            value={datos.nombre}
            onChange={handleChange}
          />
          <div className="invalid-feedback">{errores.nombre}</div>
        </div>

        <div className="col-md-6">
          <label htmlFor="juego-categoria" className="form-label">Categoría</label>
          <input
            id="juego-categoria"
            name="categoria"
            type="text"
            placeholder="Ej: Acción, RPG, Deportes"
            className={`form-control ${errores.categoria ? 'is-invalid' : ''}`}
            value={datos.categoria}
            onChange={handleChange}
          />
          <div className="invalid-feedback">{errores.categoria}</div>
        </div>

        <div className="col-md-6">
          <label htmlFor="juego-precio" className="form-label">Precio (CLP)</label>
          <input
            id="juego-precio"
            name="precio"
            type="number"
            min="0"
            className={`form-control ${errores.precio ? 'is-invalid' : ''}`}
            value={datos.precio}
            onChange={handleChange}
          />
          <div className="invalid-feedback">{errores.precio}</div>
        </div>

        <div className="col-md-6">
          <label htmlFor="juego-imagen" className="form-label">URL de imagen (opcional)</label>
          <input
            id="juego-imagen"
            name="imagen"
            type="url"
            placeholder="https://..."
            className="form-control"
            value={datos.imagen}
            onChange={handleChange}
          />
        </div>

        <div className="col-12">
          <label htmlFor="juego-descripcion" className="form-label">Descripción</label>
          <textarea
            id="juego-descripcion"
            name="descripcion"
            rows="3"
            className={`form-control ${errores.descripcion ? 'is-invalid' : ''}`}
            value={datos.descripcion}
            onChange={handleChange}
          ></textarea>
          <div className="invalid-feedback">{errores.descripcion}</div>
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary">Agregar videojuego</button>
        </div>
      </div>
    </form>
  );
}

export default FormularioVideojuego;
