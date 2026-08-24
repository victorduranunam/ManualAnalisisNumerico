import React from "react";

const FundamentosTab = () => (
  <div className="p-4 border rounded bg-light shadow-sm">
    <h4 className="text-primary fw-bold mb-3">7.7 Funciones Aplicadas al Análisis Numérico</h4>
    
    <p className="text-secondary lh-base">
      En el análisis numérico, la definición de funciones en Python modela directamente las funciones matemáticas continuas <code>f(x)</code> para evaluar valores puntuales, derivadas numéricas o integrales.
    </p>

    <p className="text-secondary lh-base">
      Además, Python permite pasar <strong>funciones como argumentos de otras funciones</strong> (funciones de orden superior), lo que permite crear algoritmos genéricos donde la función a resolver es un parámetro más.
    </p>

    {/* Ejemplo */}
    <div className="card mb-3 bg-dark text-white p-3 font-monospace rounded">
      <div className="text-white-50 mb-1 small"># Ejemplo: Definición de f(x) y método numérico genérico</div>
      <pre className="mb-0 text-white bg-transparent border-0 p-0">
<code>{`# 1. Definimos la función matemática f(x) = x^2 + 2x + 1
def f(x):
    return x**2 + 2*x + 1

# 2. Algoritmo que recibe cualquier función f y un punto x
def evaluar_y_verificar(funcion, x):
    resultado = funcion(x)
    return resultado

# Evaluación en x = 3
valor = evaluar_y_verificar(f, 3)
print("f(3) =", valor)`}</code>
      </pre>
    </div>

    <div className="alert alert-secondary py-2 mb-3">
      <strong>Salida:</strong><br />
      <code>f(3) = 16</code>
    </div>

    <div className="alert alert-info mb-0">
      <h6 className="fw-bold mb-1">💡 Uso en Métodos Numéricos:</h6>
      <p className="mb-0 small">
        Esta arquitectura modular permite programar el algoritmo de Bisección una sola vez: <code>biseccion(f, a, b, tol)</code>, y aplicarlo a cualquier función matemática <code>f</code> simplemente pasándola como parámetro.
      </p>
    </div>
  </div>
);

export default FundamentosTab;