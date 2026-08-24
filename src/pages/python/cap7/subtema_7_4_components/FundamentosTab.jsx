import React from "react";

const FundamentosTab = () => (
  <div className="p-4 border rounded bg-light shadow-sm">
    <h4 className="text-primary fw-bold mb-3">7.4 Creación de Funciones Propias: def, lambda, Anidadas y Recursivas</h4>
    
    <p className="text-secondary lh-base">
      En Python existen distintas formas de construir funciones personalizadas según la necesidad del problema: desde la declaración formal mediante <strong><code>def</code></strong>, hasta la definición compacta de una sola línea con <strong><code>lambda</code></strong>, funciones anidadas y recursivas.
    </p>

    {/* 1. Funciones estándar con def */}
    <div className="card mb-3 border-0 bg-white shadow-sm p-3">
      <h6 className="fw-bold text-dark mb-1">1. Funciones estándar con <code>def</code></h6>
      <p className="small text-secondary mb-2">
        Es la forma tradicional de definir funciones con nombre propio y un bloque de instrucciones estructurado.
      </p>
      <pre className="bg-dark text-white p-2 font-monospace rounded mb-2">
<code>{`def mensaje_bienvenida():
    print("Iniciando cálculo del método numérico...")
    print("Configuración lista.")

mensaje_bienvenida()`}</code>
      </pre>
      <div className="alert alert-secondary py-1 px-2 mb-0 small">
        <strong>Salida:</strong><br />
        <code>Iniciando cálculo del método numérico...</code><br />
        <code>Configuración lista.</code>
      </div>
    </div>

    {/* 2. Funciones Lambda */}
    <div className="card mb-3 border-0 bg-white shadow-sm p-3">
      <h6 className="fw-bold text-dark mb-1">2. Funciones anónimas con <code>lambda</code> (En una sola línea)</h6>
      <p className="small text-secondary mb-2">
        Permiten crear funciones matemáticas rápidas y compactas sin necesidad de usar <code>def</code> ni <code>return</code>. Son sumamente utilizadas para ingresar funciones matemáticas al vuelo.
      </p>
      <pre className="bg-dark text-white p-2 font-monospace rounded mb-2">
<code>{`# Sintaxis: lambda variable: expresion
f = lambda x: x**3 - 2*x - 5

# Evaluación directa
print("f(2) =", f(2))
print("f(3) =", f(3))`}</code>
      </pre>
      <div className="alert alert-secondary py-1 px-2 mb-0 small">
        <strong>Salida:</strong> <code>f(2) = -1</code> | <code>f(3) = 16</code>
      </div>
    </div>

    {/* 3. Funciones Anidadas */}
    <div className="card mb-3 border-0 bg-white shadow-sm p-3">
      <h6 className="fw-bold text-dark mb-1">3. Funciones anidadas (Funciones internas)</h6>
      <p className="small text-secondary mb-2">
        Son funciones definidas dentro del cuerpo de otra función. Se utilizan para encapsular subrutinas auxiliares y evitar que sean visibles fuera de la función contenedora.
      </p>
      <pre className="bg-dark text-white p-2 font-monospace rounded mb-2">
<code>{`def evaluador_polinomio():
    # Función interna auxiliar
    def evaluar(x):
        return x**2 + 1
    
    print("Evaluando en x = 4:", evaluar(4))

evaluador_polinomio()`}</code>
      </pre>
      <div className="alert alert-secondary py-1 px-2 mb-0 small">
        <strong>Salida:</strong> <code>Evaluando en x = 4: 17</code>
      </div>
    </div>

    {/* 4. Funciones Recursivas */}
    <div className="card mb-3 border-0 bg-white shadow-sm p-3">
      <h6 className="fw-bold text-dark mb-1">4. Funciones recursivas</h6>
      <p className="small text-secondary mb-2">
        Son funciones que se llaman a sí mismas para resolver problemas dividiéndolos en casos base y casos inductivos (útiles en relaciones de recurrencia y polinomios ortogonales).
      </p>
      <pre className="bg-dark text-white p-2 font-monospace rounded mb-2">
<code>{`def factorial(n):
    # Caso base
    if n <= 1:
        return 1
    # Caso recursivo: n! = n * (n-1)!
    return n * factorial(n - 1)

print("4! =", factorial(4))`}</code>
      </pre>
      <div className="alert alert-secondary py-1 px-2 mb-0 small">
        <strong>Salida:</strong> <code>4! = 24</code>
      </div>
    </div>

    {/* Uso en Métodos Numéricos */}
    <div className="alert alert-info mb-0">
      <h6 className="fw-bold mb-1">💡 Uso en Métodos Numéricos:</h6>
      <ul className="mb-0 small">
        <li><strong><code>lambda</code>:</strong> Es la forma más rápida de definir la función matemática continua <code>f(x)</code> a resolver.</li>
        <li><strong><code>def</code>:</strong> Se usa para codificar el algoritmo numérico completo (Bisección, Newton, Trapecio).</li>
        <li><strong>Funciones anidadas:</strong> Ideales para calcular aproximaciones de derivadas locales o errores intermedios.</li>
        <li><strong>Funciones recursivas:</strong> Ideales para evaluar polinomios de Chebyshev o Legendre mediante sus fórmulas de recurrencia.</li>
      </ul>
    </div>
  </div>
);

export default FundamentosTab;