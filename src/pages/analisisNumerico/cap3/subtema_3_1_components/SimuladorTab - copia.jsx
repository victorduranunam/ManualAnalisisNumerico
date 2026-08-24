import React, { useState } from "react";

// =============================================================
// EJEMPLOS INICIALES
// =============================================================

const INITIAL_MATRIX_GJ = [
  [2, 1, -1],
  [1, -2, 3],
  [1, 1, -2],
];

const INITIAL_VECTOR_GJ = [1, 6, -3];

const INITIAL_MATRIX_LU = [
  [1, 2, -1],
  [-1, 3, 1],
  [2, 1, 1],
];

const INITIAL_VECTOR_LU = [2, 8, 7];


// =============================================================
// COMPONENTE PRINCIPAL
// =============================================================

const SimuladorTab = () => {

  // ===========================================================
  // MÉTODO SELECCIONADO
  // ===========================================================

  const [metodoSeleccionado, setMetodoSeleccionado] = useState(null);


  // ===========================================================
  // ESTADOS - GAUSS JORDAN
  // ===========================================================

  const [sizeGJ, setSizeGJ] = useState(3);

  const [matrixAGJ, setMatrixAGJ] = useState(INITIAL_MATRIX_GJ);

  const [vectorBGJ, setVectorBGJ] = useState(INITIAL_VECTOR_GJ);

  const [usePivoting, setUsePivoting] = useState(true);

  const [stepsGJ, setStepsGJ] = useState([]);

  const [currentStepGJ, setCurrentStepGJ] = useState(0);

  const [solutionGJ, setSolutionGJ] = useState(null);

  const [errorGJ, setErrorGJ] = useState("");


  // ===========================================================
  // CAMBIAR DIMENSIÓN GAUSS-JORDAN
  // ===========================================================

  const handleSizeChangeGJ = (newSize) => {

    const n = parseInt(newSize, 10);

    setSizeGJ(n);

    const newA = Array(n)
      .fill(0)
      .map((_, r) =>
        Array(n)
          .fill(0)
          .map((_, c) => (r === c ? 1 : 0))
      );

    const newB = Array(n).fill(0);

    setMatrixAGJ(newA);
    setVectorBGJ(newB);

    setStepsGJ([]);
    setCurrentStepGJ(0);
    setSolutionGJ(null);
    setErrorGJ("");
  };


  // ===========================================================
  // CARGAR EJEMPLO GAUSS-JORDAN
  // ===========================================================

  const loadExampleGJ = () => {

    setSizeGJ(3);

    setMatrixAGJ(
      INITIAL_MATRIX_GJ.map((row) => [...row])
    );

    setVectorBGJ([...INITIAL_VECTOR_GJ]);

    setStepsGJ([]);
    setCurrentStepGJ(0);
    setSolutionGJ(null);
    setErrorGJ("");
  };


  // ===========================================================
  // SOLVER GAUSS-JORDAN
  // ===========================================================

  const solveGaussJordan = () => {

    setErrorGJ("");
    setStepsGJ([]);
    setCurrentStepGJ(0);
    setSolutionGJ(null);

    const n = sizeGJ;

    let M = matrixAGJ.map((row, i) => [
      ...row,
      vectorBGJ[i],
    ]);

    const stepList = [];

    const cloneMatrix = () =>
      M.map((row) => [...row]);


    // ---------------------------------------------------------
    // PASO INICIAL
    // ---------------------------------------------------------

    stepList.push({
      type: "inicio",

      title: "Matriz inicial ampliada",

      desc:
        "Se inicia el proceso de Gauss-Jordan con la matriz ampliada [ A | B ].",

      detail:
        `Matriz de ${n} × ${n}. Se procesarán los pivotes de izquierda a derecha.`,

      matrix: cloneMatrix(),
    });


    // =========================================================
    // CICLO PRINCIPAL
    // =========================================================

    for (let i = 0; i < n; i++) {

      // -------------------------------------------------------
      // SELECCIÓN DEL PIVOTE
      // -------------------------------------------------------

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

            title:
              `Intercambio de renglones R${oldRow} ↔ R${newRow}`,

            desc:
              `Se selecciona como pivote el mayor valor absoluto disponible en la columna ${i + 1}.`,

            detail:
              `Pivote seleccionado: ${pivotCandidate.toFixed(6)} ` +
              `(posición: fila ${newRow}, columna ${i + 1}). ` +
              `Se intercambia R${oldRow} con R${newRow}.`,

            pivot: pivotCandidate,

            pivotRow: newRow,

            pivotCol: i + 1,

            operation:
              `R${oldRow} ↔ R${newRow}`,

            matrix: cloneMatrix(),
          });

        } else {

          stepList.push({

            type: "pivote",

            title:
              `Selección del pivote ${i + 1}`,

            desc:
              `Se selecciona el pivote de la columna ${i + 1} sin intercambio de renglones.`,

            detail:
              `Pivote: ${M[i][i].toFixed(6)} ` +
              `(posición: fila ${i + 1}, columna ${i + 1}). ` +
              `No fue necesario intercambiar renglones.`,

            pivot: M[i][i],

            pivotRow: i + 1,

            pivotCol: i + 1,

            operation:
              "Sin intercambio",

            matrix: cloneMatrix(),
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

          title:
            `Selección del pivote ${i + 1}`,

          desc:
            "Se utiliza directamente el elemento de la diagonal como pivote.",

          detail:
            `Pivote: ${M[i][i].toFixed(6)} ` +
            `(posición: fila ${i + 1}, columna ${i + 1}). ` +
            `Pivoteo parcial desactivado.`,

          pivot: M[i][i],

          pivotRow: i + 1,

          pivotCol: i + 1,

          operation:
            "Sin intercambio",

          matrix: cloneMatrix(),
        });
      }


      // -------------------------------------------------------
      // NORMALIZACIÓN
      // -------------------------------------------------------

      const pivot = M[i][i];


      for (let c = 0; c <= n; c++) {

        M[i][c] =
          M[i][c] / pivot;
      }


      stepList.push({

        type: "normalizacion",

        title:
          `Normalización del renglón R${i + 1}`,

        desc:
          "Se convierte el pivote en 1.",

        detail:
          `Pivote utilizado: ${pivot.toFixed(6)} ` +
          `(fila ${i + 1}, columna ${i + 1}).`,

        pivot,

        pivotRow: i + 1,

        pivotCol: i + 1,

        operation:
          `R${i + 1} = R${i + 1} / (${pivot.toFixed(6)})`,

        matrix: cloneMatrix(),
      });


      // -------------------------------------------------------
      // ELIMINACIÓN
      // -------------------------------------------------------

      for (let j = 0; j < n; j++) {

        if (j !== i) {

          const factor = M[j][i];


          if (Math.abs(factor) > 1e-12) {

            for (let c = 0; c <= n; c++) {

              M[j][c] =
                M[j][c] -
                factor * M[i][c];
            }


            stepList.push({

              type: "eliminacion",

              title:
                `Eliminación en R${j + 1}`,

              desc:
                `Se hace cero el elemento de la columna ${i + 1} que se encuentra en R${j + 1}.`,

              detail:
                `Pivote utilizado: ${M[i][i].toFixed(6)} ` +
                `(fila ${i + 1}, columna ${i + 1}). ` +
                `Factor de eliminación: ${factor.toFixed(6)}.`,

              pivot:
                M[i][i],

              pivotRow:
                i + 1,

              pivotCol:
                i + 1,

              affectedRow:
                j + 1,

              factor,

              operation:
                `R${j + 1} = R${j + 1} - (${factor.toFixed(6)}) × R${i + 1}`,

              matrix:
                cloneMatrix(),
            });
          }
        }
      }
    }


    // ---------------------------------------------------------
    // PASO FINAL
    // ---------------------------------------------------------

    stepList.push({

      type: "final",

      title:
        "Matriz identidad y solución",

      desc:
        "Todos los pivotes son 1 y los demás elementos de las columnas pivote son 0.",

      detail:
        "La matriz de coeficientes se ha transformado en la matriz identidad.",

      matrix:
        cloneMatrix(),
    });


    setStepsGJ(stepList);

    setCurrentStepGJ(0);

    setSolutionGJ(
      M.map((row) => row[n])
    );
  };


  // ===========================================================
  // ESTADOS - LU
  // ===========================================================

  const [matrixALU, setMatrixALU] =
    useState(INITIAL_MATRIX_LU);

  const [vectorBLU, setVectorBLU] =
    useState(INITIAL_VECTOR_LU);

  const [variantLU, setVariantLU] =
    useState("Doolittle");

  const [resultsLU, setResultsLU] =
    useState(null);

  const [stepsLU, setStepsLU] =
    useState([]);

  const [currentStepLU, setCurrentStepLU] =
    useState(0);

  const [errorLU, setErrorLU] =
    useState("");


  // ===========================================================
  // CARGAR EJEMPLO LU
  // ===========================================================

  const loadExampleLU = () => {

    setMatrixALU(
      INITIAL_MATRIX_LU.map((row) => [...row])
    );

    setVectorBLU(
      [...INITIAL_VECTOR_LU]
    );

    setResultsLU(null);

    setStepsLU([]);

    setCurrentStepLU(0);

    setErrorLU("");
  };


  // ===========================================================
  // SOLVER LU PASO A PASO
  // ===========================================================

  const solveLU = () => {

    setErrorLU("");

    setResultsLU(null);

    setStepsLU([]);

    setCurrentStepLU(0);


    const n = 3;

    const A =
      matrixALU.map((row) => [...row]);

    const B =
      [...vectorBLU];


    let L;

    let U;


    const steps = [];


    const clone = (matrix) =>
      matrix.map((row) => [...row]);


    // =========================================================
    // PASO 1 - MATRIZ INICIAL
    // =========================================================

    steps.push({

      type: "inicio",

      title:
        "Matriz inicial",

      desc:
        "Se parte del sistema A · X = B.",

      detail:
        "La matriz A se descompondrá como A = L · U. " +
        "Posteriormente se resolverán los sistemas L · Y = B y U · X = Y.",

      A:
        clone(A),

      B:
        [...B],
    });


    // =========================================================
    // DOOLITTLE
    // =========================================================

    if (variantLU === "Doolittle") {

      L = Array(n)
        .fill(0)
        .map((_, r) =>
          Array(n)
            .fill(0)
            .map((_, c) =>
              r === c ? 1 : 0
            )
        );


      U = Array(n)
        .fill(0)
        .map(() =>
          Array(n).fill(0)
        );


      steps.push({

        type:
          "inicializacion",

        title:
          "Inicialización de L y U",

        desc:
          "En Doolittle, la diagonal principal de L está formada por unos.",

        detail:
          "Se inicia L como matriz triangular inferior con diagonal unitaria " +
          "y U como matriz triangular superior.",

        L:
          clone(L),

        U:
          clone(U),
      });


      // -------------------------------------------------------
      // CICLO DOOLITTLE
      // -------------------------------------------------------

      for (let i = 0; i < n; i++) {


        // -----------------------------------------------------
        // CALCULAR FILA DE U
        // -----------------------------------------------------

        for (let k = i; k < n; k++) {

          let sum = 0;


          for (let j = 0; j < i; j++) {

            sum +=
              L[i][j] *
              U[j][k];
          }


          U[i][k] =
            A[i][k] - sum;


          if (
            Math.abs(U[i][i]) < 1e-12 &&
            i === k
          ) {

            throw new Error(
              `Pivote nulo en U[${i + 1}, ${i + 1}].`
            );
          }


          steps.push({

            type:
              "U",

            title:
              `Cálculo de U${i + 1}${k + 1}`,

            desc:
              `Se calcula el elemento U${i + 1}${k + 1}.`,

            detail:
              `U${i + 1}${k + 1} = A${i + 1}${k + 1} - Σ(L${i + 1}j · Uj${k + 1})`,

            formula:
              `U[${i + 1},${k + 1}] = ` +
              `${A[i][k].toFixed(6)} - ` +
              `${sum.toFixed(6)} = ` +
              `${U[i][k].toFixed(6)}`,

            L:
              clone(L),

            U:
              clone(U),
          });
        }


        // -----------------------------------------------------
        // CALCULAR COLUMNA DE L
        // -----------------------------------------------------

        for (
          let k = i + 1;
          k < n;
          k++
        ) {

          let sum = 0;


          for (let j = 0; j < i; j++) {

            sum +=
              L[k][j] *
              U[j][i];
          }


          L[k][i] =
            (A[k][i] - sum) /
            U[i][i];


          steps.push({

            type:
              "L",

            title:
              `Cálculo de L${k + 1}${i + 1}`,

            desc:
              `Se calcula el elemento L${k + 1}${i + 1}.`,

            detail:
              `L${k + 1}${i + 1} = ` +
              `(A${k + 1}${i + 1} - Σ(L${k + 1}j · Uj${i + 1})) / U${i + 1}${i + 1}`,

            formula:
              `L[${k + 1},${i + 1}] = ` +
              `(${A[k][i].toFixed(6)} - ` +
              `${sum.toFixed(6)}) / ` +
              `${U[i][i].toFixed(6)} = ` +
              `${L[k][i].toFixed(6)}`,

            L:
              clone(L),

            U:
              clone(U),
          });
        }
      }


    // =========================================================
    // CROUT
    // =========================================================

    } else {

      L = Array(n)
        .fill(0)
        .map(() =>
          Array(n).fill(0)
        );


      U = Array(n)
        .fill(0)
        .map((_, r) =>
          Array(n)
            .fill(0)
            .map((_, c) =>
              r === c ? 1 : 0
            )
        );


      steps.push({

        type:
          "inicializacion",

        title:
          "Inicialización de L y U",

        desc:
          "En Crout, la diagonal principal de U está formada por unos.",

        detail:
          "Se inicia L como matriz triangular inferior " +
          "y U como matriz triangular superior con diagonal unitaria.",

        L:
          clone(L),

        U:
          clone(U),
      });


      // -------------------------------------------------------
      // CICLO CROUT
      // -------------------------------------------------------

      for (let i = 0; i < n; i++) {


        // -----------------------------------------------------
        // CALCULAR COLUMNA DE L
        // -----------------------------------------------------

        for (
          let k = i;
          k < n;
          k++
        ) {

          let sum = 0;


          for (let j = 0; j < i; j++) {

            sum +=
              L[k][j] *
              U[j][i];
          }


          L[k][i] =
            A[k][i] - sum;


          if (
            Math.abs(L[i][i]) < 1e-12 &&
            i === k
          ) {

            throw new Error(
              `Pivote nulo en L[${i + 1}, ${i + 1}].`
            );
          }


          steps.push({

            type:
              "L",

            title:
              `Cálculo de L${k + 1}${i + 1}`,

            desc:
              `Se calcula el elemento L${k + 1}${i + 1}.`,

            detail:
              `L${k + 1}${i + 1} = A${k + 1}${i + 1} - Σ(L${k + 1}j · Uj${i + 1})`,

            formula:
              `L[${k + 1},${i + 1}] = ` +
              `${A[k][i].toFixed(6)} - ` +
              `${sum.toFixed(6)} = ` +
              `${L[k][i].toFixed(6)}`,

            L:
              clone(L),

            U:
              clone(U),
          });
        }


        // -----------------------------------------------------
        // CALCULAR FILA DE U
        // -----------------------------------------------------

        for (
          let k = i + 1;
          k < n;
          k++
        ) {

          let sum = 0;


          for (let j = 0; j < i; j++) {

            sum +=
              L[i][j] *
              U[j][k];
          }


          U[i][k] =
            (A[i][k] - sum) /
            L[i][i];


          steps.push({

            type:
              "U",

            title:
              `Cálculo de U${i + 1}${k + 1}`,

            desc:
              `Se calcula el elemento U${i + 1}${k + 1}.`,

            detail:
              `U${i + 1}${k + 1} = ` +
              `(A${i + 1}${k + 1} - Σ(L${i + 1}j · Uj${k + 1})) / L${i + 1}${i + 1}`,

            formula:
              `U[${i + 1},${k + 1}] = ` +
              `(${A[i][k].toFixed(6)} - ` +
              `${sum.toFixed(6)}) / ` +
              `${L[i][i].toFixed(6)} = ` +
              `${U[i][k].toFixed(6)}`,

            L:
              clone(L),

            U:
              clone(U),
          });
        }
      }
    }


    // =========================================================
    // FACTORIZACIÓN TERMINADA
    // =========================================================

    steps.push({

      type:
        "factorizacion",

      title:
        "Factorización LU completada",

      desc:
        "Se obtuvo la factorización A = L · U.",

      detail:
        `La matriz A ha sido factorizada mediante ${variantLU}.`,

      L:
        clone(L),

      U:
        clone(U),
    });


    // =========================================================
    // SUSTITUCIÓN HACIA ADELANTE
    // =========================================================

    const Y =
      Array(n).fill(0);


    steps.push({

      type:
        "inicioY",

      title:
        "Sustitución hacia adelante",

      desc:
        "Se resuelve el sistema L · Y = B.",

      detail:
        "Como L es triangular inferior, los valores de Y se calculan de arriba hacia abajo.",

      L:
        clone(L),

      U:
        clone(U),

      Y:
        [...Y],

      B:
        [...B],
    });


    for (let i = 0; i < n; i++) {

      let sum = 0;


      for (let j = 0; j < i; j++) {

        sum +=
          L[i][j] *
          Y[j];
      }


      Y[i] =
        (B[i] - sum) /
        L[i][i];


      steps.push({

        type:
          "Y",

        title:
          `Cálculo de Y${i + 1}`,

        desc:
          `Se calcula la incógnita Y${i + 1}.`,

        detail:
          `Y${i + 1} = (B${i + 1} - Σ(L${i + 1}j · Yj)) / L${i + 1}${i + 1}`,

        formula:
          `Y${i + 1} = ` +
          `(${B[i].toFixed(6)} - ` +
          `${sum.toFixed(6)}) / ` +
          `${L[i][i].toFixed(6)} = ` +
          `${Y[i].toFixed(6)}`,

        L:
          clone(L),

        U:
          clone(U),

        Y:
          [...Y],

        B:
          [...B],
      });
    }


    // =========================================================
    // SUSTITUCIÓN HACIA ATRÁS
    // =========================================================

    const X =
      Array(n).fill(0);


    steps.push({

      type:
        "inicioX",

      title:
        "Sustitución hacia atrás",

      desc:
        "Se resuelve el sistema U · X = Y.",

      detail:
        "Como U es triangular superior, los valores de X se calculan de abajo hacia arriba.",

      L:
        clone(L),

      U:
        clone(U),

      Y:
        [...Y],

      X:
        [...X],
    });


    for (
      let i = n - 1;
      i >= 0;
      i--
    ) {

      let sum = 0;


      for (
        let j = i + 1;
        j < n;
        j++
      ) {

        sum +=
          U[i][j] *
          X[j];
      }


      X[i] =
        (Y[i] - sum) /
        U[i][i];


      steps.push({

        type:
          "X",

        title:
          `Cálculo de X${i + 1}`,

        desc:
          `Se calcula la incógnita X${i + 1}.`,

        detail:
          `X${i + 1} = (Y${i + 1} - Σ(U${i + 1}j · Xj)) / U${i + 1}${i + 1}`,

        formula:
          `X${i + 1} = ` +
          `(${Y[i].toFixed(6)} - ` +
          `${sum.toFixed(6)}) / ` +
          `${U[i][i].toFixed(6)} = ` +
          `${X[i].toFixed(6)}`,

        L:
          clone(L),

        U:
          clone(U),

        Y:
          [...Y],

        X:
          [...X],
      });
    }


    // =========================================================
    // SOLUCIÓN FINAL
    // =========================================================

    steps.push({

      type:
        "final",

      title:
        "Solución del sistema",

      desc:
        "Se ha obtenido el vector solución X.",

      detail:
        "La solución se obtiene después de la factorización LU y las dos sustituciones.",

      L:
        clone(L),

      U:
        clone(U),

      Y:
        [...Y],

      X:
        [...X],
    });


    setResultsLU({
      L,
      U,
      Y,
      X,
    });


    setStepsLU(steps);

    setCurrentStepLU(0);
  };


  // ===========================================================
  // MENÚ DE SELECCIÓN
  // ===========================================================

  if (!metodoSeleccionado) {

    return (

      <div className="p-4 border rounded bg-light">

        <div className="text-center mb-4">

          <h4 className="text-primary fw-bold mb-2">

            <i className="bi bi-grid-3x3-gap-fill me-2"></i>

            Simulador de Métodos Directos

          </h4>

          <p className="text-muted">

            Selecciona el método numérico matricial que deseas simular paso a paso:

          </p>

        </div>


        <div className="row g-4 justify-content-center">

          {/* =================================================
              CARD GAUSS-JORDAN
          ================================================= */}

          <div className="col-md-5">

            <div className="card h-100 shadow-sm border-0 border-top border-4 border-primary">

              <div className="card-body p-4 d-flex flex-column text-center">

                <div className="display-5 text-primary mb-3">

                  <i className="bi bi-calculator"></i>

                </div>

                <h5 className="fw-bold text-dark mb-2">

                  Método de Gauss-Jordan

                </h5>

                <p className="text-muted small flex-grow-1">

                  Transformación elemental por renglones de la matriz ampliada hasta convertirla en la matriz identidad y obtener la solución única de forma directa.

                </p>

                <button
                  className="btn btn-primary fw-semibold w-100 mt-3"
                  onClick={() =>
                    setMetodoSeleccionado("gauss_jordan")
                  }
                >

                  <i className="bi bi-play-circle me-2"></i>

                  Iniciar Gauss-Jordan

                </button>

              </div>

            </div>

          </div>


          {/* =================================================
              CARD LU
          ================================================= */}

          <div className="col-md-5">

            <div className="card h-100 shadow-sm border-0 border-top border-4 border-success">

              <div className="card-body p-4 d-flex flex-column text-center">

                <div className="display-5 text-success mb-3">

                  <i className="bi bi-layers-half"></i>

                </div>

                <h5 className="fw-bold text-dark mb-2">

                  Descomposición y Solución LU

                </h5>

                <p className="text-muted small flex-grow-1">

                  Factorización de la matriz en producto A = L · U mediante Doolittle o Crout y resolución paso a paso mediante sustitución hacia adelante y hacia atrás.

                </p>

                <button
                  className="btn btn-success fw-semibold text-white w-100 mt-3"
                  onClick={() =>
                    setMetodoSeleccionado("descomposicion_lu")
                  }
                >

                  <i className="bi bi-play-circle me-2"></i>

                  Iniciar Factorización LU

                </button>

              </div>

            </div>

          </div>

        </div>

      </div>
    );
  }


  // ===========================================================
  // SIMULADOR
  // ===========================================================

  return (

    <div className="p-3 border rounded bg-light">

      {/* =====================================================
          CABECERA
      ===================================================== */}

      <div className="d-flex justify-content-between align-items-center mb-3">

        <div>

          <button
            className="btn btn-outline-secondary btn-sm me-3"
            onClick={() => {

              setMetodoSeleccionado(null);

              setStepsGJ([]);

              setStepsLU([]);

            }}
          >

            <i className="bi bi-arrow-left me-1"></i>

            Cambiar Método

          </button>


          <span className="h5 text-primary fw-bold align-middle mb-0">

            <i className="bi bi-cpu me-2"></i>

            {metodoSeleccionado === "gauss_jordan"
              ? "Simulador: Método de Gauss-Jordan"
              : "Simulador: Descomposición y Solución con LU"}

          </span>

        </div>

      </div>


      {/* =====================================================
          GAUSS-JORDAN
      ===================================================== */}

      {metodoSeleccionado === "gauss_jordan" && (

        <div className="bg-white p-4 rounded border shadow-sm">

          <div className="row g-3 align-items-center mb-3">

            <div className="col-auto">

              <label className="fw-bold me-2 small">

                Dimensión:

              </label>

              <select
                className="form-select form-select-sm d-inline-block w-auto"
                value={sizeGJ}
                onChange={(e) =>
                  handleSizeChangeGJ(e.target.value)
                }
              >

                <option value="2">
                  2 × 2
                </option>

                <option value="3">
                  3 × 3
                </option>

                <option value="4">
                  4 × 4
                </option>

              </select>

            </div>


            <div className="col-auto">

              <div className="form-check form-switch mt-1">

                <input
                  className="form-check-input"
                  type="checkbox"
                  id="pivotCheck"
                  checked={usePivoting}
                  onChange={(e) =>
                    setUsePivoting(e.target.checked)
                  }
                />

                <label
                  className="form-check-label fw-bold small"
                  htmlFor="pivotCheck"
                >

                  Pivoteo Parcial

                </label>

              </div>

            </div>


            <div className="col-auto ms-auto">

              <button
                className="btn btn-outline-secondary btn-sm me-2"
                onClick={loadExampleGJ}
              >

                Cargar Ejemplo

              </button>


              <button
                className="btn btn-primary btn-sm"
                onClick={solveGaussJordan}
              >

                Resolver Sistema

              </button>

            </div>

          </div>


          {/* MATRIZ GAUSS-JORDAN */}

          <div className="table-responsive mb-3">

            <table
              className="table table-bordered text-center align-middle"
              style={{
                maxWidth: "550px",
              }}
            >

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

                            const u =
                              matrixAGJ.map(
                                (ro, ri) =>
                                  ro.map(
                                    (co, ci) =>
                                      ri === r &&
                                      ci === c
                                        ? parseFloat(
                                            e.target.value
                                          ) || 0
                                        : co
                                  )
                              );

                            setMatrixAGJ(u);
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
                        className="form-control form-control-sm text-center bg-primary bg-opacity-10 fw-bold"
                        value={vectorBGJ[r]}
                        onChange={(e) => {

                          const u =
                            [...vectorBGJ];

                          u[r] =
                            parseFloat(
                              e.target.value
                            ) || 0;

                          setVectorBGJ(u);
                        }}
                      />

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>


          {errorGJ && (

            <div className="alert alert-danger py-2">

              {errorGJ}

            </div>

          )}


          {/* SOLUCIÓN */}

          {solutionGJ && (

            <div className="alert alert-success border-0 shadow-sm p-3 mb-3">

              <h6 className="fw-bold mb-2">

                Solución Única:

              </h6>

              <div className="d-flex flex-wrap gap-3 font-monospace">

                {solutionGJ.map((val, i) => (

                  <span
                    key={i}
                    className="badge bg-success p-2 fs-6"
                  >

                    x<sub>{i + 1}</sub> =
                    {" "}
                    {val.toFixed(5)}

                  </span>

                ))}

              </div>

            </div>

          )}


          {/* PASOS GAUSS-JORDAN */}

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

                const st =
                  stepsGJ[currentStepGJ];

                return (

                  <div className="card shadow-sm border-primary">

                    <div className="card-header bg-primary text-white">

                      <div className="fw-bold">

                        Paso {currentStepGJ + 1}:
                        {" "}
                        {st.title}

                      </div>

                    </div>


                    <div className="card-body">

                      <div className="alert alert-light border mb-3">

                        <div className="fw-bold mb-1">

                          {st.desc}

                        </div>

                        <div className="small">

                          {st.detail}

                        </div>


                        {st.pivot !== undefined && (

                          <div className="mt-2 d-flex flex-wrap gap-2">

                            <span className="badge bg-warning text-dark">

                              Pivote:
                              {" "}
                              {st.pivot.toFixed(6)}

                            </span>

                            <span className="badge bg-secondary">

                              Posición:
                              {" "}
                              ({st.pivotRow},{" "}
                              {st.pivotCol})

                            </span>

                            {st.affectedRow && (

                              <span className="badge bg-info text-dark">

                                Renglón afectado:
                                {" "}
                                R{st.affectedRow}

                              </span>

                            )}

                            {st.factor !== undefined && (

                              <span className="badge bg-dark">

                                Factor:
                                {" "}
                                {st.factor.toFixed(6)}

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

                          {st.operation ||
                            "Matriz inicial"}

                        </div>

                      </div>


                      <div className="table-responsive">

                        <table className="table table-bordered text-center align-middle font-monospace mb-0">

                          <tbody>

                            {st.matrix.map(
                              (r, ri) => (

                                <tr key={ri}>

                                  {r.map(
                                    (v, ci) => (

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

                                    )
                                  )}

                                </tr>

                              )
                            )}

                          </tbody>

                        </table>

                      </div>

                    </div>


                    <div className="card-footer bg-light">

                      <div className="d-flex justify-content-between">

                        <button
                          className="btn btn-outline-secondary"
                          disabled={
                            currentStepGJ === 0
                          }
                          onClick={() =>
                            setCurrentStepGJ(
                              (p) =>
                                Math.max(
                                  0,
                                  p - 1
                                )
                            )
                          }
                        >

                          <i className="bi bi-arrow-left me-1"></i>

                          Anterior

                        </button>


                        <button
                          className="btn btn-outline-danger"
                          onClick={() =>
                            setCurrentStepGJ(0)
                          }
                        >

                          <i className="bi bi-arrow-counterclockwise me-1"></i>

                          Reiniciar

                        </button>


                        <button
                          className="btn btn-primary"
                          disabled={
                            currentStepGJ ===
                            stepsGJ.length - 1
                          }
                          onClick={() =>
                            setCurrentStepGJ(
                              (p) =>
                                Math.min(
                                  stepsGJ.length - 1,
                                  p + 1
                                )
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


      {/* =====================================================
          LU
      ===================================================== */}

      {metodoSeleccionado === "descomposicion_lu" && (

        <div className="bg-white p-4 rounded border shadow-sm">


          {/* CONTROLES */}

          <div className="row g-3 align-items-center mb-3">

            <div className="col-auto">

              <label className="fw-bold me-2 small">

                Forma:

              </label>

              <select
                className="form-select form-select-sm d-inline-block w-auto"
                value={variantLU}
                onChange={(e) => {

                  setVariantLU(
                    e.target.value
                  );

                  setResultsLU(null);
                  setStepsLU([]);
                  setCurrentStepLU(0);
                  setErrorLU("");
                }}
              >

                <option value="Doolittle">

                  Doolittle
                  {" "}
                  (Diag. L = 1)

                </option>

                <option value="Crout">

                  Crout
                  {" "}
                  (Diag. U = 1)

                </option>

              </select>

            </div>


            <div className="col-auto ms-auto">

              <button
                className="btn btn-outline-secondary btn-sm me-2"
                onClick={loadExampleLU}
              >

                Cargar Ejemplo

              </button>


              <button
                className="btn btn-success btn-sm"
                onClick={solveLU}
              >

                Descomponer y Resolver

              </button>

            </div>

          </div>


          {/* MATRIZ LU */}

          <div className="table-responsive mb-3">

            <table
              className="table table-bordered text-center align-middle"
              style={{
                maxWidth: "500px",
              }}
            >

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

                            const u =
                              matrixALU.map(
                                (ro, ri) =>
                                  ro.map(
                                    (co, ci) =>
                                      ri === r &&
                                      ci === c
                                        ? parseFloat(
                                            e.target.value
                                          ) || 0
                                        : co
                                  )
                              );

                            setMatrixALU(u);

                            setResultsLU(null);
                            setStepsLU([]);
                            setCurrentStepLU(0);
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
                        className="form-control form-control-sm text-center bg-success bg-opacity-10 fw-bold"
                        value={vectorBLU[r]}
                        onChange={(e) => {

                          const u =
                            [...vectorBLU];

                          u[r] =
                            parseFloat(
                              e.target.value
                            ) || 0;

                          setVectorBLU(u);

                          setResultsLU(null);
                          setStepsLU([]);
                          setCurrentStepLU(0);
                        }}
                      />

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>


          {errorLU && (

            <div className="alert alert-danger py-2">

              {errorLU}

            </div>

          )}


          {/* =================================================
              DESARROLLO LU
          ================================================= */}

          {stepsLU.length > 0 && (

            <div className="mt-4">


              {/* ENCABEZADO */}

              <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">

                <h6 className="fw-bold mb-0">

                  <i className="bi bi-list-ol me-2"></i>

                  Desarrollo paso a paso de LU

                </h6>


                <span className="badge bg-success">

                  Paso {currentStepLU + 1}
                  {" "}
                  de
                  {" "}
                  {stepsLU.length}

                </span>

              </div>


              {(() => {

                const st =
                  stepsLU[currentStepLU];


                return (

                  <div className="card shadow-sm border-success">


                    {/* HEADER */}

                    <div className="card-header bg-success text-white">

                      <div className="fw-bold">

                        Paso {currentStepLU + 1}:
                        {" "}
                        {st.title}

                      </div>

                    </div>


                    {/* BODY */}

                    <div className="card-body">


                      {/* EXPLICACIÓN */}

                      <div className="alert alert-light border mb-3">

                        <div className="fw-bold mb-1">

                          {st.desc}

                        </div>


                        <div className="small">

                          {st.detail}

                        </div>


                        {/* FÓRMULA */}

                        {st.formula && (

                          <div className="mt-3 p-3 bg-dark text-white rounded font-monospace">

                            {st.formula}

                          </div>

                        )}

                      </div>


                      {/* MATRICES L Y U */}

                      {(st.L || st.U) && (

                        <div className="row g-3 mb-3">


                          {/* MATRIZ L */}

                          {st.L && (

                            <div className="col-md-6">

                              <div className="card border-success h-100">

                                <div className="card-header bg-success bg-opacity-10 fw-bold text-success">

                                  Matriz L

                                </div>


                                <div className="card-body text-center">

                                  <table className="table table-bordered table-sm mb-0 font-monospace">

                                    <tbody>

                                      {st.L.map(
                                        (row, ri) => (

                                          <tr key={ri}>

                                            {row.map(
                                              (
                                                value,
                                                ci
                                              ) => (

                                                <td key={ci}>

                                                  {Math.abs(
                                                    value
                                                  ) < 1e-10
                                                    ? "0.000"
                                                    : value.toFixed(
                                                        3
                                                      )}

                                                </td>

                                              )
                                            )}

                                          </tr>

                                        )
                                      )}

                                    </tbody>

                                  </table>

                                </div>

                              </div>

                            </div>

                          )}


                          {/* MATRIZ U */}

                          {st.U && (

                            <div className="col-md-6">

                              <div className="card border-primary h-100">

                                <div className="card-header bg-primary bg-opacity-10 fw-bold text-primary">

                                  Matriz U

                                </div>


                                <div className="card-body text-center">

                                  <table className="table table-bordered table-sm mb-0 font-monospace">

                                    <tbody>

                                      {st.U.map(
                                        (row, ri) => (

                                          <tr key={ri}>

                                            {row.map(
                                              (
                                                value,
                                                ci
                                              ) => (

                                                <td key={ci}>

                                                  {Math.abs(
                                                    value
                                                  ) < 1e-10
                                                    ? "0.000"
                                                    : value.toFixed(
                                                        3
                                                      )}

                                                </td>

                                              )
                                            )}

                                          </tr>

                                        )
                                      )}

                                    </tbody>

                                  </table>

                                </div>

                              </div>

                            </div>

                          )}

                        </div>

                      )}


                      {/* VECTOR B */}

                      {st.B && (

                        <div className="border rounded p-3 mb-3 bg-light">

                          <div className="fw-bold mb-2">

                            Vector B

                          </div>


                          <div className="d-flex flex-wrap gap-2 font-monospace">

                            {st.B.map(
                              (value, i) => (

                                <span
                                  key={i}
                                  className="badge bg-secondary p-2"
                                >

                                  B<sub>{i + 1}</sub>
                                  {" = "}
                                  {value.toFixed(4)}

                                </span>

                              )
                            )}

                          </div>

                        </div>

                      )}


                      {/* VECTOR Y */}

                      {st.Y && (

                        <div className="border rounded p-3 mb-3 bg-info bg-opacity-10">

                          <div className="fw-bold text-info mb-2">

                            Vector Y — Sustitución hacia adelante

                          </div>


                          <div className="d-flex flex-wrap gap-2 font-monospace">

                            {st.Y.map(
                              (value, i) => (

                                <span
                                  key={i}
                                  className="badge bg-info text-dark p-2"
                                >

                                  Y<sub>{i + 1}</sub>
                                  {" = "}
                                  {value.toFixed(4)}

                                </span>

                              )
                            )}

                          </div>

                        </div>

                      )}


                      {/* VECTOR X */}

                      {st.X && (

                        <div className="border rounded p-3 bg-success bg-opacity-10">

                          <div className="fw-bold text-success mb-2">

                            Vector X — Solución

                          </div>


                          <div className="d-flex flex-wrap gap-2 font-monospace">

                            {st.X.map(
                              (value, i) => (

                                <span
                                  key={i}
                                  className="badge bg-success p-2 fs-6"
                                >

                                  X<sub>{i + 1}</sub>
                                  {" = "}
                                  {value.toFixed(4)}

                                </span>

                              )
                            )}

                          </div>

                        </div>

                      )}

                    </div>


                    {/* FOOTER */}

                    <div className="card-footer bg-light">

                      <div className="d-flex justify-content-between">


                        {/* ANTERIOR */}

                        <button
                          className="btn btn-outline-secondary"
                          disabled={
                            currentStepLU === 0
                          }
                          onClick={() =>
                            setCurrentStepLU(
                              (p) =>
                                Math.max(
                                  0,
                                  p - 1
                                )
                            )
                          }
                        >

                          <i className="bi bi-arrow-left me-1"></i>

                          Anterior

                        </button>


                        {/* REINICIAR */}

                        <button
                          className="btn btn-outline-danger"
                          onClick={() =>
                            setCurrentStepLU(0)
                          }
                        >

                          <i className="bi bi-arrow-counterclockwise me-1"></i>

                          Reiniciar

                        </button>


                        {/* SIGUIENTE */}

                        <button
                          className="btn btn-success"
                          disabled={
                            currentStepLU ===
                            stepsLU.length - 1
                          }
                          onClick={() =>
                            setCurrentStepLU(
                              (p) =>
                                Math.min(
                                  stepsLU.length - 1,
                                  p + 1
                                )
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


          {/* =================================================
              RESULTADO FINAL FIJO
          ================================================= */}

          {resultsLU && (

            <div className="alert alert-success mt-4 mb-0">

              <h6 className="fw-bold">

                <i className="bi bi-check-circle me-2"></i>

                Solución final

              </h6>


              <div className="d-flex flex-wrap gap-3 font-monospace mt-2">

                {resultsLU.X.map(
                  (value, i) => (

                    <span
                      key={i}
                      className="badge bg-success p-2 fs-6"
                    >

                      x<sub>{i + 1}</sub>
                      {" = "}
                      {value.toFixed(5)}

                    </span>

                  )
                )}

              </div>

            </div>

          )}

        </div>

      )}

    </div>
  );
};


export default SimuladorTab;