import React, { useState, useMemo } from "react";

// Funciones para desglosar bits IEEE 754
const getIEEE754_32 = (num) => {
  const buf = new ArrayBuffer(4);
  const view = new DataView(buf);
  view.setFloat32(0, num);
  const u32 = view.getUint32(0);
  const bin = u32.toString(2).padStart(32, "0");
  const sign = bin[0];
  const exp = bin.slice(1, 9);
  const mant = bin.slice(9);
  const expVal = parseInt(exp, 2);
  const unbias = expVal - 127;
  const hex = "0x" + u32.toString(16).toUpperCase().padStart(8, "0");
  const storedVal = view.getFloat32(0);

  return { sign, exp, mant, expVal, unbias, hex, storedVal };
};

const getIEEE754_64 = (num) => {
  const buf = new ArrayBuffer(8);
  const view = new DataView(buf);
  view.setFloat64(0, num);
  const hi = view.getUint32(0);
  const lo = view.getUint32(4);
  const bin = hi.toString(2).padStart(32, "0") + lo.toString(2).padStart(32, "0");
  const sign = bin[0];
  const exp = bin.slice(1, 12);
  const mant = bin.slice(12);
  const expVal = parseInt(exp, 2);
  const unbias = expVal - 1023;
  const hex = "0x" + hi.toString(16).toUpperCase().padStart(8, "0") + lo.toString(16).toUpperCase().padStart(8, "0");
  const storedVal = view.getFloat64(0);

  return { sign, exp, mant, expVal, unbias, hex, storedVal };
};

const SimuladorTab = () => {
  // Estados de control
  const [inputValue, setInputValue] = useState("0.1");
  const [precisionMode, setPrecisionMode] = useState("64");
  const [cancelX, setCancelX] = useState("100000000");
  const [absorbBase, setAbsorbBase] = useState("1.0");
  const [absorbExp, setAbsorbExp] = useState("-16");
  const [epsResult, setEpsResult] = useState(null);

  // Desglose IEEE 754
  const ieeeData = useMemo(() => {
    const num = Number(inputValue);
    return precisionMode === "32" ? getIEEE754_32(num) : getIEEE754_64(num);
  }, [inputValue, precisionMode]);

  // Cancelación Catastrófica
  const cancelData = useMemo(() => {
    const x = Number(cancelX);
    if (isNaN(x) || x < 0) return null;
    const naive = Math.sqrt(x + 1) - Math.sqrt(x);
    const rationalized = 1 / (Math.sqrt(x + 1) + Math.sqrt(x));
    const errorRel = rationalized !== 0 ? Math.abs((naive - rationalized) / rationalized) * 100 : 0;
    return { naive, rationalized, errorRel };
  }, [cancelX]);

  // Fenómeno de Absorción
  const absorbData = useMemo(() => {
    const base = Number(absorbBase);
    const eps = Math.pow(10, Number(absorbExp));
    const sum = base + eps;
    const isAbsorbed = sum === base;
    return { base, eps, sum, isAbsorbed };
  }, [absorbBase, absorbExp]);

  // Cálculo de Épsilon de la Máquina
  const runEpsilonCalc = () => {
    let eps = 1.0;
    let iter = 0;
    while (1.0 + eps / 2.0 > 1.0) {
      eps /= 2.0;
      iter++;
    }
    setEpsResult({ eps, iter });
  };

  return (
    <div className="p-3 border rounded bg-light">
      <h5 className="text-primary fw-bold mb-2">SimuladorTab del subtema 1.2</h5>
      <p className="text-muted mb-4">
        Simulador interactivo para el análisis de representación de números en punto flotante (IEEE 754), cancelación catastrófica, absorción y épsilon de la máquina.
      </p>

      {/* 1. Desglose IEEE 754 */}
      <div className="card mb-3 shadow-sm">
        <div className="card-header bg-white d-flex justify-content-between align-items-center">
          <span className="fw-bold text-dark small">1. Inspector de Bits IEEE 754</span>
          <div className="btn-group btn-group-sm">
            <button
              className={`btn ${precisionMode === "32" ? "btn-primary" : "btn-outline-primary"}`}
              onClick={() => setPrecisionMode("32")}
            >
              Float32 (32 bits)
            </button>
            <button
              className={`btn ${precisionMode === "64" ? "btn-primary" : "btn-outline-primary"}`}
              onClick={() => setPrecisionMode("64")}
            >
              Float64 (64 bits)
            </button>
          </div>
        </div>
        <div className="card-body">
          <div className="row g-2 align-items-center mb-3">
            <div className="col-md-5">
              <label className="form-label small fw-bold text-secondary mb-1">Número decimal:</label>
              <input
                type="text"
                className="form-control form-control-sm font-monospace"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ej. 0.1, -12.375, 1e-40"
              />
            </div>
            <div className="col-md-7">
              <label className="form-label small fw-bold text-secondary mb-1">Ejemplos clave:</label>
              <div className="d-flex flex-wrap gap-1">
                {["0.1", "0.2", "0.3", "-12.375", "1e-40", "1e308", "0.0", "Infinity", "NaN"].map((val) => (
                  <button
                    key={val}
                    className="btn btn-sm btn-outline-secondary py-0"
                    onClick={() => setInputValue(val)}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-3 bg-dark rounded text-light mb-3">
            <div className="small text-muted mb-2">Bits en memoria ({precisionMode} bits):</div>
            <div className="d-flex flex-wrap font-monospace small" style={{ wordBreak: "break-all" }}>
              <span className="bg-danger text-white px-1 rounded me-1" title="Signo">
                {ieeeData.sign}
              </span>
              <span className="bg-warning text-dark px-1 rounded me-1" title="Exponente">
                {ieeeData.exp}
              </span>
              <span className="bg-success text-white px-1 rounded" title="Mantisa">
                {ieeeData.mant}
              </span>
            </div>
            <div className="d-flex gap-3 small mt-2">
              <span><span className="badge bg-danger">Signo (1 bit)</span>: {ieeeData.sign === "0" ? "+ (0)" : "- (1)"}</span>
              <span><span className="badge bg-warning text-dark">Exponente</span>: {ieeeData.expVal} (Real: 2<sup>{ieeeData.unbias}</sup>)</span>
              <span><span className="badge bg-success">Mantisa</span></span>
            </div>
          </div>

          <div className="row g-2 small">
            <div className="col-md-4">
              <div className="p-2 border rounded bg-white">
                <span className="text-muted">Hexadecimal:</span> <code className="fw-bold">{ieeeData.hex}</code>
              </div>
            </div>
            <div className="col-md-8">
              <div className="p-2 border rounded bg-white">
                <span className="text-muted">Valor almacenado real:</span>{" "}
                <code className="text-primary fw-bold">{String(ieeeData.storedVal)}</code>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Cancelación Catastrófica */}
      <div className="card mb-3 shadow-sm">
        <div className="card-header bg-white fw-bold text-dark small">
          2. Laboratorio de Cancelación Catastrófica
        </div>
        <div className="card-body">
          <p className="small text-muted mb-2">
            Compara la resta directa <code>f(x) = &radic;(x + 1) - &radic;x</code> frente a la forma racionalizada estable <code>1 / (&radic;(x + 1) + &radic;x)</code> al incrementar el valor de <em>x</em>.
          </p>
          <div className="row g-2 mb-3">
            <div className="col-md-6">
              <div className="input-group input-group-sm">
                <span className="input-group-text">x =</span>
                <input
                  type="number"
                  className="form-control font-monospace"
                  value={cancelX}
                  onChange={(e) => setCancelX(e.target.value)}
                />
                <button className="btn btn-outline-secondary" onClick={() => setCancelX("100000000")}>10<sup>8</sup></button>
                <button className="btn btn-outline-secondary" onClick={() => setCancelX("100000000000000")}>10<sup>14</sup></button>
                <button className="btn btn-outline-secondary" onClick={() => setCancelX("10000000000000000")}>10<sup>16</sup></button>
              </div>
            </div>
          </div>

          {cancelData && (
            <div className="table-responsive small">
              <table className="table table-bordered align-middle text-center bg-white mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Formulación</th>
                    <th>Resultado Numérico</th>
                    <th>Estado de Precisión</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={cancelData.errorRel > 1 ? "table-danger" : ""}>
                    <td className="text-danger fw-bold">Directa (&radic;(x+1) - &radic;x)</td>
                    <td className="font-monospace">{cancelData.naive.toExponential(10)}</td>
                    <td>{cancelData.naive === 0 ? "¡Cancelación Total (0.0)!" : `Error: ${cancelData.errorRel.toFixed(2)}%`}</td>
                  </tr>
                  <tr className="table-success">
                    <td className="text-success fw-bold">Racionalizada (1 / [&radic;(x+1)+&radic;x])</td>
                    <td className="font-monospace">{cancelData.rationalized.toExponential(10)}</td>
                    <td>Precisión preservada</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* 3. Fenómeno de Absorción */}
      <div className="card mb-3 shadow-sm">
        <div className="card-header bg-white fw-bold text-dark small">
          3. Fenómeno de Absorción (x + &epsilon; = x)
        </div>
        <div className="card-body">
          <div className="row g-3 align-items-center mb-3">
            <div className="col-md-4">
              <label className="form-label small fw-bold mb-1">Base (x):</label>
              <input
                type="text"
                className="form-control form-control-sm font-monospace"
                value={absorbBase}
                onChange={(e) => setAbsorbBase(e.target.value)}
              />
            </div>
            <div className="col-md-5">
              <label className="form-label small fw-bold mb-1">Perturbación &epsilon; = 10<sup>{absorbExp}</sup>:</label>
              <input
                type="range"
                className="form-range"
                min="-20"
                max="-1"
                step="1"
                value={absorbExp}
                onChange={(e) => setAbsorbExp(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <div className="small fw-bold">&epsilon; = {Math.pow(10, Number(absorbExp)).toExponential()}</div>
            </div>
          </div>

          <div className={`p-3 rounded border ${absorbData.isAbsorbed ? "bg-warning bg-opacity-10 border-warning" : "bg-success bg-opacity-10 border-success"}`}>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <strong>Resultado de (x + &epsilon;):</strong> <code className="fs-6 font-monospace">{absorbData.sum}</code>
              </div>
              <span className={`badge ${absorbData.isAbsorbed ? "bg-danger" : "bg-success"}`}>
                {absorbData.isAbsorbed ? "Absorbido (x + \u03B5 === x)" : "Diferenciable (x + \u03B5 > x)"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Épsilon de la Máquina */}
      <div className="card shadow-sm">
        <div className="card-header bg-white fw-bold text-dark small d-flex justify-content-between align-items-center">
          <span>4. Cálculo Algorítmico de &epsilon;<sub>mach</sub></span>
          <button className="btn btn-sm btn-primary" onClick={runEpsilonCalc}>
            Calcular en vivo
          </button>
        </div>
        <div className="card-body">
          <p className="small text-muted mb-2">
            Divide sucesivamente &epsilon; entre 2 mientras se cumpla <code>1.0 + &epsilon;/2 &gt; 1.0</code>.
          </p>
          {epsResult ? (
            <div className="alert alert-info mb-0 small">
              <div className="row text-center g-2">
                <div className="col-md-4">
                  <span className="text-muted">Iteraciones:</span>
                  <div className="fw-bold fs-6">{epsResult.iter}</div>
                </div>
                <div className="col-md-4">
                  <span className="text-muted">&epsilon;<sub>mach</sub> calculado:</span>
                  <div className="fw-bold font-monospace">{epsResult.eps.toExponential(16)}</div>
                </div>
                <div className="col-md-4">
                  <span className="text-muted">Teórico 2<sup>-52</sup>:</span>
                  <div className="fw-bold font-monospace">{(Math.pow(2, -52)).toExponential(16)}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-muted small text-center py-1">
              Presiona el botón para ejecutar el cálculo.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SimuladorTab;