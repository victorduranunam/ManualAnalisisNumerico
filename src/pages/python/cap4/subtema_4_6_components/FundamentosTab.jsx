import React from "react";

const FundamentosTab = () => (
  <div className="p-4 border rounded bg-light shadow-sm">
    <h4 className="text-primary fw-bold mb-3">4.6 Listas</h4>
    
    <p className="text-secondary leading-relaxed">
      Las listas son estructuras de datos que permiten almacenar varios valores dentro de una misma variable. Son una de las estructuras más utilizadas en Python debido a que permiten organizar información de manera sencilla y flexible.
    </p>

    <p className="text-secondary leading-relaxed">
      Una lista se define utilizando corchetes <code>[]</code> y separando sus elementos mediante comas. Cada elemento dentro de una lista ocupa una posición determinada denominada <strong>índice</strong>. En Python, el primer elemento siempre se encuentra en la posición cero.
    </p>

    <div className="card mb-3 bg-dark text-white p-3 font-monospace rounded">
      <code>temperaturas = [20, 21, 22, 23]</code><br />
      <code>temperatura_0 = temperaturas[0]</code><br />
      <code>print("Primer elemento:", temperatura_0)</code>
    </div>

    <div className="alert alert-secondary py-2 mb-3">
      <strong>Salida:</strong> <code>20</code>
    </div>

    <div className="card mb-3 border-0 bg-white shadow-sm p-3">
      <h5 className="text-dark fw-bold mb-2">4.6.1 Modificación de elementos en una lista</h5>
      <p className="text-muted">Los elementos pueden modificarse asignando un nuevo valor al índice correspondiente:</p>
      <div className="bg-dark text-white p-2 font-monospace rounded mb-2">
        <code>temperaturas[0] = 30</code><br />
        <code>print(temperaturas)</code>
      </div>
      <p className="mb-0 small text-success"><strong>Resultado:</strong> <code>[30, 21, 22, 23]</code> (el índice 0 fue reemplazado).</p>
    </div>

    <div className="card mb-3 border-0 bg-white shadow-sm p-3">
      <h5 className="text-dark fw-bold mb-2">4.6.2 Agregar elementos a una lista</h5>
      <p className="text-muted">Para incorporar información al final de una lista se utiliza el método <code>append()</code>:</p>
      <div className="bg-dark text-white p-2 font-monospace rounded mb-2">
        <code>temperaturas.append(24)</code><br />
        <code>print(temperaturas)</code>
      </div>
      <p className="mb-0 small text-success"><strong>Resultado:</strong> <code>[30, 21, 22, 23, 24]</code></p>
    </div>

    <div className="card mb-3 border-0 bg-white shadow-sm p-3">
      <h5 className="text-dark fw-bold mb-2">4.6.3 Eliminar elementos de una lista</h5>
      <p className="text-muted">Se puede eliminar por valor mediante <code>remove()</code> o por posición con <code>del</code>:</p>
      <div className="bg-dark text-white p-2 font-monospace rounded mb-2">
        <code>temperaturas.remove(21)  # Elimina el valor 21</code><br />
        <code>print(temperaturas)       # Salida: [30, 22, 23, 24]</code><br /><br />
        <code>del temperaturas[0]       # Elimina el índice 0</code><br />
        <code>print(temperaturas)       # Salida: [22, 23, 24]</code>
      </div>
    </div>

    <div className="alert alert-info mb-0">
      <h6 className="fw-bold mb-1">💡 Listas vs Arreglos NumPy:</h6>
      <p className="mb-0 small">
        Las listas son excelentes para recolectar datos dinámicos durante una ejecución. Sin embargo, para cálculo matricial intensivo y operaciones matemáticas vectoriales, siempre deben convertirse a arreglos NumPy (<code>np.array(temperaturas)</code>).
      </p>
    </div>
  </div>
);

export default FundamentosTab;