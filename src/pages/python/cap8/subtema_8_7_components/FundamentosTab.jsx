import React from "react";

const Fundamentos8_7 = () => (
  <div className="p-3 border rounded bg-light">
    <div className="d-flex justify-content-between align-items-center mb-2">
      <h5 className="text-primary fw-bold mb-0">
        8.6 Uso de la Galería Oficial de Matplotlib
      </h5>
      <a
        href="https://matplotlib.org/stable/gallery/index.html"
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-sm btn-outline-primary"
      >
        Galería Oficial ↗
      </a>
    </div>

    <p className="text-secondary mb-3">
      En programación aplicada no es necesario memorizar cada parámetro de estilo. La mejor práctica consiste en reutilizar y adaptar plantillas de la documentación oficial.
    </p>

    <div className="border border-primary border-start border-3 bg-white p-3 rounded mb-3">
      <h6 className="fw-bold text-primary mb-2">Flujo de trabajo recomendado:</h6>
      <ol className="mb-0 ps-3 small text-secondary">
        <li className="mb-1">Ingresar a la Galería Oficial de Matplotlib y buscar visualmente el tipo de gráfico.</li>
        <li className="mb-1">Abrir el ejemplo deseado para ver su código fuente funcional.</li>
        <li className="mb-1">Copiar la estructura base a tu script de Python o entorno de desarrollo.</li>
        <li>Sustituir las variables de datos y nombres de ejes con los valores calculados por tu algoritmo numérico.</li>
      </ol>
    </div>

    <div className="mb-3">
      <h6 className="fw-bold text-dark mb-1">Estructura base:</h6>
      <pre className="bg-dark text-light p-3 rounded small mb-0 overflow-auto">
        <code>{`# Flujo de trabajo: Buscar -> Copiar -> Adaptar datos
# Únicamente se reemplazan los arreglos 'x' e 'y' con los resultados del algoritmo.`}</code>
      </pre>
    </div>

    <div className="alert alert-info py-2 px-3 mb-0 small">
      <strong>Nota práctica:</strong> Reutilizar código de la documentación oficial ahorra tiempo, previene errores sintácticos y produce figuras con calidad de publicación.
    </div>
  </div>
);

export default Fundamentos8_7;