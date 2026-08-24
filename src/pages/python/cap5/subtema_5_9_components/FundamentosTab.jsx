import React from "react";

const FundamentosTab = () => (
  <div className="p-4 border rounded bg-light shadow-sm">
    <h4 className="text-primary fw-bold mb-3">5.9 Consulta de características de un arreglo</h4>
    
    <p className="text-secondary leading-relaxed">
      Una vez creado un arreglo, con frecuencia es necesario conocer sus características para verificar que su estructura es la adecuada antes de realizar operaciones matemáticas o de procesamiento de datos. NumPy proporciona diversas propiedades informativas que <strong>no modifican el arreglo</strong>:
    </p>

    <div className="card mb-3 bg-dark text-white p-3 font-monospace rounded">
      <code>import numpy as np</code><br /><br />
      <code>A = np.array(,</code><br />
      <code>&nbsp;&nbsp;&nbsp;&nbsp;,</code><br />
      <code>&nbsp;&nbsp;&nbsp;&nbsp;[7, 8, 9]</code><br />
      <code>])</code>
    </div>

    <div className="row g-3 mb-3">
      <div className="col-md-4">
        <div className="card border-0 bg-white shadow-sm p-3 h-100">
          <h5 className="text-primary fw-bold">5.9.1 ndim</h5>
          <p className="small text-muted mb-2">Devuelve el número de dimensiones (o ejes) del arreglo.</p>
          <code className="d-block bg-dark text-white p-2 rounded font-monospace">A.ndim  # Resultado: 2</code>
          <p className="small text-muted mt-2 mb-0">Indica que A es un arreglo bidimensional (matriz con filas y columnas).</p>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card border-0 bg-white shadow-sm p-3 h-100">
          <h5 className="text-success fw-bold">5.9.2 shape</h5>
          <p className="small text-muted mb-2">Devuelve una tupla con el número de elementos en cada dimensión.</p>
          <code className="d-block bg-dark text-white p-2 rounded font-monospace">A.shape  # Resultado: (3, 3)</code>
          <p className="small text-muted mt-2 mb-0">Corresponde a una matriz cuadrada de orden 3&times;3.</p>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card border-0 bg-white shadow-sm p-3 h-100">
          <h5 className="text-info fw-bold">5.9.3 size</h5>
          <p className="small text-muted mb-2">Devuelve el número total de elementos almacenados.</p>
          <code className="d-block bg-dark text-white p-2 rounded font-monospace">A.size  # Resultado: 9</code>
          <p className="small text-muted mt-2 mb-0">Indica que el arreglo contiene 9 elementos en total.</p>
        </div>
      </div>
    </div>

    <div className="alert alert-info mb-0">
      <h6 className="fw-bold mb-1">💡 Validación de Compatibilidad Dimensional:</h6>
      <p className="mb-0 small">
        Antes de realizar una multiplicación matricial <code>A @ B</code>, valida siempre que <code>A.shape == B.shape[0]</code> para evitar excepciones de dimensión no compatible.
      </p>
    </div>
  </div>
);

export default FundamentosTab;