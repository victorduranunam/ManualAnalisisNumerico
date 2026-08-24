import React from "react";

const FundamentosTab = () => (
  <div className="p-4 border rounded bg-light shadow-sm">
    <h4 className="text-primary fw-bold mb-3">5.2 Modificación de elementos en arreglos</h4>
    
    <p className="text-secondary leading-relaxed">
      Una característica importante de los arreglos de NumPy es que sus elementos pueden modificarse después de haber sido creados. Para cambiar un valor se indica la posición del elemento que se desea modificar y se asigna un nuevo valor.
    </p>

    <div className="card mb-3 bg-dark text-white p-3 font-monospace rounded">
      <div className="text-muted mb-1"># Ejemplo: Modificación del primer elemento</div>
      <code>import numpy as np</code><br />
      <code>temperaturas = np.array([22.5, 23.1, 24.0, 22.8])</code><br /><br />
      <span className="text-muted"># Asignación del nuevo valor en la posición 0:</span><br />
      <code>temperaturas[0] = 25.0</code><br />
      <code>print("Arreglo modificado:", temperaturas)</code>
    </div>

    <div className="alert alert-secondary py-2 mb-3">
      <strong>Resultado:</strong> <code>[25.  23.1 24.  22.8]</code>
    </div>

    <p className="text-secondary leading-relaxed">
      En este ejemplo únicamente se modifica el primer valor del arreglo, mientras que los demás elementos permanecen sin cambios. Esta operación es muy utilizada en análisis numérico, ya que muchos algoritmos actualizan valores durante un proceso de cálculo iterativo.
    </p>

    <div className="alert alert-warning mb-0">
      <h6 className="fw-bold mb-1">⚠️ Tipo de dato homogéneo:</h6>
      <p className="mb-0 small">
        Si intentas asignar un valor de tipo texto o una estructura incompatible a una posición de un arreglo numérico, NumPy arrojará un error de conversión (<code>ValueError</code>), ya que los arreglos de NumPy requieren homogeneidad de tipo en memoria.
      </p>
    </div>
  </div>
);

export default FundamentosTab;