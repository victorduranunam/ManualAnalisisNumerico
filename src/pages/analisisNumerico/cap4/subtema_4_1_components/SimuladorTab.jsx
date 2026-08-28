import React, { useState, useMemo } from "react";

const PRESET_DATASETS = [
  {
    name: "3 Puntos (Grado 2)",
    xEval: 2.5,
    points: [
      { x: 1, y: 1 },
      { x: 2, y: 8 },
      { x: 3, y: 27 },
    ],
  },
  {
    name: "4 Puntos (Grado 3)",
    xEval: 2.0,
    points: [
      { x: 0, y: 1 },
      { x: 1, y: 2.7183 },
      { x: 3, y: 20.0855 },
      { x: 4, y: 54.5982 },
    ],
  },
  {
    name: "5 Puntos (Grado 4)",
    xEval: 3.5,
    points: [
      { x: 1, y: 0.0 },
      { x: 2, y: 0.6931 },
      { x: 3, y: 1.0986 },
      { x: 4, y: 1.3863 },
      { x: 5, y: 1.6094 },
    ],
  },
];

const SimuladorTab = () => {
  const [points, setPoints] = useState(PRESET_DATASETS[0].points);
  const [xEval, setXEval] = useState(2.5);
  const [showTable, setShowTable] = useState(true);

  // Manejadores para edición de puntos
  const handlePointChange = (index, field, value) => {
    const newPoints = [...points];
    newPoints[index] = {
      ...newPoints[index],
      [field]: parseFloat(value) || 0,
    };
    setPoints(newPoints);
  };

  const addPoint = () => {
    const lastX = points.length > 0 ? points[points.length - 1].x + 1 : 0;
    setPoints([...points, { x: lastX, y: 0 }]);
  };

  const removePoint = (index) => {
    if (points.length > 2) {
      setPoints(points.filter((_, i) => i !== index));
    }
  };

  const loadPreset = (preset) => {
    setPoints(preset.points);
    setXEval(preset.xEval);
  };

  // Cálculo del Polinomio de Lagrange
  const calculation = useMemo(() => {
    if (points.length < 2) {
      return { error: "Se requieren al menos 2 puntos para interpolar." };
    }

    // Validar valores duplicados de x
    const xValues = points.map((p) => p.x);
    const hasDuplicates = new Set(xValues).size !== xValues.length;
    if (hasDuplicates) {
      return { error: "Los valores de xᵢ deben ser distintos entre sí para evitar división entre cero." };
    }

    const numXEval = parseFloat(xEval);
    if (isNaN(numXEval)) {
      return { error: "Ingresa un valor numérico válido para x a evaluar." };
    }

    const n = points.length; // grado = n - 1
    const basisPolynomials = [];
    let pEval = 0;

    for (let i = 0; i < n; i++) {
      let liVal = 1;
      let denVal = 1;
      const numFactors = [];

      for (let j = 0; j < n; j++) {
        if (i !== j) {
          liVal *= (numXEval - points[j].x) / (points[i].x - points[j].x);
          denVal *= points[i].x - points[j].x;
          numFactors.push(`(x - ${points[j].x})`);
        }
      }

      const termVal = points[i].y * liVal;
      pEval += termVal;

      basisPolynomials.push({
        i,
        xi: points[i].x,
        yi: points[i].y,
        formulaStr: `${numFactors.join(" · ")} / (${denVal >= 0 ? denVal.toFixed(4) : `(${denVal.toFixed(4)})`})`,
        liVal,
        termVal,
      });
    }

    return {
      error: null,
      degree: n - 1,
      numXEval,
      pEval,
      basisPolynomials,
    };
  }, [points, xEval]);

  // Generación de la gráfica SVG
  const graphData = useMemo(() => {
    if (calculation.error) return null;

    const allX = [...points.map((p) => p.x), parseFloat(xEval)].filter((v) => !isNaN(v));
    const minX = Math.min(...allX);
    const maxX = Math.max(...allX);
    const spanX = maxX - minX || 1;
    const xDomainMin = minX - spanX * 0.15;
    const xDomainMax = maxX + spanX * 0.15;

    // Función evaluadora de Lagrange en cualquier x
    const evalPolyAt = (xVal) => {
      let sum = 0;
      const n = points.length;
      for (let i = 0; i < n; i++) {
        let prod = 1;
        for (let j = 0; j < n; j++) {
          if (i !== j) {
            prod *= (xVal - points[j].x) / (points[i].x - points[j].x);
          }
        }
        sum += points[i].y * prod;
      }
      return sum;
    };

    // Muestreo de curva
    const samples = 150;
    const curvePoints = [];
    let minY = Infinity;
    let maxY = -Infinity;

    for (let i = 0; i <= samples; i++) {
      const x = xDomainMin + (i * (xDomainMax - xDomainMin)) / samples;
      const y = evalPolyAt(x);
      if (!isNaN(y) && isFinite(y)) {
        curvePoints.push({ x, y });
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }

    // Incluir puntos y evaluación en el rango de Y
    points.forEach((p) => {
      if (p.y < minY) minY = p.y;
      if (p.y > maxY) maxY = p.y;
    });
    if (calculation.pEval < minY) minY = calculation.pEval;
    if (calculation.pEval > maxY) maxY = calculation.pEval;

    const spanY = maxY - minY || 1;
    const yDomainMin = minY - spanY * 0.15;
    const yDomainMax = maxY + spanY * 0.15;

    const svgW = 650;
    const svgH = 300;
    const padL = 50;
    const padR = 25;
    const padT = 20;
    const padB = 35;
    const plotW = svgW - padL - padR;
    const plotH = svgH - padT - padB;

    const mapX = (x) => padL + ((x - xDomainMin) / (xDomainMax - xDomainMin)) * plotW;
    const mapY = (y) => padT + plotH - ((y - yDomainMin) / (yDomainMax - yDomainMin)) * plotH;

    const curvePath = curvePoints
      .map((p, idx) => `${idx === 0 ? "M" : "L"} ${mapX(p.x).toFixed(2)} ${mapY(p.y).toFixed(2)}`)
      .join(" ");

    return {
      svgW,
      svgH,
      mapX,
      mapY,
      curvePath,
      axisY0: mapY(0),
      axisX0: mapX(0),
      evalX: mapX(calculation.numXEval),
      evalY: mapY(calculation.pEval),
      yDomainMin,
      yDomainMax,
    };
  }, [points, xEval, calculation]);

  return (
    <div className="p-3 border rounded bg-light">
      {/* Encabezado */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h5 className="text-primary fw-bold mb-1">
            <span className="me-2">📐</span> Simulador: Polinomio de Interpolación de Lagrange
          </h5>
          <p className="text-muted small mb-0">
            Ajusta un polinomio único $P_n(x)$ de grado $n \le N-1$ que pasa exactamente por los $N$ puntos dados.
          </p>
        </div>
      </div>

      {/* Selector de ejemplos */}
      <div className="mb-3">
        <span className="small text-secondary fw-semibold me-2">Cargar ejemplos:</span>
        <div className="btn-group btn-group-sm">
          {PRESET_DATASETS.map((preset, idx) => (
            <button
              key={idx}
              className="btn btn-outline-secondary"
              onClick={() => loadPreset(preset)}
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* Panel de Entradas */}
      <div className="row g-3 mb-3">
        {/* Tabla de Puntos (x, y) */}
        <div className="col-12 col-lg-7">
          <div className="card h-100 border shadow-sm bg-white p-3">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="small fw-bold text-dark">
                Puntos de soporte $(x_i, y_i)$ — ({points.length} puntos)
              </span>
              <button className="btn btn-sm btn-outline-primary py-0" onClick={addPoint}>
                + Agregar punto
              </button>
            </div>

            <div className="table-responsive" style={{ maxHeight: "200px" }}>
              <table className="table table-sm table-bordered text-center align-middle mb-0 small">
                <thead className="table-light">
                  <tr>
                    <th style={{ width: "15%" }}>i</th>
                    <th style={{ width: "38%" }}>xᵢ</th>
                    <th style={{ width: "38%" }}>yᵢ = f(xᵢ)</th>
                    <th style={{ width: "9%" }}></th>
                  </tr>
                </thead>
                <tbody>
                  {points.map((p, idx) => (
                    <tr key={idx}>
                      <td className="fw-bold font-monospace">{idx}</td>
                      <td>
                        <input
                          type="number"
                          step="any"
                          className="form-control form-control-sm text-center font-monospace"
                          value={p.x}
                          onChange={(e) => handlePointChange(idx, "x", e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          step="any"
                          className="form-control form-control-sm text-center font-monospace"
                          value={p.y}
                          onChange={(e) => handlePointChange(idx, "y", e.target.value)}
                        />
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-danger py-0 px-2"
                          disabled={points.length <= 2}
                          onClick={() => removePoint(idx)}
                          title="Eliminar punto"
                        >
                          &times;
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Punto a evaluar y Resultado */}
        <div className="col-12 col-lg-5">
          <div className="card h-100 border shadow-sm bg-white p-3 d-flex flex-column justify-content-between">
            <div>
              <label className="form-label small fw-bold mb-1">
                Valor de interpolación ($x$ a evaluar):
              </label>
              <div className="input-group input-group-sm mb-3">
                <span className="input-group-text font-monospace">x =</span>
                <input
                  type="number"
                  step="any"
                  className="form-control font-monospace"
                  value={xEval}
                  onChange={(e) => setXEval(e.target.value)}
                />
              </div>
            </div>

            {!calculation.error && (
              <div className="p-3 bg-primary bg-opacity-10 border border-primary rounded text-center">
                <span className="text-muted small d-block mb-1">
                  Polinomio Grado {calculation.degree} evaluado en $x = {calculation.numXEval}$:
                </span>
                <span className="h4 fw-bold text-primary font-monospace mb-0 d-block">
                  P({calculation.numXEval}) = {calculation.pEval.toFixed(6)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Alerta de Error */}
      {calculation.error && (
        <div className="alert alert-danger py-2 small mb-3">{calculation.error}</div>
      )}

      {/* Gráfica SVG */}
      {!calculation.error && graphData && (
        <>
          <div className="card border p-2 bg-white mb-3 shadow-sm">
            <div className="d-flex justify-content-between align-items-center mb-1 px-2">
              <span className="small fw-bold text-secondary">Gráfica del Polinomio de Lagrange</span>
              <div className="small">
                <span className="badge bg-primary me-2">● Puntos $(x_i, y_i)$</span>
                <span className="badge bg-danger me-2">● Punto interpolado $P(x)$</span>
                <span className="badge bg-secondary">— Curva $P_n(x)$</span>
              </div>
            </div>

            <div className="table-responsive text-center">
              <svg viewBox={`0 0 ${graphData.svgW} ${graphData.svgH}`} className="w-100" style={{ maxHeight: "300px" }}>
                {/* Eje X (y = 0) si está dentro del dominio */}
                {graphData.axisY0 >= 20 && graphData.axisY0 <= graphData.svgH - 30 && (
                  <line
                    x1="40"
                    y1={graphData.axisY0}
                    x2={graphData.svgW - 15}
                    y2={graphData.axisY0}
                    stroke="#dee2e6"
                    strokeWidth="1.5"
                  />
                )}

                {/* Líneas guía del punto interpolado */}
                <line
                  x1={graphData.evalX}
                  y1={graphData.evalY}
                  x2={graphData.evalX}
                  y2={graphData.svgH - 25}
                  stroke="#dc3545"
                  strokeDasharray="3,3"
                  strokeWidth="1.2"
                />
                <line
                  x1="45"
                  y1={graphData.evalY}
                  x2={graphData.evalX}
                  y2={graphData.evalY}
                  stroke="#dc3545"
                  strokeDasharray="3,3"
                  strokeWidth="1.2"
                />

                {/* Curva continua del Polinomio */}
                <path d={graphData.curvePath} fill="none" stroke="#0d6efd" strokeWidth="2.2" />

                {/* Puntos de soporte (xi, yi) */}
                {points.map((p, idx) => {
                  const cx = graphData.mapX(p.x);
                  const cy = graphData.mapY(p.y);
                  return (
                    <g key={idx}>
                      <circle cx={cx} cy={cy} r="5" fill="#0d6efd" stroke="#fff" strokeWidth="2" />
                      <text x={cx} y={cy - 10} fontSize="10" fontWeight="bold" textAnchor="middle" fill="#0d6efd">
                        P{idx}({p.x}, {p.y})
                      </text>
                    </g>
                  );
                })}

                {/* Punto interpolado */}
                <circle cx={graphData.evalX} cy={graphData.evalY} r="6" fill="#dc3545" stroke="#fff" strokeWidth="2" />
                <text
                  x={graphData.evalX}
                  y={graphData.evalY - 10}
                  fontSize="11"
                  fontWeight="bold"
                  textAnchor="middle"
                  fill="#dc3545"
                >
                  ({calculation.numXEval}, {calculation.pEval.toFixed(3)})
                </text>
              </svg>
            </div>
          </div>

          {/* Botón y Tabla de Polinomios Base L_i(x) */}
          <div className="text-end mb-2">
            <button className="btn btn-sm btn-outline-primary" onClick={() => setShowTable(!showTable)}>
              {showTable ? "Ocultar tabla de polinomios base Lᵢ(x)" : "Mostrar tabla de polinomios base Lᵢ(x)"}
            </button>
          </div>

          {showTable && (
            <div className="table-responsive bg-white rounded border shadow-sm mb-3">
              <table className="table table-sm table-hover mb-0 text-center small">
                <thead className="table-light">
                  <tr>
                    <th style={{ width: "8%" }}>i</th>
                    <th style={{ width: "12%" }}>xᵢ</th>
                    <th style={{ width: "14%" }}>yᵢ</th>
                    <th style={{ width: "36%" }}>Polinomio Base Lᵢ(x)</th>
                    <th style={{ width: "15%" }}>Lᵢ({calculation.numXEval})</th>
                    <th style={{ width: "15%" }}>yᵢ · Lᵢ({calculation.numXEval})</th>
                  </tr>
                </thead>
                <tbody className="font-monospace">
                  {calculation.basisPolynomials.map((b) => (
                    <tr key={b.i}>
                      <td className="fw-bold">{b.i}</td>
                      <td>{b.xi.toFixed(4)}</td>
                      <td>{b.yi.toFixed(4)}</td>
                      <td className="text-secondary small">{b.formulaStr}</td>
                      <td>{b.liVal.toFixed(6)}</td>
                      <td className="fw-bold text-dark">{b.termVal.toFixed(6)}</td>
                    </tr>
                  ))}
                  <tr className="table-secondary fw-bold">
                    <td colSpan="5" className="text-end font-sans-serif">
                      P({calculation.numXEval}) = ∑ yᵢ · Lᵢ({calculation.numXEval}) =
                    </td>
                    <td className="text-primary">{calculation.pEval.toFixed(6)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SimuladorTab;