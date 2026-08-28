import React, { useState } from "react";

const FundamentosTab = () => {
  const [seccionActiva, setSeccionActiva] = useState("trapecio");

  return (
    <div className="p-3 border rounded bg-light">
      {/* Encabezado Institucional */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h5 className="text-primary fw-bold mb-1">
            4.4 Integración Numérica
          </h5>
          <p className="text-muted small mb-0">
            Cálculo del área bajo la curva mediante métodos de Newton-Cotes simples, compuestos y esquemas combinados.
          </p>
        </div>
        <span className="badge bg-primary">Capítulo IV</span>
      </div>

      {/* Selector de Pestañas en el Orden Requerido */}
      <div className="btn-group btn-group-sm mb-3 w-100" role="group">
        <button
          type="button"
          className={`btn ${seccionActiva === "trapecio" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setSeccionActiva("trapecio")}
        >
          1. Regla del Trapecio
        </button>
        <button
          type="button"
          className={`btn ${seccionActiva === "simpson13" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setSeccionActiva("simpson13")}
        >
          2. Regla de Simpson 1/3
        </button>
        <button
          type="button"
          className={`btn ${seccionActiva === "simpson38" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setSeccionActiva("simpson38")}
        >
          3. Regla de Simpson 3/8
        </button>
        <button
          type="button"
          className={`btn ${seccionActiva === "combinada" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setSeccionActiva("combinada")}
        >
          4. Integración Combinada
        </button>
      </div>

      {/* Contenedor Principal */}
      <div className="card shadow-sm border-0">
        <div className="card-body">
          {/* ========================================================= */}
          {/* SECCIÓN 1: REGLA DEL TRAPECIO */}
          {/* ========================================================= */}
          {seccionActiva === "trapecio" && (
            <div>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="card-title fw-bold text-dark mb-0">
                  Regla del Trapecio (Simple y Compuesta)
                </h6>
                <span className="badge bg-success">Ajuste Lineal (n = 1, 2, 3...)</span>
              </div>
              <p className="text-secondary small mb-3">
                Aproxima la función conectando puntos adyacentes mediante segmentos de recta, formando trapecios cuya base es el espaciamiento h = (b - a) / n y cuyas alturas corresponden a las ordenadas de la función[cite: 6].
              </p>

              <div className="row g-2 mb-3">
                <div className="col-md-6">
                  <div className="p-2 border rounded bg-white h-100">
                    <span className="badge bg-secondary mb-1">Trapecio Simple (2 Puntos, n = 1)</span>
                    <div className="font-monospace small bg-dark text-light p-2 rounded text-center my-2">
                      A = (b - a) · [ ( f(a) + f(b) ) / 2 ]
                    </div>
                    <p className="text-muted small mb-0">
                      Calcula el área considerando un solo intervalo[cite: 6]. Es propenso a errores significativos en funciones curvas[cite: 6].
                    </p>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="p-2 border rounded bg-white h-100">
                    <span className="badge bg-secondary mb-1">Trapecio Compuesto (n Intervalos)</span>
                    <div className="font-monospace small bg-dark text-light p-2 rounded text-center my-2">
                      A ≈ h · [ (f(a) + f(b))/2 + ∑[k=1 hasta n-1] f(a + k·h) ]
                    </div>
                    <p className="text-muted small mb-0">
                      Los puntos interiores se multiplican por 2 porque son compartidos por dos trapecios adyacentes[cite: 6].
                    </p>
                  </div>
                </div>
              </div>

              {/* Ejemplo Numérico */}
              <div className="p-3 border rounded bg-white">
                <span className="d-block fw-bold small text-dark mb-1">
                  Ejemplo Práctico: Evaluar ∫[0 a 2] x³ dx con n = 4 subintervalos[cite: 6]
                </span>
                <ul className="list-unstyled small font-monospace text-secondary mb-2">
                  <li>• Paso: h = (2 - 0) / 4 = 0.5 (puntos: x₀=0, x₁=0.5, x₂=1.0, x₃=1.5, x₄=2.0)[cite: 6]</li>
                  <li>• A ≈ 0.5 · [ (0³ + 2³)/2 + (0.5³ + 1.0³ + 1.5³) ][cite: 6]</li>
                  <li>• A ≈ 0.5 · [ 4.0 + (0.125 + 1.0 + 3.375) ] = 0.5 · [ 4.0 + 4.5 ] = <strong>4.25</strong>[cite: 6]</li>
                </ul>
                <div className="alert alert-warning py-1 small mb-0">
                  Valor analítico exacto = 4.00 | Error relativo porcentual = <strong>6.25%</strong>[cite: 6]
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* SECCIÓN 2: REGLA DE SIMPSON 1/3 */}
          {/* ========================================================= */}
          {seccionActiva === "simpson13" && (
            <div>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="card-title fw-bold text-dark mb-0">
                  Regla de Simpson 1/3 (Simple y Compuesta)
                </h6>
                <span className="badge bg-primary">Polinomios de Grado 2 (n debe ser PAR)</span>
              </div>
              <p className="text-secondary small mb-3">
                Sustituye la curva real por arcos de parábolas (polinomios de 2º grado) que conectan grupos de tres puntos consecutivos[cite: 7].
              </p>

              <div className="bg-dark text-light p-3 rounded text-center font-monospace small mb-3">
                <div className="text-warning mb-1">// Fórmula General de Simpson 1/3 Compuesta</div>
                ∫[a a b] f(x) dx ≈ (h / 3) · [ f(x₀) + f(xₙ) + 4·∑(Impares) f(x_impar) + 2·∑(Pares) f(x_par) ]
              </div>

              {/* Esquema de Ponderación */}
              <div className="table-responsive mb-3">
                <table className="table table-sm table-bordered text-center small mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Punto x_k</th>
                      <th>Extremos (x₀, xₙ)</th>
                      <th>Nodos Impares (x₁, x₃, x₅, ...)</th>
                      <th>Nodos Pares Interiores (x₂, x₄, x₆, ...)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="fw-bold">Factor Multiplicador</td>
                      <td className="font-monospace text-primary fw-bold">1</td>
                      <td className="font-monospace text-danger fw-bold">4</td>
                      <td className="font-monospace text-success fw-bold">2</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Ejemplo Numérico */}
              <div className="p-3 border rounded bg-white">
                <span className="d-block fw-bold small text-dark mb-1">
                  Ejemplo Práctico: Evaluar ∫[0 a 2] x³ dx con n = 10 subintervalos (h = 0.2, 11 puntos)[cite: 7]
                </span>
                <p className="text-muted small mb-1">
                  Al multiplicar cada ordenada f(x_k) por su factor correspondiente (1, 4, 2, 4, 2, ..., 1)[cite: 7]:
                </p>
                <div className="font-monospace small text-secondary mb-2">
                  • Suma ponderada total = 60.0[cite: 7]<br />
                  • Integral = (h / 3) · (Suma) = (0.2 / 3) · 60.0 = <strong>4.0000</strong>[cite: 7]
                </div>
                <div className="alert alert-success py-1 small mb-0">
                  <strong>Exactitud de Simpson 1/3:</strong> Al estar basada en parábolas, integra de forma exacta cualquier polinomio de grado menor o igual a 3 (Error = 0.0%).
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* SECCIÓN 3: REGLA DE SIMPSON 3/8 */}
          {/* ========================================================= */}
          {seccionActiva === "simpson38" && (
            <div>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="card-title fw-bold text-dark mb-0">
                  Regla de Simpson 3/8 (Simple y Compuesta)
                </h6>
                <span className="badge bg-warning text-dark">Polinomios de Grado 3 (n Múltiplo de 3)</span>
              </div>
              <p className="text-secondary small mb-3">
                Ajusta polinomios cúbicos que unen grupos de cuatro puntos consecutivos[cite: 8]. Requiere que el número de subintervalos n sea múltiplo de 3 (número de puntos = 4, 7, 10, 13...)[cite: 8].
              </p>

              <div className="bg-dark text-light p-3 rounded text-center font-monospace small mb-3">
                <div className="text-warning mb-1">// Fórmula General de Simpson 3/8 Compuesta</div>
                ∫[a a b] f(x) dx ≈ (3h / 8) · [ f(x₀) + f(xₙ) + 3·∑ f(x_i [i≠m3]) + 2·∑ f(x_i [i=m3]) ]
              </div>

              {/* Esquema de Ponderación */}
              <div className="table-responsive mb-3">
                <table className="table table-sm table-bordered text-center small mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Punto x_k</th>
                      <th>Extremos (x₀, xₙ)</th>
                      <th>No Múltiplos de 3 (x₁, x₂, x₄, x₅, ...)</th>
                      <th>Múltiplos de 3 Interiores (x₃, x₆, x₉, ...)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="fw-bold">Factor Multiplicador</td>
                      <td className="font-monospace text-primary fw-bold">1</td>
                      <td className="font-monospace text-danger fw-bold">3</td>
                      <td className="font-monospace text-success fw-bold">2</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Ejemplo Numérico */}
              <div className="p-3 border rounded bg-white">
                <span className="d-block fw-bold small text-dark mb-1">
                  Ejemplo Práctico: Evaluar ∫[0 a 3] x³ dx con n = 9 subintervalos (h = 1/3, 10 puntos)[cite: 8]
                </span>
                <p className="text-muted small mb-1 font-monospace">
                  Puntos: x₀=0, x₁=1/3, x₂=2/3, x₃=1, x₄=4/3, x₅=5/3, x₆=2, x₇=7/3, x₈=8/3, x₉=3[cite: 8]
                </p>
                <div className="font-monospace small text-secondary mb-2">
                  • Suma ponderada con factores (1, 3, 3, 2, 3, 3, 2, 3, 3, 1) = 162.0[cite: 8]<br />
                  • Integral = (3 · (1/3) / 8) · 162.0 = (1 / 8) · 162.0 = <strong>20.25</strong>[cite: 8]
                </div>
                <div className="alert alert-success py-1 small mb-0">
                  Valor real exacto = 3⁴ / 4 = 81 / 4 = <strong>20.25</strong> (Integración exacta para polinomios cúbicos)[cite: 8].
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* SECCIÓN 4: INTEGRACIÓN COMBINADA */}
          {/* ========================================================= */}
          {seccionActiva === "combinada" && (
            <div>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="card-title fw-bold text-dark mb-0">
                  Esquemas de Integración Combinada
                </h6>
                <span className="badge bg-dark">Datos Discretos e Incrementos Mixtos</span>
              </div>
              <p className="text-secondary small mb-3">
                Se utiliza cuando no se conoce la función analítica o cuando el conjunto de datos tiene espaciamientos (h) variables o un número de puntos que no cumple directamente los requisitos de un solo método compuesto[cite: 9].
              </p>

              {/* Tabla Comparativa de Criterios */}
              <div className="table-responsive mb-3">
                <table className="table table-sm table-bordered text-center small mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Método de Integración</th>
                      <th>Orden de Precisión</th>
                      <th>Condición de Intervalos (n)</th>
                      <th>Número de Puntos Requerido</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="fw-bold text-start ps-2">Simpson 3/8</td>
                      <td>1º Más Preciso (O(h⁴))</td>
                      <td>Múltiplos de 3 (n = 3, 6, 9...)[cite: 8, 9]</td>
                      <td>4, 7, 10, 13...[cite: 8, 9]</td>
                    </tr>
                    <tr>
                      <td className="fw-bold text-start ps-2">Simpson 1/3</td>
                      <td>2º Más Preciso (O(h⁴))</td>
                      <td>Pares (n = 2, 4, 6...)[cite: 7, 9]</td>
                      <td>3, 5, 7, 9...[cite: 7, 9]</td>
                    </tr>
                    <tr>
                      <td className="fw-bold text-start ps-2">Trapecio</td>
                      <td>3º Menor Precisión (O(h²))</td>
                      <td>Cualquier entero (n = 1, 2, 3...)[cite: 6, 9]</td>
                      <td>2, 3, 4, 5...[cite: 6, 9]</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Ejemplo Completo de Segmentación */}
              <div className="p-3 border rounded bg-white">
                <span className="d-block fw-bold small text-dark mb-2">
                  Ejemplo de Aplicación Mixta sobre Datos Tabulados (x ∈ [1, 9])[cite: 9]:
                </span>

                <div className="row g-2 text-center font-monospace small mb-3">
                  <div className="col-md-3">
                    <div className="p-2 border rounded bg-light">
                      <strong>Área 1</strong>[cite: 9]<br />
                      x: [1.0 a 2.5][cite: 9]<br />
                      h = 0.5 | n = 3[cite: 9]<br />
                      <span className="badge bg-warning text-dark my-1">Simpson 3/8</span>[cite: 9]<br />
                      <strong>A₁ = 1.125</strong>[cite: 9]
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="p-2 border rounded bg-light">
                      <strong>Área 2</strong>[cite: 9]<br />
                      x: [2.5 a 4.5][cite: 9]<br />
                      h = 1.0 | n = 2[cite: 9]<br />
                      <span className="badge bg-primary my-1">Simpson 1/3</span>[cite: 9]<br />
                      <strong>A₂ = 13.1667</strong>[cite: 9]
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="p-2 border rounded bg-light">
                      <strong>Área 3</strong>[cite: 9]<br />
                      x: [4.5 a 8.5][cite: 9]<br />
                      h = 2.0 | n = 2[cite: 9]<br />
                      <span className="badge bg-primary my-1">Simpson 1/3</span>[cite: 9]<br />
                      <strong>A₃ = 126.3333</strong>[cite: 9]
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="p-2 border rounded bg-light">
                      <strong>Área 4</strong>[cite: 9]<br />
                      x: [8.5 a 9.0][cite: 9]<br />
                      h = 0.5 | n = 1[cite: 9]<br />
                      <span className="badge bg-success my-1">Trapecio</span>[cite: 9]<br />
                      <strong>A₄ = 30.0625</strong>[cite: 9]
                    </div>
                  </div>
                </div>

                <div className="bg-light p-2 rounded border text-center font-monospace small">
                  <strong>Área Total</strong> = A₁ + A₂ + A₃ + A₄ = 1.125 + 13.1667 + 126.3333 + 30.0625 = <strong className="text-primary">170.6875</strong>[cite: 9]
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FundamentosTab;