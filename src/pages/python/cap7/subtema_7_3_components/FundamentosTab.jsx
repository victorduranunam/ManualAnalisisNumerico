import React from "react";

const FundamentosTab = () => (
  <div className="p-4 border rounded bg-light shadow-sm">
    <h4 className="text-primary fw-bold mb-3">7.3 Funciones Matemáticas del Módulo math</h4>
    
    <p className="text-secondary lh-base">
      Python organiza funciones especializadas en <strong>módulos</strong>. El módulo estándar <code>math</code> proporciona funciones matemáticas básicas para números reales y constantes fundamentales como <code>pi</code> y <code>e</code>.
    </p>

    <p className="text-secondary lh-base">
      Para utilizar estas funciones es indispensable importar el módulo previamente con la instrucción <code>import math</code>.
    </p>

    {/* Tabla de funciones math */}
    <div className="card mb-3 border-0 bg-white shadow-sm p-3">
      <h6 className="fw-bold text-dark mb-2">Funciones y constantes del módulo math:</h6>
      <div className="table-responsive">
        <table className="table table-sm table-bordered mb-0 align-middle">
          <thead className="table-light">
            <tr>
              <th>Elemento</th>
              <th>Descripción</th>
              <th>Sintaxis en Python</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>math.sqrt(x)</code></td>
              <td>Raíz cuadrada de x</td>
              <td><code>math.sqrt(25) # 5.0</code></td>
            </tr>
            <tr>
              <td><code>math.sin(x), math.cos(x), math.tan(x)</code></td>
              <td>Funciones trigonométricas (x en radianes)</td>
              <td><code>math.sin(math.pi / 2) # 1.0</code></td>
            </tr>
            <tr>
              <td><code>math.exp(x)</code></td>
              <td>Exponencial e^x</td>
              <td><code>math.exp(1) # 2.7182...</code></td>
            </tr>
            <tr>
              <td><code>math.log(x, [base])</code></td>
              <td>Logaritmo natural (o en base dada)</td>
              <td><code>math.log(10) # ln(10)</code></td>
            </tr>
            <tr>
              <td><code>math.pi / math.e</code></td>
              <td>Constantes matemáticas π y e</td>
              <td><code>math.pi # 3.141592...</code></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    {/* Ejemplo */}
    <div className="card mb-3 bg-dark text-white p-3 font-monospace rounded">
      <div className="text-white-50 mb-1 small"># Ejemplo: Uso del módulo math en cálculos</div>
      <pre className="mb-0 text-white bg-transparent border-0 p-0">
<code>{`import math

# Cálculo de la hipotenusa: sqrt(a^2 + b^2)
a = 3.0
b = 4.0
c = math.sqrt(a**2 + b**2)
print("Hipotenusa:", c)

# Ángulo en radianes
angulo = math.pi / 4
print("sin(pi/4):", math.sin(angulo))`}</code>
      </pre>
    </div>

    <div className="alert alert-secondary py-2 mb-3">
      <strong>Salida:</strong><br />
      <code>Hipotenusa: 5.0</code><br />
      <code>sin(pi/4): 0.7071067811865476</code>
    </div>

    <div className="alert alert-info mb-0">
      <h6 className="fw-bold mb-1">💡 Uso en Métodos Numéricos:</h6>
      <p className="mb-0 small">
        El módulo <code>math</code> se utiliza para evaluar funciones no lineales en métodos de resolución de ecuaciones de una sola variable (raíces de ecuaciones trascendentes).
      </p>
    </div>
  </div>
);

export default FundamentosTab;