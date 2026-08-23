import React from "react";

const FundamentosTab = () => {
  return (
    <div className="p-3 border rounded bg-light">
      {/* Encabezado */}
      <div className="mb-4 pb-2 border-bottom">
        <span className="badge bg-primary mb-2">Unidad 1: Teoría de Errores</span>
        <h5 className="text-primary fw-bold mb-1">
          Fundamentos: Conceptos de Aproximación Numérica, Tolerancia y Tipos de Error
        </h5>
        <p className="text-muted small mb-0">
          Subtemas 1.3 y 1.4 — Iteración, criterio de convergencia por tolerancia, cifras significativas, redondeo, truncamiento y cuantificación del error.
        </p>
      </div>

      {/* 1. Iteración y Tolerancia */}
      <section className="card mb-3 shadow-sm">
        <div className="card-header bg-white fw-bold text-dark small">
          1. Concepto de Iteración y Criterio de Tolerancia
        </div>
        <div className="card-body">
          <p className="small mb-2">
            En análisis numérico, al no disponer de una solución analítica exacta, se aplican <strong>métodos iterativos</strong>:
          </p>
          <div className="row g-2 mb-3">
            <div className="col-md-6">
              <div className="p-2 border rounded bg-white h-100">
                <div className="fw-bold text-primary small">Iteración</div>
                <p className="small text-muted mb-0">
                  Es la aplicación sucesiva del algoritmo matemático. La salida de una iteración previa sirve como dato de entrada para la siguiente iteración.
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="p-2 border rounded bg-white h-100">
                <div className="fw-bold text-success small">Tolerancia (Tol)</div>
                <p className="small text-muted mb-0">
                  Es el máximo error admisible fijado por normas técnicas o criterio del ingeniero. El ciclo iterativo se repite mientras:
                  <br />
                  <code className="text-danger fw-bold">|Error de iteración| &gt; Tolerancia</code>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Cifras Significativas */}
      <section className="card mb-3 shadow-sm">
        <div className="card-header bg-white fw-bold text-dark small">
          2. Dígitos (Cifras) Significativos y Decimales
        </div>
        <div className="card-body">
          <p className="small mb-2">
            Las cifras significativas aportan confiabilidad y precisión a una magnitud física o dato numérico:
          </p>
          <div className="row g-2">
            <div className="col-md-6">
              <div className="p-2 border rounded bg-white">
                <span className="badge bg-secondary me-2">Cifras Significativas</span>
                <span className="font-monospace fw-bold">9.2500</span> o <span className="font-monospace fw-bold">09.2500</span> &rarr; <strong>3 cifras significativas</strong> (se omiten ceros a los extremos sin valor posicional).
              </div>
            </div>
            <div className="col-md-6">
              <div className="p-2 border rounded bg-white">
                <span className="badge bg-info text-dark me-2">Dígitos Decimales</span>
                <span className="font-monospace fw-bold">9.2500</span> &rarr; <strong>2 dígitos decimales significativos</strong> (números a la derecha del punto decimal).
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Redondeo vs Truncamiento */}
      <section className="card mb-3 shadow-sm">
        <div className="card-header bg-white fw-bold text-dark small">
          3. Redondeo vs. Truncamiento
        </div>
        <div className="card-body">
          <div className="table-responsive small">
            <table className="table table-bordered align-middle mb-2 text-center bg-white">
              <thead className="table-light">
                <tr>
                  <th>Operación</th>
                  <th>Criterio de Aplicación</th>
                  <th>Ejemplo (&pi; = 3.14159265...) a 5 cifras</th>
                  <th>Error Relativo Porcentual (ERP)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="fw-bold text-success">Redondeo</td>
                  <td className="text-start">
                    Si el dígito posterior es &ge; 5 se incrementa la última cifra en 1; si es &lt; 5 se mantiene.
                  </td>
                  <td><code>3.1416</code></td>
                  <td className="text-success fw-bold">&asymp; 0.0023%</td>
                </tr>
                <tr>
                  <td className="fw-bold text-danger">Truncamiento</td>
                  <td className="text-start">
                    Se conservan las cifras deseadas y se desechan las restantes sin modificar el último dígito.
                  </td>
                  <td><code>3.1415</code></td>
                  <td className="text-danger fw-bold">&asymp; 0.0029%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <small className="text-muted">
            <em>Regla general:</em> En la mayoría de los casos numéricos, el error por redondeo es menor o igual que el de truncamiento.
          </small>
        </div>
      </section>

      {/* 4. Fórmulas de Error */}
      <section className="card mb-3 shadow-sm">
        <div className="card-header bg-white fw-bold text-dark small">
          4. Cuantificación del Error
        </div>
        <div className="card-body">
          <div className="row g-2">
            <div className="col-md-4">
              <div className="p-2 border rounded bg-white text-center h-100">
                <div className="fw-bold text-primary small mb-1">Error Absoluto (E)</div>
                <div className="font-monospace small bg-light p-1 rounded">E = |V<sub>real</sub> - V<sub>aprox</sub>|</div>
                <small className="text-muted d-block mt-1">Diferencia directa de magnitudes.</small>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-2 border rounded bg-white text-center h-100">
                <div className="fw-bold text-primary small mb-1">Error Relativo (ER)</div>
                <div className="font-monospace small bg-light p-1 rounded">ER = |V<sub>real</sub> - V<sub>aprox</sub>| / |V<sub>real</sub>|</div>
                <small className="text-muted d-block mt-1">Normaliza el error respecto a la escala real.</small>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-2 border rounded bg-white text-center h-100">
                <div className="fw-bold text-primary small mb-1">Error Relativo % (ERP)</div>
                <div className="font-monospace small bg-light p-1 rounded">ERP = ER &times; 100%</div>
                <small className="text-muted d-block mt-1">Expresión porcentual del error.</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Modelo Geométrico del Ejercicio */}
      <section className="card shadow-sm border-primary">
        <div className="card-header bg-primary text-white fw-bold small">
          5. Modelo de Estudio: Aproximación del Área Circular por Polígonos Inscritos
        </div>
        <div className="card-body">
          <p className="small mb-2">
            Para evaluar la convergencia y reducción del error, se aproxima el área de un círculo de radio <em>r</em> mediante un polígono regular de <em>L</em> lados inscrito en él:
          </p>
          <div className="row g-2 small">
            <div className="col-md-6">
              <ul className="mb-0">
                <li><strong>Área real del círculo:</strong> <code>A<sub>C</sub> = &pi; &times; r<sup>2</sup></code></li>
                <li><strong>Base de cada triángulo:</strong> <code>b = 2 &times; r &times; sen(&pi; / L)</code></li>
              </ul>
            </div>
            <div className="col-md-6">
              <ul className="mb-0">
                <li><strong>Altura de cada triángulo:</strong> <code>h = r &times; cos(&pi; / L)</code></li>
                <li><strong>Área del polígono inscrito:</strong> <code>A<sub>P</sub> = L &times; (b &times; h) / 2</code></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FundamentosTab;