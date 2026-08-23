import React from "react";

const FundamentosTab = () => {
  return (
    <div className="container-fluid p-0">
      {/* Encabezado del Subtema */}
      <div className="card shadow-sm border-0 mb-4 bg-light">
        <div className="card-body p-4">
          <span className="badge bg-primary mb-2">Subtema 1.1 / 1.2</span>
          <h3 className="card-title fw-bold text-dark mb-2">
            Necesidad y Fundamentos de los Métodos Numéricos
          </h3>
          <p className="card-text text-secondary mb-0">
            Conceptos clave sobre el rol del análisis numérico en la ingeniería,
            diferencias con el análisis matemático tradicional y criterios para su
            aplicación práctica.
          </p>
        </div>
      </div>

      {/* 1. ¿Qué son los Métodos Numéricos? */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body p-4">
          <h5 className="fw-bold text-primary mb-3">
            <i className="bi bi-gear-wide-connected me-2"></i>
            1. Definición y Propósito
          </h5>
          <p className="text-dark">
            Los <strong>métodos numéricos</strong> son herramientas y técnicas alternativas que nos
            facilitan el trabajo para formular y resolver problemas matemáticos en los cuales se
            dificulta o imposibilita el uso de los métodos analíticos tradicionales.
          </p>
          <div className="alert alert-primary mb-0" role="alert">
            <strong>Objetivo principal:</strong> Obtener soluciones aproximadas a problemas
            complejos mediante operaciones aritméticas y lógicas repetitivas, manteniendo el error
            dentro de límites tolerables y no significativos para la ingeniería.
          </div>
        </div>
      </div>

      {/* 2. Análisis Matemático vs Análisis Numérico */}
      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <div className="card h-100 shadow-sm border-0 border-start border-4 border-info">
            <div className="card-body p-4">
              <h5 className="fw-bold text-info mb-3">Análisis Matemático Tradicional</h5>
              <ul className="text-secondary ps-3 mb-3">
                <li className="mb-2">Busca <strong>soluciones analíticas exactas</strong> y cerradas.</li>
                <li className="mb-2">Trabaja principalmente con funciones continuas ideales.</li>
                <li>
                  Ejemplo directo de derivación:
                  <div className="bg-light p-2 rounded text-dark font-monospace mt-1">
                    d/dx [3x²] = 6x
                  </div>
                </li>
              </ul>
              <p className="small text-muted mb-0">
                Se vuelve impráctico o imposible cuando los modelos matemáticos no tienen primitiva elemental o despeje algebraico directo.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card h-100 shadow-sm border-0 border-start border-4 border-success">
            <div className="card-body p-4">
              <h5 className="fw-bold text-success mb-3">Análisis Numérico (Matemáticas Aplicadas)</h5>
              <ul className="text-secondary ps-3 mb-3">
                <li className="mb-2">
                  Transforma <strong>datos experimentales o fenómenos reales</strong> en funciones y modelos aproximados.
                </li>
                <li className="mb-2">
                  Permite obtener valores numéricos muy cercanos a los reales con un <strong>error controlado</strong>.
                </li>
                <li>
                  Aprovecha el poder de cómputo para realizar cálculos iterativos y masivos.
                </li>
              </ul>
              <p className="small text-muted mb-0">
                Fundamental para el tratamiento de datos discretos y modelos con geometrías o condiciones complejas.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. ¿Cuándo utilizarlos? */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body p-4">
          <h5 className="fw-bold text-primary mb-3">
            <i className="bi bi-clock-history me-2"></i>
            2. Criterios de Aplicación y Rol del Cómputo
          </h5>
          <div className="row g-3">
            <div className="col-lg-6">
              <div className="p-3 bg-light rounded h-100">
                <h6 className="fw-bold text-dark mb-2">Criterio de Eficiencia y Tiempo</h6>
                <p className="text-secondary mb-0">
                  Al utilizar cualquier método numérico, debe procurarse que el tiempo invertido en la búsqueda de la solución sea <strong>menor</strong> al que hubiéramos empleado resolviéndolo manualmente o de manera analítica.
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="p-3 bg-light rounded h-100">
                <h6 className="fw-bold text-dark mb-2">Uso de Herramientas Computacionales</h6>
                <p className="text-secondary mb-0">
                  Aunque los métodos numéricos pueden formularse a mano con papel y lápiz, su máximo potencial se alcanza al delegar el trabajo pesado y repetitivo a <strong>computadoras, calculadoras programables y software especializado</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Problemas típicos en la ingeniería */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body p-4">
          <h5 className="fw-bold text-primary mb-3">
            <i className="bi bi-cpu me-2"></i>
            3. Escenarios Comunes de Aplicación
          </h5>
          <div className="row g-3">
            <div className="col-md-4">
              <div className="border rounded p-3 h-100">
                <h6 className="fw-bold text-dark mb-2">Sistemas de Gran Escala</h6>
                <p className="small text-secondary mb-0">
                  Sistemas de ecuaciones algebraicas simultáneas con decenas, cientos o miles de incógnitas (análisis matricial de estructuras, redes eléctricas o hidráulicas).
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="border rounded p-3 h-100">
                <h6 className="fw-bold text-dark mb-2">Integrales No Elementales</h6>
                <p className="small text-secondary mb-0">
                  Funciones complejas cuyas primitivas no pueden expresarse mediante funciones elementales y requieren cuadratura numérica.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="border rounded p-3 h-100">
                <h6 className="fw-bold text-dark mb-2">Ecuaciones Trascendentes</h6>
                <p className="small text-secondary mb-0">
                  Ecuaciones algebraicas y trascendentes donde las incógnitas no pueden despejarse de forma directa mediante álgebra elemental.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Caso Práctico Demostrativo */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body p-4">
          <h5 className="fw-bold text-primary mb-3">
            <i className="bi bi-lightbulb me-2"></i>
            4. Ejemplo Demostrativo: Ecuación Trascendente
          </h5>
          <p className="text-secondary">
            Considérese el problema de encontrar la raíz de la ecuación:
          </p>
          <div className="text-center bg-light p-3 rounded mb-3">
            <span className="fs-5 font-monospace text-dark fw-bold">eˣ = 1 / x</span>
          </div>

          <div className="row g-3">
            <div className="col-md-6">
              <div className="border rounded p-3 bg-white h-100">
                <h6 className="fw-bold text-danger mb-2">Limitación Analítica</h6>
                <p className="small text-secondary mb-2">
                  Si intentamos despejar algebraicamente la variable <code className="text-dark">x</code>:
                </p>
                <div className="bg-light p-2 rounded font-monospace small mb-2">
                  1) x · eˣ = 1<br />
                  2) ln(x · eˣ) = ln(1)<br />
                  3) ln(x) + x = 0
                </div>
                <p className="small text-muted mb-0">
                  Se cae en un ciclo donde no es posible aislar <code className="text-dark">x</code> con operaciones algebraicas básicas.
                </p>
              </div>
            </div>

            <div className="col-md-6">
              <div className="border rounded p-3 bg-white h-100">
                <h6 className="fw-bold text-success mb-2">Enfoque Numérico / Gráfico</h6>
                <p className="small text-secondary mb-2">
                  Se descompone en dos funciones independientes y se busca su punto de intersección:
                </p>
                <div className="bg-light p-2 rounded font-monospace small mb-2">
                  f(x) = eˣ<br />
                  g(x) = 1 / x<br />
                  f(x) = g(x)  ⟹  f(x) - g(x) = 0
                </div>
                <p className="small text-muted mb-0">
                  Mediante evaluación sucesiva o algoritmos de búsqueda de raíces (como bisección o Newton-Raphson), se converge a la solución aproximada <strong>x ≈ 0.56714</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundamentosTab;