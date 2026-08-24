import React from "react";

const FundamentosTab = () => (
  <div className="p-4 border rounded bg-light shadow-sm">
    <h4 className="text-primary fw-bold mb-3">5.1 Acceso a elementos de arreglos unidimensionales</h4>
    
    <p className="text-secondary leading-relaxed">
      Los arreglos de una dimensión almacenan valores organizados en una secuencia ordenada. Cada elemento ocupa una posición determinada dentro del arreglo, conocida como <strong>índice</strong>.
    </p>

    <p className="text-secondary leading-relaxed">
      Al igual que ocurre con las listas de Python, los índices en NumPy comienzan en cero. Esto significa que el primer elemento de un arreglo se encuentra en la posición cero, el segundo en la posición uno y así sucesivamente.
    </p>

    <div className="card mb-3 bg-dark text-white p-3 font-monospace rounded">
      <div className="text-muted mb-1"># Ejemplo: Acceso mediante índice posicional</div>
      <code>import numpy as np</code><br />
      <code>temperaturas = np.array([22.5, 23.1, 24.0, 22.8])</code><br /><br />
      <span className="text-muted"># Para acceder al tercer elemento (índice 2):</span><br />
      <code>valor = temperaturas</code><br />
      <code>print("Valor obtenido:", valor)</code>
    </div>

    <div className="alert alert-secondary py-2 mb-3">
      <strong>Resultado:</strong> <code>24.0</code>
    </div>

    <p className="text-secondary leading-relaxed">
      En este caso, el índice dos permite obtener el tercer elemento almacenado dentro del arreglo.
    </p>

    <div className="alert alert-info mb-0">
      <h6 className="fw-bold mb-1">💡 Recomendación para Análisis Numérico:</h6>
      <p className="mb-0 small">
        En cálculo de diferencias finitas o esquemas temporales de integración, los índices suelen representar pasos discretos de tiempo o espacio: <code>t[i]</code> para el instante actual y <code>t[i+1]</code> para el siguiente paso.
      </p>
    </div>
  </div>
);

export default FundamentosTab;