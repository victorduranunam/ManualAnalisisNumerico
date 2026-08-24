import React from "react";

const FundamentosTab = () => (
  <div className="p-4 border rounded bg-light shadow-sm">
    <h4 className="text-primary fw-bold mb-3">6.3 Estructura if...else</h4>
    
    <p className="text-secondary leading-relaxed">
      La estructura <code>if...else</code> se utiliza cuando es necesario ejecutar una acción si una condición es verdadera y otra diferente cuando la condición es falsa. De esta manera, el programa siempre ejecutará uno de los dos bloques de instrucciones.
    </p>

    <p className="text-secondary leading-relaxed">
      La palabra reservada <code>else</code> indica el bloque de instrucciones que se ejecutará cuando la condición del <code>if</code> no se cumpla.
    </p>

    <div className="card mb-3 border-0 bg-white shadow-sm p-3">
      <h6 className="fw-bold text-dark mb-1">Sintaxis:</h6>
      <pre className="bg-dark text-white p-2 font-monospace rounded mb-2">
<code>{`if condicion:
    instrucciones
else:
    instrucciones`}</code>
      </pre>
    </div>

    <div className="card mb-3 bg-dark text-white p-3 font-monospace rounded">
      <div className="text-muted mb-1"># Ejemplo: Determinar si un número es mayor que cero</div>
      <code>{`numero = float(input("Ingrese un número: "))
if numero > 0:
    print("El número es mayor que cero.")
else:
    print("El número no es mayor que cero.")`}</code>
    </div>

    <div className="row g-2 mb-3">
      <div className="col-md-6">
        <div className="alert alert-secondary py-2 mb-0">
          <strong>Salida (ingresando 8):</strong><br />
          <code>Ingrese un número: 8</code><br />
          <code>El número es mayor que cero.</code>
        </div>
      </div>
      <div className="col-md-6">
        <div className="alert alert-secondary py-2 mb-0">
          <strong>Salida (ingresando -3):</strong><br />
          <code>Ingrese un número: -3</code><br />
          <code>El número no es mayor que cero.</code>
        </div>
      </div>
    </div>

    <div className="alert alert-success mb-0">
      <h6 className="fw-bold mb-1">💡 Aplicación en Bisección:</h6>
      <p className="mb-0 small">
        En el método de bisección se utiliza <code>if...else</code> para determinar en cuál de los dos subintervalos $[a, c]$ o $[c, b]$ ocurre el cambio de signo: <code>if f(a)*f(c) &lt; 0: b = c else: a = c</code>.
      </p>
    </div>
  </div>
);

export default FundamentosTab;