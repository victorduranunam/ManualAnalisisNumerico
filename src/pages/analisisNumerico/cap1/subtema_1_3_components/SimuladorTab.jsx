import React, { useState, useMemo } from "react";

// ===========================================================================
// 1. FUNCIONES AUXILIARES DE CÁLCULO
// ===========================================================================

// Cálculo de errores fundamentales dados Vv y Va
const calcularErroresBasicos = (realVal, aproxVal) => {
  const vReal = parseFloat(realVal);
  const vAprox = parseFloat(aproxVal);

  if (isNaN(vReal) || isNaN(vAprox)) return null;

  const errorAbsoluto = Math.abs(vReal - vAprox);
  const esCeroReal = vReal === 0;
  const errorRelativo = esCeroReal ? null : errorAbsoluto / Math.abs(vReal);
  const erp = esCeroReal ? null : errorRelativo * 100;

  return {
    id: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    vReal,
    vAprox,
    errorAbsoluto,
    errorRelativo,
    erp,
    esCeroReal
  };
};

// Cálculo geométrico de polígonos regulares inscritos y tolerancia
const calcularGeometriaPoligono = (numLados, radioVal, tolVal) => {
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
  const cumple = erp <= tol;

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
    cumple
  };
};

// ===========================================================================
// 2. SUB-SIMULADOR 1: ERRORES FUNDAMENTALES
// ===========================================================================
const SimuladorErroresBasicosView = () => {
  const [valorRealInput, setValorRealInput] = useState("3.14159265");
  const [valorAproxInput, setValorAproxInput] = useState("3.14");

  const inicial = calcularErroresBasicos("3.14159265", "3.14");
  const [registroActual, setRegistroActual] = useState(inicial);
  const [historial, setHistorial] = useState(inicial ? [inicial] : []);

  const handleCalcular = (e) => {
    if (e) e.preventDefault();
    const res = calcularErroresBasicos(valorRealInput, valorAproxInput);
    if (res) {
      setRegistroActual(res);
      setHistorial((prev) => [...prev, res]);
    }
  };

  const handleReiniciar = () => {
    const reinicio = calcularErroresBasicos("3.14159265", "3.14");
    setValorRealInput("3.14159265");
    setValorAproxInput("3.14");
    setRegistroActual(reinicio);
    setHistorial([reinicio]);
  };

  return (
    <div>
      {/* Formulario */}
      <div className="card mb-3 shadow-sm border-primary">
        <div className="card-body bg-white">
          <form onSubmit={handleCalcular}>
            <div className="row g-3 align-items-end">
              <div className="col-md-4 col-12">
                <label className="form-label small fw-bold text-primary mb-1">
                  Valor Real o Exacto (V<sub>v</sub>):
                </label>
                <input
                  type="number"
                  step="any"
                  className="form-control font-monospace fw-bold border-primary"
                  value={valorRealInput}
                  onChange={(e) => setValorRealInput(e.target.value)}
                  placeholder="Ej. 3.141592, 10.5"
                  required
                />
              </div>

              <div className="col-md-4 col-12">
                <label className="form-label small fw-bold text-success mb-1">
                  Valor Aproximado (V<sub>a</sub>):
                </label>
                <input
                  type="number"
                  step="any"
                  className="form-control font-monospace fw-bold border-success"
                  value={valorAproxInput}
                  onChange={(e) => setValorAproxInput(e.target.value)}
                  placeholder="Ej. 3.14, 10.2"
                  required
                />
              </div>

              <div className="col-md-2 col-6">
                <button type="submit" className="btn btn-primary fw-bold w-100 py-2 shadow-sm">
                  <i className="bi bi-calculator me-1"></i> Calcular
                </button>
              </div>

              <div className="col-md-2 col-6">
                <button
                  type="button"
                  className="btn btn-outline-danger w-100 py-2"
                  onClick={handleReiniciar}
                >
                  <i className="bi bi-arrow-counterclockwise me-1"></i> Reiniciar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {registroActual && (
        <>
          {/* Tarjetas de Resultados */}
          <div className="row g-3 mb-3 text-center">
            <div className="col-md-4 col-12">
              <div className="card h-100 shadow-sm border-warning">
                <div className="card-header bg-warning-subtle fw-bold text-dark small">
                  Error Absoluto (E<sub>A</sub>)
                </div>
                <div className="card-body">
                  <h4 className="font-monospace text-dark mb-1">
                    {registroActual.errorAbsoluto.toPrecision(7)}
                  </h4>
                  <small className="text-muted">|V<sub>v</sub> &minus; V<sub>a</sub>|</small>
                </div>
              </div>
            </div>

            <div className="col-md-4 col-12">
              <div className="card h-100 shadow-sm border-info">
                <div className="card-header bg-info-subtle fw-bold text-dark small">
                  Error Relativo (E<sub>R</sub>)
                </div>
                <div className="card-body">
                  <h4 className="font-monospace text-dark mb-1">
                    {registroActual.esCeroReal ? (
                      <span className="badge bg-secondary">Indefinido (V<sub>v</sub> = 0)</span>
                    ) : (
                      registroActual.errorRelativo.toPrecision(7)
                    )}
                  </h4>
                  <small className="text-muted">E<sub>A</sub> / |V<sub>v</sub>|</small>
                </div>
              </div>
            </div>

            <div className="col-md-4 col-12">
              <div className="card h-100 shadow-sm border-danger">
                <div className="card-header bg-danger-subtle fw-bold text-danger small">
                  Error Relativo Porcentual (ERP)
                </div>
                <div className="card-body">
                  <h4 className="font-monospace text-danger fw-bold mb-1">
                    {registroActual.esCeroReal ? (
                      <span className="badge bg-secondary">Indefinido (V<sub>v</sub> = 0)</span>
                    ) : (
                      `${registroActual.erp.toFixed(6)}%`
                    )}
                  </h4>
                  <small className="text-muted">E<sub>R</sub> &times; 100%</small>
                </div>
              </div>
            </div>
          </div>

          {/* Desglose Analítico */}
          <div className="card mb-3 shadow-sm">
            <div className="card-header bg-white fw-bold small text-dark">
              Desglose Analítico Paso a Paso
            </div>
            <div className="card-body small font-monospace">
              <div className="mb-2 pb-2 border-bottom">
                <strong className="text-primary font-sans-serif">Paso 1: Error Absoluto (E<sub>A</sub>)</strong>
                <div className="text-secondary mt-1">
                  E<sub>A</sub> = |V<sub>v</sub> &minus; V<sub>a</sub>| = |{registroActual.vReal} &minus; ({registroActual.vAprox})| ={" "}
                  <strong className="text-dark fs-6">{registroActual.errorAbsoluto.toPrecision(8)}</strong>
                </div>
              </div>

              <div className="mb-2 pb-2 border-bottom">
                <strong className="text-primary font-sans-serif">Paso 2: Error Relativo (E<sub>R</sub>)</strong>
                {registroActual.esCeroReal ? (
                  <div className="text-danger mt-1 font-sans-serif">&bull; Indefinido porque V<sub>v</sub> = 0.</div>
                ) : (
                  <div className="text-secondary mt-1">
                    E<sub>R</sub> = E<sub>A</sub> / |V<sub>v</sub>| = {registroActual.errorAbsoluto.toPrecision(6)} / |{registroActual.vReal}| ={" "}
                    <strong className="text-dark fs-6">{registroActual.errorRelativo.toPrecision(8)}</strong>
                  </div>
                )}
              </div>

              <div>
                <strong className="text-primary font-sans-serif">Paso 3: Error Relativo Porcentual (ERP)</strong>
                {registroActual.esCeroReal ? (
                  <div className="text-danger mt-1 font-sans-serif">&bull; Indefinido.</div>
                ) : (
                  <div className="text-secondary mt-1">
                    ERP = E<sub>R</sub> &times; 100% = {registroActual.errorRelativo.toPrecision(6)} &times; 100% ={" "}
                    <strong className="text-danger fs-6">{registroActual.erp.toFixed(6)}%</strong>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Historial */}
      <div className="card shadow-sm">
        <div className="card-header bg-white fw-bold small text-dark d-flex justify-content-between align-items-center">
          <span>Historial de Evaluaciones ({historial.length})</span>
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary"
            onClick={() => setHistorial(registroActual ? [registroActual] : [])}
          >
            Limpiar anteriores
          </button>
        </div>
        <div className="table-responsive small">
          <table className="table table-bordered table-hover align-middle text-center mb-0">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Valor Real (V<sub>v</sub>)</th>
                <th>Valor Aprox (V<sub>a</sub>)</th>
                <th>Error Absoluto (E<sub>A</sub>)</th>
                <th>Error Relativo (E<sub>R</sub>)</th>
                <th>ERP (%)</th>
              </tr>
            </thead>
            <tbody className="font-monospace">
              {historial.map((item, index) => (
                <tr
                  key={item.id}
                  className={registroActual && item.id === registroActual.id ? "table-primary fw-bold" : ""}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setValorRealInput(String(item.vReal));
                    setValorAproxInput(String(item.vAprox));
                    setRegistroActual(item);
                  }}
                  title="Clic para ver detalle"
                >
                  <td>{index + 1}</td>
                  <td className="text-primary">{item.vReal}</td>
                  <td className="text-success">{item.vAprox}</td>
                  <td>{item.errorAbsoluto.toPrecision(6)}</td>
                  <td>{item.esCeroReal ? "N/A" : item.errorRelativo.toPrecision(6)}</td>
                  <td className="text-danger fw-bold">{item.esCeroReal ? "N/A" : `${item.erp.toFixed(4)}%`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ===========================================================================
// 3. SUB-SIMULADOR 2: POLÍGONOS INSCRITOS
// ===========================================================================
const SimuladorPoligonoInscritoView = () => {
  const [ladosInput, setLadosInput] = useState("5");
  const [radio, setRadio] = useState("1");
  const [tolerancia, setTolerancia] = useState("1.0");

  const inicial = useMemo(() => calcularGeometriaPoligono(3, "1", "1.0"), []);
  const [historial, setHistorial] = useState([inicial]);
  const [registroActual, setRegistroActual] = useState(inicial);

  const handleCalcularYAgregar = (e) => {
    if (e) e.preventDefault();
    const L = Math.max(3, parseInt(ladosInput, 10) || 3);
    const r = parseFloat(radio) > 0 ? parseFloat(radio) : 1;
    const tol = parseFloat(tolerancia) >= 0 ? parseFloat(tolerancia) : 1.0;

    const nuevo = calcularGeometriaPoligono(L, r, tol);
    setRegistroActual(nuevo);
    setHistorial((prev) => [...prev, nuevo]);
  };

  const handleReiniciar = () => {
    const reinicio = calcularGeometriaPoligono(3, "1", "1.0");
    setLadosInput("3");
    setRadio("1");
    setTolerancia("1.0");
    setRegistroActual(reinicio);
    setHistorial([reinicio]);
  };

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
    <div>
      {/* Panel de Entrada */}
      <div className="card mb-3 shadow-sm border-primary">
        <div className="card-body bg-white">
          <form onSubmit={handleCalcularYAgregar}>
            <div className="row g-3 align-items-end">
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

              <div className="col-md-3 col-sm-6 col-12">
                <button type="submit" className="btn btn-primary fw-bold w-100 py-2 shadow-sm">
                  <i className="bi bi-plus-circle me-1"></i> Calcular y Agregar
                </button>
              </div>

              <div className="col-md-2 col-12">
                <button
                  type="button"
                  className="btn btn-outline-danger w-100 py-2"
                  onClick={handleReiniciar}
                >
                  <i className="bi bi-arrow-counterclockwise me-1"></i> Reiniciar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Detalle y Gráfica SVG */}
      <div className="row g-3 mb-3">
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

        <div className="col-md-8 col-12">
          <div className="card h-100 shadow-sm">
            <div className="card-header bg-white fw-bold small text-dark d-flex justify-content-between align-items-center">
              <span>Desglose Analítico (L = {registroActual.lados} lados)</span>
              <span className={`badge ${registroActual.cumple ? "bg-success" : "bg-warning text-dark"}`}>
                {registroActual.cumple ? "\u2713 Cumple Tolerancia" : "Error > Tolerancia"}
              </span>
            </div>
            <div className="card-body small font-monospace">
              <div className="mb-2 pb-2 border-bottom">
                <strong className="text-primary font-sans-serif">Paso 1: Área Real del Círculo (A<sub>C</sub>)</strong>
                <div className="text-secondary">
                  A<sub>C</sub> = &pi; &times; r<sup>2</sup> = &pi; &times; ({registroActual.radio})<sup>2</sup> = <strong>{registroActual.areaCirculo.toFixed(6)}</strong>
                </div>
              </div>

              <div className="mb-2 pb-2 border-bottom">
                <strong className="text-primary font-sans-serif">Paso 2: Base del triángulo isósceles (b)</strong>
                <div className="text-secondary">
                  b = 2 &times; {registroActual.radio} &times; sen(&pi; / {registroActual.lados}) = <strong>{registroActual.base.toFixed(6)}</strong>
                </div>
              </div>

              <div className="mb-2 pb-2 border-bottom">
                <strong className="text-primary font-sans-serif">Paso 3: Altura del triángulo (h)</strong>
                <div className="text-secondary">
                  h = {registroActual.radio} &times; cos(&pi; / {registroActual.lados}) = <strong>{registroActual.altura.toFixed(6)}</strong>
                </div>
              </div>

              <div className="mb-2 pb-2 border-bottom">
                <strong className="text-primary font-sans-serif">Paso 4: Área del Polígono Inscrito (A<sub>P</sub>)</strong>
                <div className="text-secondary">
                  A<sub>P</sub> = {registroActual.lados} &times; (b &times; h) / 2 = <strong className="text-success fs-6">{registroActual.areaPoligono.toFixed(6)}</strong>
                </div>
              </div>

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

      {/* Historial */}
      <div className="card shadow-sm">
        <div className="card-header bg-white fw-bold small text-dark d-flex justify-content-between align-items-center">
          <span>Historial de Experimentos ({historial.length})</span>
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary"
            onClick={() => setHistorial([registroActual])}
          >
            Limpiar anteriores
          </button>
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
                  title="Clic para ver detalle"
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

// ===========================================================================
// 4. COMPONENTE PRINCIPAL (MENÚ DE SELECCIÓN Y VISTA INTERACTIVA)
// ===========================================================================
const SimuladorTab = () => {
  const [metodoSeleccionado, setMetodoSeleccionado] = useState(null); // null | 'errores_basicos' | 'poligonos_inscritos'

  // -------------------------------------------------------------------------
  // VISTA 1: MENÚ PRINCIPAL CON CARDS
  // -------------------------------------------------------------------------
  if (!metodoSeleccionado) {
    return (
      <div className="p-4 border rounded bg-light">
        <div className="text-center mb-4">
          <h4 className="text-primary fw-bold mb-2">
            <i className="bi bi-cpu me-2"></i>Simuladores del Subtema 1.2
          </h4>
          <p className="text-muted">
            Selecciona el simulador interactivo que deseas explorar:
          </p>
        </div>

        <div className="row g-4 justify-content-center">
          {/* Card 1: Errores Fundamentales */}
          <div className="col-md-5">
            <div className="card h-100 shadow-sm border-0 border-top border-4 border-primary hover-shadow">
              <div className="card-body p-4 d-flex flex-column text-center">
                <div className="display-5 text-primary mb-3">
                  <i className="bi bi-calculator"></i>
                </div>
                <h5 className="fw-bold text-dark mb-2">Errores Numéricos Fundamentales</h5>
                <p className="text-muted small flex-grow-1">
                  Calcula de forma directa el Error Absoluto (E<sub>A</sub>), Error Relativo (E<sub>R</sub>) y Error Relativo Porcentual (ERP) comparando el valor real (V<sub>v</sub>) contra el valor aproximado (V<sub>a</sub>).
                </p>
                <button
                  className="btn btn-primary fw-semibold w-100 mt-3"
                  onClick={() => setMetodoSeleccionado("errores_basicos")}
                >
                  <i className="bi bi-play-circle me-2"></i>Iniciar Calculadora de Errores
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Polígonos Regulares Inscritos */}
          <div className="col-md-5">
            <div className="card h-100 shadow-sm border-0 border-top border-4 border-success hover-shadow">
              <div className="card-body p-4 d-flex flex-column text-center">
                <div className="display-5 text-success mb-3">
                  <i className="bi bi-pentagon"></i>
                </div>
                <h5 className="fw-bold text-dark mb-2">Polígonos Inscritos y Tolerancia</h5>
                <p className="text-muted small flex-grow-1">
                  Aproxima el área del círculo dividiéndolo en L triángulos isósceles (L &ge; 3), calcula el error de discretización y evalúa la cota máxima de tolerancia (ERP &le; Tol) con gráfico SVG.
                </p>
                <button
                  className="btn btn-success fw-semibold text-white w-100 mt-3"
                  onClick={() => setMetodoSeleccionado("poligonos_inscritos")}
                >
                  <i className="bi bi-play-circle me-2"></i>Iniciar Simulador de Polígonos
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // VISTA 2: SIMULADOR ACTIVO
  // -------------------------------------------------------------------------
  return (
    <div className="p-3 border rounded bg-light">
      {/* Encabezado con Botón de Regresar */}
      <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
        <div>
          <button
            className="btn btn-outline-secondary btn-sm me-3"
            onClick={() => setMetodoSeleccionado(null)}
          >
            <i className="bi bi-arrow-left me-1"></i> Cambiar Simulador
          </button>
          <span className="h5 text-primary fw-bold align-middle mb-0">
            <i className="bi bi-cpu me-2"></i>
            Simulador: {metodoSeleccionado === "errores_basicos" ? "Errores Numéricos Fundamentales" : "Polígonos Regulares Inscritos"}
          </span>
        </div>
      </div>

      {/* Renderizado Condicional */}
      {metodoSeleccionado === "errores_basicos" ? (
        <SimuladorErroresBasicosView />
      ) : (
        <SimuladorPoligonoInscritoView />
      )}
    </div>
  );
};

export default SimuladorTab;