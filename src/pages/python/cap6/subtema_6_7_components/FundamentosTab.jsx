import React from "react";

const FundamentosTab = () => (
  <div className="p-4 border rounded bg-light shadow-sm">
    <h4 className="text-primary fw-bold mb-3">6.7 Ciclo FOR</h4>
    
    <p className="text-secondary lh-base">
      En programación, una <strong>iteración</strong> consiste en ejecutar un conjunto de instrucciones de manera repetida, evitando escribir varias veces el mismo código.
    </p>

    <p className="text-secondary lh-base">
      El <strong>ciclo for</strong> se utiliza cuando se conoce la cantidad de repeticiones que se desean realizar o cuando se necesita recorrer los elementos de una secuencia (listas, cadenas de texto o arreglos). En cada repetición, una variable temporal toma el valor del elemento actual.
    </p>

    <div className="card mb-3 border-0 bg-white shadow-sm p-3">
      <h6 className="fw-bold text-dark mb-1">Sintaxis:</h6>
      <pre className="bg-dark text-white p-2 font-monospace rounded mb-2">
<code>{`for variable in secuencia:
    instrucciones`}</code>
      </pre>
      <ul className="small text-muted mb-0">
        <li><code>for</code>: palabra reservada que inicia el ciclo.</li>
        <li><code>variable</code>: variable temporal que toma el valor de cada elemento.</li>
        <li><code>in</code>: operador que indica el recorrido sobre la secuencia.</li>
        <li><code>secuencia</code>: conjunto de valores que serán recorridos.</li>
      </ul>
    </div>

    <div className="card mb-3 bg-dark text-white p-3 font-monospace rounded">
      <div className="text-white-50 mb-1 small"># Ejemplo básico con range(4):</div>
      <pre className="mb-0 text-white bg-transparent border-0 p-0">
<code>{`for i in range(4):
    print(i)`}</code>
      </pre>
    </div>

    <div className="alert alert-secondary py-2 mb-3">
      <strong>Salida:</strong><br />
      <code>0</code><br />
      <code>1</code><br />
      <code>2</code><br />
      <code>3</code>
    </div>

    <div className="alert alert-success mb-0">
      <h6 className="fw-bold mb-1">💡 Uso en Métodos Numéricos:</h6>
      <p className="mb-0 small">
        Se emplea cuando existe un número máximo acotado de pasos de cálculo, por ejemplo: evaluar una sumatoria <code>∑ f(xᵢ)</code> desde <code>i = 1</code> hasta <code>n</code> en la regla del trapecio compuesta.
      </p>
    </div>
  </div>
);

export default FundamentosTab;