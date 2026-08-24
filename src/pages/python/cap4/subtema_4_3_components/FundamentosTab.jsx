import React from "react";

const FundamentosTab = () => (
  <div className="p-4 border rounded bg-light shadow-sm">
    <h4 className="text-primary fw-bold mb-3">4.3 Números reales</h4>
    
    <p className="text-secondary leading-relaxed">
      Los números reales permiten representar valores que contienen una parte decimal. Este tipo de dato es el más utilizado en análisis numérico, debido a que la mayoría de los cálculos matemáticos generan resultados que contienen decimales.
    </p>

    <div className="card mb-3 bg-dark text-white p-3 font-monospace rounded">
      <div className="text-muted mb-1"># Ejemplo: Almacenamiento de un valor real con decimales</div>
      <code>x = 3.14159</code><br />
      <code>print("Valor de x:", x)</code><br />
      <code>print("Tipo de dato:", type(x))</code>
    </div>

    <div className="alert alert-secondary py-2 mb-3">
      <strong>Salida:</strong><br />
      <code>Valor de x: 3.14159</code><br />
      <code>Tipo de dato: &lt;class 'float'&gt;</code>
    </div>

    <div className="alert alert-danger mb-0">
      <h6 className="fw-bold mb-1">⚠️ Error de redondeo y precisión de máquina:</h6>
      <p className="mb-0 small">
        Los números de punto flotante en computadoras se almacenan en formato binario IEEE 754, lo que genera ligeros errores de redondeo (por ejemplo, <code>0.1 + 0.2 != 0.3</code>). En métodos numéricos nunca compares dos números flotantes con <code>==</code>; utiliza siempre una tolerancia: <code>abs(a - b) &lt; 1e-7</code> o <code>np.isclose(a, b)</code>.
      </p>
    </div>
  </div>
);

export default FundamentosTab;