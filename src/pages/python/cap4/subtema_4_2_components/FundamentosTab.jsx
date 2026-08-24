import React from "react";

const FundamentosTab = () => (
  <div className="p-4 border rounded bg-light shadow-sm">
    <h4 className="text-primary fw-bold mb-3">4.2 Números enteros</h4>
    
    <p className="text-secondary leading-relaxed">
      Los números enteros representan valores que no contienen una parte decimal. Son utilizados para representar cantidades discretas, como número de elementos, posiciones dentro de una estructura de datos o cantidad de iteraciones dentro de un proceso.
    </p>

    <div className="card mb-3 bg-dark text-white p-3 font-monospace rounded">
      <div className="text-muted mb-1"># Ejemplo: Asignación de una variable entera</div>
      <code>n = 10</code><br />
      <code>print("Valor:", n)</code><br />
      <code>print("Tipo:", type(n))</code>
    </div>

    <div className="alert alert-secondary py-2 mb-3">
      <strong>Salida:</strong><br />
      <code>Valor: 10</code><br />
      <code>Tipo: &lt;class 'int'&gt;</code>
    </div>

    <p className="text-secondary leading-relaxed">
      En este caso, la variable <code>n</code> almacena un valor entero que puede emplearse para controlar ciclos de repetición o dimensionar matrices.
    </p>

    <div className="alert alert-warning mb-0">
      <h6 className="fw-bold mb-1">⚡ Recomendación para Análisis Numérico:</h6>
      <p className="mb-0 small">
        En Python estándar, los enteros tienen precisión arbitraria y no desbordan. Sin embargo, al pasarlos a NumPy (<code>np.int32</code> o <code>np.int64</code>), ten presente los límites de rango si calculas potencias grandes o factoriales en series de Taylor.
      </p>
    </div>
  </div>
);

export default FundamentosTab;