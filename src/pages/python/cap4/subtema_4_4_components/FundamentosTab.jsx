import React from "react";

const FundamentosTab = () => (
  <div className="p-4 border rounded bg-light shadow-sm">
    <h4 className="text-primary fw-bold mb-3">4.4 Números complejos</h4>
    
    <p className="text-secondary leading-relaxed">
      Python también permite trabajar con números complejos, los cuales están formados por una parte real y una parte imaginaria. Este tipo de números tiene aplicaciones en diversas áreas de la ingeniería, como análisis de señales, circuitos eléctricos y solución de problemas matemáticos específicos (cálculo de raíces y valores propios).
    </p>

    <div className="card mb-3 bg-dark text-white p-3 font-monospace rounded">
      <div className="text-muted mb-1"># En Python la unidad imaginaria se representa con 'j'</div>
      <code>z = 3 + 4j</code><br />
      <code>print("Número complejo:", z)</code><br />
      <code>print("Parte real:", z.real)</code><br />
      <code>print("Parte imaginaria:", z.imag)</code><br />
      <code>print("Módulo (|z|):", abs(z))</code>
    </div>

    <div className="alert alert-secondary py-2 mb-3">
      <strong>Salida:</strong><br />
      <code>Número complejo: (3+4j)</code><br />
      <code>Parte real: 3.0</code><br />
      <code>Parte imaginaria: 4.0</code><br />
      <code>Módulo (|z|): 5.0</code>
    </div>

    <p className="text-secondary leading-relaxed">
      En este caso, la variable <code>z</code> contiene un número complejo formado por una parte real igual a 3 y una parte imaginaria igual a 4.
    </p>

    <div className="alert alert-info mb-0">
      <h6 className="fw-bold mb-1">💡 Recomendación técnica:</h6>
      <p className="mb-0 small">
        Para operaciones trascendentes (raíces cuadradas de negativos, funciones trigonométricas complejas), importa el módulo estándar <code>cmath</code> o utiliza las funciones universales de NumPy (<code>np.sqrt(-4 + 0j)</code>).
      </p>
    </div>
  </div>
);

export default FundamentosTab;