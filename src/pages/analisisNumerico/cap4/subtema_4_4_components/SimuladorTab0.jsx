import React, { useState, useMemo } from "react";

// ==========================================
// 1. EVALUADOR MATEMÁTICO
// ==========================================
const evaluateFunction = (expr, xVal) => {
  try {
    let sanitized = expr
      .toLowerCase()
      .replace(/\^/g, "**")
      .replace(/\bsin\b/g, "Math.sin")
      .replace(/\bcos\b/g, "Math.cos")
      .replace(/\btan\b/g, "Math.tan")
      .replace(/\bexp\b/g, "Math.exp")
      .replace(/\blog\b/g, "Math.log")
      .replace(/\bsqrt\b/g, "Math.sqrt")
      .replace(/\babs\b/g, "Math.abs")
      .replace(/\bpi\b/g, "Math.PI")
      .replace(/\be\b/g, "Math.E");

    sanitized = sanitized.replace(/\bx\b/g, `(${xVal})`);
    // eslint-disable-next-line no-new-func
    const result = Function(`"use strict"; return (${sanitized});`)();
    return typeof result === "number" && !isNaN(result) && isFinite(result) ? result : null;
  } catch {
    return null;
  }
};

// ==========================================
// 2. COMPONENTE DE TABLA DE NODOS REUTILIZABLE
// ==========================================
const NodeTable = ({ points, sumLabel = "Suma =" }) => {
  const totalSum = points.reduce((acc, p) => acc + (p.val || 0), 0);

  return (
    <div className="table-responsive bg-white rounded border shadow-sm mt-3">
      <table className="table table-sm table-hover mb-0 text-center small">
        <thead className="table-light">
          <tr>
            <th style={{ width: "10%" }}>i</th>
            <th style={{ width: "20%" }}>xᵢ</th>
            <th style={{ width: "25%" }}>f(xᵢ)</th>
            <th style={{ width: "20%" }}>Peso (wᵢ)</th>
            <th style={{ width: "25%" }}>wᵢ · f(xᵢ)</th>
          </tr>
        </thead>
        <tbody className="font-monospace">
          {points.map((p) => (
            <tr key={p.i}>
              <td className="fw-bold">{p.i}</td>
              <td>{p.xi.toFixed(4)}</td>
              <td>{p.fxi.toFixed(6)}</td>
              <td><span className="badge bg-light text-dark border">{p.w}</span></td>
              <td>{p.val.toFixed(6)}</td>
            </tr>
          ))}
          <tr className="table-secondary fw-bold">
            <td colSpan="4" className="text-end">{sumLabel}</td>
            <td className="text-primary">{totalSum.toFixed(6)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

// ==========================================
// 3. GRÁFICA SVG PARA FUNCIONES CONTINUAS
// ==========================================
const FunctionPlotSVG = ({ expr, a, b, points, themeColor }) => {
  const numA = parseFloat(a);
  const numB = parseFloat(b);

  const graph = useMemo(() => {
    if (isNaN(numA) || isNaN(numB) || numA >= numB || !points || points.length < 2) return null;

    const marginX = (numB - numA) * 0.08;
    const xMin = numA - marginX;
    const xMax = numB + marginX;

    const samples = 120;
    const curvePoints = [];
    let yMin = 0;
    let yMax = 0;

    for (let i = 0; i <= samples; i++) {
      const xVal = xMin + (i * (xMax - xMin)) / samples;
      const yVal = evaluateFunction(expr, xVal);
      if (yVal !== null) {
        curvePoints.push({ x: xVal, y: yVal });
        if (yVal < yMin) yMin = yVal;
        if (yVal > yMax) yMax = yVal;
      }
    }

    const marginY = (yMax - yMin) * 0.15 || 1;
    yMin -= marginY;
    yMax += marginY;

    const svgW = 600;
    const svgH = 260;
    const padL = 45;
    const padR = 20;
    const padT = 20;
    const padB = 30;
    const plotW = svgW - padL - padR;
    const plotH = svgH - padT - padB;

    const mapX = (x) => padL + ((x - xMin) / (xMax - xMin)) * plotW;
    const mapY = (y) => padT + plotH - ((y - yMin) / (yMax - yMin)) * plotH;

    const curvePath = curvePoints
      .map((p, idx) => `${idx === 0 ? "M" : "L"} ${mapX(p.x).toFixed(2)} ${mapY(p.y).toFixed(2)}`)
      .join(" ");

    const polygons = [];
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const x0 = mapX(p0.xi);
      const x1 = mapX(p1.xi);
      const y0 = mapY(p0.fxi);
      const y1 = mapY(p1.fxi);
      const yBase = mapY(0);

      polygons.push({
        path: `M ${x0},${yBase} L ${x0},${y0} L ${x1},${y1} L ${x1},${yBase} Z`,
        topLine: `M ${x0},${y0} L ${x1},${y1}`,
      });
    }

    return { svgW, svgH, curvePath, polygons, mapX, mapY, axisY0: mapY(0) };
  }, [expr, numA, numB, points]);

  if (!graph) return null;

  return (
    <div className="card p-2 bg-white mb-3 border shadow-sm">
      <svg viewBox={`0 0 ${graph.svgW} ${graph.svgH}`} className="w-100" style={{ maxHeight: "280px" }}>
        <line x1="30" y1={graph.axisY0} x2={graph.svgW - 10} y2={graph.axisY0} stroke="#adb5bd" strokeWidth="1.5" />
        {graph.polygons.map((poly, idx) => (
          <g key={idx}>
            <path d={poly.path} fill={themeColor} fillOpacity="0.2" stroke={themeColor} strokeDasharray="3,3" strokeWidth="1" />
            <path d={poly.topLine} stroke={themeColor} strokeWidth="2" />
          </g>
        ))}
        <path d={graph.curvePath} fill="none" stroke="#dc3545" strokeWidth="2" />
        {points.map((p, idx) => {
          const cx = graph.mapX(p.xi);
          const cy = graph.mapY(p.fxi);
          return (
            <g key={idx}>
              <circle cx={cx} cy={cy} r="4" fill={themeColor} stroke="#fff" strokeWidth="1.5" />
              <text x={cx} y={graph.axisY0 + 15} fontSize="10" textAnchor="middle" fill="#6c757d">
                {p.xi.toFixed(2)}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

// ==========================================
// 4. SIMULADOR: TRAPECIO
// ==========================================
const TrapecioSimulator = () => {
  const [expr, setExpr] = useState("x^2");
  const [a, setA] = useState(0);
  const [b, setB] = useState(4);
  const [n, setN] = useState(4);
  const [showTable, setShowTable] = useState(false);

  const calc = useMemo(() => {
    const numA = parseFloat(a);
    const numB = parseFloat(b);
    const numN = parseInt(n, 10);
    if (isNaN(numA) || isNaN(numB) || isNaN(numN) || numN < 1 || numA >= numB) {
      return { error: "Verifica que a < b y n ≥ 1." };
    }
    const h = (numB - numA) / numN;
    const points = [];
    let sum = 0;
    for (let i = 0; i <= numN; i++) {
      const xi = numA + i * h;
      const fxi = evaluateFunction(expr, xi);
      if (fxi === null) return { error: `Error evaluando f(x) en x = ${xi}` };
      const w = i === 0 || i === numN ? 1 : 2;
      sum += w * fxi;
      points.push({ i, xi, fxi, w, val: w * fxi });
    }
    return { h, points, integral: (h / 2) * sum };
  }, [expr, a, b, n]);

  return (
    <div>
      <div className="row g-2 mb-3 bg-white p-3 border rounded shadow-sm">
        <div className="col-12 col-md-5">
          <label className="form-label small fw-bold">Función f(x)</label>
          <input className="form-control form-control-sm font-monospace" value={expr} onChange={(e) => setExpr(e.target.value)} />
        </div>
        <div className="col-4 col-md-2">
          <label className="form-label small fw-bold">Límite a</label>
          <input type="number" className="form-control form-control-sm" value={a} onChange={(e) => setA(e.target.value)} />
        </div>
        <div className="col-4 col-md-2">
          <label className="form-label small fw-bold">Límite b</label>
          <input type="number" className="form-control form-control-sm" value={b} onChange={(e) => setB(e.target.value)} />
        </div>
        <div className="col-4 col-md-3">
          <label className="form-label small fw-bold">Subintervalos (n)</label>
          <input type="number" min="1" className="form-control form-control-sm" value={n} onChange={(e) => setN(e.target.value)} />
        </div>
      </div>

      {calc.error ? (
        <div className="alert alert-danger py-2 small">{calc.error}</div>
      ) : (
        <>
          <div className="card bg-primary bg-opacity-10 border-primary mb-3">
            <div className="card-body py-2 d-flex justify-content-around text-center">
              <div><small className="text-muted d-block">Paso (h)</small><strong>{calc.h.toFixed(4)}</strong></div>
              <div><small className="text-muted d-block">Fórmula</small><small className="font-monospace">I ≈ (h/2)[f(a) + 2∑f(xᵢ) + f(b)]</small></div>
              <div><small className="text-muted d-block">Resultado Integral (I)</small><strong className="h5 text-primary mb-0">{calc.integral.toFixed(6)}</strong></div>
            </div>
          </div>

          <FunctionPlotSVG expr={expr} a={a} b={b} points={calc.points} themeColor="#0d6efd" />

          <div className="text-end mb-2">
            <button className="btn btn-sm btn-outline-primary" onClick={() => setShowTable(!showTable)}>
              {showTable ? "Ocultar tabla de nodos" : "Mostrar tabla de nodos"}
            </button>
          </div>

          {showTable && <NodeTable points={calc.points} />}
        </>
      )}
    </div>
  );
};

// ==========================================
// 5. SIMULADOR: SIMPSON 1/3
// ==========================================
const Simpson13Simulator = () => {
  const [expr, setExpr] = useState("sin(x) + 1");
  const [a, setA] = useState(0);
  const [b, setB] = useState(3.1416);
  const [n, setN] = useState(4);
  const [showTable, setShowTable] = useState(false);

  const calc = useMemo(() => {
    const numA = parseFloat(a);
    const numB = parseFloat(b);
    const numN = parseInt(n, 10);
    if (isNaN(numA) || isNaN(numB) || isNaN(numN) || numN < 2 || numA >= numB) {
      return { error: "Verifica que a < b y n ≥ 2." };
    }
    if (numN % 2 !== 0) {
      return { error: "⚠️ La Regla de Simpson 1/3 requiere que 'n' sea un número PAR (ej. 2, 4, 6, 8...)." };
    }
    const h = (numB - numA) / numN;
    const points = [];
    let sum = 0;
    for (let i = 0; i <= numN; i++) {
      const xi = numA + i * h;
      const fxi = evaluateFunction(expr, xi);
      if (fxi === null) return { error: `Error evaluando f(x) en x = ${xi}` };
      const w = i === 0 || i === numN ? 1 : i % 2 !== 0 ? 4 : 2;
      sum += w * fxi;
      points.push({ i, xi, fxi, w, val: w * fxi });
    }
    return { h, points, integral: (h / 3) * sum };
  }, [expr, a, b, n]);

  return (
    <div>
      <div className="row g-2 mb-3 bg-white p-3 border rounded shadow-sm">
        <div className="col-12 col-md-5">
          <label className="form-label small fw-bold">Función f(x)</label>
          <input className="form-control form-control-sm font-monospace" value={expr} onChange={(e) => setExpr(e.target.value)} />
        </div>
        <div className="col-4 col-md-2">
          <label className="form-label small fw-bold">Límite a</label>
          <input type="number" className="form-control form-control-sm" value={a} onChange={(e) => setA(e.target.value)} />
        </div>
        <div className="col-4 col-md-2">
          <label className="form-label small fw-bold">Límite b</label>
          <input type="number" className="form-control form-control-sm" value={b} onChange={(e) => setB(e.target.value)} />
        </div>
        <div className="col-4 col-md-3">
          <label className="form-label small fw-bold">Subintervalos n (Par)</label>
          <input type="number" step="2" min="2" className="form-control form-control-sm" value={n} onChange={(e) => setN(e.target.value)} />
        </div>
      </div>

      {calc.error ? (
        <div className="alert alert-warning py-2 small">{calc.error}</div>
      ) : (
        <>
          <div className="card bg-success bg-opacity-10 border-success mb-3">
            <div className="card-body py-2 d-flex justify-content-around text-center">
              <div><small className="text-muted d-block">Paso (h)</small><strong>{calc.h.toFixed(4)}</strong></div>
              <div><small className="text-muted d-block">Fórmula</small><small className="font-monospace">I ≈ (h/3)[f(a) + 4∑f(imp) + 2∑f(par) + f(b)]</small></div>
              <div><small className="text-muted d-block">Resultado Integral (I)</small><strong className="h5 text-success mb-0">{calc.integral.toFixed(6)}</strong></div>
            </div>
          </div>

          <FunctionPlotSVG expr={expr} a={a} b={b} points={calc.points} themeColor="#198754" />

          <div className="text-end mb-2">
            <button className="btn btn-sm btn-outline-success" onClick={() => setShowTable(!showTable)}>
              {showTable ? "Ocultar tabla de nodos" : "Mostrar tabla de nodos"}
            </button>
          </div>

          {showTable && <NodeTable points={calc.points} />}
        </>
      )}
    </div>
  );
};

// ==========================================
// 6. SIMULADOR: SIMPSON 3/8
// ==========================================
const Simpson38Simulator = () => {
  const [expr, setExpr] = useState("1 / (1 + x^2)");
  const [a, setA] = useState(0);
  const [b, setB] = useState(3);
  const [n, setN] = useState(3);
  const [showTable, setShowTable] = useState(false);

  const calc = useMemo(() => {
    const numA = parseFloat(a);
    const numB = parseFloat(b);
    const numN = parseInt(n, 10);
    if (isNaN(numA) || isNaN(numB) || isNaN(numN) || numN < 3 || numA >= numB) {
      return { error: "Verifica que a < b y n ≥ 3." };
    }
    if (numN % 3 !== 0) {
      return { error: "⚠️ La Regla de Simpson 3/8 requiere que 'n' sea MÚLTIPLO DE 3 (ej. 3, 6, 9, 12...)." };
    }
    const h = (numB - numA) / numN;
    const points = [];
    let sum = 0;
    for (let i = 0; i <= numN; i++) {
      const xi = numA + i * h;
      const fxi = evaluateFunction(expr, xi);
      if (fxi === null) return { error: `Error evaluando f(x) en x = ${xi}` };
      const w = i === 0 || i === numN ? 1 : i % 3 === 0 ? 2 : 3;
      sum += w * fxi;
      points.push({ i, xi, fxi, w, val: w * fxi });
    }
    return { h, points, integral: ((3 * h) / 8) * sum };
  }, [expr, a, b, n]);

  return (
    <div>
      <div className="row g-2 mb-3 bg-white p-3 border rounded shadow-sm">
        <div className="col-12 col-md-5">
          <label className="form-label small fw-bold">Función f(x)</label>
          <input className="form-control form-control-sm font-monospace" value={expr} onChange={(e) => setExpr(e.target.value)} />
        </div>
        <div className="col-4 col-md-2">
          <label className="form-label small fw-bold">Límite a</label>
          <input type="number" className="form-control form-control-sm" value={a} onChange={(e) => setA(e.target.value)} />
        </div>
        <div className="col-4 col-md-2">
          <label className="form-label small fw-bold">Límite b</label>
          <input type="number" className="form-control form-control-sm" value={b} onChange={(e) => setB(e.target.value)} />
        </div>
        <div className="col-4 col-md-3">
          <label className="form-label small fw-bold">Subintervalos n (Múltiplo de 3)</label>
          <input type="number" step="3" min="3" className="form-control form-control-sm" value={n} onChange={(e) => setN(e.target.value)} />
        </div>
      </div>

      {calc.error ? (
        <div className="alert alert-warning py-2 small">{calc.error}</div>
      ) : (
        <>
          <div className="card bg-warning bg-opacity-10 border-warning mb-3">
            <div className="card-body py-2 d-flex justify-content-around text-center">
              <div><small className="text-muted d-block">Paso (h)</small><strong>{calc.h.toFixed(4)}</strong></div>
              <div><small className="text-muted d-block">Fórmula</small><small className="font-monospace">I ≈ (3h/8)[f(x₀) + 3f(x₁) + 3f(x₂) + 2f(x₃) + ...]</small></div>
              <div><small className="text-muted d-block">Resultado Integral (I)</small><strong className="h5 text-dark mb-0">{calc.integral.toFixed(6)}</strong></div>
            </div>
          </div>

          <FunctionPlotSVG expr={expr} a={a} b={b} points={calc.points} themeColor="#fd7e14" />

          <div className="text-end mb-2">
            <button className="btn btn-sm btn-outline-warning text-dark" onClick={() => setShowTable(!showTable)}>
              {showTable ? "Ocultar tabla de nodos" : "Mostrar tabla de nodos"}
            </button>
          </div>

          {showTable && <NodeTable points={calc.points} />}
        </>
      )}
    </div>
  );
};

// ==========================================
// 7. SIMULADOR: INTEGRACIÓN COMBINADA (TABULAR)
// ==========================================
const PRESET_DATASETS = [
  {
    name: "6 Puntos (1/3 + 3/8)",
    data: "0.0, 0.0000\n0.2, 0.1987\n0.4, 0.3894\n0.6, 0.5646\n0.8, 0.7174\n1.0, 0.8415",
  },
  {
    name: "5 Puntos (Simpson 1/3 puro)",
    data: "0.0, 1.0000\n0.5, 1.6487\n1.0, 2.7183\n1.5, 4.4817\n2.0, 7.3891",
  },
  {
    name: "4 Puntos (Simpson 3/8 puro)",
    data: "0.0, 0.0000\n1.0, 1.0000\n2.0, 8.0000\n3.0, 27.0000",
  },
  {
    name: "Paso Variable (Trapecios)",
    data: "0.0, 0.0000\n0.1, 0.0998\n0.3, 0.2955\n0.6, 0.5646\n1.0, 0.8415",
  },
];

const CombinadaSimulator = () => {
  const [pointsText, setPointsText] = useState(PRESET_DATASETS[0].data);
  const [showTable, setShowTable] = useState(false);

  const calc = useMemo(() => {
    // Parser tolerante a comas, espacios o saltos de línea
    const lines = pointsText.trim().split("\n");
    const pts = [];

    for (let rawLine of lines) {
      const line = rawLine.trim();
      if (!line) continue;
      const cleanLine = line.replace(/[;\t]/g, ",");
      const parts = cleanLine.includes(",") ? cleanLine.split(",") : cleanLine.split(/\s+/);

      if (parts.length >= 2) {
        const xVal = parseFloat(parts[0].trim());
        const yVal = parseFloat(parts.trim());
        if (!isNaN(xVal) && !isNaN(yVal)) {
          pts.push({ x: xVal, y: yVal });
        }
      }
    }

    if (pts.length < 2) {
      return { error: "Ingresa al menos 2 puntos (x, y) válidos separados por coma." };
    }

    // Ordenar por coordenada x ascendente
    pts.sort((a, b) => a.x - b.x);

    // Verificar si el paso es constante
    const h0 = pts.x - pts[0].x;
    let isEquallySpaced = true;
    for (let i = 1; i < pts.length - 1; i++) {
      if (Math.abs(pts[i + 1].x - pts[i].x - h0) > 1e-4) {
        isEquallySpaced = false;
        break;
      }
    }

    const intervals = pts.length - 1;
    let totalIntegral = 0;
    const segmentBreakdown = [];
    const nodeTable = [];

    if (isEquallySpaced) {
      const h = h0;
      let remaining = intervals;
      let startIndex = 0;

      // Estrategia: Si n es impar y >= 3 -> Simpson 1/3 (primeros n-3) + Simpson 3/8 (últimos 3)
      if (remaining % 2 !== 0 && remaining >= 3) {
        const s13Intervals = remaining - 3;
        if (s13Intervals > 0) {
          let sum13 = 0;
          for (let i = 0; i <= s13Intervals; i++) {
            const idx = startIndex + i;
            const w = i === 0 || i === s13Intervals ? 1 : i % 2 !== 0 ? 4 : 2;
            sum13 += w * pts[idx].y;
            nodeTable.push({
              i: idx,
              xi: pts[idx].x,
              fxi: pts[idx].y,
              w: `${w} (1/3)`,
              val: (h / 3) * w * pts[idx].y,
            });
          }
          const I13 = (h / 3) * sum13;
          totalIntegral += I13;
          segmentBreakdown.push({
            rule: `Simpson 1/3 (${s13Intervals} intervalos)`,
            range: `[${pts[startIndex].x.toFixed(2)}, ${pts[startIndex + s13Intervals].x.toFixed(2)}]`,
            subtotal: I13,
            color: "#0d6efd",
          });
          startIndex += s13Intervals;
        }

        // Simpson 3/8 en los últimos 3 tramos
        const s38Sum = pts[startIndex].y + 3 * pts[startIndex + 1].y + 3 * pts[startIndex + 2].y + pts[startIndex + 3].y;
        const I38 = ((3 * h) / 8) * s38Sum;
        totalIntegral += I38;
        segmentBreakdown.push({
          rule: "Simpson 3/8 (3 intervalos)",
          range: `[${pts[startIndex].x.toFixed(2)}, ${pts[startIndex + 3].x.toFixed(2)}]`,
          subtotal: I38,
          color: "#fd7e14",
        });

        for (let j = startIndex === 0 ? 0 : 1; j <= 3; j++) {
          const idx = startIndex + j;
          const w = j === 0 || j === 3 ? 1 : 3;
          nodeTable.push({
            i: idx,
            xi: pts[idx].x,
            fxi: pts[idx].y,
            w: `${w} (3/8)`,
            val: ((3 * h) / 8) * w * pts[idx].y,
          });
        }
      } else if (remaining % 2 === 0) {
        // Simpson 1/3 compuesto directo
        let sum13 = 0;
        for (let i = 0; i <= remaining; i++) {
          const w = i === 0 || i === remaining ? 1 : i % 2 !== 0 ? 4 : 2;
          sum13 += w * pts[i].y;
          nodeTable.push({
            i,
            xi: pts[i].x,
            fxi: pts[i].y,
            w: `${w}`,
            val: (h / 3) * w * pts[i].y,
          });
        }
        totalIntegral = (h / 3) * sum13;
        segmentBreakdown.push({
          rule: `Simpson 1/3 Compuesto (${remaining} intervalos)`,
          range: `[${pts[0].x.toFixed(2)}, ${pts[pts.length - 1].x.toFixed(2)}]`,
          subtotal: totalIntegral,
          color: "#198754",
        });
      } else {
        // Solo 1 intervalo -> Trapecio
        totalIntegral = (h / 2) * (pts[0].y + pts.y);
        segmentBreakdown.push({
          rule: "Trapecio Simple (1 intervalo)",
          range: `[${pts[0].x.toFixed(2)}, ${pts.x.toFixed(2)}]`,
          subtotal: totalIntegral,
          color: "#0d6efd",
        });
        nodeTable.push(
          { i: 0, xi: pts[0].x, fxi: pts[0].y, w: "1", val: (h / 2) * pts[0].y },
          { i: 1, xi: pts.x, fxi: pts.y, w: "1", val: (h / 2) * pts.y }
        );
      }
    } else {
      // Paso variable -> Trapecios por tramo
      for (let i = 0; i < pts.length - 1; i++) {
        const segH = pts[i + 1].x - pts[i].x;
        const segI = (segH / 2) * (pts[i].y + pts[i + 1].y);
        totalIntegral += segI;
        segmentBreakdown.push({
          rule: `Trapecio (h = ${segH.toFixed(3)})`,
          range: `[${pts[i].x.toFixed(2)}, ${pts[i + 1].x.toFixed(2)}]`,
          subtotal: segI,
          color: "#6c757d",
        });
      }
      pts.forEach((p, idx) => {
        nodeTable.push({
          i: idx,
          xi: p.x,
          fxi: p.y,
          w: idx === 0 || idx === pts.length - 1 ? "1" : "—",
          val: p.y,
        });
      });
    }

    // Gráfica SVG de puntos discretos
    const minX = pts[0].x;
    const maxX = pts[pts.length - 1].x;
    const marginX = (maxX - minX) * 0.08 || 0.5;
    const xMin = minX - marginX;
    const xMax = maxX + marginX;

    let yMin = 0;
    let yMax = 0;
    pts.forEach((p) => {
      if (p.y < yMin) yMin = p.y;
      if (p.y > yMax) yMax = p.y;
    });
    const marginY = (yMax - yMin) * 0.15 || 1;
    yMin -= marginY;
    yMax += marginY;

    const svgW = 600;
    const svgH = 260;
    const padL = 45;
    const padR = 20;
    const padT = 20;
    const padB = 30;
    const plotW = svgW - padL - padR;
    const plotH = svgH - padT - padB;

    const mapX = (x) => padL + ((x - xMin) / (xMax - xMin)) * plotW;
    const mapY = (y) => padT + plotH - ((y - yMin) / (yMax - yMin)) * plotH;

    const polygons = [];
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i];
      const p1 = pts[i + 1];
      const x0 = mapX(p0.x);
      const x1 = mapX(p1.x);
      const y0 = mapY(p0.y);
      const y1 = mapY(p1.y);
      const yBase = mapY(0);

      polygons.push({
        path: `M ${x0},${yBase} L ${x0},${y0} L ${x1},${y1} L ${x1},${yBase} Z`,
        topLine: `M ${x0},${y0} L ${x1},${y1}`,
      });
    }

    return {
      pts,
      isEquallySpaced,
      intervals,
      totalIntegral,
      segmentBreakdown,
      nodeTable,
      h: isEquallySpaced ? h0 : null,
      svg: { svgW, svgH, mapX, mapY, axisY0: mapY(0), polygons },
    };
  }, [pointsText]);

  return (
    <div>
      {/* Selector de Datasets de Ejemplo */}
      <div className="mb-2">
        <span className="small text-secondary fw-semibold me-2">Cargar datos de ejemplo:</span>
        <div className="btn-group btn-group-sm flex-wrap">
          {PRESET_DATASETS.map((p, idx) => (
            <button key={idx} className="btn btn-outline-secondary" onClick={() => setPointsText(p.data)}>
              {p.name}
            </button>
          ))}
        </div>
      </div>

      <div className="row g-3 mb-3 bg-white p-3 border rounded shadow-sm">
        <div className="col-12 col-md-5">
          <label className="form-label small fw-bold">Puntos tabulados (x, y)</label>
          <textarea
            className="form-control form-control-sm font-monospace"
            rows="6"
            value={pointsText}
            onChange={(e) => setPointsText(e.target.value)}
          />
          <small className="text-muted">Ingresa un punto por renglón separado por coma (ej. <code>0.2, 0.1987</code>).</small>
        </div>

        <div className="col-12 col-md-7">
          {calc.error ? (
            <div className="alert alert-danger py-2 small">{calc.error}</div>
          ) : (
            <div>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="badge bg-secondary">{calc.pts.length} puntos ({calc.intervals} intervalos)</span>
                <span className={`badge ${calc.isEquallySpaced ? "bg-success" : "bg-warning text-dark"}`}>
                  {calc.isEquallySpaced ? `Paso constante (h = ${calc.h.toFixed(4)})` : "Paso variable"}
                </span>
              </div>

              <div className="card bg-dark bg-opacity-10 border mb-2">
                <div className="card-body py-2 text-center">
                  <small className="text-muted d-block">Integral Total Calculada</small>
                  <span className="h4 fw-bold text-dark font-monospace">{calc.totalIntegral.toFixed(6)}</span>
                </div>
              </div>

              <h6 className="small fw-bold mt-2 mb-1">Desglose de reglas aplicadas:</h6>
              <div className="table-responsive">
                <table className="table table-sm table-bordered text-center small mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Rango</th>
                      <th>Regla</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody className="font-monospace">
                    {calc.segmentBreakdown.map((seg, idx) => (
                      <tr key={idx}>
                        <td>{seg.range}</td>
                        <td><span className="badge" style={{ backgroundColor: seg.color }}>{seg.rule}</span></td>
                        <td>{seg.subtotal.toFixed(6)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {!calc.error && calc.svg && (
        <>
          {/* Gráfica SVG de datos tabulares */}
          <div className="card p-2 bg-white mb-3 border shadow-sm">
            <svg viewBox={`0 0 ${calc.svg.svgW} ${calc.svg.svgH}`} className="w-100" style={{ maxHeight: "280px" }}>
              <line x1="30" y1={calc.svg.axisY0} x2={calc.svg.svgW - 10} y2={calc.svg.axisY0} stroke="#adb5bd" strokeWidth="1.5" />
              {calc.svg.polygons.map((poly, idx) => (
                <g key={idx}>
                  <path d={poly.path} fill="#6f42c1" fillOpacity="0.15" stroke="#6f42c1" strokeDasharray="3,3" strokeWidth="1" />
                  <path d={poly.topLine} stroke="#6f42c1" strokeWidth="2" />
                </g>
              ))}
              {calc.pts.map((p, idx) => {
                const cx = calc.svg.mapX(p.x);
                const cy = calc.svg.mapY(p.y);
                return (
                  <g key={idx}>
                    <circle cx={cx} cy={cy} r="4.5" fill="#6f42c1" stroke="#fff" strokeWidth="1.5" />
                    <text x={cx} y={calc.svg.axisY0 + 15} fontSize="10" textAnchor="middle" fill="#6c757d">
                      {p.x.toFixed(2)}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="text-end mb-2">
            <button className="btn btn-sm btn-outline-dark" onClick={() => setShowTable(!showTable)}>
              {showTable ? "Ocultar tabla de nodos" : "Mostrar tabla de nodos"}
            </button>
          </div>

          {showTable && <NodeTable points={calc.nodeTable} sumLabel="Integral Total =" />}
        </>
      )}
    </div>
  );
};

// ==========================================
// 8. VISTA PRINCIPAL (MENU DE TARJETAS)
// ==========================================
const SimuladorTab = () => {
  const [activeMethod, setActiveMethod] = useState(null);

  const methods = [
    {
      id: "trapecio",
      title: "Método de Trapecio",
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#0d6efd" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19 L8 5 L16 5 L20 19 Z" />
          <line x1="4" y1="19" x2="20" y2="19" />
        </svg>
      ),
      btnClass: "btn-primary",
      description: "Aproxima el área bajo la curva conectando nodos adyacentes mediante segmentos de rectas secantes (polinomios de 1.ᵉʳ grado).",
    },
    {
      id: "simpson13",
      title: "Regla de Simpson 1/3",
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#198754" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 18 C 8 4, 16 4, 21 18" />
          <line x1="3" y1="18" x2="21" y2="18" />
          <line x1="12" y1="7.5" x2="12" y2="18" strokeDasharray="2,2" />
        </svg>
      ),
      btnClass: "btn-success",
      description: "Ajusta parábolas a través de grupos de 3 puntos consecutivos. Requiere un número par de subintervalos (n par).",
    },
    {
      id: "simpson38",
      title: "Regla de Simpson 3/8",
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fd7e14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 18 C 6 6, 12 18, 21 6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      ),
      btnClass: "btn-warning text-dark",
      description: "Ajusta polinomios cúbicos a través de grupos de 4 puntos consecutivos. Requiere que el número de subintervalos sea múltiplo de 3.",
    },
    {
      id: "combinada",
      title: "Integración Combinada",
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#6f42c1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="4" cy="18" r="2" fill="#6f42c1" />
          <circle cx="9" cy="10" r="2" fill="#6f42c1" />
          <circle cx="15" cy="7" r="2" fill="#6f42c1" />
          <circle cx="20" cy="14" r="2" fill="#6f42c1" />
          <path d="M4 18 L9 10 L15 7 L20 14" strokeDasharray="3,3" />
        </svg>
      ),
      btnClass: "btn-dark",
      description: "Evalúa conjuntos de datos tabulados discretos combinando Simpson 1/3, Simpson 3/8 o Trapecios según el espaciado y cantidad de puntos.",
    },
  ];

  return (
    <div className="p-3 border rounded bg-light">
      {!activeMethod ? (
        <>
          <div className="text-center my-3">
            <h4 className="fw-bold text-primary mb-1">
              <span className="me-2">⚙️</span> Simulador de Métodos del Subtema 4.4
            </h4>
            <p className="text-muted small">
              Selecciona el método numérico de integración que deseas simular paso a paso:
            </p>
          </div>

          <div className="row g-3 g-md-4 mt-1">
            {methods.map((m) => (
              <div key={m.id} className="col-12 col-md-6">
                <div className="card h-100 border-0 shadow-sm rounded-3">
                  <div className="card-body p-4 d-flex flex-column text-center">
                    <div className="mb-3">{m.icon}</div>
                    <h5 className="card-title fw-bold text-dark mb-2">{m.title}</h5>
                    <p className="card-text text-muted small flex-grow-1">{m.description}</p>
                    <div className="mt-3">
                      <button
                        className={`btn ${m.btnClass} w-100 fw-bold py-2 shadow-sm`}
                        onClick={() => setActiveMethod(m.id)}
                      >
                        ▶ Iniciar {m.title.replace("Método de ", "").replace("Regla de ", "")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div>
          <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
            <button className="btn btn-sm btn-outline-secondary" onClick={() => setActiveMethod(null)}>
              ← Volver al menú de métodos
            </button>
            <h5 className="fw-bold text-primary mb-0">
              {methods.find((m) => m.id === activeMethod)?.title}
            </h5>
          </div>

          {activeMethod === "trapecio" && <TrapecioSimulator />}
          {activeMethod === "simpson13" && <Simpson13Simulator />}
          {activeMethod === "simpson38" && <Simpson38Simulator />}
          {activeMethod === "combinada" && <CombinadaSimulator />}
        </div>
      )}
    </div>
  );
};

export default SimuladorTab;