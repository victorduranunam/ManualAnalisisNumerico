import React from "react";

const FundamentosTab = () => (
  <div className="p-4 border rounded bg-light shadow-sm">
    <h4 className="text-primary fw-bold mb-3">7.6 Funciones con Valores de Retorno (return)</h4>
    
    <p className="text-secondary lh-base">
      La sentencia <strong><code>return</code></strong> finaliza la ejecución de una función y envía uno o varios resultados al punto donde fue invocada. En el análisis numérico, el tipo de dato devuelto depende de la complejidad del algoritmo: desde un valor escalar simple hasta matrices completas con el historial de iteraciones.
    </p>

    {/* 1. Retorno de un solo valor */}
    <div className="card mb-3 border-0 bg-white shadow-sm p-3">
      <h6 className="fw-bold text-dark mb-1">1. Retorno de un solo valor (Escalar)</h6>
      <p className="small text-secondary mb-2">
        Devuelve un único número, booleano o valor de cálculo.
      </p>
      <pre className="bg-dark text-white p-2 font-monospace rounded mb-2">
<code>{`def f(x):
    # Retorna un único valor escalar
    return x**3 - x - 2

resultado = f(2.0)
print("f(2.0) =", resultado)`}</code>
      </pre>
      <div className="alert alert-secondary py-1 px-2 mb-0 small">
        <strong>Salida:</strong> <code>f(2.0) = 4.0</code>
      </div>
    </div>

    {/* 2. Retorno múltiple (Tuplas) */}
    <div className="card mb-3 border-0 bg-white shadow-sm p-3">
      <h6 className="fw-bold text-dark mb-1">2. Retorno de múltiples valores (Desempaquetado de tuplas)</h6>
      <p className="small text-secondary mb-2">
        Python permite retornar varios valores separados por comas. Al recibirlos, se pueden desempaquetar directamente en variables independientes.
      </p>
      <pre className="bg-dark text-white p-2 font-monospace rounded mb-2">
<code>{`def biseccion_resumen(a, b):
    xr = (a + b) / 2.0
    error = abs(b - a) / 2.0
    iteraciones = 1
    # Retorna 3 valores simultáneamente
    return xr, iteraciones, error

# Desempaquetado en 3 variables
raiz, iters, err = biseccion_resumen(1.0, 2.0)
print(f"Raíz: {raiz}, Iteraciones: {iters}, Error: {err}")`}</code>
      </pre>
      <div className="alert alert-secondary py-1 px-2 mb-0 small">
        <strong>Salida:</strong> <code>Raíz: 1.5, Iteraciones: 1, Error: 0.5</code>
      </div>
    </div>

    {/* 3. Retorno de Matrices y Arreglos NumPy */}
    <div className="card mb-3 border-0 bg-white shadow-sm p-3">
      <h6 className="fw-bold text-dark mb-1">3. Retorno de matrices y arreglos (NumPy)</h6>
      <p className="small text-secondary mb-2">
        Se utiliza para devolver tablas completas de iteración (matrices 2D) o vectores solución de sistemas de ecuaciones lineales.
      </p>
      <pre className="bg-dark text-white p-2 font-monospace rounded mb-2">
<code>{`import numpy as np

def tabla_iteraciones_newton(x0, tol=1e-3):
    # Matriz para capturar: [iteración, x_k, f(x_k), error]
    historial = []
    x = x0
    k = 0
    error = 1.0
    
    while error > tol and k < 4:
        f_x = x**2 - 2
        df_x = 2 * x
        x_sig = x - f_x / df_x
        error = abs(x_sig - x)
        
        historial.append([k + 1, x, f_x, error])
        x = x_sig
        k += 1
        
    return np.array(historial) # Retorna una matriz NumPy 2D

matriz_resultados = tabla_iteraciones_newton(2.0)
print("Matriz de resultados (columnas: iter, x, f(x), error):")
print(matriz_resultados)`}</code>
      </pre>
      <div className="alert alert-secondary py-1 px-2 mb-0 small">
        <strong>Salida:</strong><br />
        <code>[[1.   2.   2.   0.5 ]</code><br />
        <code> [2.   1.5  0.25 0.08333333]</code><br />
        <code> [3.   1.41666667 0.00694444 0.00245098]]</code>
      </div>
    </div>

    {/* 4. Retorno de Diccionarios */}
    <div className="card mb-3 border-0 bg-white shadow-sm p-3">
      <h6 className="fw-bold text-dark mb-1">4. Retorno estructurado mediante Diccionarios</h6>
      <p className="small text-secondary mb-2">
        Permite retornar resultados con etiquetas descriptivas (clave: valor), similar al funcionamiento de librerías científicas como <code>scipy.optimize</code>.
      </p>
      <pre className="bg-dark text-white p-2 font-monospace rounded mb-2">
<code>{`def solver_reporte(x_aprox, error_final, converge):
    return {
        "solucion": x_aprox,
        "error": error_final,
        "exito": converge,
        "mensaje": "Convergencia alcanzada" if converge else "Límite excedido"
    }

resultado = solver_reporte(1.4142, 0.0001, True)
print("Solución encontrada:", resultado["solucion"])
print("Estado:", resultado["mensaje"])`}</code>
      </pre>
      <div className="alert alert-secondary py-1 px-2 mb-0 small">
        <strong>Salida:</strong> <code>Solución encontrada: 1.4142</code> | <code>Estado: Convergencia alcanzada</code>
      </div>
    </div>

    {/* 5. Retornos condicionales */}
    <div className="card mb-3 border-0 bg-white shadow-sm p-3">
      <h6 className="fw-bold text-dark mb-1">5. Retorno condicional y control de excepciones (múltiples return)</h6>
      <p className="small text-secondary mb-2">
        Una función puede tener varios <code>return</code> para salir inmediatamente si los datos iniciales no cumplen los requisitos matemáticos (por ejemplo, Teorema de Bolzano en Bisección).
      </p>
      <pre className="bg-dark text-white p-2 font-monospace rounded mb-2">
<code>{`def validar_intervalo(f, a, b):
    # Si no hay cambio de signo, retorna None inmediatamente
    if f(a) * f(b) >= 0:
        return None, "Error: No hay cambio de signo en el intervalo."
    
    return True, "Intervalo válido."

f = lambda x: x**2 - 2
estado, msg = validar_intervalo(f, 2.0, 3.0)
print("Resultado:", msg)`}</code>
      </pre>
      <div className="alert alert-secondary py-1 px-2 mb-0 small">
        <strong>Salida:</strong> <code>Resultado: Error: No hay cambio de signo en el intervalo.</code>
      </div>
    </div>

    {/* Resumen para Métodos Numéricos */}
    <div className="alert alert-info mb-0">
      <h6 className="fw-bold mb-1">💡 Resumen de aplicación en Métodos Numéricos:</h6>
      <ul className="mb-0 small">
        <li><strong>Tuplas (<code>raiz, iters, error</code>):</strong> Para algoritmos estándar de búsqueda de raíces.</li>
        <li><strong>Matrices NumPy (<code>np.ndarray</code>):</strong> Para generar tablas completas de iteración y graficar curvas de convergencia.</li>
        <li><strong>Diccionarios (<code>dict</code>):</strong> Para crear reportes y alimentar interfaces gráficas interactivas.</li>
        <li><strong>Retorno <code>None</code>:</strong> Para abortar el algoritmo de forma segura si se detecta divergencia o división entre cero.</li>
      </ul>
    </div>
  </div>
);

export default FundamentosTab;