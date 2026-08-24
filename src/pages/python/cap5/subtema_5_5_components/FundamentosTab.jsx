import React from "react";

const FundamentosTab = () => (
  <div className="p-4 border rounded bg-light shadow-sm">
    <h4 className="text-primary fw-bold mb-3">5.5 Selección de filas y columnas</h4>
    
    <p className="text-secondary leading-relaxed">
      En muchas aplicaciones de análisis numérico no es necesario trabajar con toda una matriz, sino únicamente con una fila o columna específica. NumPy permite realizar estas selecciones mediante el operador dos puntos (<code>:</code>).
    </p>

    <div className="card mb-3 border-0 bg-white shadow-sm p-3">
      <h5 className="text-primary fw-bold mb-2">Selección de una fila completa</h5>
      <p className="text-muted">Se indica el número de renglón y en la sección de columnas agregamos dos puntos para seleccionar todas las columnas:</p>
      <div className="bg-dark text-white p-2 font-monospace rounded mb-2">
        <code>fila = A</code><br />
        <code>print(fila)</code>
      </div>
      <p className="small text-success mb-0"><strong>Resultado:</strong> <code>[4 5 6]</code></p>
    </div>

    <div className="card mb-3 border-0 bg-white shadow-sm p-3">
      <h5 className="text-warning fw-bold text-dark mb-2">Selección de una columna completa</h5>
      <p className="text-muted">En este caso se utilizan los dos puntos en la zona de renglones y se especifica el índice de la columna:</p>
      <div className="bg-dark text-white p-2 font-monospace rounded mb-2">
        <code>columna = A</code><br />
        <code>print(columna)</code>
      </div>
      <p className="small text-success mb-0"><strong>Resultado:</strong> <code>[10  5  8]</code></p>
    </div>

    <div className="alert alert-info mb-0">
      <h6 className="fw-bold mb-1">💡 Uso en Sistemas de Ecuaciones:</h6>
      <p className="mb-0 small">
        Al construir matrices aumentadas $[A|b]$, <code>A[:, -1]</code> selecciona el vector de términos independientes $b$, mientras que <code>A[:, :-1]</code> aísla la matriz de coeficientes $A$.
      </p>
    </div>
  </div>
);

export default FundamentosTab;