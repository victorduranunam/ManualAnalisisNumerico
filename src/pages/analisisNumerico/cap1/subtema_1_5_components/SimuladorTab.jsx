import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import { evaluate, derivative, parse } from 'mathjs';

const SimuladorTab = () => {
  // Parámetros de entrada para f(x)
  const [funcionStr, setFuncionStr] = useState('cos(x)');
  const [x0, setX0] = useState(0);                    // Punto de expansión x0
  const [grado, setGrado] = useState(4);              // Grado del polinomio (n)
  const [xEval, setXEval] = useState(0.5);            // Punto a evaluar

  // Resultados
  const [terminosTaylor, setTerminosTaylor] = useState([]);
  const [polinomioStr, setPolinomioStr] = useState('');
  const [valorAproximado, setValorAproximado] = useState(null);
  const [errorMensaje, setErrorMensaje] = useState('');

  // Algoritmo Analítico para Serie de Taylor con captura de errores estricta
  const calcularTaylor = () => {
    setErrorMensaje('');
    
    // Si el usuario deja la cadena vacía, limpia los campos sin romper
    if (!funcionStr.trim()) {
      setErrorMensaje('Ingresa una función válida para evaluar.');
      return;
    }

    try {
      const terminos = [];
      let valX0 = isNaN(parseFloat(x0)) ? 0 : parseFloat(x0);
      let nVal = isNaN(parseInt(grado)) ? 1 : parseInt(grado);
      let xEvalVal = isNaN(parseFloat(xEval)) ? 0 : parseFloat(xEval);

      // Validar sintaxis antes de derivar
      let exprActual = parse(funcionStr);
      let fact = 1;

      // Calcular derivadas analíticas
      for (let k = 0; k <= nVal; k++) {
        if (k > 1) fact *= k;
        if (k === 0) fact = 1;

        let valDerivada = exprActual.evaluate({ x: valX0 });
        
        if (typeof valDerivada !== 'number' || isNaN(valDerivada)) {
          throw new Error('La función o sus derivadas no producen un valor numérico real.');
        }

        let coef = valDerivada / fact;

        // Formato limpio del término
        let terminoFormateado = '';
        if (Math.abs(coef) > 1e-9) {
          const signo = coef >= 0 && k > 0 ? '+ ' : '';
          const coefStr = Math.abs(coef) === 1 && k > 0 ? '' : coef.toFixed(4);
          
          if (k === 0) {
            terminoFormateado = `${coef.toFixed(4)}`;
          } else if (k === 1) {
            terminoFormateado = `${signo}${coefStr}(x - ${valX0})`;
          } else {
            terminoFormateado = `${signo}${coefStr}(x - ${valX0})^${k}`;
          }
        }

        terminos.push({
          k: k,
          derivadaExpr: exprActual.toString(),
          valDerivada: valDerivada,
          factorial: fact,
          coeficiente: coef,
          terminoStr: terminoFormateado
        });

        // Obtener la siguiente derivada
        if (k < nVal) {
          exprActual = derivative(exprActual, 'x');
        }
      }

      setTerminosTaylor(terminos);

      const cadenaPolinomio = terminos
        .map(t => t.terminoStr)
        .filter(t => t !== '')
        .join(' ') || '0';

      setPolinomioStr(cadenaPolinomio);

      // Evaluar P_n(xEval)
      let suma = 0;
      terminos.forEach(t => {
        suma += t.coeficiente * Math.pow(xEvalVal - valX0, t.k);
      });
      setValorAproximado(suma);

    } catch (err) {
      // CAPTURA DE ERROR: Muestra un mensaje en lugar de dar pantallazo blanco
      setErrorMensaje('Sintaxis incompleta o no válida (ejemplo correcto: cos(x), sin(x), exp(x), x^3 - 2*x).');
    }
  };

  // Se ejecuta SOLO al montar el componente por primera vez
  useEffect(() => {
    calcularTaylor();
  }, []);

  // Generación segura de puntos de gráfica
  const generarDatosGrafica = () => {
    const valX0 = isNaN(parseFloat(x0)) ? 0 : parseFloat(x0);
    const minX = valX0 - 2.5;
    const maxX = valX0 + 2.5;
    const paso = (maxX - minX) / 100;
    
    const xVals = [];
    const yRealVals = [];
    const yTaylorVals = [];

    for (let x = minX; x <= maxX; x += paso) {
      xVals.push(x);
      
      try {
        const valReal = evaluate(funcionStr, { x });
        yRealVals.push(typeof valReal === 'number' && !isNaN(valReal) ? valReal : null);
      } catch {
        yRealVals.push(null);
      }

      let yP = 0;
      terminosTaylor.forEach(t => {
        yP += t.coeficiente * Math.pow(x - valX0, t.k);
      });
      yTaylorVals.push(yP);
    }

    const data = [
      {
        x: xVals,
        y: yRealVals,
        type: 'scatter',
        mode: 'lines',
        name: `f(x) Real`,
        line: { color: '#0d6efd', width: 2.5 }
      },
      {
        x: xVals,
        y: yTaylorVals,
        type: 'scatter',
        mode: 'lines',
        name: `P${grado}(x) Taylor`,
        line: { color: '#dc3545', width: 2, dash: 'dash' }
      }
    ];

    try {
      const valY0 = evaluate(funcionStr, { x: valX0 });
      if (typeof valY0 === 'number' && !isNaN(valY0)) {
        data.push({
          x: [valX0],
          y: [valY0],
          type: 'scatter',
          mode: 'markers',
          name: `Centro x₀ = ${valX0}`,
          marker: { color: '#ffc107', size: 10, symbol: 'circle' }
        });
      }
    } catch {}

    if (valorAproximado !== null && !isNaN(valorAproximado)) {
      data.push({
        x: [parseFloat(xEval)],
        y: [valorAproximado],
        type: 'scatter',
        mode: 'markers',
        name: `P${grado}(${xEval}) ≈ ${valorAproximado.toFixed(4)}`,
        marker: { color: '#198754', size: 10, symbol: 'diamond' }
      });
    }

    return data;
  };

  return (
    <div className="p-3 border rounded bg-light">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h5 className="text-primary fw-bold mb-1">
            <i className="bi bi-journal-plus me-2"></i>Simulador del Polinomio de Taylor
          </h5>
          <p className="text-muted small mb-0">
            Aproximación de funciones f(x) mediante el Polinomio de Taylor alrededor del punto x<sub>0</sub>.
          </p>
        </div>
      </div>

      {/* Formulario */}
      <div className="row g-2 mb-3 p-3 bg-white rounded border shadow-sm">
        <div className="col-md-3">
          <label className="form-label small fw-bold mb-1">Función f(x)</label>
          <input
            type="text"
            className="form-control form-control-sm font-monospace"
            value={funcionStr}
            onChange={(e) => setFuncionStr(e.target.value)}
            placeholder="cos(x)"
          />
        </div>

        <div className="col-md-2">
          <label className="form-label small fw-bold mb-1">Punto x<sub>0</sub></label>
          <input
            type="number"
            step="any"
            className="form-control form-control-sm"
            value={x0}
            onChange={(e) => setX0(e.target.value)}
          />
        </div>

        <div className="col-md-2">
          <label className="form-label small fw-bold mb-1">Grado (n)</label>
          <input
            type="number"
            min="1"
            max="8"
            className="form-control form-control-sm"
            value={grado}
            onChange={(e) => setGrado(e.target.value)}
          />
        </div>

        <div className="col-md-2">
          <label className="form-label small fw-bold mb-1">Evaluar en x</label>
          <input
            type="number"
            step="any"
            className="form-control form-control-sm"
            value={xEval}
            onChange={(e) => setXEval(e.target.value)}
          />
        </div>

        <div className="col-md-3 d-flex align-items-end">
          <button className="btn btn-primary btn-sm w-100 fw-bold" onClick={calcularTaylor}>
            <i className="bi bi-calculator me-1"></i> Generar Polinomio
          </button>
        </div>
      </div>

      {/* Alerta de Error Segura */}
      {errorMensaje && (
        <div className="alert alert-warning py-2 small fw-semibold" role="alert">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>{errorMensaje}
        </div>
      )}

      {/* Polinomio Resultado */}
      {!errorMensaje && polinomioStr && (
        <div className="card mb-3 border-primary shadow-sm">
          <div className="card-header bg-primary text-white py-1 px-3 small fw-bold">
            <i className="bi bi-code-square me-2"></i>Polinomio Obtenido P<sub>{grado}</sub>(x)
          </div>
          <div className="card-body bg-white p-3 font-monospace text-dark overflow-auto" style={{ fontSize: '0.95rem' }}>
            <strong>P<sub>{grado}</sub>(x) = </strong> {polinomioStr}
          </div>
        </div>
      )}

      {/* Gráfica y Tabla */}
      <div className="row g-3">
        <div className="col-lg-6">
          <div className="card shadow-sm border h-100">
            <div className="card-header bg-dark text-white py-1 px-3 small fw-bold">
              <i className="bi bi-graph-up me-2 text-warning"></i>Gráfica Comparativa
            </div>
            <div className="card-body p-1" style={{ minHeight: '320px' }}>
              <Plot
                data={generarDatosGrafica()}
                layout={{
                  autosize: true,
                  margin: { l: 35, r: 15, t: 20, b: 35 },
                  xaxis: { title: 'x' },
                  yaxis: { title: 'y' },
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
            <div className="card-header bg-dark text-white py-1 px-3 small fw-bold d-flex justify-content-between align-items-center">
              <span><i className="bi bi-table me-2 text-info"></i>Derivadas y Coeficientes</span>
              {!errorMensaje && valorAproximado !== null && !isNaN(valorAproximado) && (
                <span className="badge bg-success">
                  P<sub>{grado}</sub>({xEval}) ≈ {valorAproximado.toFixed(5)}
                </span>
              )}
            </div>
            <div className="card-body p-0 table-responsive" style={{ maxHeight: '320px' }}>
              <table className="table table-sm table-striped table-hover align-middle mb-0 font-monospace" style={{ fontSize: '0.8rem' }}>
                <thead className="table-secondary sticky-top">
                  <tr>
                    <th className="ps-2">k</th>
                    <th>f<sup>(k)</sup>(x)</th>
                    <th>f<sup>(k)</sup>(x<sub>0</sub>)</th>
                    <th>k!</th>
                    <th>Coeficiente</th>
                  </tr>
                </thead>
                <tbody>
                  {terminosTaylor.map((t) => (
                    <tr key={t.k}>
                      <td className="ps-2 fw-bold">{t.k}</td>
                      <td className="text-truncate" style={{ maxWidth: '120px' }}>{t.derivadaExpr}</td>
                      <td>{typeof t.valDerivada === 'number' ? t.valDerivada.toFixed(4) : '-'}</td>
                      <td>{t.factorial}</td>
                      <td className="text-primary fw-bold">{typeof t.coeficiente === 'number' ? t.coeficiente.toFixed(5) : '-'}</td>
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