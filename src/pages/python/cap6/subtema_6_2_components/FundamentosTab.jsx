import React from "react";

const FundamentosTab = () => (
  <div className="p-4 border rounded bg-light shadow-sm">
    <h4 className="text-primary fw-bold mb-3">6.2 Estructura if</h4>
    
    <p className="text-secondary lh-base">
      En muchas ocasiones es necesario que un programa tome decisiones y ejecute determinadas instrucciones solo cuando se cumple una condición. Para ello, Python proporciona la <strong>estructura if</strong>, que permite evaluar una expresión lógica y decidir si un bloque de código debe ejecutarse o no.
    </p>

    <p className="text-secondary lh-base">
      Si la condición evaluada es verdadera (<code>True</code>), las instrucciones que forman parte del bloque if se ejecutan. En caso contrario, si la condición es falsa (<code>False</code>), dichas instrucciones se omiten y el programa continúa con la siguiente instrucción.
    </p>

    <div className="card mb-3 border-0 bg-white shadow-sm p-3">
      <h6 className="fw-bold text-dark mb-1">Sintaxis:</h6>
      <pre className="bg-dark text-white p-2 font-monospace rounded mb-2">
<code>{`if condicion:
    instrucciones`}</code>
      </pre>
      <ul className="small text-muted mb-0">
        <li><strong>condición:</strong> es una expresión que produce un resultado lógico (<code>True</code> o <code>False</code>).</li>
        <li><strong>instrucciones:</strong> son las acciones que se ejecutarán únicamente cuando la condición sea verdadera.</li>
      </ul>
    </div>

    <div className="card mb-3 bg-dark text-white p-3 font-monospace rounded">
      <div className="text-white-50 mb-1 small"># Ejemplo: Evaluación de un número mayor a cero</div>
      <pre className="mb-0 text-white bg-transparent border-0 p-0">
<code>{`numero = float(input("Ingrese un número: "))
if numero > 0:
    print("El número es mayor que cero.")`}</code>
      </pre>
    </div>

    <div className="row g-2 mb-3">
      <div className="col-md-6">
        <div className="alert alert-secondary py-2 mb-0">
          <strong>Salida (si se ingresa 8):</strong><br />
          <code>Ingrese un número: 8</code><br />
          <code>El número es mayor que cero.</code>
        </div>
      </div>
      <div className="col-md-6">
        <div className="alert alert-secondary py-2 mb-0">
          <strong>Salida (si se ingresa -3):</strong><br />
          <code>Ingrese un número: -3</code><br />
          <em className="text-muted">(El programa no muestra ningún mensaje)</em>
        </div>
      </div>
    </div>

    <div className="alert alert-info mb-0">
      <h6 className="fw-bold mb-1">💡 Uso en Métodos Numéricos:</h6>
      <p className="mb-0 small">
        Se utiliza para validar que los datos iniciales de un método cumplan los requisitos teóricos antes de iniciar el cálculo (por ejemplo, comprobar si un paso <code>h &gt; 0</code>).
      </p>
    </div>
  </div>
);

export default FundamentosTab;