import React from "react";

const FundamentosTab = () => (
  <div className="p-4 border rounded bg-light shadow-sm">
    <h4 className="text-primary fw-bold mb-3">6.6 Operadores lógicos en condiciones</h4>
    
    <p className="text-secondary leading-relaxed">
      En muchas ocasiones una sola condición no es suficiente. Python proporciona operadores lógicos para combinar o invertir expresiones lógicas:
    </p>

    <div className="table-responsive mb-3">
      <table className="table table-bordered bg-white table-sm">
        <thead className="table-primary">
          <tr>
            <th>Operador</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>and</code></td>
            <td>El resultado es verdadero únicamente cuando todas las condiciones son verdaderas.</td>
          </tr>
          <tr>
            <td><code>or</code></td>
            <td>El resultado es verdadero cuando al menos una de las condiciones es verdadera.</td>
          </tr>
          <tr>
            <td><code>not</code></td>
            <td>Invierte el resultado de una condición lógica (de <code>True</code> a <code>False</code> y viceversa).</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div className="card mb-3 border-0 bg-white shadow-sm p-3">
      <h5 className="text-dark fw-bold mb-2">6.6.1 Operador and: Validar rango de edad</h5>
      <p className="text-muted small">Sintaxis: <code>condicion1 and condicion2</code></p>
      <pre className="bg-dark text-white p-2 font-monospace rounded mb-0">
<code>{`edad = int(input("Ingrese la edad: "))
if edad >= 18 and edad <= 65:
    print("La persona se encuentra dentro del rango de edad.")`}</code>
      </pre>
    </div>

    <div className="card mb-3 border-0 bg-white shadow-sm p-3">
      <h5 className="text-dark fw-bold mb-2">6.6.2 Operador or: Verificar un valor especial</h5>
      <p className="text-muted small">Sintaxis: <code>condicion1 or condicion2</code></p>
      <pre className="bg-dark text-white p-2 font-monospace rounded mb-0">
<code>{`numero = int(input("Ingrese un número: "))
if numero == 0 or numero == 100:
    print("Se ingresó un valor especial.")`}</code>
      </pre>
    </div>

    <div className="card mb-3 border-0 bg-white shadow-sm p-3">
      <h5 className="text-dark fw-bold mb-2">6.6.3 Operador not: Verificar si un número no es positivo</h5>
      <p className="text-muted small">Sintaxis: <code>not condicion</code></p>
      <pre className="bg-dark text-white p-2 font-monospace rounded mb-0">
<code>{`numero = float(input("Ingrese un número: "))
if not (numero > 0):
    print("El número no es positivo.")`}</code>
      </pre>
    </div>

    <div className="alert alert-info mb-0">
      <h6 className="fw-bold mb-1">💡 Evaluación de cortocircuito (Short-Circuit):</h6>
      <p className="mb-0 small">
        Si en un <code>and</code> la primera condición es falsa, Python no evalúa la segunda. En un <code>or</code>, si la primera es verdadera, concluye inmediatamente con <code>True</code>, ahorrando tiempo de cómputo.
      </p>
    </div>
  </div>
);

export default FundamentosTab;