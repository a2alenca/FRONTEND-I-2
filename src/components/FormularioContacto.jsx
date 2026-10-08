import { useState } from 'react';

const FORM_INICIAL = { nombre: '', email: '', mensaje: '' };

// Formulario de contacto con validación antes de enviar
function FormularioContacto() {
  const [datos, setDatos] = useState(FORM_INICIAL);
  const [errores, setErrores] = useState({});
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
    setEnviado(false);
  };

  // Revisa cada campo y guarda un mensaje de error si algo está mal
  const validar = () => {
    const nuevos = {};
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (datos.nombre.trim().length < 3) {
      nuevos.nombre = 'El nombre debe tener al menos 3 caracteres.';
    }
    if (!datos.email.trim()) {
      nuevos.email = 'El correo es obligatorio.';
    } else if (!emailValido.test(datos.email.trim())) {
      nuevos.email = 'Ingresa un correo válido (ej: nombre@correo.com).';
    }
    if (datos.mensaje.trim().length < 10) {
      nuevos.mensaje = 'El mensaje debe tener al menos 10 caracteres.';
    }
    return nuevos;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevos = validar();
    setErrores(nuevos);

    // Si hay errores no se envía
    if (Object.keys(nuevos).length > 0) {
      setEnviado(false);
      return;
    }

    // Aquí iría el envío real al servidor (no incluido en esta evaluación)
    setEnviado(true);
    setDatos(FORM_INICIAL);
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="card card-body shadow-sm">
      {enviado && (
        <div className="alert alert-success" role="alert">
          ¡Mensaje enviado correctamente! Te responderemos pronto.
        </div>
      )}
      {Object.keys(errores).length > 0 && (
        <div className="alert alert-danger" role="alert">
          Revisa los campos marcados en rojo.
        </div>
      )}

      <div className="mb-3">
        <label htmlFor="contacto-nombre" className="form-label">Nombre</label>
        <input
          id="contacto-nombre"
          name="nombre"
          type="text"
          className={`form-control ${errores.nombre ? 'is-invalid' : ''}`}
          value={datos.nombre}
          onChange={handleChange}
        />
        <div className="invalid-feedback">{errores.nombre}</div>
      </div>

      <div className="mb-3">
        <label htmlFor="contacto-email" className="form-label">Email</label>
        <input
          id="contacto-email"
          name="email"
          type="email"
          className={`form-control ${errores.email ? 'is-invalid' : ''}`}
          value={datos.email}
          onChange={handleChange}
        />
        <div className="invalid-feedback">{errores.email}</div>
      </div>

      <div className="mb-3">
        <label htmlFor="contacto-mensaje" className="form-label">Mensaje</label>
        <textarea
          id="contacto-mensaje"
          name="mensaje"
          rows="4"
          className={`form-control ${errores.mensaje ? 'is-invalid' : ''}`}
          value={datos.mensaje}
          onChange={handleChange}
        ></textarea>
        <div className="invalid-feedback">{errores.mensaje}</div>
      </div>

      <button type="submit" className="btn btn-primary">Enviar mensaje</button>
    </form>
  );
}

export default FormularioContacto;
