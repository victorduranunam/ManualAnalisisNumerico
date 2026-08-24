import React from "react";

const FundamentosTab = () => (
  <div className="p-4 border rounded bg-light shadow-sm">
    <h4 className="text-primary fw-bold mb-3">5.4 Modificación de elementos en matrices</h4>
    
    <p className="text-secondary leading-relaxed">
      Al igual que los arreglos de una dimensión, las matrices permiten modificar sus valores indicando la posición mediante fila y columna.
    </p>

    <div className="card mb-3 bg-dark text-white p-3 font-monospace rounded">
      <code>import numpy as np</code><br /><br />
      <code>A = np.array(,</code><br />
      <code>&nbsp;&nbsp;&nbsp;&nbsp;,</code><br />
      <code>&nbsp;&nbsp;&nbsp;&nbsp;[7, 8, 9]</code><br />
      <code>])</code><br /><br />
      <span className="text-muted"># Modificar el elemento de la primera fila y segunda columna:</span><br />
      <code>A = 10</code><br />
      <code>print("Matriz actualizada:\n", A)</code>
    </div>

    <div className="alert alert-secondary py-2 mb-3">
      <strong>Resultado:</strong><br />
      <pre className="mb-0 font-monospace">
{`[[ 1 10  3]
 [ 4  5  6]
 [ 7  8  9]]`}
      </pre>
    </div>

    <p className="text-secondary leading-relaxed">
      En este caso se modificó el elemento localizado en la primera fila y segunda columna.
    </p>

    <div className="alert alert-success mb-0">
      <h6 className="fw-bold mb-1">💡 Aplicación en Métodos Directos:</h6>
      <p className="mb-0 small">
        Esta operación es la base para la sustitución de coeficientes en la eliminación gaussiana al convertir una matriz cuadrada en una matriz triangular superior mediante combinaciones lineales de filas.
      </p>
    </div>
  </div>
);

export default FundamentosTab;