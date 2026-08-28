
import React, { useMemo, useState } from "react";

// ======================================================
// SIMULADOR DE DERIVADAS NUMÉRICAS
// Primer, segundo y tercer orden
// ======================================================

const SimuladorTab = () => {
  // ======================================================
  // 1. DATOS DE ENTRADA
  // ======================================================

  const [functionInput, setFunctionInput] = useState("sin(x)");

  // Punto donde se calculará la derivada
  const [x0, setX0] = useState(0.5);

  // Tamaño del paso
  const [h, setH] = useState(0.1);

  // Orden de derivación
  const [derivativeOrder, setDerivativeOrder] = useState(1);

  // ======================================================
  // 2. EVALUACIÓN DE LA FUNCIÓN
  // ======================================================

  const evaluateFunction = (x) => {
    try {
      let expression = functionInput.trim();

      if (!expression) {
        return NaN;
      }

      // Potencias
      expression = expression.replace(/\^/g, "**");

      // Funciones matemáticas
      expression = expression.replace(/\bsin\s*\(/g, "Math.sin(");
      expression = expression.replace(/\bcos\s*\(/g, "Math.cos(");
      expression = expression.replace(/\btan\s*\(/g, "Math.tan(");

      expression = expression.replace(/\bln\s*\(/g, "Math.log(");
      expression = expression.replace(/\blog\s*\(/g, "Math.log10(");

      expression = expression.replace(/\bsqrt\s*\(/g, "Math.sqrt(");
      expression = expression.replace(/\bexp\s*\(/g, "Math.exp(");
      expression = expression.replace(/\babs\s*\(/g, "Math.abs(");

      // Constantes
      expression = expression.replace(/\bpi\b/gi, "Math.PI");
      expression = expression.replace(/\be\b/g, "Math.E");

      // Crear función
      // eslint-disable-next-line no-new-func
      const fn = new Function("x", `return ${expression};`);

      const result = fn(x);

      return Number.isFinite(result) ? result : NaN;
    } catch {
      return NaN;
    }
  };

  // ======================================================
  // 3. CÁLCULOS DE DERIVACIÓN NUMÉRICA
  // ======================================================

  const calculation = useMemo(() => {
    const x = Number(x0);
    const step = Number(h);
    const order = Number(derivativeOrder);

    if (!Number.isFinite(x)) {
      return {
        error: "El punto x₀ debe ser un valor numérico.",
      };
    }

    if (!Number.isFinite(step) || step <= 0) {
      return {
        error: "El valor de h debe ser mayor que cero.",
      };
    }

    if (![1, 2, 3].includes(order)) {
      return {
        error: "El orden de derivación debe ser 1, 2 o 3.",
      };
    }

    // ==================================================
    // 4. VALORES DE LA FUNCIÓN
    // ==================================================

    const values = {};

    const evaluate = (offset) => {
      const xValue = x + offset * step;
      const yValue = evaluateFunction(xValue);

      values[offset] = {
        x: xValue,
        y: yValue,
      };

      return yValue;
    };

    // ==================================================
    // 5. GENERAR LOS PUNTOS NECESARIOS
    // ==================================================

    // Para tercer orden necesitamos hasta ±2h
    const offsets = [-2, -1, 0, 1, 2];

    offsets.forEach((offset) => {
      evaluate(offset);
    });

    // Validar valores
    const invalidValues = offsets.some(
      (offset) => !Number.isFinite(values[offset].y)
    );

    if (invalidValues) {
      return {
        error:
          "No se pudo evaluar la función en alguno de los puntos requeridos.",
      };
    }

    // ==================================================
    // 6. PRIMERA DERIVADA
    // ==================================================

    // Progresiva:
    // f'(x) ≈ [-3f(x)+4f(x+h)-f(x+2h)] / 2h

    const firstForward =
      (-3 * values[0].y +
        4 * values[1].y -
        values[2].y) /
      (2 * step);

    // Regresiva:
    // f'(x) ≈ [3f(x)-4f(x-h)+f(x-2h)] / 2h

    const firstBackward =
      (3 * values[0].y -
        4 * values[-1].y +
        values[-2].y) /
      (2 * step);

    // Central:
    // f'(x) ≈ [f(x+h)-f(x-h)] / 2h

    const firstCentral =
      (values[1].y - values[-1].y) /
      (2 * step);

    // ==================================================
    // 7. SEGUNDA DERIVADA
    // ==================================================

    // Progresiva:
    // f''(x) ≈
    // [f(x)-2f(x+h)+f(x+2h)] / h²

    const secondForward =
      (values[0].y -
        2 * values[1].y +
        values[2].y) /
      (step * step);

    // Regresiva:
    // f''(x) ≈
    // [f(x)-2f(x-h)+f(x-2h)] / h²

    const secondBackward =
      (values[0].y -
        2 * values[-1].y +
        values[-2].y) /
      (step * step);

    // Central:
    // f''(x) ≈
    // [f(x+h)-2f(x)+f(x-h)] / h²

    const secondCentral =
      (values[1].y -
        2 * values[0].y +
        values[-1].y) /
      (step * step);

    // ==================================================
    // 8. TERCERA DERIVADA
    // ==================================================

    // Progresiva:
    // f'''(x) ≈
    // [-5f(x)+18f(x+h)-24f(x+2h)
    // +14f(x+3h)-3f(x+4h)] / 2h³

    const f3 = evaluate(3);
    const f4 = evaluate(4);

    const thirdForward =
      (-5 * values[0].y +
        18 * values[1].y -
        24 * values[2].y +
        14 * f3 -
        3 * f4) /
      (2 * Math.pow(step, 3));

    // Regresiva:
    // f'''(x) ≈
    // [5f(x)-18f(x-h)+24f(x-2h)
    // -14f(x-3h)+3f(x-4h)] / 2h³

    const fm3 = values[-3]?.y ?? evaluate(-3);
    const fm4 = values[-4]?.y ?? evaluate(-4);

    const thirdBackward =
      (5 * values[0].y -
        18 * values[-1].y +
        24 * values[-2].y -
        14 * fm3 +
        3 * fm4) /
      (2 * Math.pow(step, 3));

    // Central:
    // f'''(x) ≈
    // [f(x+2h)-2f(x+h)+2f(x-h)-f(x-2h)] / 2h³

    const thirdCentral =
      (values[2].y -
        2 * values[1].y +
        2 * values[-1].y -
        values[-2].y) /
      (2 * Math.pow(step, 3));

    // ==================================================
    // 9. SELECCIONAR RESULTADOS SEGÚN EL ORDEN
    // ==================================================

    let results;

    if (order === 1) {
      results = {
        forward: firstForward,
        backward: firstBackward,
        central: firstCentral,
      };
    } else if (order === 2) {
      results = {
        forward: secondForward,
        backward: secondBackward,
        central: secondCentral,
      };
    } else {
      results = {
        forward: thirdForward,
        backward: thirdBackward,
        central: thirdCentral,
      };
    }

    // ==================================================
    // 10. DERIVADA EXACTA PARA COMPARACIÓN
    // ==================================================

    let exactValue = null;

    try {
      let expression = functionInput.trim();

      // Aproximación mediante diferencias centrales de
      // orden muy pequeño para obtener una referencia.
      //
      // No se muestra como derivada analítica.
      // Se utiliza únicamente como referencia numérica.

      const tinyH = 0.000001;

      if (order === 1) {
        exactValue =
          (evaluateFunction(x + tinyH) -
            evaluateFunction(x - tinyH)) /
          (2 * tinyH);
      }

      if (order === 2) {
        exactValue =
          (evaluateFunction(x + tinyH) -
            2 * evaluateFunction(x) +
            evaluateFunction(x - tinyH)) /
          (tinyH * tinyH);
      }

      if (order === 3) {
        exactValue =
          (evaluateFunction(x + 2 * tinyH) -
            2 * evaluateFunction(x + tinyH) +
            2 * evaluateFunction(x - tinyH) -
            evaluateFunction(x - 2 * tinyH)) /
          (2 * Math.pow(tinyH, 3));
      }

      if (!Number.isFinite(exactValue)) {
        exactValue = null;
      }
    } catch {
      exactValue = null;
    }

    return {
      error: null,
      x,
      h: step,
      order,
      values,
      results,
      exactValue,
    };
  }, [functionInput, x0, h, derivativeOrder]);

  // ======================================================
  // 11. FORMATO DE VALORES
  // ======================================================

  const formatValue = (value) => {
    if (value === null || value === undefined) {
      return "—";
    }

    if (!Number.isFinite(value)) {
      return "—";
    }

    return value.toFixed(8);
  };

  // ======================================================
  // 12. NOMBRE DE LA DERIVADA
  // ======================================================

  const derivativeName = {
    1: "Primera derivada f′(x)",
    2: "Segunda derivada f″(x)",
    3: "Tercera derivada f‴(x)",
  };

  // ======================================================
  // 13. RENDER
  // ======================================================

  return (
    <div className="p-3 border rounded bg-light">

      {/* ==================================================
          ENCABEZADO
          ================================================== */}

      <div className="mb-3 pb-2 border-bottom">

        <h5 className="text-primary fw-bold mb-1">

          <span className="me-2">📐</span>

          Simulador de Derivadas Numéricas

        </h5>

        <p className="text-muted small mb-0">

          Aproximación numérica de derivadas de
          primer, segundo y tercer orden mediante
          diferencias finitas.

        </p>

      </div>

      {/* ==================================================
          CONFIGURACIÓN
          ================================================== */}

      <div className="card border shadow-sm mb-3">

        <div className="card-header bg-white">

          <span className="fw-bold text-dark">
            ⚙️ Configuración
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
                onChange={(event) =>
                  setFunctionInput(event.target.value)
                }
                placeholder="Ejemplo: sin(x)"
              />

              <div className="form-text">

                Ejemplos:{" "}
                <code>sin(x)</code>,{" "}
                <code>cos(x)</code>,{" "}
                <code>x^2</code>,{" "}
                <code>ln(x)</code>

              </div>

            </div>

            {/* x0 */}

            <div className="col-6 col-lg-2">

              <label className="form-label small fw-bold">
                Punto x₀
              </label>

              <input
                type="number"
                step="any"
                className="form-control"
                value={x0}
                onChange={(event) =>
                  setX0(event.target.value)
                }
              />

            </div>

            {/* h */}

            <div className="col-6 col-lg-2">

              <label className="form-label small fw-bold">
                Paso h
              </label>

              <input
                type="number"
                step="any"
                min="0.000001"
                className="form-control"
                value={h}
                onChange={(event) =>
                  setH(event.target.value)
                }
              />

            </div>

            {/* ORDEN */}

            <div className="col-12 col-lg-3">

              <label className="form-label small fw-bold">
                Orden de derivación
              </label>

              <select
                className="form-select"
                value={derivativeOrder}
                onChange={(event) =>
                  setDerivativeOrder(
                    Number(event.target.value)
                  )
                }
              >

                <option value={1}>
                  Primera derivada f′(x)
                </option>

                <option value={2}>
                  Segunda derivada f″(x)
                </option>

                <option value={3}>
                  Tercera derivada f‴(x)
                </option>

              </select>

            </div>

          </div>

        </div>
      </div>

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
          INFORMACIÓN DEL PROBLEMA
          ================================================== */}

      {!calculation.error && (

        <div className="card border shadow-sm mb-3">

          <div className="card-body py-2">

            <div className="row text-center">

              <div className="col-md-4">

                <small className="text-muted d-block">
                  Función
                </small>

                <strong className="font-monospace text-primary">
                  f(x) = {functionInput}
                </strong>

              </div>

              <div className="col-md-2">

                <small className="text-muted d-block">
                  Punto
                </small>

                <strong>
                  x₀ = {calculation.x}
                </strong>

              </div>

              <div className="col-md-2">

                <small className="text-muted d-block">
                  Paso
                </small>

                <strong className="font-monospace">
                  h = {calculation.h}
                </strong>

              </div>

              <div className="col-md-4">

                <small className="text-muted d-block">
                  Cálculo seleccionado
                </small>

                <span className="badge bg-primary">
                  {derivativeName[calculation.order]}
                </span>

              </div>

            </div>

          </div>

        </div>

      )}

      {/* ==================================================
          TABLA DE VALORES
          ================================================== */}

      {!calculation.error && (

        <div className="card border shadow-sm mb-3">

          <div className="card-header bg-white">

            <span className="fw-bold text-dark">
              📋 Valores utilizados
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

                {Object.keys(calculation.values)
                  .map(Number)
                  .sort((a, b) => a - b)
                  .map((offset) => {

                    const point =
                      calculation.values[offset];

                    return (

                      <tr key={offset}>

                        <td className="fw-bold">

                          {offset > 0
                            ? `+${offset}`
                            : offset}

                        </td>

                        <td>
                          {formatValue(point.x)}
                        </td>

                        <td>
                          {formatValue(point.y)}
                        </td>

                      </tr>

                    );

                  })}

              </tbody>

            </table>

          </div>

        </div>

      )}

      {/* ==================================================
          RESULTADOS
          ================================================== */}

      {!calculation.error && (

        <div className="card border shadow-sm mb-3">

          <div className="card-header bg-primary text-white">

            <span className="fw-bold">

              📊 {derivativeName[calculation.order]}

            </span>

          </div>

          <div className="card-body">

            <div className="row g-3">

              {/* PROGRESIVA */}

              <div className="col-12 col-md-4">

                <div className="card h-100 border">

                  <div className="card-header bg-primary text-white text-center">

                    <strong>
                      ➡️ Progresiva
                    </strong>

                  </div>

                  <div className="card-body text-center">

                    <small className="text-muted d-block">
                      Aproximación
                    </small>

                    <div className="display-6 fw-bold text-primary font-monospace">

                      {formatValue(
                        calculation.results.forward
                      )}

                    </div>

                  </div>

                </div>

              </div>

              {/* REGRESIVA */}

              <div className="col-12 col-md-4">

                <div className="card h-100 border">

                  <div className="card-header bg-success text-white text-center">

                    <strong>
                      ⬅️ Regresiva
                    </strong>

                  </div>

                  <div className="card-body text-center">

                    <small className="text-muted d-block">
                      Aproximación
                    </small>

                    <div className="display-6 fw-bold text-success font-monospace">

                      {formatValue(
                        calculation.results.backward
                      )}

                    </div>

                  </div>

                </div>

              </div>

              {/* CENTRAL */}

              <div className="col-12 col-md-4">

                <div className="card h-100 border">

                  <div className="card-header bg-warning text-dark text-center">

                    <strong>
                      ↔️ Central
                    </strong>

                  </div>

                  <div className="card-body text-center">

                    <small className="text-muted d-block">
                      Aproximación
                    </small>

                    <div className="display-6 fw-bold text-dark font-monospace">

                      {formatValue(
                        calculation.results.central
                      )}

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      )}

      {/* ==================================================
          FÓRMULAS
          ================================================== */}

      {!calculation.error && (

        <div className="card border shadow-sm mb-3">

          <div className="card-header bg-white">

            <span className="fw-bold">
              📘 Fórmulas utilizadas
            </span>

          </div>

          <div className="card-body small">

            {calculation.order === 1 && (

              <>

                <div className="mb-2">

                  <strong>Progresiva:</strong>

                  <div className="font-monospace mt-1">
                    f′(x) ≈ [-3f(x) + 4f(x+h) − f(x+2h)] / (2h)
                  </div>

                </div>

                <div className="mb-2">

                  <strong>Regresiva:</strong>

                  <div className="font-monospace mt-1">
                    f′(x) ≈ [3f(x) − 4f(x−h) + f(x−2h)] / (2h)
                  </div>

                </div>

                <div>

                  <strong>Central:</strong>

                  <div className="font-monospace mt-1">
                    f′(x) ≈ [f(x+h) − f(x−h)] / (2h)
                  </div>

                </div>

              </>

            )}

            {calculation.order === 2 && (

              <>

                <div className="mb-2">

                  <strong>Progresiva:</strong>

                  <div className="font-monospace mt-1">
                    f″(x) ≈ [f(x) − 2f(x+h) + f(x+2h)] / h²
                  </div>

                </div>

                <div className="mb-2">

                  <strong>Regresiva:</strong>

                  <div className="font-monospace mt-1">
                    f″(x) ≈ [f(x) − 2f(x−h) + f(x−2h)] / h²
                  </div>

                </div>

                <div>

                  <strong>Central:</strong>

                  <div className="font-monospace mt-1">
                    f″(x) ≈ [f(x+h) − 2f(x) + f(x−h)] / h²
                  </div>

                </div>

              </>

            )}

            {calculation.order === 3 && (

              <>

                <div className="mb-2">

                  <strong>Progresiva:</strong>

                  <div className="font-monospace mt-1">
                    f‴(x) ≈ [-5f(x) + 18f(x+h) − 24f(x+2h)
                    + 14f(x+3h) − 3f(x+4h)] / (2h³)
                  </div>

                </div>

                <div className="mb-2">

                  <strong>Regresiva:</strong>

                  <div className="font-monospace mt-1">
                    f‴(x) ≈ [5f(x) − 18f(x−h) + 24f(x−2h)
                    − 14f(x−3h) + 3f(x−4h)] / (2h³)
                  </div>

                </div>

                <div>

                  <strong>Central:</strong>

                  <div className="font-monospace mt-1">
                    f‴(x) ≈ [f(x+2h) − 2f(x+h)
                    + 2f(x−h) − f(x−2h)] / (2h³)
                  </div>

                </div>

              </>

            )}

          </div>

        </div>

      )}

      {/* ==================================================
          NOTA DIDÁCTICA
          ================================================== */}

      {!calculation.error && (

        <div className="alert alert-info small mb-0">

          <strong>💡 Nota didáctica:</strong>

          <ul className="mb-0 mt-2">

            <li>
              La derivada se aproxima utilizando
              valores de la función alrededor de
              <strong> x₀</strong>.
            </li>

            <li>
              El valor de <strong>h</strong> controla
              la separación entre los puntos.
            </li>

            <li>
              Las fórmulas centrales suelen ofrecer
              una mayor precisión que las fórmulas
              progresivas y regresivas cuando el
              punto de evaluación permite utilizar
              valores a ambos lados.
            </li>

            <li>
              Puedes cambiar la función, el punto
              x₀, el valor de h y el orden de
              derivación para observar cómo cambia
              la aproximación.
            </li>

          </ul>

        </div>

      )}

    </div>
  );
};

export default SimuladorTab;

