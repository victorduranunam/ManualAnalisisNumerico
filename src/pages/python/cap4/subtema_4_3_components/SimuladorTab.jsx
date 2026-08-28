import React from "react";

const FundamentosTab = () => (
  <div className="p-4 border rounded bg-light shadow-sm">
    <h4 className="text-primary fw-bold mb-3">4.3 Números reales</h4>
    
    <p className="text-secondary">
      Los números reales permiten representar valores numéricos continuos que contienen una parte decimal. En Python corresponden al tipo de dato <code>float</code> y son la base del análisis numérico para evaluar funciones, calcular aproximaciones y medir errores.
    </p>

    {/* Código de ejemplo */}
    <div className="card mb-3 bg-dark text-white p-3 font-monospace rounded">
      <div className="text-muted mb-1"># Declaración e inspección de un número real</div>
      <code>x = 3.14159</code><br />
      <code>print("Valor de x:", x)</code><br />
      <code>print("Tipo de dato:", type(x))</code>
    </div>

    {/* Salida esperada */}
    <div className="alert alert-secondary py-2 mb-3">
      <strong>Salida:</strong><br />
      <code>Valor de x: 3.14159</code><br />
      <code>Tipo de dato: &lt;class 'float'&gt;</code>
    </div>

    {/* Consideración de precisión */}
    <div className="alert alert-danger mb-0">
      <h6 className="fw-bold mb-1">⚠️ Error de redondeo y precisión de máquina:</h6>
      <p className="mb-0 small">
        Los números de punto flotante se almacenan en formato binario estándar IEEE 754, lo que ocasiona ligeras discrepancias de precisión (por ejemplo, <code>0.1 + 0.2 != 0.3</code>). En métodos numéricos se debe evitar comparar reales mediante <code>==</code>; en su lugar, se evalúa si la diferencia está dentro de una tolerancia establecida (<code>abs(a - b) &lt; tol</code> o <code>np.isclose(a, b)</code>).
      </p>
    </div>
  </div>
);

export default FundamentosTab;