import React from "react";

const FundamentosTab = () => (
  <div className="p-4 border rounded bg-light shadow-sm">
    <h4 className="text-primary fw-bold mb-3">6.14 Ciclos anidados</h4>
    
    <p className="text-secondary leading-relaxed">
      Un ciclo anidado consiste en colocar un ciclo dentro de otro ciclo. Esto permite repetir un conjunto de instrucciones en varias dimensiones, donde cada repetición del ciclo externo ejecuta completamente el ciclo interno.
    </p>

    <p className="text-secondary leading-relaxed">
      Son utilizados frecuentemente para trabajar con estructuras organizadas en filas y columnas, como tablas y matrices.
    </p>

    <div className="card mb-3 border-0 bg-white shadow-sm p-3">
      <h5 className="text-primary fw-bold mb-2">6.14.1 Ciclo for dentro de for: Generación de tablas</h5>
      <pre className="bg-dark text-white p-2 font-monospace rounded mb-1">
<code>{`for fila in range(1, 4):
    for columna in range(1, 4):
        print(fila, columna)`}</code>
      </pre>
      <p className="small text-muted mb-0"><strong>Salida:</strong> 1 1, 1 2, 1 3, 2 1, 2 2, 2 3, 3 1, 3 2, 3 3.</p>
    </div>

    <div className="card mb-3 border-0 bg-white shadow-sm p-3">
      <h5 className="text-success fw-bold mb-2">6.14.2 Aplicaciones con matrices en Análisis Numérico</h5>
      <pre className="bg-dark text-white p-2 font-monospace rounded mb-2">
<code>{`import numpy as np

A = np.array(,
   ,
   
])

for i in range(3):
    for j in range(3):
        print(A[i, j])`}</code>
      </pre>
      <p className="small text-muted mb-0">La variable <code>i</code> representa la fila y la variable <code>j</code> representa la columna.</p>
    </div>

    <div className="card mb-3 border-0 bg-white shadow-sm p-3">
      <h6 className="fw-bold text-dark mb-2">Aplicaciones principales de los ciclos anidados:</h6>
      <ul className="mb-0">
        <li>Recorrido y manipulación de matrices y arreglos bidimensionales.</li>
        <li>Generación y formateo de tablas de datos numéricos.</li>
        <li>Operaciones matriciales (multiplicación clásica $O(n^3)$, eliminación gaussiana).</li>
        <li>Comparación de elementos dentro de una colección.</li>
        <li>Procesamiento de imágenes y datos organizados en mallas espaciales.</li>
      </ul>
    </div>

    <div className="alert alert-warning mb-0">
      <h6 className="fw-bold mb-1">⚡ Optimización NumPy:</h6>
      <p className="mb-0 small">
        En matrices muy grandes, sustituye los ciclos anidados por operaciones vectorizadas de NumPy (como <code>np.dot()</code>, <code>np.sum(A, axis=0)</code> o <em>broadcasting</em>) para lograr mayor velocidad de ejecución.
      </p>
    </div>
  </div>
);

export default FundamentosTab;