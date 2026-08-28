import React, { useState, useMemo } from "react";

// ==========================================
// 1. DATASETS PREDEFINIDOS DE EJEMPLO
// ==========================================
const PRESET_DATASETS = [
  {
    name: "f(x) = ln(x)",
    points: [
      { x: 1.0, y: 0.0 },
      { x: 2.0, y: 0.693147 },
      { x: 3.0, y: 1.098612 },
      { x: 4.0, y: 1.386294 },
    ],
    evalX: 2.5,
  },
  {
    name: "Polinomio Cúbico",
    points: [
      { x: 0.0, y: 1.0 },
      { x: 1.0, y: 3.0 },
      { x: 2.0, y: 2.0 },
      { x: 3.0, y: 5.0 },
    ],
    evalX: 1.5,
  },
  {
    name: "f(x) = 1/x (Espaciado no uniforme)",
    points: [
      { x: 1.0, y: 1.0 },
      { x: 2.0, y: 0.5 },
      { x: 4.0, y: 0.25 },
      { x: 5.0, y: 0.2 },
    ],
    evalX: 3.0,
  },
];

const SimuladorTab = () => {
  // Estado para la tabla de puntos
  const [points, setPoints] = useState(PRESET_DATASETS[0].points);
  const [evalX, setEvalX] = useState(2.5);
  const [mode, setMode] = useState("divided"); // "divided" (Divididas) o "forward" (Finitas hacia adelante)

  // ==========================================
  // 2. CÁLCULO DE TABLAS DE DIFERENCIAS
  // ==========================================
  const calculation = useMemo(() => {
    if (!points || points.length < 2) {
      return { error: "Se requieren al menos 2 puntos para interpolar." };
    }

    // Clonar y ordenar por x
    const sorted = [...points].map((p) => ({
      x: parseFloat(p.x),
      y: parseFloat(p.y),
    }));

    if (sorted.some((p) => isNaN(p.x) || isNaN(p.y))) {
      return { error: "Todos los puntos deben tener valores numéricos válidos." };
    }

    // Validar x repetidos
    for (let i = 0; i < sorted.length - 1; i++) {
      for (let j = i + 1; j < sorted.length; j++) {
        if (Math.abs(sorted[i].x - sorted[j].x) < 1e-9) {
          return { error: `Hay valores repetidos de x (${sorted[i].x}). Los nodos deben ser distintos.` };
        }
      }
    }

    const n = sorted.length;
    const xVals = sorted.map((p) => p.x);

    // Matriz de Diferencias Divididas: D[i][j] = f[x_i, ..., x_{i+j}]
    const D = Array.from({ length: n }, () => Array(n).fill(null));
    for (let i = 0; i < n; i++) {
      D[i][0] = sorted[i].y;
    }

    for (let j = 1; j < n; j++) {
      for (let i = 0; i < n - j; i++) {
        const denom = xVals[i + j] - xVals[i];
        D[i][j] = (D[i + 1][j - 1] - D[i][j - 1]) / denom;
      }
    }

    // Coeficientes a_j = D[0][j] (para el polinomio de Newton)
    const coefs = [];
    for (let j = 0; j < n; j++) {
      coefs.push(D[0][j]);
    }

    // Evaluar polinomio de Newton en cualquier punto x: P(x)
    const evaluatePolynomial = (xVal) => {
      let sum = coefs[0];
      let term = 1;
      for (let j = 1; j < n; j++) {
        term *= xVal - xVals[j - 1];
        sum += coefs[j] * term;
      }
      return sum;
    };

    // Evaluación en el punto de consulta
    const numEvalX = parseFloat(evalX);
    let interpolatedValue = null;
    let evalStepByStep = [];

    if (!isNaN(numEvalX)) {
      interpolatedValue = evaluatePolynomial(numEvalX);

      let termProd = 1;
      let accum = coefs[0];
      evalStepByStep.push({
        j: 0,
        coef: coefs[0],
        termStr: `${coefs[0].toFixed(6)}`,
        accumVal: accum,
      });

      for (let j = 1; j < n; j++) {
        const factor = numEvalX - xVals[j - 1];
        termProd *= factor;
        const addVal = coefs[j] * termProd;
        accum += addVal;

        let factorsStr = "";
        for (let k = 0; k < j; k++) {
          factorsStr += `(${numEvalX.toFixed(2)} - ${xVals[k].toFixed(2)})`;
        }

        evalStepByStep.push({
          j,
          coef: coefs[j],
          termStr: `${coefs[j] >= 0 ? "+" : ""}${coefs[j].toFixed(6)} · ${factorsStr}`,
          accumVal: accum,
        });
      }
    }

    // Construcción de la expresión formal P(x) en texto
    let polyString = `${coefs[0].toFixed(4)}`;
    for (let j = 1; j < n; j++) {
      const c = coefs[j];
      const sign = c >= 0 ? " + " : " - ";
      let factorStr = "";
      for (let k = 0; k < j; k++) {
        factorStr += `(x - ${xVals[k].toFixed(2)})`;
      }
      polyString += `${sign}${Math.abs(c).toFixed(4)}${factorStr}`;
    }

    // Verificar si el espaciado es constante para Diferencias Finitas ordinarias
    const h0 = xVals - xVals[0];
    let isEquallySpaced = true;
    for (let i = 1; i < n - 1; i++) {
      if (Math.abs(xVals[i + 1] - xVals[i] - h0) > 1e-4) {
        isEquallySpaced = false;
        break;
      }
    }

    // Matriz de Diferencias Finitas hacia adelante: Delta[i][j] = Delta^j y_i
    const Delta = Array.from({ length: n }, () => Array(n).fill(null));
    for (let i = 0; i < n; i++) {
      Delta[i][0] = sorted[i].y;
    }
    for (let j = 1; j < n; j++) {
      for (let i = 0; i < n - j; i++) {
        Delta[i][j] = Delta[i + 1][j - 1] - Delta[i][j - 1];
      }
    }

    return {
      error: null,
      sortedPoints: sorted,
      n,
      D,
      Delta,
      isEquallySpaced,
      h: isEquallySpaced ? h0 : null,
      coefs,
      polyString,
      evaluatePolynomial,
      numEvalX,
      interpolatedValue,
      evalStepByStep,
    };
  }, [points, evalX]);

  // ==========================================
  // 3. GRÁFICA SVG DEL POLINOMIO INTERPOLANTE
  // ==========================================
  const graph = useMemo(() => {
    if (calculation.error) return null;

    const { sortedPoints, evaluatePolynomial, numEvalX, interpolatedValue } = calculation;
    const xCoords = sortedPoints.map((p) => p.x);
    if (!isNaN(numEvalX)) xCoords.push(numEvalX);

    const minX = Math.min(...xCoords);
    const maxX = Math.max(...xCoords);
    const marginX = (maxX - minX) * 0.15 || 1;
    const xStart = minX - marginX;
    const xEnd = maxX + marginX;

    const samples = 140;
    const curvePoints = [];
    let minY = Infinity;
    let maxY = -Infinity;

    for (let i = 0; i <= samples; i++) {
      const xVal = xStart + (i * (xEnd - xStart)) / samples;
      const yVal = evaluatePolynomial(xVal);
      curvePoints.push({ x: xVal, y: yVal });
      if (yVal < minY) minY = yVal;
      if (yVal > maxY) maxY = yVal;
    }

    const marginY = (maxY - minY) * 0.15 || 1;
    minY -= marginY;
    maxY += marginY;

    const svgW = 650;
    const svgH = 280;
    const padL = 45;
    const padR = 25;
    const padT = 20;
    const padB = 35;
    const plotW = svgW - padL - padR;
    const plotH = svgH - padT - padB;

    const mapX = (x) => padL + ((x - xStart) / (xEnd - xStart)) * plotW;
    const mapY = (y) => padT + plotH - ((y - minY) / (maxY - minY)) * plotH;

    const curvePath = curvePoints
      .map((p, idx) => `${idx === 0 ? "M" : "L"} ${mapX(p.x).toFixed(2)} ${mapY(p.y).toFixed(2)}`)
      .join(" ");

    return {
      svgW,
      svgH,
      mapX,
      mapY,
      axisY0: mapY(0),
      curvePath,
      numEvalX,
      interpolatedValue,
    };
  }, [calculation]);

  // Manejo de edición de la tabla de puntos
  const handlePointChange = (index, field, value) => {
    const next = [...points];
    next[index][field] = value;
    setPoints(next);
  };

  const addPoint = () => {
    const lastX = points.length > 0 ? parseFloat(points[points.length - 1].x) || 0 : 0;
    setPoints([...points, { x: lastX + 1, y: 0 }]);
  };

  const removePoint = (index) => {
    if (points.length > 2) {
      setPoints(points.filter((_, i) => i !== index));
    }
  };

  const loadPreset = (preset) => {
    setPoints(preset.points);
    setEvalX(preset.evalX);
  };

  return (
    <div className="p-3 border rounded bg-light">
      {/* Encabezado */}
      <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
        <div>
          <h5 className="text-primary fw-bold mb-1">
            <span className="me-2">📊</span> Simulador: Diferencias Finitas y Divididas de Newton
          </h5>
          <p className="text-muted small mb-0">
            Construcción de la tabla piramidal de diferencias y obtención del polinomio interpolante $P_n(x)$.
          </p>
        </div>
      </div>

      {/* Selector de ejemplos */}
      <div className="mb-3">
        <span className="small text-secondary fw-semibold me-2">Ejemplos predefinidos:</span>
        <div className="btn-group btn-group-sm">
          {PRESET_DATASETS.map((p, idx) => (
            <button key={idx} className="btn btn-outline-secondary" onClick={() => loadPreset(p)}>
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Editor de Puntos e Interpolación */}
      <div className="row g-3 mb-3">
        {/* Columna Izquierda: Tabla de Puntos (Entrada) */}
        <div className="col-12 col-lg-5">
          <div className="card h-100 border shadow-sm">
            <div className="card-header bg-white py-2 d-flex justify-content-between align-items-center">
              <span className="fw-bold small text-dark">Nodos de interpolación (xᵢ, yᵢ)</span>
              <button className="btn btn-xs btn-outline-primary py-0 px-2 small" onClick={addPoint}>
                + Agregar Punto
              </button>
            </div>
            <div className="card-body p-2 table-responsive" style={{ maxHeight: "230px" }}>
              <table className="table table-sm table-bordered text-center mb-0 small">
                <thead className="table-light">
                  <tr>
                    <th>i</th>
                    <th>xᵢ</th>
                    <th>yᵢ = f(xᵢ)</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {points.map((p, idx) => (
                    <tr key={idx}>
                      <td className="align-middle fw-bold">{idx}</td>
                      <td>
                        <input
                          type="number"
                          step="any"
                          className="form-control form-control-sm text-center py-0"
                          value={p.x}
                          onChange={(e) => handlePointChange(idx, "x", e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          step="any"
                          className="form-control form-control-sm text-center py-0"
                          value={p.y}
                          onChange={(e) => handlePointChange(idx, "y", e.target.value)}
                        />
                      </td>
                      <td className="align-middle">
                        <button
                          className="btn btn-outline-danger btn-sm py-0 px-2"
                          disabled={points.length <= 2}
                          onClick={() => removePoint(idx)}
                        >
                          ✕
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Columna Derecha: Evaluación de x y Polinomio */}
        <div className="col-12 col-lg-7">
          <div className="card h-100 border shadow-sm">
            <div className="card-header bg-white py-2 d-flex justify-content-between align-items-center">
              <span className="fw-bold small text-dark">Evaluación e Interpolación</span>
              <div className="btn-group btn-group-sm">
                <button
                  className={`btn btn-sm ${mode === "divided" ? "btn-primary" : "btn-outline-primary"}`}
                  onClick={() => setMode("divided")}
                >
                  Diferencias Divididas f[...]
                </button>
                <button
                  className={`btn btn-sm ${mode === "forward" ? "btn-primary" : "btn-outline-primary"}`}
                  onClick={() => setMode("forward")}
                >
                  Diferencias Finitas (Δ)
                </button>
              </div>
            </div>
            <div className="card-body p-3">
              {calculation.error ? (
                <div className="alert alert-danger py-2 small mb-0">{calculation.error}</div>
              ) : (
                <>
                  <div className="row align-items-center mb-3">
                    <div className="col-sm-5">
                      <label className="form-label small fw-bold mb-1">Evaluar en x =</label>
                      <input
                        type="number"
                        step="any"
                        className="form-control form-control-sm font-monospace"
                        value={evalX}
                        onChange={(e) => setEvalX(e.target.value)}
                      />
                    </div>
                    <div className="col-sm-7 text-center border-start">
                      <small className="text-muted d-block">Resultado Interpolado P({evalX}):</small>
                      <span className="h4 fw-bold text-success font-monospace mb-0">
                        {calculation.interpolatedValue !== null ? calculation.interpolatedValue.toFixed(6) : "—"}
                      </span>
                    </div>
                  </div>

                  <div className="bg-light p-2 rounded border">
                    <span className="small fw-bold text-secondary d-block mb-1">
                      Polinomio de Newton generado P_{calculation.n - 1}(x):
                    </span>
                    <div className="small font-monospace text-break text-primary fw-semibold">
                      P(x) = {calculation.polyString}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================== */}
      {/* 4. TABLA PIRAMIDAL DE DIFERENCIAS          */}
      {/* ========================================== */}
      {!calculation.error && (
        <div className="card border shadow-sm mb-3">
          <div className="card-header bg-white py-2 d-flex justify-content-between align-items-center">
            <span className="fw-bold small text-dark">
              {mode === "divided"
                ? "Tabla Piramidal de Diferencias Divididas de Newton"
                : "Tabla de Diferencias Finitas hacia Adelante (Δ)"}
            </span>
            {mode === "forward" && (
              <span className={`badge ${calculation.isEquallySpaced ? "bg-success" : "bg-warning text-dark"}`}>
                {calculation.isEquallySpaced
                  ? `Espaciado constante h = ${calculation.h.toFixed(4)}`
                  : "Espaciado irregular (se recomiendan Divididas)"}
              </span>
            )}
          </div>
          <div className="table-responsive p-2">
            <table className="table table-sm table-bordered text-center mb-0 small">
              <thead className="table-light">
                <tr>
                  <th>i</th>
                  <th>xᵢ</th>
                  <th>yᵢ = f(xᵢ)</th>
                  {Array.from({ length: calculation.n - 1 }).map((_, j) => (
                    <th key={j} className={j === 0 ? "table-primary text-primary" : ""}>
                      {mode === "divided" ? `${j + 1}ª Dif. f[${j + 1}]` : `Δ${j + 1 > 1 ? `^${j + 1}` : ""} yᵢ`}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="font-monospace">
                {calculation.sortedPoints.map((p, i) => (
                  <tr key={i}>
                    <td className="fw-bold text-muted">{i}</td>
                    <td>{p.x.toFixed(4)}</td>
                    <td className={i === 0 ? "table-primary fw-bold text-primary" : ""}>
                      {p.y.toFixed(6)}
                    </td>
                    {Array.from({ length: calculation.n - 1 }).map((_, j) => {
                      const colIdx = j + 1;
                      const val =
                        mode === "divided"
                          ? calculation.D[i][colIdx]
                          : calculation.Delta[i][colIdx];
                      const isDiagonal = i === 0 && val !== null;

                      return (
                        <td
                          key={j}
                          className={isDiagonal ? "table-warning fw-bold text-dark border-warning" : ""}
                        >
                          {val !== null && val !== undefined ? val.toFixed(6) : "—"}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card-footer bg-light py-1 text-muted small">
            <span className="badge bg-warning text-dark me-1">■</span> Los valores resaltados en la primera diagonal
            corresponden a los coeficientes $a_0, a_1, \dots, a_n$ del polinomio de Newton.
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* 5. VISUALIZACIÓN GRÁFICA SVG               */}
      {/* ========================================== */}
      {!calculation.error && graph && (
        <div className="card p-2 bg-white mb-3 border shadow-sm">
          <div className="d-flex justify-content-between align-items-center mb-1 px-1">
            <span className="small fw-bold text-secondary">Curva del Polinomio Interpolante</span>
            <div className="small">
              <span className="badge bg-primary me-2">● Nodos base ({calculation.n})</span>
              <span className="badge bg-success me-2">— P_{calculation.n - 1}(x)</span>
              {!isNaN(calculation.numEvalX) && (
                <span className="badge bg-danger">◆ Punto evaluado ({calculation.numEvalX}, {calculation.interpolatedValue?.toFixed(2)})</span>
              )}
            </div>
          </div>

          <div className="table-responsive text-center">
            <svg viewBox={`0 0 ${graph.svgW} ${graph.svgH}`} className="w-100" style={{ maxHeight: "300px" }}>
              {/* Eje X */}
              <line x1="35" y1={graph.axisY0} x2={graph.svgW - 15} y2={graph.axisY0} stroke="#adb5bd" strokeWidth="1.5" />

              {/* Curva del Polinomio */}
              <path d={graph.curvePath} fill="none" stroke="#198754" strokeWidth="2.5" />

              {/* Nodos Base */}
              {calculation.sortedPoints.map((p, idx) => {
                const cx = graph.mapX(p.x);
                const cy = graph.mapY(p.y);
                return (
                  <g key={idx}>
                    <circle cx={cx} cy={cy} r="5" fill="#0d6efd" stroke="#fff" strokeWidth="1.5" />
                    <text x={cx} y={graph.axisY0 + 15} fontSize="10" textAnchor="middle" fill="#6c757d">
                      {p.x.toFixed(2)}
                    </text>
                  </g>
                );
              })}

              {/* Punto Evaluado Destacado */}
              {!isNaN(graph.numEvalX) && graph.interpolatedValue !== null && (
                <g>
                  <line
                    x1={graph.mapX(graph.numEvalX)}
                    y1={graph.axisY0}
                    x2={graph.mapX(graph.numEvalX)}
                    y2={graph.mapY(graph.interpolatedValue)}
                    stroke="#dc3545"
                    strokeDasharray="3,3"
                    strokeWidth="1.5"
                  />
                  <rect
                    x={graph.mapX(graph.numEvalX) - 5}
                    y={graph.mapY(graph.interpolatedValue) - 5}
                    width="10"
                    height="10"
                    fill="#dc3545"
                    transform={`rotate(45 ${graph.mapX(graph.numEvalX)} ${graph.mapY(graph.interpolatedValue)})`}
                    stroke="#fff"
                    strokeWidth="1.5"
                  />
                </g>
              )}
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default SimuladorTab;