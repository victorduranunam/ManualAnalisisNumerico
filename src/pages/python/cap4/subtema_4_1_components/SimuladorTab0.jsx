import React, { useState, useMemo } from "react";

const SimuladorTab = () => {
  // Estado de navegación interna del simulador
  const [activeSection, setActiveSection] = useState("basicos");

  // =========================================================================
  // ESTADOS - SECCIÓN 1: TIPOS BÁSICOS Y CASTING
  // =========================================================================
  const [basicInput, setBasicInput] = useState("3.141592");
  const [selectedPreset, setSelectedPreset] = useState("float");

  const presetsBasicos = {
    int: { valor: "42", desc: "Número entero (int)" },
    float: { valor: "3.141592", desc: "Número real / flotante (float)" },
    complex: { valor: "3 + 4j", desc: "Número complejo (complex)" },
    str: { valor: "Analisis Numerico", desc: "Cadena de texto (str)" },
    bool: { valor: "True", desc: "Valor booleano (bool)" },
  };

  const aplicarPresetBasico = (tipo) => {
    setSelectedPreset(tipo);
    setBasicInput(presetsBasicos[tipo].valor);
  };

  // Análisis del tipo básico ingresado
  const analisisBasico = useMemo(() => {
    const raw = basicInput.trim();
    if (!raw) return { tipo: "NoneType", valorPy: "None", mutable: false, casting: {} };

    let tipoDetectado = "str";
    let valorInterpretado = raw;

    // Detección de booleanos
    if (raw === "True" || raw === "False") {
      tipoDetectado = "bool";
    }
    // Detección de enteros
    else if (/^-?\d+$/.test(raw)) {
      tipoDetectado = "int";
    }
    // Detección de flotantes (incluyendo notación científica)
    else if (/^-?\d*\.\d+([eE][-+]?\d+)?$/.test(raw) || /^-?\d+[eE][-+]?\d+$/.test(raw)) {
      tipoDetectado = "float";
    }
    // Detección de complejos (ej. 3+4j, -2j, 1.5-2.3j)
    else if (/^[-+]?(\d+(\.\d*)?([eE][-+]?\d+)?)?[-+]?(\d+(\.\d*)?([eE][-+]?\d+)?)?[jJ]$/.test(raw.replace(/\s+/g, ''))) {
      tipoDetectado = "complex";
    }

    // Evaluación de conversiones seguras
    let castInt = "Error (ValueError)";
    let castFloat = "Error (ValueError)";
    let castBool = raw === "False" || raw === "0" || raw === "" ? "False" : "True";
    let castStr = `"${raw}"`;
    let castComplex = "Error (ValueError)";

    if (tipoDetectado === "int") {
      const n = parseInt(raw, 10);
      castInt = String(n);
      castFloat = n.toFixed(1);
      castComplex = `(${n}+0j)`;
    } else if (tipoDetectado === "float") {
      const f = parseFloat(raw);
      castInt = String(Math.trunc(f)) + " (trunca decimales)";
      castFloat = String(f);
      castComplex = `(${f}+0j)`;
    } else if (tipoDetectado === "bool") {
      castInt = raw === "True" ? "1" : "0";
      castFloat = raw === "True" ? "1.0" : "0.0";
      castComplex = raw === "True" ? "(1+0j)" : "(0+0j)";
    }

    return {
      tipo: tipoDetectado,
      valorPy: raw,
      castInt,
      castFloat,
      castBool,
      castStr,
      castComplex
    };
  }, [basicInput]);

  // =========================================================================
  // ESTADOS - SECCIÓN 2: ESTRUCTURAS Y NUMPY (NDARRAY)
  // =========================================================================
  const [estructuraTipo, setEstructuraTipo] = useState("vector");
  const [tamanoVector, setTamanoVector] = useState(4);
  const [filasMatriz, setFilasMatriz] = useState(3);
  const [columnasMatriz, setColumnasMatriz] = useState(3);
  const [tipoDatoNumPy, setTipoDatoNumPy] = useState("float64");

  // Generación dinámica de la estructura seleccionada
  const estructuraDatos = useMemo(() => {
    if (estructuraTipo === "lista") {
      return {
        tipo: "list (Lista estándar de Python)",
        mutabilidad: "Mutable (se puede modificar in-place)",
        codigo: `datos = [10, 20.5, "texto", True]\ndatos.append(99)`,
        descripcion: "Almacena elementos de tipos heterogéneos. Menor eficiencia en cálculos numéricos masivos.",
        representacion: "[10, 20.5, 'texto', True, 99]"
      };
    }
    if (estructuraTipo === "tupla") {
      return {
        tipo: "tuple (Tupla)",
        mutabilidad: "Inmutable (no permite modificación tras su creación)",
        codigo: `dimensiones = (1920, 1080)\n# dimensiones[0] = 1280  <- Genera TypeError`,
        descripcion: "Estructura fija y protegida contra modificaciones accidentales.",
        representacion: "(1920, 1080)"
      };
    }
    if (estructuraTipo === "diccionario") {
      return {
        tipo: "dict (Diccionario clave-valor)",
        mutabilidad: "Mutable (acceso por claves)",
        codigo: `param = {\n    "tolerancia": 1e-6,\n    "max_iter": 100,\n    "metodo": "Newton-Raphson"\n}`,
        descripcion: "Ideal para configurar parámetros de métodos numéricos organizados por nombre.",
        representacion: '{"tolerancia": 0.000001, "max_iter": 100, "metodo": "Newton-Raphson"}'
      };
    }
    if (estructuraTipo === "vector") {
      const elems = Array.from({ length: tamanoVector }, (_, i) =>
        tipoDatoNumPy.startsWith("float") ? ((i + 1) * 1.5).toFixed(2) : (i + 1) * 2
      );
      return {
        tipo: "numpy.ndarray (Vector 1D)",
        mutabilidad: "Mutable (homogéneo en memoria contigua)",
        ndim: 1,
        shape: `(${tamanoVector},)`,
        dtype: tipoDatoNumPy,
        codigo: `import numpy as np\nv = np.array([${elems.join(", ")}], dtype=np.${tipoDatoNumPy})\n# Operación vectorizada directa:\nresultado = v * 2.0`,
        descripcion: "Arreglo unidimensional optimizado para álgebra lineal y evaluación de métodos numéricos.",
        elementos: elems
      };
    }
    if (estructuraTipo === "matriz") {
      const grid = [];
      for (let r = 0; r < filasMatriz; r++) {
        const fila = [];
        for (let c = 0; c < columnasMatriz; c++) {
          const val = r === c ? (r + 1) * 4 : r + c + 1;
          fila.push(tipoDatoNumPy.startsWith("float") ? Number(val).toFixed(1) : val);
        }
        grid.push(fila);
      }
      return {
        tipo: "numpy.ndarray (Matriz 2D)",
        mutabilidad: "Mutable (bloque contiguo de memoria)",
        ndim: 2,
        shape: `(${filasMatriz}, ${columnasMatriz})`,
        dtype: tipoDatoNumPy,
        codigo: `import numpy as np\nA = np.array([\n${grid.map(f => `    [${f.join(", ")}]`).join(",\n")}\n], dtype=np.${tipoDatoNumPy})\n\n# Acceso a celda: A[0, 1]\n# Renglón 0: A[0, :]`,
        descripcion: "Estructura bidimensional para representar sistemas lineales Ax = b y transformaciones matriciales.",
        matriz: grid
      };
    }
    return {};
  }, [estructuraTipo, tamanoVector, filasMatriz, columnasMatriz, tipoDatoNumPy]);

  // =========================================================================
  // ESTADOS - SECCIÓN 3: SECUENCIAS NUMÉRICAS (ARANGE VS LINSPACE)
  // =========================================================================
  const [seqMetodo, setSeqMetodo] = useState("linspace");
  const [seqInicio, setSeqInicio] = useState(0);
  const [seqFin, setSeqFin] = useState(10);
  const [seqPaso, setSeqPaso] = useState(2);
  const [seqNumPuntos, setSeqNumPuntos] = useState(5);

  const resultadoSecuencia = useMemo(() => {
    const start = parseFloat(seqInicio) || 0;
    const stop = parseFloat(seqFin) || 0;

    if (seqMetodo === "arange") {
      const step = parseFloat(seqPaso);
      if (isNaN(step) || step <= 0) {
        return { error: "El paso debe ser un número positivo estrictamente mayor a 0.", valores: [] };
      }
      if (start >= stop) {
        return { error: "Para np.arange con paso positivo, el valor inicial debe ser menor al final.", valores: [] };
      }

      const arr = [];
      for (let v = start; v < stop - 1e-12; v += step) {
        if (arr.length > 100) break; // Límite de seguridad para visualización
        arr.push(Number(v.toFixed(4)));
      }

      return {
        metodo: "np.arange(start, stop, step)",
        formula: `Intervalo semiabierto [${start}, ${stop}) con incremento Δx = ${step}`,
        codigoPy: `import numpy as np\nx = np.arange(${start}, ${stop}, ${step})\nprint(x)\n# Salida: array(${JSON.stringify(arr)})`,
        valores: arr,
        total: arr.length,
        nota: "El valor final ('stop') NO se incluye en el arreglo resultante."
      };
    } else {
      const num = parseInt(seqNumPuntos, 10);
      if (isNaN(num) || num < 2) {
        return { error: "El número de puntos ('num') debe ser un entero mayor o igual a 2.", valores: [] };
      }

      const arr = [];
      const delta = (stop - start) / (num - 1);
      for (let i = 0; i < num; i++) {
        arr.push(Number((start + i * delta).toFixed(4)));
      }

      return {
        metodo: "np.linspace(start, stop, num)",
        formula: `Intervalo cerrado [${start}, ${stop}] con Δx = (${stop} - ${start}) / (${num} - 1) = ${delta.toFixed(4)}`,
        codigoPy: `import numpy as np\nx = np.linspace(${start}, ${stop}, ${num})\nprint(x)\n# Salida: array(${JSON.stringify(arr)})`,
        valores: arr,
        total: arr.length,
        delta: delta.toFixed(4),
        nota: "El valor final ('stop') SÍ se incluye de manera exacta."
      };
    }
  }, [seqMetodo, seqInicio, seqFin, seqPaso, seqNumPuntos]);

  return (
    <div className="p-4 border rounded bg-light shadow-sm">
      {/* Encabezado Principal */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 pb-2 border-bottom">
        <div>
          <h4 className="text-primary fw-bold mb-1">
            Simulador Interactivo: Tipos de Datos y Estructuras en Python
          </h4>
          <p className="text-muted mb-0 small">
            Experimenta en tiempo real con la inspección de tipos, conversión (casting), arreglos de NumPy y secuencias de discretización.
          </p>
        </div>
        <span className="badge bg-primary px-3 py-2 fs-6">Capítulo 4.1</span>
      </div>

      {/* Selector de Sección */}
      <ul className="nav nav-pills nav-fill mb-4 bg-white p-2 rounded shadow-sm border">
        <li className="nav-item">
          <button
            type="button"
            className={`nav-link fw-semibold ${activeSection === "basicos" ? "active" : ""}`}
            onClick={() => setActiveSection("basicos")}
          >
            1. Tipos Básicos & Casting
          </button>
        </li>
        <li className="nav-item">
          <button
            type="button"
            className={`nav-link fw-semibold ${activeSection === "estructuras" ? "active" : ""}`}
            onClick={() => setActiveSection("estructuras")}
          >
            2. Estructuras & NumPy (ndarray)
          </button>
        </li>
        <li className="nav-item">
          <button
            type="button"
            className={`nav-link fw-semibold ${activeSection === "secuencias" ? "active" : ""}`}
            onClick={() => setActiveSection("secuencias")}
          >
            3. Secuencias (arange vs linspace)
          </button>
        </li>
      </ul>

      {/* =================================================================== */}
      {/* SECCIÓN 1: TIPOS BÁSICOS Y CONVERSIÓN (CASTING)                     */}
      {/* =================================================================== */}
      {activeSection === "basicos" && (
        <div>
          <div className="row g-3 mb-3">
            {/* Panel de Entrada y Presets */}
            <div className="col-lg-5">
              <div className="card h-100 border-0 bg-white shadow-sm">
                <div className="card-body">
                  <h6 className="fw-bold text-dark mb-3">Entrada de Valor a Inspeccionar</h6>

                  <label className="form-label small text-muted">Ejemplos rápidos:</label>
                  <div className="d-flex flex-wrap gap-1 mb-3">
                    {Object.keys(presetsBasicos).map((key) => (
                      <button
                        key={key}
                        type="button"
                        className={`btn btn-sm ${selectedPreset === key ? "btn-primary" : "btn-outline-secondary"}`}
                        onClick={() => aplicarPresetBasico(key)}
                      >
                        {key}
                      </button>
                    ))}
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-bold">Escribe un valor o asignación:</label>
                    <input
                      type="text"
                      className="form-control font-monospace"
                      value={basicInput}
                      onChange={(e) => {
                        setBasicInput(e.target.value);
                        setSelectedPreset("");
                      }}
                      placeholder="Ej. 100, 3.14, 2+5j, True, hola"
                    />
                    <div className="form-text small">
                      Python evalúa el tipo dinámicamente según la sintaxis del literal ingresado.
                    </div>
                  </div>

                  <div className="p-3 bg-light rounded border">
                    <span className="small text-muted d-block mb-1">Equivalente en Python:</span>
                    <code className="text-dark font-monospace fw-bold">
                      x = {analisisBasico.tipo === "str" ? `"${analisisBasico.valorPy}"` : analisisBasico.valorPy}
                      <br />
                      print(type(x))  # Salida: &lt;class '{analisisBasico.tipo}'&gt;
                    </code>
                  </div>
                </div>
              </div>
            </div>

            {/* Panel de Inspección y Casting */}
            <div className="col-lg-7">
              <div className="card h-100 border-0 bg-white shadow-sm">
                <div className="card-body">
                  <h6 className="fw-bold text-dark mb-3">Diagnóstico del Tipo y Conversión (Casting)</h6>

                  <div className="d-flex align-items-center justify-content-between p-2 mb-3 bg-light rounded border">
                    <div>
                      <span className="text-muted small d-block">Tipo identificado:</span>
                      <span className="badge bg-success fs-6 font-monospace">{analisisBasico.tipo}</span>
                    </div>
                    <div className="text-end">
                      <span className="text-muted small d-block">Función de inspección:</span>
                      <code className="text-primary fw-bold">type(x) == {analisisBasico.tipo}</code>
                    </div>
                  </div>

                  <h6 className="small fw-bold text-secondary mb-2">Comportamiento en Conversión Explícita (Casting):</h6>
                  <div className="table-responsive">
                    <table className="table table-sm table-bordered align-middle mb-0">
                      <thead className="table-light small">
                        <tr>
                          <th>Conversión</th>
                          <th>Resultado</th>
                          <th>Estado</th>
                        </tr>
                      </thead>
                      <tbody className="small font-monospace">
                        <tr>
                          <td><code>int(x)</code></td>
                          <td>{analisisBasico.castInt}</td>
                          <td>
                            {analisisBasico.castInt.includes("Error") ? (
                              <span className="badge bg-danger">Incompatible</span>
                            ) : (
                              <span className="badge bg-success">Válido</span>
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td><code>float(x)</code></td>
                          <td>{analisisBasico.castFloat}</td>
                          <td>
                            {analisisBasico.castFloat.includes("Error") ? (
                              <span className="badge bg-danger">Incompatible</span>
                            ) : (
                              <span className="badge bg-success">Válido</span>
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td><code>complex(x)</code></td>
                          <td>{analisisBasico.castComplex}</td>
                          <td>
                            {analisisBasico.castComplex.includes("Error") ? (
                              <span className="badge bg-danger">Incompatible</span>
                            ) : (
                              <span className="badge bg-success">Válido</span>
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td><code>bool(x)</code></td>
                          <td>{analisisBasico.castBool}</td>
                          <td><span className="badge bg-success">Válido</span></td>
                        </tr>
                        <tr>
                          <td><code>str(x)</code></td>
                          <td>{analisisBasico.castStr}</td>
                          <td><span className="badge bg-success">Válido</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="alert alert-secondary mt-3 mb-0 py-2 small">
                    <strong>Nota para Análisis Numérico:</strong> Los cálculos matriciales e iterativos requieren valores de tipo <code>float</code> o <code>complex</code> para evitar truncamiento por división entera.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* SECCIÓN 2: ESTRUCTURAS DE DATOS Y NUMPY (NDARRAY)                   */}
      {/* =================================================================== */}
      {activeSection === "estructuras" && (
        <div>
          <div className="row g-3 mb-3">
            {/* Configuración de Estructuras */}
            <div className="col-lg-4">
              <div className="card h-100 border-0 bg-white shadow-sm">
                <div className="card-body">
                  <h6 className="fw-bold text-dark mb-3">Selecciona una Estructura</h6>

                  <div className="mb-3">
                    <label className="form-label small text-muted">Tipo de estructura:</label>
                    <select
                      className="form-select form-select-sm"
                      value={estructuraTipo}
                      onChange={(e) => setEstructuraTipo(e.target.value)}
                    >
                      <option value="vector">NumPy: Vector 1D (ndarray)</option>
                      <option value="matriz">NumPy: Matriz 2D (ndarray)</option>
                      <option value="lista">Python: Lista (list)</option>
                      <option value="tupla">Python: Tupla (tuple)</option>
                      <option value="diccionario">Python: Diccionario (dict)</option>
                    </select>
                  </div>

                  {estructuraTipo === "vector" && (
                    <div className="p-3 bg-light rounded border mb-3">
                      <label className="form-label small fw-bold">Longitud del Vector: {tamanoVector}</label>
                      <input
                        type="range"
                        className="form-range"
                        min="2"
                        max="8"
                        value={tamanoVector}
                        onChange={(e) => setTamanoVector(parseInt(e.target.value, 10))}
                      />

                      <label className="form-label small fw-bold mt-2">Tipo de dato (dtype):</label>
                      <select
                        className="form-select form-select-sm"
                        value={tipoDatoNumPy}
                        onChange={(e) => setTipoDatoNumPy(e.target.value)}
                      >
                        <option value="float64">float64 (Doble precisión estándar)</option>
                        <option value="float32">float32 (Simple precisión)</option>
                        <option value="int32">int32 (Entero con signo)</option>
                      </select>
                    </div>
                  )}

                  {estructuraTipo === "matriz" && (
                    <div className="p-3 bg-light rounded border mb-3">
                      <div className="row g-2 mb-2">
                        <div className="col-6">
                          <label className="form-label small fw-bold">Filas: {filasMatriz}</label>
                          <input
                            type="range"
                            className="form-range"
                            min="2"
                            max="5"
                            value={filasMatriz}
                            onChange={(e) => setFilasMatriz(parseInt(e.target.value, 10))}
                          />
                        </div>
                        <div className="col-6">
                          <label className="form-label small fw-bold">Columnas: {columnasMatriz}</label>
                          <input
                            type="range"
                            className="form-range"
                            min="2"
                            max="5"
                            value={columnasMatriz}
                            onChange={(e) => setColumnasMatriz(parseInt(e.target.value, 10))}
                          />
                        </div>
                      </div>

                      <label className="form-label small fw-bold">Tipo de dato (dtype):</label>
                      <select
                        className="form-select form-select-sm"
                        value={tipoDatoNumPy}
                        onChange={(e) => setTipoDatoNumPy(e.target.value)}
                      >
                        <option value="float64">float64 (Estándar en métodos lineales)</option>
                        <option value="float32">float32</option>
                        <option value="int32">int32</option>
                      </select>
                    </div>
                  )}

                  <div className="small text-muted">
                    <strong>Propósito didáctico:</strong> Comprueba cómo NumPy organiza los datos en memoria continua para aplicar métodos algebraicos directos e iterativos.
                  </div>
                </div>
              </div>
            </div>

            {/* Representación Visual y Propiedades */}
            <div className="col-lg-8">
              <div className="card h-100 border-0 bg-white shadow-sm">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h6 className="fw-bold text-dark mb-0">{estructuraDatos.tipo}</h6>
                    <span className="badge bg-info text-dark">{estructuraDatos.mutabilidad}</span>
                  </div>

                  <p className="text-muted small">{estructuraDatos.descripcion}</p>

                  {/* Metadatos de NumPy si aplica */}
                  {(estructuraTipo === "vector" || estructuraTipo === "matriz") && (
                    <div className="row g-2 mb-3">
                      <div className="col-md-4">
                        <div className="p-2 border rounded text-center bg-light">
                          <span className="text-muted small d-block">Dimensión (ndim)</span>
                          <strong className="text-primary font-monospace">{estructuraDatos.ndim}D</strong>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="p-2 border rounded text-center bg-light">
                          <span className="text-muted small d-block">Forma (shape)</span>
                          <strong className="text-primary font-monospace">{estructuraDatos.shape}</strong>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="p-2 border rounded text-center bg-light">
                          <span className="text-muted small d-block">Tipo Interno (dtype)</span>
                          <strong className="text-primary font-monospace">{estructuraDatos.dtype}</strong>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Visualización gráfica de la matriz o vector */}
                  {estructuraTipo === "vector" && (
                    <div className="mb-3">
                      <label className="form-label small fw-bold">Disposición en memoria del Vector:</label>
                      <div className="d-flex flex-wrap gap-2 p-2 bg-light rounded border">
                        {estructuraDatos.elementos.map((val, idx) => (
                          <div key={idx} className="text-center p-2 bg-white rounded border shadow-sm" style={{ minWidth: "60px" }}>
                            <div className="small text-muted" style={{ fontSize: "0.75rem" }}>[{idx}]</div>
                            <div className="fw-bold text-primary font-monospace">{val}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {estructuraTipo === "matriz" && (
                    <div className="mb-3">
                      <label className="form-label small fw-bold">Disposición bidimensional de la Matriz (Filas x Columnas):</label>
                      <div className="p-3 bg-light rounded border table-responsive">
                        <table className="table table-sm table-bordered text-center align-middle bg-white mb-0">
                          <tbody>
                            {estructuraDatos.matriz.map((fila, rIdx) => (
                              <tr key={rIdx}>
                                <th className="table-light text-muted small" style={{ width: "40px" }}>F{rIdx}</th>
                                {fila.map((val, cIdx) => (
                                  <td key={cIdx} className="font-monospace fw-bold text-primary p-2">
                                    <div style={{ fontSize: "0.7rem", color: "#888" }}>[{rIdx},{cIdx}]</div>
                                    {val}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Código en Python */}
                  <label className="form-label small fw-bold">Código en Python:</label>
                  <pre className="p-3 bg-dark text-white rounded small font-monospace mb-0 overflow-auto">
                    <code>{estructuraDatos.codigo}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* SECCIÓN 3: SECUENCIAS NUMÉRICAS (ARANGE VS LINSPACE)                */}
      {/* =================================================================== */}
      {activeSection === "secuencias" && (
        <div>
          <div className="row g-3 mb-3">
            {/* Controles de la Secuencia */}
            <div className="col-lg-4">
              <div className="card h-100 border-0 bg-white shadow-sm">
                <div className="card-body">
                  <h6 className="fw-bold text-dark mb-3">Configurar Generador</h6>

                  <div className="mb-3">
                    <label className="form-label small text-muted">Función generadora:</label>
                    <div className="btn-group w-100" role="group">
                      <button
                        type="button"
                        className={`btn btn-sm ${seqMetodo === "linspace" ? "btn-primary" : "btn-outline-primary"}`}
                        onClick={() => setSeqMetodo("linspace")}
                      >
                        np.linspace()
                      </button>
                      <button
                        type="button"
                        className={`btn btn-sm ${seqMetodo === "arange" ? "btn-primary" : "btn-outline-primary"}`}
                        onClick={() => setSeqMetodo("arange")}
                      >
                        np.arange()
                      </button>
                    </div>
                  </div>

                  <div className="row g-2 mb-3">
                    <div className="col-6">
                      <label className="form-label small fw-bold">Inicio (start):</label>
                      <input
                        type="number"
                        className="form-control form-control-sm font-monospace"
                        value={seqInicio}
                        onChange={(e) => setSeqInicio(parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    <div className="col-6">
                      <label className="form-label small fw-bold">Fin (stop):</label>
                      <input
                        type="number"
                        className="form-control form-control-sm font-monospace"
                        value={seqFin}
                        onChange={(e) => setSeqFin(parseFloat(e.target.value) || 0)}
                      />
                    </div>
                  </div>

                  {seqMetodo === "arange" ? (
                    <div className="mb-3">
                      <label className="form-label small fw-bold">Paso / Incremento (step):</label>
                      <input
                        type="number"
                        step="0.1"
                        min="0.1"
                        className="form-control form-control-sm font-monospace"
                        value={seqPaso}
                        onChange={(e) => setSeqPaso(parseFloat(e.target.value) || 0.1)}
                      />
                      <div className="form-text small">
                        Genera valores mientras <code>valor &lt; stop</code>.
                      </div>
                    </div>
                  ) : (
                    <div className="mb-3">
                      <label className="form-label small fw-bold">Número de puntos (num):</label>
                      <input
                        type="number"
                        min="2"
                        max="20"
                        className="form-control form-control-sm font-monospace"
                        value={seqNumPuntos}
                        onChange={(e) => setSeqNumPuntos(parseInt(e.target.value, 10) || 2)}
                      />
                      <div className="form-text small">
                        Calcula automáticamente el incremento constante entre nodos.
                      </div>
                    </div>
                  )}

                  <div className="p-3 bg-light rounded border small">
                    <strong>Criterio de Selección:</strong>
                    <ul className="ps-3 mb-0 mt-1">
                      <li>Usa <code>linspace</code> cuando conozcas la <strong>cantidad exacta de nodos</strong> (ej. 100 puntos para graficar).</li>
                      <li>Usa <code>arange</code> cuando conozcas el <strong>tamaño de paso exacto</strong> ($\Delta x$).</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Resultado de la Discretización */}
            <div className="col-lg-8">
              <div className="card h-100 border-0 bg-white shadow-sm">
                <div className="card-body">
                  <h6 className="fw-bold text-dark mb-2">Malla Discretizada de Puntos</h6>

                  {resultadoSecuencia.error ? (
                    <div className="alert alert-danger">{resultadoSecuencia.error}</div>
                  ) : (
                    <>
                      <div className="p-3 bg-light rounded border mb-3">
                        <div className="d-flex justify-content-between align-items-center mb-1">
                          <strong className="text-primary font-monospace">{resultadoSecuencia.metodo}</strong>
                          <span className="badge bg-secondary">{resultadoSecuencia.total} puntos generados</span>
                        </div>
                        <div className="text-muted small mb-2">{resultadoSecuencia.formula}</div>
                        <div className="small text-info-emphasis">💡 {resultadoSecuencia.nota}</div>
                      </div>

                      <label className="form-label small fw-bold">Puntos calculados en el intervalo:</label>
                      <div className="d-flex flex-wrap gap-2 p-3 bg-white rounded border mb-3" style={{ maxHeight: "180px", overflowY: "auto" }}>
                        {resultadoSecuencia.valores.map((pt, idx) => (
                          <div key={idx} className="badge bg-light text-dark border font-monospace p-2">
                            <span className="text-muted me-1">x[{idx}]:</span>
                            <span className="text-primary fw-bold">{pt}</span>
                          </div>
                        ))}
                      </div>

                      <label className="form-label small fw-bold">Código en Python:</label>
                      <pre className="p-3 bg-dark text-white rounded small font-monospace mb-0 overflow-auto">
                        <code>{resultadoSecuencia.codigoPy}</code>
                      </pre>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pie descriptivo institucional */}
      <div className="text-end text-muted small pt-2 border-top">
        Manual Interactivo de Análisis Numérico — UNAM FI
      </div>
    </div>
  );
};

export default SimuladorTab;