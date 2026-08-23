import React from "react";

const FundamentosTab = () => {
  return (
    <div className="pe-2">
      {/* INTRODUCCIÓN */}
      <p className="text-secondary">
        En Análisis Numérico, la presentación de datos debe ser rigurosa y ordenada. Al ejecutar métodos iterativos o resolver sistemas de ecuaciones lineales, es indispensable que las **tablas de iteraciones** y las **matrices numéricas** se desplieguen con columnas perfectamente alineadas y una cantidad fija de decimales por elemento.
      </p>

      {/* 1. COMODINES DE ALINEACIÓN EN F-STRINGS */}
      <h6 className="fw-bold text-primary mt-4 mb-2">
        <i className="bi bi-text-left me-2"></i>1. Comodines de Alineación y Ancho en f-strings
      </h6>
      <p className="text-secondary small mb-3">
        Para alinear tablas de iteraciones en la consola, se combina el <strong>comodín de alineación</strong> (<code>&lt;</code>, <code>&gt;</code> o <code>^</code>), el <strong>ancho total de columna</strong> y la <strong>precisión decimal</strong> (<code>.Nf</code>):
      </p>

      <div className="table-responsive small mb-4">
        <table className="table table-bordered table-hover align-middle mb-0 font-monospace">
          <thead className="table-light text-center font-sans-serif">
            <tr>
              <th>Comodín</th>
              <th>Alineación</th>
              <th>Propósito en Análisis Numérico</th>
              <th>Sintaxis de Ejemplo</th>
              <th>Resultado Visual</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="fw-bold text-primary text-center">&lt;</td>
              <td className="font-sans-serif">Izquierda</td>
              <td className="font-sans-serif">Encabezados de texto y nombres de variables.</td>
              <td><code>f&quot;{`{'Iter':<6}`}&quot;</code></td>
              <td><code>Iter &nbsp;</code></td>
            </tr>
            <tr>
              <td className="fw-bold text-success text-center">&gt;</td>
              <td className="font-sans-serif">Derecha</td>
              <td className="font-sans-serif">Números y errores para alinear el punto decimal verticalmente.</td>
              <td><code>f&quot;{`{2.449489:>10.4f}`}&quot;</code></td>
              <td><code>&nbsp; &nbsp; 2.4495</code></td>
            </tr>
            <tr>
              <td className="fw-bold text-info text-center">^</td>
              <td className="font-sans-serif">Centro</td>
              <td className="font-sans-serif">Contadores enteros (<code>i</code>) o banderas de estado.</td>
              <td><code>f&quot;{`{1:^6}`}&quot;</code></td>
              <td><code>&nbsp; 1 &nbsp; </code></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* EJEMPLO DE TABLA CON F-STRINGS */}
      <div className="card mb-4 shadow-sm border-primary">
        <div className="card-header bg-primary text-white fw-bold small">
          <i className="bi bi-table me-2"></i>Ejemplo Práctico: Encabezado y Fila de Iteraciones Alineadas
        </div>
        <div className="card-body bg-white font-monospace small">
          <div className="p-2 rounded bg-light border text-secondary mb-2">
            <span className="text-muted"># 1. Encabezado con anchos definidos (4, 12, 12, 14, 10 espacios)</span><br />
            print(f&quot;{`{'i':^4}`}{`{'Xa':>12}`}{`{'Xb':>12}`}{`{'Xc':>14}`}{`{'Error %':>10}`}&quot;)<br />
            print(&quot;&minus;&quot; * 52)<br />
            <br />
            <span className="text-muted"># 2. Fila formateada con decimales fijos</span><br />
            print(f&quot;{`{1:^4}`}{`{1.0:>12.5f}`}{`{2.0:>12.5f}`}{`{1.5:>14.5f}`}{`{0.5:>9.4f}`}%&quot;)
          </div>
          <small className="text-success font-sans-serif fw-semibold">
            &check; Los puntos decimales de las columnas quedan alineados en la misma vertical sin importar la magnitud de los números.
          </small>
        </div>
      </div>

      {/* 2. FORMATEO DE MATRICES EN NUMPY */}
      <h6 className="fw-bold text-primary mt-4 mb-2">
        <i className="bi bi-grid-3x3 me-2"></i>2. Formateo de Matrices con <code>np.set_printoptions</code>
      </h6>
      <p className="text-secondary small mb-2">
        Al imprimir matrices en NumPy para sistemas de ecuaciones lineales ($Ax = b$), el formato por defecto puede mostrar demasiados decimales o números en notación científica desordenada (como <code>1.00000000e-16</code>). La función <code>np.set_printoptions()</code> permite configurar globalmente el aspecto de todas las matrices:
      </p>

      <div className="row g-3 mb-4">
        <div className="col-lg-6 col-12">
          <div className="card h-100 shadow-sm border-0 border-top border-4 border-warning">
            <div className="card-body">
              <h6 className="fw-bold text-dark mb-2">Parámetros Clave de <code>np.set_printoptions</code>:</h6>
              <ul className="small text-secondary ps-3 mb-0">
                <li className="mb-2">
                  <strong><code>precision=4</code>:</strong> Define el número exacto de decimales que se mostrarán por cada elemento.
                </li>
                <li className="mb-2">
                  <strong><code>suppress=True</code>:</strong> Suprime la notación científica para valores muy pequeños cercanos a cero (despliega <code>0.0000</code> en lugar de <code>1.23e-16</code>).
                </li>
                <li className="mb-2">
                  <strong><code>floatmode=&apos;fixed&apos;</code>:</strong> Fuerza a rellenar con ceros a la derecha para mantener siempre la cantidad fija de decimales especificada.
                </li>
                <li>
                  <strong><code>linewidth=120</code>:</strong> Define el ancho máximo de la línea antes de forzar un salto de renglón en matrices grandes.
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-lg-6 col-12">
          <div className="card h-100 shadow-sm border-0 border-top border-4 border-success">
            <div className="card-body">
              <h6 className="fw-bold text-success mb-2">Código Estándar en Análisis Numérico:</h6>
              <div className="p-2 rounded bg-light border font-monospace small mb-2">
                import numpy as np<br />
                <br />
                <span className="text-muted"># Configurar formato de matriz</span><br />
                np.set_printoptions(<br />
                &nbsp;&nbsp;precision=4,<br />
                &nbsp;&nbsp;suppress=True,<br />
                &nbsp;&nbsp;floatmode=&apos;fixed&apos;,<br />
                &nbsp;&nbsp;linewidth=120<br />
                )<br />
                <br />
                A = np.array([[2.123456, 1.0], [0.0000001, 3.789]])<br />
                print(A)
              </div>
              <small className="text-muted">
                Salida limpia: elementos formateados en columnas homogéneas y legibles.
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundamentosTab;