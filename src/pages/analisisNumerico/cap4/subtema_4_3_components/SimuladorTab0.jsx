```jsx
import React, { useMemo, useState } from "react";

// ============================================================
// EVALUADOR DE FUNCIONES
// ============================================================

const evaluateFunction = (expr, xVal) => {
  try {
    let sanitized = String(expr)
      .toLowerCase()
      .replace(/\s+/g, "")
      .replace(/\^/g, "**");

    sanitized = sanitized
      .replace(/\bsin\b/g, "Math.sin")
      .replace(/\bcos\b/g, "Math.cos")
      .replace(/\btan\b/g, "Math.tan")
      .replace(/\basin\b/g, "Math.asin")
      .replace(/\bacos\b/g, "Math.acos")
      .replace(/\batan\b/g, "Math.atan")
      .replace(/\bexp\b/g, "Math.exp")
      .replace(/\bsqrt\b/g, "Math.sqrt")
      .replace(/\babs\b/g, "Math.abs")
      .replace(/\blog\b/g, "Math.log")
      .replace(/\bln\b/g, "Math.log")
      .replace(/\bpi\b/g, "Math.PI")
      .replace(/\be\b/g, "Math.E");

    // Sustituir x sin utilizar template literals
    sanitized = sanitized.replace(
      /\bx\b/g,
      "(" + xVal + ")"
    );

    // eslint-disable-next-line no-new-func
    const result = Function(
      '"use strict"; return (' +
        sanitized +
        ");"
    )();

    if (
      typeof result === "number" &&
      Number.isFinite(result)
    ) {
      return result;
    }

    return null;
  } catch {
    return null;
  }
};

// ============================================================
// FORMATO DE NÚMEROS
// ============================================================

const formatNumber = (
  value,
  digits = 8
) => {
  if (
    value === null ||
    value === undefined ||
    !Number.isFinite(value)
  ) {
    return "—";
  }

  return Number(value).toFixed(digits);
};

// ============================================================
// DERIVADA EXACTA PARA FUNCIONES CONOCIDAS
// ============================================================

const getExactDerivative = (
  expr,
  x
) => {
  const clean = String(expr)
    .toLowerCase()
    .replace(/\s+/g, "");

  const value = Number(x);

  try {
    if (clean === "x") {
      return 1;
    }

    if (clean === "x^2") {
      return 2 * value;
    }

    if (clean === "x^3") {
      return 3 * value * value;
    }

    if (clean === "x^4") {
      return 4 * value * value * value;
    }

    if (clean === "x^5") {
      return (
        5 *
        value *
        value *
        value *
        value
      );
    }

    if (clean === "sin(x)") {
      return Math.cos(value);
    }

    if (clean === "cos(x)") {
      return -Math.sin(value);
    }

    if (clean === "tan(x)") {
      return (
        1 /
        (Math.cos(value) *
          Math.cos(value))
      );
    }

    if (clean === "exp(x)") {
      return Math.exp(value);
    }

    if (clean === "e^x") {
      return Math.exp(value);
    }

    if (
      clean === "ln(x)" ||
      clean === "log(x)"
    ) {
      return 1 / value;
    }

    if (clean === "sqrt(x)") {
      return (
        1 /
        (2 * Math.sqrt(value))
      );
    }

    if (clean === "1/(1+x^2)") {
      const denominator =
        1 + value * value;

      return (
        (-2 * value) /
        (denominator *
          denominator)
      );
    }

    return null;
  } catch {
    return null;
  }
};

// ============================================================
// INFORMACIÓN DE MÉTODOS
// ============================================================

const METHOD_INFO = {
  progressive: {
    title:
      "Diferencias Finitas Progresivas",
    shortTitle: "Progresivas",
    color: "#0d6efd",
    icon: "→",
    description:
      "Utilizan el punto de interés y valores posteriores.",
  },

  backward: {
    title:
      "Diferencias Finitas Regresivas",
    shortTitle: "Regresivas",
    color: "#198754",
    icon: "←",
    description:
      "Utilizan el punto de interés y valores anteriores.",
  },

  central: {
    title:
      "Diferencias Finitas Centrales",
    shortTitle: "Centrales",
    color: "#fd7e14",
    icon: "↔",
    description:
      "Utilizan valores a ambos lados del punto de interés.",
  },
};

// ============================================================
// FÓRMULAS
// ============================================================

const FORMULAS = {
  progressive1:
    "f'(x₀) ≈ [f(x₀+h) − f(x₀)] / h",

  progressive2:
    "f'(x₀) ≈ [−3f(x₀) + 4f(x₀+h) − f(x₀+2h)] / (2h)",

  backward1:
    "f'(x₀) ≈ [f(x₀) − f(x₀−h)] / h",

  backward2:
    "f'(x₀) ≈ [3f(x₀) − 4f(x₀−h) + f(x₀−2h)] / (2h)",

  central2:
    "f'(x₀) ≈ [f(x₀+h) − f(x₀−h)] / (2h)",

  central4:
    "f'(x₀) ≈ [f(x₀−2h) − 8f(x₀−h) + 8f(x₀+h) − f(x₀+2h)] / (12h)",
};

// ============================================================
// TABLA DE CÁLCULO
// ============================================================

const CalculationTable = ({
  rows,
  numerator,
  denominator,
}) => {
  return (
    <div className="table-responsive bg-white rounded border shadow-sm mt-3">
      <table className="table table-sm table-hover mb-0 text-center small">
        <thead className="table-light">
          <tr>
            <th>Punto</th>
            <th>x</th>
            <th>f(x)</th>
            <th>Coeficiente</th>
            <th>Contribución</th>
          </tr>
        </thead>

        <tbody className="font-monospace">
          {rows.map(
            (row, index) => (
              <tr key={index}>
                <td className="fw-bold">
                  {row.label}
                </td>

                <td>
                  {formatNumber(
                    row.x,
                    6
                  )}
                </td>

                <td>
                  {formatNumber(
                    row.fx,
                    10
                  )}
                </td>

                <td>
                  <span className="badge bg-light text-dark border">
                    {row.coefficient}
                  </span>
                </td>

                <td>
                  {formatNumber(
                    row.contribution,
                    10
                  )}
                </td>
              </tr>
            )
          )}

          <tr className="table-secondary fw-bold">
            <td
              colSpan="4"
              className="text-end"
            >
              Numerador:
            </td>

            <td>
              {formatNumber(
                numerator,
                10
              )}
            </td>
          </tr>

          <tr className="table-secondary fw-bold">
            <td
              colSpan="4"
              className="text-end"
            >
              Denominador:
            </td>

            <td>
              {formatNumber(
                denominator,
                10
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

// ============================================================
// CÁLCULO DE LA DERIVADA
// ============================================================

const calculateDerivative = ({
  expr,
  x0,
  h,
  method,
  order,
}) => {
  const x = Number(x0);
  const step = Number(h);

  if (!Number.isFinite(x)) {
    return {
      error:
        "El punto x₀ no es válido.",
    };
  }

  if (
    !Number.isFinite(step) ||
    step <= 0
  ) {
    return {
      error:
        "El paso h debe ser mayor que cero.",
    };
  }

  const rows = [];
  let numerator = 0;
  let denominator = 1;

  const addRow = (
    label,
    position,
    coefficient
  ) => {
    const fx = evaluateFunction(
      expr,
      position
    );

    if (fx === null) {
      return false;
    }

    const contribution =
      coefficient * fx;

    rows.push({
      label,
      x: position,
      fx,
      coefficient,
      contribution,
    });

    numerator += contribution;

    return true;
  };

  // ----------------------------------------------------------
  // PROGRESIVA
  // ----------------------------------------------------------

  if (
    method === "progressive" &&
    order === 1
  ) {
    if (
      !addRow(
        "x₀",
        x,
        -1
      ) ||
      !addRow(
        "x₀+h",
        x + step,
        1
      )
    ) {
      return {
        error:
          "No fue posible evaluar la función.",
      };
    }

    denominator = step;
  }

  if (
    method === "progressive" &&
    order === 2
  ) {
    if (
      !addRow(
        "x₀",
        x,
        -3
      ) ||
      !addRow(
        "x₀+h",
        x + step,
        4
      ) ||
      !addRow(
        "x₀+2h",
        x + 2 * step,
        -1
      )
    ) {
      return {
        error:
          "No fue posible evaluar la función.",
      };
    }

    denominator = 2 * step;
  }

  // ----------------------------------------------------------
  // REGRESIVA
  // ----------------------------------------------------------

  if (
    method === "backward" &&
    order === 1
  ) {
    if (
      !addRow(
        "x₀",
        x,
        1
      ) ||
      !addRow(
        "x₀−h",
        x - step,
        -1
      )
    ) {
      return {
        error:
          "No fue posible evaluar la función.",
      };
    }

    denominator = step;
  }

  if (
    method === "backward" &&
    order === 2
  ) {
    if (
      !addRow(
        "x₀",
        x,
        3
      ) ||
      !addRow(
        "x₀−h",
        x - step,
        -4
      ) ||
      !addRow(
        "x₀−2h",
        x - 2 * step,
        1
      )
    ) {
      return {
        error:
          "No fue posible evaluar la función.",
      };
    }

    denominator = 2 * step;
  }

  // ----------------------------------------------------------
  // CENTRAL
  // ----------------------------------------------------------

  if (
    method === "central" &&
    order === 2
  ) {
    if (
      !addRow(
        "x₀−h",
        x - step,
        -1
      ) ||
      !addRow(
        "x₀+h",
        x + step,
        1
      )
    ) {
      return {
        error:
          "No fue posible evaluar la función.",
      };
    }

    denominator = 2 * step;
  }

  if (
    method === "central" &&
    order === 4
  ) {
    if (
      !addRow(
        "x₀−2h",
        x - 2 * step,
        1
      ) ||
      !addRow(
        "x₀−h",
        x - step,
        -8
      ) ||
      !addRow(
        "x₀+h",
        x + step,
        8
      ) ||
      !addRow(
        "x₀+2h",
        x + 2 * step,
        -1
      )
    ) {
      return {
        error:
          "No fue posible evaluar la función.",
      };
    }

    denominator = 12 * step;
  }

  const derivative =
    numerator / denominator;

  const exact =
    getExactDerivative(
      expr,
      x
    );

  let absoluteError = null;
  let relativeError = null;

  if (exact !== null) {
    absoluteError =
      Math.abs(
        derivative - exact
      );

    if (exact !== 0) {
      relativeError =
        (absoluteError /
          Math.abs(exact)) *
        100;
    }
  }

  return {
    derivative,
    exact,
    absoluteError,
    relativeError,
    rows,
    numerator,
    denominator,
  };
};

// ============================================================
// GRÁFICA
// ============================================================

const FunctionPlotSVG = ({
  expr,
  x0,
  h,
  points,
  themeColor,
}) => {
  const graph =
    useMemo(() => {
      const center = Number(x0);
      const step = Number(h);

      if (
        !Number.isFinite(
          center
        ) ||
        !Number.isFinite(
          step
        ) ||
        step <= 0
      ) {
        return null;
      }

      const range = Math.max(
        step * 5,
        1
      );

      const xMin =
        center - range;

      const xMax =
        center + range;

      const samples = 200;
      const curve = [];

      let yMin = Infinity;
      let yMax = -Infinity;

      for (
        let i = 0;
        i <= samples;
        i++
      ) {
        const x =
          xMin +
          (i *
            (xMax - xMin)) /
            samples;

        const y =
          evaluateFunction(
            expr,
            x
          );

        if (
          y !== null &&
          Math.abs(y) <
            100000
        ) {
          curve.push({
            x,
            y,
          });

          yMin = Math.min(
            yMin,
            y
          );

          yMax = Math.max(
            yMax,
            y
          );
        }
      }

      if (
        curve.length < 2
      ) {
        return null;
      }

      if (
        Math.abs(
          yMax - yMin
        ) < 1e-12
      ) {
        yMin -= 1;
        yMax += 1;
      }

      const marginY =
        (yMax - yMin) *
        0.15;

      yMin -= marginY;
      yMax += marginY;

      const svgW = 720;
      const svgH = 340;

      const padL = 55;
      const padR = 25;
      const padT = 25;
      const padB = 45;

      const plotW =
        svgW -
        padL -
        padR;

      const plotH =
        svgH -
        padT -
        padB;

      const mapX = (value) =>
        padL +
        ((value - xMin) /
          (xMax - xMin)) *
          plotW;

      const mapY = (value) =>
        padT +
        plotH -
        ((value - yMin) /
          (yMax - yMin)) *
          plotH;

      const curvePath =
        curve
          .map(
            (point, index) =>
              (index === 0
                ? "M"
                : "L") +
              " " +
              mapX(
                point.x
              ).toFixed(2) +
              " " +
              mapY(
                point.y
              ).toFixed(2)
          )
          .join(" ");

      let axisY =
        mapY(0);

      if (
        axisY < padT
      ) {
        axisY = padT;
      }

      if (
        axisY >
        padT + plotH
      ) {
        axisY =
          padT + plotH;
      }

      let axisX =
        mapX(0);

      if (
        axisX < padL
      ) {
        axisX = padL;
      }

      if (
        axisX >
        padL + plotW
      ) {
        axisX =
          padL + plotW;
      }

      return {
        svgW,
        svgH,
        curvePath,
        mapX,
        mapY,
        axisY,
        axisX,
      };
    }, [expr, x0, h]);

  if (!graph) {
    return null;
  }

  return (
    <div className="card p-2 bg-white mb-3 border shadow-sm">
      <div className="text-center small text-muted mb-1">
        Representación de la función y
        puntos utilizados
      </div>

      <svg
        viewBox={
          "0 0 " +
          graph.svgW +
          " " +
          graph.svgH
        }
        className="w-100"
        style={{
          maxHeight: "350px",
        }}
      >
        <line
          x1={graph.axisX}
          y1={graph.axisY}
          x2={graph.svgW - 20}
          y2={graph.axisY}
          stroke="#adb5bd"
          strokeWidth="1.5"
        />

        <line
          x1={graph.axisX}
          y1="20"
          x2={graph.axisX}
          y2={
            graph.svgH - 40
          }
          stroke="#adb5bd"
          strokeWidth="1.5"
        />

        <path
          d={graph.curvePath}
          fill="none"
          stroke="#dc3545"
          strokeWidth="2.5"
        />

        {points.map(
          (point, index) => {
            const cx =
              graph.mapX(
                point.x
              );

            const cy =
              graph.mapY(
                point.fx
              );

            return (
              <g key={index}>
                <circle
                  cx={cx}
                  cy={cy}
                  r="6"
                  fill={
                    themeColor
                  }
                  stroke="#ffffff"
                  strokeWidth="2"
                />

                <text
                  x={cx}
                  y={cy - 12}
                  fontSize="11"
                  textAnchor="middle"
                  fill="#343a40"
                  fontWeight="bold"
                >
                  {
                    point.label
                  }
                </text>

                <text
                  x={cx}
                  y={
                    graph.axisY +
                    18
                  }
                  fontSize="10"
                  textAnchor="middle"
                  fill="#6c757d"
                >
                  {point.x.toFixed(
                    3
                  )}
                </text>
              </g>
            );
          }
        )}
      </svg>
    </div>
  );
};

// ============================================================
// COMPARACIÓN DE DIFERENTES VALORES DE h
// ============================================================

const ComparisonTable = ({
  expr,
  x0,
  method,
  order,
}) => {
  const data =
    useMemo(() => {
      const hValues = [
        0.5,
        0.1,
        0.05,
        0.01,
        0.005,
        0.001,
      ];

      return hValues.map(
        (step) => {
          const result =
            calculateDerivative({
              expr,
              x0,
              h: step,
              method,
              order,
            });

          return {
            h: step,
            derivative:
              result.derivative,
            exact:
              result.exact,
            error:
              result.absoluteError,
            relative:
              result.relativeError,
          };
        }
      );
    }, [
      expr,
      x0,
      method,
      order,
    ]);

  return (
    <div className="table-responsive bg-white rounded border shadow-sm mt-3">
      <table className="table table-sm table-hover mb-0 text-center small">
        <thead className="table-light">
          <tr>
            <th>h</th>
            <th>Derivada numérica</th>
            <th>Derivada exacta</th>
            <th>Error absoluto</th>
            <th>Error relativo (%)</th>
          </tr>
        </thead>

        <tbody className="font-monospace">
          {data.map(
            (row, index) => (
              <tr key={index}>
                <td>
                  {row.h}
                </td>

                <td>
                  {formatNumber(
                    row.derivative,
                    10
                  )}
                </td>

                <td>
                  {formatNumber(
                    row.exact,
                    10
                  )}
                </td>

                <td>
                  {formatNumber(
                    row.error,
                    10
                  )}
                </td>

                <td>
                  {row.relative !==
                  null
                    ? formatNumber(
                        row.relative,
                        8
                      )
                    : "—"}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

// ============================================================
// SIMULADOR
// ============================================================

const DerivativeSimulator = ({
  method,
}) => {
  const info =
    METHOD_INFO[method];

  const initialOrder =
    method === "central"
      ? 2
      : 1;

  const [expr, setExpr] =
    useState("x^2");

  const [x0, setX0] =
    useState(2);

  const [h, setH] =
    useState(0.1);

  const [order, setOrder] =
    useState(initialOrder);

  const [showTable, setShowTable] =
    useState(true);

  const [
    showComparison,
    setShowComparison,
  ] = useState(false);

  const calculation =
    useMemo(
      () =>
        calculateDerivative({
          expr,
          x0,
          h,
          method,
          order,
        }),
      [
        expr,
        x0,
        h,
        method,
        order,
      ]
    );

  const graphPoints =
    useMemo(() => {
      const x = Number(x0);
      const step = Number(h);

      if (
        !Number.isFinite(x) ||
        !Number.isFinite(step) ||
        step <= 0
      ) {
        return [];
      }

      let positions = [];

      if (
        method ===
        "progressive"
      ) {
        if (order === 1) {
          positions = [
            {
              label: "x₀",
              x,
            },
            {
              label: "x₀+h",
              x: x + step,
            },
          ];
        }

        if (order === 2) {
          positions = [
            {
              label: "x₀",
              x,
            },
            {
              label: "x₀+h",
              x: x + step,
            },
            {
              label: "x₀+2h",
              x:
                x +
                2 * step,
            },
          ];
        }
      }

      if (
        method === "backward"
      ) {
        if (order === 1) {
          positions = [
            {
              label: "x₀−h",
              x:
                x - step,
            },
            {
              label: "x₀",
              x,
            },
          ];
        }

        if (order === 2) {
          positions = [
            {
              label: "x₀−2h",
              x:
                x -
                2 * step,
            },
            {
              label: "x₀−h",
              x:
                x - step,
            },
            {
              label: "x₀",
              x,
            },
          ];
        }
      }

      if (
        method === "central"
      ) {
        if (order === 2) {
          positions = [
            {
              label: "x₀−h",
              x:
                x - step,
            },
            {
              label: "x₀",
              x,
            },
            {
              label: "x₀+h",
              x: x + step,
            },
          ];
        }

        if (order === 4) {
          positions = [
            {
              label: "x₀−2h",
              x:
                x -
                2 * step,
            },
            {
              label: "x₀−h",
              x:
                x - step,
            },
            {
              label: "x₀",
              x,
            },
            {
              label: "x₀+h",
              x: x + step,
            },
            {
              label: "x₀+2h",
              x:
                x +
                2 * step,
            },
          ];
        }
      }

      return positions
        .map(
          (point) => {
            const fx =
              evaluateFunction(
                expr,
                point.x
              );

            if (fx === null) {
              return null;
            }

            return {
              ...point,
              fx,
            };
          }
        )
        .filter(Boolean);
    }, [
      expr,
      x0,
      h,
      method,
      order,
    ]);

  const formulaKey =
    method === "progressive"
      ? "progressive" +
        order
      : method === "backward"
      ? "backward" +
        order
      : "central" +
        order;

  const formula =
    FORMULAS[formulaKey];

  return (
    <div>
      {/* ENTRADAS */}

      <div className="row g-2 mb-3 bg-white p-3 border rounded shadow-sm">
        <div className="col-12 col-md-5">
          <label className="form-label small fw-bold">
            Función f(x)
          </label>

          <input
            type="text"
            className="form-control form-control-sm font-monospace"
            value={expr}
            onChange={(e) =>
              setExpr(
                e.target.value
              )
            }
            placeholder="Ejemplo: x^2"
          />

          <div className="form-text small">
            Ejemplos: x^2, x^3,
            sin(x), cos(x),
            exp(x), sqrt(x)
          </div>
        </div>

        <div className="col-6 col-md-2">
          <label className="form-label small fw-bold">
            Punto x₀
          </label>

          <input
            type="number"
            step="any"
            className="form-control form-control-sm"
            value={x0}
            onChange={(e) =>
              setX0(
                e.target.value
              )
            }
          />
        </div>

        <div className="col-6 col-md-2">
          <label className="form-label small fw-bold">
            Paso h
          </label>

          <input
            type="number"
            step="any"
            min="0.000001"
            className="form-control form-control-sm"
            value={h}
            onChange={(e) =>
              setH(
                e.target.value
              )
            }
          />
        </div>

        <div className="col-12 col-md-3">
          <label className="form-label small fw-bold">
            Orden de aproximación
          </label>

          <select
            className="form-select form-select-sm"
            value={order}
            onChange={(e) =>
              setOrder(
                Number(
                  e.target.value
                )
              )
            }
          >
            {method ===
            "central" ? (
              <>
                <option value="2">
                  Segundo orden
                </option>

                <option value="4">
                  Cuarto orden
                </option>
              </>
            ) : (
              <>
                <option value="1">
                  Primer orden
                </option>

                <option value="2">
                  Segundo orden
                </option>
              </>
            )}
          </select>
        </div>
      </div>

      {/* ERROR */}

      {calculation.error ? (
        <div className="alert alert-danger py-2 small">
          {calculation.error}
        </div>
      ) : (
        <>
          {/* FÓRMULA */}

          <div
            className="card mb-3 shadow-sm"
            style={{
              borderColor:
                info.color,
            }}
          >
            <div
              className="card-header text-white fw-bold"
              style={{
                backgroundColor:
                  info.color,
              }}
            >
              {info.title}
            </div>

            <div className="card-body">
              <p className="small text-muted">
                {info.description}
              </p>

              <div className="bg-light border rounded p-3 text-center">
                <div className="small text-muted mb-1">
                  Fórmula utilizada
                </div>

                <div className="font-monospace fw-bold">
                  {formula}
                </div>
              </div>
            </div>
          </div>

          {/* RESULTADOS */}

          <div
            className="card mb-3 shadow-sm"
            style={{
              backgroundColor:
                info.color +
                "15",
              borderColor:
                info.color,
            }}
          >
            <div className="card-body py-3">
              <div className="row g-3 text-center">
                <div className="col-6 col-md-3">
                  <small className="text-muted d-block">
                    Derivada numérica
                  </small>

                  <strong
                    className="h5"
                    style={{
                      color:
                        info.color,
                    }}
                  >
                    {formatNumber(
                      calculation.derivative,
                      10
                    )}
                  </strong>
                </div>

                <div className="col-6 col-md-3">
                  <small className="text-muted d-block">
                    Derivada exacta
                  </small>

                  <strong>
                    {calculation.exact !==
                    null
                      ? formatNumber(
                          calculation.exact,
                          10
                        )
                      : "No disponible"}
                  </strong>
                </div>

                <div className="col-6 col-md-3">
                  <small className="text-muted d-block">
                    Error absoluto
                  </small>

                  <strong>
                    {calculation.absoluteError !==
                    null
                      ? formatNumber(
                          calculation.absoluteError,
                          10
                        )
                      : "—"}
                  </strong>
                </div>

                <div className="col-6 col-md-3">
                  <small className="text-muted d-block">
                    Error relativo
                  </small>

                  <strong>
                    {calculation.relativeError !==
                    null
                      ? formatNumber(
                          calculation.relativeError,
                          8
                        ) + " %"
                      : "—"}
                  </strong>
                </div>
              </div>
            </div>
          </div>

          {/* GRÁFICA */}

          <FunctionPlotSVG
            expr={expr}
            x0={x0}
            h={h}
            points={graphPoints}
            themeColor={
              info.color
            }
          />

          {/* TABLA */}

          <div className="text-end mb-2">
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              onClick={() =>
                setShowTable(
                  !showTable
                )
              }
            >
              {showTable
                ? "Ocultar tabla de cálculo"
                : "Mostrar tabla de cálculo"}
            </button>
          </div>

          {showTable && (
            <CalculationTable
              rows={
                calculation.rows
              }
              numerator={
                calculation.numerator
              }
              denominator={
                calculation.denominator
              }
            />
          )}

          {/* COMPARACIÓN */}

          <div className="mt-4">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div>
                <h6 className="fw-bold mb-1">
                  Análisis de la precisión
                </h6>

                <p className="text-muted small mb-0">
                  Observa cómo cambia el
                  error al reducir h.
                </p>
              </div>

              <button
                type="button"
                className="btn btn-sm btn-outline-primary"
                onClick={() =>
                  setShowComparison(
                    !showComparison
                  )
                }
              >
                {showComparison
                  ? "Ocultar comparación"
                  : "Comparar h"}
              </button>
            </div>

            {showComparison && (
              <ComparisonTable
                expr={expr}
                x0={Number(x0)}
                method={method}
                order={order}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

// ============================================================
// COMPONENTE PRINCIPAL
// ============================================================

const SimuladorTab = () => {
  const [
    activeMethod,
    setActiveMethod,
  ] = useState(null);

  const methods = [
    "progressive",
    "backward",
    "central",
  ];

  return (
    <div className="p-3 border rounded bg-light">
      {!activeMethod ? (
        <>
          <div className="text-center my-3">
            <h4 className="fw-bold text-primary mb-1">
              <span className="me-2">
                📐
              </span>
              Simulador de Derivación
              Numérica
            </h4>

            <p className="text-muted small">
              Selecciona el tipo de
              diferencia finita que
              deseas estudiar.
            </p>
          </div>

          <div className="row g-3 g-md-4 justify-content-center">
            {methods.map(
              (method) => {
                const info =
                  METHOD_INFO[
                    method
                  ];

                return (
                  <div
                    key={method}
                    className="col-12 col-md-4"
                  >
                    <div className="card h-100 border-0 shadow-sm rounded-3">
                      <div className="card-body p-4 d-flex flex-column text-center">
                        <div
                          className="d-flex justify-content-center align-items-center rounded-circle mx-auto mb-3"
                          style={{
                            width: "70px",
                            height: "70px",
                            backgroundColor:
                              info.color +
                              "15",
                            color:
                              info.color,
                            fontSize:
                              "38px",
                            fontWeight:
                              "bold",
                          }}
                        >
                          {
                            info.icon
                          }
                        </div>

                        <h5 className="card-title fw-bold text-dark">
                          {
                            info.title
                          }
                        </h5>

                        <p className="card-text text-muted small flex-grow-1">
                          {
                            info.description
                          }
                        </p>

                        <div className="small bg-light border rounded p-2 mb-3">
                          {method ===
                            "progressive" && (
                            <>
                              <div className="font-monospace">
                                Orden 1
                              </div>
                              <div className="font-monospace">
                                Orden 2
                              </div>
                            </>
                          )}

                          {method ===
                            "backward" && (
                            <>
                              <div className="font-monospace">
                                Orden 1
                              </div>
                              <div className="font-monospace">
                                Orden 2
                              </div>
                            </>
                          )}

                          {method ===
                            "central" && (
                            <>
                              <div className="font-monospace">
                                Orden 2
                              </div>
                              <div className="font-monospace">
                                Orden 4
                              </div>
                            </>
                          )}
                        </div>

                        <button
                          type="button"
                          className="btn w-100 fw-bold text-white"
                          style={{
                            backgroundColor:
                              info.color,
                          }}
                          onClick={() =>
                            setActiveMethod(
                              method
                            )
                          }
                        >
                          ▶ Iniciar{" "}
                          {
                            info.shortTitle
                          }
                        </button>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>

          <div className="alert alert-info mt-4 mb-0 small">
            <strong>
              💡 Sugerencia didáctica:
            </strong>{" "}
            utiliza diferentes valores de
            h para observar cómo cambia la
            precisión de cada fórmula.
          </div>
        </>
      ) : (
        <div>
          <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              onClick={() =>
                setActiveMethod(
                  null
                )
              }
            >
              ← Volver al menú
            </button>

            <h5 className="fw-bold text-primary mb-0">
              {
                METHOD_INFO[
                  activeMethod
                ].title
              }
            </h5>
          </div>

          <DerivativeSimulator
            method={
              activeMethod
            }
          />
        </div>
      )}
    </div>
  );
};

export default SimuladorTab;
```
