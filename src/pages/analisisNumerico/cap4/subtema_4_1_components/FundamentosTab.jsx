import React, { useState } from "react";

const FundamentosTab = () => {
  const [seccionActiva, setSeccionActiva] = useState("concepto");

  return (
    <div className="p-3 border rounded bg-light">
      {/* Encabezado Institucional */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h5 className="text-primary fw-bold mb-1">
            4.1 Interpolación con Incrementos Variables por Polinomio de Lagrange
          </h5>
          <p className="text-muted small mb-0">
            Ajuste directo de polinomios de grado n - 1 a partir de conjuntos de puntos con separación constante o variable.
          </p>
        </div>
        <span className="badge bg-primary">Capítulo IV</span>
      </div>

      {/* Selector de Pestañas */}
      <div className="btn-group btn-group-sm mb-3 w-100" role="group">
        <button
          type="button"
          className={`btn ${seccionActiva === "concepto" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setSeccionActiva("concepto")}
        >
          Fundamento Matemático
        </button>
        <button
          type="button"
          className={`btn ${seccionActiva === "desarrollo" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setSeccionActiva("desarrollo")}
        >
          Cálculo de los Coeficientes Lᵢ(x)
        </button>
        <button
          type="button"
          className={`btn ${seccionActiva === "ejemplo" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setSeccionActiva("ejemplo")}
        >
          Ejemplo Paso a Paso (3 Puntos)
        </button>
        <button
          type="button"
          className={`btn ${seccionActiva === "algoritmo" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setSeccionActiva("algoritmo")}
        >
          Código en Python (polyLagrange)
        </button>
      </div>

      {/* Contenedor Principal */}
      <div className="card shadow-sm border-0">
        <div className="card-body">
          {/* SECCIÓN 1: FUNDAMENTO MATEMÁTICO */}
          {seccionActiva === "concepto" && (
            <div>
              <h6 className="card-title fw-bold text-dark mb-2">
                Definición del Polinomio de Lagrange
              </h6>
              <p className="text-secondary small mb-3">
                El método de Lagrange permite obtener un polinomio interpolador único de grado <strong>n - 1</strong> a partir de un conjunto de <strong>n</strong> puntos, sin importar si la separación entre las abscisas (xᵢ) es constante (equidistante) o variable (no equidistante)[cite: 3].
              </p>

              <div className="bg-dark text-light p-3 rounded text-center font-monospace small mb-3">
                <div className="text-warning mb-1">// Fórmula General del Polinomio de Lagrange</div>
                p(x) = y₀·l₀(x) + y₁·l₁(x) + ... + yₙ·lₙ(x) = ∑ [k=0 hasta n] yₖ · lₖ(x)
              </div>

              <div className="row g-2 mb-2">
                <div className="col-md-6">
                  <div className="p-2 border rounded bg-white h-100">
                    <span className="badge bg-secondary mb-1">Puntos Equidistantes</span>
                    <p className="text-muted small mb-0">
                      Conjunto con incremento constante (Δx = cte)[cite: 3]. Ej: (0,0), (1,1), (2,4), (3,9) con Δx = 1[cite: 3].
                    </p>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="p-2 border rounded bg-white h-100">
                    <span className="badge bg-secondary mb-1">Puntos No Equidistantes</span>
                    <p className="text-muted small mb-0">
                      Conjunto con incremento variable entre valores de x[cite: 3]. Ej: (0,0), (1,1), (3,9), (5,25) con Δx₁ = 1, Δx₂ = 2[cite: 3].
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECCIÓN 2: COEFICIENTES L_i(x) */}
          {seccionActiva === "desarrollo" && (
            <div>
              <h6 className="card-title fw-bold text-dark mb-2">
                Construcción de los Polinomios Base de Lagrange lᵢ(x)
              </h6>
              <p className="text-secondary small mb-3">
                Cada término base lᵢ(x) se define mediante una productoria de razones lineales, omitiendo el factor donde el índice coincide (i = j) para evitar divisiones entre cero[cite: 3]:
              </p>

              <div className="bg-dark text-light p-2 rounded text-center font-monospace small mb-3">
                lᵢ(x) = ∏ [j=0, j ≠ i hasta n] ( (x - xⱼ) / (xᵢ - xⱼ) )
              </div>

              <div className="p-3 border rounded bg-white">
                <span className="d-block fw-bold text-dark small mb-2">Estructura expandida para 3 puntos conocidos (x₀, x₁, x₂)[cite: 3]:</span>
                <ul className="list-unstyled small font-monospace text-secondary mb-0">
                  <li className="mb-2">
                    <strong>l₀(x)</strong> = [ (x - x₁) / (x₀ - x₁) ] · [ (x - x₂) / (x₀ - x₂) ]
                  </li>
                  <li className="mb-2">
                    <strong>l₁(x)</strong> = [ (x - x₀) / (x₁ - x₀) ] · [ (x - x₂) / (x₁ - x₂) ]
                  </li>
                  <li>
                    <strong>l₂(x)</strong> = [ (x - x₀) / (x₂ - x₀) ] · [ (x - x₁) / (x₂ - x₁) ]
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* SECCIÓN 3: EJEMPLO PASO A PASO */}
          {seccionActiva === "ejemplo" && (
            <div>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="card-title fw-bold text-dark mb-0">
                  Ejemplo Numérico: Puntos (0, 7.5), (3, 7.0), (9, 4.5)
                </h6>
                <span className="badge bg-secondary">Grado 2 (n = 3)</span>
              </div>

              <div className="table-responsive mb-3">
                <table className="table table-sm table-bordered text-center small mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Base lᵢ(x)</th>
                      <th>Sustitución Numérica</th>
                      <th>Forma Simplificada</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>l₀(x)</strong></td>
                      <td>((x - 3) / (0 - 3)) · ((x - 9) / (0 - 9))</td>
                      <td className="font-monospace">((x - 3)(x - 9)) / 27</td>
                    </tr>
                    <tr>
                      <td><strong>l₁(x)</strong></td>
                      <td>((x - 0) / (3 - 0)) · ((x - 9) / (3 - 9))</td>
                      <td className="font-monospace">(x(x - 9)) / -18</td>
                    </tr>
                    <tr>
                      <td><strong>l₂(x)</strong></td>
                      <td>((x - 0) / (9 - 0)) · ((x - 3) / (9 - 3))</td>
                      <td className="font-monospace">(x(x - 3)) / 54</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-2 border rounded bg-white mb-2">
                <span className="d-block fw-bold small text-dark mb-1">Polinomio Simplificado Final:</span>
                <div className="font-monospace small text-primary fw-bold">
                  p(x) = (1 / 108) · (-3x² - 9x + 810)
                </div>
              </div>

              <div className="p-2 border rounded bg-light border-primary-subtle">
                <span className="d-block fw-bold small text-dark">Evaluación para conocer el punto interno x = 6[cite: 3]:</span>
                <span className="small text-muted font-monospace">
                  p(6) = (1 / 108) · [ -3(6)² - 9(6) + 810 ] = (1 / 108) · [ -108 - 54 + 810 ] = 648 / 108 = <strong>6.0</strong>[cite: 3]
                </span>
              </div>
            </div>
          )}

          {/* SECCIÓN 4: CÓDIGO EN PYTHON */}
          {seccionActiva === "algoritmo" && (
            <div>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="card-title fw-bold text-dark mb-0">
                  Implementación Computacional: polyLagrange.py
                </h6>
                <span className="badge bg-dark">Python / NumPy</span>
              </div>

              <p className="text-secondary small mb-2">
                Algoritmo generalizado con dos ciclos anidados para calcular directamente la ordenada interpolada Y₀ evaluada en un valor objetivo X₀[cite: 3]:
              </p>

              <pre className="bg-dark text-light p-3 rounded small font-monospace mb-3" style={{ maxHeight: "250px", overflowY: "auto" }}>
{`from numpy import array

def polyLagrange(x, y, X0):
    n = len(x)
    Y0 = 0
    # Recorrido de la sumatoria principal
    for i in range(n):
        L = 1
        # Recorrido de la productoria li(x)
        for j in range(n):
            if i != j:
                L = L * (X0 - x[j]) / (x[i] - x[j])
        Y0 = Y0 + y[i] * L
    return Y0

# Bloque de prueba de la función:
X = array([0, 3, 9])
Y = array([7.5, 7.0, 4.5])
X0 = 6

Y0 = polyLagrange(X, Y, X0)
print("Para X0 =", X0, "-> Y0 =", Y0)
# Salida en consola: Para X0 = 6 -> Y0 = 6.0`}
              </pre>

              <div className="p-2 border rounded bg-white">
                <span className="d-block fw-bold text-dark small mb-1">Ventaja Computacional de Lagrange:</span>
                <p className="text-muted small mb-0">
                  Permite evaluar cualquier punto intermedio X₀ en tiempo cuadrático directo mediante la productoria, sin necesidad de calcular matrices inversas.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FundamentosTab;