import React from "react";

const FundamentosTab = () => (
  <div className="container-fluid p-3">
    <div className="card shadow-sm border-0 mb-4">
      <div className="card-body p-4">
        {/* 1. Introducción a Métodos Iterativos */}
        <section className="mb-4">
          <h5 className="text-primary fw-bold border-bottom pb-2">
            1. Fundamento de los Métodos Iterativos
          </h5>
          <p>
            A diferencia de los métodos directos (como Gauss-Jordan o factorización LU), los <strong>métodos iterativos</strong> parten de un vector de aproximación inicial <code>X<sup>(0)</sup> = [x<sub>0</sub>, y<sub>0</sub>, z<sub>0</sub>, ...]<sup>T</sup></code> y generan una secuencia progresiva de aproximaciones <code>X<sup>(1)</sup>, X<sup>(2)</sup>, ..., X<sup>(k)</sup></code> mediante ecuaciones de recurrencia hasta converger a la solución con un error menor a una tolerancia prefijada.
          </p>
          <p className="mb-0">
            En un sistema lineal <code>AX = B</code>, las ecuaciones de recurrencia se obtienen despejando la incógnita correspondiente al elemento de la diagonal principal de cada renglón.
          </p>
        </section>

        {/* 2. Método de Jacobi */}
        <section className="mb-4">
          <h5 className="text-primary fw-bold border-bottom pb-2">
            2. Método de Jacobi
          </h5>
          <p>
            En el <strong>Método de Jacobi</strong>, el cálculo de todas las incógnitas en la iteración <code>k + 1</code> se realiza utilizando <strong>exclusivamente los valores obtenidos en la iteración anterior <code>k</code></strong>:
          </p>
          <div className="bg-light p-3 border rounded text-center font-monospace">
            x<sub>i</sub><sup>(k+1)</sup> = (1 / a<sub>ii</sub>) · [ b<sub>i</sub> - ∑<sub>j ≠ i</sub> (a<sub>ij</sub> · x<sub>j</sub><sup>(k)</sup>) ]
          </div>
          <p className="mt-2 text-muted small">
            <em>Ejemplo (3x3):</em>
            <br />
            <code>x<sub>k+1</sub> = (1 / a<sub>11</sub>) · (b<sub>1</sub> - a<sub>12</sub>y<sub>k</sub> - a<sub>13</sub>z<sub>k</sub>)</code>
            <br />
            <code>y<sub>k+1</sub> = (1 / a<sub>22</sub>) · (b<sub>2</sub> - a<sub>21</sub>x<sub>k</sub> - a<sub>23</sub>z<sub>k</sub>)</code>
            <br />
            <code>z<sub>k+1</sub> = (1 / a<sub>33</sub>) · (b<sub>3</sub> - a<sub>31</sub>x<sub>k</sub> - a<sub>32</sub>y<sub>k</sub>)</code>
          </p>
        </section>

        {/* 3. Método de Gauss-Seidel */}
        <section className="mb-4">
          <h5 className="text-primary fw-bold border-bottom pb-2">
            3. Método de Gauss-Seidel
          </h5>
          <p>
            El <strong>Método de Gauss-Seidel</strong> mejora la eficiencia de Jacobi al <strong>incorporar de forma inmediata los valores recién calculados en la misma iteración</strong> para calcular las siguientes incógnitas:
          </p>
          <div className="bg-light p-3 border rounded text-center font-monospace">
            x<sub>i</sub><sup>(k+1)</sup> = (1 / a<sub>ii</sub>) · [ b<sub>i</sub> - ∑<sub>j &lt; i</sub> (a<sub>ij</sub> · x<sub>j</sub><sup>(k+1)</sup>) - ∑<sub>j &gt; i</sub> (a<sub>ij</sub> · x<sub>j</sub><sup>(k)</sup>) ]
          </div>
          <p className="mt-2 text-muted small">
            <em>Ejemplo (3x3):</em>
            <br />
            <code>x<sub>k+1</sub> = (1 / a<sub>11</sub>) · (b<sub>1</sub> - a<sub>12</sub>y<sub>k</sub> - a<sub>13</sub>z<sub>k</sub>)</code>
            <br />
            <code>y<sub>k+1</sub> = (1 / a<sub>22</sub>) · (b<sub>2</sub> - a<sub>21</sub><strong>x<sub>k+1</sub></strong> - a<sub>23</sub>z<sub>k</sub>)</code>
            <br />
            <code>z<sub>k+1</sub> = (1 / a<sub>33</sub>) · (b<sub>3</sub> - a<sub>31</sub><strong>x<sub>k+1</sub></strong> - a<sub>32</sub><strong>y<sub>k+1</sub></strong>)</code>
          </p>
        </section>

        {/* 4. Tabla Comparativa */}
        <section className="mb-4">
          <h5 className="text-primary fw-bold border-bottom pb-2">
            4. Comparación Directa entre Jacobi y Gauss-Seidel
          </h5>
          <div className="table-responsive">
            <table className="table table-bordered align-middle">
              <thead className="table-light">
                <tr>
                  <th style={{ width: "20%" }}>Característica</th>
                  <th style={{ width: "40%" }}>Método de Jacobi</th>
                  <th style={{ width: "40%" }}>Método de Gauss-Seidel</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="fw-bold">Uso de incógnitas</td>
                  <td>Solo valores de la iteración previa <code>k</code>.</td>
                  <td>Valores recién calculados en la iteración <code>k + 1</code>.</td>
                </tr>
                <tr>
                  <td className="fw-bold">Velocidad de convergencia</td>
                  <td>Más lento; requiere un mayor número de iteraciones.</td>
                  <td>Más rápido; reduce significativamente el número de iteraciones.</td>
                </tr>
                <tr>
                  <td className="fw-bold">Almacenamiento en memoria</td>
                  <td>Requiere almacenar dos vectores completos (<code>X<sup>(k)</sup></code> y <code>X<sup>(k+1)</sup></code>).</td>
                  <td>Permite sobreescribir el vector de variables directamente en memoria.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 5. Criterio de Convergencia */}
        <section className="mb-4">
          <h5 className="text-primary fw-bold border-bottom pb-2">
            5. Criterio de Convergencia: Matriz Diagonalmente Dominante
          </h5>
          <p>
            Ambos métodos requieren para garantizar su convergencia que la matriz de coeficientes <code>A</code> sea <strong>estrictamente diagonal dominante</strong> por renglones:
          </p>
          <div className="bg-light p-3 border rounded text-center font-monospace">
            |a<sub>ii</sub>| &gt; ∑<sub>j ≠ i</sub> |a<sub>ij</sub>|, &emsp; para todo i = 1, 2, ..., n
          </div>
          <p className="mt-2">
            En cada renglón, el valor absoluto del coeficiente de la diagonal principal debe ser estrictamente mayor que la suma de los valores absolutos de los coeficientes restantes de ese mismo renglón.
          </p>
          <div className="alert alert-warning mb-0" role="alert">
            <strong>Reordenamiento previo:</strong> Si el sistema original no es diagonal dominante, se deben permutar renglones o columnas para satisfacer esta condición antes de ejecutar el algoritmo iterativo.
          </div>
        </section>

        {/* 6. Cálculo de Error y Criterio de Paro */}
        <section className="mb-4">
          <h5 className="text-primary fw-bold border-bottom pb-2">
            6. Cálculo del Error y Criterio de Paro
          </h5>
          <p>
            En cada iteración se calcula la diferencia absoluta de cada incógnita respecto a su valor en la iteración previa:
          </p>
          <div className="bg-light p-3 border rounded font-monospace">
            <div>Ex = |x^(k+1) - x^(k)|</div>
            <div>Ey = |y^(k+1) - y^(k)|</div>
            <div>Ez = |z^(k+1) - z^(k)|</div>
          </div>
          <p className="mt-2 mb-0">
            El proceso se detiene cuando todos los errores son menores a la tolerancia prefijada:
            <br />
            <code>max(Ex, Ey, Ez, ...) &lt; Tolerancia</code> (ej. <code>0.001</code>) o cuando se alcanza el límite máximo de iteraciones para evitar ciclos infinitos.
          </p>
        </section>

        {/* 7. Algoritmo General */}
        <section>
          <h5 className="text-primary fw-bold border-bottom pb-2">
            7. Pasos del Algoritmo
          </h5>
          <ol className="mb-0">
            <li>Acondicionar la matriz <code>A</code> para que sea diagonalmente dominante.</li>
            <li>Obtener las expresiones despejadas de cada incógnita <code>x<sub>i</sub></code>.</li>
            <li>Definir el vector de aproximación inicial <code>X<sup>(0)</sup></code> (comúnmente ceros), la tolerancia y el límite de iteraciones (<code>itmax</code>).</li>
            <li>Calcular el nuevo vector <code>X<sup>(k+1)</sup></code>:
              <ul>
                <li><strong>En Jacobi:</strong> usando sólo valores de <code>X<sup>(k)</sup></code>.</li>
                <li><strong>En Gauss-Seidel:</strong> usando los valores actualizados <code>x<sub>j</sub><sup>(k+1)</sup></code> para <code>j &lt; i</code>.</li>
              </ul>
            </li>
            <li>Calcular los errores absolutos <code>E<sub>i</sub> = |x<sub>i</sub><sup>(k+1)</sup> - x<sub>i</sub><sup>(k)</sup>|</code>.</li>
            <li>Si <code>max(E<sub>i</sub>) &lt; Tolerancia</code>, finalizar y devolver la solución. De lo contrario, actualizar <code>X<sup>(k)</sup> = X<sup>(k+1)</sup></code> y continuar iterando.</li>
          </ol>
        </section>
      </div>
    </div>
  </div>
);

export default FundamentosTab;