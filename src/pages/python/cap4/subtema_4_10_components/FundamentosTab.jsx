import React from "react";

const FundamentosTab = () => (
  <div className="p-4 border rounded bg-light shadow-sm">
    <h4 className="text-primary fw-bold mb-3">4.10 Vectores y matrices</h4>
    
    <p className="text-secondary leading-relaxed">
      En muchos problemas de ingeniería y análisis numérico es necesario trabajar con conjuntos organizados de datos. Estos conjuntos pueden representarse mediante vectores y matrices:
    </p>

    <div className="row g-3 mb-3">
      <div className="col-md-6">
        <div className="p-3 border rounded bg-white h-100">
          <h5 className="text-primary fw-bold">Vector (1D)</h5>
          <p className="small text-muted">Corresponde a un arreglo de una sola dimensión para secuencias ordenadas de valores.</p>
          <div className="bg-dark text-white p-2 font-monospace rounded">
            <code>v = np.array()</code><br />
            <code>print("Vector:\n", v)</code>
          </div>
        </div>
      </div>

      <div className="col-md-6">
        <div className="p-3 border rounded bg-white h-100">
          <h5 className="text-success fw-bold">Matriz (2D)</h5>
          <p className="small text-muted">Arreglo bidimensional donde los datos se organizan mediante filas y columnas.</p>
          <div className="bg-dark text-white p-2 font-monospace rounded">
            <code>A = np.array(,</code><br />
            <code>&nbsp;&nbsp;&nbsp;&nbsp;</code><br />
            <code>])</code><br />
            <code>print("Matriz:\n", A)</code>
          </div>
        </div>
      </div>
    </div>

    <p className="text-secondary leading-relaxed">
      Las matrices tienen una gran importancia dentro del análisis numérico, ya que muchos métodos matemáticos se expresan mediante operaciones matriciales, tales como la solución de sistemas de ecuaciones lineales (<em>Ax = b</em>), métodos iterativos (Jacobi, Gauss-Seidel) y transformaciones matriciales.
    </p>

    <div className="alert alert-info mb-0">
      <h6 className="fw-bold mb-1">💡 Multiplicación Matricial:</h6>
      <p className="mb-0 small">
        Recuerda que <code>A * B</code> realiza multiplicación elemento a elemento (producto de Hadamard). Para el producto algebraico matricial estándar utiliza el operador <code>@</code> (<code>C = A @ B</code>) o la función <code>np.dot(A, B)</code>.
      </p>
    </div>
  </div>
);

export default FundamentosTab;