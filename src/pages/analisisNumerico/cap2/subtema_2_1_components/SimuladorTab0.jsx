import React, { useState, useEffect, useRef } from 'react';
import Plot from 'react-plotly.js';
import { evaluate } from 'mathjs';

const SimuladorTab = () => {
  // Parámetros de entrada
  const [funcionStr, setFuncionStr] = useState('x^3 - 4*x - 9');
  const [a, setA] = useState(2);
  const [b, setB] = useState(3);
  const [tol, setTol] = useState(0.0001);
  const [maxIter, setMaxIter] = useState(20);

  // Estados para el control Paso a Paso
  const [historialIteraciones, setHistorialIteraciones] = useState([]);
  const [pasoActual, setPasoActual] = useState(0);
  const [reproduciendo, setReproduciendo] = useState(false);
  const [errorMensaje, setErrorMensaje] = useState('');
  const timerRef = useRef(null);

  const f = (xVal) => evaluate(funcionStr, { x: xVal });

  // Precalcula todas las iteraciones
  const calcularMetodo = () => {
    setErrorMensaje('');
    detenerAnimacion();
    
    try {
      let fa = f(a);
      let fb = f(b);

      if (fa * fb >= 0) {
        setErrorMensaje('Teorema de Bolzano no cumplido: f(a) y f(b) deben tener el mismo signo opuesto.');
        setHistorialIteraciones([]);
        setPasoActual(0);
        return;
      }

      let aCurr = parseFloat(a);
      let bCurr = parseFloat(b);
      let iter = 1;
      let error = Math.abs(bCurr - aCurr);
      const pasos = [];
      let cPrev = null;

      while (iter <= maxIter && error > tol) {
        let c = (aCurr + bCurr) / 2;
        let fc = f(c);

        if (cPrev !== null) {
          error = Math.abs((c - cPrev) / c) * 100;
        } else {
          error = Math.abs(bCurr - aCurr);
        }

        pasos.push({
          iter,
          a: aCurr,
          b: bCurr,
          c: c,
          fa: f(aCurr),
          fb: f(bCurr),
          fc: fc,
          error: error
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

      setHistorialIteraciones(pasos);
      setPasoActual(1); // Iniciar en la primera iteración

    } catch (err) {
      setErrorMensaje('Sintaxis de función no válida.');
    }
  };

  useEffect(() => {
    calcularMetodo();
  }, []);

  // Animación Automática (Play/Pause)
  useEffect(() => {
    if (reproduciendo) {
      timerRef.current = setInterval(() => {
        setPasoActual((prev) => {
          if (prev < historialIteraciones.length) {
            return prev + 1;
          } else {
            setReproduciendo(false);
            return prev;
          }
        });
      }, 1200); // Avanza cada 1.2 segundos
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [reproduciendo, historialIteraciones]);

  const detenerAnimacion = () => {
    setReproduciendo(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  // Datos para la gráfica actual según el paso seleccionado
  const generarDatosGrafica = () => {
    const minX = Math.min(a, b) - 1;
    const maxX = Math.max(a, b) + 1;
    const paso = (maxX - minX) / 100;
    const xVals = [];
    const yVals = [];

    for (let x = minX; x <= maxX; x += paso) {
      xVals.push(x);
      try { yVals.push(f(x)); } catch { yVals.push(null); }
    }

    const data = [
      {
        x: xVals,
        y: yVals,
        type: 'scatter',
        mode: 'lines',
        name: `f(x)`,
        line: { color: '#0d6efd', width: 2 }
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

    // Marcar el intervalo actual [a, b] y el punto c del paso visible
    if (historialIteraciones.length > 0 && pasoActual > 0) {
      const estadoPaso = historialIteraciones[pasoActual - 1];

      // Intervalo [a, b] actual
      data.push({
        x: [estadoPaso.a, estadoPaso.b],
        y: [0, 0],
        type: 'scatter',
        mode: 'lines+markers',
        name: `Intervalo [a, b]`,
        line: { color: '#ffc107', width: 4 },
        marker: { size: 8 }
      });

      // Punto medio c calculando en este paso
      data.push({
        x: [estadoPaso.c],
        y: [0],
        type: 'scatter',
        mode: 'markers',
        name: `Aproximación c_${pasoActual}`,
        marker: { color: '#dc3545', size: 12, symbol: 'diamond' }
      });
    }

    return data;
  };

  const pasoVisible = historialIteraciones.slice(0, pasoActual);
  const estadoActual = historialIteraciones[pasoActual - 1];

  return (
    <div className="p-3 border rounded bg-light">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h5 className="text-primary fw-bold mb-1">
            <i className="bi bi-play-circle me-2"></i>Simulador Paso a Paso - Bisección
          </h5>
          <p className="text-muted small mb-0">
            Avanza iteración por iteración para analizar el comportamiento numérico y gráfico del intervalo.
          </p>
        </div>
      </div>

      {/* Formulario de Entradas */}
      <div className="row g-2 mb-3 p-3 bg-white rounded border shadow-sm">
        <div className="col-md-4">
          <label className="form-label small fw-bold mb-1">Función $f(x)$</label>
          <input
            type="text"
            className="form-control form-control-sm font-monospace"
            value={funcionStr}
            onChange={(e) => setFuncionStr(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <label className="form-label small fw-bold mb-1">Límite $a$</label>
          <input
            type="number"
            className="form-control form-control-sm"
            value={a}
            onChange={(e) => setA(parseFloat(e.target.value))}
          />
        </div>
        <div className="col-md-2">
          <label className="form-label small fw-bold mb-1">Límite $b$</label>
          <input
            type="number"
            className="form-control form-control-sm"
            value={b}
            onChange={(e) => setB(parseFloat(e.target.value))}
          />
        </div>
        <div className="col-md-2">
          <label className="form-label small fw-bold mb-1">Tolerancia</label>
          <input
            type="number"
            className="form-control form-control-sm"
            value={tol}
            onChange={(e) => setTol(parseFloat(e.target.value))}
          />
        </div>
        <div className="col-md-2 d-flex align-items-end">
          <button className="btn btn-primary btn-sm w-100 fw-bold" onClick={calcularMetodo}>
            <i className="bi bi-arrow-clockwise me-1"></i> Reiniciar
          </button>
        </div>
      </div>

      {errorMensaje && <div className="alert alert-danger py-2 small">{errorMensaje}</div>}

      {/* Controles del Reproductor Paso a Paso */}
      {historialIteraciones.length > 0 && (
        <div className="card mb-3 border-primary shadow-sm">
          <div className="card-body p-2 d-flex align-items-center justify-content-between bg-white rounded">
            <div className="d-flex align-items-center gap-2">
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => { detenerAnimacion(); setPasoActual(1); }}
                disabled={pasoActual <= 1}
              >
                <i className="bi bi-skip-backward-fill"></i>
              </button>

              <button
                className="btn btn-outline-primary btn-sm"
                onClick={() => { detenerAnimacion(); setPasoActual((p) => Math.max(1, p - 1)); }}
                disabled={pasoActual <= 1}
              >
                <i className="bi bi-caret-left-fill"></i> Anterior
              </button>

              <button
                className={`btn btn-sm ${reproduciendo ? 'btn-warning' : 'btn-success'} fw-bold px-3`}
                onClick={() => setReproduciendo(!reproduciendo)}
              >
                <i className={`bi bi-${reproduciendo ? 'pause-fill' : 'play-fill'} me-1`}></i>
                {reproduciendo ? 'Pausar' : 'Animar'}
              </button>

              <button
                className="btn btn-outline-primary btn-sm"
                onClick={() => { detenerAnimacion(); setPasoActual((p) => Math.min(historialIteraciones.length, p + 1)); }}
                disabled={pasoActual >= historialIteraciones.length}
              >
                Siguiente <i className="bi bi-caret-right-fill"></i>
              </button>

              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => { detenerAnimacion(); setPasoActual(historialIteraciones.length); }}
                disabled={pasoActual >= historialIteraciones.length}
              >
                <i className="bi bi-skip-forward-fill"></i>
              </button>
            </div>

            <span className="badge bg-primary fs-6">
              Paso {pasoActual} de {historialIteraciones.length}
            </span>
          </div>
        </div>
      )}

      {/* Gráfica y Tabla Sincronizadas */}
      <div className="row g-3">
        <div className="col-lg-6">
          <div className="card shadow-sm border h-100">
            <div className="card-header bg-dark text-white py-1 px-3 small fw-bold">
              <i className="bi bi-graph-up me-2 text-warning"></i>Visualización del Intervalo
            </div>
            <div className="card-body p-1" style={{ minHeight: '320px' }}>
              <Plot
                data={generarDatosGrafica()}
                layout={{
                  autosize: true,
                  margin: { l: 35, r: 15, t: 20, b: 35 },
                  xaxis: { title: 'x' },
                  yaxis: { title: 'f(x)' },
                  legend: { orientation: 'h', y: -0.2 }
                }}
                useResizeHandler={true}
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card shadow-sm border h-100">
            <div className="card-header bg-dark text-white py-1 px-3 small fw-bold d-flex justify-content-between">
              <span><i className="bi bi-table me-2 text-info"></i>Tabla Progresiva</span>
              {estadoActual && (
                <span className="badge bg-success">
                  c_{pasoActual} = {estadoActual.c.toFixed(6)}
                </span>
              )}
            </div>
            <div className="card-body p-0 table-responsive" style={{ maxHeight: '320px' }}>
              <table className="table table-sm table-striped table-hover align-middle mb-0 font-monospace" style={{ fontSize: '0.8rem' }}>
                <thead className="table-secondary sticky-top">
                  <tr>
                    <th className="ps-2">i</th>
                    <th>a</th>
                    <th>b</th>
                    <th>c (Punto medio)</th>
                    <th>f(c)</th>
                    <th>Error %</th>
                  </tr>
                </thead>
                <tbody>
                  {pasoVisible.map((row) => (
                    <tr key={row.iter} className={row.iter === pasoActual ? 'table-warning fw-bold' : ''}>
                      <td className="ps-2">{row.iter}</td>
                      <td>{row.a.toFixed(5)}</td>
                      <td>{row.b.toFixed(5)}</td>
                      <td className="text-primary">{row.c.toFixed(6)}</td>
                      <td>{row.fc.toFixed(5)}</td>
                      <td className="text-danger">{row.error.toFixed(4)}%</td>
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