import React, { useState } from "react";

const SimuladorTab = () => {
  // Estado para operaciones básicas
  const [valA, setValA] = useState(14);
  const [valB, setValB] = useState(4);

  // Estado para aplicación en análisis numérico (Discretización / Iteraciones)
  const [numIntervalos, setNumIntervalos] = useState(5);
  const [limA, setLimA] = useState(0);
  const [limB, setLimB] = useState(1);

  // Estado para prueba de precisión arbitraria
  const [baseExp, setBaseExp] = useState(2);
  const [potencia, setPotencia] = useState(64);

  // Conversión segura
  const a = parseInt(valA, 10) || 0;
  const b = parseInt(valB, 10) || 1;
  const n = Math.max(1, parseInt(numIntervalos, 10) || 1);
  const expBase = parseInt(baseExp, 10) || 2;
  const expP = Math.max(0, parseInt(potencia, 10) || 0);

  // Cálculo de discretización
  const h = (parseFloat(limB) - parseFloat(limA)) / n;

  // Cálculo de potencia grande usando BigInt nativo de JS
  let resPotencia = "0";
  let numDigitos = 0;
  try {
    const bigRes = BigInt(expBase) ** BigInt(expP);
    resPotencia = bigRes.toString();
    numDigitos = resPotencia.length;
  } catch (e) {
    resPotencia = "Error en cálculo";
  }

  return (
    <div className="p-4 border rounded bg-light shadow-sm">
      <h4 className="text-primary fw-bold mb-3">
        🧪 4.2 Simulador Interactivo: Números Enteros (<code>int</code>)
      </h4>

      <p className="text-secondary leading-relaxed">
        Experimenta con el comportamiento de los números enteros en Python, sus operadores aritméticos especializados y su rol fundamental en la discretización de mallas y control de algoritmos numéricos.
      </p>

      {/* SECCIÓN 1: OPERADORES ARITMÉTICOS */}
      <div className="card mb-4 border-primary shadow-sm">
        <div className="card-header bg-primary text-white fw-bold">
          1. Operadores Aritméticos y Tipos Resultantes
        </div>
        <div className="card-body">
          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <label className="form-label fw-bold">Variable <code>a</code> (entero):</label>
              <input
                type="number"
                className="form-control"
                value={valA}
                onChange={(e) => setValA(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-bold">Variable <code>b</code> (entero):</label>
              <input
                type="number"
                className="form-control"
                value={valB}
                onChange={(e) => setValB(e.target.value)}
              />
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle mb-0 bg-white">
              <thead className="table-dark">
                <tr>
                  <th>Operación en Python</th>
                  <th>Sintaxis</th>
                  <th>Resultado</th>
                  <th>Tipo de dato</th>
                  <th>Uso común en Análisis Numérico</th>
                </tr>
              </thead>
              <tbody className="font-monospace small">
                <tr>
                  <td className="font-sans-serif">Suma</td>
                  <td><code>a + b</code></td>
                  <td className="fw-bold text-success">{a + b}</td>
                  <td><code>&lt;class 'int'&gt;</code></td>
                  <td className="font-sans-serif text-muted">Incremento de contadores / pivotes</td>
                </tr>
                <tr>
                  <td className="font-sans-serif">Resta</td>
                  <td><code>a - b</code></td>
                  <td className="fw-bold text-success">{a - b}</td>
                  <td><code>&lt;class 'int'&gt;</code></td>
                  <td className="font-sans-serif text-muted">Ajuste de índices en matrices</td>
                </tr>
                <tr>
                  <td className="font-sans-serif">Multiplicación</td>
                  <td><code>a * b</code></td>
                  <td className="fw-bold text-success">{a * b}</td>
                  <td><code>&lt;class 'int'&gt;</code></td>
                  <td className="font-sans-serif text-muted">Dimensionamiento total de mallas</td>
                </tr>
                <tr className="table-warning">
                  <td className="font-sans-serif"><strong>División clásica</strong></td>
                  <td><code>a / b</code></td>
                  <td className="fw-bold text-primary">
                    {b !== 0 ? (a / b).toFixed(4) : "ZeroDivisionError"}
                  </td>
                  <td><code>&lt;class 'float'&gt;</code></td>
                  <td className="font-sans-serif text-muted">
                    ⚠️ Siempre retorna <code>float</code> aunque sea exacta
                  </td>
                </tr>
                <tr className="table-success">
                  <td className="font-sans-serif"><strong>División entera (Piso)</strong></td>
                  <td><code>a // b</code></td>
                  <td className="fw-bold text-primary">
                    {b !== 0 ? Math.floor(a / b) : "ZeroDivisionError"}
                  </td>
                  <td><code>&lt;class 'int'&gt;</code></td>
                  <td className="font-sans-serif text-muted">
                    Bisección de intervalos / índices de partición
                  </td>
                </tr>
                <tr>
                  <td className="font-sans-serif">Módulo (Residuo)</td>
                  <td><code>a % b</code></td>
                  <td className="fw-bold text-primary">
                    {b !== 0 ? a % b : "ZeroDivisionError"}
                  </td>
                  <td><code>&lt;class 'int'&gt;</code></td>
                  <td className="font-sans-serif text-muted">
                    Impresión de resultados cada <em>k</em> iteraciones
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* SECCIÓN 2: APLICACIÓN EN ANÁLISIS NUMÉRICO */}
      <div className="card mb-4 border-secondary shadow-sm">
        <div className="card-header bg-secondary text-white fw-bold">
          2. Discretización de Intervalos y Control con <code>range()</code>
        </div>
        <div className="card-body">
          <p className="text-secondary small mb-3">
            En métodos de integración (Trapecio, Simpson) o diferencias finitas, el número de subintervalos <code>n</code> debe ser estrictamente un <strong>entero</strong>.
          </p>

          <div className="row g-3 align-items-center mb-3">
            <div className="col-md-4">
              <label className="form-label fw-bold">Límite inferior (<code>a</code>):</label>
              <input
                type="number"
                className="form-control"
                value={limA}
                onChange={(e) => setLimA(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label fw-bold">Límite superior (<code>b</code>):</label>
              <input
                type="number"
                className="form-control"
                value={limB}
                onChange={(e) => setLimB(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label fw-bold">Subintervalos <code>n</code> (<code>int</code>):</label>
              <input
                type="number"
                min="1"
                max="20"
                className="form-control"
                value={numIntervalos}
                onChange={(e) => setNumIntervalos(e.target.value)}
              />
            </div>
          </div>

          <div className="card bg-dark text-white p-3 font-monospace rounded mb-3">
            <div className="text-muted mb-1"># Código Python generado para la discretización:</div>
            <code>n = {n} # Cantidad discreta (int)</code><br />
            <code>h = ({limB} - {limA}) / n # Tamaño de paso: {h.toFixed(4)} (float)</code><br />
            <code>x_puntos = [ {limA} + i * h for i in range(n + 1) ]</code>
          </div>

          <div className="alert alert-info py-2 mb-0 small">
            <strong>Puntos discretizados generados (índices <code>i = 0, 1, ..., {n}</code>):</strong>
            <div className="font-monospace mt-1">
              [
              {Array.from({ length: Math.min(n + 1, 12) }, (_, i) => (parseFloat(limA) + i * h).toFixed(3)).join(", ")}
              {n > 11 ? ", ..." : ""}
              ]
            </div>
          </div>
        </div>
      </div>

      {/* SECCIÓN 3: PRECISIÓN ARBITRARIA */}
      <div className="card mb-3 border-dark shadow-sm">
        <div className="card-header bg-dark text-white fw-bold">
          3. Precisión Arbitraria en Python (Sin desbordamiento de enteros)
        </div>
        <div className="card-body">
          <p className="text-secondary small mb-3">
            A diferencia de lenguajes como C o Java (y de los tipos <code>np.int32</code> / <code>np.int64</code> en NumPy), el tipo <code>int</code> en Python 3 crece dinámicamente en memoria, permitiendo calcular enteros con cientos de dígitos sin sufrir <em>overflow</em>.
          </p>

          <div className="row g-3 align-items-center mb-3">
            <div className="col-md-6">
              <label className="form-label fw-bold">Base:</label>
              <input
                type="number"
                className="form-control"
                value={baseExp}
                onChange={(e) => setBaseExp(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-bold">Exponente:</label>
              <input
                type="number"
                min="0"
                max="256"
                className="form-control"
                value={potencia}
                onChange={(e) => setPotencia(e.target.value)}
              />
            </div>
          </div>

          <div className="card bg-dark text-white p-3 font-monospace rounded">
            <div className="text-muted mb-1"># Cálculo: {expBase} ** {expP}</div>
            <div className="text-warning text-break">
              <strong>Resultado:</strong> {resPotencia}
            </div>
            <div className="text-muted mt-1 small">
              Longitud: {numDigitos} dígito(s) en memoria sin error de desbordamiento.
            </div>
          </div>
        </div>
      </div>

      {/* RECOMENDACIÓN FINAL */}
      <div className="alert alert-warning mb-0">
        <h6 className="fw-bold mb-1">💡 Regla de oro en Python para Análisis Numérico:</h6>
        <p className="mb-0 small">
          Nunca uses la división simple <code>/</code> cuando calcules índices o tamaños para <code>range()</code> o dimensiones de arreglos NumPy. Usa siempre la división entera <code>//</code> o la función <code>int()</code> para evitar errores de tipo <code>TypeError: 'float' object cannot be interpreted as an integer</code>.
        </p>
      </div>
    </div>
  );
};

export default SimuladorTab;