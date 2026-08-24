import React from "react";

const FundamentosTab = () => (
  <div className="p-4 border rounded bg-light shadow-sm">
    <h4 className="text-primary fw-bold mb-3">6.8 Funciones range() y numpy.arange() como apoyo al ciclo FOR</h4>
    
    <p className="text-secondary leading-relaxed">
      La función <code>range()</code> es una herramienta incorporada en Python que permite generar secuencias de números enteros para controlar el número de iteraciones en un ciclo <code>for</code>.
    </p>

    <p className="text-secondary leading-relaxed">
      Por otra parte, la función <code>numpy.arange()</code> ofrece una funcionalidad similar, pero con la ventaja de permitir trabajar con <strong>números reales o de punto flotante</strong>, lo que la convierte en una herramienta fundamental para generar mallas de valores y discretizaciones.
    </p>

    <div className="card mb-3 border-0 bg-white shadow-sm p-3">
      <h5 className="text-primary fw-bold mb-2">6.8.1 Función range()</h5>
      <p className="text-muted small">Sintaxis: <code>range(inicio, fin, paso)</code> (el valor <em>fin</em> no se incluye).</p>
      
      <pre className="bg-dark text-white p-2 font-monospace rounded mb-2">
<code>{`# Ejemplo 1:
for i in range(1, 4):
    print(i)
# Salida: 1, 2, 3

# Ejemplo 2 con paso 2:
for i in range(0, 10, 2):
    print(i)
# Salida: 0, 2, 4, 6, 8`}</code>
      </pre>
    </div>

    <div className="card mb-3 border-0 bg-white shadow-sm p-3">
      <h5 className="text-success fw-bold mb-2">6.8.2 Función numpy.arange()</h5>
      <p className="text-muted small">Sintaxis: <code>numpy.arange(inicio, fin, paso)</code>. Devuelve directamente un arreglo NumPy.</p>
      
      <pre className="bg-dark text-white p-2 font-monospace rounded mb-0">
<code>{`import numpy as np

valores = np.arange(0, 10, 2)
print(valores)
# Salida: [0 2 4 6 8]`}</code>
      </pre>
    </div>

    <div className="alert alert-info mb-0">
      <h6 className="fw-bold mb-1">💡 Diferencia clave:</h6>
      <p className="mb-0 small">
        <code>range()</code> genera generadores enteros en memoria fija, mientras que <code>np.arange()</code> genera arreglos continuos en memoria preparados para operaciones vectorizadas.
      </p>
    </div>
  </div>
);

export default FundamentosTab;