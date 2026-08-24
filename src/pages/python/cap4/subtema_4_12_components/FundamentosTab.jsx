import React from "react";

const FundamentosTab = () => (
  <div className="p-4 border rounded bg-light shadow-sm">
    <h4 className="text-primary fw-bold mb-3">4.12 Creación de arreglos inicializados</h4>
    
    <p className="text-secondary leading-relaxed">
      En muchas aplicaciones de análisis numérico es necesario crear arreglos antes de realizar los cálculos correspondientes (preasignación de memoria). Por ejemplo: generar matrices de ceros para acumular iteraciones, estructuras con valores constantes o matrices especiales.
    </p>

    <div className="table-responsive mb-3">
      <table className="table table-bordered bg-white table-sm">
        <thead className="table-primary">
          <tr>
            <th>Función</th>
            <th>Sintaxis general</th>
            <th>Ejemplo de código</th>
            <th>Resultado en consola</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>zeros()</strong> (4.12.1)</td>
            <td><code>np.zeros(dim)</code></td>
            <td><code>np.zeros((2, 3))</code></td>
            <td><code>[[0. 0. 0.], [0. 0. 0.]]</code></td>
          </tr>
          <tr>
            <td><strong>ones()</strong> (4.12.2)</td>
            <td><code>np.ones(dim)</code></td>
            <td><code>np.ones((2, 3))</code></td>
            <td><code>[[1. 1. 1.], [1. 1. 1.]]</code></td>
          </tr>
          <tr>
            <td><strong>full()</strong> (4.12.3)</td>
            <td><code>np.full(dim, val)</code></td>
            <td><code>np.full((3, 3), 5)</code></td>
            <td><code>[[5 5 5], [5 5 5], [5 5 5]]</code></td>
          </tr>
          <tr>
            <td><strong>eye()</strong> (4.12.4)</td>
            <td><code>np.eye(N)</code></td>
            <td><code>np.eye(3)</code></td>
            <td><code>[[1. 0. 0.], [0. 1. 0.], [0. 0. 1.]]</code></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div className="card mb-3 border-0 bg-white shadow-sm p-3">
      <h5 className="text-dark fw-bold mb-2">4.12.5 Selección del tipo de dato del arreglo (dtype)</h5>
      <p className="text-muted mb-2">
        Por defecto, NumPy genera arreglos de tipo flotante (<code>float64</code>). Es posible forzar el tipo entero o complejo mediante el parámetro <code>dtype</code>:
      </p>
      <div className="bg-dark text-white p-2 font-monospace rounded mb-2">
        <code>A = np.zeros((2, 3), dtype=int)</code><br />
        <code>print(A)</code>
      </div>
      <p className="small text-muted mb-0">
        <strong>Resultado:</strong> <code>[[0 0 0], [0 0 0]]</code> (sin puntos decimales).
      </p>
    </div>

    <div className="card mb-3 border-0 bg-white shadow-sm p-3">
      <h5 className="text-dark fw-bold mb-2">4.12.6 Importancia en análisis numérico</h5>
      <ul className="mb-0">
        <li>Crear vectores donde se almacenarán resultados de una iteración.</li>
        <li>Generar matrices de coeficientes para sistemas de ecuaciones lineales.</li>
        <li>Inicializar valores utilizados en métodos numéricos.</li>
        <li>Crear matrices identidad para pivoteo e inversión de matrices.</li>
      </ul>
    </div>

    <div className="alert alert-success mb-0">
      <h6 className="fw-bold mb-1">💡 Rendimiento de Memoria:</h6>
      <p className="mb-0 small">
        Preasignar arreglos de tamaño fijo con <code>np.zeros()</code> antes de iniciar ciclos iterativos es la práctica recomendada para maximizar la velocidad de cómputo y evitar la fragmentación de la memoria RAM.
      </p>
    </div>
  </div>
);

export default FundamentosTab;