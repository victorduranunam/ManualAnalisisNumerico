import React from "react";

const FundamentosTab = () => (
  <div className="p-4 border rounded bg-light shadow-sm">
    <h4 className="text-primary fw-bold mb-3">6.11 Función enumerate() para Recorrido con Índices</h4>
    
    <p className="text-secondary lh-base">
      La función integrada <code>enumerate()</code> de Python permite iterar sobre una secuencia obteniendo al mismo tiempo el <strong>índice de posición</strong> y el <strong>valor del elemento</strong> en cada paso.
    </p>

    <p className="text-secondary lh-base">
      Esto simplifica la escritura del código al evitar contadores manuales (como <code>i += 1</code>) o llamadas repetitivas a <code>range(len(...))</code>.
    </p>

    {/* Sintaxis */}
    <div className="card mb-3 border-0 bg-white shadow-sm p-3">
      <h6 className="fw-bold text-dark mb-1">Sintaxis:</h6>
      <pre className="bg-dark text-white p-2 font-monospace rounded mb-2">
<code>{`for indice, valor in enumerate(secuencia, start=0):
    # Instrucciones usando indice y valor`}</code>
      </pre>
      <ul className="small text-muted mb-0">
        <li><code>indice</code>: variable con la posición numérica (0, 1, 2...).</li>
        <li><code>valor</code>: variable con el elemento actual de la secuencia.</li>
        <li><code>start</code> (opcional): valor con el que inicia el índice (por defecto 0).</li>
      </ul>
    </div>

    {/* Ejemplo de Código */}
    <div className="card mb-3 bg-dark text-white p-3 font-monospace rounded">
      <div className="text-white-50 mb-1 small"># Ejemplo: Registro de aproximaciones con número de iteración</div>
      <pre className="mb-0 text-white bg-transparent border-0 p-0">
<code>{`aproximaciones = [2.0, 1.5, 1.41666, 1.41421]

print("Historial de iteraciones:")
for paso, valor in enumerate(aproximaciones, start=1):
    print("Paso", paso, "-> x =", valor)`}</code>
      </pre>
    </div>

    {/* Salida */}
    <div className="alert alert-secondary py-2 mb-3">
      <strong>Salida:</strong><br />
      <code>Historial de iteraciones:</code><br />
      <code>Paso 1 -&gt; x = 2.0</code><br />
      <code>Paso 2 -&gt; x = 1.5</code><br />
      <code>Paso 3 -&gt; x = 1.41666</code><br />
      <code>Paso 4 -&gt; x = 1.41421</code>
    </div>

    {/* Uso en Métodos Numéricos */}
    <div className="alert alert-info mb-0">
      <h6 className="fw-bold mb-1">💡 Uso en Métodos Numéricos:</h6>
      <p className="mb-0 small">
        Es ideal para construir tablas de iteraciones y almacenar el historial de convergencia en métodos de raíces, sistemas de ecuaciones o cálculo de errores paso a paso.
      </p>
    </div>
  </div>
);

export default FundamentosTab;