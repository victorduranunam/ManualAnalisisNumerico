import React from "react";

const FundamentosTab = () => {
  return (
    <div className="p-3 border rounded bg-light">
      {/* ENCABEZADO */}
      <div className="mb-4 border-bottom pb-2">
        <h4 className="text-primary fw-bold mb-1">
          <i className="bi bi-book-half me-2"></i>
          Subtema 2.2: Métodos Abiertos para la Obtención de Raíces
        </h4>
        <p className="text-muted mb-0">
          Algoritmos iterativos de alta velocidad: <strong>Método de Newton-Raphson (Recta Tangente)</strong> y <strong>Método de la Secante (Aproximación por Diferencias Finitas)</strong>.
        </p>
      </div>

      {/* INTRODUCCIÓN: MÉTODOS CERRADOS VS. ABIERTOS */}
      <div className="row g-3 mb-4">
        <div className="col-md-6 col-12">
          <div className="card h-100 shadow-sm border-0 border-top border-4 border-primary">
            <div className="card-body">
              <h5 className="fw-bold text-primary mb-2">
                <i className="bi bi-lightning-charge me-2"></i>¿Qué es un Método Abierto?
              </h5>
              <p className="text-secondary small mb-2">
                A diferencia de los métodos cerrados (Bisección y Regla Falsa), los métodos abiertos <strong>no requieren un intervalo que encierre a la raíz</strong> ni verificar el cambio de signo de Bolzano.
              </p>
              <ul className="small text-secondary ps-3 mb-0">
                <li>Parten de <strong>uno o dos puntos iniciales</strong> cercanos a la solución buscada.</li>
                <li><strong>Ventaja:</strong> Convergencia notablemente más rápida (orden cuadrático o superlineal).</li>
                <li><strong>Riesgo:</strong> Pueden divergir si el punto inicial está alejado o si la derivada se anula.</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-12">
          <div className="card h-100 shadow-sm border-0 border-top border-4 border-info">
            <div className="card-body">
              <h5 className="fw-bold text-info mb-2">
                <i className="bi bi-arrow-repeat me-2"></i>Criterio de Parada Computacional
              </h5>
              <p className="text-secondary small mb-2">
                El proceso iterativo se detiene cuando la variación entre dos aproximaciones sucesivas o el residuo de la función es menor que la tolerancia predefinida:
              </p>
              <div className="p-2 rounded bg-light border font-monospace text-center small mb-2 text-dark fw-bold">
                |X<sub>n+1</sub> &minus; X<sub>n</sub>| &le; Tol &emsp;o&emsp; |f(X<sub>n+1</sub>)| &le; Tol
              </div>
              <p className="small text-muted mb-0">
                En términos relativos porcentuales: <code>ERP = |(X<sub>n+1</sub> &minus; X<sub>n</sub>) / X<sub>n+1</sub>| &times; 100% &le; Tol</code>.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* LOS DOS MÉTODOS ABIERTOS: NEWTON-RAPHSON Y SECANTE */}
      <div className="row g-3 mb-4">
        {/* MÉTODO DE NEWTON-RAPHSON */}
        <div className="col-lg-6 col-12">
          <div className="card h-100 shadow-sm border-primary">
            <div className="card-header bg-primary text-white fw-bold d-flex justify-content-between align-items-center">
              <span>1. Método de Newton-Raphson</span>
              <span className="badge bg-white text-primary">Recta Tangente</span>
            </div>
            <div className="card-body bg-white">
              <p className="text-muted small mb-2">
                Utiliza la función original <code>f(x)</code> y su primera derivada <code>f&apos;(x)</code> para trazar la recta tangente en el punto actual y proyectar el siguiente valor sobre el eje X.
              </p>

              <div className="p-2 rounded bg-light border font-monospace small text-primary fw-bold text-center mb-3">
                X<sub>n+1</sub> = X<sub>n</sub> &minus; [ f(X<sub>n</sub>) / f&apos;(X<sub>n</sub>) ]
              </div>

              {/* Diagrama SVG Newton-Raphson */}
              <div className="text-center p-2 border rounded bg-light mb-3">
                <svg width="100%" height="130" viewBox="0 0 280 110">
                  <line x1="20" y1="90" x2="260" y2="90" stroke="#6c757d" strokeWidth="1.5" />
                  {/* Curva f(x) */}
                  <path d="M 30 90 Q 140 85, 240 15" fill="none" stroke="#0d6efd" strokeWidth="2.5" />
                  {/* Punto (x0, f(x0)) */}
                  <circle cx="220" cy="25" r="4.5" fill="#0d6efd" />
                  <line x1="220" y1="90" x2="220" y2="25" stroke="#6c757d" strokeDasharray="2 2" />
                  {/* Recta Tangente */}
                  <line x1="240" y1="5" x2="130" y2="90" stroke="#dc3545" strokeWidth="2" />
                  {/* Intersección x1 */}
                  <circle cx="130" cy="90" r="4.5" fill="#dc3545" />
                  {/* Raíz real */}
                  <rect x="26" y="86" width="8" height="8" fill="#198754" />
                  {/* Etiquetas */}
                  <text x="220" y="102" fill="#6c757d" fontSize="9" textAnchor="middle" fontWeight="bold">X0</text>
                  <text x="130" y="102" fill="#dc3545" fontSize="9" textAnchor="middle" fontWeight="bold">X1</text>
                  <text x="225" y="22" fill="#0d6efd" fontSize="9" fontWeight="bold">P0(X0, f(X0))</text>
                </svg>
                <div className="text-muted" style={{ fontSize: "0.75rem" }}>
                  Deducción: <code>f&apos;(X<sub>0</sub>) = [f(X<sub>0</sub>) &minus; 0] / (X<sub>0</sub> &minus; X<sub>1</sub>)</code> &rarr; despejando <code>X<sub>1</sub></code>.
                </div>
              </div>

              <h6 className="fw-bold small text-dark mb-1">Características Principales:</h6>
              <ul className="small text-secondary ps-3 mb-0">
                <li><strong>Convergencia Cuadrática:</strong> El número de cifras significativas casi se duplica en cada iteración cerca de la raíz.</li>
                <li><strong>Aplicación adicional:</strong> Si se evalúa <code>f&apos;(x) = 0</code>, permite encontrar máximos y mínimos analíticos.</li>
                <li><strong>Peligro:</strong> Si <code>f&apos;(X<sub>n</sub>) &asymp; 0</code>, ocurre división entre cero y la tangente sale disparada al infinito.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* MÉTODO DE LA SECANTE (ABIERTO) */}
        <div className="col-lg-6 col-12">
          <div className="card h-100 shadow-sm border-success">
            <div className="card-header bg-success text-white fw-bold d-flex justify-content-between align-items-center">
              <span>2. Método de la Secante (Abierto)</span>
              <span className="badge bg-white text-success">Diferencias Finitas</span>
            </div>
            <div className="card-body bg-white">
              <p className="text-muted small mb-2">
                Aproxima la derivada numérica mediante una cuerda secante que une dos aproximaciones consecutivas, evitando el cálculo analítico de <code>f&apos;(x)</code>.
              </p>

              <div className="p-2 rounded bg-light border font-monospace small text-success fw-bold text-center mb-3">
                X<sub>n+1</sub> = X<sub>n</sub> &minus; [ f(X<sub>n</sub>)(X<sub>n</sub> &minus; X<sub>n-1</sub>) / (f(X<sub>n</sub>) &minus; f(X<sub>n-1</sub>)) ]
              </div>

              {/* Diagrama SVG Secante */}
              <div className="text-center p-2 border rounded bg-light mb-3">
                <svg width="100%" height="130" viewBox="0 0 280 110">
                  <line x1="20" y1="90" x2="260" y2="90" stroke="#6c757d" strokeWidth="1.5" />
                  {/* Curva f(x) */}
                  <path d="M 30 90 Q 140 85, 240 15" fill="none" stroke="#198754" strokeWidth="2.5" />
                  {/* Puntos (x0, f(x0)) y (x1, f(x1)) */}
                  <circle cx="230" cy="20" r="4" fill="#0d6efd" />
                  <circle cx="160" cy="65" r="4" fill="#0d6efd" />
                  {/* Recta Secante */}
                  <line x1="245" y1="10" x2="75" y2="105" stroke="#fd7e14" strokeWidth="2" strokeDasharray="4 2" />
                  {/* Intersección x2 */}
                  <circle cx="102" cy="90" r="4.5" fill="#fd7e14" />
                  {/* Etiquetas */}
                  <text x="230" y="102" fill="#6c757d" fontSize="9" textAnchor="middle">X0</text>
                  <text x="160" y="102" fill="#6c757d" fontSize="9" textAnchor="middle">X1</text>
                  <text x="102" y="102" fill="#fd7e14" fontSize="9" textAnchor="middle" fontWeight="bold">X2</text>
                </svg>
                <div className="text-muted" style={{ fontSize: "0.75rem" }}>
                  Avanza descartando <code>X<sub>n-1</sub></code> y adoptando <code>X<sub>n</sub></code> y <code>X<sub>n+1</sub></code> sin verificar cambio de signo.
                </div>
              </div>

              <h6 className="fw-bold small text-dark mb-1">Diferencia con la Regla Falsa:</h6>
              <ul className="small text-secondary ps-3 mb-0">
                <li><strong>Regla Falsa (Cerrado):</strong> Obliga a que <code>f(X<sub>a</sub>) &times; f(X<sub>b</sub>) &lt; 0</code> en todo momento.</li>
                <li><strong>Secante Abierto:</strong> Utiliza siempre los dos últimos puntos calculados, permitiendo mayor rapidez pero perdiendo la garantía de encierro.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CASO PRÁCTICO DEL APUNTE: NEWTON-RAPHSON EN f(x) = x^2 - 2 */}
      <div className="card mb-4 shadow-sm border-primary">
        <div className="card-header bg-primary text-white fw-bold d-flex justify-content-between align-items-center">
          <span>
            <i className="bi bi-pencil-square me-2"></i>
            Caso Desarrollado del Apunte: f(x) = x<sup>2</sup> &minus; 2 partiendo de X<sub>0</sub> = 2 (Tol = 0.01)
          </span>
          <span className="badge bg-white text-primary">Raíz exacta: &radic;2 &asymp; 1.4142136</span>
        </div>
        <div className="card-body bg-white">
          <p className="text-muted small mb-3">
            Función: <code>f(x) = x<sup>2</sup> &minus; 2</code> &emsp;|&emsp; Derivada: <code>f&apos;(x) = 2x</code> &emsp;|&emsp; Tolerancia: <code>|X<sub>n+1</sub> &minus; X<sub>n</sub>| &le; 0.01</code>
          </p>

          <div className="row g-3">
            {/* Iteración 1 */}
            <div className="col-lg-4 col-12">
              <div className="p-3 border rounded bg-light h-100">
                <h6 className="fw-bold text-primary mb-2">Iteración 1 (X<sub>0</sub> = 2)</h6>
                <div className="font-monospace small text-secondary">
                  <div>f(2) = 2<sup>2</sup> &minus; 2 = <strong>2</strong></div>
                  <div>f&apos;(2) = 2(2) = <strong>4</strong></div>
                  <div className="mt-1">X<sub>1</sub> = 2 &minus; (2 / 4) = <strong>1.5</strong></div>
                  <div className="text-danger mt-1">
                    |X<sub>1</sub> &minus; X<sub>0</sub>| = |1.5 &minus; 2| = <strong>0.5 &gt; 0.01</strong>
                  </div>
                  <small className="text-muted">Requiere iterar nuevamente.</small>
                </div>
              </div>
            </div>

            {/* Iteración 2 */}
            <div className="col-lg-4 col-12">
              <div className="p-3 border rounded bg-light h-100">
                <h6 className="fw-bold text-primary mb-2">Iteración 2 (X<sub>1</sub> = 1.5)</h6>
                <div className="font-monospace small text-secondary">
                  <div>f(1.5) = (1.5)<sup>2</sup> &minus; 2 = <strong>0.25</strong></div>
                  <div>f&apos;(1.5) = 2(1.5) = <strong>3</strong></div>
                  <div className="mt-1">X<sub>2</sub> = 1.5 &minus; (0.25 / 3) = <strong>17/12 &asymp; 1.416667</strong></div>
                  <div className="text-danger mt-1">
                    |X<sub>2</sub> &minus; X<sub>1</sub>| = |1.416667 &minus; 1.5| = <strong>0.08333 &gt; 0.01</strong>
                  </div>
                  <small className="text-muted">Requiere iterar nuevamente.</small>
                </div>
              </div>
            </div>

            {/* Iteración 3 */}
            <div className="col-lg-4 col-12">
              <div className="p-3 border rounded bg-light h-100 border-success">
                <h6 className="fw-bold text-success mb-2">Iteración 3 (X<sub>2</sub> = 1.416667)</h6>
                <div className="font-monospace small text-secondary">
                  <div>f(1.416667) = <strong>0.006944</strong></div>
                  <div>f&apos;(1.416667) = <strong>2.833333</strong></div>
                  <div className="mt-1">X<sub>3</sub> = 1.416667 &minus; (0.006944 / 2.833333) = <strong>1.414216</strong></div>
                  <div className="text-success fw-bold mt-1">
                    |X<sub>3</sub> &minus; X<sub>2</sub>| = |1.414216 &minus; 1.416667| = <strong>0.002451 &le; 0.01</strong>
                  </div>
                  <div className="badge bg-success mt-1">&check; Convergencia alcanzada</div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabla de Excel del Apunte */}
          <div className="table-responsive mt-3 small">
            <table className="table table-bordered table-hover text-center align-middle mb-0 font-monospace">
              <thead className="table-light">
                <tr>
                  <th>Iteración (i)</th>
                  <th>X<sub>0</sub> (Anterior)</th>
                  <th>X<sub>1</sub> (Calculado)</th>
                  <th>|X<sub>1</sub> &minus; X<sub>0</sub>| (Error)</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>2.000000</td>
                  <td>1.500000</td>
                  <td>0.500000</td>
                  <td><span className="badge bg-warning text-dark">Iterando</span></td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>1.500000</td>
                  <td>1.416667</td>
                  <td>0.083333</td>
                  <td><span className="badge bg-warning text-dark">Iterando</span></td>
                </tr>
                <tr className="table-success fw-bold">
                  <td>3</td>
                  <td>1.416667</td>
                  <td>1.414216</td>
                  <td>0.002451</td>
                  <td><span className="badge bg-success">&check; Solución Aceptada</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* COMPARATIVA DE RENDIMIENTO: PUNTO FIJO VS. NEWTON-RAPHSON */}
      <div className="card mb-4 shadow-sm border-dark">
        <div className="card-header bg-dark text-white fw-bold">
          <i className="bi bi-speedometer2 me-2 text-warning"></i>
          Comparativa de Rapidez del Apunte: f(x) = x<sup>2</sup> &minus; 2x &minus; 4 = 0 con X<sub>0</sub> = 3
        </div>
        <div className="card-body bg-white">
          <div className="row g-3 text-center">
            <div className="col-md-6 col-12">
              <div className="p-3 border rounded bg-light">
                <h6 className="fw-bold text-secondary mb-1">Método de Punto Fijo</h6>
                <div className="display-6 fw-bold text-primary my-1">4 Iteraciones</div>
                <div className="small font-monospace text-muted">
                  Solución: X = 3.23387968 | g(x) = &radic;(2x + 4)
                </div>
              </div>
            </div>

            <div className="col-md-6 col-12">
              <div className="p-3 border rounded bg-light border-success-subtle">
                <h6 className="fw-bold text-success mb-1">Método de Newton-Raphson</h6>
                <div className="display-6 fw-bold text-success my-1">3 Iteraciones</div>
                <div className="small font-monospace text-muted">
                  Solución: X = 3.23606798 | Mayor precisión cuadrática
                </div>
              </div>
            </div>
          </div>
          <div className="small text-muted mt-2 text-center">
            <strong>Nota de seguridad numérica:</strong> Ambos métodos abiertos corren el riesgo de división entre cero si la derivada o el denominador se anulan, lo cual provocaría una terminación abrupta sin salvaguardas en el código.
          </div>
        </div>
      </div>

      {/* IMPLEMENTACIÓN EN PYTHON DE MÉTODOS ABIERTOS */}
      <div className="card shadow-sm border-0">
        <div className="card-header bg-dark text-white fw-bold small d-flex justify-content-between align-items-center">
          <span>
            <i className="bi bi-filetype-py me-2 text-warning"></i>
            Código en Python: Newton-Raphson y Secante Abierta
          </span>
          <span className="badge bg-secondary">Python 3</span>
        </div>
        <div className="card-body bg-dark text-light p-3">
          <pre className="mb-0 font-monospace small" style={{ color: "#a6e22e" }}>
{`# 1. Método de Newton-Raphson
def newton_raphson(x0, tol, f, df, max_iter=50):
    i = 1
    error = tol + 1
    print(f"{'i':<4}{'x0':<14}{'x1':<14}{'|x1-x0|':<14}")
    print("-" * 46)
    
    while error >= tol and i <= max_iter:
        derivada = df(x0)
        if abs(derivada) < 1e-12:
            print("Error: Derivada nula. Riesgo de división entre cero.")
            return None
            
        x1 = x0 - f(x0) / derivada
        error = abs(x1 - x0)
        print(f"{i:<4}{x0:<14.6f}{x1:<14.6f}{error:<14.6f}")
        
        x0 = x1
        i += 1
        
    print(f"Solución encontrada: X = {x0:.8f} en iteración {i-1}")
    return x0

# 2. Método de la Secante (Abierto)
def secante_abierto(x0, x1, tol, f, max_iter=50):
    i = 1
    error = tol + 1
    
    while error >= tol and i <= max_iter:
        f_x0 = f(x0)
        f_x1 = f(x1)
        denom = f_x1 - f_x0
        
        if abs(denom) < 1e-12:
            print("Error: f(x1) = f(x0), división entre cero.")
            return None
            
        x2 = x1 - (f_x1 * (x1 - x0)) / denom
        error = abs(x2 - x1)
        
        x0 = x1
        x1 = x2
        i += 1
        
    print(f"Solución por Secante: X = {x1:.8f} en iteración {i-1}")
    return x1

# Ejemplo: f(x) = x^2 - 2, f'(x) = 2x
f = lambda x: x**2 - 2
df = lambda x: 2*x

newton_raphson(x0=2.0, tol=0.01, f=f, df=df)`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default FundamentosTab;