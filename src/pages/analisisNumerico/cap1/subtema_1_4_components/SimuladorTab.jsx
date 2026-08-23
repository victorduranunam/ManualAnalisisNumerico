import React, { useState, useMemo } from "react";

// ===========================================================================
// 1. EVALUADOR SEGURO DE FUNCIONES MATEMÁTICAS
// ===========================================================================
const evaluarFuncion = (fnStr, xVal) => {
  try {
    const normalizada = fnStr
      .toLowerCase()
      .replace(/\bcos\b/g, "Math.cos")
      .replace(/\bsin\b|\bsen\b/g, "Math.sin")
      .replace(/\btan\b/g, "Math.tan")
      .replace(/\bexp\b/g, "Math.exp")
      .replace(/\bln\b/g, "Math.log")
      .replace(/\blog\b/g, "Math.log10")
      .replace(/\bsqrt\b/g, "Math.sqrt")
      .replace(/\bpi\b/g, "Math.PI")
      .replace(/\be\b/g, "Math.E")
      .replace(/\^/g, "**");

    const f = new Function("x", `"use strict"; return (${normalizada});`);
    const res = f(xVal);
    return isFinite(res) ? res : null;
  } catch (err) {
    return null;
  }
};

// ===========================================================================
// 2. ALGORITMOS NUMÉRICOS (BISECCIÓN Y SECANTE)
// ===========================================================================
const ejecutarBiseccion = (fnStr, aIni, bIni, tol, maxIter) => {
  const pasos = [];
  let a = parseFloat(aIni);
  let b = parseFloat(bIni);
  let fa = evaluarFuncion(fnStr, a);
  let fb = evaluarFuncion(fnStr, b);

  if (fa === null || fb === null) return { error: "Sintaxis de función no válida.", pasos: [] };
  if (fa * fb >= 0) return { error: "No cumple Bolzano: f(a) y f(b) deben tener signos opuestos.", pasos: [] };

  let cPrev = null;

  for (let i = 1; i <= maxIter; i++) {
    const c = (a + b) / 2.0;
    const fc = evaluarFuncion(fnStr, c);
    const error = cPrev !== null && c !== 0 ? Math.abs((c - cPrev) / c) * 100 : Math.abs(b - a);

    pasos.push({
      iter: i,
      a,
      b,
      c,
      fc, // Yc
      error,
      cumple: error <= tol || Math.abs(fc) <= tol
    });

    if (Math.abs(fc) < 1e-12 || error <= tol) break;

    if (fa * fc < 0) {
      b = c;
      fb = fc;
    } else {
      a = c;
      fa = fc;
    }
    cPrev = c;
  }

  return { error: null, pasos };
};

const ejecutarSecante = (fnStr, x0Ini, x1Ini, tol, maxIter) => {
  const pasos = [];
  let x0 = parseFloat(x0Ini);
  let x1 = parseFloat(x1Ini);
  let fx0 = evaluarFuncion(fnStr, x0);
  let fx1 = evaluarFuncion(fnStr, x1);

  if (fx0 === null || fx1 === null) return { error: "Sintaxis de función no válida.", pasos: [] };

  for (let i = 1; i <= maxIter; i++) {
    const denom = fx1 - fx0;
    if (Math.abs(denom) < 1e-15) {
      return { error: "División entre cero en la secante (f(x1) = f(x0)).", pasos };
    }

    const x2 = x1 - (fx1 * (x1 - x0)) / denom;
    const fx2 = evaluarFuncion(fnStr, x2);
    const error = Math.abs((x2 - x1) / (x2 !== 0 ? x2 : 1)) * 100;

    pasos.push({
      iter: i,
      x0,
      x1,
      c: x2, // Aproximación actual
      fc: fx2, // Yc
      error,
      cumple: error <= tol || Math.abs(fx2) <= tol
    });

    if (Math.abs(fx2) < 1e-12 || error <= tol) break;

    x0 = x1;
    fx0 = fx1;
    x1 = x2;
    fx1 = fx2;
  }

  return { error: null, pasos };
};

// ===========================================================================
// 3. COMPONENTE PRINCIPAL
// ===========================================================================
const SimuladorTab = () => {
  // Parámetros de entrada
  const [funcionStr, setFuncionStr] = useState("cos(x) - x");
  const [a, setA] = useState("0");
  const [b, setB] = useState("1");
  const [tolerancia, setTolerancia] = useState("0.0001");
  const [maxIter, setMaxIter] = useState("20");

  // Modo de visualización: 'comparativa' | 'biseccion' | 'secante'
  const [vistaActiva, setVistaActiva] = useState("comparativa");

  // Ejecución de ambos métodos
  const resultadoBiseccion = useMemo(() => {
    return ejecutarBiseccion(funcionStr, a, b, parseFloat(tolerancia) || 0.0001, parseInt(maxIter, 10) || 20);
  }, [funcionStr, a, b, tolerancia, maxIter]);

  const resultadoSecante = useMemo(() => {
    return ejecutarSecante(funcionStr, a, b, parseFloat(tolerancia) || 0.0001, parseInt(maxIter, 10) || 20);
  }, [funcionStr, a, b, tolerancia, maxIter]);

  const pasosBis = resultadoBiseccion.pasos;
  const pasosSec = resultadoSecante.pasos;

  // Generación de coordenadas para el Gráfico SVG (Valor de Yc vs Iteraciones)
  const datosGraficoSVG = useMemo(() => {
    const todosYc = [...pasosBis.map((p) => p.fc), ...pasosSec.map((p) => p.fc)].filter((y) => y !== null && !isNaN(y));
    const minY = Math.min(-0.5, ...todosYc);
    const maxY = Math.max(0.3, ...todosYc);
    const maxIters = Math.max(1, pasosBis.length, pasosSec.length);

    const mapX = (iter) => 40 + (iter / maxIters) * 380;
    const mapY = (val) => 170 - ((val - minY) / (maxY - minY || 1)) * 140;

    const puntosBis = pasosBis.map((p) => `${mapX(p.iter)},${mapY(p.fc)}`).join(" ");
    const puntosSec = pasosSec.map((p) => `${mapX(p.iter)},${mapY(p.fc)}`).join(" ");
    const yCero = mapY(0);

    return { minY, maxY, maxIters, mapX, mapY, puntosBis, puntosSec, yCero };
  }, [pasosBis, pasosSec]);

  return (
    <div className="p-3 border rounded bg-light">
      {/* ENCABEZADO */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-3 border-bottom pb-2">
        <div>
          <h5 className="text-primary fw-bold mb-1">
            <i className="bi bi-graph-up-arrow me-2"></i>
            Simulador de Estabilidad y Rapidez de Convergencia (Subtema 1.4)
          </h5>
          <p className="text-muted small mb-0">
            Caso Práctico: Comparativa del comportamiento del residuo <code>Y<sub>c</sub> = f(c)</code> entre Bisección y Secante.
          </p>
        </div>

        {/* Botones de Selección de Vista */}
        <div className="btn-group mt-2 mt-md-0 shadow-sm" role="group">
          <button
            type="button"
            className={`btn btn-sm ${vistaActiva === "comparativa" ? "btn-primary fw-bold" : "btn-outline-primary"}`}
            onClick={() => setVistaActiva("comparativa")}
          >
            Comparativa Simultánea
          </button>
          <button
            type="button"
            className={`btn btn-sm ${vistaActiva === "biseccion" ? "btn-primary fw-bold" : "btn-outline-primary"}`}
            onClick={() => setVistaActiva("biseccion")}
          >
            Solo Bisección
          </button>
          <button
            type="button"
            className={`btn btn-sm ${vistaActiva === "secante" ? "btn-primary fw-bold" : "btn-outline-primary"}`}
            onClick={() => setVistaActiva("secante")}
          >
            Solo Secante
          </button>
        </div>
      </div>

      {/* PANEL DE PARÁMETROS */}
      <div className="card mb-3 shadow-sm border-primary">
        <div className="card-body bg-white">
          <div className="row g-3 align-items-end">
            <div className="col-md-3 col-12">
              <label className="form-label small fw-bold text-primary mb-1">Función f(x):</label>
              <input
                type="text"
                className="form-control font-monospace fw-bold"
                value={funcionStr}
                onChange={(e) => setFuncionStr(e.target.value)}
                placeholder="cos(x) - x"
                required
              />
            </div>

            <div className="col-md-2 col-6">
              <label className="form-label small fw-bold text-secondary mb-1">Límite a / x<sub>0</sub>:</label>
              <input
                type="number"
                step="any"
                className="form-control font-monospace"
                value={a}
                onChange={(e) => setA(e.target.value)}
                required
              />
            </div>

            <div className="col-md-2 col-6">
              <label className="form-label small fw-bold text-secondary mb-1">Límite b / x<sub>1</sub>:</label>
              <input
                type="number"
                step="any"
                className="form-control font-monospace"
                value={b}
                onChange={(e) => setB(e.target.value)}
                required
              />
            </div>

            <div className="col-md-2 col-6">
              <label className="form-label small fw-bold text-danger mb-1">Tolerancia (Tol):</label>
              <input
                type="number"
                step="any"
                min="0.0000001"
                className="form-control font-monospace"
                value={tolerancia}
                onChange={(e) => setTolerancia(e.target.value)}
                required
              />
            </div>

            <div className="col-md-1 col-6">
              <label className="form-label small fw-bold text-secondary mb-1">Máx. Iter:</label>
              <input
                type="number"
                min="1"
                max="100"
                step="1"
                className="form-control font-monospace"
                value={maxIter}
                onChange={(e) => setMaxIter(e.target.value)}
                required
              />
            </div>

            <div className="col-md-2 col-12">
              <button
                type="button"
                className="btn btn-outline-danger w-100 py-2"
                onClick={() => {
                  setFuncionStr("cos(x) - x");
                  setA("0");
                  setB("1");
                  setTolerancia("0.0001");
                  setMaxIter("20");
                }}
                title="Restablecer valores del caso de estudio"
              >
                <i className="bi bi-arrow-counterclockwise me-1"></i> Reiniciar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MENSAJES DE ERROR SI APLICAN */}
      {resultadoBiseccion.error && (
        <div className="alert alert-warning py-2 small mb-3">
          <strong>Bisección:</strong> {resultadoBiseccion.error}
        </div>
      )}
      {resultadoSecante.error && (
        <div className="alert alert-danger py-2 small mb-3">
          <strong>Secante:</strong> {resultadoSecante.error}
        </div>
      )}

      {/* TARJETAS RESUMEN DE COMPARACIÓN DE CRITERIOS */}
      <div className="row g-3 mb-3">
        {/* Card Bisección */}
        <div className="col-md-6 col-12">
          <div className="card h-100 shadow-sm border-0 border-top border-4 border-primary">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="fw-bold text-primary mb-0">Método de Bisección</h6>
                <span className="badge bg-primary">{pasosBis.length} Iteraciones</span>
              </div>
              <p className="small text-muted mb-2">
                <strong>Estabilidad:</strong> Máxima (garantizada por intervalo cerrado).<br />
                <strong>Rapidez:</strong> Menor rapidez (convergencia lineal).<br />
                <strong>Comportamiento de Y<sub>c</sub>:</strong> Oscilatorio amortiguado alrededor de cero.
              </p>
              {pasosBis.length > 0 && (
                <div className="p-2 rounded bg-light border small font-monospace">
                  Raíz aprox: <strong>{pasosBis[pasosBis.length - 1].c.toFixed(6)}</strong> | Error:{" "}
                  <strong className="text-danger">{pasosBis[pasosBis.length - 1].error.toFixed(5)}%</strong>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Card Secante */}
        <div className="col-md-6 col-12">
          <div className="card h-100 shadow-sm border-0 border-top border-4 border-success">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="fw-bold text-success mb-0">Método de la Secante</h6>
                <span className="badge bg-success">{pasosSec.length} Iteraciones</span>
              </div>
              <p className="small text-muted mb-2">
                <strong>Estabilidad:</strong> Condicional (sensible a valores iniciales).<br />
                <strong>Rapidez:</strong> Mayor rapidez (superlineal &asymp; 1.618).<br />
                <strong>Comportamiento de Y<sub>c</sub>:</strong> Caída rápida monótona directa a cero.
              </p>
              {pasosSec.length > 0 && (
                <div className="p-2 rounded bg-light border small font-monospace">
                  Raíz aprox: <strong>{pasosSec[pasosSec.length - 1].c.toFixed(6)}</strong> | Error:{" "}
                  <strong className="text-danger">{pasosSec[pasosSec.length - 1].error.toFixed(5)}%</strong>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* GRÁFICO DE CONVERGENCIA: VALOR DE Yc VS ITERACIONES */}
      <div className="card mb-3 shadow-sm border-0">
        <div className="card-header bg-dark text-white fw-bold small d-flex justify-content-between align-items-center">
          <span>
            <i className="bi bi-graph-up me-2 text-warning"></i>
            Gráfico de Convergencia del Residuo: Valor de Y<sub>c</sub> = f(c) vs. Iteraciones
          </span>
          <div className="small">
            <span className="badge bg-primary me-2">&bull; Bisección (Oscilatorio)</span>
            <span className="badge bg-success">&bull; Secante (Rápido)</span>
          </div>
        </div>
        <div className="card-body bg-white text-center p-2">
          <svg width="100%" height="220" viewBox="0 0 450 190">
            {/* Eje horizontal Yc = 0 */}
            <line x1="40" y1={datosGraficoSVG.yCero} x2="430" y2={datosGraficoSVG.yCero} stroke="#6c757d" strokeDasharray="3 3" strokeWidth="1.5" />
            <text x="435" y={datosGraficoSVG.yCero + 4} fill="#6c757d" fontSize="9" textAnchor="start">0.0 (Raíz)</text>

            {/* Eje vertical Y */}
            <line x1="40" y1="20" x2="40" y2="170" stroke="#ced4da" strokeWidth="1.5" />

            {/* Curva de Bisección */}
            {(vistaActiva === "comparativa" || vistaActiva === "biseccion") && pasosBis.length > 0 && (
              <>
                <polyline fill="none" stroke="#0d6efd" strokeWidth="2.5" points={datosGraficoSVG.puntosBis} />
                {pasosBis.map((p) => (
                  <circle key={`bis-${p.iter}`} cx={datosGraficoSVG.mapX(p.iter)} cy={datosGraficoSVG.mapY(p.fc)} r="3.5" fill="#0d6efd" />
                ))}
              </>
            )}

            {/* Curva de Secante */}
            {(vistaActiva === "comparativa" || vistaActiva === "secante") && pasosSec.length > 0 && (
              <>
                <polyline fill="none" stroke="#198754" strokeWidth="2.5" points={datosGraficoSVG.puntosSec} />
                {pasosSec.map((p) => (
                  <circle key={`sec-${p.iter}`} cx={datosGraficoSVG.mapX(p.iter)} cy={datosGraficoSVG.mapY(p.fc)} r="3.5" fill="#198754" />
                ))}
              </>
            )}

            {/* Etiquetas de Ejes */}
            <text x="235" y="185" fill="#495057" fontSize="10" textAnchor="middle" fontWeight="bold">Iteraciones</text>
            <text x="15" y="95" fill="#495057" fontSize="10" textAnchor="middle" transform="rotate(-90 15,95)" fontWeight="bold">Valor de Yc</text>
          </svg>
          <div className="small text-muted mt-1">
            Observa cómo <strong>Bisección</strong> oscila alternando signos antes de estabilizarse en 0, mientras que <strong>Secante</strong> desciende rápidamente en pocas iteraciones.
          </div>
        </div>
      </div>

      {/* TABLAS DE ITERACIONES */}
      <div className="row g-3">
        {/* Tabla Bisección */}
        {(vistaActiva === "comparativa" || vistaActiva === "biseccion") && (
          <div className={vistaActiva === "comparativa" ? "col-lg-6 col-12" : "col-12"}>
            <div className="card shadow-sm h-100">
              <div className="card-header bg-white fw-bold small text-primary d-flex justify-content-between align-items-center">
                <span>Iteraciones: Método de Bisección</span>
                <span className="badge bg-primary">{pasosBis.length} pasos</span>
              </div>
              <div className="table-responsive small" style={{ maxHeight: "280px" }}>
                <table className="table table-sm table-bordered table-hover align-middle text-center mb-0 font-monospace">
                  <thead className="table-light sticky-top">
                    <tr>
                      <th>i</th>
                      <th>a</th>
                      <th>b</th>
                      <th>c</th>
                      <th>f(c) [Y<sub>c</sub>]</th>
                      <th>Error (%)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pasosBis.map((p) => (
                      <tr key={p.iter} className={p.cumple ? "table-success fw-bold" : ""}>
                        <td>{p.iter}</td>
                        <td>{p.a.toFixed(4)}</td>
                        <td>{p.b.toFixed(4)}</td>
                        <td className="text-primary">{p.c.toFixed(6)}</td>
                        <td className={p.fc >= 0 ? "text-dark" : "text-danger"}>{p.fc.toFixed(5)}</td>
                        <td>{p.error.toFixed(4)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tabla Secante */}
        {(vistaActiva === "comparativa" || vistaActiva === "secante") && (
          <div className={vistaActiva === "comparativa" ? "col-lg-6 col-12" : "col-12"}>
            <div className="card shadow-sm h-100">
              <div className="card-header bg-white fw-bold small text-success d-flex justify-content-between align-items-center">
                <span>Iteraciones: Método de la Secante</span>
                <span className="badge bg-success">{pasosSec.length} pasos</span>
              </div>
              <div className="table-responsive small" style={{ maxHeight: "280px" }}>
                <table className="table table-sm table-bordered table-hover align-middle text-center mb-0 font-monospace">
                  <thead className="table-light sticky-top">
                    <tr>
                      <th>i</th>
                      <th>x<sub>0</sub></th>
                      <th>x<sub>1</sub></th>
                      <th>x<sub>2</sub> (c)</th>
                      <th>f(c) [Y<sub>c</sub>]</th>
                      <th>Error (%)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pasosSec.map((p) => (
                      <tr key={p.iter} className={p.cumple ? "table-success fw-bold" : ""}>
                        <td>{p.iter}</td>
                        <td>{p.x0.toFixed(4)}</td>
                        <td>{p.x1.toFixed(4)}</td>
                        <td className="text-success">{p.c.toFixed(6)}</td>
                        <td className={p.fc >= 0 ? "text-dark" : "text-danger"}>{p.fc.toFixed(5)}</td>
                        <td>{p.error.toFixed(4)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimuladorTab;