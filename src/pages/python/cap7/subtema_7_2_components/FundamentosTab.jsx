import React from "react";

const FundamentosTab = () => (
  <div className="p-4 border rounded bg-light shadow-sm">
    <h4 className="text-primary fw-bold mb-3">7.2 Funciones Incorporadas de Python (Built-in)</h4>
    
    <p className="text-secondary lh-base">
      Python incluye un conjunto de <strong>funciones predefinidas (Built-in)</strong> que se encuentran siempre disponibles de manera global en el intérprete, sin necesidad de importar librerías externas.
    </p>

    {/* Tabla de funciones Built-in */}
    <div className="card mb-3 border-0 bg-white shadow-sm p-3">
      <h6 className="fw-bold text-dark mb-2">Funciones Built-in más utilizadas:</h6>
      <div className="table-responsive">
        <table className="table table-sm table-bordered mb-0 align-middle">
          <thead className="table-light">
            <tr>
              <th>Función</th>
              <th>Descripción</th>
              <th>Ejemplo</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>print()</code></td>
              <td>Muestra información en la consola</td>
              <td><code>print("Resultado:", 42)</code></td>
            </tr>
            <tr>
              <td><code>input()</code></td>
              <td>Lee datos ingresados por el usuario como texto</td>
              <td><code>nombre = input("Nombre: ")</code></td>
            </tr>
            <tr>
              <td><code>type()</code></td>
              <td>Devuelve el tipo de dato de una variable</td>
              <td><code>type(3.1416) # &lt;class 'float'&gt;</code></td>
            </tr>
            <tr>
              <td><code>len()</code></td>
              <td>Obtiene la cantidad de elementos de una secuencia</td>
              <td><code>len() # 3</code></td>
            </tr>
            <tr>
              <td><code>float() / int()</code></td>
              <td>Convierte a número decimal o entero</td>
              <td><code>x = float("2.5")</code></td>
            </tr>
            <tr>
              <td><code>abs()</code></td>
              <td>Calcula el valor absoluto (fundamental para errores)</td>
              <td><code>abs(-0.005) # 0.005</code></td>
            </tr>
            <tr>
              <td><code>min() / max() / sum()</code></td>
              <td>Obtiene mínimo, máximo o la suma de una colección</td>
              <td><code>max() # 9</code></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div className="alert alert-info mb-0">
      <h6 className="fw-bold mb-1">💡 Uso en Métodos Numéricos:</h6>
      <p className="mb-0 small">
        La función <code>abs()</code> es indispensable para verificar la condición de convergencia: <code>abs(x_nuevo - x_actual) &lt; tol</code>.
      </p>
    </div>
  </div>
);

export default FundamentosTab;