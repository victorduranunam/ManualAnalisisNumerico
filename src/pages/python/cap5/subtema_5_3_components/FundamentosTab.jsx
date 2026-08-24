import React from "react";

const FundamentosTab = () => (
  <div className="p-4 border rounded bg-light shadow-sm">
    <h4 className="text-primary fw-bold mb-3">5.3 Acceso a elementos de matrices</h4>
    
    <p className="text-secondary leading-relaxed">
      Una matriz puede representarse mediante un arreglo de dos dimensiones, donde los datos se organizan en filas y columnas.
    </p>

    <p className="text-secondary leading-relaxed">
      Para acceder a un elemento específico de una matriz es necesario indicar dos índices:
    </p>
    <ul>
      <li>El primer índice corresponde a la <strong>fila</strong>.</li>
      <li>El segundo índice corresponde a la <strong>columna</strong>.</li>
    </ul>

    <div className="card mb-3 border-0 shadow-sm">
      <div className="card-header bg-dark text-white font-monospace small">
        Python / NumPy - Acceso en 2D
      </div>
      <pre className="bg-dark text-white p-3 mb-0 font-monospace rounded-bottom">
<code>{`import numpy as np

# Creación de una matriz de orden 3x3:
A = np.array(,
   ,
    [7, 8, 9]
])

# Para obtener el valor en la segunda fila (índice 1) y tercera columna (índice 2):
valor = A
print("Valor obtenido:", valor)`}</code>
      </pre>
    </div>

    <div className="alert alert-secondary py-2 mb-3">
      <strong>Resultado:</strong> <code>6</code>
    </div>

    <p className="text-secondary leading-relaxed">
      Es importante recordar que tanto las filas como las columnas comienzan a numerarse desde cero.
    </p>

    <div className="alert alert-info mb-0">
      <h6 className="fw-bold mb-1">💡 Notación Matricial:</h6>
      <p className="mb-0 small">
        La notación matemática estándar <em>a<sub>ij</sub></em> (fila <em>i</em>, columna <em>j</em>) se mapea directamente en Python como <code>A[i-1, j-1]</code> debido a la indexación base cero.
      </p>
    </div>
  </div>
);

export default FundamentosTab;