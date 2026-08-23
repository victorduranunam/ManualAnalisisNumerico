import React, { useState } from "react";
import PythonEditor from "../../../../components/PythonEditor.jsx";

const SimuladorTab = () => {
  const [valorPrueba, setValorPrueba] = useState("2.0");

  const xNum = parseFloat(valorPrueba) || 2.0;

  // Código interactivo centrado 100% en la sintaxis de importación y tipos devueltos
  const codigoImportacion = `# ========================================================
# SUBTEMA 3.5: IMPORTACIÓN DE BIBLIOTECAS (math VS. numpy)
# ========================================================

# 1. FORMA 1: Importación de funciones específicas (math)
from math import sqrt, cos, pi

# 2. FORMA 2: Importación de biblioteca completa con alias (numpy)
import numpy as np

# Valor numérico a evaluar
x = ${xNum}

print("--- 1. LLAMADA A FUNCIONES IMPORTADAS DE math ---")
# Se invocan directamente por su nombre (sin prefijo)
raiz_math = sqrt(x)
cos_math = cos(x)
print("sqrt(x) con math  :", raiz_math, "-> Tipo:", type(raiz_math))
print("cos(x) con math   :", cos_math, "-> Tipo:", type(cos_math))
print("Constante pi math :", pi)

print("\\n--- 2. LLAMADA A FUNCIONES DE numpy (CON ALIAS np) ---")
# Se invocan anteponiendo el alias 'np.'
raiz_np = np.sqrt(x)
cos_np = np.cos(x)
print("np.sqrt(x) con numpy :", raiz_np, "-> Tipo:", type(raiz_np))
print("np.cos(x) con numpy  :", cos_np, "-> Tipo:", type(cos_np))
print("Constante pi numpy   :", np.pi)

print("\\n--- 3. DIFERENCIA: OPERACIONES VECTORIALES EN numpy ---")
# numpy permite evaluar arreglos de múltiples números a la vez
arreglo = np.array([1.0, 4.0, 9.0, 16.0])
raices_arreglo = np.sqrt(arreglo)
print("Arreglo original     :", arreglo)
print("np.sqrt(arreglo)     :", raices_arreglo)
print("Tipo del arreglo     :", type(raices_arreglo))`;

  return (
    <div className="p-3 border rounded bg-light">
      <h5 className="text-primary fw-bold mb-2">
        <i className="bi bi-terminal me-2"></i>Simulador: Sintaxis de Importación (<code>math</code> vs. <code>numpy</code>)
      </h5>
      <p className="text-muted small mb-3">
        Compara la diferencia entre invocar funciones importadas de manera específica (<code>from math import ...</code>) y funciones importadas mediante un alias (<code>import numpy as np</code>).
      </p>

      {/* CAMPO DE ENTRADA NUMÉRICA */}
      <div className="card mb-3 shadow-sm border-primary">
        <div className="card-header bg-primary text-white fw-bold small">
          <i className="bi bi-sliders me-2"></i>Valor de Prueba: <code>x</code>
        </div>
        <div className="card-body bg-white">
          <div className="row g-3 align-items-center">
            <div className="col-md-6 col-12">
              <label className="form-label small fw-bold text-dark mb-1">
                Número a evaluar (x):
              </label>
              <input
                type="number"
                step="any"
                className="form-control font-monospace border-primary"
                value={valorPrueba}
                onChange={(e) => setValorPrueba(e.target.value)}
                placeholder="Ej. 2.0, 4.0, 0.5"
              />
            </div>
            <div className="col-md-6 col-12">
              <div className="p-2 border rounded bg-light small">
                <span className="text-muted d-block">Funciones a comparar en el script:</span>
                <code>sqrt({valorPrueba || "2.0"})</code> frente a <code>np.sqrt({valorPrueba || "2.0"})</code>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CUADROS COMPARATIVOS DE SINTAXIS */}
      <div className="row g-3 mb-3">
        {/* math */}
        <div className="col-md-6 col-12">
          <div className="card h-100 shadow-sm border-info">
            <div className="card-header bg-info-subtle text-dark fw-bold small">
              <i className="bi bi-file-code me-1 text-info"></i>1. Importación Específica (<code>math</code>)
            </div>
            <div className="card-body small bg-white">
              <div className="font-monospace text-muted mb-2">
                from math import sqrt, cos, pi
              </div>
              <ul className="text-secondary ps-3 mb-0">
                <li><strong>Invocación:</strong> Directa por su nombre: <code>sqrt(x)</code>, <code>cos(x)</code>.</li>
                <li><strong>Tipo devuelto:</strong> <code>&lt;class &apos;float&apos;&gt;</code> (flotante estándar de Python).</li>
                <li><strong>Uso principal:</strong> Operaciones sobre un solo número escalar.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* numpy */}
        <div className="col-md-6 col-12">
          <div className="card h-100 shadow-sm border-success">
            <div className="card-header bg-success-subtle text-success fw-bold small">
              <i className="bi bi-boxes me-1"></i>2. Importación con Alias (<code>numpy</code>)
            </div>
            <div className="card-body small bg-white">
              <div className="font-monospace text-muted mb-2">
                import numpy as np
              </div>
              <ul className="text-secondary ps-3 mb-0">
                <li><strong>Invocación:</strong> Anteponiendo el alias: <code>np.sqrt(x)</code>, <code>np.cos(x)</code>.</li>
                <li><strong>Tipo devuelto:</strong> <code>&lt;class &apos;numpy.float64&apos;&gt;</code> o <code>&lt;class &apos;numpy.ndarray&apos;&gt;</code>.</li>
                <li><strong>Uso principal:</strong> Cálculo con arreglos y matrices en Análisis Numérico.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* EDITOR INTERACTIVO */}
      <PythonEditor 
        codigoInicial={codigoImportacion} 
        lineasVisibles={19} 
      />

      <div className="alert alert-info py-2 small mt-3 mb-0">
        <i className="bi bi-info-circle-fill me-2 text-info"></i>
        <strong>Resumen de sintaxis:</strong> Cuando importas con <code>from modulo import funcion</code> se usa directamente <code>funcion()</code>; cuando importas con <code>import modulo as alias</code> se debe anteponer el prefijo <code>alias.funcion()</code>.
      </div>
    </div>
  );
};

export default SimuladorTab;