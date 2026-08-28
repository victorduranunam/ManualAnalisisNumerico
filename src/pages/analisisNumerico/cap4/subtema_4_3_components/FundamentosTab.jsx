import React, { useState } from "react";

const FundamentosTab = () => {
  const [seccionActiva, setSeccionActiva] = useState("concepto");

  return (
    <div className="p-3 border rounded bg-light">
      {/* Encabezado Institucional */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h5 className="text-primary fw-bold mb-1">
            4.3 Derivación Numérica y Extrapolación de Richardson
          </h5>
          <p className="text-muted small mb-0">
            Estimación de tasas de cambio instantáneas mediante diferencias finitas y mejora de precisión por combinaciones de Richardson.
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
          ¿Qué es la Derivación Numérica?
        </button>
        <button
          type="button"
          className={`btn ${seccionActiva === "formulas12" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setSeccionActiva("formulas12")}
        >
          1ª y 2ª Derivada (Esquemas)
        </button>
        <button
          type="button"
          className={`btn ${seccionActiva === "formulas3" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setSeccionActiva("formulas3")}
        >
          3ª Derivada y Coeficientes
        </button>
        <button
          type="button"
          className={`btn ${seccionActiva === "richardson" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setSeccionActiva("richardson")}
        >
          Extrapolación de Richardson
        </button>
      </div>

      {/* Contenedor Principal */}
      <div className="card shadow-sm border-0">
        <div className="card-body">
          {/* SECCIÓN 1: CONCEPTO DE DERIVACIÓN NUMÉRICA */}
          {seccionActiva === "concepto" && (
            <div>
              <h6 className="card-title fw-bold text-dark mb-2">
                Fundamentos de la Derivación Numérica
              </h6>
              <p className="text-secondary small mb-3">
                La derivación numérica es una técnica matemática para estimar el valor de la derivada de una función en un punto específico a partir de un conjunto de datos tabulados o cuando la función matemática es demasiado compleja para derivarse analíticamente.
              </p>

              <div className="row g-2 mb-3">
                <div className="col-md-4">
                  <div className="p-2 border rounded bg-white h-100">
                    <span className="badge bg-primary mb-1">Diferencias Progresivas</span>
                    <h6 className="fw-bold small text-dark">Hacia Adelante (Forward)</h6>
                    <p className="text-muted small mb-0">
                      Utiliza el punto de interés x₀ y puntos subsecuentes (x₀+h, x₀+2h,...). Indispensable en límites iniciales.
                    </p>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="p-2 border rounded bg-white h-100">
                    <span className="badge bg-danger mb-1">Diferencias Regresivas</span>
                    <h6 className="fw-bold small text-dark">Hacia Atrás (Backward)</h6>
                    <p className="text-muted small mb-0">
                      Utiliza el punto de interés x₀ y puntos precedentes (x₀-h, x₀-2h,...). Usada en bordes finales o datos en tiempo real[cite: 5].
                    </p>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="p-2 border rounded bg-white h-100">
                    <span className="badge bg-success mb-1">Diferencias Centrales</span>
                    <h6 className="fw-bold small text-dark">Centradas (Central)</h6>
                    <p className="text-muted small mb-0">
                      Evalúa simétricamente a ambos lados del nodo (x₀-h y x₀+h). Ofrece mayor precisión al cancelar errores de orden impar.
                    </p>
                  </div>
                </div>
              </div>

              <div className="alert alert-info py-2 small mb-0">
                <strong>Definición del Paso (h):</strong> Representa el incremento constante entre nodos adyacentes: h = x_(k+1) - x_k. Cuanto menor sea h, menor es el error de truncamiento, hasta el límite de precisión de redondeo[cite: 4, 5].
              </div>
            </div>
          )}

          {/* SECCIÓN 2: 1ª Y 2ª DERIVADA */}
          {seccionActiva === "formulas12" && (
            <div>
              <h6 className="card-title fw-bold text-dark mb-2">
                Fórmulas para 1ª y 2ª Derivada con Múltiples Puntos
              </h6>
              <p className="text-secondary small mb-3">
                Expresiones obtenidas mediante el truncamiento de las Series de Taylor:
              </p>

              <div className="table-responsive mb-3">
                <table className="table table-sm table-bordered text-center small mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Orden</th>
                      <th>Tipo de Esquema</th>
                      <th>Fórmula de Diferencias Finitas</th>
                      <th>Error Truncamiento</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td rowSpan="3" className="align-middle fw-bold">1ª Derivada f'(x)</td>
                      <td className="text-start ps-2">Progresiva</td>
                      <td className="font-monospace">[ -f(x+2h) + 4f(x+h) - 3f(x) ] / (2h)</td>
                      <td>O(h²)</td>
                    </tr>
                    <tr>
                      <td className="text-start ps-2">Regresiva</td>
                      <td className="font-monospace">[ 3f(x) - 4f(x-h) + f(x-2h) ] / (2h)</td>
                      <td>O(h²)</td>
                    </tr>
                    <tr>
                      <td className="text-start ps-2">Central</td>
                      <td className="font-monospace">[ f(x+h) - f(x-h) ] / (2h)</td>
                      <td>O(h²)</td>
                    </tr>
                    <tr>
                      <td rowSpan="3" className="align-middle fw-bold">2ª Derivada f''(x)</td>
                      <td className="text-start ps-2">Progresiva</td>
                      <td className="font-monospace">[ -f(x+3h) + 4f(x+2h) - 5f(x+h) + 2f(x) ] / h²</td>
                      <td>O(h²)</td>
                    </tr>
                    <tr>
                      <td className="text-start ps-2">Regresiva</td>
                      <td className="font-monospace">[ 2f(x) - 5f(x-h) + 4f(x-2h) - f(x-3h) ] / h²</td>
                      <td>O(h²)</td>
                    </tr>
                    <tr>
                      <td className="text-start ps-2">Central</td>
                      <td className="font-monospace">[ f(x+h) - 2f(x) + f(x-h) ] / h²</td>
                      <td>O(h²)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* SECCIÓN 3: 3ª DERIVADA */}
          {seccionActiva === "formulas3" && (
            <div>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="card-title fw-bold text-dark mb-0">
                  Fórmulas y Coeficientes para la 3ª Derivada f'''(x)
                </h6>
                <span className="badge bg-secondary">Orden Cúbico</span>
              </div>

              <p className="text-secondary small mb-2">
                Estructura de las ecuaciones para la tercera derivada divididas por h³[cite: 5]:
              </p>

              <div className="p-3 border rounded bg-white font-monospace small mb-3">
                <div className="mb-2">
                  <strong className="text-primary">• Progresiva (Forward):</strong><br />
                  f'''(x) ≈ [ -f(x+3h) + 3·f(x+2h) - 3·f(x+h) + f(x) ] / h³
                </div>
                <div className="mb-2">
                  <strong className="text-danger">• Regresiva (Backward):</strong><br />
                  f'''(x) ≈ [ f(x-3h) - 3·f(x-2h) + 3·f(x-h) - f(x) ] / h³[cite: 5]
                </div>
                <div>
                  <strong className="text-success">• Central (Centrada):</strong><br />
                  f'''(x) ≈ [ f(x+2h) - 2·f(x+h) + 2·f(x-h) - f(x-2h) ] / (2·h³)
                </div>
              </div>

              <div className="table-responsive mb-2">
                <table className="table table-sm table-bordered text-center small mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Esquema 3ª Derivada</th>
                      <th>f(x-3h)</th>
                      <th>f(x-2h)</th>
                      <th>f(x-h)</th>
                      <th>f(x)</th>
                      <th>f(x+h)</th>
                      <th>f(x+2h)</th>
                      <th>f(x+3h)</th>
                      <th>Divisor</th>
                    </tr>
                  </thead>
                  <tbody className="font-monospace">
                    <tr>
                      <td className="fw-bold text-start font-sans-serif ps-2">Regresiva</td>
                      <td>1[cite: 5]</td>
                      <td>-3[cite: 5]</td>
                      <td>3[cite: 5]</td>
                      <td>-1[cite: 5]</td>
                      <td>0</td>
                      <td>0</td>
                      <td>0</td>
                      <td>h³[cite: 5]</td>
                    </tr>
                    <tr>
                      <td className="fw-bold text-start font-sans-serif ps-2">Progresiva</td>
                      <td>0</td>
                      <td>0</td>
                      <td>0</td>
                      <td>1</td>
                      <td>-3</td>
                      <td>3</td>
                      <td>-1</td>
                      <td>h³</td>
                    </tr>
                    <tr>
                      <td className="fw-bold text-start font-sans-serif ps-2">Central</td>
                      <td>0</td>
                      <td>-1</td>
                      <td>2</td>
                      <td>0</td>
                      <td>-2</td>
                      <td>1</td>
                      <td>0</td>
                      <td>2h³</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* SECCIÓN 4: EXTRAPOLACIÓN DE RICHARDSON */}
          {seccionActiva === "richardson" && (
            <div>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="card-title fw-bold text-dark mb-0">
                  Extrapolación de Richardson de Orden Superior
                </h6>
                <span className="badge bg-dark">Aceleración de Precisión</span>
              </div>

              <p className="text-secondary small mb-3">
                La técnica de Richardson combina dos aproximaciones numéricas D(h) y D(h/2) eliminando analíticamente los términos de error dominantes de la Serie de Taylor sin necesidad de calcular derivadas adicionales[cite: 5].
              </p>

              {/* Fórmula estándar */}
              <div className="p-3 border rounded bg-white mb-3">
                <span className="d-block fw-bold small text-dark mb-1">
                  1. Fórmula General de Mejora de Segundo a Cuarto Orden [O(h²) → O(h⁴)]:
                </span>
                <div className="bg-dark text-light p-2 rounded text-center font-monospace small my-2">
                  D_mejorada = D(h/2) + ( [ D(h/2) - D(h) ] / (2² - 1) ) = (4/3)·D(h/2) - (1/3)·D(h)[cite: 5]
                </div>
                <p className="text-muted small mb-0">
                  Aplica para esquemas con orden de error $O(h^2)$, cancelando completamente la componente de error cuadrática[cite: 5].
                </p>
              </div>

              {/* Fórmula general multinivel */}
              <div className="p-3 border rounded bg-white mb-3">
                <span className="d-block fw-bold small text-dark mb-1">
                  2. Fórmula General de Richardson para Orden p con Factor de Reducción r = h₁ / h₂:
                </span>
                <div className="bg-dark text-light p-2 rounded text-center font-monospace small my-2">
                  D_extrapolada = D(h₂) + [ D(h₂) - D(h₁) ] / ( (h₁ / h₂)^p - 1 )
                </div>
                <p className="text-muted small mb-0">
                  Para refinamientos sucesivos de orden superior (pasando de $O(h^4)$ a $O(h^6)$ con $h/2$ y $h/4$):
                </p>
                <div className="bg-light p-2 rounded text-center font-monospace small border mt-2">
                  D_final = (16/15)·D_nivel2(h/4) - (1/15)·D_nivel1(h/2)
                </div>
              </div>

              <div className="alert alert-success py-2 small mb-0">
                <strong>Resultado Numérico:</strong> Al evaluar la 3ª derivada de f(x) = 5xe^(-2x) en x=1 con h₀=0.01 y h₀/2=0.005[cite: 5]:
                <ul className="mb-0 font-monospace">
                  <li>• D(0.01) = 2.8732 (Error = 0.16649)[cite: 5]</li>
                  <li>• D(0.005) = 2.7889 (Error = 0.08219)[cite: 5]</li>
                  <li>• <strong>Richardson: (4/3)(2.7889) - (1/3)(2.8732) = 2.7608</strong> (Error reducido a 0.05409 frente al valor real 2.70671)[cite: 5]</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FundamentosTab;