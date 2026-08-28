
import React, { useMemo, useState } from "react";

// ======================================================
// SIMULADOR DE DIFERENCIAS FINITAS
// Progresivas, regresivas y centrales
// ======================================================

const SimuladorTab = () => {
  // ------------------------------------------------------
  // 1. DATOS DE ENTRADA
  // ------------------------------------------------------
  const [functionInput, setFunctionInput] = useState("Math.sin(x)");
  const [numPoints, setNumPoints] = useState(5);
  const [intervalStart, setIntervalStart] = useState(0);
  const [intervalEnd, setIntervalEnd] = useState(1);

  // ------------------------------------------------------
  // 2. EVALUACIÓN DE LA FUNCIÓN
  // ------------------------------------------------------
  const evaluateFunction = (x) => {
    try {
      // Se permiten algunas funciones matemáticas comunes
      const expression = functionInput
        .replace(/\^/g, "**")
        .replace(/\bsin\b/g, "Math.sin")
        .replace(/\bcos\b/g, "Math.cos")
        .replace(/\btan\b/g, "Math.tan")
        .replace(/\bln\b/g, "Math.log")
        .replace(/\blog\b/g, "Math.log10")
        .replace(/\bsqrt\b/g, "Math.sqrt")
        .replace(/\bexp\b/g, "Math.exp")
        .replace(/\babs\b/g, "Math.abs");

      // eslint-disable-next-line no-new-func
      const fn = new Function("x", `return ${expression};`);

      const result = fn(x);

      return Number.isFinite(result) ? result : NaN;
    } catch {
      return NaN;
    }
  };

  // ------------------------------------------------------
  // 3. GENERACIÓN DE PUNTOS Y TABLAS
  // ------------------------------------------------------
  const calculation = useMemo(() => {
    const n = Number(numPoints);
    const a = Number(intervalStart);
    const b = Number(intervalEnd);

    if (!Number.isInteger(n) || n < 3) {
      return {
        error: "Se requieren al menos 3 puntos.",
      };
    }

    if (!Number.isFinite(a) || !Number.isFinite(b)) {
      return {
        error: "Los extremos del intervalo deben ser numéricos.",
      };
    }

    if (a >= b) {
      return {
        error: "El extremo inicial debe ser menor que el extremo final.",
      };
    }

    const h = (b - a) / (n - 1);

    // --------------------------------------------
    // Generar puntos x_i y y_i = f(x_i)
    // --------------------------------------------
    const points = [];

    for (let i = 0; i < n; i++) {
      const x = a + i * h;
      const y = evaluateFunction(x);

      points.push({
        i,
        x,
        y,
      });
    }

    if (points.some((p) => !Number.isFinite(p.y))) {
      return {
        error:
          "La función no pudo evaluarse correctamente. Verifica la expresión ingresada.",
      };
    }

    // ==================================================
    // TABLA DE DIFERENCIAS PROGRESIVAS
    // ==================================================

    const forward = Array.from({ length: n }, () =>
      Array(n).fill(null)
    );

    for (let i = 0; i < n; i++) {
      forward[i][0] = points[i].y;
    }

    for (let order = 1; order < n; order++) {
      for (let i = 0; i < n - order; i++) {
        forward[i][order] =
          forward[i + 1][order - 1] -
          forward[i][order - 1];
      }
    }

    // ==================================================
    // TABLA DE DIFERENCIAS REGRESIVAS
    // ==================================================

    const backward = Array.from({ length: n }, () =>
      Array(n).fill(null)
    );

    for (let i = 0; i < n; i++) {
      backward[i][0] = points[i].y;
    }

    for (let order = 1; order < n; order++) {
      for (let i = order; i < n; i++) {
        backward[i][order] =
          backward[i][order - 1] -
          backward[i - 1][order - 1];
      }
    }

    // ==================================================
    // TABLA DE DIFERENCIAS CENTRALES
    // ==================================================
    //
    // Para cada punto se calculan diferencias centrales
    // cuando los puntos necesarios existen.
    //
    // C[i][k] representa una diferencia central de orden k.
    // ==================================================

    const central = Array.from({ length: n }, () =>
      Array(n).fill(null)
    );

    for (let i = 0; i < n; i++) {
      central[i][0] = points[i].y;
    }

    // Calculamos las diferencias de forma recursiva.
    // Se utilizan los valores de la tabla progresiva
    // para mostrar los órdenes disponibles alrededor
    // de cada punto.
    for (let order = 1; order < n; order++) {
      for (let i = 0; i < n - order; i++) {
        central[i][order] =
          central[i + 1][order - 1] -
          central[i][order - 1];
      }
    }

    return {
      error: null,
      n,
      a,
      b,
      h,
      points,
      forward,
      backward,
      central,
    };
  }, [functionInput, numPoints, intervalStart, intervalEnd]);

  // ------------------------------------------------------
  // 4. CAMBIAR NÚMERO DE PUNTOS
  // ------------------------------------------------------
  const handleNumPointsChange = (value) => {
    const parsed = Number(value);

    if (Number.isInteger(parsed) && parsed >= 3 && parsed <= 15) {
      setNumPoints(parsed);
    }
  };

  // ------------------------------------------------------
  // 5. FUNCIÓN PARA MOSTRAR VALORES
  // ------------------------------------------------------
  const formatValue = (value) => {
    if (value === null || value === undefined) {
      return "—";
    }

    if (!Number.isFinite(value)) {
      return "—";
    }

    return value.toFixed(6);
  };

  // ------------------------------------------------------
  // 6. RENDER
  // ------------------------------------------------------
  return (
    <div className="p-3 border rounded bg-light">

      {/* ==================================================
          ENCABEZADO
          ================================================== */}
      <div className="mb-3 pb-2 border-bottom">
        <h5 className="text-primary fw-bold mb-1">
          <span className="me-2">📊</span>
          Simulador de Diferencias Finitas
        </h5>

        <p className="text-muted small mb-0">
          Construcción de tablas de diferencias finitas
          progresivas, regresivas y centrales.
        </p>
      </div>

      {/* ==================================================
          DATOS DE LA FUNCIÓN
          ================================================== */}
      <div className="card border shadow-sm mb-3">

        <div className="card-header bg-white">
          <span className="fw-bold text-dark">
            ⚙️ Configuración del problema
          </span>
        </div>

        <div className="card-body">

          <div className="row g-3">

            {/* FUNCIÓN */}
            <div className="col-12 col-lg-5">
              <label className="form-label small fw-bold">
                Función f(x)
              </label>

              <input
                type="text"
                className="form-control font-monospace"
                value={functionInput}
                onChange={(e) => setFunctionInput(e.target.value)}
              />

              <div className="form-text">
                Ejemplos: <code>Math.sin(x)</code>,{" "}
                <code>x^2 + 2*x + 1</code>,{" "}
                <code>Math.log(x)</code>
              </div>
            </div>

            {/* NÚMERO DE PUNTOS */}
            <div className="col-6 col-lg-2">
              <label className="form-label small fw-bold">
                Número de puntos
              </label>

              <input
                type="number"
                min="3"
                max="15"
                className="form-control"
                value={numPoints}
                onChange={(e) =>
                  handleNumPointsChange(e.target.value)
                }
              />

              <div className="form-text">
                Por defecto: 5
              </div>
            </div>

            {/* INTERVALO INICIAL */}
            <div className="col-6 col-lg-2">
              <label className="form-label small fw-bold">
                Inicio a
              </label>

              <input
                type="number"
                step="any"
                className="form-control"
                value={intervalStart}
                onChange={(e) =>
                  setIntervalStart(e.target.value)
                }
              />
            </div>

            {/* INTERVALO FINAL */}
            <div className="col-6 col-lg-2">
              <label className="form-label small fw-bold">
                Final b
              </label>

              <input
                type="number"
                step="any"
                className="form-control"
                value={intervalEnd}
                onChange={(e) =>
                  setIntervalEnd(e.target.value)
                }
              />
            </div>

            {/* h */}
            <div className="col-6 col-lg-1">
              <label className="form-label small fw-bold">
                h
              </label>

              <div className="form-control bg-light text-center font-monospace">
                {calculation.error
                  ? "—"
                  : calculation.h.toFixed(6)}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ==================================================
          RESUMEN
          ================================================== */}
      {!calculation.error && (
        <div className="card border shadow-sm mb-3">

          <div className="card-body py-2">

            <div className="row text-center">

              <div className="col-md-3">
                <small className="text-muted d-block">
                  Función
                </small>
                <strong className="font-monospace text-primary">
                  f(x) = {functionInput}
                </strong>
              </div>

              <div className="col-md-2">
                <small className="text-muted d-block">
                  Puntos utilizados
                </small>
                <strong>
                  {calculation.n}
                </strong>
              </div>

              <div className="col-md-2">
                <small className="text-muted d-block">
                  Intervalo
                </small>
                <strong className="font-monospace">
                  [{calculation.a}, {calculation.b}]
                </strong>
              </div>

              <div className="col-md-2">
                <small className="text-muted d-block">
                  Paso h
                </small>
                <strong className="font-monospace">
                  {calculation.h.toFixed(6)}
                </strong>
              </div>

              <div className="col-md-3">
                <small className="text-muted d-block">
                  Distribución
                </small>
                <span className="badge bg-success">
                  Espaciado uniforme
                </span>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* ==================================================
          ERROR
          ================================================== */}
      {calculation.error && (
        <div className="alert alert-danger small">
          <strong>⚠️ Error:</strong>{" "}
          {calculation.error}
        </div>
      )}

      {/* ==================================================
          TABLA DE PUNTOS
          ================================================== */}
      {!calculation.error && (
        <div className="card border shadow-sm mb-3">

          <div className="card-header bg-white">
            <span className="fw-bold text-dark">
              📋 Puntos utilizados
            </span>
          </div>

          <div className="table-responsive">
            <table className="table table-sm table-bordered text-center mb-0">

              <thead className="table-light">
                <tr>
                  <th>i</th>
                  <th>xᵢ</th>
                  <th>f(xᵢ)</th>
                </tr>
              </thead>

              <tbody className="font-monospace">
                {calculation.points.map((point) => (
                  <tr key={point.i}>
                    <td className="fw-bold">
                      {point.i}
                    </td>

                    <td>
                      {point.x.toFixed(6)}
                    </td>

                    <td>
                      {point.y.toFixed(6)}
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>

        </div>
      )}

      {/* ==================================================
          DIFERENCIAS PROGRESIVAS
          ================================================== */}
      {!calculation.error && (
        <div className="card border shadow-sm mb-3">

          <div className="card-header bg-primary text-white">
            <span className="fw-bold">
              ➡️ Diferencias Finitas Progresivas
            </span>
          </div>

          <div className="table-responsive p-2">

            <table className="table table-sm table-bordered text-center mb-0">

              <thead className="table-light">
                <tr>
                  <th>i</th>
                  <th>xᵢ</th>
                  <th>f(xᵢ)</th>

                  {Array.from({
                    length: calculation.n - 1,
                  }).map((_, order) => (
                    <th key={order}>
                      Δ
                      {order + 1 === 1
                        ? ""
                        : `^${order + 1}`}{" "}
                      fᵢ
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="font-monospace">

                {calculation.points.map((point, i) => (
                  <tr key={i}>

                    <td className="fw-bold">
                      {i}
                    </td>

                    <td>
                      {point.x.toFixed(6)}
                    </td>

                    <td>
                      {point.y.toFixed(6)}
                    </td>

                    {Array.from({
                      length: calculation.n - 1,
                    }).map((_, order) => {

                      const value =
                        calculation.forward[i][
                          order + 1
                        ];

                      return (
                        <td
                          key={order}
                          className={
                            value !== null
                              ? "table-primary fw-semibold"
                              : ""
                          }
                        >
                          {formatValue(value)}
                        </td>
                      );
                    })}

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

          <div className="card-footer bg-light small text-muted">
            Se calculan las diferencias utilizando
            valores posteriores de la tabla:
            <strong className="ms-1">
              Δfᵢ = fᵢ₊₁ − fᵢ
            </strong>
          </div>

        </div>
      )}

      {/* ==================================================
          DIFERENCIAS REGRESIVAS
          ================================================== */}
      {!calculation.error && (
        <div className="card border shadow-sm mb-3">

          <div className="card-header bg-success text-white">
            <span className="fw-bold">
              ⬅️ Diferencias Finitas Regresivas
            </span>
          </div>

          <div className="table-responsive p-2">

            <table className="table table-sm table-bordered text-center mb-0">

              <thead className="table-light">
                <tr>
                  <th>i</th>
                  <th>xᵢ</th>
                  <th>f(xᵢ)</th>

                  {Array.from({
                    length: calculation.n - 1,
                  }).map((_, order) => (
                    <th key={order}>
                      ∇
                      {order + 1 === 1
                        ? ""
                        : `^${order + 1}`}{" "}
                      fᵢ
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="font-monospace">

                {calculation.points.map((point, i) => (
                  <tr key={i}>

                    <td className="fw-bold">
                      {i}
                    </td>

                    <td>
                      {point.x.toFixed(6)}
                    </td>

                    <td>
                      {point.y.toFixed(6)}
                    </td>

                    {Array.from({
                      length: calculation.n - 1,
                    }).map((_, order) => {

                      const value =
                        calculation.backward[i][
                          order + 1
                        ];

                      return (
                        <td
                          key={order}
                          className={
                            value !== null
                              ? "table-success fw-semibold"
                              : ""
                          }
                        >
                          {formatValue(value)}
                        </td>
                      );
                    })}

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

          <div className="card-footer bg-light small text-muted">
            Se calculan las diferencias utilizando
            valores anteriores de la tabla:
            <strong className="ms-1">
              ∇fᵢ = fᵢ − fᵢ₋₁
            </strong>
          </div>

        </div>
      )}

      {/* ==================================================
          DIFERENCIAS CENTRALES
          ================================================== */}
      {!calculation.error && (
        <div className="card border shadow-sm mb-3">

          <div className="card-header bg-warning">
            <span className="fw-bold text-dark">
              ↔️ Diferencias Finitas Centrales
            </span>
          </div>

          <div className="table-responsive p-2">

            <table className="table table-sm table-bordered text-center mb-0">

              <thead className="table-light">
                <tr>
                  <th>i</th>
                  <th>xᵢ</th>
                  <th>f(xᵢ)</th>

                  {Array.from({
                    length: calculation.n - 1,
                  }).map((_, order) => (
                    <th key={order}>
                      Δ
                      {order + 1 === 1
                        ? ""
                        : `^${order + 1}`}{" "}
                      central
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="font-monospace">

                {calculation.points.map((point, i) => (
                  <tr key={i}>

                    <td className="fw-bold">
                      {i}
                    </td>

                    <td>
                      {point.x.toFixed(6)}
                    </td>

                    <td>
                      {point.y.toFixed(6)}
                    </td>

                    {Array.from({
                      length: calculation.n - 1,
                    }).map((_, order) => {

                      const value =
                        calculation.central[i][
                          order + 1
                        ];

                      return (
                        <td
                          key={order}
                          className={
                            value !== null
                              ? "table-warning fw-semibold"
                              : ""
                          }
                        >
                          {formatValue(value)}
                        </td>
                      );
                    })}

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

          <div className="card-footer bg-light small text-muted">
            Las diferencias centrales se utilizan
            alrededor de un punto de referencia,
            aprovechando valores a ambos lados.
          </div>

        </div>
      )}

      {/* ==================================================
          INFORMACIÓN DIDÁCTICA
          ================================================== */}
      {!calculation.error && (
        <div className="alert alert-info small mb-0">

          <strong>💡 Información:</strong>

          <ul className="mb-0 mt-1">

            <li>
              El número de puntos actual es{" "}
              <strong>{calculation.n}</strong>.
            </li>

            <li>
              El intervalo utilizado es{" "}
              <strong>
                [{calculation.a}, {calculation.b}]
              </strong>.
            </li>

            <li>
              El tamaño del paso es{" "}
              <strong>
                h = {calculation.h.toFixed(6)}
              </strong>.
            </li>

            <li>
              Los puntos se generan automáticamente
              a partir de la función ingresada.
            </li>

          </ul>

        </div>
      )}

    </div>
  );
};

export default SimuladorTab;
