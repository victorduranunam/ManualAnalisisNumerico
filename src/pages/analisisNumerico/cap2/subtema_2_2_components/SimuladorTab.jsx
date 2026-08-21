import React, { useState, useEffect, useRef } from 'react';
import Plot from 'react-plotly.js';
import { evaluate, derivative } from 'mathjs';

const SimuladorTab = () => {
  // Estado de vista: 'menu' (selección) o 'simulador'
  const [metodoSeleccionado, setMetodoSeleccionado] = useState(null); // 'newton' | 'secante'

  // Parámetros de entrada
  const [funcionStr, setFuncionStr] = useState('x^3 - 4*x - 9');
  const [x0, setX0] = useState(2);        // Para Newton-Raphson y Secante (x0)
  const [x1, setX1] = useState(3);        // Para Secante (x1)
  const [tol, setTol] = useState(0.0001);
  const [maxIter, setMaxIter] = useState(20);

  // Estados del Reproductor Paso a Paso
  const [historialIteraciones, setHistorialIteraciones] = useState([]);
  const [pasoActual, setPasoActual] = useState(0);
  const [reproduciendo, setReproduciendo] = useState(false);
  const [errorMensaje, setErrorMensaje] = useState('');
  const timerRef = useRef(null);

  const f = (xVal) => evaluate(funcionStr, { x: xVal });

  // Derivada analítica para Newton-Raphson
  const fPrime = (xVal) => {
    try {
      const exprDerivada = derivative(funcionStr, 'x');
      return exprDerivada.evaluate({ x: xVal });
    } catch {
      // Diferencia finita central si falla la derivada simbólica
      const h = 1e-6;
      return (f(xVal + h) - f(xVal - h)) / (2 * h);
    }
  };

  // Algoritmo Numérico para Métodos Abiertos
  const calcularMetodo = () => {
    setErrorMensaje('');
    detenerAnimacion();

    try {
      const pasos = [];
      let iter = 1;

      if (metodoSeleccionado === 'newton') {
        let xCurr = parseFloat(x0);
        let error = 100;

        while (iter <= maxIter && error > tol) {
          let fx = f(xCurr);
          let dfx = fPrime(xCurr);

          if (Math.abs(dfx) < 1e-12) {
            setErrorMensaje(`Derivada cercana a cero en x = ${xCurr}. El método diverge.`);
            break;
          }

          let xNext = xCurr - (fx / dfx);
          error = Math.abs((xNext - xCurr) / xNext) * 100;

          pasos.push({
            iter,
            xAnterior: xCurr,
            xActual: xNext,
            fx: fx,
            dfx: dfx,
            error: error
          });

          if (Math.abs(f(xNext)) < 1e-12) break;

          xCurr = xNext;
          iter++;
        }

      } else if (metodoSeleccionado === 'secante') {
        let xPrev = parseFloat(x0);
        let xCurr = parseFloat(x1);
        let error = 100;

        while (iter <= maxIter && error > tol) {
          let fxPrev = f(xPrev);
          let fxCurr = f(xCurr);

          if (Math.abs(fxCurr - fxPrev) < 1e-12) {
            setErrorMensaje('División por cero en la secante (f(x1) - f(x0) ≈ 0).');
            break;
          }

          let xNext = xCurr - (fxCurr * (xCurr - xPrev)) / (fxCurr - fxPrev);
          error = Math.abs((xNext - xCurr) / xNext) * 100;

          pasos.push({
            iter,
            x0: xPrev,
            x1: xCurr,
            xActual: xNext,
            fx: fxCurr,
            error: error
          });

          if (Math.abs(f(xNext)) < 1e-12) break;

          xPrev = xCurr;
          xCurr = xNext;
          iter++;
        }
      }

      setHistorialIteraciones(pasos);
      setPasoActual(pasos.length > 0 ? 1 : 0);

    } catch (err) {
      setErrorMensaje('Sintaxis de función no válida. Revisa la expresión matemática.');
    }
  };

  useEffect(() => {
    if (metodoSeleccionado) {
      calcularMetodo();
    }
  }, [metodoSeleccionado]);

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
      }, 1200);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [reproduciendo, historialIteraciones]);

  const detenerAnimacion = () => {
    setReproduciendo(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  // Generación de Datos para Plotly
  const generarDatosGrafica = () => {
    const centro = metodoSeleccionado === 'newton' ? parseFloat(x0) : (parseFloat(x0) + parseFloat(x1)) / 2;
    const minX = centro - 3;
    const maxX = centro + 3;
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

    if (historialIteraciones.length > 0 && pasoActual > 0) {
      const estado = historialIteraciones[pasoActual - 1];

      if (metodoSeleccionado === 'newton') {
        // Recta Tangente en Newton-Raphson: y = f(x_i) + f'(x_i)(x - x_i)
        const xA = estado.xAnterior;
        const yA = estado.fx;
        const m = estado.dfx;
        const xB = estado.xActual;

        data.push({
          x: [xA, xB],
          y: [yA, 0],
          type: 'scatter',
          mode: 'lines+markers',
          name: `Tangente (Paso ${pasoActual})`,
          line: { color: '#dc3545', width: 2, dash: 'dot' },
          marker: { size: 6 }
        });

      } else if (metodoSeleccionado === 'secante') {
        // Recta Secante pasando por (x0, f(x0)) y (x1, f(x1))
        const xA = estado.x0;
        const yA = f(xA);
        const xB = estado.x1;
        const yB = estado.fx;

        data.push({
          x: [xA, xB, estado.xActual],
          y: [yA, yB, 0],
          type: 'scatter',
          mode: 'lines+markers',
          name: `Secante (Paso ${pasoActual})`,
          line: { color: '#fd7e14', width: 2, dash: 'dot' },
          marker: { size: 6 }
        });
      }

      // Punto x_actual encontrado
      data.push({
        x: [estado.xActual],
        y: [0],
        type: 'scatter',
        mode: 'markers',
        name: `Aproximación x_${pasoActual}`,
        marker: { color: '#198754', size: 12, symbol: 'diamond' }
      });
    }

    return data;
  };

  const pasoVisible = historialIteraciones.slice(0, pasoActual);
  const estadoActual = historialIteraciones[pasoActual - 1];

  // ---------------------------------------------------------------------------
  // VISTA 1: MENÚ DE SELECCIÓN (METODOS ABIERTOS)
  // ---------------------------------------------------------------------------
  if (!metodoSeleccionado) {
    return (
      <div className="p-4 border rounded bg-light">
        <div className="text-center mb-4">
          <h4 className="text-primary fw-bold mb-2">
            <i className="bi bi-cpu-fill me-2"></i>Simulador de Métodos del Subcapítulo 2.2
          </h4>
          <p className="text-muted">
            Selecciona el método numérico abierto que deseas simular paso a paso:
          </p>
        </div>

        <div className="row g-4 justify-content-center">
          {/* Card 1: Newton-Raphson */}
          <div className="col-md-5">
            <div className="card h-100 shadow-sm border-0 border-top border-4 border-danger hover-shadow">
              <div className="card-body p-4 d-flex flex-column text-center">
                <div className="display-5 text-danger mb-3">
                  <i className="bi bi-lightning-charge"></i>
                </div>
                <h5 className="fw-bold text-dark mb-2">Método de Newton-Raphson</h5>
                <p className="text-muted small flex-grow-1">
                  Utiliza la primera derivada $f'(x)$ y rectas tangentes para lograr una convergencia cuadrática rápida hacia la raíz.
                </p>
                <button
                  className="btn btn-danger fw-semibold w-100 mt-3"
                  onClick={() => setMetodoSeleccionado('newton')}
                >
                  <i className="bi bi-play-circle me-2"></i>Iniciar Newton-Raphson
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Método de la Secante */}
          <div className="col-md-5">
            <div className="card h-100 shadow-sm border-0 border-top border-4 border-info hover-shadow">
              <div className="card-body p-4 d-flex flex-column text-center">
                <div className="display-5 text-info mb-3">
                  <i className="bi bi-graph-up"></i>
                </div>
                <h5 className="fw-bold text-dark mb-2">Método de la Secante</h5>
                <p className="text-muted small flex-grow-1">
                  Aproxima la derivada mediante diferencias finitas con dos puntos iniciales, evitando derivar analíticamente la función.
                </p>
                <button
                  className="btn btn-info fw-semibold text-dark w-100 mt-3"
                  onClick={() => setMetodoSeleccionado('secante')}
                >
                  <i className="bi bi-play-circle me-2"></i>Iniciar Secante
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // VISTA 2: SIMULADOR INTERACTIVO PASO A PASO
  // ---------------------------------------------------------------------------
  return (
    <div className="p-3 border rounded bg-light">
      {/* Encabezado con Botón de Regresar */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <button
            className="btn btn-outline-secondary btn-sm me-3"
            onClick={() => { detenerAnimacion(); setMetodoSeleccionado(null); }}
          >
            <i className="bi bi-arrow-left me-1"></i> Cambiar Método
          </button>
          <span className="h5 text-primary fw-bold align-middle mb-0">
            <i className="bi bi-calculator me-2"></i>
            Simulador: {metodoSeleccionado === 'newton' ? 'Método de Newton-Raphson' : 'Método de la Secante'}
          </span>
        </div>
      </div>

      {/* Formulario de Entradas Adaptable */}
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
          <label className="form-label small fw-bold mb-1">
            {metodoSeleccionado === 'newton' ? 'Valor Inicial x₀' : 'Punto x₀'}
          </label>
          <input
            type="number"
            step="any"
            className="form-control form-control-sm"
            value={x0}
            onChange={(e) => setX0(parseFloat(e.target.value))}
          />
        </div>

        {metodoSeleccionado === 'secante' && (
          <div className="col-md-2">
            <label className="form-label small fw-bold mb-1">Punto x₁</label>
            <input
              type="number"
              step="any"
              className="form-control form-control-sm"
              value={x1}
              onChange={(e) => setX1(parseFloat(e.target.value))}
            />
          </div>
        )}

        <div className={metodoSeleccionado === 'newton' ? 'col-md-2' : 'col-md-2'}>
          <label className="form-label small fw-bold mb-1">Tolerancia</label>
          <input
            type="number"
            step="any"
            className="form-control form-control-sm"
            value={tol}
            onChange={(e) => setTol(parseFloat(e.target.value))}
          />
        </div>

        <div className={metodoSeleccionado === 'newton' ? 'col-md-4 d-flex align-items-end' : 'col-md-2 d-flex align-items-end'}>
          <button className="btn btn-primary btn-sm w-100 fw-bold" onClick={calcularMetodo}>
            <i className="bi bi-arrow-clockwise me-1"></i> Recalcular
          </button>
        </div>
      </div>

      {errorMensaje && <div className="alert alert-danger py-2 small">{errorMensaje}</div>}

      {/* Botones de Control del Reproductor Paso a Paso */}
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
              <i className="bi bi-graph-up me-2 text-warning"></i>
              {metodoSeleccionado === 'newton' ? 'Rectas Tangentes' : 'Rectas Secantes'}
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
              <span><i className="bi bi-table me-2 text-info"></i>Tabla de Iteraciones</span>
              {estadoActual && (
                <span className="badge bg-success">
                  x_{pasoActual} = {estadoActual.xActual.toFixed(6)}
                </span>
              )}
            </div>
            <div className="card-body p-0 table-responsive" style={{ maxHeight: '320px' }}>
              <table className="table table-sm table-striped table-hover align-middle mb-0 font-monospace" style={{ fontSize: '0.8rem' }}>
                <thead className="table-secondary sticky-top">
                  <tr>
                    <th className="ps-2">i</th>
                    {metodoSeleccionado === 'newton' ? (
                      <>
                        <th>x_i</th>
                        <th>f(x_i)</th>
                        <th>f'(x_i)</th>
                        <th>x_{'{i+1}'}</th>
                      </>
                    ) : (
                      <>
                        <th>x_{'{i-1}'}</th>
                        <th>x_i</th>
                        <th>f(x_i)</th>
                        <th>x_{'{i+1}'}</th>
                      </>
                    )}
                    <th>Error %</th>
                  </tr>
                </thead>
                <tbody>
                  {pasoVisible.map((row) => (
                    <tr key={row.iter} className={row.iter === pasoActual ? 'table-warning fw-bold' : ''}>
                      <td className="ps-2">{row.iter}</td>
                      {metodoSeleccionado === 'newton' ? (
                        <>
                          <td>{row.xAnterior.toFixed(5)}</td>
                          <td>{row.fx.toFixed(5)}</td>
                          <td>{row.dfx.toFixed(5)}</td>
                          <td className="text-primary">{row.xActual.toFixed(6)}</td>
                        </>
                      ) : (
                        <>
                          <td>{row.x0.toFixed(5)}</td>
                          <td>{row.x1.toFixed(5)}</td>
                          <td>{row.fx.toFixed(5)}</td>
                          <td className="text-primary">{row.xActual.toFixed(6)}</td>
                        </>
                      )}
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