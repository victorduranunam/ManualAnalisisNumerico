import React from "react";

const FundamentosTab = () => (
  <div className="p-4 border rounded bg-light shadow-sm">
    <h4 className="text-primary fw-bold mb-3">6.5 Operadores de comparación</h4>
    
    <p className="text-secondary leading-relaxed">
      Las condiciones utilizadas en las estructuras de decisión y repetición se construyen mediante <strong>operadores de comparación</strong>. Estos operadores permiten comparar dos valores y determinar la relación existente entre ellos.
    </p>

    <p className="text-secondary leading-relaxed">
      El resultado de una comparación siempre es un valor lógico: <code>True</code> cuando la condición se cumple, o <code>False</code> cuando no se cumple.
    </p>

    <div className="table-responsive mb-3">
      <table className="table table-bordered bg-white table-sm">
        <thead className="table-primary">
          <tr>
            <th>Operador</th>
            <th>Descripción</th>
            <th>Ejemplo</th>
            <th>Resultado (si x = 5)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>==</code></td>
            <td>Igual que</td>
            <td><code>x == 5</code></td>
            <td><code>True</code></td>
          </tr>
          <tr>
            <td><code>!=</code></td>
            <td>Diferente de</td>
            <td><code>x != 5</code></td>
            <td><code>False</code></td>
          </tr>
          <tr>
            <td><code>&gt;</code></td>
            <td>Mayor que</td>
            <td><code>x &gt; 5</code></td>
            <td><code>False</code></td>
          </tr>
          <tr>
            <td><code>&lt;</code></td>
            <td>Menor que</td>
            <td><code>x &lt; 5</code></td>
            <td><code>False</code></td>
          </tr>
          <tr>
            <td><code>&gt;=</code></td>
            <td>Mayor o igual que</td>
            <td><code>x &gt;= 5</code></td>
            <td><code>True</code></td>
          </tr>
          <tr>
            <td><code>&lt;=</code></td>
            <td>Menor o igual que</td>
            <td><code>x &lt;= 5</code></td>
            <td><code>True</code></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div className="alert alert-danger mb-0">
      <h6 className="fw-bold mb-1">⚠️ Distinción fundamental:</h6>
      <p className="mb-0 small">
        <code>=</code> es el operador de <strong>asignación</strong> de variables, mientras que <code>==</code> es el operador de <strong>comparación de igualdad</strong>.
      </p>
    </div>
  </div>
);

export default FundamentosTab;