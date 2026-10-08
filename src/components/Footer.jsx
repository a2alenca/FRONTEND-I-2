// Pie de página
function Footer() {
  return (
    <footer className="bg-dark text-light text-center py-4 mt-5">
      <div className="container">
        <p className="mb-1 fw-bold">GameStore</p>
        <small>
          © {new Date().getFullYear()} Tienda de Videojuegos · Evaluación Final Transversal ·
          Desarrollo Frontend I (PFY2201)
        </small>
      </div>
    </footer>
  );
}

export default Footer;
