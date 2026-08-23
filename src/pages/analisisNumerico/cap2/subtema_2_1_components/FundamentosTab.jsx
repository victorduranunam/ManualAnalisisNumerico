import React from "react";

const FundamentosTab = () => {
  return (
    <div className="p-3 border rounded bg-light">
      {/* ENCABEZADO */}
      <div className="mb-4 border-bottom pb-2">
        <h4 className="text-primary fw-bold mb-1">
          <i className="bi bi-book-half me-2"></i>
          Subtema 2.1: Métodos Cerrados para la Obtención de Raíces
        </h4>
        <p className="text-muted mb-0">
          Solución numérica de ecuaciones no lineales <code>f(x) = 0</code> mediante el <strong>Método de Bisección</strong> y el <strong>Método de Regla Falsa (Interpolación Lineal / Secante Cerrada)</strong>.
        </p>
      </div>

      {/* CONCEPTO DE RAÍZ Y TEOREMA DE BOLZANO */}
      <div className="row g-3 mb-4">
        {/* Card: ¿Qué es una Raíz? */}
        <div className="col-md-6 col-12">
          <div className="card h-100 shadow-sm border-0 border-top border-4 border-primary">
            <div className="card-body">
              <h5 className="fw-bold text-primary mb-2">
                <i className="bi bi-crosshair me-2"></i>1. Definición de Raíz
              </h5>
              <p className="text-secondary small mb-2">
                La solución de una ecuación algebraica o trascendente consiste en encontrar los valores de la abscisa <code>x</code> donde la curva cruza o toca el eje horizontal:
              </p>
              <div className="p-2 rounded bg-light border font-monospace text-center small mb-2 text-dark fw-bold">
                y = f(x) = 0 &rarr; x = x<sup>*</sup> (Raíz)
              </div>
              <ul className="small text-muted ps-3 mb-0">
                <li>Los métodos numéricos aproximan <strong>una sola raíz a la vez</strong> dentro de un intervalo acotado.</li>
                <li>Para hallar raíces adicionales, se debe desplazar el intervalo de búsqueda y reiniciar el algoritmo.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Card: Teorema de Bolzano */}
        <div className="col-md-6 col-12">
          <div className="card h-100 shadow-sm border-0 border-top border-4 border-success">
            <div className="card-body">
              <h5 className="fw-bold text-success mb-2">
                <i className="bi bi-shield-check me-2"></i>2. Teorema de Bolzano
              </h5>
              <p className="text-secondary small mb-2">
                Es la condición matemática indispensable para todos los métodos cerrados (Teorema del Valor Intermedio):
              </p>
              <div className="p-2 rounded bg-light border font-monospace text-center small mb-2 text-success fw-bold">
                f(x) es continua en [X<sub>a</sub>, X<sub>b</sub>] &nbsp;y&nbsp; f(X<sub>a</sub>) &times; f(X<sub>b</sub>) &lt; 0
              </div>
              <p className="small text-muted mb-0">
                Si las ordenadas <code>Y<sub>a</sub></code> y <code>Y<sub>b</sub></code> tienen signos opuestos (+ y &minus;), se garantiza que existe <strong>al menos una raíz real</strong> dentro del intervalo <code>[X<sub>a</sub>, X<sub>b</sub>]</code>.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* COMPARATIVA DETALLADA: BISECCIÓN VS. REGLA FALSA */}
      <div className="row g-3 mb-4">
        {/* MÉTODO DE BISECCIÓN */}
        <div className="col-lg-6 col-12">
          <div className="card h-100 shadow-sm border-primary">
            <div className="card-header bg-primary text-white fw-bold d-flex justify-content-between align-items-center">
              <span>A. Método de Bisección</span>
              <span className="badge bg-white text-primary">Punto Medio</span>
            </div>
            <div className="card-body bg-white">
              <p className="text-muted small mb-2">
                Divide el intervalo exactamente a la mitad en cada iteración, sin importar las magnitudes de las ordenadas.
              </p>

              <div className="p-2 rounded bg-light border font-monospace small text-primary fw-bold text-center mb-3">
                X<sub>c</sub> = (X<sub>a</sub> + X<sub>b</sub>) / 2
              </div>

              {/* Diagrama SVG Bisección */}
              <div className="text-center p-2 border rounded bg-light mb-3">
                <svg width="100%" height="130" viewBox="0 0 280 110">
                  <line x1="20" y1="55" x2="260" y2="55" stroke="#6c757d" strokeWidth="1.5" />
                  <path d="M 30 95 Q 120 75, 170 55 T 250 15" fill="none" stroke="#0d6efd" strokeWidth="2.5" />
                  <circle cx="40" cy="92" r="4.5" fill="#dc3545" />
                  <circle cx="240" cy="18" r="4.5" fill="#dc3545" />
                  <circle cx="140" cy="55" r="5" fill="#0d6efd" />
                  <line x1="140" y1="55" x2="140" y2="68" stroke="#0d6efd" strokeDasharray="2 2" />
                  <circle cx="140" cy="68" r="3.5" fill="#0d6efd" />
                  <text x="40" y="106" fill="#dc3545" fontSize="9" textAnchor="middle" fontWeight="bold">Xa (-)</text>
                  <text x="240" y="12" fill="#dc3545" fontSize="9" textAnchor="middle" fontWeight="bold">Xb (+)</text>
                  <text x="140" y="47" fill="#0d6efd" fontSize="9" textAnchor="middle" fontWeight="bold">Xc = (Xa+Xb)/2</text>
                </svg>
                <div className="text-muted" style={{ fontSize: "0.75rem" }}>
                  División simétrica: el nuevo subintervalo siempre reduce su tamaño al 50%.
                </div>
              </div>

              <h6 className="fw-bold small text-dark mb-1">Criterio de Reducción del Intervalo:</h6>
              <ul className="small text-secondary ps-3 mb-0">
                <li>Se calcula <code>Y<sub>c</sub> = f(X<sub>c</sub>)</code>.</li>
                <li>Si <code>Y<sub>a</sub> &times; Y<sub>c</sub> &lt; 0</code> &rarr; La raíz está en <code>[X<sub>a</sub>, X<sub>c</sub>]</code> (se descarta B: <code>X<sub>b</sub> = X<sub>c</sub></code>).</li>
                <li>Si <code>Y<sub>b</sub> &times; Y<sub>c</sub> &lt; 0</code> &rarr; La raíz está en <code>[X<sub>c</sub>, X<sub>b</sub>]</code> (se descarta A: <code>X<sub>a</sub> = X<sub>c</sub></code>).</li>
              </ul>
            </div>
          </div>
        </div>

        {/* MÉTODO DE REGLA FALSA (SECANTE CERRADA) */}
        <div className="col-lg-6 col-12">
          <div className="card h-100 shadow-sm border-warning">
            <div className="card-header bg-warning text-dark fw-bold d-flex justify-content-between align-items-center">
              <span>B. Método de Regla Falsa (Secante Cerrada)</span>
              <span className="badge bg-dark text-white">Interpolación Lineal</span>
            </div>
            <div className="card-body bg-white">
              <p className="text-muted small mb-2">
                Aprovecha la magnitud de <code>Y<sub>a</sub></code> y <code>Y<sub>b</sub></code> trazando una recta secante entre ambos puntos y calculando su intersección con el eje X.
              </p>

              <div className="p-2 rounded bg-light border font-monospace small text-dark fw-bold text-center mb-3">
                X<sub>c</sub> = X<sub>a</sub> &minus; Y<sub>a</sub> &times; [(X<sub>b</sub> &minus; X<sub>a</sub>) / (Y<sub>b</sub> &minus; Y<sub>a</sub>)]
              </div>

              {/* Diagrama SVG Regla Falsa */}
              <div className="text-center p-2 border rounded bg-light mb-3">
                <svg width="100%" height="130" viewBox="0 0 280 110">
                  <line x1="20" y1="55" x2="260" y2="55" stroke="#6c757d" strokeWidth="1.5" />
                  <path d="M 30 95 Q 120 75, 170 55 T 250 15" fill="none" stroke="#198754" strokeWidth="2.5" />
                  {/* Recta Secante */}
                  <line x1="40" y1="92" x2="240" y2="18" stroke="#fd7e14" strokeWidth="2" strokeDasharray="4 2" />
                  <circle cx="40" cy="92" r="4.5" fill="#dc3545" />
                  <circle cx="240" cy="18" r="4.5" fill="#dc3545" />
                  {/* Intersección Xc */}
                  <circle cx="165" cy="55" r="5" fill="#fd7e14" />
                  <line x1="165" y1="55" x2="165" y2="60" stroke="#fd7e14" strokeDasharray="2 2" />
                  <circle cx="165" cy="60" r="3.5" fill="#198754" />
                  <text x="40" y="106" fill="#dc3545" fontSize="9" textAnchor="middle" fontWeight="bold">Ya (-)</text>
                  <text x="240" y="12" fill="#dc3545" fontSize="9" textAnchor="middle" fontWeight="bold">Yb (+)</text>
                  <text x="165" y="47" fill="#fd7e14" fontSize="9" textAnchor="middle" fontWeight="bold">Xc (Corte Secante)</text>
                </svg>
                <div className="text-muted" style={{ fontSize: "0.75rem" }}>
                  Interpolación ponderada: el punto <code>X<sub>c</sub></code> se inclina hacia el extremo con ordenada más cercana a cero.
                </div>
              </div>

              <h6 className="fw-bold small text-dark mb-1">Deducción de la Recta Secante:</h6>
              <div className="small font-monospace text-secondary">
                Pendiente: m = (Y<sub>b</sub> &minus; Y<sub>a</sub>) / (X<sub>b</sub> &minus; X<sub>a</sub>)<br />
                Punto-pendiente: y &minus; Y<sub>a</sub> = m(x &minus; X<sub>a</sub>)<br />
                Haciendo y = 0: 0 &minus; Y<sub>a</sub> = m(X<sub>c</sub> &minus; X<sub>a</sub>) &rarr; <strong>X<sub>c</sub> = &minus;Y<sub>a</sub>/m + X<sub>a</sub></strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CASO PRÁCTICO COMPARATIVO DEL APUNTE: f(x) = x^2 - 6 en */}
      <div className="card mb-4 shadow-sm border-primary">
        <div className="card-header bg-primary text-white fw-bold">
          <i className="bi bi-calculator me-2"></i>
          Caso de Estudio de los Apuntes: f(x) = x<sup>2</sup> &minus; 6 en con Tol = 0.01
        </div>
        <div className="card-body bg-white">
          <p className="text-muted small mb-3">
            Comprobación inicial: <code>f(1) = 1<sup>2</sup> &minus; 6 = &minus;5</code> (negativo) y <code>f(4) = 4<sup>2</sup> &minus; 6 = 10</code> (positivo). Cumple Bolzano. Raíz exacta: <code>&radic;6 &asymp; 2.4494897</code>.
          </p>

          <div className="row g-3">
            {/* Bisección paso 1 */}
            <div className="col-md-6 col-12">
              <div className="p-3 border rounded bg-light h-100">
                <h6 className="fw-bold text-primary mb-2">Resolución por Bisección (10 Iteraciones)</h6>
                <div className="font-monospace small text-secondary">
                  <div><strong>Iter 1:</strong> X<sub>c</sub> = (1 + 4)/2 = <strong>2.5</strong></div>
                  <div>Y<sub>c</sub> = (2.5)<sup>2</sup> &minus; 6 = <strong>+0.25</strong> &gt; Tol &rarr; X<sub>b</sub> = 2.5</div>
                  <div><strong>Iter 2:</strong> X<sub>c</sub> = (1 + 2.5)/2 = <strong>1.75</strong></div>
                  <div>Y<sub>c</sub> = (1.75)<sup>2</sup> &minus; 6 = <strong>&minus;2.9375</strong> &rarr; X<sub>a</sub> = 1.75</div>
                  <div className="text-muted mt-2">... continúa iterando hasta ...</div>
                  <div className="p-1 mt-1 bg-white border rounded text-success fw-bold">
                    Iter 10: X<sub>c</sub> = 2.44921875 | Y<sub>c</sub> = 0.0034571 &le; 0.01
                  </div>
                </div>
              </div>
            </div>

            {/* Regla Falsa paso 1 */}
            <div className="col-md-6 col-12">
              <div className="p-3 border rounded bg-light h-100">
                <h6 className="fw-bold text-warning mb-2">Resolución por Regla Falsa (5 Iteraciones)</h6>
                <div className="font-monospace small text-secondary">
                  <div><strong>Iter 1:</strong> X<sub>c</sub> = &minus;(&minus;5)[(4 &minus; 1)/(10 &minus; (&minus;5))] + 1 = <strong>2.0</strong></div>
                  <div>Y<sub>c</sub> = (2)<sup>2</sup> &minus; 6 = <strong>&minus;2.0</strong> &gt; Tol &rarr; X<sub>a</sub> = 2.0</div>
                  <div><strong>Iter 2:</strong> X<sub>c</sub> = &minus;(&minus;2)[(4 &minus; 2)/(10 &minus; (&minus;2))] + 2 = <strong>2.333333</strong></div>
                  <div>Y<sub>c</sub> = (2.333)<sup>2</sup> &minus; 6 = <strong>&minus;0.555556</strong> &rarr; X<sub>a</sub> = 2.333333</div>
                  <div className="text-muted mt-2">... continúa iterando hasta ...</div>
                  <div className="p-1 mt-1 bg-white border rounded text-success fw-bold">
                    Iter 5: X<sub>c</sub> = 2.44783715 | Y<sub>c</sub> = &minus;0.008089 &le; 0.01
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="alert alert-success mt-3 mb-0 py-2 small">
            <strong>Conclusión del apunte:</strong> Para la misma tolerancia (0.01), la <strong>Regla Falsa convergió en la mitad de iteraciones (5 pasos)</strong> que la Bisección (10 pasos), gracias a la inclinación de la secante hacia la ordenada más próxima a cero.
          </div>
        </div>
      </div>

      {/* TABLA COMPARATIVA DE CARACTERÍSTICAS */}
      <div className="card mb-4 shadow-sm">
        <div className="card-header bg-white fw-bold small text-dark">
          <i className="bi bi-table me-2 text-info"></i>
          Resumen Comparativo de Métodos Cerrados
        </div>
        <div className="table-responsive small">
          <table className="table table-bordered table-hover align-middle mb-0 text-center">
            <thead className="table-light">
              <tr>
                <th>Criterio</th>
                <th>Método de Bisección</th>
                <th>Método de Regla Falsa (Secante Cerrada)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="fw-bold">Fórmula de cálculo (X<sub>c</sub>)</td>
                <td className="font-monospace text-primary">X<sub>c</sub> = (X<sub>a</sub> + X<sub>b</sub>) / 2</td>
                <td className="font-monospace text-dark">X<sub>c</sub> = X<sub>a</sub> &minus; Y<sub>a</sub> &times; [(X<sub>b</sub> &minus; X<sub>a</sub>) / (Y<sub>b</sub> &minus; Y<sub>a</sub>)]</td>
              </tr>
              <tr>
                <td className="fw-bold">Base Geométrica</td>
                <td>Punto medio del intervalo</td>
                <td>Intersección de la recta secante con el eje X</td>
              </tr>
              <tr>
                <td className="fw-bold">Garantía de Convergencia</td>
                <td><span className="badge bg-success">100% segura</span> (si cumple Bolzano)</td>
                <td><span className="badge bg-success">100% segura</span> (mantiene encierro de signos)</td>
              </tr>
              <tr>
                <td className="fw-bold">Velocidad de Convergencia</td>
                <td>Lineal fija (divide el error entre 2 en cada paso)</td>
                <td>Generalmente más rápida (superlineal en funciones suaves)</td>
              </tr>
              <tr>
                <td className="fw-bold">Limitación / Desventaja</td>
                <td>Lenta para tolerancias muy pequeñas</td>
                <td>Puede estancarse en un extremo si la curva es muy asimétrica o cóncava</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* IMPLEMENTACIÓN EN PYTHON BASADA EN EL APUNTE */}
      <div className="card shadow-sm border-0">
        <div className="card-header bg-dark text-white fw-bold small d-flex justify-content-between align-items-center">
          <span>
            <i className="bi bi-filetype-py me-2 text-warning"></i>
            Implementación Unificada en Python (Bisección y Regla Falsa)
          </span>
          <span className="badge bg-secondary">Python 3 / NumPy</span>
        </div>
        <div className="card-body bg-dark text-light p-3">
          <pre className="mb-0 font-monospace small" style={{ color: "#a6e22e" }}>
{`import math as mt
import numpy as np

def resolver_metodo_cerrado(Xa, Xb, tol, f, tipo='biseccion'):
    Ya = f(Xa)
    Yb = f(Xb)
    
    # 1. Validación del Teorema de Bolzano
    if Ya * Yb >= 0:
        print("Los valores ingresados no son válidos (no hay cambio de signo)")
        return None
        
    valido = 1
    i = 1
    Yc = tol + 1
    tabla = []
    
    # 2. Bucle iterativo de convergencia
    while abs(Yc) >= tol and valido == 1 and i <= 100:
        Ya = f(Xa)
        Yb = f(Xb)
        
        # Selección de fórmula para Xc
        if tipo == 'biseccion':
            Xc = (Xa + Xb) / 2.0
        elif tipo == 'regla_falsa':
            m = (Yb - Ya) / (Xb - Xa)
            Xc = -Ya / m + Xa
            
        Yc = f(Xc)
        tabla.append([i, Xa, Xb, Xc, Ya, Yb, Yc])
        
        # 3. Reducción del intervalo conservando el cambio de signo
        if Ya * Yc > 0:
            Xa = Xc
        else:
            Xb = Xc
        i += 1
        
    print(f"Solución por {tipo.upper()}: X = {Xc:.8f} en la iteración No {i - 1}")
    return Xc, tabla

# Prueba con el caso del apunte: f(x) = x^2 - 6
f = lambda x: x**2 - 6
resolver_metodo_cerrado(1, 4, 0.01, f, tipo='biseccion')
resolver_metodo_cerrado(1, 4, 0.01, f, tipo='regla_falsa')`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default FundamentosTab;