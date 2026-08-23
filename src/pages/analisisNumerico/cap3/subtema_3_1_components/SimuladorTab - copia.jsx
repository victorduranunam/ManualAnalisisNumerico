import React, { useState } from "react";

// Matrices y vectores iniciales definidos de forma segura
const INITIAL_MATRIX_GJ = Array.of(
  Array.of(2, 1, -1),
  Array.of(1, -2, 3),
  Array.of(1, 1, -2)
);
const INITIAL_VECTOR_GJ = Array.of(1, 6, -3);

const INITIAL_MATRIX_LU = Array.of(
  Array.of(1, 2, -1),
  Array.of(-1, 3, 1),
  Array.of(2, 1, 1)
);
const INITIAL_VECTOR_LU = Array.of(2, 8, 7);

const SimuladorTab = () => {
  // Estado para la vista: null (menú de selección) | 'gauss_jordan' | 'descomposicion_lu'
  const [metodoSeleccionado, setMetodoSeleccionado] = useState(null);

  // -------------------------------------------------------------
  // ESTADOS - GAUSS-JORDAN
  // -------------------------------------------------------------
  const [sizeGJ, setSizeGJ] = useState(3);
  const [matrixAGJ, setMatrixAGJ] = useState(INITIAL_MATRIX_GJ);
  const [vectorBGJ, setVectorBGJ] = useState(INITIAL_VECTOR_GJ);
  const [usePivoting, setUsePivoting] = useState(true);
  const [stepsGJ, setStepsGJ] = useState([]);
  const [currentStepGJ, setCurrentStepGJ] = useState(0);
  const [solutionGJ, setSolutionGJ] = useState(null);
  const [errorGJ, setErrorGJ] = useState("");

  const handleSizeChangeGJ = (newSize) => {
    const n = parseInt(newSize, 10);
    setSizeGJ(n);
    const newA = Array(n).fill(0).map((_, r) => Array(n).fill(0).map((_, c) => (r === c ? 1 : 0)));
    const newB = Array(n).fill(0);
    setMatrixAGJ(newA);
    setVectorBGJ(newB);
    setStepsGJ([]);
    setCurrentStepGJ(0);
    setSolutionGJ(null);
    setErrorGJ("");
  };

  const loadExampleGJ = () => {
    setSizeGJ(3);
    setMatrixAGJ(INITIAL_MATRIX_GJ);
    setVectorBGJ(INITIAL_VECTOR_GJ);
    setStepsGJ([]);
    setCurrentStepGJ(0);
    setSolutionGJ(null);
    setErrorGJ("");
  };

  const solveGaussJordan = () => {
    setErrorGJ("");
    setStepsGJ([]);
    setCurrentStepGJ(0);
    setSolutionGJ(null);

    const n = sizeGJ;
    let M = matrixAGJ.map((row, i) => [...row, vectorBGJ[i]]);
    const stepList = [];

    const cloneMatrix = () => JSON.parse(JSON.stringify(M));

    // Paso inicial
    stepList.push({
      type: "inicio",
      title: "Matriz inicial ampliada",
      desc: "Se inicia el proceso de Gauss-Jordan con la matriz ampliada [ A | B ].",
      detail: `Matriz de ${n} × ${n}. Se procesarán los pivotes de izquierda a derecha.`,
      matrix: cloneMatrix()
    });

    for (let i = 0; i < n; i++) {
      // ---------------------------------------------------------
      // SELECCIÓN DEL PIVOTE
      // ---------------------------------------------------------
      let maxRow = i;
      let maxVal = Math.abs(M[i][i]);

      if (usePivoting) {
        for (let k = i + 1; k < n; k++) {
          if (Math.abs(M[k][i]) > maxVal) {
            maxVal = Math.abs(M[k][i]);
            maxRow = k;
          }
        }

        if (maxVal < 1e-12) {
          setErrorGJ(
            `No se puede continuar: no existe un pivote válido en la columna ${i + 1}. El sistema no tiene solución única.`
          );
          return;
        }

        if (maxRow !== i) {
          const oldRow = i + 1;
          const newRow = maxRow + 1;
          const pivotCandidate = M[maxRow][i];

          const temp = M[i];
          M[i] = M[maxRow];
          M[maxRow] = temp;

          stepList.push({
            type: "intercambio",
            title: `Intercambio de renglones R${oldRow} ↔ R${newRow}`,
            desc: `Se selecciona como pivote el mayor valor absoluto disponible en la columna ${i + 1}.`,
            detail:
              `Pivote seleccionado: ${pivotCandidate.toFixed(6)} ` +
              `(posición: fila ${newRow}, columna ${i + 1}). ` +
              `Se intercambia R${oldRow} con R${newRow}.`,
            pivot: pivotCandidate,
            pivotRow: newRow,
            pivotCol: i + 1,
            operation: `R${oldRow} ↔ R${newRow}`,
            matrix: cloneMatrix()
          });
        } else {
          stepList.push({
            type: "pivote",
            title: `Selección del pivote ${i + 1}`,
            desc: `Se selecciona el pivote de la columna ${i + 1} sin intercambio de renglones.`,
            detail:
              `Pivote: ${M[i][i].toFixed(6)} ` +
              `(posición: fila ${i + 1}, columna ${i + 1}). ` +
              `No fue necesario intercambiar renglones.`,
            pivot: M[i][i],
            pivotRow: i + 1,
            pivotCol: i + 1,
            operation: "Sin intercambio",
            matrix: cloneMatrix()
          });
        }
      } else {
        if (Math.abs(M[i][i]) < 1e-12) {
          setErrorGJ(
            `Pivote nulo en (${i + 1}, ${i + 1}). Activa la opción de pivoteo parcial.`
          );
          return;
        }

        stepList.push({
          type: "pivote",
          title: `Selección del pivote ${i + 1}`,
          desc: `Se utiliza directamente el elemento de la diagonal como pivote.`,
          detail:
            `Pivote: ${M[i][i].toFixed(6)} ` +
            `(posición: fila ${i + 1}, columna ${i + 1}). ` +
            `Pivoteo parcial desactivado.`,
          pivot: M[i][i],
          pivotRow: i + 1,
          pivotCol: i + 1,
          operation: "Sin intercambio",
          matrix: cloneMatrix()
        });
      }

      // ---------------------------------------------------------
      // NORMALIZACIÓN DEL PIVOTE
      // ---------------------------------------------------------
      const pivot = M[i][i];

      for (let c = 0; c <= n; c++) {
        M[i][c] = M[i][c] / pivot;
      }

      stepList.push({
        type: "normalizacion",
        title: `Normalización del renglón R${i + 1}`,
        desc: `Se convierte el pivote en 1.`,
        detail:
          `Pivote utilizado: ${pivot.toFixed(6)} ` +
          `(fila ${i + 1}, columna ${i + 1}).`,
        pivot,
        pivotRow: i + 1,
        pivotCol: i + 1,
        operation: `R${i + 1} = R${i + 1} / (${pivot.toFixed(6)})`,
        matrix: cloneMatrix()
      });

      // ---------------------------------------------------------
      // ELIMINACIÓN EN TODAS LAS FILAS
      // ---------------------------------------------------------
      for (let j = 0; j < n; j++) {
        if (j !== i) {
          const factor = M[j][i];

          if (Math.abs(factor) > 1e-12) {
            for (let c = 0; c <= n; c++) {
              M[j][c] = M[j][c] - factor * M[i][c];
            }

            stepList.push({
              type: "eliminacion",
              title: `Eliminación en R${j + 1}`,
              desc:
                `Se hace cero el elemento de la columna ${i + 1} ` +
                `que se encuentra en R${j + 1}.`,
              detail:
                `Pivote utilizado: ${M[i][i].toFixed(6)} ` +
                `(fila ${i + 1}, columna ${i + 1}). ` +
                `Factor de eliminación: ${factor.toFixed(6)}.`,
              pivot: M[i][i],
              pivotRow: i + 1,
              pivotCol: i + 1,
              affectedRow: j + 1,
              factor,
              operation:
                `R${j + 1} = R${j + 1} - (${factor.toFixed(6)}) × R${i + 1}`,
              matrix: cloneMatrix()
            });
          }
        }
      }
    }

    stepList.push({
      type: "final",
      title: "Matriz identidad y solución",
      desc: "Todos los pivotes son 1 y los demás elementos de las columnas pivote son 0.",
      detail: "La matriz de coeficientes se ha transformado en la matriz identidad.",
      matrix: cloneMatrix()
    });

    setStepsGJ(stepList);
    setCurrentStepGJ(0);
    setSolutionGJ(M.map((row) => row[n]));
  };

  // -------------------------------------------------------------
  // ESTADOS - FACTORIZACIÓN Y SOLUCIÓN LU
  // -------------------------------------------------------------
  const [matrixALU, setMatrixALU] = useState(INITIAL_MATRIX_LU);
  const [vectorBLU, setVectorBLU] = useState(INITIAL_VECTOR_LU);
  const [variantLU, setVariantLU] = useState("Doolittle");
  const [resultsLU, setResultsLU] = useState(null);
  const [errorLU, setErrorLU] = useState("");

  const loadExampleLU = () => {
    setMatrixALU(INITIAL_MATRIX_LU);
    setVectorBLU(INITIAL_VECTOR_LU);
    setResultsLU(null);
    setErrorLU("");
  };

  const solveLU = () => {
    setErrorLU("");
    setResultsLU(null);
    const n = 3;
    let A = matrixALU.map((r) => [...r]);
    let B = [...vectorBLU];

    let L = Array(n).fill(0).map((_, r) => Array(n).fill(0).map((_, c) => (r === c ? 1 : 0)));
    let U = Array(n).fill(0).map(() => Array(n).fill(0));

    try {
      if (variantLU === "Doolittle") {
        for (let i = 0; i < n; i++) {
          for (let k = i; k < n; k++) {
            let sum = 0;
            for (let j = 0; j < i; j++) sum += L[i][j] * U[j][k];
            U[i][k] = A[i][k] - sum;
          }
          if (Math.abs(U[i][i]) < 1e-12) throw new Error(`Pivote nulo en U[${i + 1}, ${i + 1}].`);
          for (let k = i + 1; k < n; k++) {
            let sum = 0;
            for (let j = 0; j < i; j++) sum += L[k][j] * U[j][i];
            L[k][i] = (A[k][i] - sum) / U[i][i];
          }
        }
      } else {
        L = Array(n).fill(0).map(() => Array(n).fill(0));
        U = Array(n).fill(0).map((_, r) => Array(n).fill(0).map((_, c) => (r === c ? 1 : 0)));
        for (let i = 0; i < n; i++) {
          for (let k = i; k < n; k++) {
            let sum = 0;
            for (let j = 0; j < i; j++) sum += L[k][j] * U[j][i];
            L[k][i] = A[k][i] - sum;
          }
          if (Math.abs(L[i][i]) < 1e-12) throw new Error(`Pivote nulo en L[${i + 1}, ${i + 1}].`);
          for (let k = i + 1; k < n; k++) {
            let sum = 0;
            for (let j = 0; j < i; j++) sum += L[i][j] * U[j][k];
            U[i][k] = (A[i][k] - sum) / L[i][i];
          }
        }
      }

      let Y = Array(n).fill(0);
      for (let i = 0; i < n; i++) {
        let sum = 0;
        for (let j = 0; j < i; j++) sum += L[i][j] * Y[j];
        Y[i] = (B[i] - sum) / L[i][i];
      }

      let X = Array(n).fill(0);
      for (let i = n - 1; i >= 0; i--) {
        let sum = 0;
        for (let j = i + 1; j < n; j++) sum += U[i][j] * X[j];
        X[i] = (Y[i] - sum) / U[i][i];
      }

      setResultsLU({ L, U, Y, X });
    } catch (err) {
      setErrorLU(err.message);
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
            <i className="bi bi-grid-3x3-gap-fill me-2"></i>Simulador de Métodos Directos
          </h4>
          <p className="text-muted">
            Selecciona el método numérico matricial que deseas simular paso a paso:
          </p>
        </div>

        <div className="row g-4 justify-content-center">
          {/* Card 1: Gauss-Jordan */}
          <div className="col-md-5">
            <div className="card h-100 shadow-sm border-0 border-top border-4 border-primary">
              <div className="card-body p-4 d-flex flex-column text-center">
                <div className="display-5 text-primary mb-3">
                  <i className="bi bi-calculator"></i>
                </div>
                <h5 className="fw-bold text-dark mb-2">Método de Gauss-Jordan</h5>
                <p className="text-muted small flex-grow-1">
                  Transformación elemental por renglones de la matriz ampliada hasta convertirla en la matriz identidad y obtener la solución única de forma directa.
                </p>
                <button
                  className="btn btn-primary fw-semibold w-100 mt-3"
                  onClick={() => setMetodoSeleccionado("gauss_jordan")}
                >
                  <i className="bi bi-play-circle me-2"></i>Iniciar Gauss-Jordan
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Factorización LU */}
          <div className="col-md-5">
            <div className="card h-100 shadow-sm border-0 border-top border-4 border-success">
              <div className="card-body p-4 d-flex flex-column text-center">
                <div className="display-5 text-success mb-3">
                  <i className="bi bi-layers-half"></i>
                </div>
                <h5 className="fw-bold text-dark mb-2">Descomposición y Solución LU</h5>
                <p className="text-muted small flex-grow-1">
                  Factorización de la matriz en producto A = L · U (Doolittle / Crout) y resolución rápida mediante sustitución hacia adelante y hacia atrás.
                </p>
                <button
                  className="btn btn-success fw-semibold text-white w-100 mt-3"
                  onClick={() => setMetodoSeleccionado("descomposicion_lu")}
                >
                  <i className="bi bi-play-circle me-2"></i>Iniciar Factorización LU
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // VISTA 2: SIMULADOR INTERACTIVO (CON BOTÓN DE RETORNO AL MENÚ)
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
            {metodoSeleccionado === "gauss_jordan"
              ? "Simulador: Método de Gauss-Jordan"
              : "Simulador: Descomposición y Solución con LU"}
          </span>
        </div>
      </div>

      {/* CONTENIDO GAUSS-JORDAN */}
      {metodoSeleccionado === "gauss_jordan" && (
        <div className="bg-white p-4 rounded border shadow-sm">
          <div className="row g-3 align-items-center mb-3">
            <div className="col-auto">
              <label className="fw-bold me-2 small">Dimensión:</label>
              <select
                className="form-select form-select-sm d-inline-block w-auto"
                value={sizeGJ}
                onChange={(e) => handleSizeChangeGJ(e.target.value)}
              >
                <option value="2">2 × 2</option>
                <option value="3">3 × 3</option>
                <option value="4">4 × 4</option>
              </select>
            </div>
            <div className="col-auto">
              <div className="form-check form-switch mt-1">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="pivotCheck"
                  checked={usePivoting}
                  onChange={(e) => setUsePivoting(e.target.checked)}
                />
                <label className="form-check-label fw-bold small" htmlFor="pivotCheck">
                  Pivoteo Parcial
                </label>
              </div>
            </div>
            <div className="col-auto ms-auto">
              <button className="btn btn-outline-secondary btn-sm me-2" onClick={loadExampleGJ}>
                Cargar Ejemplo
              </button>
              <button className="btn btn-primary btn-sm" onClick={solveGaussJordan}>
                Resolver Sistema
              </button>
            </div>
          </div>

          {/* Entradas de Matriz */}
          <div className="table-responsive mb-3">
            <table className="table table-bordered text-center align-middle" style={{ maxWidth: "550px" }}>
              <tbody>
                {matrixAGJ.map((row, r) => (
                  <tr key={r}>
                    {row.map((val, c) => (
                      <td key={c}>
                        <input
                          type="number"
                          className="form-control form-control-sm text-center"
                          value={val}
                          onChange={(e) => {
                            const u = matrixAGJ.map((ro, ri) =>
                              ro.map((co, ci) => (ri === r && ci === c ? parseFloat(e.target.value) || 0 : co))
                            );
                            setMatrixAGJ(u);
                          }}
                        />
                      </td>
                    ))}
                    <td className="bg-light fw-bold">|</td>
                    <td>
                      <input
                        type="number"
                        className="form-control form-control-sm text-center bg-primary bg-opacity-10 fw-bold"
                        value={vectorBGJ[r]}
                        onChange={(e) => {
                          const u = [...vectorBGJ];
                          u[r] = parseFloat(e.target.value) || 0;
                          setVectorBGJ(u);
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {errorGJ && <div className="alert alert-danger py-2">{errorGJ}</div>}

          {solutionGJ && (
            <div className="alert alert-success border-0 shadow-sm p-3 mb-3">
              <h6 className="fw-bold mb-2">Solución Única:</h6>
              <div className="d-flex flex-wrap gap-3 font-monospace">
                {solutionGJ.map((val, i) => (
                  <span key={i} className="badge bg-success p-2 fs-6">
                    x<sub>{i + 1}</sub> = {val.toFixed(5)}
                  </span>
                ))}
              </div>
            </div>
          )}

          {stepsGJ.length > 0 && (
            <div className="mt-4">
              <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">
                <h6 className="fw-bold mb-0">
                  <i className="bi bi-list-ol me-2"></i>
                  Desarrollo paso a paso
                </h6>
                <span className="badge bg-primary">
                  Paso {currentStepGJ + 1} de {stepsGJ.length}
                </span>
              </div>

              {(() => {
                const st = stepsGJ[currentStepGJ];

                return (
                  <div className="card shadow-sm border-primary">
                    <div className="card-header bg-primary text-white">
                      <div className="fw-bold">
                        Paso {currentStepGJ + 1}: {st.title}
                      </div>
                    </div>

                    <div className="card-body">
                      <div className="alert alert-light border mb-3">
                        <div className="fw-bold mb-1">{st.desc}</div>
                        <div className="small">{st.detail}</div>

                        {st.pivot !== undefined && (
                          <div className="mt-2 d-flex flex-wrap gap-2">
                            <span className="badge bg-warning text-dark">
                              Pivote: {st.pivot.toFixed(6)}
                            </span>
                            <span className="badge bg-secondary">
                              Posición: ({st.pivotRow}, {st.pivotCol})
                            </span>
                            {st.affectedRow && (
                              <span className="badge bg-info text-dark">
                                Renglón afectado: R{st.affectedRow}
                              </span>
                            )}
                            {st.factor !== undefined && (
                              <span className="badge bg-dark">
                                Factor: {st.factor.toFixed(6)}
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="text-center mb-3">
                        <div className="small text-muted fw-bold mb-1">
                          Operación realizada
                        </div>
                        <div className="font-monospace fs-5">
                          {st.operation || "Matriz inicial"}
                        </div>
                      </div>

                      <div className="table-responsive">
                        <table className="table table-bordered text-center align-middle font-monospace mb-0">
                          <tbody>
                            {st.matrix.map((r, ri) => (
                              <tr key={ri}>
                                {r.map((v, ci) => (
                                  <td
                                    key={ci}
                                    className={
                                      ci === sizeGJ
                                        ? "bg-warning bg-opacity-10 fw-bold"
                                        : ""
                                    }
                                  >
                                    {Math.abs(v) < 1e-10
                                      ? "0.000"
                                      : v.toFixed(3)}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="card-footer bg-light">
                      <div className="d-flex justify-content-between">
                        <button
                          className="btn btn-outline-secondary"
                          disabled={currentStepGJ === 0}
                          onClick={() =>
                            setCurrentStepGJ((p) => Math.max(0, p - 1))
                          }
                        >
                          <i className="bi bi-arrow-left me-1"></i>
                          Anterior
                        </button>

                        <button
                          className="btn btn-outline-danger"
                          onClick={() => setCurrentStepGJ(0)}
                        >
                          <i className="bi bi-arrow-counterclockwise me-1"></i>
                          Reiniciar
                        </button>

                        <button
                          className="btn btn-primary"
                          disabled={currentStepGJ === stepsGJ.length - 1}
                          onClick={() =>
                            setCurrentStepGJ((p) =>
                              Math.min(stepsGJ.length - 1, p + 1)
                            )
                          }
                        >
                          Siguiente
                          <i className="bi bi-arrow-right ms-1"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      )}

      {/* CONTENIDO FACTORIZACIÓN LU */}
      {metodoSeleccionado === "descomposicion_lu" && (
        <div className="bg-white p-4 rounded border shadow-sm">
          <div className="row g-3 align-items-center mb-3">
            <div className="col-auto">
              <label className="fw-bold me-2 small">Forma:</label>
              <select
                className="form-select form-select-sm d-inline-block w-auto"
                value={variantLU}
                onChange={(e) => setVariantLU(e.target.value)}
              >
                <option value="Doolittle">Doolittle (Diag. L = 1)</option>
                <option value="Crout">Crout (Diag. U = 1)</option>
              </select>
            </div>
            <div className="col-auto ms-auto">
              <button className="btn btn-outline-secondary btn-sm me-2" onClick={loadExampleLU}>
                Cargar Ejemplo
              </button>
              <button className="btn btn-success btn-sm" onClick={solveLU}>
                Descomponer y Resolver
              </button>
            </div>
          </div>

          <div className="table-responsive mb-3">
            <table className="table table-bordered text-center align-middle" style={{ maxWidth: "500px" }}>
              <tbody>
                {matrixALU.map((row, r) => (
                  <tr key={r}>
                    {row.map((val, c) => (
                      <td key={c}>
                        <input
                          type="number"
                          className="form-control form-control-sm text-center"
                          value={val}
                          onChange={(e) => {
                            const u = matrixALU.map((ro, ri) =>
                              ro.map((co, ci) => (ri === r && ci === c ? parseFloat(e.target.value) || 0 : co))
                            );
                            setMatrixALU(u);
                          }}
                        />
                      </td>
                    ))}
                    <td className="bg-light fw-bold">|</td>
                    <td>
                      <input
                        type="number"
                        className="form-control form-control-sm text-center bg-success bg-opacity-10 fw-bold"
                        value={vectorBLU[r]}
                        onChange={(e) => {
                          const u = [...vectorBLU];
                          u[r] = parseFloat(e.target.value) || 0;
                          setVectorBLU(u);
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {errorLU && <div className="alert alert-danger py-2">{errorLU}</div>}

          {resultsLU && (
            <div>
              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <div className="card h-100 bg-light border">
                    <div className="card-header bg-white py-2 small fw-bold text-success">
                      Matriz L (Triangular Inferior)
                    </div>
                    <div className="card-body p-2 text-center">
                      <table className="table table-sm table-bordered bg-white mb-0 font-monospace small">
                        <tbody>
                          {resultsLU.L.map((r, ri) => (
                            <tr key={ri}>
                              {r.map((v, ci) => (
                                <td key={ci}>{Math.abs(v) < 1e-10 ? "0.000" : v.toFixed(3)}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="card h-100 bg-light border">
                    <div className="card-header bg-white py-2 small fw-bold text-primary">
                      Matriz U (Triangular Superior)
                    </div>
                    <div className="card-body p-2 text-center">
                      <table className="table table-sm table-bordered bg-white mb-0 font-monospace small">
                        <tbody>
                          {resultsLU.U.map((r, ri) => (
                            <tr key={ri}>
                              {r.map((v, ci) => (
                                <td key={ci}>{Math.abs(v) < 1e-10 ? "0.000" : v.toFixed(3)}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row g-3">
                <div className="col-md-6">
                  <div className="p-3 border rounded bg-white">
                    <h6 className="fw-bold text-info small mb-2">Paso 1: Sustitución Hacia Adelante (L · Y = B)</h6>
                    <div className="d-flex gap-2 font-monospace">
                      {resultsLU.Y.map((y, i) => (
                        <span key={i} className="badge bg-info text-dark p-2">
                          Y<sub>{i + 1}</sub> = {y.toFixed(4)}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="p-3 border rounded bg-white">
                    <h6 className="fw-bold text-success small mb-2">Paso 2: Sustitución Hacia Atrás (U · X = Y)</h6>
                    <div className="d-flex gap-2 font-monospace">
                      {resultsLU.X.map((x, i) => (
                        <span key={i} className="badge bg-success p-2">
                          X<sub>{i + 1}</sub> = {x.toFixed(4)}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SimuladorTab;