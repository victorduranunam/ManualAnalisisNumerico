import React, { useState } from "react";

// ============================================================
// EJEMPLOS INICIALES
// ============================================================

const INITIAL_MATRIX_2 = [
  [2, 1],
  [1, 3],
];

const INITIAL_MATRIX_3 = [
  [4, 1, 0],
  [1, 4, 1],
  [0, 1, 4],
];

const INITIAL_VECTOR_2 = [1, 1];

const INITIAL_VECTOR_3 = [1, 1, 1];

// ============================================================
// FUNCIONES AUXILIARES
// ============================================================

const formatNumber = (value, decimals = 6) => {
  if (!Number.isFinite(value)) {
    return "—";
  }

  if (Math.abs(value) < 1e-10) {
    return "0.000000";
  }

  return value.toFixed(decimals);
};

const normaInfinito = (vector) => {
  return Math.max(
    ...vector.map((value) => Math.abs(value))
  );
};

// ============================================================
// OPERACIONES CON POLINOMIOS
//
// Los coeficientes se almacenan desde λ⁰ hasta λⁿ
// ============================================================

const trimPolynomial = (p) => {
  const result = [...p];

  while (
    result.length > 1 &&
    Math.abs(result[result.length - 1]) < 1e-10
  ) {
    result.pop();
  }

  return result;
};

const polynomialAdd = (a, b) => {
  const n = Math.max(a.length, b.length);

  const result = Array(n).fill(0);

  for (let i = 0; i < n; i++) {
    result[i] = (a[i] || 0) + (b[i] || 0);
  }

  return trimPolynomial(result);
};

const polynomialMultiply = (a, b) => {
  const result = Array(
    a.length + b.length - 1
  ).fill(0);

  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < b.length; j++) {
      result[i + j] += a[i] * b[j];
    }
  }

  return trimPolynomial(result);
};

const polynomialScale = (p, scalar) => {
  return trimPolynomial(
    p.map((value) => value * scalar)
  );
};

const polynomialToString = (p) => {
  const tolerance = 1e-9;

  const terms = [];

  for (let i = p.length - 1; i >= 0; i--) {
    const coefficient = p[i];

    if (Math.abs(coefficient) < tolerance) {
      continue;
    }

    const absCoefficient = Math.abs(
      coefficient
    );

    let variable = "";

    if (i === 1) {
      variable = "λ";
    } else if (i > 1) {
      variable = `λ^${i}`;
    }

    let coefficientText = "";

    if (i === 0) {
      coefficientText =
        absCoefficient.toFixed(6);
    } else if (
      Math.abs(absCoefficient - 1) <
      tolerance
    ) {
      coefficientText = "";
    } else {
      coefficientText =
        absCoefficient.toFixed(6);
    }

    const term = `${coefficientText}${variable}`;

    if (terms.length === 0) {
      terms.push(
        coefficient < 0
          ? `-${term}`
          : term
      );
    } else {
      terms.push(
        coefficient < 0
          ? ` - ${term}`
          : ` + ${term}`
      );
    }
  }

  return terms.length > 0
    ? terms.join("")
    : "0";
};

// ============================================================
// DETERMINANTE POLINÓMICO
//
// Construye det(A - λI)
// ============================================================

const determinantPolynomial = (matrix) => {
  const n = matrix.length;

  if (n === 1) {
    return matrix[0][0];
  }

  let result = [0];

  for (let col = 0; col < n; col++) {
    const minor = matrix
      .slice(1)
      .map((row) =>
        row.filter(
          (_, index) => index !== col
        )
      );

    const minorDet =
      determinantPolynomial(minor);

    const term = polynomialMultiply(
      matrix[0][col],
      minorDet
    );

    if (col % 2 === 0) {
      result = polynomialAdd(
        result,
        term
      );
    } else {
      result = polynomialAdd(
        result,
        polynomialScale(term, -1)
      );
    }
  }

  return trimPolynomial(result);
};

// ============================================================
// ELEMENTOS POLINÓMICOS
// ============================================================

const diagonalPolynomial = (value) => {
  return [value, -1];
};

const constantPolynomial = (value) => {
  return [value];
};

// ============================================================
// CREAR A - λI
// ============================================================

const buildCharacteristicMatrix = (A) => {
  return A.map((row, i) =>
    row.map((value, j) => {
      if (i === j) {
        return diagonalPolynomial(value);
      }

      return constantPolynomial(value);
    })
  );
};

// ============================================================
// TEXTO DE ELEMENTO POLINÓMICO
// ============================================================

const polynomialElementToString = (p) => {
  if (p.length === 1) {
    return formatNumber(p[0], 3);
  }

  const a = p[1];
  const b = p[0];

  let result = "";

  if (Math.abs(a + 1) < 1e-10) {
    result = "-λ";
  } else if (Math.abs(a - 1) < 1e-10) {
    result = "λ";
  } else {
    result = `${formatNumber(a, 3)}λ`;
  }

  if (Math.abs(b) > 1e-10) {
    result +=
      b > 0
        ? ` + ${formatNumber(b, 3)}`
        : ` - ${formatNumber(
            Math.abs(b),
            3
          )}`;
  }

  return result;
};

// ============================================================
// MATRIZ CARACTERÍSTICA PARA MOSTRAR
// ============================================================

const renderCharacteristicMatrix = (A) => {
  return (
    <table className="table table-bordered text-center align-middle font-monospace mb-0">
      <tbody>
        {A.map((row, i) => (
          <tr key={i}>
            {row.map((value, j) => (
              <td key={j}>
                {i === j ? (
                  <>
                    {formatNumber(value, 3)} - λ
                  </>
                ) : (
                  formatNumber(value, 3)
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// ============================================================
// RAÍCES DE POLINOMIO DE GRADO 2
// ============================================================

const solveQuadratic = (p) => {
  const a = p[2] || 0;
  const b = p[1] || 0;
  const c = p[0] || 0;

  const discriminant =
    b * b - 4 * a * c;

  if (Math.abs(a) < 1e-12) {
    if (Math.abs(b) < 1e-12) {
      return [];
    }

    return [-c / b];
  }

  if (discriminant >= -1e-12) {
    const d = Math.sqrt(
      Math.max(0, discriminant)
    );

    return [
      (-b + d) / (2 * a),
      (-b - d) / (2 * a),
    ];
  }

  const real =
    -b / (2 * a);

  const imaginary =
    Math.sqrt(-discriminant) /
    Math.abs(2 * a);

  return [
    {
      real,
      imaginary,
    },
    {
      real,
      imaginary: -imaginary,
    },
  ];
};

// ============================================================
// RAÍCES DE POLINOMIO DE GRADO 3
//
// Fórmula de Cardano / forma trigonométrica
// ============================================================

const solveCubic = (p) => {
  const a = p[3] || 0;
  const b = p[2] || 0;
  const c = p[1] || 0;
  const d = p[0] || 0;

  if (Math.abs(a) < 1e-12) {
    return solveQuadratic(p);
  }

  // x³ + A x² + B x + C
  const A = b / a;
  const B = c / a;
  const C = d / a;

  const pDep =
    B - (A * A) / 3;

  const qDep =
    (2 * A * A * A) / 27 -
    (A * B) / 3 +
    C;

  const discriminant =
    (qDep * qDep) / 4 +
    (pDep * pDep * pDep) / 27;

  const shift = A / 3;

  // ----------------------------------------------------------
  // Una raíz real y dos complejas
  // ----------------------------------------------------------

  if (discriminant > 1e-12) {
    const sqrtD =
      Math.sqrt(discriminant);

    const u = Math.cbrt(
      -qDep / 2 + sqrtD
    );

    const v = Math.cbrt(
      -qDep / 2 - sqrtD
    );

    const realRoot =
      u + v - shift;

    const realPart =
      -(u + v) / 2 - shift;

    const imaginaryPart =
      (Math.sqrt(3) / 2) *
      (u - v);

    return [
      realRoot,
      {
        real: realPart,
        imaginary: imaginaryPart,
      },
      {
        real: realPart,
        imaginary: -imaginaryPart,
      },
    ];
  }

  // ----------------------------------------------------------
  // Raíces múltiples
  // ----------------------------------------------------------

  if (
    Math.abs(discriminant) <=
    1e-12
  ) {
    const u = Math.cbrt(
      -qDep / 2
    );

    return [
      2 * u - shift,
      -u - shift,
      -u - shift,
    ];
  }

  // ----------------------------------------------------------
  // Tres raíces reales
  // ----------------------------------------------------------

  const radius =
    2 * Math.sqrt(
      -pDep / 3
    );

  let cosArgument =
    (3 * qDep) /
      (2 * pDep) *
    Math.sqrt(-3 / pDep);

  cosArgument = Math.max(
    -1,
    Math.min(1, cosArgument)
  );

  const theta =
    Math.acos(cosArgument);

  const roots = [];

  for (let k = 0; k < 3; k++) {
    roots.push(
      radius *
        Math.cos(
          (theta +
            2 *
              Math.PI *
              k) /
            3
        ) -
        shift
    );
  }

  return roots;
};

// ============================================================
// COMPONENTE PRINCIPAL
// ============================================================

const SimuladorTab = () => {
  const [
    metodoSeleccionado,
    setMetodoSeleccionado,
  ] = useState(null);

  // ==========================================================
  // ESTADOS POLINOMIO CARACTERÍSTICO
  // ==========================================================

  const [sizePC, setSizePC] =
    useState(3);

  const [matrixPC, setMatrixPC] =
    useState(INITIAL_MATRIX_3);

  const [stepsPC, setStepsPC] =
    useState([]);

  const [
    currentStepPC,
    setCurrentStepPC,
  ] = useState(0);

  const [resultsPC, setResultsPC] =
    useState(null);

  const [errorPC, setErrorPC] =
    useState("");

  // ==========================================================
  // ESTADOS MÉTODO DE LAS POTENCIAS
  // ==========================================================

  const [sizePot, setSizePot] =
    useState(3);

  const [matrixPot, setMatrixPot] =
    useState(INITIAL_MATRIX_3);

  const [vectorPot, setVectorPot] =
    useState(INITIAL_VECTOR_3);

  const [
    tolerancePot,
    setTolerancePot,
  ] = useState(0.001);

  const [
    maxIterPot,
    setMaxIterPot,
  ] = useState(25);

  const [stepsPot, setStepsPot] =
    useState([]);

  const [
    currentStepPot,
    setCurrentStepPot,
  ] = useState(0);

  const [
    resultsPot,
    setResultsPot,
  ] = useState(null);

  const [errorPot, setErrorPot] =
    useState("");

  // ==========================================================
  // CAMBIO DE DIMENSIÓN
  // POLINOMIO CARACTERÍSTICO
  // ==========================================================

  const handleSizePC = (value) => {
    const n = parseInt(value, 10);

    setSizePC(n);

    if (n === 2) {
      setMatrixPC(
        INITIAL_MATRIX_2.map(
          (row) => [...row]
        )
      );
    } else {
      setMatrixPC(
        INITIAL_MATRIX_3.map(
          (row) => [...row]
        )
      );
    }

    setStepsPC([]);
    setCurrentStepPC(0);
    setResultsPC(null);
    setErrorPC("");
  };

  // ==========================================================
  // CAMBIO DE DIMENSIÓN
  // MÉTODO DE LAS POTENCIAS
  // ==========================================================

  const handleSizePot = (value) => {
    const n = parseInt(value, 10);

    setSizePot(n);

    if (n === 2) {
      setMatrixPot(
        INITIAL_MATRIX_2.map(
          (row) => [...row]
        )
      );

      setVectorPot([
        ...INITIAL_VECTOR_2,
      ]);
    } else {
      setMatrixPot(
        INITIAL_MATRIX_3.map(
          (row) => [...row]
        )
      );

      setVectorPot([
        ...INITIAL_VECTOR_3,
      ]);
    }

    setStepsPot([]);
    setCurrentStepPot(0);
    setResultsPot(null);
    setErrorPot("");
  };

  // ==========================================================
  // CARGAR EJEMPLO
  // POLINOMIO CARACTERÍSTICO
  // ==========================================================

  const loadExamplePC = () => {
    if (sizePC === 2) {
      setMatrixPC(
        INITIAL_MATRIX_2.map(
          (row) => [...row]
        )
      );
    } else {
      setMatrixPC(
        INITIAL_MATRIX_3.map(
          (row) => [...row]
        )
      );
    }

    setStepsPC([]);
    setCurrentStepPC(0);
    setResultsPC(null);
    setErrorPC("");
  };

  // ==========================================================
  // CARGAR EJEMPLO
  // MÉTODO DE LAS POTENCIAS
  // ==========================================================

  const loadExamplePot = () => {
    if (sizePot === 2) {
      setMatrixPot(
        INITIAL_MATRIX_2.map(
          (row) => [...row]
        )
      );

      setVectorPot([
        ...INITIAL_VECTOR_2,
      ]);
    } else {
      setMatrixPot(
        INITIAL_MATRIX_3.map(
          (row) => [...row]
        )
      );

      setVectorPot([
        ...INITIAL_VECTOR_3,
      ]);
    }

    setTolerancePot(0.001);
    setMaxIterPot(25);

    setStepsPot([]);
    setCurrentStepPot(0);
    setResultsPot(null);
    setErrorPot("");
  };

  // ==========================================================
  // RESOLVER POLINOMIO CARACTERÍSTICO
  // ==========================================================

  const solveCharacteristicPolynomial = () => {
    setErrorPC("");
    setStepsPC([]);
    setCurrentStepPC(0);
    setResultsPC(null);

    const n = sizePC;

    // --------------------------------------------------------
    // VALIDACIÓN
    // --------------------------------------------------------

    if (
      !matrixPC ||
      matrixPC.length !== n
    ) {
      setErrorPC(
        "La matriz no tiene una dimensión válida."
      );
      return;
    }

    for (let i = 0; i < n; i++) {
      if (
        !matrixPC[i] ||
        matrixPC[i].length !== n
      ) {
        setErrorPC(
          "La matriz debe ser cuadrada."
        );
        return;
      }

      for (let j = 0; j < n; j++) {
        if (
          !Number.isFinite(
            matrixPC[i][j]
          )
        ) {
          setErrorPC(
            "La matriz contiene valores no válidos."
          );
          return;
        }
      }
    }

    const steps = [];

    // --------------------------------------------------------
    // PASO 1
    // --------------------------------------------------------

    steps.push({
      type: "inicio",
      title: "Matriz original A",
      desc:
        "Se parte de la matriz cuadrada A para obtener sus valores propios.",
      detail:
        "El objetivo es construir el polinomio característico mediante det(A − λI) = 0.",
      matrix: matrixPC.map(
        (row) => [...row]
      ),
    });

    // --------------------------------------------------------
    // PASO 2
    // --------------------------------------------------------

    steps.push({
      type: "caracteristica",
      title: "Construcción de A − λI",
      desc:
        "Se resta λ en cada elemento de la diagonal principal.",
      detail:
        "La matriz identidad I tiene unos en la diagonal principal y ceros fuera de ella.",
      matrix: matrixPC.map(
        (row) => [...row]
      ),
    });

    // --------------------------------------------------------
    // CONSTRUIR MATRIZ CARACTERÍSTICA
    // --------------------------------------------------------

    const characteristicMatrix =
      buildCharacteristicMatrix(
        matrixPC
      );

    // --------------------------------------------------------
    // CALCULAR POLINOMIO
    // --------------------------------------------------------

    const polynomial =
      determinantPolynomial(
        characteristicMatrix
      );

    // --------------------------------------------------------
    // PASO 3
    // --------------------------------------------------------

    steps.push({
      type: "determinante",
      title:
        "Determinante de A − λI",
      desc:
        "Se calcula el determinante de la matriz característica.",
      detail:
        n === 2
          ? "Para una matriz 2 × 2 se utiliza la expresión ad − bc."
          : "Para una matriz 3 × 3 se desarrolla el determinante mediante cofactores.",
      matrix: matrixPC.map(
        (row) => [...row]
      ),
      characteristicMatrix,
    });

    // --------------------------------------------------------
    // PASO 4
    // --------------------------------------------------------

    steps.push({
      type: "polinomio",
      title:
        "Polinomio característico",
      desc:
        "El determinante obtenido se expresa como un polinomio en λ.",
      detail:
        "Este polinomio es el polinomio característico de la matriz.",
      polynomial,
    });

    // --------------------------------------------------------
    // PASO 5
    // --------------------------------------------------------

    steps.push({
      type: "ecuacion",
      title:
        "Ecuación característica",
      desc:
        "Los valores propios se obtienen haciendo cero el polinomio característico.",
      detail:
        "Se resuelve la ecuación p(λ) = 0.",
      polynomial,
    });

    // --------------------------------------------------------
    // OBTENER RAÍCES
    // --------------------------------------------------------

    let roots;

    if (n === 2) {
      roots =
        solveQuadratic(
          polynomial
        );
    } else {
      roots =
        solveCubic(
          polynomial
        );
    }

    // --------------------------------------------------------
    // PASO FINAL
    // --------------------------------------------------------

    steps.push({
      type: "valores",
      title: "Valores propios",
      desc:
        "Las raíces del polinomio característico corresponden a los valores propios de A.",
      detail:
        `Se obtuvieron ${roots.length} valores propios.`,
      roots,
    });

    setStepsPC(steps);

    setResultsPC({
      polynomial,
      roots,
    });
  };

  // ==========================================================
  // MÉTODO DE LAS POTENCIAS
  // ==========================================================

  const solvePowerMethod = () => {
    setErrorPot("");
    setStepsPot([]);
    setCurrentStepPot(0);
    setResultsPot(null);

    const n = sizePot;

    // --------------------------------------------------------
    // VALIDAR MATRIZ
    // --------------------------------------------------------

    if (
      !matrixPot ||
      matrixPot.length !== n
    ) {
      setErrorPot(
        "La matriz no tiene una dimensión válida."
      );
      return;
    }

    for (let i = 0; i < n; i++) {
      if (
        !matrixPot[i] ||
        matrixPot[i].length !== n
      ) {
        setErrorPot(
          "La matriz debe ser cuadrada."
        );
        return;
      }

      for (let j = 0; j < n; j++) {
        if (
          !Number.isFinite(
            matrixPot[i][j]
          )
        ) {
          setErrorPot(
            "La matriz contiene valores no válidos."
          );
          return;
        }
      }
    }

    // --------------------------------------------------------
    // VALIDAR VECTOR
    // --------------------------------------------------------

    if (
      !vectorPot ||
      vectorPot.length !== n
    ) {
      setErrorPot(
        "El vector inicial no tiene la dimensión correcta."
      );
      return;
    }

    for (let i = 0; i < n; i++) {
      if (
        !Number.isFinite(
          vectorPot[i]
        )
      ) {
        setErrorPot(
          "El vector inicial contiene valores no válidos."
        );
        return;
      }
    }

    // --------------------------------------------------------
    // VALIDAR VECTOR CERO
    // --------------------------------------------------------

    let x = [...vectorPot];

    const norm =
      normaInfinito(x);

    if (norm < 1e-12) {
      setErrorPot(
        "El vector inicial X⁽⁰⁾ no puede ser el vector cero."
      );
      return;
    }

    // --------------------------------------------------------
    // VALIDAR TOLERANCIA
    // --------------------------------------------------------

    if (
      !Number.isFinite(
        tolerancePot
      ) ||
      tolerancePot <= 0
    ) {
      setErrorPot(
        "La tolerancia debe ser mayor que cero."
      );
      return;
    }

    // --------------------------------------------------------
    // VALIDAR ITERACIONES
    // --------------------------------------------------------

    if (
      !Number.isFinite(
        maxIterPot
      ) ||
      maxIterPot <= 0
    ) {
      setErrorPot(
        "El número máximo de iteraciones debe ser mayor que cero."
      );
      return;
    }

    const steps = [];

    // --------------------------------------------------------
    // PASO INICIAL
    // --------------------------------------------------------

    steps.push({
      type: "inicio",
      title: "Vector inicial",
      desc:
        "Se establece el vector inicial X⁽⁰⁾ para comenzar las iteraciones.",
      detail:
        `Se utilizará un vector inicial de ${n} componentes.`,
      xOld: [...x],
    });

    let lambdaOld = null;

    let converged = false;

    let finalLambda = null;

    let finalVector = [...x];

    // ========================================================
    // ITERACIONES
    // ========================================================

    for (
      let k = 1;
      k <= maxIterPot;
      k++
    ) {
      // ------------------------------------------------------
      // y = A x
      // ------------------------------------------------------

      const y =
        Array(n).fill(0);

      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          y[i] +=
            matrixPot[i][j] *
            x[j];
        }
      }

      // ------------------------------------------------------
      // NORMALIZACIÓN
      //
      // Se utiliza el componente de mayor
      // valor absoluto como factor.
      // ------------------------------------------------------

      const lambda =
        Math.max(
          ...y.map(
            (value) =>
              Math.abs(value)
          )
        );

      if (lambda < 1e-12) {
        setErrorPot(
          "El método produjo un vector nulo. No es posible continuar."
        );
        return;
      }

      const xNew =
        y.map(
          (value) =>
            value / lambda
        );

      // ------------------------------------------------------
      // ERROR
      // ------------------------------------------------------

      let error;

      if (lambdaOld === null) {
        error = Infinity;
      } else {
        error = Math.abs(
          lambda - lambdaOld
        );
      }

      // ------------------------------------------------------
      // GUARDAR ITERACIÓN
      // ------------------------------------------------------

      steps.push({
        type: "iteracion",
        iter: k,
        xOld: [...x],
        y: [...y],
        lambda,
        xNew: [...xNew],
        error,
      });

      // ------------------------------------------------------
      // CONVERGENCIA
      // ------------------------------------------------------

      if (
        lambdaOld !== null &&
        error < tolerancePot
      ) {
        converged = true;

        finalLambda = lambda;

        finalVector = [
          ...xNew,
        ];

        break;
      }

      // ------------------------------------------------------
      // SIGUIENTE ITERACIÓN
      // ------------------------------------------------------

      x = [...xNew];

      lambdaOld = lambda;

      finalLambda = lambda;

      finalVector = [
        ...xNew,
      ];
    }

    // ========================================================
    // PASO FINAL
    // ========================================================

    steps.push({
      type: "final",
      title: converged
        ? "Convergencia alcanzada"
        : "Máximo de iteraciones alcanzado",
      desc: converged
        ? "El error alcanzó la tolerancia establecida."
        : "Se alcanzó el número máximo de iteraciones.",
      detail: converged
        ? `El error es menor que la tolerancia ${tolerancePot}.`
        : `No se alcanzó la tolerancia ${tolerancePot} dentro de las ${maxIterPot} iteraciones permitidas.`,
      lambda: finalLambda,
      vector: finalVector,
      converged,
    });

    // ========================================================
    // GUARDAR RESULTADOS
    // ========================================================

    setStepsPot(steps);

    setResultsPot({
      lambda: finalLambda,
      vector: finalVector,
      iterations:
        steps.filter(
          (step) =>
            step.type ===
            "iteracion"
        ).length,
      converged,
    });
  };

  // ==========================================================
  // FORMATEAR RAÍZ
  // ==========================================================

  const formatRoot = (root) => {
    if (
      typeof root ===
      "number"
    ) {
      return formatNumber(
        root,
        6
      );
    }

    if (
      root &&
      root.imaginary !==
        undefined
    ) {
      const real =
        formatNumber(
          root.real,
          6
        );

      const imaginary =
        formatNumber(
          Math.abs(
            root.imaginary
          ),
          6
        );

      return root.imaginary >=
        0
        ? `${real} + ${imaginary}i`
        : `${real} - ${imaginary}i`;
    }

    return "—";
  };

  // ==========================================================
  // MENÚ PRINCIPAL
  // ==========================================================

  if (!metodoSeleccionado) {
    return (
      <div className="p-4 border rounded bg-light">

        <div className="text-center mb-4">

          <h4 className="text-primary fw-bold mb-2">

            <i className="bi bi-diagram-3-fill me-2"></i>

            Simulador de Valores Propios

          </h4>

          <p className="text-muted">

            Selecciona el método que deseas estudiar:

          </p>

        </div>

        <div className="row g-4 justify-content-center">

          {/* ==================================================
              POLINOMIO CARACTERÍSTICO
          ================================================== */}

          <div className="col-md-5">

            <div className="card h-100 shadow-sm border-0 border-top border-4 border-primary">

              <div className="card-body p-4 d-flex flex-column text-center">

                <div className="display-5 text-primary mb-3">

                  <i className="bi bi-polynomial"></i>

                </div>

                <h5 className="fw-bold text-dark mb-2">

                  Polinomio Característico

                </h5>

                <p className="text-muted small flex-grow-1">

                  Obtención de los valores propios mediante
                  la ecuación característica{" "}

                  <strong>
                    det(A − λI) = 0
                  </strong>

                  . El procedimiento se muestra paso a paso.

                </p>

                <button
                  className="btn btn-primary fw-semibold w-100 mt-3"
                  onClick={() =>
                    setMetodoSeleccionado(
                      "polinomio"
                    )
                  }
                >

                  <i className="bi bi-play-circle me-2"></i>

                  Iniciar Polinomio Característico

                </button>

              </div>

            </div>

          </div>

          {/* ==================================================
              MÉTODO DE LAS POTENCIAS
          ================================================== */}

          <div className="col-md-5">

            <div className="card h-100 shadow-sm border-0 border-top border-4 border-success">

              <div className="card-body p-4 d-flex flex-column text-center">

                <div className="display-5 text-success mb-3">

                  <i className="bi bi-lightning-charge-fill"></i>

                </div>

                <h5 className="fw-bold text-dark mb-2">

                  Método de las Potencias

                </h5>

                <p className="text-muted small flex-grow-1">

                  Aproximación del valor propio dominante
                  mediante un proceso iterativo.
                  Cada iteración se muestra paso a paso.

                </p>

                <button
                  className="btn btn-success fw-semibold w-100 mt-3"
                  onClick={() =>
                    setMetodoSeleccionado(
                      "potencias"
                    )
                  }
                >

                  <i className="bi bi-play-circle me-2"></i>

                  Iniciar Método de Potencias

                </button>

              </div>

            </div>

          </div>

        </div>

      </div>
    );
  }

  // ==========================================================
  // VISTA POLINOMIO CARACTERÍSTICO
  // ==========================================================

  if (
    metodoSeleccionado ===
    "polinomio"
  ) {
    return (
      <div className="p-3 border rounded bg-light">

        {/* ENCABEZADO */}

        <div className="d-flex justify-content-between align-items-center mb-3">

          <div>

            <button
              className="btn btn-outline-secondary btn-sm me-3"
              onClick={() =>
                setMetodoSeleccionado(
                  null
                )
              }
            >

              <i className="bi bi-arrow-left me-1"></i>

              Cambiar Método

            </button>

            <span className="h5 text-primary fw-bold align-middle">

              <i className="bi bi-polynomial me-2"></i>

              Simulador: Polinomio Característico

            </span>

          </div>

        </div>

        <div className="bg-white p-4 rounded border shadow-sm">

          {/* CONTROLES */}

          <div className="row g-3 align-items-center mb-4">

            <div className="col-auto">

              <label className="fw-bold me-2 small">

                Dimensión:

              </label>

              <select
                className="form-select form-select-sm d-inline-block w-auto"
                value={sizePC}
                onChange={(e) =>
                  handleSizePC(
                    e.target.value
                  )
                }
              >

                <option value="2">
                  2 × 2
                </option>

                <option value="3">
                  3 × 3
                </option>

              </select>

            </div>

            <div className="col-auto ms-auto">

              <button
                className="btn btn-outline-secondary btn-sm me-2"
                onClick={
                  loadExamplePC
                }
              >

                <i className="bi bi-arrow-clockwise me-1"></i>

                Cargar Ejemplo

              </button>

              <button
                className="btn btn-primary btn-sm"
                onClick={
                  solveCharacteristicPolynomial
                }
              >

                <i className="bi bi-calculator me-1"></i>

                Calcular

              </button>

            </div>

          </div>

          {/* MATRIZ A */}

          <div className="mb-4">

            <h6 className="fw-bold mb-2">

              Matriz A

            </h6>

            <div className="table-responsive">

              <table
                className="table table-bordered text-center align-middle"
                style={{
                  maxWidth: "500px",
                }}
              >

                <tbody>

                  {matrixPC.map(
                    (row, r) => (
                      <tr key={r}>

                        {row.map(
                          (
                            value,
                            c
                          ) => (
                            <td key={c}>

                              <input
                                type="number"
                                className="form-control form-control-sm text-center"
                                value={
                                  value
                                }
                                onChange={(
                                  e
                                ) => {

                                  const newMatrix =
                                    matrixPC.map(
                                      (
                                        ro,
                                        ri
                                      ) =>
                                        ro.map(
                                          (
                                            co,
                                            ci
                                          ) =>
                                            ri ===
                                              r &&
                                            ci ===
                                              c
                                              ? parseFloat(
                                                  e
                                                    .target
                                                    .value
                                                ) ||
                                                0
                                              : co
                                        )
                                    );

                                  setMatrixPC(
                                    newMatrix
                                  );
                                }}
                              />

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

          {/* ERROR */}

          {errorPC && (
            <div className="alert alert-danger py-2">

              <i className="bi bi-exclamation-triangle me-2"></i>

              {errorPC}

            </div>
          )}

          {/* RESULTADOS */}

          {resultsPC && (
            <div className="alert alert-success border-0 shadow-sm">

              <h6 className="fw-bold">

                Valores propios

              </h6>

              <div className="d-flex flex-wrap gap-2">

                {resultsPC.roots.map(
                  (
                    root,
                    index
                  ) => (
                    <span
                      key={index}
                      className="badge bg-success p-2 fs-6"
                    >

                      λ<sub>
                        {index + 1}
                      </sub>{" "}

                      ={" "}

                      {formatRoot(
                        root
                      )}

                    </span>
                  )
                )}

              </div>

            </div>
          )}

          {/* DESARROLLO PASO A PASO */}

          {stepsPC.length >
            0 && (
            <div className="mt-4">

              <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">

                <h6 className="fw-bold mb-0">

                  <i className="bi bi-list-ol me-2"></i>

                  Desarrollo paso a paso

                </h6>

                <span className="badge bg-primary">

                  Paso{" "}

                  {currentStepPC +
                    1}{" "}

                  de{" "}

                  {stepsPC.length}

                </span>

              </div>

              {(() => {

                const step =
                  stepsPC[
                    currentStepPC
                  ];

                return (
                  <div className="card shadow-sm border-primary">

                    <div className="card-header bg-primary text-white">

                      <div className="fw-bold">

                        Paso{" "}

                        {currentStepPC +
                          1}
                        :{" "}

                        {step.title}

                      </div>

                    </div>

                    <div className="card-body">

                      <div className="alert alert-light border">

                        <div className="fw-bold mb-1">

                          {step.desc}

                        </div>

                        <div className="small">

                          {step.detail}

                        </div>

                      </div>

                      {/* MATRIZ ORIGINAL */}

                      {step.type ===
                        "inicio" && (
                        <div className="mx-auto text-center">

                          <div className="small text-muted fw-bold mb-2">

                            Matriz A

                          </div>

                          <div className="table-responsive">

                            <table
                              className="table table-bordered text-center font-monospace mx-auto"
                              style={{
                                maxWidth:
                                  "400px",
                              }}
                            >

                              <tbody>

                                {step.matrix.map(
                                  (
                                    row,
                                    i
                                  ) => (
                                    <tr
                                      key={
                                        i
                                      }
                                    >

                                      {row.map(
                                        (
                                          value,
                                          j
                                        ) => (
                                          <td
                                            key={
                                              j
                                            }
                                          >

                                            {formatNumber(
                                              value,
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
                      )}

                      {/* A - λI */}

                      {step.type ===
                        "caracteristica" && (
                        <div>

                          <div className="text-center fw-bold mb-2">

                            A − λI

                          </div>

                          <div
                            className="mx-auto"
                            style={{
                              maxWidth:
                                "500px",
                            }}
                          >

                            {renderCharacteristicMatrix(
                              step.matrix
                            )}

                          </div>

                        </div>
                      )}

                      {/* DETERMINANTE */}

                      {step.type ===
                        "determinante" && (
                        <div>

                          <div className="text-center fw-bold mb-3">

                            Determinante de A − λI

                          </div>

                          <div className="p-3 bg-light border rounded text-center font-monospace fs-5">

                            {sizePC ===
                            2 ? (
                              <>
                                det(A − λI) ={" "}
                                (a₁₁ − λ)(a₂₂ − λ)
                                − a₁₂a₂₁
                              </>
                            ) : (
                              <>
                                det(A − λI) ={" "}
                                a₁₁M₁₁ − a₁₂M₁₂
                                + a₁₃M₁₃
                              </>
                            )}

                          </div>

                          {step.characteristicMatrix && (
                            <div className="mt-3 text-center">

                              <div className="small text-muted fw-bold mb-2">

                                Matriz utilizada

                              </div>

                              <div
                                className="mx-auto"
                                style={{
                                  maxWidth:
                                    "500px",
                                }}
                              >

                                {renderCharacteristicMatrix(
                                  step.matrix
                                )}

                              </div>

                            </div>
                          )}

                        </div>
                      )}

                      {/* POLINOMIO */}

                      {step.type ===
                        "polinomio" && (
                        <div className="text-center">

                          <div className="small text-muted fw-bold mb-2">

                            Polinomio característico

                          </div>

                          <div className="p-4 bg-light border rounded font-monospace fs-4">

                            p(λ) ={" "}

                            {polynomialToString(
                              step.polynomial
                            )}

                          </div>

                        </div>
                      )}

                      {/* ECUACIÓN */}

                      {step.type ===
                        "ecuacion" && (
                        <div className="text-center">

                          <div className="small text-muted fw-bold mb-2">

                            Ecuación característica

                          </div>

                          <div className="p-4 bg-light border rounded font-monospace fs-4">

                            {polynomialToString(
                              step.polynomial
                            )}{" "}

                            = 0

                          </div>

                        </div>
                      )}

                      {/* VALORES */}

                      {step.type ===
                        "valores" && (
                        <div>

                          <div className="text-center fw-bold mb-3">

                            Valores propios obtenidos

                          </div>

                          <div className="d-flex justify-content-center flex-wrap gap-3">

                            {step.roots.map(
                              (
                                root,
                                index
                              ) => (
                                <div
                                  key={
                                    index
                                  }
                                  className="badge bg-success p-3 fs-5"
                                >

                                  λ<sub>
                                    {index +
                                      1}
                                  </sub>

                                  {" = "}

                                  {formatRoot(
                                    root
                                  )}

                                </div>
                              )
                            )}

                          </div>

                        </div>
                      )}

                    </div>

                    {/* CONTROLES */}

                    <div className="card-footer bg-light">

                      <div className="d-flex justify-content-between">

                        <button
                          className="btn btn-outline-secondary"
                          disabled={
                            currentStepPC ===
                            0
                          }
                          onClick={() =>
                            setCurrentStepPC(
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
                            setCurrentStepPC(
                              0
                            )
                          }
                        >

                          <i className="bi bi-arrow-counterclockwise me-1"></i>

                          Reiniciar

                        </button>

                        <button
                          className="btn btn-primary"
                          disabled={
                            currentStepPC ===
                            stepsPC.length -
                              1
                          }
                          onClick={() =>
                            setCurrentStepPC(
                              (p) =>
                                Math.min(
                                  stepsPC.length -
                                    1,
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

      </div>
    );
  }

  // ==========================================================
  // VISTA MÉTODO DE LAS POTENCIAS
  // ==========================================================

  return (
    <div className="p-3 border rounded bg-light">

      {/* ENCABEZADO */}

      <div className="d-flex justify-content-between align-items-center mb-3">

        <div>

          <button
            className="btn btn-outline-secondary btn-sm me-3"
            onClick={() =>
              setMetodoSeleccionado(
                null
              )
            }
          >

            <i className="bi bi-arrow-left me-1"></i>

            Cambiar Método

          </button>

          <span className="h5 text-success fw-bold align-middle">

            <i className="bi bi-lightning-charge me-2"></i>

            Simulador: Método de las Potencias

          </span>

        </div>

      </div>

      <div className="bg-white p-4 rounded border shadow-sm">

        {/* CONTROLES */}

        <div className="row g-3 mb-4">

          <div className="col-md-3">

            <label className="fw-bold small">

              Dimensión

            </label>

            <select
              className="form-select form-select-sm"
              value={sizePot}
              onChange={(e) =>
                handleSizePot(
                  e.target.value
                )
              }
            >

              <option value="2">
                2 × 2
              </option>

              <option value="3">
                3 × 3
              </option>

            </select>

          </div>

          <div className="col-md-3">

            <label className="fw-bold small">

              Tolerancia

            </label>

            <input
              type="number"
              step="0.0001"
              min="0.000001"
              className="form-control form-control-sm"
              value={
                tolerancePot
              }
              onChange={(e) =>
                setTolerancePot(
                  parseFloat(
                    e.target.value
                  ) || 0.001
                )
              }
            />

          </div>

          <div className="col-md-3">

            <label className="fw-bold small">

              Máx. iteraciones

            </label>

            <input
              type="number"
              min="1"
              className="form-control form-control-sm"
              value={
                maxIterPot
              }
              onChange={(e) =>
                setMaxIterPot(
                  parseInt(
                    e.target.value,
                    10
                  ) || 25
                )
              }
            />

          </div>

          <div className="col-md-3 d-flex align-items-end">

            <button
              className="btn btn-outline-secondary btn-sm me-2"
              onClick={
                loadExamplePot
              }
            >

              Cargar Ejemplo

            </button>

            <button
              className="btn btn-success btn-sm"
              onClick={
                solvePowerMethod
              }
            >

              Calcular

            </button>

          </div>

        </div>

        {/* MATRIZ Y VECTOR */}

        <div className="row g-4 mb-4">

          <div className="col-md-7">

            <h6 className="fw-bold">

              Matriz A

            </h6>

            <table
              className="table table-bordered text-center align-middle"
              style={{
                maxWidth:
                  "500px",
              }}
            >

              <tbody>

                {matrixPot.map(
                  (row, r) => (
                    <tr key={r}>

                      {row.map(
                        (
                          value,
                          c
                        ) => (
                          <td key={c}>

                            <input
                              type="number"
                              className="form-control form-control-sm text-center"
                              value={
                                value
                              }
                              onChange={(
                                e
                              ) => {

                                const updated =
                                  matrixPot.map(
                                    (
                                      ro,
                                      ri
                                    ) =>
                                      ro.map(
                                        (
                                          co,
                                          ci
                                        ) =>
                                          ri ===
                                            r &&
                                          ci ===
                                            c
                                            ? parseFloat(
                                                e
                                                  .target
                                                  .value
                                              ) ||
                                              0
                                            : co
                                      )
                                  );

                                setMatrixPot(
                                  updated
                                );
                              }}
                            />

                          </td>
                        )
                      )}

                    </tr>
                  )
                )}

              </tbody>

            </table>

          </div>

          <div className="col-md-5">

            <h6 className="fw-bold">

              Vector inicial X⁽⁰⁾

            </h6>

            {vectorPot.map(
              (value, i) => (
                <div
                  className="mb-2"
                  key={i}
                >

                  <label className="small text-muted">

                    x<sub>
                      {i + 1}
                    </sub>
                    ⁽⁰⁾

                  </label>

                  <input
                    type="number"
                    className="form-control form-control-sm"
                    value={value}
                    onChange={(
                      e
                    ) => {

                      const updated =
                        [
                          ...vectorPot,
                        ];

                      updated[i] =
                        parseFloat(
                          e.target.value
                        ) || 0;

                      setVectorPot(
                        updated
                      );
                    }}
                  />

                </div>
              )
            )}

          </div>

        </div>

        {/* ERROR */}

        {errorPot && (
          <div className="alert alert-danger py-2">

            <i className="bi bi-exclamation-triangle me-2"></i>

            <strong>
              No se puede ejecutar el método:
            </strong>

            <div className="mt-1">

              {errorPot}

            </div>

          </div>
        )}

        {/* RESULTADO */}

        {resultsPot && (
          <div className="alert alert-success shadow-sm">

            <h6 className="fw-bold">

              Resultado

            </h6>

            <div className="row">

              <div className="col-md-6">

                <strong>
                  Valor propio dominante:
                </strong>

                <div className="fs-4 font-monospace">

                  λ ≈{" "}

                  {formatNumber(
                    resultsPot.lambda,
                    6
                  )}

                </div>

              </div>

              <div className="col-md-6">

                <strong>
                  Vector propio aproximado:
                </strong>

                <div className="font-monospace">

                  [

                  {resultsPot.vector
                    .map(
                      (v) =>
                        formatNumber(
                          v,
                          6
                        )
                    )
                    .join(
                      ", "
                    )}

                  ]

                </div>

              </div>

            </div>

            <hr />

            <div>

              {resultsPot.converged ? (
                <span className="badge bg-success">

                  Convergencia alcanzada

                </span>
              ) : (
                <span className="badge bg-warning text-dark">

                  Se alcanzó el máximo de iteraciones

                </span>
              )}

              <span className="badge bg-secondary ms-2">

                {resultsPot.iterations} iteraciones

              </span>

            </div>

          </div>
        )}

        {/* DESARROLLO PASO A PASO */}

        {stepsPot.length >
          0 && (
          <div className="mt-4">

            <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">

              <h6 className="fw-bold mb-0">

                <i className="bi bi-list-ol me-2"></i>

                Desarrollo paso a paso

              </h6>

              <span className="badge bg-success">

                Paso{" "}

                {currentStepPot +
                  1}{" "}

                de{" "}

                {stepsPot.length}

              </span>

            </div>

            {(() => {

              const step =
                stepsPot[
                  currentStepPot
                ];

              return (
                <div className="card shadow-sm border-success">

                  <div className="card-header bg-success text-white">

                    <div className="fw-bold">

                      {step.type ===
                      "iteracion"
                        ? `Iteración ${step.iter}`
                        : `Paso ${
                            currentStepPot +
                            1
                          }: ${
                            step.title
                          }`}

                    </div>

                  </div>

                  <div className="card-body">

                    {/* PASO INICIAL */}

                    {step.type ===
                      "inicio" && (
                      <div>

                        <div className="alert alert-light border">

                          <div className="fw-bold mb-1">

                            {step.desc}

                          </div>

                          <div className="small">

                            {step.detail}

                          </div>

                        </div>

                        <div className="text-center font-monospace fs-5">

                          X⁽⁰⁾ = [

                          {step.xOld
                            .map(
                              (v) =>
                                formatNumber(
                                  v,
                                  4
                                )
                            )
                            .join(
                              ", "
                            )}

                          ]

                        </div>

                      </div>
                    )}

                    {/* ITERACIÓN */}

                    {step.type ===
                      "iteracion" && (
                      <div>

                        <div className="alert alert-light border">

                          <div className="fw-bold">

                            Iteración{" "}

                            {step.iter}

                          </div>

                          <div className="small">

                            Se multiplica A por el
                            vector anterior y se
                            normaliza el resultado.

                          </div>

                        </div>

                        <div className="row g-3">

                          <div className="col-md-6">

                            <div className="border rounded p-3">

                              <div className="small text-muted fw-bold mb-2">

                                Vector anterior

                              </div>

                              <div className="font-monospace">

                                [

                                {step.xOld
                                  .map(
                                    (
                                      v
                                    ) =>
                                      formatNumber(
                                        v,
                                        5
                                      )
                                  )
                                  .join(
                                    ", "
                                  )}

                                ]

                              </div>

                            </div>

                          </div>

                          <div className="col-md-6">

                            <div className="border rounded p-3">

                              <div className="small text-muted fw-bold mb-2">

                                A · X⁽ᵏ⁻¹⁾

                              </div>

                              <div className="font-monospace">

                                [

                                {step.y
                                  .map(
                                    (
                                      v
                                    ) =>
                                      formatNumber(
                                        v,
                                        5
                                      )
                                  )
                                  .join(
                                    ", "
                                  )}

                                ]

                              </div>

                            </div>

                          </div>

                        </div>

                        <div className="row g-3 mt-1">

                          <div className="col-md-6">

                            <div className="border rounded p-3 bg-light">

                              <div className="small text-muted fw-bold">

                                Valor propio aproximado

                              </div>

                              <div className="font-monospace fs-5">

                                λ ≈{" "}

                                {formatNumber(
                                  step.lambda,
                                  6
                                )}

                              </div>

                            </div>

                          </div>

                          <div className="col-md-6">

                            <div className="border rounded p-3 bg-light">

                              <div className="small text-muted fw-bold">

                                Nuevo vector

                              </div>

                              <div className="font-monospace">

                                [

                                {step.xNew
                                  .map(
                                    (
                                      v
                                    ) =>
                                      formatNumber(
                                        v,
                                        5
                                      )
                                  )
                                  .join(
                                    ", "
                                  )}

                                ]

                              </div>

                            </div>

                          </div>

                        </div>

                        <div className="mt-3 text-center">

                          <span className="badge bg-dark p-2">

                            Error:{" "}

                            {Number.isFinite(
                              step.error
                            )
                              ? formatNumber(
                                  step.error,
                                  6
                                )
                              : "—"}

                          </span>

                        </div>

                      </div>
                    )}

                    {/* PASO FINAL */}

                    {step.type ===
                      "final" && (
                      <div className="text-center">

                        <div className="alert alert-success">

                          <div className="fw-bold mb-2">

                            {step.title}

                          </div>

                          <div>

                            {step.desc}

                          </div>

                          <div className="small mt-2">

                            {step.detail}

                          </div>

                        </div>

                        <div className="fs-5 font-monospace">

                          λ ≈{" "}

                          {formatNumber(
                            step.lambda,
                            6
                          )}

                        </div>

                        <div className="mt-2 font-monospace">

                          Vector propio ≈ [

                          {step.vector
                            .map(
                              (v) =>
                                formatNumber(
                                  v,
                                  6
                                )
                            )
                            .join(
                              ", "
                            )}

                          ]

                        </div>

                      </div>
                    )}

                  </div>

                  {/* CONTROLES */}

                  <div className="card-footer bg-light">

                    <div className="d-flex justify-content-between">

                      <button
                        className="btn btn-outline-secondary"
                        disabled={
                          currentStepPot ===
                          0
                        }
                        onClick={() =>
                          setCurrentStepPot(
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
                          setCurrentStepPot(
                            0
                          )
                        }
                      >

                        <i className="bi bi-arrow-counterclockwise me-1"></i>

                        Reiniciar

                      </button>

                      <button
                        className="btn btn-success"
                        disabled={
                          currentStepPot ===
                          stepsPot.length -
                            1
                        }
                        onClick={() =>
                          setCurrentStepPot(
                            (p) =>
                              Math.min(
                                stepsPot.length -
                                  1,
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

    </div>
  );
};

export default SimuladorTab;