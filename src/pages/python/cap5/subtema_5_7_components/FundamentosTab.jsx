import React from "react";

const FundamentosTab = () => (
  <div className="p-4 border rounded bg-light shadow-sm">
    <h4 className="text-primary fw-bold mb-3">5.7 Extracción de submatrices</h4>
    
    <p className="text-secondary leading-relaxed">
      Una operación muy importante en análisis numérico es obtener una parte específica de una matriz, conocida como <strong>submatriz</strong>. NumPy permite realizar esta operación indicando los rangos de filas y columnas que se desean extraer.
    </p>

    <div className="card mb-3 border-0 bg-white shadow-sm p-3">
      <h6 className="fw-bold text-dark">Estructura utilizada:</h6>
      <code>matriz[fila_inicio:fila_final, columna_inicio:columna_final]</code>
    </div>

    <div className="card mb-3 bg-dark text-white p-3 font-monospace rounded">
      <code>import numpy as np</code><br /><br />
      <code>A = np.array(,</code><br />
      <code>&nbsp;&nbsp;&nbsp;&nbsp;,</code><br />
      <code>&nbsp;&nbsp;&nbsp;&nbsp;[7, 8, 9]</code><br />
      <code>])</code><br /><br />
      <span className="text-muted"># Extraer submatriz superior izquierda de 2x2:</span><br />
      <code>B = A[0:2, 0:2]</code><br />
      <code>print("Submatriz B:\n", B)</code>
    </div>

    <div className="alert alert-secondary py-2 mb-3">
      <strong>Resultado:</strong><br />
      <pre className="mb-0 font-monospace">
{`[[1 2]
 [4 5]]`}
      </pre>
    </div>

    <p className="text-secondary leading-relaxed">
      Esta operación es fundamental cuando se trabaja con bloques de matrices, descomposición en subespacios o sistemas donde solamente una parte de la información es requerida.
    </p>

    <div className="alert alert-success mb-0">
      <h6 className="fw-bold mb-1">💡 Uso en Factorización Matricial:</h6>
      <p className="mb-0 small">
        En algoritmos de factorización $LU$ y Cholesky, en cada paso $k$ se aísla la submatriz activa restante mediante <code>A[k:, k:]</code> para actualizar los pivotes.
      </p>
    </div>
  </div>
);

export default FundamentosTab;