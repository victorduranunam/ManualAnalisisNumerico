import React from "react";

const FundamentosTab = () => (
  <div className="p-4 border rounded bg-light shadow-sm">
    <h4 className="text-primary fw-bold mb-3">6.12 Ciclo WHILE</h4>
    
    <p className="text-secondary leading-relaxed">
      El ciclo <code>while</code> es una estructura de repetición que permite ejecutar un conjunto de instrucciones mientras una condición determinada sea verdadera (<code>True</code>).
    </p>

    <p className="text-secondary leading-relaxed">
      A diferencia del ciclo <code>for</code>, que normalmente se utiliza cuando se conoce previamente el número de repeticiones, el ciclo <code>while</code> se emplea cuando la cantidad de repeticiones depende de una condición que cambia durante la ejecución del programa. Cuando la condición se vuelve falsa (<code>False</code>), el ciclo termina.
    </p>

    <div className="card mb-3 border-0 bg-white shadow-sm p-3">
      <h6 className="fw-bold text-dark mb-1">Sintaxis:</h6>
      <pre className="bg-dark text-white p-2 font-monospace rounded mb-0">
<code>{`while condicion:
    instrucciones`}</code>
      </pre>
    </div>

    <div className="row g-3 mb-3">
      <div className="col-md-6">
        <div className="card bg-dark text-white p-3 font-monospace rounded h-100">
          <div className="text-primary fw-bold mb-1"># Ejemplo 1: Contador</div>
          <code>{`contador = 0
while contador < 5:
    print(contador)
    contador = contador + 1`}</code>
          <div className="text-muted small mt-2">Salida: 0, 1, 2, 3, 4</div>
        </div>
      </div>

      <div className="col-md-6">
        <div className="card bg-dark text-white p-3 font-monospace rounded h-100">
          <div className="text-success fw-bold mb-1"># Ejemplo 2: Suma acumulativa</div>
          <code>{`suma = 0
numero = 1
while numero <= 5:
    suma = suma + numero
    numero += 1
print("La suma es:", suma)`}</code>
          <div className="text-muted small mt-2">Salida: La suma es: 15</div>
        </div>
      </div>
    </div>

    <div className="alert alert-danger mb-0">
      <h6 className="fw-bold mb-1">⚠️ Prevención de Bucles Infinitos:</h6>
      <p className="mb-0 small">
        En algoritmos iterativos (como Newton-Raphson), combina siempre el criterio de tolerancia con un límite de iteraciones: <code>while error &gt; tol and iteraciones &lt; max_iter:</code>.
      </p>
    </div>
  </div>
);

export default FundamentosTab;