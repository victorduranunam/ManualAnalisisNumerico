import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import { evaluate } from 'mathjs';

const SimuladorTab = () => {
  // Configuración de las funciones f(x) y g(x)
  const [fStr, setFStr] = useState('exp(x)');
  const [gStr, setGStr] = useState('1/x');
  const [tolerancia, setTolerancia] = useState(0.01);

  // Entrada de datos del alumno
  const [xEntrada, setXEntrada] = useState('');

  // Historial guardado
  const [historial, setHistorial] = useState([]);

  // Mensaje de error
  const [errorMensaje, setErrorMensaje] = useState('');

  // Evaluación de funciones
  const evalF = (xVal) => evaluate(fStr, { x: xVal });
  const evalG = (xVal) => evaluate(gStr, { x: xVal });

  // Agregar y guardar un nuevo intento en el historial
  const agregarPaso = (e) => {
    e?.preventDefault();
    setErrorMensaje('');

    if (xEntrada === '' || isNaN(Number(xEntrada))) {
      setErrorMensaje('Por favor, ingresa un número válido para x.');
      return;
    }

    const xVal = parseFloat(xEntrada);

    try {
      const yF = evalF(xVal);
      const yG = evalG(xVal);

      if (!isFinite(yF) || !isFinite(yG)) {
        setErrorMensaje('Una de las funciones no está definida en este punto (posible división entre cero o fuera del dominio).');
        return;
      }

      // Cálculo del error absoluto |f(x) - g(x)|
      const errorAbsoluto = Math.abs(yF - yG);
      const cumpleTolerancia = errorAbsoluto <= tolerancia;

      const nuevoRegistro = {
        paso: historial.length + 1,
        x: xVal,
        yF,
        yG,
        errorAbsoluto,
        cumpleTolerancia
      };

      setHistorial([...historial, nuevoRegistro]);
      setXEntrada('');

    } catch (err) {
      setErrorMensaje('Error de sintaxis en la expresión de alguna de las funciones.');
    }
  };

  // Reiniciar todos los datos
  const reiniciarDatos = () => {
    setHistorial([]);
    setXEntrada('');
    setErrorMensaje('');
  };

  // Generación de datos para Plotly
  const generarDatosGrafica = () => {
    const xProbados = historial.map((h) => h.x);
    let minX = xProbados.length > 0 ? Math.min(...xProbados) - 1.5 : 0.1;
    let maxX = xProbados.length > 0 ? Math.max(...xProbados) + 1.5 : 3.0;

    if (minX <= 0 && gStr.includes('1/x')) minX = 0.05;
    if (minX >= maxX) maxX = minX + 2;

    const nPuntos = 120;
    const paso = (maxX - minX) / nPuntos;
    const xCurva = [];
    const yFCurva = [];
    const yGCurva = [];

    for (let x = minX; x <= maxX; x += paso) {
      xCurva.push(x);
      try {
        const vf = evalF(x);
        yFCurva.push(isFinite(vf) && Math.abs(vf) < 80 ? vf : null);
      } catch {
        yFCurva.push(null);
      }

      try {
        const vg = evalG(x);
        yGCurva.push(isFinite(vg) && Math.abs(vg) < 80 ? vg : null);
      } catch {
        yGCurva.push(null);
      }
    }

    const data = [
      // Curva f(x)
      {
        x: xCurva,
        y: yFCurva,
        type: 'scatter',
        mode: 'lines',
        name: `f(x) = ${fStr}`,
        line: { color: '#0d6efd', width: 2.5 }
      },
      // Curva g(x)
      {
        x: xCurva,
        y: yGCurva,
        type: 'scatter',
        mode: 'lines',
        name: `g(x) = ${gStr}`,
        line: { color: '#fd7e14', width: 2.5 }
      }
    ];

    if (historial.length > 0) {
      // Líneas de error vertical entre f(x) y g(x)
      historial.forEach((item) => {
        data.push({
          x: [item.x, item.x],
          y: [item.yF, item.yG],
          type: 'scatter',
          mode: 'lines',
          showlegend: false,
          line: {
            color: item.cumpleTolerancia ? '#198754' : '#adb5bd',
            width: item.cumpleTolerancia ? 2.5 : 1.5,
            dash: 'dot'
          },
          hoverinfo: 'none'
        });
      });

      // Puntos evaluados en f(x)
      data.push({
        x: historial.map((h) => h.x),
        y: historial.map((h) => h.yF),
        type: 'scatter',
        mode: 'markers+text',
        name: 'f(x)',
        text: historial.map((h) => `x_${h.paso}`),
        textposition: 'top left',
        marker: { color: '#0d6efd', size: 8, symbol: 'circle' }
      });

      // Puntos evaluados en g(x)
      data.push({
        x: historial.map((h) => h.x),
        y: historial.map((h) => h.yG),
        type: 'scatter',
        mode: 'markers+text',
        name: 'g(x)',
        text: historial.map((h) => `x_${h.paso}`),
        textposition: 'bottom right',
        marker: { color: '#fd7e14', size: 8, symbol: 'square' }
      });
    }

    return data;
  };

  return (
    <div className="p-3 border rounded bg-light">
      {/* Encabezado */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <span className="h5 text-primary fw-bold align-middle mb-0">
          <i className="bi bi-calculator me-2"></i>
          Simulador
        </span>
        <button className="btn btn-outline-danger btn-sm" onClick={reiniciarDatos}>
          <i className="bi bi-arrow-counterclockwise me-1"></i> Reiniciar Datos
        </button>
      </div>

      {/* Entradas */}
      <div className="row g-2 mb-3 p-3 bg-white rounded border shadow-sm">
        <div className="col-md-3">
          <label className="form-label small fw-bold mb-1 text-primary">f(x)</label>
          <input
            type="text"
            className="form-control form-control-sm font-monospace"
            value={fStr}
            onChange={(e) => {
              setFStr(e.target.value);
              reiniciarDatos();
            }}
            placeholder="exp(x)"
          />
        </div>
        <div className="col-md-3">
          <label className="form-label small fw-bold mb-1 text-warning">g(x)</label>
          <input
            type="text"
            className="form-control form-control-sm font-monospace"
            value={gStr}
            onChange={(e) => {
              setGStr(e.target.value);
              reiniciarDatos();
            }}
            placeholder="1/x"
          />
        </div>
        <div className="col-md-2">
          <label className="form-label small fw-bold mb-1">Tolerancia</label>
          <input
            type="number"
            step="0.001"
            className="form-control form-control-sm"
            value={tolerancia}
            onChange={(e) => setTolerancia(parseFloat(e.target.value) || 0.01)}
          />
        </div>
        <div className="col-md-2">
          <label className="form-label small fw-bold mb-1 text-success">
            x
          </label>
          <input
            type="number"
            step="any"
            className="form-control form-control-sm border-success fw-bold"
            placeholder="Ej. 0.5"
            value={xEntrada}
            onChange={(e) => setXEntrada(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && agregarPaso(e)}
          />
        </div>
        <div className="col-md-2 d-flex align-items-end">
          <button className="btn btn-success btn-sm w-100 fw-bold" onClick={agregarPaso}>
            <i className="bi bi-plus-lg me-1"></i> Guardar Paso
          </button>
        </div>
      </div>

      {errorMensaje && <div className="alert alert-danger py-2 small mb-3">{errorMensaje}</div>}

      {/* Gráfica y Tabla */}
      <div className="row g-3">
        {/* Gráfica */}
        <div className="col-lg-7">
          <div className="card shadow-sm border h-100">
            <div className="card-header bg-dark text-white py-1 px-3 small fw-bold d-flex justify-content-between align-items-center">
              <span><i className="bi bi-graph-up me-2 text-warning"></i>Gráfica</span>
              <span className="badge bg-secondary">{historial.length} puntos evaluados</span>
            </div>
            <div className="card-body p-1" style={{ minHeight: '340px' }}>
              <Plot
                data={generarDatosGrafica()}
                layout={{
                  autosize: true,
                  margin: { l: 45, r: 20, t: 20, b: 40 },
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

        {/* Tabla */}
        <div className="col-lg-5">
          <div className="card shadow-sm border h-100">
            <div className="card-header bg-dark text-white py-1 px-3 small fw-bold d-flex justify-content-between align-items-center">
              <span><i className="bi bi-table me-2 text-info"></i>Tabla</span>
            </div>
            <div className="card-body p-0 table-responsive" style={{ maxHeight: '340px' }}>
              {historial.length === 0 ? (
                <div className="p-4 text-center text-muted small">
                  <i className="bi bi-input-cursor-text display-6 d-block mb-2 text-secondary"></i>
                  Ingresa un valor para <strong>x</strong> y presiona <strong>Guardar Paso</strong>.
                </div>
              ) : (
                <table className="table table-sm table-striped table-hover align-middle mb-0 font-monospace text-center" style={{ fontSize: '0.82rem' }}>
                  <thead className="table-secondary sticky-top">
                    <tr>
                      <th className="ps-2">#</th>
                      <th>x</th>
                      <th>f(x)</th>
                      <th>g(x)</th>
                      <th>Error Absoluto</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historial.map((fila) => (
                      <tr
                        key={fila.paso}
                        className={fila.cumpleTolerancia ? 'table-success fw-bold' : ''}
                      >
                        <td className="ps-2">{fila.paso}</td>
                        <td className="text-primary fw-semibold">{fila.x.toFixed(4)}</td>
                        <td>{fila.yF.toFixed(4)}</td>
                        <td>{fila.yG.toFixed(4)}</td>
                        <td className={fila.cumpleTolerancia ? 'text-success fw-bold' : 'text-danger'}>
                          {fila.errorAbsoluto.toFixed(4)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimuladorTab;