import React, { useState } from "react";

// ============================================================
// EJEMPLO INICIAL
// ============================================================
// Este sistema es diagonalmente dominante:
//
//  10x +  2y +  z =  7
//   x +  8y + 2z = -4
//   2x +  y +  9z =  6
//
// Por lo tanto, es apropiado para Jacobi y Gauss-Seidel.

const INITIAL_MATRIX = [
  [10, 2, 1],
  [1, 8, 2],
  [2, 1, 9],
];

const INITIAL_VECTOR_B = [7, -4, 6];

const INITIAL_VECTOR_X0 = [0, 0, 0];

const EPSILON = 1e-12;

// ============================================================
// COMPONENTE
// ============================================================

const SimuladorTab = () => {
  // null | jacobi | gauss_seidel | comparativo
  const [metodoSeleccionado, setMetodoSeleccionado] = useState(null);

  // ------------------------------------------------------------
  // DATOS DEL SISTEMA
  // ------------------------------------------------------------

  const [matrixA, setMatrixA] = useState(INITIAL_MATRIX);
  const [vectorB, setVectorB] = useState(INITIAL_VECTOR_B);
  const [vectorX0, setVectorX0] = useState(INITIAL_VECTOR_X0);

  const [tolerance, setTolerance] = useState(0.001);
  const [maxIter, setMaxIter] = useState(25);

  // ------------------------------------------------------------
  // RESULTADOS
  // ------------------------------------------------------------

  const [resultsJacobi, setResultsJacobi] = useState(null);
  const [resultsGS, setResultsGS] = useState(null);

  // Paso actual para la visualización
  const [currentStep, setCurrentStep] = useState(0);

  // Mensaje general
  const [errorMessage, setErrorMessage] = useState("");

  // ------------------------------------------------------------
  // VERIFICACIÓN DE MATRIZ
  // ------------------------------------------------------------

  const checkDominance = (A) => {
    const n = A.length;

    let strictlyDominant = true;
    const rows = [];

    for (let i = 0; i < n; i++) {
      const diagonal = Math.abs(A[i][i]);

      let sumOffDiagonal = 0;

      for (let j = 0; j < n; j++) {
        if (i !== j) {
          sumOffDiagonal += Math.abs(A[i][j]);
        }
      }

      const dominant = diagonal > sumOffDiagonal;

      rows.push({
        row: i + 1,
        diagonal,
        offDiagonal: sumOffDiagonal,
        dominant,
      });

      if (!dominant) {
        strictlyDominant = false;
      }
    }

    return {
      isDominant: strictlyDominant,
      rows,
    };
  };

  const dominanceInfo = checkDominance(matrixA);

  const isDominant = dominanceInfo.isDominant;

  // ------------------------------------------------------------
  // VALIDAR DIAGONAL
  // ------------------------------------------------------------

  const hasZeroDiagonal = () => {
    return matrixA.some((row, i) => Math.abs(row[i]) < EPSILON);
  };

  // ------------------------------------------------------------
  // CARGAR EJEMPLO
  // ------------------------------------------------------------

  const loadExample = () => {
    setMatrixA(INITIAL_MATRIX.map((row) => [...row]));
    setVectorB([...INITIAL_VECTOR_B]);
    setVectorX0([...INITIAL_VECTOR_X0]);

    setTolerance(0.001);
    setMaxIter(25);

    setResultsJacobi(null);
    setResultsGS(null);
    setCurrentStep(0);
    setErrorMessage("");
  };

  // ============================================================
  // JACOBI
  // ============================================================

  const calculateJacobi = () => {
    const n = matrixA.length;

    let xOld = [...vectorX0];

    const iterations = [];

    let converged = false;
    let finalSolution = [...xOld];

    for (let k = 1; k <= maxIter; k++) {
      const xNew = Array(n).fill(0);

      // --------------------------------------------------------
      // CÁLCULO DE CADA VARIABLE
      // --------------------------------------------------------

      const equations = [];

      for (let i = 0; i < n; i++) {
        let sum = 0;

        const terms = [];

        for (let j = 0; j < n; j++) {
          if (i !== j) {
            sum += matrixA[i][j] * xOld[j];

            terms.push(
              `${matrixA[i][j]}(${xOld[j].toFixed(6)})`
            );
          }
        }

        xNew[i] = (vectorB[i] - sum) / matrixA[i][i];

        equations.push({
          variable: i,
          expression:
            `x${i + 1} = [` +
            `${vectorB[i]} - (${terms.join(" + ")})` +
            `] / ${matrixA[i][i]}`,
          result: xNew[i],
        });
      }

      // --------------------------------------------------------
      // ERRORES
      // --------------------------------------------------------

      const errors = xNew.map((value, i) =>
        Math.abs(value - xOld[i])
      );

      const maxErr = Math.max(...errors);

      // --------------------------------------------------------
      // GUARDAR ITERACIÓN
      // --------------------------------------------------------

      iterations.push({
        iter: k,
        x_in: [...xOld],
        x_out: [...xNew],
        errors,
        maxErr,
        equations,
      });

      finalSolution = [...xNew];

      if (maxErr < tolerance) {
        converged = true;
        break;
      }

      xOld = [...xNew];
    }

    return {
      iters: iterations,
      solution: finalSolution,
      count: iterations.length,
      converged,
    };
  };

  // ============================================================
  // GAUSS-SEIDEL
  // ============================================================

  const calculateGaussSeidel = () => {
    const n = matrixA.length;

    let x = [...vectorX0];

    const iterations = [];

    let converged = false;
    let finalSolution = [...x];

    for (let k = 1; k <= maxIter; k++) {
      const xPrevious = [...x];

      const equations = [];

      // --------------------------------------------------------
      // CÁLCULO SECUENCIAL
      // --------------------------------------------------------

      for (let i = 0; i < n; i++) {
        let sum = 0;

        const terms = [];

        for (let j = 0; j < n; j++) {
          if (i !== j) {
            sum += matrixA[i][j] * x[j];

            terms.push(
              `${matrixA[i][j]}(${x[j].toFixed(6)})`
            );
          }
        }

        const newValue =
          (vectorB[i] - sum) / matrixA[i][i];

        x[i] = newValue;

        equations.push({
          variable: i,
          expression:
            `x${i + 1} = [` +
            `${vectorB[i]} - (${terms.join(" + ")})` +
            `] / ${matrixA[i][i]}`,
          result: newValue,
        });
      }

      // --------------------------------------------------------
      // ERRORES
      // --------------------------------------------------------

      const errors = x.map((value, i) =>
        Math.abs(value - xPrevious[i])
      );

      const maxErr = Math.max(...errors);

      // --------------------------------------------------------
      // GUARDAR ITERACIÓN
      // --------------------------------------------------------

      iterations.push({
        iter: k,
        x_in: [...xPrevious],
        x_out: [...x],
        errors,
        maxErr,
        equations,
      });

      finalSolution = [...x];

      if (maxErr < tolerance) {
        converged = true;
        break;
      }
    }

    return {
      iters: iterations,
      solution: finalSolution,
      count: iterations.length,
      converged,
    };
  };

  // ============================================================
  // EJECUTAR SIMULACIÓN
  // ============================================================

  const runSimulation = () => {
    setResultsJacobi(null);
    setResultsGS(null);
    setCurrentStep(0);
    setErrorMessage("");

    // ----------------------------------------------------------
    // VALIDACIÓN 1: DIMENSIONES
    // ----------------------------------------------------------

    if (
      matrixA.length !== 3 ||
      vectorB.length !== 3 ||
      vectorX0.length !== 3
    ) {
      setErrorMessage(
        "El sistema debe tener una matriz de 3 × 3 y vectores de dimensión 3."
      );
      return;
    }

    // ----------------------------------------------------------
    // VALIDACIÓN 2: DIAGONAL CERO
    // ----------------------------------------------------------

    if (hasZeroDiagonal()) {
      setErrorMessage(
        "No se puede ejecutar el método porque uno de los elementos de la diagonal principal es cero. Los métodos de Jacobi y Gauss-Seidel requieren dividir entre los elementos diagonales."
      );
      return;
    }

    // ----------------------------------------------------------
    // VALIDACIÓN 3: DOMINANCIA DIAGONAL
    // ----------------------------------------------------------

    if (!isDominant) {
      setErrorMessage(
        "La matriz NO es diagonalmente dominante. Los métodos de Jacobi y Gauss-Seidel no se ejecutarán porque no se garantiza la convergencia."
      );
      return;
    }

    // ----------------------------------------------------------
    // JACOBI
    // ----------------------------------------------------------

    if (
      metodoSeleccionado === "jacobi" ||
      metodoSeleccionado === "comparativo"
    ) {
      const resultJ = calculateJacobi();
      setResultsJacobi(resultJ);
    }

    // ----------------------------------------------------------
    // GAUSS-SEIDEL
    // ----------------------------------------------------------

    if (
      metodoSeleccionado === "gauss_seidel" ||
      metodoSeleccionado === "comparativo"
    ) {
      const resultGS = calculateGaussSeidel();
      setResultsGS(resultGS);
    }
  };

  // ============================================================
  // CAMBIAR MÉTODO
  // ============================================================

  const changeMethod = () => {
    setMetodoSeleccionado(null);
    setResultsJacobi(null);
    setResultsGS(null);
    setCurrentStep(0);
    setErrorMessage("");
  };

  // ============================================================
  // MENÚ PRINCIPAL
  // ============================================================

  if (!metodoSeleccionado) {
    return (
      <div className="p-4 border rounded bg-light">

        <div className="text-center mb-4">

          <h4 className="text-primary fw-bold mb-2">
            <i className="bi bi-arrow-repeat me-2"></i>
            Simulador de Métodos Iterativos
          </h4>

          <p className="text-muted">
            Selecciona el método numérico iterativo que deseas simular:
          </p>

        </div>

        <div className="row g-4 justify-content-center">

          {/* JACOBI */}

          <div className="col-md-4">

            <div className="card h-100 shadow-sm border-0 border-top border-4 border-info">

              <div className="card-body p-4 d-flex flex-column text-center">

                <div className="display-5 text-info mb-3">
                  <i className="bi bi-grid-3x3"></i>
                </div>

                <h5 className="fw-bold text-dark mb-2">
                  Método de Jacobi
                </h5>

                <p className="text-muted small flex-grow-1">
                  Calcula todas las variables de una iteración
                  utilizando exclusivamente los valores de la
                  iteración anterior.
                </p>

                <button
                  className="btn btn-info text-white fw-semibold w-100 mt-3"
                  onClick={() => setMetodoSeleccionado("jacobi")}
                >
                  <i className="bi bi-play-circle me-2"></i>
                  Iniciar Jacobi
                </button>

              </div>

            </div>

          </div>

          {/* GAUSS-SEIDEL */}

          <div className="col-md-4">

            <div className="card h-100 shadow-sm border-0 border-top border-4 border-success">

              <div className="card-body p-4 d-flex flex-column text-center">

                <div className="display-5 text-success mb-3">
                  <i className="bi bi-lightning-charge"></i>
                </div>

                <h5 className="fw-bold text-dark mb-2">
                  Método de Gauss-Seidel
                </h5>

                <p className="text-muted small flex-grow-1">
                  Utiliza inmediatamente cada valor recién calculado
                  dentro de la misma iteración.
                </p>

                <button
                  className="btn btn-success fw-semibold w-100 mt-3"
                  onClick={() => setMetodoSeleccionado("gauss_seidel")}
                >
                  <i className="bi bi-play-circle me-2"></i>
                  Iniciar Gauss-Seidel
                </button>

              </div>

            </div>

          </div>

          {/* COMPARATIVO */}

          <div className="col-md-4">

            <div className="card h-100 shadow-sm border-0 border-top border-4 border-primary">

              <div className="card-body p-4 d-flex flex-column text-center">

                <div className="display-5 text-primary mb-3">
                  <i className="bi bi-arrow-left-right"></i>
                </div>

                <h5 className="fw-bold text-dark mb-2">
                  Comparativo
                </h5>

                <p className="text-muted small flex-grow-1">
                  Ejecuta Jacobi y Gauss-Seidel simultáneamente
                  y permite comparar su convergencia paso a paso.
                </p>

                <button
                  className="btn btn-primary fw-semibold w-100 mt-3"
                  onClick={() => setMetodoSeleccionado("comparativo")}
                >
                  <i className="bi bi-play-circle me-2"></i>
                  Comparar Ambos
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>
    );
  }

  // ============================================================
  // FUNCIÓN PARA MOSTRAR ESTADO DE DOMINANCIA
  // ============================================================

  const DominancePanel = () => (
    <div
      className={`alert ${
        isDominant
          ? "alert-success"
          : "alert-warning"
      } border shadow-sm`}
    >

      <div className="fw-bold mb-2">

        <i
          className={`bi ${
            isDominant
              ? "bi-check-circle-fill"
              : "bi-exclamation-triangle-fill"
          } me-2`}
        ></i>

        {isDominant
          ? "La matriz es diagonalmente dominante"
          : "La matriz NO es diagonalmente dominante"}

      </div>

      <div className="small mb-2">

        Para cada renglón se verifica:

        <strong className="ms-1">
          |aᵢᵢ| &gt; Σ|aᵢⱼ|
        </strong>

        <span className="ms-1">
          para los elementos fuera de la diagonal.
        </span>

      </div>

      <div className="table-responsive">

        <table className="table table-sm table-bordered text-center mb-0 bg-white">

          <thead className="table-light">

            <tr>
              <th>Renglón</th>
              <th>|Diagonal|</th>
              <th>Suma fuera diagonal</th>
              <th>¿Dominante?</th>
            </tr>

          </thead>

          <tbody>

            {dominanceInfo.rows.map((row) => (

              <tr key={row.row}>

                <td>R{row.row}</td>

                <td>{row.diagonal.toFixed(4)}</td>

                <td>{row.offDiagonal.toFixed(4)}</td>

                <td>

                  {row.dominant ? (
                    <span className="badge bg-success">
                      Sí
                    </span>
                  ) : (
                    <span className="badge bg-danger">
                      No
                    </span>
                  )}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {!isDominant && (
        <div className="mt-3 fw-bold text-danger">
          Los métodos no se ejecutarán hasta que la matriz
          cumpla la condición de dominancia diagonal estricta.
        </div>
      )}

    </div>
  );

  // ============================================================
  // COMPONENTE PARA MOSTRAR UNA ITERACIÓN
  // ============================================================

  const IterationCard = ({
    result,
    title,
    colorClass,
  }) => {

    if (!result || !result.iters.length) {
      return null;
    }

    const safeStep = Math.min(
      currentStep,
      result.iters.length - 1
    );

    const step = result.iters[safeStep];

    return (
      <div className="card shadow-sm border">

        <div className={`card-header ${colorClass} text-white`}>

          <div className="d-flex justify-content-between align-items-center">

            <span className="fw-bold">
              {title}
            </span>

            <span className="badge bg-white text-dark">
              Iteración {step.iter}
            </span>

          </div>

        </div>

        <div className="card-body">

          {/* ESTADO */}

          <div className="alert alert-light border">

            <div className="small fw-bold mb-2">
              Valores de entrada
            </div>

            <div className="d-flex flex-wrap gap-2">

              {step.x_in.map((value, i) => (

                <span
                  key={i}
                  className="badge bg-secondary p-2"
                >
                  x<sub>{i + 1}</sub> = {value.toFixed(6)}
                </span>

              ))}

            </div>

          </div>

          {/* ECUACIONES */}

          <h6 className="fw-bold mb-2">
            <i className="bi bi-calculator me-2"></i>
            Cálculo de la iteración
          </h6>

          <div className="table-responsive">

            <table className="table table-bordered table-sm align-middle">

              <thead className="table-light">

                <tr>
                  <th>Variable</th>
                  <th>Operación</th>
                  <th>Resultado</th>
                </tr>

              </thead>

              <tbody>

                {step.equations.map((eq) => (

                  <tr key={eq.variable}>

                    <td className="fw-bold">
                      x<sub>{eq.variable + 1}</sub>
                    </td>

                    <td className="font-monospace small">
                      {eq.expression}
                    </td>

                    <td className="fw-bold text-center">
                      {eq.result.toFixed(6)}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

          {/* RESULTADOS */}

          <h6 className="fw-bold mt-3 mb-2">
            Valores calculados
          </h6>

          <div className="d-flex flex-wrap gap-2 mb-3">

            {step.x_out.map((value, i) => (

              <span
                key={i}
                className={`badge ${colorClass} p-2 fs-6`}
              >
                x<sub>{i + 1}</sub> = {value.toFixed(6)}
              </span>

            ))}

          </div>

          {/* ERRORES */}

          <h6 className="fw-bold mb-2">
            Errores
          </h6>

          <div className="table-responsive">

            <table className="table table-sm table-bordered text-center">

              <thead className="table-light">

                <tr>
                  {step.errors.map((_, i) => (
                    <th key={i}>
                      E<sub>{i + 1}</sub>
                    </th>
                  ))}
                  <th>E máx.</th>
                </tr>

              </thead>

              <tbody>

                <tr>

                  {step.errors.map((error, i) => (

                    <td key={i}>
                      {error.toFixed(8)}
                    </td>

                  ))}

                  <td className="fw-bold">
                    {step.maxErr.toFixed(8)}
                  </td>

                </tr>

              </tbody>

            </table>

          </div>

        </div>

      </div>
    );
  };

  // ============================================================
  // VISTA DEL SIMULADOR
  // ============================================================

  return (
    <div className="p-3 border rounded bg-light">

      {/* --------------------------------------------------------
          ENCABEZADO
      --------------------------------------------------------- */}

      <div className="d-flex justify-content-between align-items-center mb-3">

        <div>

          <button
            className="btn btn-outline-secondary btn-sm me-3"
            onClick={changeMethod}
          >
            <i className="bi bi-arrow-left me-1"></i>
            Cambiar Método
          </button>

          <span className="h5 text-primary fw-bold align-middle">

            <i className="bi bi-cpu me-2"></i>

            {metodoSeleccionado === "jacobi" &&
              "Simulador: Método de Jacobi"}

            {metodoSeleccionado === "gauss_seidel" &&
              "Simulador: Método de Gauss-Seidel"}

            {metodoSeleccionado === "comparativo" &&
              "Simulador Comparativo: Jacobi vs. Gauss-Seidel"}

          </span>

        </div>

        <span
          className={`badge ${
            isDominant
              ? "bg-success"
              : "bg-danger"
          }`}
        >
          {isDominant
            ? "Diagonal Dominante"
            : "No Dominante"}
        </span>

      </div>

      {/* --------------------------------------------------------
          CONFIGURACIÓN
      --------------------------------------------------------- */}

      <div className="bg-white p-4 rounded border shadow-sm">

        <div className="row g-4">

          {/* MATRIZ */}

          <div className="col-lg-6">

            <h6 className="fw-bold mb-2">
              Sistema [ A | B ]
            </h6>

            <div className="table-responsive">

              <table
                className="table table-bordered text-center align-middle"
                style={{ maxWidth: "450px" }}
              >

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

                              const value =
                                e.target.value === ""
                                  ? 0
                                  : parseFloat(e.target.value);

                              const newMatrix =
                                matrixA.map((ro, ri) =>
                                  ro.map((co, ci) =>
                                    ri === r && ci === c
                                      ? Number.isFinite(value)
                                        ? value
                                        : 0
                                      : co
                                  )
                                );

                              setMatrixA(newMatrix);

                              setResultsJacobi(null);
                              setResultsGS(null);
                              setCurrentStep(0);
                              setErrorMessage("");

                            }}
                          />

                        </td>

                      ))}

                      <td className="bg-light fw-bold">
                        |
                      </td>

                      <td>

                        <input
                          type="number"
                          className="form-control form-control-sm text-center bg-info bg-opacity-10 fw-bold"
                          value={vectorB[r]}
                          onChange={(e) => {

                            const value =
                              e.target.value === ""
                                ? 0
                                : parseFloat(e.target.value);

                            const newB = [...vectorB];

                            newB[r] =
                              Number.isFinite(value)
                                ? value
                                : 0;

                            setVectorB(newB);

                            setResultsJacobi(null);
                            setResultsGS(null);

                          }}
                        />

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

          {/* PARÁMETROS */}

          <div className="col-lg-6">

            <h6 className="fw-bold mb-2">
              Parámetros
            </h6>

            <div className="row g-2 mb-3">

              <div className="col-4">

                <label className="small text-muted">
                  X₀
                </label>

                <input
                  type="number"
                  className="form-control form-control-sm text-center"
                  value={vectorX0[0]}
                  onChange={(e) => {

                    const value =
                      parseFloat(e.target.value);

                    const newX = [...vectorX0];

                    newX[0] =
                      Number.isFinite(value)
                        ? value
                        : 0;

                    setVectorX0(newX);

                  }}
                />

              </div>

              <div className="col-4">

                <label className="small text-muted">
                  Y₀
                </label>

                <input
                  type="number"
                  className="form-control form-control-sm text-center"
                  value={vectorX0[1]}
                  onChange={(e) => {

                    const value =
                      parseFloat(e.target.value);

                    const newX = [...vectorX0];

                    newX[1] =
                      Number.isFinite(value)
                        ? value
                        : 0;

                    setVectorX0(newX);

                  }}
                />

              </div>

              <div className="col-4">

                <label className="small text-muted">
                  Z₀
                </label>

                <input
                  type="number"
                  className="form-control form-control-sm text-center"
                  value={vectorX0[2]}
                  onChange={(e) => {

                    const value =
                      parseFloat(e.target.value);

                    const newX = [...vectorX0];

                    newX[2] =
                      Number.isFinite(value)
                        ? value
                        : 0;

                    setVectorX0(newX);

                  }}
                />

              </div>

            </div>

            <div className="row g-2 mb-3">

              <div className="col-6">

                <label className="small text-muted">
                  Tolerancia
                </label>

                <input
                  type="number"
                  step="0.0001"
                  min="0"
                  className="form-control form-control-sm"
                  value={tolerance}
                  onChange={(e) => {

                    const value =
                      parseFloat(e.target.value);

                    setTolerance(
                      Number.isFinite(value) && value > 0
                        ? value
                        : 0.001
                    );

                  }}
                />

              </div>

              <div className="col-6">

                <label className="small text-muted">
                  Máx. Iteraciones
                </label>

                <input
                  type="number"
                  min="1"
                  className="form-control form-control-sm"
                  value={maxIter}
                  onChange={(e) => {

                    const value =
                      parseInt(e.target.value, 10);

                    setMaxIter(
                      Number.isFinite(value) && value > 0
                        ? value
                        : 25
                    );

                  }}
                />

              </div>

            </div>

            <div className="d-flex gap-2">

              <button
                className="btn btn-outline-secondary btn-sm w-50"
                onClick={loadExample}
              >
                <i className="bi bi-arrow-clockwise me-1"></i>
                Cargar Ejemplo
              </button>

              <button
                className="btn btn-primary btn-sm fw-bold w-50"
                onClick={runSimulation}
              >
                <i className="bi bi-play-fill me-1"></i>
                Calcular
              </button>

            </div>

          </div>

        </div>

        {/* ------------------------------------------------------
            VERIFICACIÓN DE DOMINANCIA
        ------------------------------------------------------- */}

        <div className="mt-4">

          <DominancePanel />

        </div>

        {/* ------------------------------------------------------
            ERROR / BLOQUEO
        ------------------------------------------------------- */}

        {errorMessage && (

          <div className="alert alert-danger border-danger shadow-sm">

            <div className="fw-bold">

              <i className="bi bi-exclamation-triangle-fill me-2"></i>

              Ejecución detenida

            </div>

            <div className="mt-1">
              {errorMessage}
            </div>

          </div>

        )}

        {/* ======================================================
            RESULTADO SEPARADO
        ======================================================= */}

        {(metodoSeleccionado === "jacobi" ||
          metodoSeleccionado === "gauss_seidel") &&
          (resultsJacobi || resultsGS) && (

          <div className="mt-4">

            <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">

              <h5 className="fw-bold mb-0">

                <i className="bi bi-list-ol me-2"></i>

                Desarrollo paso a paso

              </h5>

              <span className="badge bg-primary">

                Paso {currentStep + 1}

              </span>

            </div>

            <IterationCard
              result={
                metodoSeleccionado === "jacobi"
                  ? resultsJacobi
                  : resultsGS
              }
              title={
                metodoSeleccionado === "jacobi"
                  ? "Método de Jacobi"
                  : "Método de Gauss-Seidel"
              }
              colorClass={
                metodoSeleccionado === "jacobi"
                  ? "bg-info"
                  : "bg-success"
              }
            />

            {/* NAVEGACIÓN */}

            <div className="d-flex justify-content-between align-items-center mt-3">

              <button
                className="btn btn-outline-secondary"
                disabled={currentStep === 0}
                onClick={() =>
                  setCurrentStep((p) => Math.max(0, p - 1))
                }
              >
                <i className="bi bi-arrow-left me-1"></i>
                Anterior
              </button>

              <button
                className="btn btn-outline-danger"
                onClick={() => setCurrentStep(0)}
              >
                <i className="bi bi-arrow-counterclockwise me-1"></i>
                Reiniciar
              </button>

              <button
                className="btn btn-primary"
                disabled={
                  currentStep >=
                  ((metodoSeleccionado === "jacobi"
                    ? resultsJacobi?.iters.length
                    : resultsGS?.iters.length) || 1) - 1
                }
                onClick={() =>
                  setCurrentStep((p) => p + 1)
                }
              >
                Siguiente
                <i className="bi bi-arrow-right ms-1"></i>
              </button>

            </div>

            {/* RESUMEN FINAL */}

            {(
              (metodoSeleccionado === "jacobi"
                ? resultsJacobi
                : resultsGS)
            ) && (

              <div className="alert alert-success mt-3">

                <div className="fw-bold mb-2">
                  Resultado final
                </div>

                <div className="d-flex flex-wrap gap-2">

                  {(
                    metodoSeleccionado === "jacobi"
                      ? resultsJacobi.solution
                      : resultsGS.solution
                  ).map((value, i) => (

                    <span
                      key={i}
                      className="badge bg-success p-2"
                    >
                      x<sub>{i + 1}</sub> =
                      {" "}
                      {value.toFixed(6)}
                    </span>

                  ))}

                </div>

                <div className="small mt-2">

                  {(
                    metodoSeleccionado === "jacobi"
                      ? resultsJacobi
                      : resultsGS
                  ).converged ? (

                    <span>
                      <i className="bi bi-check-circle me-1"></i>
                      El método convergió en{" "}
                      <strong>
                        {(
                          metodoSeleccionado === "jacobi"
                            ? resultsJacobi
                            : resultsGS
                        ).count}
                      </strong>{" "}
                      iteraciones.
                    </span>

                  ) : (

                    <span>
                      <i className="bi bi-exclamation-triangle me-1"></i>
                      Se alcanzó el máximo de iteraciones
                      sin satisfacer la tolerancia.
                    </span>

                  )}

                </div>

              </div>

            )}

          </div>

        )}

        {/* ======================================================
            COMPARATIVO
        ======================================================= */}

        {metodoSeleccionado === "comparativo" &&
          resultsJacobi &&
          resultsGS && (

          <div className="mt-4">

            <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">

              <h5 className="fw-bold mb-0">

                <i className="bi bi-arrow-left-right me-2"></i>

                Desarrollo comparativo paso a paso

              </h5>

              <span className="badge bg-primary">

                Paso {currentStep + 1}

              </span>

            </div>

            {/* AVISO DE DIFERENCIA DE ITERACIONES */}

            {resultsJacobi.iters.length !==
              resultsGS.iters.length && (

              <div className="alert alert-info small">

                <i className="bi bi-info-circle me-2"></i>

                Los métodos alcanzaron la convergencia en
                diferente número de iteraciones. La comparación
                muestra el paso correspondiente de cada método.

              </div>

            )}

            {/* DOS MÉTODOS */}

            <div className="row g-3">

              <div className="col-lg-6">

                <IterationCard
                  result={resultsJacobi}
                  title="Jacobi"
                  colorClass="bg-info"
                />

              </div>

              <div className="col-lg-6">

                <IterationCard
                  result={resultsGS}
                  title="Gauss-Seidel"
                  colorClass="bg-success"
                />

              </div>

            </div>

            {/* NAVEGACIÓN COMPARATIVA */}

            <div className="d-flex justify-content-between align-items-center mt-3">

              <button
                className="btn btn-outline-secondary"
                disabled={currentStep === 0}
                onClick={() =>
                  setCurrentStep((p) =>
                    Math.max(0, p - 1)
                  )
                }
              >
                <i className="bi bi-arrow-left me-1"></i>
                Anterior
              </button>

              <button
                className="btn btn-outline-danger"
                onClick={() => setCurrentStep(0)}
              >
                <i className="bi bi-arrow-counterclockwise me-1"></i>
                Reiniciar
              </button>

              <button
                className="btn btn-primary"
                disabled={
                  currentStep >=
                  Math.max(
                    resultsJacobi.iters.length,
                    resultsGS.iters.length
                  ) - 1
                }
                onClick={() =>
                  setCurrentStep((p) => p + 1)
                }
              >
                Siguiente
                <i className="bi bi-arrow-right ms-1"></i>
              </button>

            </div>

            {/* ==================================================
                RESUMEN COMPARATIVO
            =================================================== */}

            <div className="row g-3 mt-3">

              {/* JACOBI */}

              <div className="col-md-6">

                <div className="card border-info h-100">

                  <div className="card-header bg-info text-white fw-bold">
                    Jacobi
                  </div>

                  <div className="card-body">

                    <div className="mb-2">
                      <strong>Iteraciones:</strong>{" "}
                      {resultsJacobi.count}
                    </div>

                    <div className="mb-2">
                      <strong>Estado:</strong>{" "}
                      {resultsJacobi.converged ? (
                        <span className="badge bg-success">
                          Convergió
                        </span>
                      ) : (
                        <span className="badge bg-warning text-dark">
                          No convergió
                        </span>
                      )}
                    </div>

                    <div>

                      <strong>Solución:</strong>

                      <div className="d-flex flex-wrap gap-2 mt-2">

                        {resultsJacobi.solution.map(
                          (value, i) => (

                            <span
                              key={i}
                              className="badge bg-info text-dark"
                            >
                              x<sub>{i + 1}</sub> =
                              {" "}
                              {value.toFixed(6)}
                            </span>

                          )
                        )}

                      </div>

                    </div>

                  </div>

                </div>

              </div>

              {/* GAUSS-SEIDEL */}

              <div className="col-md-6">

                <div className="card border-success h-100">

                  <div className="card-header bg-success text-white fw-bold">
                    Gauss-Seidel
                  </div>

                  <div className="card-body">

                    <div className="mb-2">
                      <strong>Iteraciones:</strong>{" "}
                      {resultsGS.count}
                    </div>

                    <div className="mb-2">
                      <strong>Estado:</strong>{" "}
                      {resultsGS.converged ? (
                        <span className="badge bg-success">
                          Convergió
                        </span>
                      ) : (
                        <span className="badge bg-warning text-dark">
                          No convergió
                        </span>
                      )}
                    </div>

                    <div>

                      <strong>Solución:</strong>

                      <div className="d-flex flex-wrap gap-2 mt-2">

                        {resultsGS.solution.map(
                          (value, i) => (

                            <span
                              key={i}
                              className="badge bg-success"
                            >
                              x<sub>{i + 1}</sub> =
                              {" "}
                              {value.toFixed(6)}
                            </span>

                          )
                        )}

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        )}

      </div>

    </div>
  );
};

export default SimuladorTab;