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
// 2. COMPONENTE DE TABLA DE NODOS
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
          {points.map((p, idx) => (
            <tr key={idx}>
              <td className="fw-bold">{p.i}</td>
              <td>{typeof p.xi === "number" ? p.xi.toFixed(4) : p.xi}</td>
              <td>{typeof p.fxi === "number" ? p.fxi.toFixed(6) : p.fxi}</td>
              <td>
                <span className="badge bg-light text-dark border">{p.w}</span>
              </td>
              <td>{typeof p.val === "number" ? p.val.toFixed(6) : p.val}</td>
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
      .map((p, idx) => `${idx === 0 ? "M" : "L"} ${mapX(p.x).toFixed(2)}${mapY(p.y).toFixed(2)}`)
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
      <svg viewBox={`0 0 ${graph.svgW}${graph.svgH}`} className="w-100" style={{ maxHeight: "280px" }}>
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
// 7. SIMULADOR: INTEGRACIÓN COMBINADA
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
      return { error: "Ingresa al menos 2 puntos (x, y) válidos." };
    }

    pts.sort((a, b) => a.x - b.x);

    const n = pts.length - 1;
    const h0 = pts.x - pts[0].x;
    let isEquallySpaced = true;

    for (let i = 0; i < n; i++) {
      const currentH = pts[i + 1].x - pts[i].x;
      if (Math.abs(currentH - h0) > 1e-4) {
        isEquallySpaced = false;
        break;
      }
    }

    let totalIntegral = 0;
    const segments = [];
    const tableRows = [];

    if (isEquallySpaced) {
      const h = h0;

      if (n === 1) {
        const I = (h / 2) * (pts[0].y + pts.y);
        totalIntegral = I;
        segments.push({ rule: "Trapecio Simple (1 intervalo)", range: `[${pts[0].x.toFixed(2)},${pts.x.toFixed(2)}]`, subtotal: I, color: "#0d6efd" });
        tableRows.push({ i: 0, xi: pts[0].x, fxi: pts[0].y, w: "1 (Trap)", val: (h / 2) * pts[0].y });
        tableRows.push({ i: 1, xi: pts.x, fxi: pts.y, w: "1 (Trap)", val: (h / 2) * pts.y });
      } else if (n === 2) {
        const I = (h / 3) * (pts[0].y + 4 * pts.y + pts.y);
        totalIntegral = I;
        segments.push({ rule: "Simpson 1/3 (2 intervalos)", range: `[${pts[0].x.toFixed(2)},${pts.x.toFixed(2)}]`, subtotal: I, color: "#198754" });
        tableRows.push({ i: 0, xi: pts[0].x, fxi: pts[0].y, w: "1 (1/3)", val: (h / 3) * pts[0].y });
        tableRows.push({ i: 1, xi: pts.x, fxi: pts.y, w: "4 (1/3)", val: (h / 3) * 4 * pts.y });
        tableRows.push({ i: 2, xi: pts.x, fxi: pts.y, w: "1 (1/3)", val: (h / 3) * pts.y });
      } else if (n === 3) {
        const I = ((3 * h) / 8) * (pts[0].y + 3 * pts.y + 3 * pts.y + pts.y);
        totalIntegral = I;
        segments.push({ rule: "Simpson 3/8 (3 intervalos)", range: `[${pts[0].x.toFixed(2)},${pts.x.toFixed(2)}]`, subtotal: I, color: "#fd7e14" });
        tableRows.push({ i: 0, xi: pts[0].x, fxi: pts[0].y, w: "1 (3/8)", val: ((3 * h) / 8) * pts[0].y });
        tableRows.push({ i: 1, xi: pts.x, fxi: pts.y, w: "3 (3/8)", val: ((3 * h) / 8) * 3 * pts.y });
        tableRows.push({ i: 2, xi: pts.x, fxi: pts.y, w: "3 (3/8)", val: ((3 * h) / 8) * 3 * pts.y });
        tableRows.push({ i: 3, xi: pts.x, fxi: pts.y, w: "1 (3/8)", val: ((3 * h) / 8) * pts.y });
      } else if (n % 2 === 0) {
        let sum = 0;
        for (let i = 0; i <= n; i++) {
          const w = (i === 0 || i === n) ? 1 : (i % 2 !== 0 ? 4 : 2);
          sum += w * pts[i].y;
          tableRows.push({ i, xi: pts[i].x, fxi: pts[i].y, w: `${w} (1/3)`, val: (h / 3) * w * pts[i].y });
        }
        totalIntegral = (h / 3) * sum;
        segments.push({ rule: `Simpson 1/3 Compuesto (${n} intervalos)`, range: `[${pts[0].x.toFixed(2)},${pts[n].x.toFixed(2)}]`, subtotal: totalIntegral, color: "#198754" });
      } else {
        const n13 = n - 3;
        let sum13 = 0;
        for (let i = 0; i <= n13; i++) {
          const w = (i === 0 || i === n13) ? 1 : (i % 2 !== 0 ? 4 : 2);
          sum13 += w * pts[i].y;
          tableRows.push({ i, xi: pts[i].x, fxi: pts[i].y, w: `${w} (1/3)`, val: (h / 3) * w * pts[i].y });
        }
        const I13 = (h / 3) * sum13;
        totalIntegral += I13;
        segments.push({ rule: `Simpson 1/3 (${n13} intervalos)`, range: `[${pts[0].x.toFixed(2)},${pts[n13].x.toFixed(2)}]`, subtotal: I13, color: "#198754" });

        const s38 = pts[n13].y + 3 * pts[n13 + 1].y + 3 * pts[n13 + 2].y + pts[n].y;
        const I38 = ((3 * h) / 8) * s38;
        totalIntegral += I38;
        segments.push({ rule: "Simpson 3/8 (3 intervalos)", range: `[${pts[n13].x.toFixed(2)},${pts[n].x.toFixed(2)}]`, subtotal: I38, color: "#fd7e14" });

        tableRows.push({ i: n13 + 1, xi: pts[n13 + 1].x, fxi: pts[n13 + 1].y, w: "3 (3/8)", val: ((3 * h) / 8) * 3 * pts[n13 + 1].y });
        tableRows.push({ i: n13 + 2, xi: pts[n13 + 2].x, fxi: pts[n13 + 2].y, w: "3 (3/8)", val: ((3 * h) / 8) * 3 * pts[n13 + 2].y });
        tableRows.push({ i: n, xi: pts[n].x, fxi: pts[n].y, w: "1 (3/8)", val: ((3 * h) / 8) * pts[n].y });
      }
    } else {
      for (let i = 0; i < n; i++) {
        const segH = pts[i + 1].x - pts[i].x;
        const segI = (segH / 2) * (pts[i].y + pts[i + 1].y);
        totalIntegral += segI;
        segmentsAquí tienes el código completo de **`SimuladorTab.jsx`**, refactorizado y optimizado para ser conciso, libre de errores de sintaxis y con todas las funcionalidades solicitadas (tarjetas principales, gráficas SVG, botones para mostrar u ocultar la tabla de nodos y cálculo robusto para la integración combinada).

```jsx
import React, { useState, useMemo } from "react";

// Evaluador matemático seguro
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
      .replace(/\be\b/g, "Math.E")
      .replace(/\bx\b/g, `(${xVal})`);

    // eslint-disable-next-line no-new-func
    const result = Function(`"use strict"; return (${sanitized});`)();
    return typeof result === "number" && !isNaN(result) && isFinite(result) ? result : null;
  } catch {
    return null;
  }
};

// Tabla de nodos reutilizable
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
          {points.map((p, idx) => (
            <tr key={idx}>
              <td className="fw-bold">{p.i}</td>
              <td>{typeof p.xi === "number" ? p.xi.toFixed(4) : p.xi}</td>
              <td>{typeof p.fxi === "number" ? p.fxi.toFixed(6) : p.fxi}</td>
              <td><span className="badge bg-light text-dark border">{p.w}</span></td>
              <td>{typeof p.val === "number" ? p.val.toFixed(6) : p.val}</td>
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

// Gráfica SVG genérica
const FunctionPlotSVG = ({ expr, a, b, points, themeColor }) => {
  const numA = parseFloat(a);
  const numB = parseFloat(b);

  const graph = useMemo(() => {
    if (isNaN(numA) || isNaN(numB) || numA >= numB || !points || points.length < 2) return null;

    const marginX = (numB - numA) * 0.08;
    const xMin = numA - marginX;
    const xMax = numB + marginX;

    const samples = 100;
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
      .map((p, idx) => `${idx === 0 ? "M" : "L"} ${mapX(p.x).toFixed(2)}${mapY(p.y).toFixed(2)}`)
      .join(" ");

    const polygons = [];
    for (let i = 0; i < points.length - 1; i++) {
      const x0 = mapX(points[i].xi);
      const x1 = mapX(points[i + 1].xi);
      const y0 = mapY(points[i].fxi);
      const y1 = mapY(points[i + 1].fxi);
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
      <svg viewBox={`0 0 ${graph.svgW}${graph.svgH}`} className="w-100" style={{ maxHeight: "280px" }}>
        <line x1="30" y1={graph.axisY0} x2={graph.svgW - 10} y2={graph.axisY0} stroke="#adb5bd" strokeWidth="1.5" />
        {graph.polygons.map((poly, idx) => (
          <g key={idx}>
            <path d={poly.path} fill={themeColor} fillOpacity="0.2" stroke={themeColor} strokeDasharray="3,3" strokeWidth="1" />
            <path d={poly.topLine} stroke={themeColor} strokeWidth="2" />
          </g>
        ))}
        <path d={graph.curvePath} fill="none" stroke="#dc3545" strokeWidth="2" />
        {points.map((p, idx) => (
          <g key={idx}>
            <circle cx={graph.mapX(p.xi)} cy={graph.mapY(p.fxi)} r="4" fill={themeColor} stroke="#fff" strokeWidth="1.5" />
            <text x={graph.mapX(p.xi)} y={graph.axisY0 + 15} fontSize="10" textAnchor="middle" fill="#6c757d">
              {p.xi.toFixed(2)}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

// 1. SIMULADOR TRAPECIO
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

// 2. SIMULADOR SIMPSON 1/3
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
      return { error: "⚠️ La Regla de Simpson 1/3 requiere que 'n' sea un número PAR." };
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

// 3. SIMULADOR SIMPSON 3/8
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
      return { error: "⚠️ La Regla de Simpson 3/8 requiere que 'n' sea MÚLTIPLO DE 3." };
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
              <div><small className="text-muted d-block">Fórmula</small><small className="font-monospace">I ≈ (3h/8)[f(x₀) + 3f(x₁) + 3f(x₂) + ...]</small></div>
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

// 4. SIMULADOR INTEGRACIÓN COMBINADA (TABULAR)
const PRESET_DATASETS = [
  { name: "6 Pts (1/3 + 3/8)", data: "0.0, 0.0000\n0.2, 0.1987\n0.4, 0.3894\n0.6, 0.5646\n0.8, 0.7174\n1.0, 0.8415" },
  { name: "5 Pts (Simpson 1/3)", data: "0.0, 1.0000\n0.5, 1.6487\n1.0, 2.7183\n1.5, 4.4817\n2.0, 7.3891" },
  { name: "4 Pts (Simpson 3/8)", data: "0.0, 0.0000\n1.0, 1.0000\n2.0, 8.0000\n3.0, 27.0000" },
  { name: "Paso Variable (Trapecios)", data: "0.0, 0.0000\n0.1, 0.0998\n0.3, 0.2955\n0.6, 0.5646\n1.0, 0.8415" },
];

const CombinadaSimulator = () => {
  const [pointsText, setPointsText] = useState(PRESET_DATASETS[0].data);
  const [showTable, setShowTable] = useState(false);

  const calc = useMemo(() => {
    const lines = pointsText.trim().split("\n");
    const pts = [];

    for (let line of lines) {
      const parts = line.replace(/[;\t]/g, ",").split(",");
      if (parts.length >= 2) {
        const xVal = parseFloat(parts[0].trim());
        const yVal = parseFloat(parts.trim());
        if (!isNaN(xVal) && !isNaN(yVal)) pts.push({ x: xVal, y: yVal });
      }
    }

    if (pts.length < 2) return { error: "Ingresa al menos 2 puntos válidos (x, y)." };

    pts.sort((a, b) => a.x - b.x);
    const n = pts.length - 1;
    const h0 = pts.x - pts[0].x;
    let isEquallySpaced = true;

    for (let i = 0; i < n; i++) {
      if (Math.abs(pts[i + 1].x - pts[i].x - h0) > 1e-4) {
        isEquallySpaced = false;
        break;
      }
    }

    let totalIntegral = 0;
    const segments = [];
    const tableRows = [];

    if (isEquallySpaced) {
      const h = h0;
      if (n === 1) {
        const I = (h / 2) * (pts[0].y + pts.y);
        totalIntegral = I;
        segments.push({ rule: "Trapecio Simple (1 int)", range: `[${pts[0].x.toFixed(2)},${pts.x.toFixed(2)}]`, subtotal: I, color: "#0d6efd" });
        tableRows.push({ i: 0, xi: pts[0].x, fxi: pts[0].y, w: "1 (Trap)", val: (h / 2) * pts[0].y });
        tableRows.push({ i: 1, xi: pts.x, fxi: pts.y, w: "1 (Trap)", val: (h / 2) * pts.y });
      } else if (n === 2) {
        const I = (h / 3) * (pts[0].y + 4 * pts.y + pts.y);
        totalIntegral = I;
        segments.push({ rule: "Simpson 1/3 (2 int)", range: `[${pts[0].x.toFixed(2)},${pts.x.toFixed(2)}]`, subtotal: I, color: "#198754" });
        tableRows.push({ i: 0, xi: pts[0].x, fxi: pts[0].y, w: "1 (1/3)", val: (h / 3) * pts[0].y });
        tableRows.push({ i: 1, xi: pts.x, fxi: pts.y, w: "4 (1/3)", val: (h / 3) * 4 * pts.y });
        tableRows.push({ i: 2, xi: pts.x, fxi: pts.y, w: "1 (1/3)", val: (h / 3) * pts.y });
      } else if (n === 3) {
        const I = ((3 * h) / 8) * (pts[0].y + 3 * pts.y + 3 * pts.y + pts.y);
        totalIntegral = I;
        segments.push({ rule: "Simpson 3/8 (3 int)", range: `[${pts[0].x.toFixed(2)},${pts.x.toFixed(2)}]`, subtotal: I, color: "#fd7e14" });
        tableRows.push({ i: 0, xi: pts[0].x, fxi: pts[0].y, w: "1 (3/8)", val: ((3 * h) / 8) * pts[0].y });
        tableRows.push({ i: 1, xi: pts.x, fxi: pts.y, w: "3 (3/8)", val: ((3 * h) / 8) * 3 * pts.y });
        tableRows.push({ i: 2, xi: pts.x, fxi: pts.y, w: "3 (3/8)", val: ((3 * h) / 8) * 3 * pts.y });
        tableRows.push({ i: 3, xi: pts.x, fxi: pts.y, w: "1 (3/8)", val: ((3 * h) / 8) * pts.y });
      } else if (n % 2 === 0) {
        let sum = 0;
        for (let i = 0; i <= n; i++) {
          const w = i === 0 || i === n ? 1 : i % 2 !== 0 ? 4 : 2;
          sum += w * pts[i].y;
          tableRows.push({ i, xi: pts[i].x, fxi: pts[i].y, w: `${w} (1/3)`, val: (h / 3) * w * pts[i].y });
        }
        totalIntegral = (h / 3) * sum;
        segments.push({ rule: `Simpson 1/3 Compuesto (${n} int)`, range: `[${pts[0].x.toFixed(2)},${pts[n].x.toFixed(2)}]`, subtotal: totalIntegral, color: "#198754" });
      } else {
        const n13 = n - 3;
        let sum13 = 0;
        for (let i = 0; i <= n13; i++) {
          const w = i === 0 || i === n13 ? 1 : i % 2 !== 0 ? 4 : 2;
          sum13 += w * pts[i].y;
          tableRows.push({ i, xi: pts[i].x, fxi: pts[i].y, w: `${w} (1/3)`, val: (h / 3) * w * pts[i].y });
        }
        const I13 = (h / 3) * sum13;
        totalIntegral += I13;
        segments.push({ rule: `Simpson 1/3 (${n13} int)`, range: `[${pts[0].x.toFixed(2)},${pts[n13].x.toFixed(2)}]`, subtotal: I13, color: "#198754" });

        const s38 = pts[n13].y + 3 * pts[n13 + 1].y + 3 * pts[n13 + 2].y + pts[n].y;
        const I38 = ((3 * h) / 8) * s38;
        totalIntegral += I38;
        segments.push({ rule: "Simpson 3/8 (3 int)", range: `[${pts[n13].x.toFixed(2)},${pts[n].x.toFixed(2)}]`, subtotal: I38, color: "#fd7e14" });

        tableRows.push({ i: n13 + 1, xi: pts[n13 + 1].x, fxi: pts[n13 + 1].y, w: "3 (3/8)", val: ((3 * h) / 8) * 3 * pts[n13 + 1].y });
        tableRows.push({ i: n13 + 2, xi: pts[n13 + 2].x, fxi: pts[n13 + 2].y, w: "3 (3/8)", val: ((3 * h) / 8) * 3 * pts[n13 + 2].y });
        tableRows.push({ i: n, xi: pts[n].x, fxi: pts[n].y, w: "1 (3/8)", val: ((3 * h) / 8) * pts[n].y });
      }
    } else {
      for (let i = 0; i < n; i++) {
        const segH = pts[i + 1].x - pts[i].x;
        const segI = (segH / 2) * (pts[i].y + pts[i + 1].y);
        totalIntegral += segI;
        segments.push({ rule: `Trapecio (h = ${segH.toFixed(3)})`, range: `[${pts[i].x.toFixed(2Aquí tienes el archivo **`SimuladorTab.jsx`** completo y corregido.

```jsx
import React, { useState, useMemo } from "react";

// ==========================================
// 1. EVALUADOR MATEMÁTICO
// ==========================================
const evalExpr = (expr, xVal) => {
  try {
    const s = expr
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
      .replace(/\be\b/g, "Math.E")
      .replace(/\bx\b/g, `(${xVal})`);
    // eslint-disable-next-line no-new-func
    const fn = Function(`"use strict"; return (${s});`);
    const res = fn();
    return typeof res === "number" && !isNaN(res) && isFinite(res) ? res : null;
  } catch {
    return null;
  }
};

// ==========================================
// 2. COMPONENTE DE TABLA DE NODOS
// ==========================================
const NodeTable = ({ points, sumLabel = "Suma =" }) => {
  const sum = points.reduce((acc, p) => acc + (p.val || 0), 0);
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
          {points.map((p, idx) => (
            <tr key={idx}>
              <td className="fw-bold">{p.i}</td>
              <td>{typeof p.xi === "number" ? p.xi.toFixed(4) : p.xi}</td>
              <td>{typeof p.fxi === "number" ? p.fxi.toFixed(6) : p.fxi}</td>
              <td><span className="badge bg-light text-dark border">{p.w}</span></td>
              <td>{typeof p.val === "number" ? p.val.toFixed(6) : p.val}</td>
            </tr>
          ))}
          <tr className="table-secondary fw-bold">
            <td colSpan="4" className="text-end">{sumLabel}</td>
            <td className="text-primary">{sum.toFixed(6)}</td>
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
    const samples = 100;
    const curvePoints = [];
    let yMin = 0, yMax = 0;

    for (let i = 0; i <= samples; i++) {
      const x = xMin + (i * (xMax - xMin)) / samples;
      const y = evalExpr(expr, x);
      if (y !== null) {
        curvePoints.push({ x, y });
        if (y < yMin) yMin = y;
        if (y > yMax) yMax = y;
      }
    }
    const marginY = (yMax - yMin) * 0.15 || 1;
    yMin -= marginY;
    yMax += marginY;

    const svgW = 600, svgH = 260, padL = 45, padR = 20, padT = 20, padB = 30;
    const plotW = svgW - padL - padR;
    const plotH = svgH - padT - padB;
    const mapX = (x) => padL + ((x - xMin) / (xMax - xMin)) * plotW;
    const mapY = (y) => padT + plotH - ((y - yMin) / (yMax - yMin)) * plotH;

    const curvePath = curvePoints
      .map((p, idx) => `${idx === 0 ? "M" : "L"} ${mapX(p.x).toFixed(2)} ${mapY(p.y).toFixed(2)}`)
      .join(" ");

    const polygons = [];
    for (let i = 0; i < points.length - 1; i++) {
      const x0 = mapX(points[i].xi);
      const x1 = mapX(points[i + 1].xi);
      const y0 = mapY(points[i].fxi);
      const y1 = mapY(points[i + 1].fxi);
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
        {points.map((p, idx) => (
          <g key={idx}>
            <circle cx={graph.mapX(p.xi)} cy={graph.mapY(p.fxi)} r="4" fill={themeColor} stroke="#fff" strokeWidth="1.5" />
            <text x={graph.mapX(p.xi)} y={graph.axisY0 + 15} fontSize="10" textAnchor="middle" fill="#6c757d">
              {p.xi.toFixed(2)}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

// ==========================================
// 4. SIMULADOR: REGLA DEL TRAPECIO
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
      const fxi = evalExpr(expr, xi);
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
      return { error: "⚠️ La Regla de Simpson 1/3 requiere que 'n' sea un número PAR." };
    }
    const h = (numB - numA) / numN;
    const points = [];
    let sum = 0;
    for (let i = 0; i <= numN; i++) {
      const xi = numA + i * h;
      const fxi = evalExpr(expr, xi);
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
      return { error: "⚠️ La Regla de Simpson 3/8 requiere que 'n' sea MÚLTIPLO DE 3." };
    }
    const h = (numB - numA) / numN;
    const points = [];
    let sum = 0;
    for (let i = 0; i <= numN; i++) {
      const xi = numA + i * h;
      const fxi = evalExpr(expr, xi);
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
              <div><small className="text-muted d-block">Fórmula</small><small className="font-monospace">I ≈ (3h/8)[f(x₀) + 3f(x₁) + 3f(x₂) + ...]</small></div>
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
// 7. SIMULADOR: INTEGRACIÓN COMBINADA
// ==========================================
const PRESET_DATASETS = [
  { name: "6 Pts (1/3 + 3/8)", data: "0.0, 0.0000\n0.2, 0.1987\n0.4, 0.3894\n0.6, 0.5646\n0.8, 0.7174\n1.0, 0.8415" },
  { name: "5 Pts (Simpson 1/3)", data: "0.0, 1.0000\n0.5, 1.6487\n1.0, 2.7183\n1.5, 4.4817\n2.0, 7.3891" },
  { name: "4 Pts (Simpson 3/8)", data: "0.0, 0.0000\n1.0, 1.0000\n2.0, 8.0000\n3.0, 27.0000" },
  { name: "Paso Variable (Trapecios)", data: "0.0, 0.0000\n0.1, 0.0998\n0.3, 0.2955\n0.6, 0.5646\n1.0, 0.8415" },
];

const CombinadaSimulator = () => {
  const [pointsText, setPointsText] = useState(PRESET_DATASETS[0].data);
  const [showTable, setShowTable] = useState(false);

  const calc = useMemo(() => {
    const lines = pointsText.trim().split("\n");
    const pts = [];

    for (let rawLine of lines) {
      const line = rawLine.trim();
      if (!line) continue;
      const parts = line.replace(/[;\t]/g, ",").split(",");
      if (parts.length >= 2) {
        const xVal = parseFloat(parts[0].trim());
        const yVal = parseFloat(parts.trim());
        if (!isNaN(xVal) && !isNaN(yVal)) {
          pts.push({ x: xVal, y: yVal });
        }
      }
    }

    if (pts.length < 2) return { error: "Ingresa al menos 2 puntos válidos (x, y)." };

    pts.sort((a, b) => a.x - b.x);
    const n = pts.length - 1;
    const h0 = pts.x - pts[0].x;
    let isEquallySpaced = true;

    for (let i = 0; i < n; i++) {
      if (Math.abs(pts[i + 1].x - pts[i].x - h0) > 1e-4) {
        isEquallySpaced = false;
        break;
      }
    }

    let totalIntegral = 0;
    const segments = [];
    const tableRows = [];

    if (isEquallySpaced) {
      const h = h0;
      if (n === 1) {
        const I = (h / 2) * (pts[0].y + pts.y);
        totalIntegral = I;
        segments.push({ rule: "Trapecio Simple (1 int)", range: `[${pts[0].x.toFixed(2)}, ${pts.x.toFixed(2)}]`, subtotal: I, color: "#0d6efd" });
        tableRows.push({ i: 0, xi: pts[0].x, fxi: pts[0].y, w: "1 (Trap)", val: (h / 2) * pts[0].y });
        tableRows.push({ i: 1, xi: pts.x, fxi: pts.y, w: "1 (Trap)", val: (h / 2) * pts.y });
      } else if (n === 2) {
        const I = (h / 3) * (pts[0].y + 4 * pts.y + pts.y);
        totalIntegral = I;
        segments.push({ rule: "Simpson 1/3 (2 int)", range: `[${pts[0].x.toFixed(2)}, ${pts.x.toFixed(2)}]`, subtotal: I, color: "#198754" });
        tableRows.push({ i: 0, xi: pts[0].x, fxi: pts[0].y, w: "1 (1/3)", val: (h / 3) * pts[0].y });
        tableRows.push({ i: 1, xi: pts.x, fxi: pts.y, w: "4 (1/3)", val: (h / 3) * 4 * pts.y });
        tableRows.push({ i: 2, xi: pts.x, fxi: pts.y, w: "1 (1/3)", val: (h / 3) * pts.y });
      } else if (n === 3) {
        const I = ((3 * h) / 8) * (pts[0].y + 3 * pts.y + 3 * pts.y + pts.y);
        totalIntegral = I;
        segments.push({ rule: "Simpson 3/8 (3 int)", range: `[${pts[0].x.toFixed(2)}, ${pts.x.toFixed(2)}]`, subtotal: I, color: "#fd7e14" });
        tableRows.push({ i: 0, xi: pts[0].x, fxi: pts[0].y, w: "1 (3/8)", val: ((3 * h) / 8) * pts[0].y });
        tableRows.push({ i: 1, xi: pts.x, fxi: pts.y, w: "3 (3/8)", val: ((3 * h) / 8) * 3 * pts.y });
        tableRows.push({ i: 2, xi: pts.x, fxi: pts.y, w: "3 (3/8)", val: ((3 * h) / 8) * 3 * pts.y });
        tableRows.push({ i: 3, xi: pts.x, fxi: pts.y, w: "1 (3/8)", val: ((3 * h) / 8) * pts.y });
      } else if (n % 2 === 0) {
        let sum = 0;
        for (let i = 0; i <= n; i++) {
          const w = i === 0 || i === n ? 1 : i % 2 !== 0 ? 4 : 2;
          sum += w * pts[i].y;
          tableRows.push({ i, xi: pts[i].x, fxi: pts[i].y, w: `${w} (1/3)`, val: (h / 3) * w * pts[i].y });
        }
        totalIntegral = (h / 3) * sum;
        segments.push({ rule: `Simpson 1/3 Compuesto (${n} int)`, range: `[${pts[0].x.toFixed(2)}, ${pts[n].x.toFixed(2)}]`, subtotal: totalIntegral, color: "#198754" });
      } else {
        const n13 = n - 3;
        let sum13 = 0;
        for (let i = 0; i <= n13; i++) {
          const w = i === 0 || i === n13 ? 1 : i % 2 !== 0 ? 4 : 2;
          sum13 += w * pts[i].y;
          tableRows.push({ i, xi: pts[i].x, fxi: pts[i].y, w: `${w} (1/3)`, val: (h / 3) * w * pts[i].y });
        }
        const I13 = (h / 3) * sum13;
        totalIntegral += I13;
        segments.push({ rule: `Simpson 1/3 (${n13} int)`, range: `[${pts[0].x.toFixed(2)}, ${pts[n13].x.toFixed(2)}]`, subtotal: I13, color: "#198754" });

        const s38 = pts[n13].y + 3 * pts[n13 + 1].y + 3 * pts[n13 + 2].y + pts[n].y;
        const I38 = ((3 * h) / 8) * s38;
        totalIntegral += I38;
        segments.push({ rule: "Simpson 3/8 (3 int)", range: `[${pts[n13].x.toFixed(2)}, ${pts[n].x.toFixed(2)}]`, subtotal: I38, color: "#fd7e14" });

        tableRows.push({ i: n13 + 1, xi: pts[n13 + 1].x, fxi: pts[n13 + 1].y, w: "3 (3/8)", val: ((3 * h) / 8) * 3 * pts[n13 + 1].y });
        tableRows.push({ i: n13 + 2, xi: pts[n13 + 2].x, fxi: pts[n13 + 2].y, w: "3 (3/8)", val: ((3 * h) / 8) * 3 * pts[n13 + 2].y });
        tableRows.push({ i: n, xi: pts[n].x, fxi: pts[n].y, w: "1 (3/8)", val: ((3 * h) / 8) * pts[n].y });
      }
    } else {
      for (let i = 0; i < n; i++) {
        const segH = pts[i + 1].x - pts[i].x;
        const segI = (segH / 2) * (pts[i].y + pts[i + 1].y);
        totalIntegral += segI;
        segments.push({ rule: `Trapecio (h = ${segH.Aquí tienes el código completo y modularizado de **`SimuladorTab.jsx`**, completamente libre de duplicidades y errores de sintaxis, listo para copiar y pegar en tu proyecto:

```jsx
import React, { useState, useMemo } from "react";

// ==========================================
// 1. EVALUADOR MATEMÁTICO
// ==========================================
const evalExpr = (expr, xVal) => {
  try {
    const s = expr
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
      .replace(/\be\b/g, "Math.E")
      .replace(/\bx\b/g, `(${xVal})`);
    // eslint-disable-next-line no-new-func
    const res = Function(`"use strict"; return (${s});`)();
    return typeof res === "number" && !isNaN(res) && isFinite(res) ? res : null;
  } catch {
    return null;
  }
};

// ==========================================
// 2. TABLA DE NODOS REUTILIZABLE
// ==========================================
const NodeTable = ({ points, sumLabel = "Suma =" }) => {
  const sum = points.reduce((acc, p) => acc + (p.val || 0), 0);
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
          {points.map((p, idx) => (
            <tr key={idx}>
              <td className="fw-bold">{p.i}</td>
              <td>{typeof p.xi === "number" ? p.xi.toFixed(4) : p.xi}</td>
              <td>{typeof p.fxi === "number" ? p.fxi.toFixed(6) : p.fxi}</td>
              <td><span className="badge bg-light text-dark border">{p.w}</span></td>
              <td>{typeof p.val === "number" ? p.val.toFixed(6) : p.val}</td>
            </tr>
          ))}
          <tr className="table-secondary fw-bold">
            <td colSpan="4" className="text-end">{sumLabel}</td>
            <td className="text-primary">{sum.toFixed(6)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

// ==========================================
// 3. GRÁFICA SVG GENÉRICA
// ==========================================
const PlotSVG = ({ expr, a, b, points, themeColor }) => {
  const numA = parseFloat(a);
  const numB = parseFloat(b);

  const graph = useMemo(() => {
    if (isNaN(numA) || isNaN(numB) || numA >= numB || !points || points.length < 2) return null;

    const marginX = (numB - numA) * 0.08;
    const xMin = numA - marginX;
    const xMax = numB + marginX;
    const samples = 100;
    const curvePoints = [];
    let yMin = 0, yMax = 0;

    for (let i = 0; i <= samples; i++) {
      const x = xMin + (i * (xMax - xMin)) / samples;
      const y = expr ? evalExpr(expr, x) : null;
      if (y !== null) {
        curvePoints.push({ x, y });
        if (y < yMin) yMin = y;
        if (y > yMax) yMax = y;
      }
    }

    if (!expr) {
      points.forEach((p) => {
        const y = p.fxi !== undefined ? p.fxi : p.y;
        if (y < yMin) yMin = y;
        if (y > yMax) yMax = y;
      });
    }

    const marginY = (yMax - yMin) * 0.15 || 1;
    yMin -= marginY;
    yMax += marginY;

    const svgW = 600, svgH = 260, padL = 45, padR = 20, padT = 20, padB = 30;
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
      const x0 = mapX(p0.xi !== undefined ? p0.xi : p0.x);
      const x1 = mapX(p1.xi !== undefined ? p1.xi : p1.x);
      const y0 = mapY(p0.fxi !== undefined ? p0.fxi : p0.y);
      const y1 = mapY(p1.fxi !== undefined ? p1.fxi : p1.y);
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
            <path d={poly.path} fill={themeColor} fillOpacity="0.18" stroke={themeColor} strokeDasharray="3,3" strokeWidth="1" />
            <path d={poly.topLine} stroke={themeColor} strokeWidth="2" />
          </g>
        ))}
        {expr && <path d={graph.curvePath} fill="none" stroke="#dc3545" strokeWidth="2" />}
        {points.map((p, idx) => {
          const px = p.xi !== undefined ? p.xi : p.x;
          const py = p.fxi !== undefined ? p.fxi : p.y;
          return (
            <g key={idx}>
              <circle cx={graph.mapX(px)} cy={graph.mapY(py)} r="4" fill={themeColor} stroke="#fff" strokeWidth="1.5" />
              <text x={graph.mapX(px)} y={graph.axisY0 + 15} fontSize="10" textAnchor="middle" fill="#6c757d">
                {px.toFixed(2)}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

// ==========================================
// 4. SIMULADOR GENÉRICO (MÉTODOS CONTINUOS)
// ==========================================
const ContinuousMethodSimulator = ({ config }) => {
  const [expr, setExpr] = useState(config.defaultExpr);
  const [a, setA] = useState(config.defaultA);
  const [b, setB] = useState(config.defaultB);
  const [n, setN] = useState(config.defaultN);
  const [showTable, setShowTable] = useState(false);

  const calc = useMemo(() => {
    const numA = parseFloat(a);
    const numB = parseFloat(b);
    const numN = parseInt(n, 10);

    const valErr = config.validate(numA, numB, numN);
    if (valErr) return { error: valErr };

    const h = (numB - numA) / numN;
    const points = [];
    let sum = 0;

    for (let i = 0; i <= numN; i++) {
      const xi = numA + i * h;
      const fxi = evalExpr(expr, xi);
      if (fxi === null) return { error: `Error evaluando f(x) en x = ${xi.toFixed(4)}` };
      const w = config.getWeight(i, numN);
      const contribution = w * fxi;
      sum += contribution;
      points.push({ i, xi, fxi, w, val: contribution });
    }

    const integral = config.computeIntegral(h, sum);
    return { h, points, integral };
  }, [expr, a, b, n, config]);

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
          <label className="form-label small fw-bold">{config.nLabel}</label>
          <input type="number" step={config.nStep || 1} min={config.nMin || 1} className="form-control form-control-sm" value={n} onChange={(e) => setN(e.target.value)} />
        </div>
      </div>

      {calc.error ? (
        <div className="alert alert-warning py-2 small">{calc.error}</div>
      ) : (
        <>
          <div className={`card mb-3 border-${config.theme} bg-${config.theme} bg-opacity-10`}>
            <div className="card-body py-2 d-flex justify-content-around text-center">
              <div><small className="text-muted d-block">Paso (h)</small><strong>{calc.h.toFixed(4)}</strong></div>
              <div><small className="text-muted d-block">Fórmula</small><small className="font-monospace">{config.formulaText}</small></div>
              <div><small className="text-muted d-block">Resultado Integral (I)</small><strong className={`h5 text-${config.theme} mb-0`}>{calc.integral.toFixed(6)}</strong></div>
            </div>
          </div>

          <PlotSVG expr={expr} a={a} b={b} points={calc.points} themeColor={config.hexColor} />

          <div className="text-end mb-2">
            <button className={`btn btn-sm btn-outline-${config.theme}`} onClick={() => setShowTable(!showTable)}>
              {showTable ? "Ocultar tabla de nodos" : "Mostrar tabla de nodos"}
            </button>
          </div>

          {showTable && <NodeTable points={calc.points} />}
        </>
      )}
    </div>
  );
};

// Configuraciones de métodos continuos
const CONFIG_TRAPECIO = {
  theme: "primary",
  hexColor: "#0d6efd",
  defaultExpr: "x^2",
  defaultA: 0,
  defaultB: 4,
  defaultN: 4,
  nLabel: "Subintervalos (n)",
  nMin: 1,
  formulaText: "I ≈ (h/2)[f(a) + 2∑f(xᵢ) + f(b)]",
  validate: (a, b, n) => (isNaN(a) || isNaN(b) || isNaN(n) || n < 1 || a >= b ? "Verifica que a < b y n ≥ 1." : null),
  getWeight: (i, n) => (i === 0 || i === n ? 1 : 2),
  computeIntegral: (h, sum) => (h / 2) * sum,
};

const CONFIG_SIMPSON13 = {
  theme: "success",
  hexColor: "#198754",
  defaultExpr: "sin(x) + 1",
  defaultA: 0,
  defaultB: 3.1416,
  defaultN: 4,
  nLabel: "Subintervalos n (Par)",
  nMin: 2,
  nStep: 2,
  formulaText: "I ≈ (h/3)[f(a) + 4∑f(imp) + 2∑f(par) + f(b)]",
  validate: (a, b, n) => {
    if (isNaN(a) || isNaN(b) || isNaN(n) || n < 2 || a >= b) return "Verifica que a < b y n ≥ 2.";
    if (n % 2 !== 0) return "⚠️ Simpson 1/3 requiere que 'n' sea un número PAR (ej. 2, 4, 6, 8...).";
    return null;
  },
  getWeight: (i, n) => (i === 0 || i === n ? 1 : i % 2 !== 0 ? 4 : 2),
  computeIntegral: (h, sum) => (h / 3) * sum,
};

const CONFIG_SIMPSON38 = {
  theme: "warning",
  hexColor: "#fd7e14",
  defaultExpr: "1 / (1 + x^2)",
  defaultA: 0,
  defaultB: 3,
  defaultN: 3,
  nLabel: "Subintervalos n (Múltiplo 3)",
  nMin: 3,
  nStep: 3,
  formulaText: "I ≈ (3h/8)[f(x₀) + 3f(x₁) + 3f(x₂) + 2f(x₃) + ...]",
  validate: (a, b, n) => {
    if (isNaN(a) || isNaN(b) || isNaN(n) || n < 3 || a >= b) return "Verifica que a < b y n ≥ 3.";
    if (n % 3 !== 0) return "⚠️ Simpson 3/8 requiere que 'n' sea MÚLTIPLO DE 3 (ej. 3, 6, 9...).";
    return null;
  },
  getWeight: (i, n) => (i === 0 || i === n ? 1 : i % 3 === 0 ? 2 : 3),
  computeIntegral: (h, sum) => ((3 * h) / 8) * sum,
};

// ==========================================
// 5. SIMULADOR: INTEGRACIÓN COMBINADA (TABULAR)
// ==========================================
const PRESETS_COMBINADA = [
  { name: "6 Pts (1/3 + 3/8)", data: "0.0, 0.0000\n0.2, 0.1987\n0.4, 0.3894\n0.6, 0.5646\n0.8, 0.7174\n1.0, 0.8415" },
  { name: "5 Pts (Simpson 1/3)", data: "0.0, 1.0000\n0.5, 1.6487\n1.0, 2.7183\n1.5, 4.4817\n2.0, 7.3891" },
  { name: "4 Pts (Simpson 3/8)", data: "0.0, 0.0000\n1.0, 1.0000\n2.0, 8.0000\n3.0, 27.0000" },
  { name: "Paso Variable (Trapecios)", data: "0.0, 0.0000\n0.1, 0.0998\n0.3, 0.2955\n0.6, 0.5646\n1.0, 0.8415" },
];

const CombinadaSimulator = () => {
  const [pointsText, setPointsText] = useState(PRESETS_COMBINADA[0].data);
  const [showTable, setShowTable] = useState(false);

  const calc = useMemo(() => {
    const lines = pointsText.trim().split("\n");
    const pts = [];

    for (let line of lines) {
      const parts = line.replace(/[;\t]/g, ",").split(",");
      if (parts.length >= 2) {
        const x = parseFloat(parts[0].trim());
        const y = parseFloat(parts.trim());
        if (!isNaN(x) && !isNaN(y)) pts.push({ x, y });
      }
    }

    if (pts.length < 2) return { error: "Ingresa al menos 2 puntos válidos (x, y)." };

    pts.sort((a, b) => a.x - b.x);
    const n = pts.length - 1;
    const h0 = pts.x - pts[0].x;
    let isConstH = true;

    for (let i = 0; i < n; i++) {
      if (Math.abs(pts[i + 1].x - pts[i].x - h0) > 1e-4) {
        isConstH = false;
        break;
      }
    }

    let totalI = 0;
    const segments = [];
    const tableRows = [];

    if (isConstH) {
      const h = h0;
      if (n === 1) {
        totalI = (h / 2) * (pts[0].y + pts.y);
        segments.push({ rule: "Trapecio Simple", range: `[${pts[0].x.toFixed(2)}, ${pts.x.toFixed(2)}]`, subtotal: totalI, color: "#0d6efd" });
        tableRows.push({ i: 0, xi: pts[0].x, fxi: pts[0].y, w: "1 (Trap)", val: (h / 2) * pts[0].y });
        tableRows.push({ i: 1, xi: pts.x, fxi: pts.y, w: "1 (Trap)", val: (h / 2) * pts.y });
      } else if (n === 2) {
        totalI = (h / 3) * (pts[0].y + 4 * pts.y + pts.y);
        segments.push({ rule: "Simpson 1/3 Simple", range: `[${pts[0].x.toFixed(2)}, ${pts.x.toFixed(2)}]`, subtotal: totalI, color: "#198754" });
        tableRows.push({ i: 0, xi: pts[0].x, fxi: pts[0].y, w: "1 (1/3)", val: (h / 3) * pts[0].y });
        tableRows.push({ i: 1, xi: pts.x, fxi: pts.y, w: "4 (1/3)", val: (h / 3) * 4 * pts.y });
        tableRows.push({ i: 2, xi: pts.x, fxi: pts.y, w: "1 (1/3)", val: (h / 3) * pts.y });
      } else if (n === 3) {
        totalI = ((3 * h) / 8) * (pts[0].y + 3 * pts.y + 3 * pts.y + pts.y);
        segments.push({ rule: "Simpson 3/8 Simple", range: `[${pts[0].x.toFixed(2)}, ${pts.x.toFixed(2)}]`, subtotal: totalI, color: "#fd7e14" });
        tableRows.push({ i: 0, xi: pts[0].x, fxi: pts[0].y, w: "1 (3/8)", val: ((3 * h) / 8) * pts[0].y });
        tableRows.push({ i: 1, xi: pts.x, fxi: pts.y, w: "3 (3/8)", val: ((3 * h) / 8) * 3 * pts.y });
        tableRows.push({ i: 2, xi: pts.x, fxi: pts.y, w: "3 (3/8)", val: ((3 * h) / 8) * 3 * pts.y });
        tableRows.push({ i: 3, xi: pts.x, fxi: pts.y, w: "1 (3/8)", val: ((3 * h) / 8) * pts.y });
      } else if (n % 2 === 0) {
        let sum = 0;
        for (let i = 0; i <= n; i++) {
          const w = i === 0 || i === n ? 1 : i % 2 !== 0 ? 4 : 2;
          sum += w * pts[i].y;
          tableRows.push({ i, xi: pts[i].x, fxi: pts[i].y, w: `${w} (1/3)`, val: (h / 3) * w * pts[i].y });
        }
        totalI = (h / 3) * sum;
        segments.push({ rule: `Simpson 1/3 Compuesto (${n} int)`, range: `[${pts[0].x.toFixed(2)}, ${pts[n].x.toFixed(2)}]`, subtotal: totalI, color: "#198754" });
      } else {
        const n13 = n - 3;
        let sum13 = 0;
        for (let i = 0; i <= n13; i++) {
          const w = i === 0 || i === n13 ? 1 : i % 2 !== 0 ? 4 : 2;
          sum13 += w * pts[i].y;
          tableRows.push({ i, xi: pts[i].x, fxi: pts[i].y, w: `${w} (1/3)`, val: (h / 3) * w * pts[i].y });
        }
        const I13 = (h / 3) * sum13;
        totalI += I13;
        segments.push({ rule: `Simpson 1/3 (${n13} int)`, range: `[${pts[0].x.toFixed(2)}, ${pts[n13].x.toFixed(2)}]`, subtotal: I13, color: "#198754" });

        const s38 = pts[n13].y + 3 * pts[n13 + 1].y + 3 * pts[n13 + 2].y + pts[n].y;
        const I38 = ((3 * h) / 8) * s38;
        totalI += I38;
        segments.push({ rule: "Simpson 3/8 (3 int)", range: `[${pts[n13].x.toFixed(2)}, ${pts[n].x.toFixed(2)}]`, subtotal: I38, color: "#fd7e14" });

        tableRows.push({ i: n13 + 1, xi: pts[n13 + 1].x, fxi: pts[n13 + 1].y, w: "3 (3/8)", val: ((3 * h) / 8) * 3 * pts[n13 + 1].y });
        tableRows.push({ i: n13 + 2, xi: pts[n13 + 2].x, fxi: pts[n13 + 2].y, w: "3 (3/8)", val: ((3 * h) / 8) * 3 * pts[n13 + 2].y });
        tableRows.push({ i: n, xi: pts[n].x, fxi: pts[n].y, w: "1 (3/8)", val: ((3 * h) / 8) * pts[n].y });
      }
    } else {
      for (let i = 0; i < n; i++) {
        const segH = pts[i + 1].x - pts[i].x;
        const segI = (segH / 2) * (pts[i].y + pts[i + 1].y);
        totalI += segI;
        segments.push({ rule: `Trapecio (h = ${segH.toFixed(3)})`, range: `[${pts[i].x.toFixed(2)}, ${pts[i + 1].x.toFixed(2)}]`, subtotal: segI, color: "#6c757d" });
      }
      pts.forEach((p, idx) => {
        tableRows.push({ i: idx, xiAquí tienes el código completo y optimizado de **`SimuladorTab.jsx`**. Se refactorizó la arquitectura para unificar los simuladores continuos y simplificar el motor de la **Integración Combinada**, asegurando compatibilidad total con Vite, sin redundancias de código ni errores de compilación.

```jsx
import React, { useState, useMemo } from "react";

// ==========================================
// 1. EVALUADOR MATEMÁTICO
// ==========================================
const evalExpr = (expr, xVal) => {
  try {
    const s = expr
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
      .replace(/\be\b/g, "Math.E")
      .replace(/\bx\b/g, `(${xVal})`);
    // eslint-disable-next-line no-new-func
    const res = Function(`"use strict"; return (${s});`)();
    return typeof res === "number" && !isNaN(res) && isFinite(res) ? res : null;
  } catch {
    return null;
  }
};

// ==========================================
// 2. TABLA DE NODOS
// ==========================================
const NodeTable = ({ points, sumLabel = "Suma =" }) => {
  const sum = points.reduce((acc, p) => acc + (p.val || 0), 0);
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
          {points.map((p, idx) => (
            <tr key={idx}>
              <td className="fw-bold">{p.i}</td>
              <td>{typeof p.xi === "number" ? p.xi.toFixed(4) : p.xi}</td>
              <td>{typeof p.fxi === "number" ? p.fxi.toFixed(6) : p.fxi}</td>
              <td><span className="badge bg-light text-dark border">{p.w}</span></td>
              <td>{typeof p.val === "number" ? p.val.toFixed(6) : p.val}</td>
            </tr>
          ))}
          <tr className="table-secondary fw-bold">
            <td colSpan="4" className="text-end">{sumLabel}</td>
            <td className="text-primary">{sum.toFixed(6)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

// ==========================================
// 3. GRÁFICA SVG GENÉRICA
// ==========================================
const PlotSVG = ({ expr, a, b, points, themeColor }) => {
  const numA = parseFloat(a);
  const numB = parseFloat(b);

  const graph = useMemo(() => {
    if (isNaN(numA) || isNaN(numB) || numA >= numB || !points || points.length < 2) return null;

    const marginX = (numB - numA) * 0.08;
    const xMin = numA - marginX;
    const xMax = numB + marginX;
    const samples = 100;
    const curvePoints = [];
    let yMin = 0, yMax = 0;

    for (let i = 0; i <= samples; i++) {
      const x = xMin + (i * (xMax - xMin)) / samples;
      const y = expr ? evalExpr(expr, x) : null;
      if (y !== null) {
        curvePoints.push({ x, y });
        if (y < yMin) yMin = y;
        if (y > yMax) yMax = y;
      }
    }

    if (!expr) {
      points.forEach((p) => {
        const y = p.fxi !== undefined ? p.fxi : p.y;
        if (y < yMin) yMin = y;
        if (y > yMax) yMax = y;
      });
    }

    const marginY = (yMax - yMin) * 0.15 || 1;
    yMin -= marginY;
    yMax += marginY;

    const svgW = 600, svgH = 260, padL = 45, padR = 20, padT = 20, padB = 30;
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
      const x0 = mapX(p0.xi !== undefined ? p0.xi : p0.x);
      const x1 = mapX(p1.xi !== undefined ? p1.xi : p1.x);
      const y0 = mapY(p0.fxi !== undefined ? p0.fxi : p0.y);
      const y1 = mapY(p1.fxi !== undefined ? p1.fxi : p1.y);
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
            <path d={poly.path} fill={themeColor} fillOpacity="0.18" stroke={themeColor} strokeDasharray="3,3" strokeWidth="1" />
            <path d={poly.topLine} stroke={themeColor} strokeWidth="2" />
          </g>
        ))}
        {expr && <path d={graph.curvePath} fill="none" stroke="#dc3545" strokeWidth="2" />}
        {points.map((p, idx) => {
          const px = p.xi !== undefined ? p.xi : p.x;
          const py = p.fxi !== undefined ? p.fxi : p.y;
          return (
            <g key={idx}>
              <circle cx={graph.mapX(px)} cy={graph.mapY(py)} r="4" fill={themeColor} stroke="#fff" strokeWidth="1.5" />
              <text x={graph.mapX(px)} y={graph.axisY0 + 15} fontSize="10" textAnchor="middle" fill="#6c757d">
                {px.toFixed(2)}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

// ==========================================
// 4. SIMULADOR GENÉRICO CONTINUO
// ==========================================
const ContinuousMethodSimulator = ({ config }) => {
  const [expr, setExpr] = useState(config.defaultExpr);
  const [a, setA] = useState(config.defaultA);
  const [b, setB] = useState(config.defaultB);
  const [n, setN] = useState(config.defaultN);
  const [showTable, setShowTable] = useState(false);

  const calc = useMemo(() => {
    const numA = parseFloat(a);
    const numB = parseFloat(b);
    const numN = parseInt(n, 10);

    const valErr = config.validate(numA, numB, numN);
    if (valErr) return { error: valErr };

    const h = (numB - numA) / numN;
    const points = [];
    let sum = 0;

    for (let i = 0; i <= numN; i++) {
      const xi = numA + i * h;
      const fxi = evalExpr(expr, xi);
      if (fxi === null) return { error: `Error evaluando f(x) en x = ${xi.toFixed(4)}` };
      const w = config.getWeight(i, numN);
      const contribution = w * fxi;
      sum += contribution;
      points.push({ i, xi, fxi, w, val: contribution });
    }

    const integral = config.computeIntegral(h, sum);
    return { h, points, integral };
  }, [expr, a, b, n, config]);

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
          <label className="form-label small fw-bold">{config.nLabel}</label>
          <input type="number" step={config.nStep || 1} min={config.nMin || 1} className="form-control form-control-sm" value={n} onChange={(e) => setN(e.target.value)} />
        </div>
      </div>

      {calc.error ? (
        <div className="alert alert-warning py-2 small">{calc.error}</div>
      ) : (
        <>
          <div className={`card mb-3 border-${config.theme} bg-${config.theme} bg-opacity-10`}>
            <div className="card-body py-2 d-flex justify-content-around text-center">
              <div><small className="text-muted d-block">Paso (h)</small><strong>{calc.h.toFixed(4)}</strong></div>
              <div><small className="text-muted d-block">Fórmula</small><small className="font-monospace">{config.formulaText}</small></div>
              <div><small className="text-muted d-block">Resultado Integral (I)</small><strong className={`h5 text-${config.theme} mb-0`}>{calc.integral.toFixed(6)}</strong></div>
            </div>
          </div>

          <PlotSVG expr={expr} a={a} b={b} points={calc.points} themeColor={config.hexColor} />

          <div className="text-end mb-2">
            <button className={`btn btn-sm btn-outline-${config.theme}`} onClick={() => setShowTable(!showTable)}>
              {showTable ? "Ocultar tabla de nodos" : "Mostrar tabla de nodos"}
            </button>
          </div>

          {showTable && <NodeTable points={calc.points} />}
        </>
      )}
    </div>
  );
};

const CONFIG_TRAPECIO = {
  theme: "primary",
  hexColor: "#0d6efd",
  defaultExpr: "x^2",
  defaultA: 0,
  defaultB: 4,
  defaultN: 4,
  nLabel: "Subintervalos (n)",
  nMin: 1,
  formulaText: "I ≈ (h/2)[f(a) + 2∑f(xᵢ) + f(b)]",
  validate: (a, b, n) => (isNaN(a) || isNaN(b) || isNaN(n) || n < 1 || a >= b ? "Verifica que a < b y n ≥ 1." : null),
  getWeight: (i, n) => (i === 0 || i === n ? 1 : 2),
  computeIntegral: (h, sum) => (h / 2) * sum,
};

const CONFIG_SIMPSON13 = {
  theme: "success",
  hexColor: "#198754",
  defaultExpr: "sin(x) + 1",
  defaultA: 0,
  defaultB: 3.1416,
  defaultN: 4,
  nLabel: "Subintervalos n (Par)",
  nMin: 2,
  nStep: 2,
  formulaText: "I ≈ (h/3)[f(a) + 4∑f(imp) + 2∑f(par) + f(b)]",
  validate: (a, b, n) => {
    if (isNaN(a) || isNaN(b) || isNaN(n) || n < 2 || a >= b) return "Verifica que a < b y n ≥ 2.";
    if (n % 2 !== 0) return "⚠️ Simpson 1/3 requiere que 'n' sea un número PAR (ej. 2, 4, 6, 8...).";
    return null;
  },
  getWeight: (i, n) => (i === 0 || i === n ? 1 : i % 2 !== 0 ? 4 : 2),
  computeIntegral: (h, sum) => (h / 3) * sum,
};

const CONFIG_SIMPSON38 = {
  theme: "warning",
  hexColor: "#fd7e14",
  defaultExpr: "1 / (1 + x^2)",
  defaultA: 0,
  defaultB: 3,
  defaultN: 3,
  nLabel: "Subintervalos n (Múltiplo 3)",
  nMin: 3,
  nStep: 3,
  formulaText: "I ≈ (3h/8)[f(x₀) + 3f(x₁) + 3f(x₂) + 2f(x₃) + ...]",
  validate: (a, b, n) => {
    if (isNaN(a) || isNaN(b) || isNaN(n) || n < 3 || a >= b) return "Verifica que a < b y n ≥ 3.";
    if (n % 3 !== 0) return "⚠️ Simpson 3/8 requiere que 'n' sea MÚLTIPLO DE 3 (ej. 3, 6, 9...).";
    return null;
  },
  getWeight: (i, n) => (i === 0 || i === n ? 1 : i % 3 === 0 ? 2 : 3),
  computeIntegral: (h, sum) => ((3 * h) / 8) * sum,
};

// ==========================================
// 5. SIMULADOR: INTEGRACIÓN COMBINADA
// ==========================================
const PRESETS_COMBINADA = [
  { name: "6 Pts (1/3 + 3/8)", data: "0.0, 0.0000\n0.2, 0.1987\n0.4, 0.3894\n0.6, 0.5646\n0.8, 0.7174\n1.0, 0.8415" },
  { name: "5 Pts (Simpson 1/3)", data: "0.0, 1.0000\n0.5, 1.6487\n1.0, 2.7183\n1.5, 4.4817\n2.0, 7.3891" },
  { name: "4 Pts (Simpson 3/8)", data: "0.0, 0.0000\n1.0, 1.0000\n2.0, 8.0000\n3.0, 27.0000" },
  { name: "Paso Variable (Trapecios)", data: "0.0, 0.0000\n0.1, 0.0998\n0.3, 0.2955\n0.6, 0.5646\n1.0, 0.8415" },
];

const CombinadaSimulator = () => {
  const [pointsText, setPointsText] = useState(PRESETS_COMBINADA[0].data);
  const [showTable, setShowTable] = useState(false);

  const calc = useMemo(() => {
    const lines = pointsText.trim().split("\n");
    const pts = [];

    for (let line of lines) {
      const parts = line.replace(/[;\t]/g, ",").split(",");
      if (parts.length >= 2) {
        const x = parseFloat(parts[0].trim());
        const y = parseFloat(parts.trim());
        if (!isNaN(x) && !isNaN(y)) pts.push({ x, y });
      }
    }

    if (pts.length < 2) return { error: "Ingresa al menos 2 puntos válidos (x, y)." };

    pts.sort((a, b) => a.x - b.x);
    const n = pts.length - 1;
    const h0 = pts.x - pts[0].x;
    const isConstH = pts.every((p, i) => i === 0 || Math.abs(p.x - pts[i - 1].x - h0) < 1e-4);

    let totalI = 0;
    const segments = [];
    const tableRows = [];

    if (isConstH) {
      const h = h0;
      let sIdx = 0;
      let rem = n;

      const s13Count = rem % 2 !== 0 && rem >= 3 ? rem - 3 : (rem % 2 === 0 ? rem : 0);

      if (s13Count > 0) {
        let sum = 0;
        for (let i = 0; i <= s13Count; i++) {
          const idx = sIdx + i;
          const w = i === 0 || i === s13Count ? 1 : i % 2 !== 0 ? 4 : 2;
          sum += w * pts[idx].y;
          tableRows.push({ i: idx, xi: pts[idx].x, fxi: pts[idx].y, w: `${w} (1/3)`, val: (h / 3) * w * pts[idx].y });
        }
        const I13 = (h / 3) * sum;
        totalI += I13;
        segments.push({ rule: `Simpson 1/3 (${s13Count} int)`, range: `[${pts[sIdx].x.toFixed(2)}, ${pts[sIdx + s13Count].x.toFixed(2)}]`, subtotal: I13, color: "#198754" });
        sIdx += s13Count;
        rem -= s13Count;
      }

      if (rem === 3) {
        const sum38 = pts[sIdx].y + 3 * pts[sIdx + 1].y + 3 * pts[sIdx + 2].y + pts[sIdx + 3].y;
        const I38 = ((3 * h) / 8) * sum38;
        totalI += I38;
        segments.push({ rule: "Simpson 3/8 (3 int)", range: `[${pts[sIdx].x.toFixed(2)}, ${pts[sIdx + 3].x.toFixed(2)}]`, subtotal: I38, color: "#fd7e14" });
       .forEach((w, j) => {
          if (sIdx > 0 && j === 0) return;
          const idx = sIdx + j;
          tableRows.push({ i: idx, xi: pts[idx].x, fxi: pts[idx].y, w: `${w} (3/8)`, val: ((3 * h) / 8) * w * pts[idx].y });
        });
      } else if (rem === 1) {
        const ITrap = (h / 2) * (pts[0].y + pts.y);
        totalI += ITrap;
        segments.push({ rule: "Trapecio Simple", range: `[${pts[0].x.toFixed(2)}, ${pts.x.toFixed(2)}]`, subtotal: ITrap, color: "#0d6efd" });
        tableRows.push(
          { i: 0, xi: pts[0].x, fxi: pts[0].y, w: "1 (Trap)", val: (h / 2) * pts[0].y },
          { i: 1, xi: pts.x, fxi: pts.y, w: "1 (Trap)", val: (h / 2) * pts.y }
        );
      }
    } else {
      for (let i = 0; i < n; i++) {
        const segH = pts[i + 1].x - pts[i].x;
        const segI = (segH / 2) * (pts[i].y + pts[i + 1].y);
        totalI += segI;
        segments.push({ rule: `Trapecio (h=${segH.toFixed(2)})`, range: `[${pts[i].x.toFixed(2)}, ${pts[i + 1].x.toFixed(2)}]`, subtotal: segI, color: "#6c757d" });
      }
      pts.forEach((p, idx) => {
        tableRows.push({ i: idx, xi: p.x, fxi: p.y, w: idx === 0 || idx === n ? "1" : "2", val: p.y });
      });
    }

    return { pts, isConstH, intervals: n, totalIntegral: totalI, segments, tableRows, h: isConstH ? h0 : null };
  }, [pointsText]);

  return (
    <div>
      <div className="mb-2">
        <span className="small text-secondary fw-semibold me-2">Cargar datos de ejemplo:</span>
        <div className="btn-group btn-group-sm flex-wrap">
          {PRESETS_COMBINADA.map((p, idx) => (
            <button key={idx} className="btn btn-outline-secondary" onClick={() => setPointsText(p.data)}>
              {p.name}
            </button>
          ))}
        </div>
      </div>

      <div className="row g-3 mb-3 bg-white p-3 border rounded shadow-sm">
        <div className="col-12 col-md-5">
          <label className="form-label small fw-bold">Puntos tabulados (x, y)</label>
          <textarea className="form-control form-control-sm font-monospace" rows="6" value={pointsText} onChange={(e) => setPointsText(e.target.value)} />
          <small className="text-muted">Un punto por renglón separado por coma (ej. <code>0.2, 0.1987</code>).</small>
        </div>

        <div className="col-12 col-md-7">
          {calc.error ? (
            <div className="alert alert-danger py-2 small">{calc.error}</div>
          ) : (
            <div>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="badge bg-secondary">{calc.pts.length} puntos ({calc.intervals} intervalos)</span>
                <span className={`badge ${calc.isConstH ? "bg-success" : "bg-warning text-dark"}`}>
                  {calc.isConstH ? `Paso constante (h = ${calc.h.toFixed(4)})` : "Paso variable"}
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
                    {calc.segments.map((seg, idx) => (
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

      {!calc.error && (
        <>
          <PlotSVG a={calc.pts[0].x} b={calc.pts[calc.pts.length - 1].x} points={calc.pts} themeColor="#6f42c1" />
          <div className="text-end mb-2">
            <button className="btn btn-sm btn-outline-dark" onClick={() => setShowTable(!showTable)}>
              {showTable ? "Ocultar tabla de nodos" : "Mostrar tabla de nodos"}
            </button>
          </div>
          {showTable && <NodeTable points={calc.tableRows} sumLabel="Integral Total =" />}
        </>
      )}
    </div>
  );
};

// ==========================================
// 6. VISTA PRINCIPAL (MENU DE TARJETAS)
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
      description: "Aproxima el área bajo la curva conectando nodos adyacentes mediante rectas secantes (polinomios de 1.ᵉʳ grado).",
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
      description: "Evalúa conjuntos de datos tabulados combinando Simpson 1/3, Simpson 3/8 o Trapecios según el espaciado y cantidad de puntos.",
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

          {activeMethod === "trapecio" && <ContinuousMethodSimulator config={CONFIG_TRAPECIO} />}
          {activeMethod === "simpson13" && <ContinuousMethodSimulator config={CONFIG_SIMPSON13} />}
          {activeMethod === "simpson38" && <ContinuousMethodSimulator config={CONFIG_SIMPSON38} />}
          {activeMethod === "combinada" && <CombinadaSimulator />}
        </div>
      )}
    </div>
  );
};

export default SimuladorTab;