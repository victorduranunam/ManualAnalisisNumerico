import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import { evaluate } from 'mathjs';

const SimuladorTab = () => {
  // Parámetros de entrada
  const [funcionStr, setFuncionStr] = useState('x^3 - 4*x - 9');
  const [a, setA] = useState(2);
  const [b, setB] = useState(3);
  const [tol, setTol] = useState(0.0001);
  const [maxIter, setMaxIter] = useState(20);

  // Resultados
  const [filasTabla, setFilasTabla] = useState([]);
  const [raizEncontrada, setRaizEncontrada] = useState(null);
  const [errorMensaje, setErrorMensaje] = useState('');

  // Evaluación matemática de f(x)
  const f = (xVal) => {
    return evaluate(funcionStr, { x: xVal });
  };

  const calcularBiseccion = () => {
    setErrorMensaje('');
    setFilasTabla([]);
    setRaizEncontrada(null);

    try {
      let fa = f(a);
      let fb = f(b);

      if (fa * fb >= 0) {
        setErrorMensaje('Teorema de Bolzano no cumplido: f(a) y f(b) deben tener signos opuestos.');
        return;
      }

      let aCurr = parseFloat(a);
      let bCurr = parseFloat(b);
      let iter = 1;
      let error = Math.abs(bCurr - aCurr);
      const tabla = [];
      let cPrev = null;

      while (iter <= maxIter && error > tol) {
        let c = (aCurr + bCurr) / 2;
        let fc = f(c);

        if (cPrev !== null) {
          error = Math.abs((c - cPrev) / c) * 100;
        } else {
          error = Math.abs(bCurr - aCurr);
        }

        tabla.push({
          iter,
          a: aCurr.toFixed(6),
          b: bCurr.toFixed(6),
          c: c.toFixed(6),
          fa: f(aCurr).toFixed(6),
          fb: f(bCurr).toFixed(6),
          fc: fc.toFixed(6),
          error: error.toFixed(6)
        });

        if (Math.abs(fc) < 1e-12) break;

        if (f(aCurr) * fc < 0) {
          bCurr = c;
        } else {
          aCurr = c;
        }

        cPrev = c;
        iter++;
      }

      setFilasTabla(tabla);
      setRaizEncontrada(tabla[tabla.length - 1].c);

    } catch (err) {
      setErrorMensaje('Sintaxis de la función no válida. Usa sintaxis estándar (ej: x^3 - 4*x - 9).');
    }
  };

  useEffect(() => {
    calcularBiseccion();
  }, []);

  const generarDatosGrafica = () => {
    const xVals = [];
    const yVals = [];
    const minX = Math.min(a, b) - 2;
    const maxX = Math.max(a, b) + 2;
    const paso = (maxX - minX) / 100;

    for (let x = minX; x <= maxX; x += paso) {
      xVals.push(x);
      try {
        yVals.push(f(x));
      } catch {
        yVals.push(null);
      }
    }

    const data = [
      {
        x: xVals,
        y: yVals,
        type: 'scatter',
        mode: 'lines',
        name: `f(x) = ${funcionStr}`,
        line: { color: '#0d6efd', width: 2.5 }
      },
      {
        x: [minX, maxX],
        y: [0, 0],
        type: 'scatter',
        mode: 'lines',
        name: 'Eje X',
        line: { color: '#6c757d', dash: 'dash' }
      }
    ];

    if (raizEncontrada !== null) {
      data.push({
        x: [parseFloat(raizEncontrada)],
        y: [0],
        type: 'scatter',
        mode: 'markers',
        name: `Raíz ≈ ${raizEncontrada}`,
        marker: { color: '#dc3545', size: 10, symbol: 'diamond' }
      });
    }

    return data;
  };

  return (
    <div className="p-3 border rounded bg-light">
      {/* Encabezado Principal */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h5 className="text-primary fw-bold mb-1">
            <i className="bi bi-calculator me-2"></i>Simulador del Método de Bisección
          </h5>
          <p className="text-muted small mb-0">
            Ingresa la función $f(x)$ y los intervalos para calcular numéricamente la raíz con su gráfica y tabla de iteraciones.
          </p>
        </div>
      </div>

      {/* Formulario de Parámetros */}
      <div className="row g-2 mb-3 p-3 bg-white rounded border shadow-sm">
        <div className="col-md-4">
          <label className="form-label small fw-bold mb-1">Función $f(x)$</label>
          <input
            type="text"
            className="form-control form-control-sm font-monospace"
            value={funcionStr}
            onChange={(e) => setFuncionStr(e.target.value)}
            placeholder="x^3 - 4*x - 9"
          />
        </div>

        <div className="col-md-2">
          <label className="form-label small fw-bold mb-1">Límite $a$</label>
          <input
            type="number"
            step="any"
            className="form-control form-control-sm"
            value={a}
            onChange={(e) => setA(parseFloat(e.target.value))}
          />
        </div>

        <div className="col-md-2">
          <label className="form-label small fw-bold mb-1">Límite $b$</label>
          <input
            type="number"
            step="any"
            className="form-control form-control-sm"
            value={b}
            onChange={(e) => setB(parseFloat(e.target.value))}
          />
        </div>

        <div className="col-md-2">
          <label className="form-label small fw-bold mb-1">Tolerancia</label>
          <input
            type="number"
            step="any"
            className="form-control form-control-sm"
            value={tol}
            onChange={(e) => setTol(parseFloat(e.target.value))}
          />
        </div>

        <div className="col-md-2 d-flex align-items-end">
          <button className="btn btn-success btn-sm w-100 fw-bold" onClick={calcularBiseccion}>
            <i className="bi bi-play-fill me-1"></i> Calcular
          </button>
        </div>
      </div>

      {/* Mensaje de Error en sintaxis o intervalo */}
      {errorMensaje && (
        <div className="alert alert-danger py-2 small" role="alert">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>{errorMensaje}
        </div>
      )}

      {/* Panel Inferior: Gráfica + Tabla de Iteraciones */}
      <div className="row g-3">
        {/* Gráfica Estilo GeoGebra */}
        <div className="col-lg-6">
          <div className="card shadow-sm border h-100">
            <div className="card-header bg-dark text-white py-1 px-3 small fw-bold">
              <i className="bi bi-graph-up me-2 text-warning"></i>Representación Gráfica
            </div>
            <div className="card-body p-1" style={{ minHeight: '340px' }}>
              <Plot
                data={generarDatosGrafica()}
                layout={{
                  autosize: true,
                  margin: { l: 35, r: 15, t: 20, b: 35 },
                  xaxis: { title: 'x', zeroline: true },
                  yaxis: { title: 'f(x)', zeroline: true },
                  legend: { orientation: 'h', y: -0.2 }
                }}
                useResizeHandler={true}
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          </div>
        </div>

        {/* Tabla Estilo Excel */}
        <div className="col-lg-6">
          <div className="card shadow-sm border h-100">
            <div className="card-header bg-dark text-white py-1 px-3 small fw-bold d-flex justify-content-between align-items-center">
              <span><i className="bi bi-table me-2 text-info"></i>Tabla de Iteraciones</span>
              {raizEncontrada && (
                <span className="badge bg-success">
                  Raíz ≈ {raizEncontrada}
                </span>
              )}
            </div>
            <div className="card-body p-0 table-responsive" style={{ maxHeight: '340px' }}>
              <table className="table table-sm table-striped table-hover align-middle mb-0 font-monospace" style={{ fontSize: '0.8rem' }}>
                <thead className="table-secondary sticky-top">
                  <tr>
                    <th className="ps-2">i</th>
                    <th>a</th>
                    <th>b</th>
                    <th>c</th>
                    <th>f(c)</th>
                    <th>Error %</th>
                  </tr>
                </thead>
                <tbody>
                  {filasTabla.map((row) => (
                    <tr key={row.iter}>
                      <td className="ps-2 fw-bold">{row.iter}</td>
                      <td>{row.a}</td>
                      <td>{row.b}</td>
                      <td className="fw-bold text-primary">{row.c}</td>
                      <td>{row.fc}</td>
                      <td className="text-danger">{row.error}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimuladorTab;