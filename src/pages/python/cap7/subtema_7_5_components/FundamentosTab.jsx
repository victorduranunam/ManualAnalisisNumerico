import React from "react";

const FundamentosTab = () => (
  <div className="p-4 border rounded bg-light shadow-sm">
    <h4 className="text-primary fw-bold mb-3">7.5 Funciones con Parámetros y Argumentos</h4>
    
    <p className="text-secondary lh-base">
      Los <strong>parámetros</strong> son variables que se declaran entre los paréntesis de la función para recibir datos del exterior. Los <strong>argumentos</strong> son los valores concretos que se envían a la función al momento de llamarla.
    </p>

    <p className="text-secondary lh-base">
      Gracias a los parámetros, una misma función puede operar sobre diferentes valores sin necesidad de reescribir la lógica de cálculo.
    </p>

    {/* Sintaxis */}
    <div className="card mb-3 border-0 bg-white shadow-sm p-3">
      <h6 className="fw-bold text-dark mb-1">Sintaxis:</h6>
      <pre className="bg-dark text-white p-2 font-monospace rounded mb-2">
<code>{`def nombre_funcion(parametro1, parametro2):
    # Instrucciones que usan los parámetros`}</code>
      </pre>
    </div>

    {/* Ejemplo */}
    <div className="card mb-3 bg-dark text-white p-3 font-monospace rounded">
      <div className="text-white-50 mb-1 small"># Ejemplo: Función con múltiples parámetros</div>
      <pre className="mb-0 text-white bg-transparent border-0 p-0">
<code>{`def calcular_paso(a, b, n):
    # Calcula el tamaño de paso h en un intervalo [a, b] dividido en n subintervalos
    h = (b - a) / n
    print("Intervalo: [", a, ",", b, "]")
    print("Paso h =", h)

# Llamadas con diferentes datos
calcular_paso(0.0, 1.0, 4)
calcular_paso(2.0, 10.0, 16)`}</code>
      </pre>
    </div>

    <div className="alert alert-secondary py-2 mb-3">
      <strong>Salida:</strong><br />
      <code>Intervalo: [ 0.0 , 1.0 ]</code><br />
      <code>Paso h = 0.25</code><br />
      <code>Intervalo: [ 2.0 , 10.0 ]</code><br />
      <code>Paso h = 0.5</code>
    </div>

    <div className="alert alert-info mb-0">
      <h6 className="fw-bold mb-1">💡 Uso en Métodos Numéricos:</h6>
      <p className="mb-0 small">
        Se utiliza para ingresar los límites del intervalo <code>[a, b]</code>, el número de subintervalos <code>n</code>, o el valor inicial <code>x0</code> a los métodos de aproximación.
      </p>
    </div>
  </div>
);

export default FundamentosTab;