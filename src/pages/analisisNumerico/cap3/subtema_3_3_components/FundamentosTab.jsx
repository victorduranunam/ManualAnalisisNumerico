import React from "react";

const FundamentosTab = () => (
  <div className="container-fluid p-3">
    <div className="card shadow-sm border-0 mb-4">
      <div className="card-body p-4">
        {/* 1. Definición de Valores y Vectores Característicos */}
        <section className="mb-4">
          <h5 className="text-primary fw-bold border-bottom pb-2">
            1. Valores y Vectores Característicos (Eigenvalores y Eigenvectores)
          </h5>
          <p>
            Dada una matriz cuadrada <code>A</code> de orden <code>n × n</code>, un escalar <code>λ</code> es un <strong>valor característico (eigenvalor)</strong> y un vector no nulo <code>v</code> es su correspondiente <strong>vector característico (eigenvector)</strong> si satisfacen la ecuación fundamental:
          </p>
          <div className="bg-light p-3 border rounded text-center font-monospace fw-bold">
            A · v = λ · v &emsp;⟹&emsp; |A - λ · I| = 0
          </div>
          <p className="mt-2">
            La ecuación <code>|A - λ · I| = 0</code> determina el <strong>polinomio característico</strong> de grado <code>n</code>:
          </p>
          <div className="bg-light p-3 border rounded text-center font-monospace">
            p(λ) = λ<sup>n</sup> + b<sub>1</sub>λ<sup>n-1</sup> + b<sub>2</sub>λ<sup>n-2</sup> + ... + b<sub>n-1</sub>λ + b<sub>n</sub> = 0
          </div>
          <p className="mt-2 mb-0 text-secondary">
            Las raíces de este polinomio corresponden exactamente a todos los eigenvalores de la matriz <code>A</code>.
          </p>
        </section>

        {/* 2. Método de Krylov */}
        <section className="mb-4">
          <h5 className="text-primary fw-bold border-bottom pb-2">
            2. Método de Krylov (Obtención del Polinomio Característico)
          </h5>
          <p>
            El <strong>Método de Krylov</strong> permite determinar los coeficientes <code>b<sub>1</sub>, b<sub>2</sub>, ..., b<sub>n</sub></code> del polinomio característico apoyándose en el <strong>Teorema de Cayley-Hamilton</strong>, el cual establece que toda matriz cuadrada satisface su propia ecuación característica:
          </p>
          <div className="bg-light p-3 border rounded text-center font-monospace">
            A<sup>n</sup> + b<sub>1</sub>A<sup>n-1</sup> + b<sub>2</sub>A<sup>n-2</sup> + ... + b<sub>n</sub>I = 0
          </div>
          <p className="mt-2">
            Multiplicando esta ecuación matricial por un vector propuesto no nulo <code>y</code> (por ejemplo <code>y =<sup>T</sup></code>):
          </p>
          <div className="bg-light p-3 border rounded text-center font-monospace">
            b<sub>1</sub>(A<sup>n-1</sup>y) + b<sub>2</sub>(A<sup>n-2</sup>y) + ... + b<sub>n</sub>y = -A<sup>n</sup>y
          </div>
          <p className="mt-3 mb-1">
            Esto se transforma directamente en un sistema de ecuaciones lineales <strong>M · b = B</strong>:
          </p>
          <div className="bg-light p-3 border rounded font-monospace">
            <div>M = [ A<sup>n-1</sup>y &emsp; A<sup>n-2</sup>y &emsp; ... &emsp; A·y &emsp; y ]</div>
            <div className="mt-1">B = -A<sup>n</sup> · y</div>
            <div className="mt-1">b = [ b<sub>1</sub>, b<sub>2</sub>, ..., b<sub>n</sub> ]<sup>T</sup></div>
          </div>
          <p className="mt-2 mb-0">
            Al resolver este sistema lineal (por Gauss-Jordan o factorización LU), el vector solución <code>b</code> proporciona los coeficientes del polinomio característico para posteriormente calcular sus raíces (eigenvalores).
          </p>
        </section>

        {/* 3. Método de las Potencias */}
        <section className="mb-4">
          <h5 className="text-primary fw-bold border-bottom pb-2">
            3. Método de las Potencias (Aproximaciones Sucesivas)
          </h5>
          <p>
            El <strong>Método de las Potencias</strong> es un método iterativo que calcula de forma directa el <strong>eigenvalor dominante (máximo en valor absoluto)</strong> y el <strong>menor eigenvalor (mínimo)</strong> de una matriz real junto con sus respectivos vectores asociados.
          </p>
          <div className="alert alert-info py-2 mb-0" role="alert">
            <strong>Condición de convergencia:</strong> El método converge siempre que el eigenvalor buscado sea real y estrictamente dominante (único en magnitud).
          </div>
        </section>

        {/* 4. Mayor Valor Característico */}
        <section className="mb-4">
          <h5 className="text-primary fw-bold border-bottom pb-2">
            4. Cálculo del Mayor Valor Característico (λ<sub>máx</sub>)
          </h5>
          <p>
            A partir de <code>A · X = λ · X</code>, se establece la ecuación de aproximaciones sucesivas:
          </p>
          <div className="bg-light p-3 border rounded text-center font-monospace fw-bold">
            A · X<sup>(k)</sup> = λ<sup>(k+1)</sup> · X<sup>(k+1)</sup>
          </div>
          <div className="mt-3">
            <h6 className="fw-bold text-dark">Procedimiento por iteración:</h6>
            <ol className="mb-2">
              <li>Multiplicar la matriz por el vector actual: <code>V = A · X<sup>(k)</sup></code>.</li>
              <li>
                Identificar el elemento de mayor valor absoluto en <code>V</code> como la nueva aproximación:
                <br />
                <code>λ<sup>(k+1)</sup> = elemento_mayor_absoluto(V)</code>.
              </li>
              <li>
                Normalizar el vector para la siguiente iteración:
                <br />
                <code>X<sup>(k+1)</sup> = V / λ<sup>(k+1)</sup></code>.
              </li>
              <li>
                Evaluar el criterio de paro:
                <br />
                <code>|λ<sup>(k+1)</sup> - λ<sup>(k)</sup>| &lt; Tolerancia</code>.
              </li>
            </ol>
          </div>
        </section>

        {/* 5. Menor Valor Característico */}
        <section className="mb-4">
          <h5 className="text-primary fw-bold border-bottom pb-2">
            5. Cálculo del Menor Valor Característico (λ<sub>mín</sub>)
          </h5>
          <p>
            Para encontrar el menor eigenvalor, se multiplica la relación fundamental por la inversa de la matriz <code>A<sup>-1</sup></code>:
          </p>
          <div className="bg-light p-3 border rounded text-center font-monospace">
            A<sup>-1</sup> · X<sup>(k)</sup> = (1 / λ<sup>(k+1)</sup>) · X<sup>(k+1)</sup>
          </div>
          <div className="mt-3">
            <h6 className="fw-bold text-dark">Procedimiento por iteración:</h6>
            <ol className="mb-2">
              <li>Calcular el producto con la matriz inversa: <code>V = A<sup>-1</sup> · X<sup>(k)</sup></code>.</li>
              <li>
                Obtener el valor pivote máximo en valor absoluto de <code>V</code>:
                <br />
                <code>Pivote = elemento_mayor_absoluto(V)</code>.
              </li>
              <li>
                El nuevo valor característico estimado corresponde a su inverso:
                <br />
                <code>λ<sup>(k+1)</sup> = 1 / Pivote</code>.
              </li>
              <li>
                Normalizar el vector: <code>X<sup>(k+1)</sup> = V · λ<sup>(k+1)</sup></code> (equivalente a <code>V / Pivote</code>).
              </li>
              <li>
                Evaluar convergencia: <code>|λ<sup>(k+1)</sup> - λ<sup>(k)</sup>| &lt; Tolerancia</code>.
              </li>
            </ol>
          </div>
        </section>

        {/* 6. Tabla Comparativa */}
        <section className="mb-4">
          <h5 className="text-primary fw-bold border-bottom pb-2">
            6. Comparación: Método de Krylov vs. Método de las Potencias
          </h5>
          <div className="table-responsive">
            <table className="table table-bordered align-middle">
              <thead className="table-light">
                <tr>
                  <th style={{ width: "25%" }}>Aspecto</th>
                  <th style={{ width: "37%" }}>Método de Krylov</th>
                  <th style={{ width: "38%" }}>Método de las Potencias</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="fw-bold">Objetivo Principal</td>
                  <td>Obtener el polinomio característico completo <code>p(λ)</code>.</td>
                  <td>Obtener directamente los eigenvalores extremos (<code>λ<sub>máx</sub></code> o <code>λ<sub>mín</sub></code>).</td>
                </tr>
                <tr>
                  <td className="fw-bold">Naturaleza</td>
                  <td>Método matricial directo (resuelve <code>M·b = B</code>).</td>
                  <td>Método iterativo por aproximaciones sucesivas.</td>
                </tr>
                <tr>
                  <td className="fw-bold">Vector Asociado</td>
                  <td>Requiere pasos adicionales tras hallar las raíces.</td>
                  <td>Genera directamente el eigenvector asociado normalizado.</td>
                </tr>
                <tr>
                  <td className="fw-bold">Uso de Inversa</td>
                  <td>No requiere calcular <code>A<sup>-1</sup></code>.</td>
                  <td>Requiere calcular <code>A<sup>-1</sup></code> para obtener <code>λ<sub>mín</sub></code>.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 7. Resumen de Algoritmos */}
        <section>
          <h5 className="text-primary fw-bold border-bottom pb-2">
            7. Resumen de Pasos de Ejecución
          </h5>
          <div className="row g-3">
            <div className="col-md-6">
              <div className="border rounded p-3 h-100 bg-light">
                <h6 className="fw-bold text-primary">Flujo Krylov</h6>
                <ol className="small mb-0 ps-3">
                  <li>Proponer vector <code>y ≠ 0</code> (ej. <code><sup>T</sup></code>).</li>
                  <li>Calcular potencias de matriz: <code>A·y, A<sup>2</sup>·y, ..., A<sup>n</sup>·y</code>.</li>
                  <li>Formar <code>M</code> y <code>B = -A<sup>n</sup>·y</code>.</li>
                  <li>Resolver <code>M·b = B</code> para obtener <code>b</code>.</li>
                  <li>Construir el polinomio y hallar sus raíces.</li>
                </ol>
              </div>
            </div>
            <div className="col-md-6">
              <div className="border rounded p-3 h-100 bg-light">
                <h6 className="fw-bold text-primary">Flujo Potencias</h6>
                <ol className="small mb-0 ps-3">
                  <li>Proponer vector inicial <code>X<sub>0</sub> =<sup>T</sup></code>.</li>
                  <li>Multiplicar por <code>A</code> (para <code>λ<sub>máx</sub></code>) o por <code>A<sup>-1</sup></code> (para <code>λ<sub>mín</sub></code>).</li>
                  <li>Extraer el escalar pivote y normalizar el vector.</li>
                  <li>Comparar la diferencia de <code>λ</code> con la tolerancia.</li>
                  <li>Reportar el eigenvalor final y su eigenvector asociado.</li>
                </ol>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
);

export default FundamentosTab;