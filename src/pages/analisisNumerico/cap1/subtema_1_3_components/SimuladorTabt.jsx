import React, { useState, useMemo } from "react";

// Función auxiliar de cálculo geométrico y errores
const calcularGeometria = (numLados, radioVal, tolVal) => {
  const L = Math.max(3, parseInt(numLados, 10) || 3);
  const r = parseFloat(radioVal) > 0 ? parseFloat(radioVal) : 1;
  const tol = parseFloat(tolVal) >= 0 ? parseFloat(tolVal) : 1.0;

  const areaCirculo = Math.PI * Math.pow(r, 2);
  const anguloRad = Math.PI / L;
  const anguloGrados = 180 / L;
  const base = 2 * r * Math.sin(anguloRad);
  const altura = r * Math.cos(anguloRad);
  const areaTriangulo = (base * altura) / 2;
  const areaPoligono = L * areaTriangulo;
  const errorAbsoluto = Math.abs(areaCirculo - areaPoligono);
  const erp = (errorAbsoluto / areaCirculo) * 100;

  return {
    id: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    lados: L,
    radio: r,
    tolerancia: tol,
    base,
    altura,
    anguloGrados,
    areaPoligono,
    areaCirculo,
    errorAbsoluto,
    erp,
    cumple: erp <= tol
  };
};

const SimuladorTab = () => {
  // Parámetros de entrada
  const [ladosInput, setLadosInput] = useState("5");
  const [radio, setRadio] = useState("1");
  const [tolerancia, setTolerancia] = useState("1.0");

  // Estado inicial con L = 3
  const calculoInicial = useMemo(() => calcularGeometria(3, "1", "1.0"), []);

  // Historial de cálculos y registro seleccionado actualmente
  const [historial, setHistorial] = useState([calculoInicial]);
  const [registroActual, setRegistroActual] = useState(calculoInicial);

  // Manejador para Calcular y Agregar
  const handleCalcularYAgregar = (e) => {
    if (e) e.preventDefault();

    const L = Math.max(3, parseInt(ladosInput, 10) || 3);
    const r = parseFloat(radio) > 0 ? parseFloat(radio) : 1;
    const tol = parseFloat(tolerancia) >= 0 ? parseFloat(tolerancia) : 1.0;

    const nuevoCalculo = calcularGeometria(L, r, tol);

    // Actualiza la vista actual y agrega al historial
    setRegistroActual(nuevoCalculo);
    setHistorial((prev) => [...prev, nuevoCalculo]);
  };

  // Reiniciar a valores por defecto
  const handleReiniciar = () => {
    const reinicio = calcularGeometria(3, "1", "1.0");
    setLadosInput("3");
    setRadio("1");
    setTolerancia("1.0");
    setRegistroActual(reinicio);
    setHistorial([reinicio]);
  };

  // Limpiar solo la tabla manteniendo el registro actual
  const handleLimpiarTabla = () => {
    setHistorial([registroActual]);
  };

  // Coordenadas SVG para el polígono activo
  const puntosSVG = useMemo(() => {
    const L = registroActual.lados;
    const cx = 110;
    const cy = 110;
    const radioSvg = 90;
    const pts = [];
    for (let i = 0; i < L; i++) {
      const ang = -Math.PI / 2 + (2 * Math.PI * i) / L;
      const x = cx + radioSvg * Math.cos(ang);
      const y = cy + radioSvg * Math.sin(ang);
      pts.push(`${x},${y}`);
    }
    return pts.join(" ");
  }, [registroActual.lados]);

  return (
    <div className="p-3 border rounded bg-light">
      <h5 className="text-primary fw-bold mb-2">Simulador: Polígonos Regulares Inscritos (Subtema 1.2)</h5>
      <p className="text-muted small mb-3">
        Ingresa el número de lados, el radio y la tolerancia deseada. Haz clic en <strong>Calcular y Agregar</strong> para evaluar el error y guardar la iteración en el historial.
      </p>

      {/* PANEL DE CONTROL */}
      <div className="card mb-3 shadow-sm border-primary">
        <div className="card-body bg-white">
          <form onSubmit={handleCalcularYAgregar}>
            <div className="row g-3 align-items-end">
              {/* Entrada de Lados */}
              <div className="col-md-3 col-sm-6 col-12">
                <label className="form-label small fw-bold text-primary mb-1">
                  Número de Lados (L &ge; 3):
                </label>
                <input
                  type="number"
                  min="3"
                  step="1"
                  className="form-control form-control-lg font-monospace fw-bold text-center border-primary"
                  value={ladosInput}
                  onChange={(e) => setLadosInput(e.target.value)}
                  placeholder="Ej. 5, 12, 50"
                  required
                />
              </div>

              {/* Radio */}
              <div className="col-md-2 col-sm-6 col-6">
                <label className="form-label small fw-bold text-secondary mb-1">Radio (r):</label>
                <input
                  type="number"
                  step="any"
                  min="0.0001"
                  className="form-control font-monospace"
                  value={radio}
                  onChange={(e) => setRadio(e.target.value)}
                  required
                />
              </div>

              {/* Tolerancia */}
              <div className="col-md-2 col-sm-6 col-6">
                <label className="form-label small fw-bold text-secondary mb-1">Tolerancia (%):</label>
                <div className="input-group">
                  <input
                    type="number"
                    step="any"
                    min="0"
                    className="form-control font-monospace"
                    value={tolerancia}
                    onChange={(e) => setTolerancia(e.target.value)}
                    required
                  />
                  <span className="input-group-text">%</span>
                </div>
              </div>

              {/* Botón Principal: Calcular y Agregar */}
              <div className="col-md-3 col-sm-6 col-12">
                <button type="submit" className="btn btn-primary fw-bold w-100 py-2 shadow-sm">
                  Calcular y Agregar
                </button>
              </div>

              {/* Botón de Reset */}
              <div className="col-md-2 col-12">
                <button
                  type="button"
                  className="btn btn-outline-danger w-100 py-2"
                  onClick={handleReiniciar}
                  title="Reiniciar a valores por defecto"
                >
                  Reiniciar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* ÁREA DE VISUALIZACIÓN Y PASO A PASO */}
      <div className="row g-3 mb-3">
        {/* Gráfico SVG */}
        <div className="col-md-4 col-12 text-center">
          <div className="card h-100 shadow-sm">
            <div className="card-header bg-white fw-bold small text-dark">
              Geometría Inscrita (L = {registroActual.lados} lados)
            </div>
            <div className="card-body d-flex flex-column justify-content-center align-items-center">
              <svg width="210" height="210" viewBox="0 0 220 220">
                <circle cx="110" cy="110" r="90" fill="#f8f9fa" stroke="#0d6efd" strokeWidth="2" strokeDasharray="4 2" />
                <polygon points={puntosSVG} fill="rgba(25, 135, 84, 0.25)" stroke="#198754" strokeWidth="2.5" />
                <line x1="110" y1="110" x2="110" y2="20" stroke="#dc3545" strokeWidth="1.5" strokeDasharray="2 2" />
                <circle cx="110" cy="110" r="3" fill="#dc3545" />
              </svg>
              <div className="small text-muted mt-2">
                <span className="badge bg-primary me-1">Círculo (r = {registroActual.radio})</span>
                <span className="badge bg-success">Polígono ({registroActual.lados} lados)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Solución Paso a Paso */}
        <div className="col-md-8 col-12">
          <div className="card h-100 shadow-sm">
            <div className="card-header bg-white fw-bold small text-dark d-flex justify-content-between align-items-center">
              <span>Desglose Analítico (L = {registroActual.lados} lados)</span>
              <span className={`badge ${registroActual.cumple ? "bg-success" : "bg-warning text-dark"}`}>
                {registroActual.cumple ? "\u2713 Cumple Tolerancia" : "Error > Tolerancia"}
              </span>
            </div>
            <div className="card-body small font-monospace">
              {/* Paso 1 */}
              <div className="mb-2 pb-2 border-bottom">
                <strong className="text-primary font-sans-serif">Paso 1: Área Real del Círculo (A<sub>C</sub>)</strong>
                <div className="text-secondary">
                  A<sub>C</sub> = &pi; &times; r<sup>2</sup> = &pi; &times; ({registroActual.radio})<sup>2</sup> = <strong>{registroActual.areaCirculo.toFixed(6)}</strong>
                </div>
              </div>

              {/* Paso 2 */}
              <div className="mb-2 pb-2 border-bottom">
                <strong className="text-primary font-sans-serif">Paso 2: Base del triángulo isósceles (b)</strong>
                <div className="text-secondary">
                  b = 2 &times; {registroActual.radio} &times; sen(&pi; / {registroActual.lados}) = <strong>{registroActual.base.toFixed(6)}</strong>
                </div>
              </div>

              {/* Paso 3 */}
              <div className="mb-2 pb-2 border-bottom">
                <strong className="text-primary font-sans-serif">Paso 3: Altura del triángulo (h)</strong>
                <div className="text-secondary">
                  h = {registroActual.radio} &times; cos(&pi; / {registroActual.lados}) = <strong>{registroActual.altura.toFixed(6)}</strong>
                </div>
              </div>

              {/* Paso 4 */}
              <div className="mb-2 pb-2 border-bottom">
                <strong className="text-primary font-sans-serif">Paso 4: Área del Polígono Inscrito (A<sub>P</sub>)</strong>
                <div className="text-secondary">
                  A<sub>P</sub> = {registroActual.lados} &times; (b &times; h) / 2 = <strong className="text-success fs-6">{registroActual.areaPoligono.toFixed(6)}</strong>
                </div>
              </div>

              {/* Paso 5 */}
              <div>
                <strong className="text-primary font-sans-serif">Paso 5: Error Relativo Porcentual (ERP)</strong>
                <div className="text-secondary">
                  ERP = |(A<sub>C</sub> - A<sub>P</sub>) / A<sub>C</sub>| &times; 100% = <strong className="text-danger fs-6">{registroActual.erp.toFixed(4)}%</strong>
                </div>
                <div className="mt-1 font-sans-serif">
                  {registroActual.cumple ? (
                    <span className="text-success fw-bold">
                      &bull; {registroActual.erp.toFixed(4)}% &le; {registroActual.tolerancia}% &rarr; Cumple con la tolerancia especificada.
                    </span>
                  ) : (
                    <span className="text-danger fw-bold">
                      &bull; {registroActual.erp.toFixed(4)}% &gt; {registroActual.tolerancia}% &rarr; Supera la tolerancia ({registroActual.tolerancia}%). Aumenta el número de lados.
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TABLA DE RESULTADOS HISTÓRICOS */}
      <div className="card shadow-sm">
        <div className="card-header bg-white fw-bold small text-dark d-flex justify-content-between align-items-center">
          <span>Historial de Experimentos ({historial.length} evaluados)</span>
          <div>
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary me-2"
              onClick={handleLimpiarTabla}
              title="Dejar únicamente el experimento actual"
            >
              Limpiar anteriores
            </button>
            <small className="text-muted font-sans-serif">Clic en cualquier fila para seleccionarla</small>
          </div>
        </div>
        <div className="table-responsive small">
          <table className="table table-bordered table-hover align-middle text-center mb-0">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Lados (L)</th>
                <th>Radio (r)</th>
                <th>Base (b)</th>
                <th>Altura (h)</th>
                <th>Área Polígono (A<sub>P</sub>)</th>
                <th>Área Círculo (A<sub>C</sub>)</th>
                <th>ERP (%)</th>
                <th>Estado (&le; {registroActual.tolerancia}%)</th>
              </tr>
            </thead>
            <tbody className="font-monospace">
              {historial.map((item, index) => (
                <tr
                  key={item.id}
                  className={item.id === registroActual.id ? "table-primary fw-bold" : ""}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setLadosInput(String(item.lados));
                    setRadio(String(item.radio));
                    setTolerancia(String(item.tolerancia));
                    setRegistroActual(item);
                  }}
                  title="Clic para cargar este experimento en la vista de detalle"
                >
                  <td>{index + 1}</td>
                  <td>{item.lados}</td>
                  <td>{item.radio}</td>
                  <td>{item.base.toFixed(4)}</td>
                  <td>{item.altura.toFixed(4)}</td>
                  <td className="text-success">{item.areaPoligono.toFixed(4)}</td>
                  <td className="text-secondary">{item.areaCirculo.toFixed(4)}</td>
                  <td className="text-danger fw-bold">{item.erp.toFixed(4)}%</td>
                  <td>
                    <span className={`badge ${item.cumple ? "bg-success" : "bg-warning text-dark"}`}>
                      {item.cumple ? "Cumple" : "No Cumple"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SimuladorTab;