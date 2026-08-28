import React, { useState } from "react";

const FundamentosTab = () => {
  const [seccionActiva, setSeccionActiva] = useState("tipos");

  return (
    <div className="p-3 border rounded bg-light">
      {/* Encabezado Institucional */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h5 className="text-primary fw-bold mb-1">
            4.2 Tablas de Diferencias Finitas para Polinomios Interpolantes
          </h5>
          <p className="text-muted small mb-0">
            Análisis y construcción de esquemas de diferencias progresivas, regresivas y centrales con separación constante.
          </p>
        </div>
        <span className="badge bg-primary">Capítulo IV</span>
      </div>

      {/* Selector de Pestañas */}
      <div className="btn-group btn-group-sm mb-3 w-100" role="group">
        <button
          type="button"
          className={`btn ${seccionActiva === "tipos" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setSeccionActiva("tipos")}
        >
          Tipos de Diferencias
        </button>
        <button
          type="button"
          className={`btn ${seccionActiva === "formulas" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setSeccionActiva("formulas")}
        >
          Formulación Matemática
        </button>
        <button
          type="button"
          className={`btn ${seccionActiva === "tablas" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setSeccionActiva("tablas")}
        >
          Ejemplo Numérico y Tablas
        </button>
        <button
          type="button"
          className={`btn ${seccionActiva === "codigo" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setSeccionActiva("codigo")}
        >
          Implementación en Python
        </button>
      </div>

      {/* Contenedor Principal */}
      <div className="card shadow-sm border-0">
        <div className="card-body">
          {/* SECCIÓN 1: TIPOS DE DIFERENCIAS */}
          {seccionActiva === "tipos" && (
            <div>
              <h6 className="card-title fw-bold text-dark mb-2">
                Clasificación de las Diferencias Finitas
              </h6>
              <p className="text-secondary small mb-3">
                La diferencia entre dos puntos se define como la resta de las ordenadas (Y₁ - Y₀) asociadas a sus respectivas abscisas (X₁ y X₀)[cite: 4]. Según la distribución de los puntos en el eje X, se clasifican en cuatro variantes fundamentales[cite: 4]:
              </p>

              <div className="row g-2 mb-3">
                <div className="col-md-6">
                  <div className="p-3 border rounded bg-white h-100">
                    <span className="badge bg-success mb-2">Puntos Equidistantes (Separación h constante)</span>
                    <ul className="list-unstyled small text-muted mb-0">
                      <li className="mb-1">• <strong>Progresivas (Δ):</strong> Avanzan de un punto base hacia adelante[cite: 4].</li>
                      <li className="mb-1">• <strong>Regresivas (∇):</strong> Inician en el último dato y retroceden[cite: 4].</li>
                      <li>• <strong>Centrales (δ):</strong> Toman como referencia el punto medio y el intervalo 2h[cite: 4].</li>
                    </ul>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="p-3 border rounded bg-white h-100">
                    <span className="badge bg-warning text-dark mb-2">Puntos No Equidistantes (Separación variable)</span>
                    <p className="text-muted small mb-0">
                      • <strong>Diferencias Divididas:</strong> Empleadas cuando la separación entre las abscisas no es constante (método de Newton para incrementos variables)[cite: 4].
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECCIÓN 2: FORMULACIÓN MATEMÁTICA */}
          {seccionActiva === "formulas" && (
            <div>
              <h6 className="card-title fw-bold text-dark mb-2">
                Definición y Operadores de Diferencias Finitas
              </h6>
              <p className="text-secondary small mb-3">
                Considerando una separación constante h = x_(k+1) - x_k entre nodos consecutivos[cite: 4]:
              </p>

              <div className="table-responsive mb-3">
                <table className="table table-sm table-bordered text-center small mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Tipo de Diferencia</th>
                      <th>Símbolo</th>
                      <th>Primera Diferencia (Orden 1)</th>
                      <th>Diferencia Enésima (Orden N)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="fw-bold text-start ps-3">Progresiva</td>
                      <td>Δ</td>
                      <td className="font-monospace">Δ¹ f_k = f_(k+1) - f_k</td>
                      <td className="font-monospace">Δⁿ f_k = Δⁿ⁻¹ f_(k+1) - Δⁿ⁻¹ f_k</td>
                    </tr>
                    <tr>
                      <td className="fw-bold text-start ps-3">Regresiva</td>
                      <td>∇</td>
                      <td className="font-monospace">∇¹ f_k = f_k - f_(k+1)</td>
                      <td className="font-monospace">∇ⁿ f_k = ∇ⁿ⁻¹ f_k - ∇ⁿ⁻¹ f_(k+1)</td>
                    </tr>
                    <tr>
                      <td className="fw-bold text-start ps-3">Central</td>
                      <td>δ</td>
                      <td className="font-monospace">δ¹ f_k = (f_(k+1) - f_(k-1)) / (2h)</td>
                      <td className="font-monospace">δⁿ f_k = (δⁿ⁻¹ f_(k+1) - δⁿ⁻¹ f_(k-1)) / (2h)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="alert alert-info py-2 small mb-0">
                <strong>Propiedad Clave:</strong> Para un conjunto de datos generado por un polinomio de grado <em>p</em>, la diferencia de orden <em>p</em> resultará en un valor constante y todas las diferencias de orden superior (<em>p+1, p+2, ...</em>) serán iguales a cero[cite: 4].
              </div>
            </div>
          )}

          {/* SECCIÓN 3: TABLAS Y EJEMPLO */}
          {seccionActiva === "tablas" && (
            <div>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="card-title fw-bold text-dark mb-0">
                  Tabla de Diferencias Progresivas para f(x) = x³ (h = 1)
                </h6>
                <span className="badge bg-secondary">Polinomio Cúbico</span>
              </div>

              <div className="table-responsive mb-3">
                <table className="table table-sm table-bordered text-center font-monospace small mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>x_k</th>
                      <th>y_k = f_k</th>
                      <th>Δ¹ f_k</th>
                      <th>Δ² f_k</th>
                      <th>Δ³ f_k</th>
                      <th>Δ⁴ f_k</th>
                      <th>Δ⁵ f_k</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>0</td>
                      <td>0</td>
                      <td className="text-primary fw-bold">1</td>
                      <td className="text-primary fw-bold">6</td>
                      <td className="text-primary fw-bold">6</td>
                      <td className="text-primary fw-bold">0</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>1</td>
                      <td>7</td>
                      <td>12</td>
                      <td>6</td>
                      <td>0</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>8</td>
                      <td>19</td>
                      <td>18</td>
                      <td>6</td>
                      <td>0</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>27</td>
                      <td>37</td>
                      <td>24</td>
                      <td>6</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>64</td>
                      <td>61</td>
                      <td>30</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>125</td>
                      <td>91</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td>216</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-2 border rounded bg-white">
                <span className="d-block fw-bold small text-dark mb-1">Cálculo de la diagonal principal desde f₀:</span>
                <ul className="list-unstyled small font-monospace text-secondary mb-0">
                  <li>• Δ¹ f₀ = f₁ - f₀ = 1 - 0 = 1[cite: 4]</li>
                  <li>• Δ² f₀ = Δ¹ f₁ - Δ¹ f₀ = 7 - 1 = 6[cite: 4]</li>
                  <li>• Δ³ f₀ = Δ² f₁ - Δ² f₀ = 12 - 6 = 6 (Constante: Grado 3)[cite: 4]</li>
                  <li>• Δ⁴ f₀ = Δ³ f₁ - Δ³ f₀ = 6 - 6 = 0 (Orden superior nulo)[cite: 4]</li>
                </ul>
              </div>
            </div>
          )}

          {/* SECCIÓN 4: IMPLEMENTACIÓN EN PYTHON */}
          {seccionActiva === "codigo" && (
            <div>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="card-title fw-bold text-dark mb-0">
                  Implementación Computacional: TABLA_DIFERENCIAS.py
                </h6>
                <span className="badge bg-dark">Python / NumPy</span>
              </div>

              <p className="text-secondary small mb-2">
                Funciones para generar los vectores de diferencias progresivas, regresivas y centrales a partir de un vector de ordenadas `y` y un número `m` de órdenes deseados[cite: 4]:
              </p>

              <pre className="bg-dark text-light p-3 rounded small font-monospace mb-3" style={{ maxHeight: "250px", overflowY: "auto" }}>
{`import numpy as np

def DifProgTabla(y, m):
    """Calcula m vectores de diferencias progresivas"""
    for i in range(m):
        Dy = np.zeros(len(y) - 1)
        for j in range(len(y) - 1):
            Dy[j] = y[j + 1] - y[j]
        print(f"Δ^{i+1} f_k:", Dy)
        y = Dy

def DifRegTabla(y, m):
    """Calcula m vectores de diferencias regresivas"""
    for i in range(m):
        Dy = np.zeros(len(y) - 1)
        for j in range(len(y) - 1):
            Dy[j] = y[j] - y[j + 1]
        print(f"∇^{i+1} f_k:", Dy)
        y = Dy

def DifCenTabla(y, m, h=1):
    """Calcula m vectores de diferencias centrales"""
    for i in range(m):
        Dy = np.zeros(len(y) - 2)
        for j in range(len(y) - 2):
            Dy[j] = (y[j + 2] - y[j]) / (2 * h)
        print(f"δ^{i+1} f_k:", Dy)
        y = Dy

# Bloque de ejecución con datos de f(x) = x^3:
y_datos = np.array([0, 1, 8, 27, 64, 125, 216])
print("--- DIFERENCIAS PROGRESIVAS ---")
DifProgTabla(y_datos, 6)`}
              </pre>

              <div className="p-2 border rounded bg-white">
                <span className="d-block fw-bold text-dark small mb-1">Salida de Consola (Diferencias Progresivas):</span>
                <p className="text-muted small font-monospace mb-0">
                  Δ¹: [ 1.  7. 19. 37. 61. 91.] <br />
                  Δ²: [ 6. 12. 18. 24. 30.] <br />
                  Δ³: [ 6.  6.  6.  6.] &nbsp;&nbsp;&nbsp;// Orden cúbico constante <br />
                  Δ⁴: [ 0.  0.  0.] <br />
                  Δ⁵: [ 0.  0.] <br />
                  Δ⁶: [ 0.]
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