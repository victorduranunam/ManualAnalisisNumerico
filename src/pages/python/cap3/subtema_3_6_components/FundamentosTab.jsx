import React from "react";

const FundamentosTab = () => {
  return (
    <div className="pe-2">
      {/* INTRODUCCIÓN */}
      <p className="text-secondary">
        En programación científica y análisis numérico, <strong>todas las funciones trigonométricas de Python (tanto en <code>numpy</code> como en <code>math</code>) esperan que los ángulos se proporcionen en radianes</strong>, no en grados sexagesimales. Si se introduce un ángulo en grados sin convertirlo previamente, los cálculos arrojarán resultados matemáticamente incorrectos.
      </p>

      {/* RELACIÓN MATEMÁTICA FUNDAMENTAL */}
      <h6 className="fw-bold text-primary mt-4 mb-2">
        <i className="bi bi-compass me-2"></i>1. Relación Matemática Fundamental
      </h6>
      <p className="text-secondary small mb-2">
        La equivalencia entre grados sexagesimales y radianes se basa en que media circunferencia (180&deg;) equivale exactamente a &pi; radianes:
      </p>

      <div className="p-2 rounded bg-light border text-center font-monospace small my-3 text-dark fw-bold">
        180&deg; = &pi; rad &emsp;&rarr;&emsp; Factor de conversión: &pi; / 180
      </div>

      {/* LAS TRES FORMAS DE CONVERTIR EN PYTHON */}
      <h6 className="fw-bold text-primary mt-4 mb-2">
        <i className="bi bi-code-slash me-2"></i>2. Formas de Conversión en Python
      </h6>

      <div className="row g-3 mb-4">
        {/* Forma 1: Fórmula Analítica */}
        <div className="col-md-4 col-12">
          <div className="card h-100 shadow-sm border-0 border-top border-4 border-primary">
            <div className="card-body">
              <h6 className="fw-bold text-primary mb-2">A. Fórmula Analítica</h6>
              <p className="text-muted small mb-2">
                Aplica la multiplicación directa por la constante &pi; dividida entre 180:
              </p>
              <div className="p-2 rounded bg-light border font-monospace small">
                import numpy as np<br />
                rad = angulo * np.pi / 180
              </div>
            </div>
          </div>
        </div>

        {/* Forma 2: Función de NumPy */}
        <div className="col-md-4 col-12">
          <div className="card h-100 shadow-sm border-0 border-top border-4 border-success">
            <div className="card-body">
              <h6 className="fw-bold text-success mb-2">B. Función de NumPy</h6>
              <p className="text-muted small mb-2">
                Utiliza <code>np.radians()</code> o <code>np.deg2rad()</code> (soporta números individuales y arreglos):
              </p>
              <div className="p-2 rounded bg-light border font-monospace small">
                import numpy as np<br />
                rad = np.radians(angulo)
              </div>
            </div>
          </div>
        </div>

        {/* Forma 3: Función de Math */}
        <div className="col-md-4 col-12">
          <div className="card h-100 shadow-sm border-0 border-top border-4 border-info">
            <div className="card-body">
              <h6 className="fw-bold text-info mb-2">C. Función de Math</h6>
              <p className="text-muted small mb-2">
                Utiliza <code>math.radians()</code> de la biblioteca estándar de Python:
              </p>
              <div className="p-2 rounded bg-light border font-monospace small">
                import math<br />
                rad = math.radians(angulo)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CONVERSIÓN INVERSA: RADIANES A GRADOS */}
      <h6 className="fw-bold text-primary mt-4 mb-2">
        <i className="bi bi-arrow-left-right me-2"></i>3. Conversión Inversa: Radianes a Grados
      </h6>
      <p className="text-secondary small mb-2">
        Cuando un método numérico devuelve una solución en radianes y se desea expresar en grados sexagesimales:
      </p>

      <div className="bg-light p-3 rounded border my-3 font-monospace small">
        <span className="text-muted"># Forma analítica</span><br />
        grados = radianes * 180 / np.pi<br />
        <br />
        <span className="text-muted"># Con función de NumPy o Math</span><br />
        grados = np.degrees(radianes) &nbsp;<span className="text-muted"># o math.degrees(radianes)</span>
      </div>

      {/* TABLA DE ÁNGULOS NOTABLES */}
      <h6 className="fw-bold text-primary mt-4 mb-2">
        <i className="bi bi-table me-2"></i>Tabla de Ángulos Notables y Valores Trigonométricos
      </h6>
      <div className="table-responsive small mb-3">
        <table className="table table-bordered table-hover align-middle text-center mb-0 font-monospace">
          <thead className="table-light font-sans-serif">
            <tr>
              <th>Ángulo en Grados (&deg;)</th>
              <th>Expresión Exacta (&pi; rad)</th>
              <th>Valor Decimal (rad)</th>
              <th>Seno (sen &theta;)</th>
              <th>Coseno (cos &theta;)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="fw-bold">0&deg;</td>
              <td>0</td>
              <td>0.000000</td>
              <td>0.000000</td>
              <td>1.000000</td>
            </tr>
            <tr>
              <td className="fw-bold">30&deg;</td>
              <td>&pi; / 6</td>
              <td>0.523599</td>
              <td>0.500000</td>
              <td>0.866025</td>
            </tr>
            <tr>
              <td className="fw-bold text-primary">45&deg;</td>
              <td className="text-primary">&pi; / 4</td>
              <td>0.785398</td>
              <td className="text-success fw-bold">0.707107</td>
              <td className="text-success fw-bold">0.707107</td>
            </tr>
            <tr>
              <td className="fw-bold">60&deg;</td>
              <td>&pi; / 3</td>
              <td>1.047198</td>
              <td>0.866025</td>
              <td>0.500000</td>
            </tr>
            <tr>
              <td className="fw-bold">90&deg;</td>
              <td>&pi; / 2</td>
              <td>1.570796</td>
              <td>1.000000</td>
              <td>0.000000</td>
            </tr>
            <tr>
              <td className="fw-bold">180&deg;</td>
              <td>&pi;</td>
              <td>3.141593</td>
              <td>0.000000</td>
              <td>&minus;1.000000</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ADVERTENCIA DE ERROR COMÚN */}
      <div className="alert alert-danger py-2 small mb-0">
        <i className="bi bi-exclamation-octagon-fill me-2 text-danger"></i>
        <strong>Error Común de Programación:</strong> Si evalúas <code>np.sin(45)</code>, Python interpretará que el ángulo es de 45 radianes (&asymp; 2578&deg;) y devolverá <code>0.8509</code> en lugar del valor real <code>sen(45&deg;) = 0.7071</code>. ¡Siempre convierte a radianes antes de aplicar funciones trigonométricas!
      </div>
    </div>
  );
};

export default FundamentosTab;