import React from "react";

const FundamentosTab = () => (
  <div className="container-fluid p-3">
    {/* ========================================================================= */}
    {/* CARD 1: MÉTODO DE GAUSS-JORDAN Y ESTRATEGIAS DE PIVOTEO                    */}
    {/* ========================================================================= */}
    <div className="card shadow-sm border-0 mb-4">
      <div className="card-header bg-light border-start border-primary border-4 py-3">
        <h5 className="text-primary fw-bold mb-0">
          I. Método de Gauss-Jordan y Estrategias de Pivoteo
        </h5>
      </div>
      <div className="card-body p-4">
        {/* 1.1 Clasificación de Sistemas */}
        <section className="mb-4">
          <h6 className="text-primary fw-bold border-bottom pb-2">
            1. Clasificación de Sistemas de Ecuaciones Lineales
          </h6>
          <p className="text-secondary">
            Un sistema de ecuaciones lineales <strong>AX = B</strong> se clasifica según la naturaleza de sus soluciones:
          </p>
          <div className="row g-3">
            <div className="col-md-4">
              <div className="border rounded p-3 h-100 bg-light">
                <span className="badge bg-success mb-2">Compatible Determinado</span>
                <p className="small mb-0">
                  <strong>Solución única:</strong> El determinante de la matriz de coeficientes es no nulo (<code>det(A) ≠ 0</code>). Los métodos numéricos directos buscan este tipo de solución.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="border rounded p-3 h-100 bg-light">
                <span className="badge bg-warning text-dark mb-2">Compatible Indeterminado</span>
                <p className="small mb-0">
                  <strong>Infinitas soluciones:</strong> Se presentan renglones completos de ceros en la matriz ampliada (<code>0 = 0</code>).
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="border rounded p-3 h-100 bg-light">
                <span className="badge bg-danger mb-2">Incompatible</span>
                <p className="small mb-0">
                  <strong>Sin solución:</strong> Se produce una inconsistencia matemática (por ejemplo, <code>0 = k</code> con <code>k ≠ 0</code>).
                </p>
              </div>
            </div>
          </div>
          <div className="alert alert-info mt-3 mb-0" role="alert">
            <strong>Requisito previo:</strong> Verificar que <code>det(A) ≠ 0</code>. Si el determinante es igual a cero, el sistema no tiene solución única y los métodos numéricos no son aplicables.
          </div>
        </section>

        {/* 1.2 Fundamento de Gauss-Jordan */}
        <section className="mb-4">
          <h6 className="text-primary fw-bold border-bottom pb-2">
            2. Fundamento del Método de Gauss-Jordan
          </h6>
          <p>
            El método consiste en aplicar transformaciones elementales por renglón sobre la matriz ampliada <code>[A | B]</code> para transformar la matriz de coeficientes <code>A</code> en la <strong>matriz identidad <code>I</code></strong>:
          </p>
          <div className="text-center bg-white border rounded p-3 my-2 font-monospace fw-bold">
            [A | B] &emsp;→ (Operaciones por renglón) →&emsp; [I | X]
          </div>
          <p className="mt-2">
            El vector <code>X</code> resultante en la última columna corresponde directamente a los valores de las incógnitas.
          </p>

          <h6 className="fw-bold mt-3">Fórmula de Eliminación por Renglón:</h6>
          <p className="mb-1">
            Para convertir a cero la celda en la posición <code>(j, i)</code> utilizando el elemento pivote diagonal <code>(i, i)</code>:
          </p>
          <div className="bg-light p-3 border rounded font-monospace">
            <div>Factor = Celda(cambiar, pivote) / Celda(pivote, pivote) = A[j, i] / A[i, i]</div>
            <div>Renglón[j] = Renglón[j] - (Factor) × Renglón[i]</div>
          </div>
        </section>

        {/* 1.3 Estrategias de Pivoteo */}
        <section className="mb-4">
          <h6 className="text-primary fw-bold border-bottom pb-2">
            3. Estrategias de Pivoteo para Minimizar Errores
          </h6>
          <p>
            Dividir entre elementos pivote muy pequeños cercanos a cero amplifica los errores de redondeo o provoca división entre cero. Para evitarlo se utilizan estrategias de pivoteo:
          </p>
          <ul>
            <li>
              <strong>Pivoteo Parcial:</strong> Antes de eliminar en la columna <code>i</code>, se busca el elemento de mayor valor absoluto en esa columna debajo de la diagonal y se intercambia ese renglón con el renglón pivote.
            </li>
            <li>
              <strong>Pivoteo Total:</strong> Se busca el elemento de mayor valor absoluto en toda la submatriz restante, intercambiando tanto renglones como columnas (reordenando las variables correspondientes).
            </li>
          </ul>
        </section>

        {/* 1.4 Algoritmo Gauss-Jordan */}
        <section>
          <h6 className="text-primary fw-bold border-bottom pb-2">
            4. Pasos del Algoritmo de Gauss-Jordan
          </h6>
          <ol className="mb-0">
            <li>Construir la matriz ampliada <code>MB = [A | B]</code> en punto flotante.</li>
            <li>Para cada columna <code>i</code> desde <code>0</code> hasta <code>n - 1</code>:
              <ul>
                <li>Aplicar estrategia de pivoteo si el elemento diagonal es nulo o cercano a cero.</li>
                <li>Para cada renglón <code>j ≠ i</code>, calcular <code>Factor = MB[j, i] / MB[i, i]</code>.</li>
                <li>Actualizar: <code>MB[j, :] = MB[j, :] - Factor × MB[i, :]</code>.</li>
              </ul>
            </li>
            <li>Normalizar dividiendo cada renglón <code>i</code> entre su pivote diagonal <code>MB[i, i]</code>.</li>
            <li>Extraer la última columna como vector solución <code>X</code>.</li>
          </ol>
        </section>
      </div>
    </div>

    {/* ========================================================================= */}
    {/* CARD 2: MÉTODOS DE DESCOMPOSICIÓN LU (CROUT Y DOOLITTLE)                   */}
    {/* ========================================================================= */}
    <div className="card shadow-sm border-0 mb-4">
      <div className="card-header bg-light border-start border-success border-4 py-3">
        <h5 className="text-success fw-bold mb-0">
          II. Métodos de Descomposición LU (Crout, Doolittle y Cholesky)
        </h5>
      </div>
      <div className="card-body p-4">
        {/* 2.1 Concepto de LU */}
        <section className="mb-4">
          <h6 className="text-success fw-bold border-bottom pb-2">
            1. Concepto de Descomposición LU
          </h6>
          <p>
            La factorización <code>LU</code> consiste en descomponer una matriz cuadrada <code>A</code> en el producto de dos matrices triangulares:
          </p>
          <div className="bg-light p-3 border rounded text-center font-monospace fw-bold">
            A = L · U
          </div>
          <p className="mt-2">
            Donde <strong>L</strong> (<em>Lower</em>) es una matriz triangular inferior y <strong>U</strong> (<em>Upper</em>) es una matriz triangular superior. Permite resolver sistemas lineales con mayor eficiencia y calcular inversas o determinantes.
          </p>
        </section>

        {/* 2.2 Variantes */}
        <section className="mb-4">
          <h6 className="text-success fw-bold border-bottom pb-2">
            2. Variantes de Descomposición
          </h6>
          <div className="row g-3">
            <div className="col-md-4">
              <div className="border rounded p-3 h-100 bg-light">
                <h6 className="fw-bold text-success">Forma Doolittle</h6>
                <p className="small mb-0">
                  La matriz <strong>L tiene unos en la diagonal principal</strong> (<code>L<sub>ii</sub> = 1</code>). La matriz <code>U</code> contiene los valores calculados en su diagonal.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="border rounded p-3 h-100 bg-light">
                <h6 className="fw-bold text-success">Forma Crout</h6>
                <p className="small mb-0">
                  La matriz <strong>U tiene unos en la diagonal principal</strong> (<code>U<sub>ii</sub> = 1</code>). La matriz <code>L</code> contiene los valores calculados en su diagonal.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="border rounded p-3 h-100 bg-light">
                <h6 className="fw-bold text-success">Forma Cholesky</h6>
                <p className="small mb-0">
                  Aplica a matrices simétricas y definidas positivas, donde <code>A = L · L<sup>T</sup></code>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 2.3 Procedimiento Numérico */}
        <section className="mb-4">
          <h6 className="text-success fw-bold border-bottom pb-2">
            3. Algoritmo Numérico de Transformación
          </h6>
          <p>
            Se inicia considerando <code>L = I</code> (matriz identidad) y <code>U = A</code>:
          </p>
          <div className="bg-light p-3 border rounded font-monospace">
            <div>Factor = U[j, i] / U[i, i]</div>
            <div className="mt-1">
              <strong>Transformación en U (por renglón):</strong> Renglón_U[j] = Renglón_U[j] - Factor × Renglón_U[i]
            </div>
            <div className="mt-1">
              <strong>Transformación en L (por columna):</strong> Columna_L[i] = Columna_L[i] + Factor × Columna_L[j]
            </div>
          </div>
          <p className="mt-2">
            Para la forma de Crout, al terminar la eliminación se normaliza <code>U</code> dividiendo cada renglón entre su elemento diagonal <code>U[i, i]</code>, multiplicando la columna correspondiente de <code>L</code> por ese mismo factor.
          </p>
        </section>

        {/* 2.4 Verificación */}
        <section>
          <h6 className="text-success fw-bold border-bottom pb-2">
            4. Verificación
          </h6>
          <p className="mb-0">
            Para comprobar que la descomposición fue correcta, se efectúa la multiplicación matricial <code>L · U</code>, la cual debe ser idéntica a la matriz original <code>A</code>.
          </p>
        </section>
      </div>
    </div>

    {/* ========================================================================= */}
    {/* CARD 3: SOLUCIÓN DE SISTEMAS LINEALES MEDIANTE A = LU                      */}
    {/* ========================================================================= */}
    <div className="card shadow-sm border-0 mb-4">
      <div className="card-header bg-light border-start border-info border-4 py-3">
        <h5 className="text-info fw-bold mb-0">
          III. Solución de Sistemas de Ecuaciones Lineales mediante A = LU
        </h5>
      </div>
      <div className="card-body p-4">
        {/* 3.1 Fundamento */}
        <section className="mb-4">
          <h6 className="text-info fw-bold border-bottom pb-2">
            1. Descomposición y Reagrupación del Sistema
          </h6>
          <p>
            Dado el sistema lineal <code>A X = B</code>, sustituyendo <code>A = L · U</code>:
          </p>
          <div className="bg-light p-3 border rounded text-center font-monospace fw-bold">
            (L · U) X = B &emsp;⟹&emsp; L · (U · X) = B
          </div>
          <p className="mt-2">
            Definiendo el vector auxiliar <strong>Y = U · X</strong>, la solución se obtiene resolviendo dos sistemas triangulares sucesivos:
          </p>
          <div className="row g-3 text-center font-monospace">
            <div className="col-md-6">
              <div className="border rounded p-3 bg-white">
                <span className="badge bg-info text-dark mb-2">Paso 1: Sustitución Hacia Adelante</span>
                <div className="fw-bold fs-5">L · Y = B</div>
                <small className="text-muted">Se despeja el vector intermedio Y</small>
              </div>
            </div>
            <div className="col-md-6">
              <div className="border rounded p-3 bg-white">
                <span className="badge bg-success mb-2">Paso 2: Sustitución Hacia Atrás</span>
                <div className="fw-bold fs-5">U · X = Y</div>
                <small className="text-muted">Se despeja el vector solución final X</small>
              </div>
            </div>
          </div>
        </section>

        {/* 3.2 Algoritmos de Sustitución */}
        <section className="mb-4">
          <h6 className="text-info fw-bold border-bottom pb-2">
            2. Algoritmos de Sustitución
          </h6>
          
          <h6 className="fw-bold text-dark">A. Sustitución Hacia Adelante (L · Y = B):</h6>
          <p className="mb-1">
            Como <code>L</code> es triangular inferior, se despeja progresivamente desde <code>y<sub>0</sub></code> hasta <code>y<sub>n-1</sub></code>:
          </p>
          <div className="bg-light p-3 border rounded font-monospace">
            y<sub>i</sub> = [ B<sub>i</sub> - ∑<sub>j=0</sub><sup>i-1</sup> (L[i, j] · y<sub>j</sub>) ] / L[i, i]
          </div>

          <h6 className="fw-bold text-dark mt-3">B. Sustitución Hacia Atrás (U · X = Y):</h6>
          <p className="mb-1">
            Como <code>U</code> es triangular superior, se despeja en orden inverso desde <code>x<sub>n-1</sub></code> hasta <code>x<sub>0</sub></code>:
          </p>
          <div className="bg-light p-3 border rounded font-monospace">
            x<sub>i</sub> = [ Y<sub>i</sub> - ∑<sub>j=i+1</sub><sup>n-1</sup> (U[i, j] · x<sub>j</sub>) ] / U[i, i]
          </div>
        </section>

        {/* 3.3 Ventajas */}
        <section>
          <h6 className="text-info fw-bold border-bottom pb-2">
            3. Ventajas Computacionales
          </h6>
          <ul>
            <li>
              <strong>Múltiples vectores B:</strong> Si el vector de términos independientes cambia frecuentemente, la descomposición <code>LU</code> se calcula una sola vez (costo <code>O(n<sup>3</sup>)</code>), y cada nueva solución solo requiere las sustituciones hacia adelante y atrás (costo <code>O(n<sup>2</sup>)</code>).
            </li>
            <li>
              <strong>Cálculo directo del determinante:</strong> <code>det(A) = det(L) · det(U) = (∏ L<sub>ii</sub>) · (∏ U<sub>ii</sub>)</code>.
            </li>
          </ul>
        </section>
      </div>
    </div>
  </div>
);

export default FundamentosTab;