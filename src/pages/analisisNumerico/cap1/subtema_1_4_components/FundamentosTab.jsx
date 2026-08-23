import React from "react";

const FundamentosTab = () => {
  return (
    <div className="p-3 border rounded bg-light">
      {/* ENCABEZADO */}
      <div className="mb-4 border-bottom pb-2">
        <h4 className="text-primary fw-bold mb-1">
          <i className="bi bi-book-half me-2"></i>
          Subtema 1.4: Criterios Fundamentales en Métodos Numéricos
        </h4>
        <p className="text-muted mb-0">
          Fundamentos teóricos sobre <strong>precisión</strong>, <strong>estabilidad</strong>, <strong>convergencia</strong> y rapidez en el diseño de algoritmos numéricos.
        </p>
      </div>

      {/* LOS TRES PILARES FUNDAMENTALES (CARDS RESUMEN) */}
      <div className="row g-3 mb-4">
        {/* 1. Precisión */}
        <div className="col-lg-4 col-md-6 col-12">
          <div className="card h-100 shadow-sm border-0 border-top border-4 border-primary">
            <div className="card-body">
              <div className="d-flex align-items-center mb-2">
                <span className="badge bg-primary-subtle text-primary fs-6 p-2 me-2">
                  <i className="bi bi-bullseye"></i>
                </span>
                <h5 className="fw-bold mb-0 text-dark">1. Precisión</h5>
              </div>
              <p className="text-muted small">
                Grado de cercanía entre el valor numérico aproximado (V<sub>a</sub>) y el valor exacto o verdadero (V<sub>v</sub>).
              </p>
              <ul className="small text-secondary ps-3 mb-0">
                <li>
                  <strong>Cota de Tolerancia (Tol):</strong> Define el error máximo admisible (ERP &le; Tol).
                </li>
                <li>
                  <strong>Factores determinantes:</strong> Errores de redondeo (aritmética finita) y errores de truncamiento (discretización).
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 2. Convergencia y Rapidez */}
        <div className="col-lg-4 col-md-6 col-12">
          <div className="card h-100 shadow-sm border-0 border-top border-4 border-success">
            <div className="card-body">
              <div className="d-flex align-items-center mb-2">
                <span className="badge bg-success-subtle text-success fs-6 p-2 me-2">
                  <i className="bi bi-graph-up-arrow"></i>
                </span>
                <h5 className="fw-bold mb-0 text-dark">2. Convergencia</h5>
              </div>
              <p className="text-muted small">
                Garantía de que las aproximaciones sucesivas (x<sub>k</sub>) se acercan cada vez más a la solución verdadera conforme aumenta el número de iteraciones (k &rarr; &infin;).
              </p>
              <ul className="small text-secondary ps-3 mb-0">
                <li>
                  <strong>Rapidez de convergencia:</strong> Un método es más rápido si requiere un menor número de iteraciones para alcanzar la precisión deseada.
                </li>
                <li>
                  <strong>Divergencia:</strong> Ocurre cuando los valores calculados se alejan progresivamente del valor buscado.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 3. Estabilidad */}
        <div className="col-lg-4 col-md-12 col-12">
          <div className="card h-100 shadow-sm border-0 border-top border-4 border-warning">
            <div className="card-body">
              <div className="d-flex align-items-center mb-2">
                <span className="badge bg-warning-subtle text-warning fs-6 p-2 me-2">
                  <i className="bi bi-shield-check"></i>
                </span>
                <h5 className="fw-bold mb-0 text-dark">3. Estabilidad</h5>
              </div>
              <p className="text-muted small">
                Nivel de garantía de convergencia ante diferentes modelos y condiciones iniciales; capacidad del algoritmo para no amplificar los errores numéricos.
              </p>
              <ul className="small text-secondary ps-3 mb-0">
                <li>
                  <strong>Método Estable:</strong> Asegura la convergencia amortiguando oscilaciones y perturbaciones.
                </li>
                <li>
                  <strong>Método Inestable:</strong> Presenta oscilaciones crecientes o divergencia súbita ante pequeños cambios en los datos iniciales.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* DIAGRAMAS ESQUEMÁTICOS DE COMPORTAMIENTOS DINÁMICOS */}
      <div className="card mb-4 shadow-sm border-0">
        <div className="card-header bg-white fw-bold text-dark d-flex justify-content-between align-items-center">
          <span>
            <i className="bi bi-activity me-2 text-primary"></i>
            Comportamientos Dinámicos de un Método Iterativo
          </span>
          <small className="text-muted font-sans-serif">Visualización conceptual de trayectorias</small>
        </div>
        <div className="card-body">
          <div className="row g-3 text-center">
            {/* 1. Convergencia Monótona */}
            <div className="col-lg-3 col-sm-6 col-12">
              <div className="p-2 border rounded bg-white h-100">
                <svg width="100%" height="110" viewBox="0 0 160 100">
                  <line x1="10" y1="50" x2="150" y2="50" stroke="#6c757d" strokeDasharray="3 3" strokeWidth="1.5" />
                  <path d="M 15 90 Q 60 55, 145 50" fill="none" stroke="#198754" strokeWidth="2.5" />
                  <text x="80" y="42" fill="#6c757d" fontSize="9" textAnchor="middle">Solución real</text>
                </svg>
                <div className="fw-bold small text-success mt-1">Convergencia Monótona</div>
                <div className="text-muted" style={{ fontSize: "0.75rem" }}>
                  Aproximación directa y suave hacia la raíz (ej. Secante en zonas convexas).
                </div>
              </div>
            </div>

            {/* 2. Convergencia Oscilatoria */}
            <div className="col-lg-3 col-sm-6 col-12">
              <div className="p-2 border rounded bg-white h-100">
                <svg width="100%" height="110" viewBox="0 0 160 100">
                  <line x1="10" y1="50" x2="150" y2="50" stroke="#6c757d" strokeDasharray="3 3" strokeWidth="1.5" />
                  <path d="M 15 85 L 40 25 L 70 68 L 100 42 L 125 53 L 145 50" fill="none" stroke="#0d6efd" strokeWidth="2" />
                  <text x="80" y="42" fill="#6c757d" fontSize="9" textAnchor="middle">Solución real</text>
                </svg>
                <div className="fw-bold small text-primary mt-1">Convergencia Oscilatoria</div>
                <div className="text-muted" style={{ fontSize: "0.75rem" }}>
                  Alterna valores por encima y por debajo pero amortigua el error (ej. Bisección).
                </div>
              </div>
            </div>

            {/* 3. Inestabilidad Numérica */}
            <div className="col-lg-3 col-sm-6 col-12">
              <div className="p-2 border rounded bg-white h-100">
                <svg width="100%" height="110" viewBox="0 0 160 100">
                  <line x1="10" y1="50" x2="150" y2="50" stroke="#6c757d" strokeDasharray="3 3" strokeWidth="1.5" />
                  <path d="M 15 15 Q 40 85, 65 30 Q 95 80, 115 40 Q 135 60, 145 50" fill="none" stroke="#fd7e14" strokeWidth="2" />
                  <text x="80" y="42" fill="#6c757d" fontSize="9" textAnchor="middle">Solución real</text>
                </svg>
                <div className="fw-bold small text-warning mt-1">Inestabilidad Transitoria</div>
                <div className="text-muted" style={{ fontSize: "0.75rem" }}>
                  Grandes fluctuaciones iniciales que retrasan o dificultan la convergencia.
                </div>
              </div>
            </div>

            {/* 4. Divergencia */}
            <div className="col-lg-3 col-sm-6 col-12">
              <div className="p-2 border rounded bg-white h-100">
                <svg width="100%" height="110" viewBox="0 0 160 100">
                  <line x1="10" y1="50" x2="150" y2="50" stroke="#6c757d" strokeDasharray="3 3" strokeWidth="1.5" />
                  <path d="M 15 65 Q 60 55, 145 10" fill="none" stroke="#dc3545" strokeWidth="2.5" />
                  <text x="80" y="42" fill="#6c757d" fontSize="9" textAnchor="middle">Solución real</text>
                </svg>
                <div className="fw-bold small text-danger mt-1">Divergencia</div>
                <div className="text-muted" style={{ fontSize: "0.75rem" }}>
                  El error crece indefinidamente alejándose de la solución real buscada.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CASO DE ESTUDIO DEL APUNTE: BISECCIÓN VS. SECANTE */}
      <div className="card mb-4 shadow-sm border-primary">
        <div className="card-header bg-primary text-white fw-bold">
          <i className="bi bi-search me-2"></i>
          Caso Práctico del Apunte: Comparativa sobre F(x) = cos(x) &minus; x = 0
        </div>
        <div className="card-body bg-white">
          <p className="text-muted small mb-3">
            Al resolver la ecuación no lineal <code>F(x) = cos(x) &minus; x = 0</code>, se observa claramente el balance entre <strong>estabilidad</strong> y <strong>rapidez de convergencia</strong>:
          </p>

          <div className="row g-3">
            {/* Columna Bisección */}
            <div className="col-md-6 col-12">
              <div className="p-3 border rounded bg-light h-100 border-primary-subtle">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h6 className="fw-bold text-primary mb-0">Método de Bisección</h6>
                  <span className="badge bg-primary">Mayor Estabilidad / Menor Rapidez</span>
                </div>
                <ul className="small text-secondary mb-2 ps-3">
                  <li>
                    <strong>Comportamiento del residuo (Y<sub>c</sub>):</strong> Oscilatorio amortiguado alrededor de cero.
                  </li>
                  <li>
                    <strong>Iteraciones requeridas:</strong> &asymp; 17 iteraciones para alcanzar la tolerancia.
                  </li>
                  <li>
                    <strong>Garantía:</strong> Convergencia 100% segura si se cumple el Teorema de Bolzano en el intervalo inicial [a, b].
                  </li>
                </ul>
                <div className="p-2 rounded bg-white border small text-muted font-monospace">
                  &bull; Velocidad lineal: Error se reduce a la mitad en cada paso (&gamma; = 1/2).
                </div>
              </div>
            </div>

            {/* Columna Secante */}
            <div className="col-md-6 col-12">
              <div className="p-3 border rounded bg-light h-100 border-success-subtle">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h6 className="fw-bold text-success mb-0">Método de la Secante</h6>
                  <span className="badge bg-success">Mayor Rapidez / Condicionalmente Estable</span>
                </div>
                <ul className="small text-secondary mb-2 ps-3">
                  <li>
                    <strong>Comportamiento del residuo (Y<sub>c</sub>):</strong> Convergencia rápida casi monótona directa a cero.
                  </li>
                  <li>
                    <strong>Iteraciones requeridas:</strong> &asymp; 5 iteraciones para alcanzar la misma tolerancia.
                  </li>
                  <li>
                    <strong>Sensibilidad:</strong> Requiere buenos valores iniciales cercanos a la raíz para evitar división entre cero o divergencia.
                  </li>
                </ul>
                <div className="p-2 rounded bg-white border small text-muted font-monospace">
                  &bull; Velocidad superlineal: Orden de convergencia &asymp; 1.618 (razón áurea).
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TABLA COMPARATIVA DE CRITERIOS */}
      <div className="card mb-4 shadow-sm">
        <div className="card-header bg-white fw-bold small text-dark">
          <i className="bi bi-table me-2 text-info"></i>
          Comparativa de Familias de Métodos Numéricos
        </div>
        <div className="table-responsive small">
          <table className="table table-bordered table-hover align-middle mb-0 text-center">
            <thead className="table-light">
              <tr>
                <th>Familia de Métodos</th>
                <th>Ejemplos Típicos</th>
                <th>Estabilidad</th>
                <th>Rapidez de Convergencia</th>
                <th>Riesgo Principal</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="fw-bold text-primary">Métodos Cerrados (Intervalo)</td>
                <td>Bisección, Regla Falsa</td>
                <td>
                  <span className="badge bg-success">Muy Alta (Garantizada)</span>
                </td>
                <td>
                  <span className="badge bg-secondary">Baja a Media (Lineal)</span>
                </td>
                <td className="text-muted">Costo computacional alto en tolerancias muy exigentes.</td>
              </tr>
              <tr>
                <td className="fw-bold text-success">Métodos Abiertos (Punto Fijo/Secante)</td>
                <td>Secante, Punto Fijo</td>
                <td>
                  <span className="badge bg-warning text-dark">Media (Condicional)</span>
                </td>
                <td>
                  <span className="badge bg-primary">Media a Alta (Superlineal)</span>
                </td>
                <td className="text-muted">Divergencia si los valores iniciales están lejos de la raíz.</td>
              </tr>
              <tr>
                <td className="fw-bold text-danger">Métodos Basados en Derivadas</td>
                <td>Newton-Raphson, Bairstow</td>
                <td>
                  <span className="badge bg-warning text-dark">Media (Local)</span>
                </td>
                <td>
                  <span className="badge bg-success">Muy Alta (Cuadrática)</span>
                </td>
                <td className="text-muted">Derivada cero (f&apos;(x) = 0) o puntos de inflexión que provocan ciclos infinitos.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* CRITERIOS DE PARADA COMPUTACIONALES */}
      <div className="card shadow-sm border-0">
        <div className="card-header bg-dark text-white fw-bold small">
          <i className="bi bi-code-slash me-2 text-warning"></i>
          Criterios de Parada en la Implementación de Algoritmos
        </div>
        <div className="card-body bg-white small">
          <p className="text-muted mb-2">
            En cualquier programa de cómputo numérico, un bucle iterativo debe controlar tres condiciones simultáneas para evitar bloqueos por divergencia o inestabilidad:
          </p>
          <div className="row g-2">
            <div className="col-md-4 col-12">
              <div className="p-2 border rounded bg-light">
                <strong className="text-primary font-sans-serif">1. Criterio por Error Relativo</strong>
                <div className="font-monospace text-secondary mt-1">
                  ERP = |(x<sub>k+1</sub> &minus; x<sub>k</sub>) / x<sub>k+1</sub>| &times; 100% &le; Tol
                </div>
                <small className="text-muted">Verifica que las soluciones sucesivas ya no cambien significativamente.</small>
              </div>
            </div>

            <div className="col-md-4 col-12">
              <div className="p-2 border rounded bg-light">
                <strong className="text-primary font-sans-serif">2. Criterio por Residuo Funcional</strong>
                <div className="font-monospace text-secondary mt-1">
                  |f(x<sub>k</sub>)| &le; &epsilon;
                </div>
                <small className="text-muted">Verifica que el valor evaluado en la función esté suficientemente próximo a 0.</small>
              </div>
            </div>

            <div className="col-md-4 col-12">
              <div className="p-2 border rounded bg-light">
                <strong className="text-primary font-sans-serif">3. Criterio por Iteraciones Máximas</strong>
                <div className="font-monospace text-secondary mt-1">
                  iteraciones &ge; N<sub>máx</sub>
                </div>
                <small className="text-muted">Salvaguarda de parada obligatoria en caso de divergencia o inestabilidad del método.</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundamentosTab;