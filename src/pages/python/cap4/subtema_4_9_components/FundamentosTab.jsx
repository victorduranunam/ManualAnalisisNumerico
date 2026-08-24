import React from "react";

const FundamentosTab = () => (
  <div className="p-4 border rounded bg-light shadow-sm">
    <h4 className="text-primary fw-bold mb-3">4.9 Arreglos mediante NumPy</h4>
    
    <p className="text-secondary leading-relaxed">
      Aunque las listas permiten almacenar conjuntos de datos, no están diseñadas específicamente para realizar operaciones matemáticas de gran escala.
    </p>

    <p className="text-secondary leading-relaxed">
      Para aplicaciones científicas y de análisis numérico se utiliza la biblioteca <strong>NumPy</strong>, la cual incorpora estructuras denominadas <strong>arreglos (<code>ndarray</code>)</strong>. Estas estructuras están optimizadas en C para trabajar con grandes cantidades de datos numéricos contiguos en memoria y permiten realizar operaciones matemáticas de manera eficiente.
    </p>

    <div className="card mb-3 bg-dark text-white p-3 font-monospace rounded">
      <code>import numpy as np</code><br /><br />
      <span className="text-muted"># Creación de un arreglo unidimensional:</span><br />
      <code>datos = np.array()</code><br /><br />
      <span className="text-muted"># Operación vectorizada directa sobre todos los elementos:</span><br />
      <code>datos = datos * 2</code><br />
      <code>print("Resultado:", datos)</code>
    </div>

    <div className="alert alert-secondary py-2 mb-3">
      <strong>Salida:</strong> <code>Resultado: [2 4 6 8]</code>
    </div>

    <p className="text-secondary leading-relaxed">
      Una ventaja fundamental de los arreglos de NumPy es la <strong>vectorización</strong>: la operación aritmética se aplica simultáneamente a todos los elementos sin necesidad de escribir ciclos <code>for</code> explícitos.
    </p>

    <div className="alert alert-success mb-0">
      <h6 className="fw-bold mb-1">🚀 Ventaja Computacional:</h6>
      <p className="mb-0 small">
        La vectorización en NumPy aprovecha instrucciones SIMD (<em>Single Instruction, Multiple Data</em>) del procesador, logrando ejecuciones decenas de veces más rápidas que las listas nativas de Python.
      </p>
    </div>
  </div>
);

export default FundamentosTab;