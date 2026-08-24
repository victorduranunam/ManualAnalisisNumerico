import React from "react";

const FundamentosTab = () => (
  <div className="p-4 border rounded bg-light shadow-sm">
    <h4 className="text-primary fw-bold mb-3">5.8 Copia de arreglos y referencias</h4>
    
    <p className="text-secondary leading-relaxed">
      Cuando se trabaja con arreglos es fundamental conocer la diferencia entre asignar una variable y crear una copia independiente:
    </p>

    <div className="row g-3 mb-3">
      <div className="col-md-6">
        <div className="p-3 border border-danger rounded bg-white h-100">
          <h5 className="text-danger fw-bold">Asignación por Referencia: B = A</h5>
          <p className="small text-muted">
            Python <strong>no crea un nuevo arreglo</strong>, sino una referencia (alias) al arreglo original. Cualquier modificación realizada sobre <code>B</code> también afectará a <code>A</code>.
          </p>
        </div>
      </div>
      <div className="col-md-6">
        <div className="p-3 border border-success rounded bg-white h-100">
          <h5 className="text-success fw-bold">Copia Independiente: B = A.copy()</h5>
          <p className="small text-muted">
            Genera un <strong>nuevo arreglo en memoria</strong> cuyos valores pueden modificarse libremente sin alterar el arreglo original.
          </p>
        </div>
      </div>
    </div>

    <div className="card mb-3 bg-dark text-white p-3 font-monospace rounded">
      <code>A = np.array()</code><br />
      <code>B = A.copy()   # Copia independiente y segura</code><br />
      <code>B[0] = 99</code><br />
      <code>print("A:", A)  # [1 2 3] (Intacto)</code><br />
      <code>print("B:", B)  # [99 2 3]</code>
    </div>

    <p className="text-secondary leading-relaxed">
      En matrices numéricas también es posible generar una copia al multiplicar por uno (<code>B = A * 1</code>). Dado que el 1 es el elemento neutro de la multiplicación, los valores no cambian y NumPy crea un arreglo independiente. Sin embargo, para mantener un código claro y eficiente, <strong>la norma general recomendada es usar siempre <code>.copy()</code></strong>.
    </p>

    <div className="alert alert-warning mb-0">
      <h6 className="fw-bold mb-1">⚠️ Prevención de Efectos Secundarios:</h6>
      <p className="mb-0 small">
        Al pasar matrices a funciones numéricas (como eliminación gaussiana que modifica la matriz por renglones), pasa siempre <code>matriz.copy()</code> si deseas preservar los coeficientes originales para verificar el residual <em>r = b - Ax</em>.
      </p>
    </div>
  </div>
);

export default FundamentosTab;