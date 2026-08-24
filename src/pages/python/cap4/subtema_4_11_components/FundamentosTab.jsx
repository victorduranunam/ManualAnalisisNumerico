import React from "react";

const FundamentosTab = () => (
  <div className="p-4 border rounded bg-light shadow-sm">
    <h4 className="text-primary fw-bold mb-3">4.11 Generación de secuencias numéricas</h4>
    
    <p className="text-secondary leading-relaxed">
      En análisis numérico es común trabajar con conjuntos de valores que representan puntos dentro de un intervalo determinado para evaluar una función matemática, construir una gráfica, realizar aproximaciones o aplicar métodos numéricos.
    </p>

    <p className="text-secondary leading-relaxed">
      NumPy proporciona funciones para generar secuencias numéricas automáticamente: <code>arange()</code> y <code>linspace()</code>.
    </p>

    <div className="card mb-3 border-0 bg-white shadow-sm p-3">
      <h5 className="text-dark fw-bold mb-2">4.11.1 Generación con incremento constante mediante arange()</h5>
      <p className="text-muted mb-2">
        Sintaxis: <code>np.arange(inicio, final, incremento)</code> donde <em>inicio</em> es el primer valor, <em>final</em> es el límite superior (no se incluye) e <em>incremento</em> es la separación entre valores.
      </p>
      <div className="bg-dark text-white p-2 font-monospace rounded mb-2">
        <code>import numpy as np</code><br />
        <code>x = np.arange(0, 10, 2)     # Salida: [0 2 4 6 8]</code><br />
        <code>x_dec = np.arange(0, 1, 0.1) # Salida: [0.  0.1 0.2 ... 0.9]</code><br />
        <code>x_trig = np.arange(0, 2*np.pi, 0.1) # Dominio [0, 2pi)</code>
      </div>
    </div>

    <div className="card mb-3 border-0 bg-white shadow-sm p-3">
      <h5 className="text-dark fw-bold mb-2">4.11.2 Valores uniformemente distribuidos mediante linspace()</h5>
      <p className="text-muted mb-2">
        Sintaxis: <code>np.linspace(inicio, final, cantidad)</code>. Controla la cantidad exacta de puntos a generar dentro del intervalo cerrado [inicio, final].
      </p>
      <div className="bg-dark text-white p-2 font-monospace rounded mb-2">
        <code>x = np.linspace(0, 10, 5)     # Salida: [ 0.   2.5  5.   7.5 10. ]</code><br />
        <code>x_100 = np.linspace(0, 2*np.pi, 100) # 100 puntos en [0, 2pi]</code>
      </div>
      <p className="small text-muted mb-0">
        <strong>Diferencia principal:</strong> <code>arange()</code> controla la separación entre valores, mientras que <code>linspace()</code> controla la cantidad total de valores generados.
      </p>
    </div>

    <div className="card mb-3 border-0 bg-white shadow-sm p-3">
      <h5 className="text-dark fw-bold mb-2">4.11.3 Generación de secuencias decrecientes</h5>
      <p className="text-muted mb-2">Utilizando un incremento negativo en <code>arange()</code>:</p>
      <div className="bg-dark text-white p-2 font-monospace rounded">
        <code>x_rev = np.arange(10, 0, -2)</code><br />
        <code>print(x_rev)  # Salida: [10  8  6  4  2]</code>
      </div>
    </div>

    <div className="card mb-3 border-0 bg-white shadow-sm p-3">
      <h5 className="text-dark fw-bold mb-2">4.11.4 Uso de secuencias en análisis numérico</h5>
      <ul className="mb-2">
        <li>Evaluación de funciones en un intervalo continuo.</li>
        <li>Generación de datos para gráficas de convergencia.</li>
        <li>Aproximación numérica de funciones y polinomios de interpolación.</li>
        <li>Métodos de integración (trapecio, Simpson) y diferenciación numérica.</li>
        <li>Simulación de fenómenos físicos temporales y espaciales.</li>
      </ul>
      <div className="bg-dark text-white p-2 font-monospace rounded">
        <code>x = np.linspace(0, 2*np.pi, 100)</code><br />
        <code>y = np.sin(x)  # Se evalúan los 100 puntos simultáneamente</code>
      </div>
    </div>

    <div className="alert alert-warning mb-0">
      <h6 className="fw-bold mb-1">⚠️ Regla de Oro:</h6>
      <p className="mb-0 small">
        Cuando requieras mallas con pasos decimales, prefiere siempre <code>np.linspace()</code> sobre <code>np.arange()</code> para evitar que la acumulación de errores de redondeo en flotantes modifique el número de elementos resultantes.
      </p>
    </div>
  </div>
);

export default FundamentosTab;