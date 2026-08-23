import React from "react";

const FundamentosTab = () => {
  return (
    <div className="pe-2">
      {/* INTRODUCCIÓN */}
      <p className="text-secondary">
        En Python, una <strong>variable</strong> es un espacio reservado en memoria que permite almacenar y manipular información a lo largo de la ejecución de un programa. A diferencia de otros lenguajes (como C o Fortran), en Python <strong>no es necesario declarar previamente el tipo de dato</strong>; el intérprete infiere el tipo dinámicamente en el momento en que se le asigna un valor mediante el operador <code>=</code>.
      </p>

      {/* SINTAXIS BÁSICA */}
      <div className="bg-light p-2 rounded border text-center my-3 font-monospace fw-bold text-dark">
        nombre_variable = valor
      </div>

      {/* REGLAS OBLIGATORIAS Y CONVENCIONES DE NOMENCLATURA */}
      <h6 className="fw-bold text-primary mt-4 mb-2">
        <i className="bi bi-card-checklist me-2"></i>Reglas y Buenas Prácticas para Nombrar Variables
      </h6>

      <div className="row g-3 mb-4">
        {/* Reglas Obligatorias */}
        <div className="col-md-6 col-12">
          <div className="card h-100 shadow-sm border-0 border-top border-4 border-danger">
            <div className="card-body">
              <h6 className="fw-bold text-danger mb-2">
                <i className="bi bi-x-octagon me-2"></i>Reglas Obligatorias (Evitan SyntaxError)
              </h6>
              <ul className="small text-secondary ps-3 mb-0">
                <li className="mb-2">
                  <strong>Sin espacios en blanco:</strong> No se pueden separar palabras con espacios.<br />
                  <span className="text-danger">❌ <code>error absoluto = 0.5</code></span> &rarr; <span className="text-success">✔️ <code>error_absoluto = 0.5</code></span>
                </li>
                <li className="mb-2">
                  <strong>No iniciar con números:</strong> El primer carácter debe ser una letra o un guion bajo (<code>_</code>).<br />
                  <span className="text-danger">❌ <code>1raiz = 2.44</code></span> &rarr; <span className="text-success">✔️ <code>raiz_1 = 2.44</code></span>
                </li>
                <li className="mb-2">
                  <strong>Sensible a mayúsculas (Case-sensitive):</strong> <code>tol</code>, <code>Tol</code> y <code>TOL</code> son tres variables completamente distintas en memoria.
                </li>
                <li>
                  <strong>No usar palabras reservadas:</strong> No se pueden usar términos del lenguaje como <code>for</code>, <code>while</code>, <code>if</code>, <code>def</code>, <code>class</code>, <code>lambda</code>.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Convenciones de Estilo */}
        <div className="col-md-6 col-12">
          <div className="card h-100 shadow-sm border-0 border-top border-4 border-success">
            <div className="card-body">
              <h6 className="fw-bold text-success mb-2">
                <i className="bi bi-fonts me-2"></i>Convenciones para Nombres Compuestos
              </h6>
              <p className="small text-muted mb-2">
                Para que el código sea legible y profesional, existen dos estilos principales para variables compuestas por dos o más palabras:
              </p>
              <ul className="small text-secondary ps-3 mb-0">
                <li className="mb-2">
                  <strong>Estilo <code>snake_case</code> (Recomendado en Python - PEP 8):</strong><br />
                  Todo en minúsculas separando las palabras con guion bajo.<br />
                  <code className="text-primary">x_inicial = 1.0</code> | <code className="text-primary">error_relativo = 0.02</code> | <code className="text-primary">mensaje_estado = &quot;OK&quot;</code>
                </li>
                <li>
                  <strong>Estilo <code>camelCase</code> (Muy común en otros lenguajes):</strong><br />
                  Primera palabra en minúscula y la primera letra de las siguientes en mayúscula.<br />
                  <code className="text-primary">xInicial = 1.0</code> | <code className="text-primary">errorRelativo = 0.02</code> | <code className="text-primary">mensajeEstado = &quot;OK&quot;</code>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* TABLA DE TIPOS DE VARIABLES EN ANÁLISIS NUMÉRICO */}
      <h6 className="fw-bold text-primary mt-4 mb-2">
        <i className="bi bi-table me-2"></i>Tipos de Variables más Usados en Análisis Numérico
      </h6>
      <p className="text-secondary small mb-3">
        En el desarrollo de métodos numéricos se utilizan tanto los tipos de datos nativos de Python como estructuras especializadas de librerías científicas:
      </p>

      <div className="table-responsive small mb-3">
        <table className="table table-bordered table-hover align-middle mb-0">
          <thead className="table-light text-center">
            <tr>
              <th>Tipo de Dato</th>
              <th>Tipo en Python</th>
              <th>Propósito en Métodos Numéricos</th>
              <th>Ejemplo de Sintaxis</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="fw-bold text-dark">Cadena de Texto</td>
              <td><code>str</code></td>
              <td>Mensajes de advertencia, estado de convergencia, títulos de gráficas y fórmulas leídas como texto.</td>
              <td><code>mensaje = &quot;Convergencia alcanzada&quot;</code></td>
            </tr>
            <tr>
              <td className="fw-bold text-dark">Entero</td>
              <td><code>int</code></td>
              <td>Contador de iteraciones (<code>i</code>), grado de polinomios (<code>n</code>), dimensiones de matrices.</td>
              <td><code>max_iter = 50</code></td>
            </tr>
            <tr>
              <td className="fw-bold text-dark">Flotante (Real)</td>
              <td><code>float</code></td>
              <td>Aproximaciones sucesivas (<code>x_c</code>), cálculo de errores y tolerancias en notación científica.</td>
              <td><code>tol = 1e-4</code> <small className="text-muted">(0.0001)</small></td>
            </tr>
            <tr>
              <td className="fw-bold text-dark">Booleano</td>
              <td><code>bool</code></td>
              <td>Banderas lógicas para validar el Teorema de Bolzano o controlar la salida de bucles <code>while</code>.</td>
              <td><code>valido = True</code></td>
            </tr>
            <tr>
              <td className="fw-bold text-dark">Función Lambda</td>
              <td><code>function</code></td>
              <td>Definición compacta de funciones matemáticas <code>f(x)</code> para evaluarlas directamente.</td>
              <td><code>f = lambda x: x**2 - 2</code></td>
            </tr>
            <tr>
              <td className="fw-bold text-dark">Arreglo Numérico</td>
              <td><code>numpy.ndarray</code></td>
              <td>Almacenamiento de vectores y matrices para sistemas de ecuaciones lineales y ajuste de curvas.</td>
              <td><code>A = np.array(,])</code></td>
            </tr>
            <tr>
              <td className="fw-bold text-dark">Variable Simbólica</td>
              <td><code>sympy.Symbol</code></td>
              <td>Representación analítica para derivación exacta y cálculo de series de Taylor.</td>
              <td><code>x = sp.Symbol(&apos;x&apos;)</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* NOTA DE PRECISIÓN */}
      <div className="alert alert-info py-2 small mb-0">
        <strong>Nota sobre Notación Científica:</strong> En métodos numéricos es común expresar tolerancias muy pequeñas mediante notación exponencial. Por ejemplo, <code>1e-6</code> equivale a <code>1 &times; 10<sup>&minus;6</sup> = 0.000001</code>.
      </div>
    </div>
  );
};

export default FundamentosTab;