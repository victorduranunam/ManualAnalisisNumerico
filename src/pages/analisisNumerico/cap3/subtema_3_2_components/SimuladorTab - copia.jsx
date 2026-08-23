import React, { useState } from "react";

// Funciones de inicialización segura
const getInitialA = () => JSON.parse(",,]");
const getInitialB = () => JSON.parse("");
const getInitialX0 = () => JSON.parse("[0, 0, 0]");

const SimuladorTab = () => {
  // Estado para la vista: null (menú) | 'jacobi' | 'gauss_seidel' | 'comparativo'
  const [metodoSeleccionado, setMetodoSeleccionado] = useState(null);

  const [matrixA, setMatrixA] = useState(getInitialA());
  const [vectorB, setVectorB] = useState(getInitialB());
  const [vectorX0, setVectorX0] = useState(getInitialX0());
  const [tolerance, setTolerance] = useState(0.001);
  const [maxIter, setMaxIter] = useState(25);

  const [resultsJacobi, setResultsJacobi] = useState(null);
  const [resultsGS, setResultsGS] = useState(null);

  const checkDominance = (A) => {
    for (let i = 0; i < 3; i++) {
      let sum = 0;
      for (let j = 0; j < 3; j++) {
        if (i !== j) sum += Math.abs(A[i][j]);
      }
      if (Math.abs(A[i][i]) <= sum) return false;
    }
    return true;
  };

  const isDominant = checkDominance(matrixA);

  const loadExample = () => {
    setMatrixA(getInitialA());
    setVectorB(getInitialB());
    setVectorX0(getInitialX0());
    setTolerance(0.001);
    setMaxIter(25);
    setResultsJacobi(null);
    setResultsGS(null);
  };

  const runSimulation = () => {
    // 1. Ejecutar Jacobi
    if (metodoSeleccionado === "comparativo" || metodoSeleccionado === "jacobi") {
      let X_old = [...vectorX0];
      let jIters = [];
      let jConverged = false;

      for (let k = 1; k <= maxIter; k++) {
        let X_new = [0, 0, 0];
        X_new[0] = (vectorB[0] - matrixA[0] * X_old - matrixA[0] * X_old) / matrixA[0][0];
        X_new = (vectorB - matrixA[0] * X_old[0] - matrixA * X_old) / matrixA;
        X_new = (vectorB - matrixA[0] * X_old[0] - matrixA * X_old) / matrixA;

        const ex = Math.abs(X_new[0] - X_old[0]);
        const ey = Math.abs(X_new - X_old);
        const ez = Math.abs(X_new - X_old);
        const maxErr = Math.max(ex, ey, ez);

        jIters.push({
          iter: k,
          x_in: [...X_old],
          x_out: [...X_new],
          errors: [ex, ey, ez],
          maxErr: maxErr
        });

        if (maxErr < tolerance) {
          jConverged = true;
          setResultsJacobi({ iters: jIters, solution: X_new, count: k, converged: true });
          break;
        }
        X_old = [...X_new];
      }
      if (!jConverged) {
        setResultsJacobi({ iters: jIters, solution: X_old, count: maxIter, converged: false });
      }
    }

    // 2. Ejecutar Gauss-Seidel
    if (metodoSeleccionado === "comparativo" || metodoSeleccionado === "gauss_seidel") {
      let X_curr = [...vectorX0];
      let gsIters = [];
      let gsConverged = false;

      for (let k = 1; k <= maxIter; k++) {
        let X_prev = [...X_curr];
        let X_next = [0, 0, 0];

        X_next[0] = (vectorB[0] - matrixA[0] * X_prev - matrixA[0] * X_prev) / matrixA[0][0];
        X_next = (vectorB - matrixA[0] * X_next[0] - matrixA * X_prev) / matrixA;
        X_next = (vectorB - matrixA[0] * X_next[0] - matrixA * X_next) / matrixA;

        const ex = Math.abs(X_next[0] - X_prev[0]);
        const ey = Math.abs(X_next - X_prev);
        const ez = Math.abs(X_next - X_prev);
        const maxErr = Math.max(ex, ey, ez);

        gsIters.push({
          iter: k,
          x_in: [...X_prev],
          x_out: [...X_next],
          errors: [ex, ey, ez],
          maxErr: maxErr
        });

        if (maxErr < tolerance) {
          gsConverged = true;
          setResultsGS({ iters: gsIters, solution: X_next, count: k, converged: true });
          break;
        }
        X_curr = [...X_next];
      }
      if (!gsConverged) {
        setResultsGS({ iters: gsIters, solution: X_curr, count: maxIter, converged: false });
      }
    }
  };

  // ---------------------------------------------------------------------------
  // VISTA 1: MENÚ DE SELECCIÓN (CARDS DE BOOTSTRAP)
  // ---------------------------------------------------------------------------
  if (!metodoSeleccionado) {
    return (
      <div className="p-4 border rounded bg-light">
        <div className="text-center mb-4">
          <h4 className="text-primary fw-bold mb-2">
            <i className="bi bi-arrow-repeat me-2"></i>Simulador de Métodos Iterativos
          </h4>
          <p className="text-muted">
            Selecciona el método numérico iterativo que deseas simular:
          </p>
        </div>

        <div className="row g-4 justify-content-center">
          {/* Card 1: Jacobi */}
          <div className="col-md-4">
            <div className="card h-100 shadow-sm border-0 border-top border-4 border-info">
              <div className="card-body p-4 d-flex flex-column text-center">
                <div className="display-5 text-info mb-3">
                  <i className="bi bi-grid-3x3"></i>
                </div>
                <h5 className="fw-bold text-dark mb-2">Método de Jacobi</h5>
                <p className="text-muted small flex-grow-1">
                  Actualiza todas las variables al final de cada iteración utilizando exclusivamente los valores calculados en la etapa previa.
                </p>
                <button
                  className="btn btn-info text-white fw-semibold w-100 mt-3"
                  onClick={() => setMetodoSeleccionado("jacobi")}
                >
                  <i className="bi bi-play-circle me-2"></i>Iniciar Jacobi
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Gauss-Seidel */}
          <div className="col-md-4">
            <div className="card h-100 shadow-sm border-0 border-top border-4 border-success">
              <div className="card-body p-4 d-flex flex-column text-center">
                <div className="display-5 text-success mb-3">
                  <i className="bi bi-lightning-charge"></i>
                </div>
                <h5 className="fw-bold text-dark mb-2">Método de Gauss-Seidel</h5>
                <p className="text-muted small flex-grow-1">
                  Incorpora inmediatamente los valores recién calculados dentro de la misma iteración, acelerando la convergencia.
                </p>
                <button
                  className="btn btn-success fw-semibold w-100 mt-3"
                  onClick={() => setMetodoSeleccionado("gauss_seidel")}
                >
                  <i className="bi bi-play-circle me-2"></i>Iniciar Gauss-Seidel
                </button>
              </div>
            </div>
          </div>

          {/* Card 3: Comparativo */}
          <div className="col-md-4">
            <div className="card h-100 shadow-sm border-0 border-top border-4 border-primary">
              <div className="card-body p-4 d-flex flex-column text-center">
                <div className="display-5 text-primary mb-3">
                  <i className="bi bi-arrow-left-right"></i>
                </div>
                <h5 className="fw-bold text-dark mb-2">Comparativo en Paralelo</h5>
                <p className="text-muted small flex-grow-1">
                  Ejecuta ambos métodos simultáneamente con los mismos datos y compara su velocidad de convergencia y errores.
                </p>
                <button
                  className="btn btn-primary fw-semibold w-100 mt-3"
                  onClick={() => setMetodoSeleccionado("comparativo")}
                >
                  <i className="bi bi-play-circle me-2"></i>Comparar Ambos
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // VISTA 2: SIMULADOR INTERACTIVO
  // ---------------------------------------------------------------------------
  return (
    <div className="p-3 border rounded bg-light">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <button
            className="btn btn-outline-secondary btn-sm me-3"
            onClick={() => setMetodoSeleccionado(null)}
          >
            <i className="bi bi-arrow-left me-1"></i> Cambiar Método
          </button>
          <span className="h5 text-primary fw-bold align-middle mb-0">
            <i className="bi bi-cpu me-2"></i>
            {metodoSeleccionado === "jacobi" && "Simulador: Método de Jacobi"}
            {metodoSeleccionado === "gauss_seidel" && "Simulador: Método de Gauss-Seidel"}
            {metodoSeleccionado === "comparativo" && "Simulador Comparativo: Jacobi vs. Gauss-Seidel"}
          </span>
        </div>
        <span className={`badge ${isDominant ? "bg-success" : "bg-warning text-dark"}`}>
          {isDominant ? "Diagonal Dominante" : "No Dominante (Puede Diverger)"}
        </span>
      </div>

      <div className="bg-white p-4 rounded border shadow-sm mb-3">
        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <h6 className="fw-bold mb-2">Sistema [ A | B ]:</h6>
            <table className="table table-bordered text-center align-middle" style={{ maxWidth: "420px" }}>
              <tbody>
                {matrixA.map((row, r) => (
                  <tr key={r}>
                    {row.map((val, c) => (
                      <td key={c}>
                        <input
                          type="number"
                          className="form-control form-control-sm text-center"
                          value={val}
                          onChange={(e) => {
                            const u = matrixA.map((ro, ri) =>
                              ro.map((co, ci) => (ri === r && ci === c ? parseFloat(e.target.value) || 0 : co))
                            );
                            setMatrixA(u);
                          }}
                        />
                      </td>
                    ))}
                    <td className="bg-light fw-bold">|</td>
                    <td>
                      <input
                        type="number"
                        className="form-control form-control-sm text-center bg-info bg-opacity-10 fw-bold"
                        value={vectorB[r]}
                        onChange={(e) => {
                          const u = [...vectorB];
                          u[r] = parseFloat(e.target.value) || 0;
                          setVectorB(u);
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="col-md-6">
            <h6 className="fw-bold mb-2">Parámetros:</h6>
            <div className="row g-2 mb-2">
              <div className="col-4">
                <label className="small text-muted">X₀</label>
                <input
                  type="number"
                  className="form-control form-control-sm text-center"
                  value={vectorX0[0]}
                  onChange={(e) => setVectorX0([parseFloat(e.target.value) || 0, vectorX0[1], vectorX0])}
                />
              </div>
              <div className="col-4">
                <label className="small text-muted">Y₀</label>
                <input
                  type="number"
                  className="form-control form-control-sm text-center"
                  value={vectorX0}
                  onChange={(e) => setVectorX0([vectorX0[0], parseFloat(e.target.value) || 0, vectorX0])}
                />
              </div>
              <div className="col-4">
                <label className="small text-muted">Z₀</label>
                <input
                  type="number"
                  className="form-control form-control-sm text-center"
                  value={vectorX0}
                  onChange={(e) => setVectorX0([vectorX0[0], vectorX0, parseFloat(e.target.value) || 0])}
                />
              </div>
            </div>

            <div className="row g-2 mb-3">
              <div className="col-6">
                <label className="small text-muted">Tolerancia</label>
                <input
                  type="number"
                  step="0.0001"
                  className="form-control form-control-sm"
                  value={tolerance}
                  onChange={(e) => setTolerance(parseFloat(e.target.value) || 0.001)}
                />
              </div>
              <div className="col-6">
                <label className="small text-muted">Máx. Iteraciones</label>
                <input
                  type="number"
                  className="form-control form-control-sm"
                  value={maxIter}
                  onChange={(e) => setMaxIter(parseInt(e.target.value, 10) || 25)}
                />
              </div>
            </div>

            <div className="d-flex gap-2">
              <button className="btn btn-outline-secondary btn-sm w-50" onClick={loadExample}>
                Cargar Ejemplo
              </button>
              <button className="btn btn-primary btn-sm fw-bold w-50" onClick={runSimulation}>
                Calcular Iteraciones
              </button>
            </div>
          </div>
        </div>

        {/* Resumen Comparativo */}
        {resultsJacobi && resultsGS && metodoSeleccionado === "comparativo" && (
          <div className="alert alert-light border shadow-sm p-3 mb-3">
            <h6 className="fw-bold text-dark mb-2">Comparativa de Velocidad de Convergencia:</h6>
            <div className="row text-center g-3">
              <div className="col-md-6">
                <div className="p-3 border rounded bg-white">
                  <span className="badge bg-info text-dark mb-1">Jacobi</span>
                  <div className="fs-5 fw-bold text-dark">{resultsJacobi.count} Iteraciones</div>
                  <small className="text-muted">
                    Solución: [{resultsJacobi.solution.map((v) => v.toFixed(4)).join(", ")}]
                  </small>
                </div>
              </div>
              <div className="col-md-6">
                <div className="p-3 border rounded bg-white border-success">
                  <span className="badge bg-success mb-1">Gauss-Seidel</span>
                  <div className="fs-5 fw-bold text-success">{resultsGS.count} Iteraciones</div>
                  <small className="text-muted">
                    Solución: [{resultsGS.solution.map((v) => v.toFixed(4)).join(", ")}]
                  </small>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tablas de Resultados */}
        <div className="row g-3">
          {resultsJacobi && (metodoSeleccionado === "comparativo" || metodoSeleccionado === "jacobi") && (
            <div className={metodoSeleccionado === "comparativo" ? "col-lg-6" : "col-12"}>
              <div className="card h-100 border">
                <div className="card-header bg-light py-2 small fw-bold text-secondary d-flex justify-content-between">
                  <span>Iteraciones: Método de Jacobi</span>
                  <span className="badge bg-secondary">{resultsJacobi.count} iters</span>
                </div>
                <div className="card-body p-2 table-responsive" style={{ maxHeight: "350px" }}>
                  <table className="table table-sm table-striped table-bordered text-center font-monospace small mb-0">
                    <thead className="table-light sticky-top">
                      <tr>
                        <th>k</th>
                        <th>X_calc</th>
                        <th>Y_calc</th>
                        <th>Z_calc</th>
                        <th>Max Error</th>
                      </tr>
                    </thead>
                    <tbody>
                      {resultsJacobi.iters.map((r) => (
                        <tr key={r.iter}>
                          <td className="fw-bold">{r.iter}</td>
                          <td>{r.x_out[0].toFixed(4)}</td>
                          <td>{r.x_out.toFixed(4)}</td>
                          <td>{r.x_out.toFixed(4)}</td>
                          <td>{r.maxErr.toFixed(4)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {resultsGS && (metodoSeleccionado === "comparativo" || metodoSeleccionado === "gauss_seidel") && (
            <div className={metodoSeleccionado === "comparativo" ? "col-lg-6" : "col-12"}>
              <div className="card h-100 border border-success">
                <div className="card-header bg-success text-white py-2 small fw-bold d-flex justify-content-between">
                  <span>Iteraciones: Método de Gauss-Seidel</span>
                  <span className="badge bg-white text-success">{resultsGS.count} iters</span>
                </div>
                <div className="card-body p-2 table-responsive" style={{ maxHeight: "350px" }}>
                  <table className="table table-sm table-striped table-bordered text-center font-monospace small mb-0">
                    <thead className="table-light sticky-top">
                      <tr>
                        <th>k</th>
                        <th>X_calc</th>
                        <th>Y_calc</th>
                        <th>Z_calc</th>
                        <th>Max Error</th>
                      </tr>
                    </thead>
                    <tbody>
                      {resultsGS.iters.map((r) => (
                        <tr key={r.iter}>
                          <td className="fw-bold">{r.iter}</td>
                          <td>{r.x_out[0].toFixed(4)}</td>
                          <td>{r.x_out.toFixed(4)}</td>
                          <td>{r.x_out.toFixed(4)}</td>
                          <td>{r.maxErr.toFixed(4)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SimuladorTab;