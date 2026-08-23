import React, { useState } from "react";
import PythonEditor from "../../../../components/PythonEditor.jsx";

const SimuladorTab = () => {
  // Configuración interactiva para la tabla de iteraciones
  const [alineacion, setAlineacion] = useState(">"); // '>' derecha | '<' izquierda | '^' centro
  const [precisionDecimal, setPrecisionDecimal] = useState("4");
  const [anchoColumna, setAnchoColumna] = useState("12");

  // Configuración para la matriz NumPy
  const [precisionMatriz, setPrecisionMatriz] = useState("4");
  const [suprimirCientifica, setSuprimirCientifica] = useState(true);

  const precNum = parseInt(precisionDecimal, 10) || 4;
  const anchoNum = parseInt(anchoColumna, 10) || 12;
  const precMatNum = parseInt(precisionMatriz, 10) || 4;

  // Código Python generado dinámicamente con los parámetros seleccionados
  const codigoPython = `# ========================================================
# SIMULADOR: ALINEACIÓN DE TABLAS Y FORMATEO DE MATRICES
# ========================================================
import numpy as np

# --------------------------------------------------------
# 1. TABLA DE ITERACIONES FORMATEADA CON f-strings
# --------------------------------------------------------
print("=== 1. TABLA DE ITERACIONES CON ALINEACIÓN (${alineacion}) ===")
# Encabezados de columnas
print(f"{'i':^4}{'Xa':${alineacion}${anchoNum}}{'Xb':${alineacion}${anchoNum}}{'Xc':${alineacion}${anchoNum}}{'Error %':${alineacion}10}")
print("-" * (4 + ${anchoNum} * 3 + 10))

# Datos de iteraciones simuladas
filas = [
    (1, 1.0, 4.0, 2.5, 25.0),
    (2, 1.0, 2.5, 1.75, 42.85714),
    (3, 1.75, 2.5, 2.125, 17.64706),
    (4, 2.125, 2.5, 2.3125, 8.10811),
    (5, 2.441406, 2.453125, 2.447265, 0.00345)
]

for i, a, b, c, err in filas:
    print(f"{i:^4}{a:${alineacion}${anchoNum}.${precNum}f}{b:${alineacion}${anchoNum}.${precNum}f}{c:${alineacion}${anchoNum}.${precNum}f}{err:${alineacion}10.${precNum}f}%")

# --------------------------------------------------------
# 2. FORMATEO DE MATRICES EN NUMPY CON set_printoptions
# --------------------------------------------------------
print("\\n=== 2. MATRIZ FORMATEADA CON np.set_printoptions ===")

# Ajuste de opciones de impresión de NumPy
np.set_printoptions(
    precision=${precMatNum},
    suppress=${suprimirCientifica ? "True" : "False"},
    floatmode='fixed',
    linewidth=120
)

# Matriz de coeficientes de prueba para un sistema de ecuaciones Ax = b
A = np.array([
    [10.12345678,  2.00000000, -1.55555555],
    [ 0.00000002,  8.76543210,  1.11111111],
    [ 1.33333333, -2.45678901,  9.87654321]
])

print("Matriz A (precision=${precMatNum}, suppress=${suprimirCientifica ? "True" : "False"}):")
print(A)`;

  return (
    <div className="p-3 border rounded bg-light">
      <h5 className="text-primary fw-bold mb-2">
        <i className="bi bi-terminal me-2"></i>Simulador: Alineación de Tablas y Formato de Matrices
      </h5>
      <p className="text-muted small mb-3">
        Ajusta los comodines de alineación (<code>&lt;</code>, <code>&gt;</code>, <code>^</code>), el ancho de columna y la precisión en <code>np.set_printoptions</code> para ver cómo se estructuran las salidas en consola.
      </p>

      {/* PANEL DE CONTROL DE PARÁMETROS */}
      <div className="card mb-3 shadow-sm border-primary">
        <div className="card-header bg-primary text-white fw-bold small">
          <i className="bi bi-sliders me-2"></i>Configuración de Alineación y Formato
        </div>
        <div className="card-body bg-white">
          <div className="row g-3">
            {/* Alineación de tabla */}
            <div className="col-md-4 col-12">
              <label className="form-label small fw-bold text-dark mb-1">
                Alineación de Columnas (Comodín):
              </label>
              <div className="btn-group w-100" role="group">
                <button
                  type="button"
                  className={`btn btn-sm ${alineacion === ">" ? "btn-primary fw-bold" : "btn-outline-primary"}`}
                  onClick={() => setAlineacion(">")}
                  title="Alineación a la derecha (estándar para decimales)"
                >
                  &gt; Derecha
                </button>
                <button
                  type="button"
                  className={`btn btn-sm ${alineacion === "<" ? "btn-primary fw-bold" : "btn-outline-primary"}`}
                  onClick={() => setAlineacion("<")}
                  title="Alineación a la izquierda"
                >
                  &lt; Izquierda
                </button>
                <button
                  type="button"
                  className={`btn btn-sm ${alineacion === "^" ? "btn-primary fw-bold" : "btn-outline-primary"}`}
                  onClick={() => setAlineacion("^")}
                  title="Alineación al centro"
                >
                  ^ Centro
                </button>
              </div>
            </div>

            {/* Decimales en tabla */}
            <div className="col-md-4 col-6">
              <label className="form-label small fw-bold text-dark mb-1">
                Decimales en Tabla (<code>.Nf</code>):
              </label>
              <select
                className="form-select form-select-sm font-monospace"
                value={precisionDecimal}
                onChange={(e) => setPrecisionDecimal(e.target.value)}
              >
                <option value="2">2 decimales (.2f)</option>
                <option value="4">4 decimales (.4f)</option>
                <option value="6">6 decimales (.6f)</option>
              </select>
            </div>

            {/* Precisión en Matrices NumPy */}
            <div className="col-md-4 col-6">
              <label className="form-label small fw-bold text-dark mb-1">
                Precisión en Matrices (<code>np.set_printoptions</code>):
              </label>
              <select
                className="form-select form-select-sm font-monospace"
                value={precisionMatriz}
                onChange={(e) => setPrecisionMatriz(e.target.value)}
              >
                <option value="2">precision = 2</option>
                <option value="4">precision = 4</option>
                <option value="6">precision = 6</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* EDITOR PYTHON CON SALIDA FORMATEADA */}
      <PythonEditor 
        codigoInicial={codigoPython} 
        lineasVisibles={21} 
      />
    </div>
  );
};

export default SimuladorTab;