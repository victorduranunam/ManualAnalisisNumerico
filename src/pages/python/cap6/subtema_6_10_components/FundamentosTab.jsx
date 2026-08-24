import React from "react";

const FundamentosTab = () => (
  <div className="p-4 border rounded bg-light shadow-sm">
    <h4 className="text-primary fw-bold mb-3">6.10 Recorrido de Arreglos Científicos (NumPy) con FOR</h4>
    
    <p className="text-secondary lh-base">
      En el análisis numérico, los arreglos de <strong>NumPy</strong> (<code>numpy.ndarray</code>) son la estructura principal para vectores y matrices. A diferencia de las listas nativas, almacenan datos numéricos contiguos y permiten iteración elemento a elemento o por posición de índice.
    </p>

    {/* Recorrido de Arreglo */}
    <div className="card mb-3 bg-dark text-white p-3 font-monospace rounded">
      <div className="text-success fw-bold mb-2"># Recorrido de un Arreglo NumPy</div>
      <pre className="mb-0 text-white bg-transparent border-0 p-0">
<code>{`import numpy as np

A = np.array([1.5, 2.5, 3.5, 4.5])

for valor in A:
    print(f"Valor: {valor}")`}</code>
      </pre>
    </div>

    {/* Salida esperada */}
    <div className="alert alert-secondary py-2 mb-3">
      <strong>Salida:</strong><br />
      <code>Valor: 1.5</code><br />
      <code>Valor: 2.5</code><br />
      <code>Valor: 3.5</code><br />
      <code>Valor: 4.5</code>
    </div>

    {/* Consejo de rendimiento */}
    <div className="alert alert-warning mb-3">
      <h6 className="fw-bold mb-1">⚡ Consejo de Rendimiento:</h6>
      <p className="mb-0 small">
        Si vas a aplicar una operación matemática a todos los elementos de un arreglo (por ejemplo calcular el seno), es mucho más rápido usar la <strong>función vectorizada</strong> <code>np.sin(A)</code> que recorrer el arreglo elemento a elemento con un ciclo <code>for</code>.
      </p>
    </div>

    {/* Uso en Métodos Numéricos */}
    <div className="alert alert-info mb-0">
      <h6 className="fw-bold mb-1">💡 Uso en Métodos Numéricos:</h6>
      <p className="mb-0 small">
        El recorrido con <code>for</code> sobre arreglos se reserva para algoritmos donde el paso actual depende estrictamente del resultado del paso anterior (como en métodos iterativos paso a paso o diferencias finitas).
      </p>
    </div>
  </div>
);

export default FundamentosTab;