import React from "react";

const FundamentosTab = () => {
  return (
    <div className="pe-2">
      {/* INTRODUCCIÓN */}
      <p className="text-secondary">
        En Python, una <strong>biblioteca o módulo</strong> es un conjunto de funciones, constantes y clases predefinidas y optimizadas para resolver tareas específicas sin necesidad de programarlas desde cero. En Análisis Numérico, librerías como <strong>NumPy</strong>, <strong>SciPy</strong>, <strong>Matplotlib</strong> y <strong>SymPy</strong> constituyen el núcleo para el cálculo matricial, la graficación y la resolución de ecuaciones.
      </p>

      <p className="text-secondary">
        Para utilizar las herramientas de una biblioteca dentro de un programa, es necesario incorporarlas mediante la sentencia <code>import</code>. Las dos formas más utilizadas en el desarrollo de software científico se describen a continuación:
      </p>

      {/* LAS DOS FORMAS PRINCIPALES DE IMPORTACIÓN */}
      <div className="row g-3 mb-4">
        {/* Forma 1: Con Alias */}
        <div className="col-md-6 col-12">
          <div className="card h-100 shadow-sm border-0 border-top border-4 border-primary">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="fw-bold text-primary mb-0">1. Importación mediante un Alias</h6>
                <span className="badge bg-primary">Estándar PEP 8</span>
              </div>
              <p className="text-muted small mb-2">
                Consiste en importar la biblioteca completa y asignarle un nombre abreviado o alias. Cada vez que se desee utilizar una función, se antepone dicho alias seguido de un punto.
              </p>
              <div className="p-2 rounded bg-light border font-monospace small mb-2">
                <span className="text-muted"># Importación con alias oficial de NumPy</span><br />
                import numpy as np<br />
                <br />
                x = 1.5<br />
                y = np.cos(x)
              </div>
              <small className="text-success fw-semibold">
                &check; Ventaja: Facilita el acceso a todas las funciones de la biblioteca y deja claro su origen en el código.
              </small>
            </div>
          </div>
        </div>

        {/* Forma 2: Específica */}
        <div className="col-md-6 col-12">
          <div className="card h-100 shadow-sm border-0 border-top border-4 border-success">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="fw-bold text-success mb-0">2. Importación de Funciones Específicas</h6>
                <span className="badge bg-success">Directa</span>
              </div>
              <p className="text-muted small mb-2">
                Consiste en importar únicamente las funciones que serán utilizadas. En este caso, se invocan de manera directa sin necesidad de escribir el nombre de la biblioteca como prefijo.
              </p>
              <div className="p-2 rounded bg-light border font-monospace small mb-2">
                <span className="text-muted"># Importar únicamente funciones necesarias</span><br />
                from math import cos, sin, pi<br />
                <br />
                x = pi / 4<br />
                y = cos(x)
              </div>
              <small className="text-success fw-semibold">
                &check; Ventaja: Produce un código más compacto cuando solo se utilizarán unas cuantas funciones.
              </small>
            </div>
          </div>
        </div>
      </div>

      {/* TABLA DE ALIAS ESTÁNDAR EN LA COMUNIDAD CIENTÍFICA */}
      <h6 className="fw-bold text-primary mt-4 mb-2">
        <i className="bi bi-table me-2"></i>Bibliotecas Científicas y sus Alias Estándar
      </h6>
      <p className="text-secondary small mb-3">
        En la comunidad científica de Python existen convenciones universales de nomenclatura (PEP 8) que facilitan la lectura compartida de algoritmos:
      </p>

      <div className="table-responsive small mb-4">
        <table className="table table-bordered table-hover align-middle mb-0">
          <thead className="table-light text-center">
            <tr>
              <th>Biblioteca</th>
              <th>Alias Estándar</th>
              <th>Instrucción de Importación</th>
              <th>Propósito en Análisis Numérico</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="fw-bold text-primary">NumPy</td>
              <td><code>np</code></td>
              <td className="font-monospace">import numpy as np</td>
              <td>Álgebra lineal, matrices, vectores y funciones matemáticas vectorizadas.</td>
            </tr>
            <tr>
              <td className="fw-bold text-success">Matplotlib (Pyplot)</td>
              <td><code>plt</code></td>
              <td className="font-monospace">import matplotlib.pyplot as plt</td>
              <td>Generación de gráficas 2D de funciones, curvas de error y convergencia.</td>
            </tr>
            <tr>
              <td className="fw-bold text-warning">SymPy</td>
              <td><code>sp</code></td>
              <td className="font-monospace">import sympy as sp</td>
              <td>Cálculo simbólico: derivadas analíticas exactas, integrales y polinomios de Taylor.</td>
            </tr>
            <tr>
              <td className="fw-bold text-info">SciPy</td>
              <td><code>sp / sc</code></td>
              <td className="font-monospace">import scipy as sc</td>
              <td>Algoritmos avanzados de optimización, integración numérica y sistemas de EDOs.</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* DIFERENCIA IMPORTANTE: MATH VS NUMPY */}
      <div className="card border-info shadow-sm mb-2">
        <div className="card-header bg-info-subtle fw-bold text-dark small">
          <i className="bi bi-lightbulb me-2 text-info"></i>
          Diferencia Clave en Análisis Numérico: ¿Biblioteca <code>math</code> o <code>numpy</code>?
        </div>
        <div className="card-body bg-white small">
          <div className="row g-3">
            <div className="col-md-6 col-12">
              <strong className="text-dark">Funciones de <code>math</code> (Escalares):</strong>
              <p className="text-muted mb-0">
                Operan únicamente sobre valores numéricos individuales (ej. <code>math.sin(1.5)</code>). Son ideales para cálculos simples punto a punto.
              </p>
            </div>
            <div className="col-md-6 col-12">
              <strong className="text-primary">Funciones de <code>numpy</code> (Vectorizadas):</strong>
              <p className="text-muted mb-0">
                Operan de forma simultánea sobre arreglos de cientos o miles de puntos a la vez (ej. <code>np.sin(x_vector)</code>), permitiendo evaluar y graficar curvas completas sin usar bucles <code>for</code>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundamentosTab;