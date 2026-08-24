import React from "react";

const FundamentosTab = () => (
  <div className="p-4 border rounded bg-light shadow-sm">
    <h4 className="text-primary fw-bold mb-3">6.4 Estructura if...elif...else</h4>
    
    <p className="text-secondary leading-relaxed">
      La estructura <code>if...elif...else</code> se utiliza cuando es necesario evaluar dos o más condiciones y ejecutar un bloque de instrucciones diferente para cada una de ellas.
    </p>

    <p className="text-secondary leading-relaxed">
      Las condiciones se evalúan de forma secuencial: Python comienza evaluando la condición del <code>if</code>; si es verdadera, ejecuta su bloque y finaliza la estructura. Si es falsa, continúa evaluando cada bloque <code>elif</code> hasta encontrar una condición verdadera. Si ninguna se cumple, se ejecutan las instrucciones del <code>else</code>.
    </p>

    <div className="card mb-3 border-0 bg-white shadow-sm p-3">
      <h6 className="fw-bold text-dark mb-1">Sintaxis:</h6>
      <pre className="bg-dark text-white p-2 font-monospace rounded mb-0">
<code>{`if condicion1:
    instrucciones
elif condicion2:
    instrucciones
elif condicion3:
    instrucciones
else:
    instrucciones`}</code>
      </pre>
    </div>

    <div className="card mb-3 bg-dark text-white p-3 font-monospace rounded">
      <div className="text-muted mb-1"># Ejemplo: Determinar si un número es positivo, negativo o cero</div>
      <code>{`numero = float(input("Ingrese un número: "))
if numero > 0:
    print("El número es positivo.")
elif numero < 0:
    print("El número es negativo.")
else:
    print("El número es cero.")`}</code>
    </div>

    <div className="alert alert-secondary py-2 mb-3">
      <strong>Salidas posibles:</strong><br />
      • Con <code>8</code> &rarr; <code>El número es positivo.</code><br />
      • Con <code>-3</code> &rarr; <code>El número es negativo.</code><br />
      • Con <code>0</code> &rarr; <code>El número es cero.</code>
    </div>

    <div className="alert alert-info mb-0">
      <h6 className="fw-bold mb-1">💡 Análisis Numérico:</h6>
      <p className="mb-0 small">
        Excelente para clasificar la naturaleza de las raíces de un polinomio de segundo grado evaluando el discriminante $\Delta = b^2 - 4ac$: mayor que cero (raíces reales distintas), igual a cero (raíz doble) o menor que cero (raíces complejas conjugadas).
      </p>
    </div>
  </div>
);

export default FundamentosTab;