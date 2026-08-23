import React from "react";

const FundamentosTab = () => {
  return (
    <div className="p-3 border rounded bg-light">
      {/* ENCABEZADO */}
      <div className="mb-4 border-bottom pb-2">
        <h4 className="text-primary fw-bold mb-1">
          <i className="bi bi-book-half me-2"></i>
          Aproximación de Funciones: Polinomio de Taylor y Maclaurin
        </h4>
        <p className="text-muted mb-0">
          Fundamentos matemáticos, formulación del polinomio de Taylor, residuo de Lagrange y análisis de errores de truncamiento en ingeniería.
        </p>
      </div>

      {/* MOTIVACIÓN Y CONCEPTO CLAVE */}
      <div className="row g-3 mb-4">
        <div className="col-md-6 col-12">
          <div className="card h-100 shadow-sm border-0 border-top border-4 border-primary">
            <div className="card-body">
              <h5 className="fw-bold text-primary mb-2">
                <i className="bi bi-cpu me-2"></i>¿Por qué aproximar con polinomios?
              </h5>
              <p className="text-secondary small mb-2">
                En ingeniería y ciencias computacionales, evaluar funciones trascendentes complejas (como funciones trigonométricas, exponenciales o logarítmicas) directamente resulta costoso.
              </p>
              <ul className="small text-secondary ps-3 mb-0">
                <li>Los polinomios son estructuras algebraicas sencillas formadas únicamente por sumas y multiplicaciones.</li>
                <li>Son fáciles de evaluar computacionalmente, derivar e integrar analíticamente.</li>
                <li>Permiten obtener una aproximación local con una precisión tan alta como se requiera aumentando el grado del polinomio.</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-12">
          <div className="card h-100 shadow-sm border-0 border-top border-4 border-success">
            <div className="card-body">
              <h5 className="fw-bold text-success mb-2">
                <i className="bi bi-diagram-3 me-2"></i>Definición General de Taylor
              </h5>
              <p className="text-secondary small mb-2">
                Si una función <code>f(x)</code> tiene derivadas continuas hasta orden <code>n</code> en un entorno del punto <code>x = a</code>, su polinomio de Taylor de grado <code>n</code> es:
              </p>
              <div className="p-2 rounded bg-light border font-monospace small text-dark text-center">
                p(x) = f(a) + (f&apos;(a)/1!)(x &minus; a) + (f&apos;&apos;(a)/2!)(x &minus; a)<sup>2</sup> + ... + (f<sup>(n)</sup>(a)/n!)(x &minus; a)<sup>n</sup>
              </div>
              <div className="mt-2 small text-muted">
                <strong>Caso especial (Maclaurin):</strong> Cuando el punto de expansión es <strong>a = 0</strong>, el polinomio se denomina <em>Serie o Polinomio de Maclaurin</em>.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CASO PRÁCTICO DESARROLLADO: f(x) = cos(x) en a = 0 */}
      <div className="card mb-4 shadow-sm border-primary">
        <div className="card-header bg-primary text-white fw-bold d-flex justify-content-between align-items-center">
          <span>
            <i className="bi bi-pencil-square me-2"></i>
            Ejemplo Desarrollado: Polinomio de Grado 4/5 para f(x) = cos(x) en a = 0
          </span>
          <span className="badge bg-white text-primary">Maclaurin (a = 0)</span>
        </div>
        <div className="card-body bg-white">
          <p className="text-muted small mb-3">
            A continuación se muestra el procedimiento analítico paso a paso para construir el polinomio de aproximación y evaluar su error en <code>x = &pi;/4</code>.
          </p>

          <div className="row g-3">
            {/* Paso 1: Derivadas */}
            <div className="col-lg-4 col-12">
              <div className="p-3 border rounded bg-light h-100">
                <h6 className="fw-bold text-primary mb-2">Paso 1: Cálculo de Derivadas en a = 0</h6>
                <div className="font-monospace small text-secondary">
                  <div>f(a) = cos(0) = <strong>1</strong></div>
                  <div>f&apos;(a) = &minus;sen(0) = <strong>0</strong></div>
                  <div>f&apos;&apos;(a) = &minus;cos(0) = <strong>&minus;1</strong></div>
                  <div>f&apos;&apos;&apos;(a) = sen(0) = <strong>0</strong></div>
                  <div>f<sup>(4)</sup>(a) = cos(0) = <strong>1</strong></div>
                  <div>f<sup>(5)</sup>(a) = &minus;sen(0) = <strong>0</strong></div>
                </div>
              </div>
            </div>

            {/* Paso 2: Sustitución y Simplificación */}
            <div className="col-lg-4 col-12">
              <div className="p-3 border rounded bg-light h-100">
                <h6 className="fw-bold text-primary mb-2">Paso 2: Estructura del Polinomio</h6>
                <div className="font-monospace small text-secondary">
                  <div className="mb-2">
                    p(x) = 1 + 0(x) &minus; (1/2!)x<sup>2</sup> + 0(x<sup>3</sup>) + (1/4!)x<sup>4</sup> &minus; 0(x<sup>5</sup>)
                  </div>
                  <div className="p-2 rounded bg-white border text-primary fw-bold text-center fs-6">
                    p(x) = 1 &minus; x<sup>2</sup>/2 + x<sup>4</sup>/24
                  </div>
                </div>
              </div>
            </div>

            {/* Paso 3: Evaluación y Error */}
            <div className="col-lg-4 col-12">
              <div className="p-3 border rounded bg-light h-100">
                <h6 className="fw-bold text-primary mb-2">Paso 3: Evaluación en x = &pi;/4</h6>
                <div className="font-monospace small text-secondary">
                  <div>Valor Real: f(&pi;/4) = 1/&radic;2 = <strong>0.70710678</strong></div>
                  <div>Valor Aprox: p(&pi;/4) = <strong>0.70742921</strong></div>
                  <div className="mt-2 text-danger fw-bold">
                    ERP = |(0.70710678 &minus; 0.70742921)/0.70710678| &times; 100%
                  </div>
                  <div className="badge bg-success fs-6 mt-1">
                    ERP = 0.045598% (&gt; 99.95% de precisión)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* GRÁFICO VISUAL COMPARATIVO SVG */}
      <div className="card mb-4 shadow-sm">
        <div className="card-header bg-white fw-bold small text-dark d-flex justify-content-between align-items-center">
          <span>
            <i className="bi bi-graph-up me-2 text-success"></i>
            Comportamiento Gráfico: f(x) = cos(x) vs. p(x) = 1 &minus; x<sup>2</sup>/2 + x<sup>4</sup>/24
          </span>
          <div className="small">
            <span className="badge bg-success me-2">&bull; Función Real f(x)</span>
            <span className="badge bg-danger">&bull; Polinomio p(x)</span>
          </div>
        </div>
        <div className="card-body text-center p-3 bg-white">
          <svg width="100%" height="200" viewBox="0 0 500 180">
            {/* Ejes cartesianos */}
            <line x1="30" y1="120" x2="480" y2="120" stroke="#ced4da" strokeWidth="1.5" />
            <line x1="120" y1="10" x2="120" y2="170" stroke="#ced4da" strokeWidth="1.5" />

            {/* Línea de referencia x = pi/4 */}
            <line x1="200" y1="20" x2="200" y2="160" stroke="#6c757d" strokeDasharray="4 3" strokeWidth="1.5" />
            <circle cx="200" cy="55" r="4.5" fill="#0d6efd" />

            {/* Curva f(x) = cos(x) (verde) */}
            <path
              d="M 40 40 Q 120 40, 200 55 T 320 145 T 460 145"
              fill="none"
              stroke="#198754"
              strokeWidth="2.5"
            />

            {/* Curva p(x) = 1 - x^2/2 + x^4/24 (roja) */}
            <path
              d="M 40 40 Q 120 40, 200 55 T 320 145 Q 400 135, 460 30"
              fill="none"
              stroke="#dc3545"
              strokeWidth="2.5"
            />

            {/* Punto de expansión a = 0 */}
            <circle cx="120" cy="40" r="5" fill="#dc3545" />

            {/* Etiquetas */}
            <text x="120" y="28" fill="#dc3545" fontSize="11" fontWeight="bold" textAnchor="middle">a = 0</text>
            <text x="200" y="175" fill="#0d6efd" fontSize="11" fontWeight="bold" textAnchor="middle">x = &pi;/4</text>
            <text x="475" y="115" fill="#6c757d" fontSize="10" textAnchor="end">Eje X</text>
            <text x="125" y="18" fill="#6c757d" fontSize="10">Eje Y</text>
          </svg>
          <div className="small text-muted mt-2">
            Nota cómo el polinomio coincide con exactitud cerca del centro <strong>a = 0</strong> y en <strong>x = &pi;/4</strong>, pero comienza a separarse a medida que <strong>x &gt; 2.5</strong> (error de truncamiento).
          </div>
        </div>
      </div>

      {/* RESIDUO DE TAYLOR Y COTA DE LAGRANGE */}
      <div className="card mb-4 shadow-sm border-warning">
        <div className="card-header bg-warning-subtle text-dark fw-bold">
          <i className="bi bi-shield-exclamation me-2"></i>
          Residuo de Taylor y Cota del Error de Lagrange
        </div>
        <div className="card-body bg-white">
          <p className="text-secondary small mb-3">
            El <strong>Residuo de Taylor R<sub>n</sub>(x)</strong> representa la diferencia exacta entre la función real y el polinomio truncado: <code>f(x) = p<sub>n</sub>(x) + R<sub>n</sub>(x)</code>.
          </p>

          <div className="row g-3">
            <div className="col-md-6 col-12">
              <div className="p-3 border rounded bg-light h-100">
                <h6 className="fw-bold text-dark mb-2">Forma de Lagrange del Residuo:</h6>
                <div className="p-2 rounded bg-white border font-monospace text-center small mb-2 text-danger fw-bold">
                  R<sub>n</sub>(x) = [f<sup>(n+1)</sup>(c) / (n+1)!] &times; (x &minus; a)<sup>n+1</sup>
                </div>
                <ul className="small text-muted ps-3 mb-0">
                  <li><strong>c:</strong> Punto desconocido que pertenece al intervalo cerrado entre <code>a</code> y <code>x</code> (c &isin; [a, x]).</li>
                  <li>Se evalúa empleando la <strong>siguiente derivada (orden n + 1)</strong> al grado del polinomio obtenido.</li>
                </ul>
              </div>
            </div>

            <div className="col-md-6 col-12">
              <div className="p-3 border rounded bg-light h-100">
                <h6 className="fw-bold text-dark mb-2">Cota Máxima y Notación Asintótica:</h6>
                <div className="p-2 rounded bg-white border font-monospace text-center small mb-2 text-primary fw-bold">
                  |R<sub>n</sub>(x)| &le; [M / (n+1)!] &times; |x &minus; a|<sup>n+1</sup> = O((x &minus; a)<sup>n+1</sup>)
                </div>
                <ul className="small text-muted ps-3 mb-0">
                  <li><strong>M:</strong> Cota superior de la derivada de orden (n+1): <code>M = max |f<sup>(n+1)</sup>(t)|</code> para <code>t &isin; [a, x]</code>.</li>
                  <li><strong>Orden O(&middot;):</strong> Indica que al reducir la distancia <code>|x &minus; a|</code>, el error decrece con potencia <code>n + 1</code>.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TABLA DE SERIES DE MACLAURIN FRECUENTES */}
      <div className="card mb-4 shadow-sm">
        <div className="card-header bg-white fw-bold small text-dark">
          <i className="bi bi-table me-2 text-info"></i>
          Series de Maclaurin Fundamentales en Métodos Numéricos (a = 0)
        </div>
        <div className="table-responsive small">
          <table className="table table-bordered table-hover align-middle mb-0 text-center font-monospace">
            <thead className="table-light">
              <tr>
                <th>Función f(x)</th>
                <th>Desarrollo en Serie de Maclaurin</th>
                <th>Término General</th>
                <th>Radio de Convergencia</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="fw-bold text-primary font-sans-serif">cos(x)</td>
                <td>1 &minus; x<sup>2</sup>/2! + x<sup>4</sup>/4! &minus; x<sup>6</sup>/6! + ...</td>
                <td>(&minus;1)<sup>k</sup> x<sup>2k</sup> / (2k)!</td>
                <td>(&minus;&infin;, +&infin;)</td>
              </tr>
              <tr>
                <td className="fw-bold text-success font-sans-serif">sen(x)</td>
                <td>x &minus; x<sup>3</sup>/3! + x<sup>5</sup>/5! &minus; x<sup>7</sup>/7! + ...</td>
                <td>(&minus;1)<sup>k</sup> x<sup>2k+1</sup> / (2k+1)!</td>
                <td>(&minus;&infin;, +&infin;)</td>
              </tr>
              <tr>
                <td className="fw-bold text-danger font-sans-serif">e<sup>x</sup></td>
                <td>1 + x + x<sup>2</sup>/2! + x<sup>3</sup>/3! + x<sup>4</sup>/4! + ...</td>
                <td>x<sup>k</sup> / k!</td>
                <td>(&minus;&infin;, +&infin;)</td>
              </tr>
              <tr>
                <td className="fw-bold text-warning font-sans-serif">ln(1 + x)</td>
                <td>x &minus; x<sup>2</sup>/2 + x<sup>3</sup>/3 &minus; x<sup>4</sup>/4 + ...</td>
                <td>(&minus;1)<sup>k+1</sup> x<sup>k</sup> / k</td>
                <td>&minus;1 &lt; x &le; 1</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* IMPLEMENTACIÓN EN PYTHON CON SYMPY */}
      <div className="card shadow-sm border-0">
        <div className="card-header bg-dark text-white fw-bold small d-flex justify-content-between align-items-center">
          <span>
            <i className="bi bi-filetype-py me-2 text-warning"></i>
            Implementación en Python con SymPy (Cálculo Simbólico)
          </span>
          <span className="badge bg-secondary">Python 3 / SymPy</span>
        </div>
        <div className="card-body bg-dark text-light p-3">
          <pre className="mb-0 font-monospace small" style={{ color: "#a6e22e" }}>
{`import sympy as sp

# 1. Definir variable simbólica y parámetros
x = sp.Symbol('x')
a = 0
f = sp.cos(x)

# 2. Generación automática con series() especificando punto y orden
taylor_auto = f.series(x, x0=a, n=6)

print("Polinomio con término de error:")
print(taylor_auto)
# Salida: 1 - x**2/2 + x**4/24 + O(x**6)

# 3. Remover el término O(...) para evaluación numérica
polinomio = taylor_auto.removeO()
valor_aprox = float(polinomio.subs(x, sp.pi/4))
valor_real = float(f.subs(x, sp.pi/4))

print(f"Valor Real: {valor_real:.8f}")
print(f"Valor Aprox: {valor_aprox:.8f}")
print(f"ERP: {abs((valor_real - valor_aprox)/valor_real)*100:.6f}%")`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default FundamentosTab;