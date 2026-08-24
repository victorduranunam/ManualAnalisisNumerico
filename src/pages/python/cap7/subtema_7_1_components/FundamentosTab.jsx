import React from "react";

const FundamentosTab = () => (
  <div className="p-4 border rounded bg-light shadow-sm">
    <h4 className="text-primary fw-bold mb-3">7.1 Concepto de Función</h4>
    
    <p className="text-secondary lh-base">
      En programación, una <strong>función</strong> es un bloque de código organizado y reutilizable que realiza una tarea específica. Las funciones permiten dividir un programa complejo en partes más pequeñas e independientes, facilitando su comprensión, mantenimiento y depuración.
    </p>

    <div className="card mb-3 border-0 bg-white shadow-sm p-3">
      <h6 className="fw-bold text-dark mb-2">Características principales de una función:</h6>
      <ul className="mb-0 text-secondary">
        <li><strong>Recibir datos:</strong> a través de parámetros o argumentos de entrada.</li>
        <li><strong>Procesar información:</strong> ejecutando operaciones lógicas y matemáticas.</li>
        <li><strong>Devolver un resultado:</strong> mediante un valor de retorno.</li>
        <li><strong>Reutilización:</strong> pueden ejecutarse múltiples veces desde distintos puntos del programa.</li>
      </ul>
    </div>

    {/* Ejemplo */}
    <div className="card mb-3 bg-dark text-white p-3 font-monospace rounded">
      <div className="text-white-50 mb-1 small"># Ejemplo: Llamada a una función incorporada</div>
      <pre className="mb-0 text-white bg-transparent border-0 p-0">
<code>{`# print() es una función que recibe un dato y lo muestra en pantalla
print("Hola Python")`}</code>
      </pre>
    </div>

    <div className="alert alert-secondary py-2 mb-3">
      <strong>Salida:</strong><br />
      <code>Hola Python</code>
    </div>

    <div className="alert alert-info mb-0">
      <h6 className="fw-bold mb-1">💡 Uso en Métodos Numéricos:</h6>
      <p className="mb-0 small">
        En métodos numéricos, las funciones permiten encapsular algoritmos completos (como el método de Bisección, Newton-Raphson o la Regla de Simpson) para aplicarlos sobre distintas funciones matemáticas sin reescribir el código.
      </p>
    </div>
  </div>
);

export default FundamentosTab;