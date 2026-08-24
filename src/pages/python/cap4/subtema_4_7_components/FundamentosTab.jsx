import React from "react";

const FundamentosTab = () => (
  <div className="p-4 border rounded bg-light shadow-sm">
    <h4 className="text-primary fw-bold mb-3">4.7 Tuplas</h4>
    
    <p className="text-secondary leading-relaxed">
      Las tuplas son estructuras de datos similares a las listas, ya que permiten almacenar varios valores dentro de una misma variable. La principal diferencia es que, una vez creada una tupla, <strong>sus elementos no pueden modificarse durante la ejecución del programa (inmutabilidad)</strong>.
    </p>

    <p className="text-secondary leading-relaxed">
      Esta característica hace que las tuplas sean útiles cuando se desea almacenar información que debe permanecer constante, como coordenadas, parámetros de un problema o grupos de valores relacionados. Se definen utilizando paréntesis <code>()</code>.
    </p>

    <div className="card mb-3 bg-dark text-white p-3 font-monospace rounded">
      <code>punto = (3, 5)</code><br />
      <code>x = punto[0]</code><br />
      <code>y = punto</code><br />
      <code>print("x:", x)</code><br />
      <code>print("y:", y)</code>
    </div>

    <div className="alert alert-secondary py-2 mb-3">
      <strong>Salida:</strong><br />
      <code>x: 3</code><br />
      <code>y: 5</code>
    </div>

    <div className="card mb-3 border-danger p-3 bg-white">
      <h6 className="text-danger fw-bold mb-2">Demostración de inmutabilidad:</h6>
      <p className="small text-muted mb-1">Si se intenta reasignar un valor:</p>
      <code className="text-dark bg-light p-2 rounded d-block font-monospace">
        punto[0] = 10  # Genera TypeError: 'tuple' object does not support item assignment
      </code>
    </div>

    <div className="alert alert-success mb-0">
      <h6 className="fw-bold mb-1">🛡️ Buenas Prácticas en Métodos Numéricos:</h6>
      <p className="mb-0 small">
        Usa tuplas para retornar múltiples resultados desde una función de análisis numérico:
        <code>return (raiz, iteraciones, error_final)</code> o para definir las dimensiones fijas de una malla (<code>shape = (100, 100)</code>).
      </p>
    </div>
  </div>
);

export default FundamentosTab;