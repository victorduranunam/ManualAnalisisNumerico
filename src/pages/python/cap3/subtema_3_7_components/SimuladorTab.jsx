import React, { useState } from "react";
import PythonEditor from "../../../../components/PythonEditor.jsx";

const SimuladorTab = () => {
  const [numDecimales, setNumDecimales] = useState("4");
  const [valorPrueba, setValorPrueba] = useState("0.7071067812");

  const decInt = parseInt(numDecimales, 10) || 4;
  const valNum = parseFloat(valorPrueba) || 0.7071067812;

  // Código interactivo en Python para el editor
  const codigoPython = `# ========================================================
# SUBTEMA 3.7: FORMATEO DE RESULTADOS CON print() Y f-strings
# ========================================================
import math

angulo_deg = 45
radianes = angulo_deg * math.pi / 180
valor_calculado = ${valNum}
tolerancia = 0.00015

print("--- 1. SALIDA BÁSICA CON SEPARACIÓN POR COMAS ---")
print("El ángulo", angulo_deg, "en radianes es:", radianes)

print("\\n--- 2. SALIDA FORMATEADA CON f-strings ---")
print(f"Ángulo: {angulo_deg}° -> Radianes: {radianes:.${decInt}f}")
print(f"Valor a ${decInt} decimales: {valor_calculado:.${decInt}f}")
print(f"Tolerancia en notación científica: {tolerancia:.2e}")

print("\\n--- 3. CREACIÓN DE UNA TABLA DE ITERACIONES ALINEADA ---")
print(f"{'i':<4}{'Xa':<12}{'Xb':<12}{'Xc (Raíz)':<14}{'Error %':<10}")
print("-" * 52)

# Datos de prueba simulando iteraciones
datos = [
    (1, 1.00000, 2.00000, 1.50000, 0.50000),
    (2, 1.00000, 1.50000, 1.25000, 0.20000),
    (3, 1.25000, 1.50000, 1.37500, 0.09091),
    (4, 1.37500, 1.50000, 1.41421, 0.00245)
]

for iter_num, a, b, c, err in datos:
    print(f"{iter_num:<4}{a:<12.5f}{b:<12.5f}{c:<14.5f}{err:<10.5f}%")`;

  return (
    <div className="p-3 border rounded bg-light">
      <h5 className="text-primary fw-bold mb-2">
        <i className="bi bi-terminal me-2"></i>Simulador: Formateo de Salidas y Tablas con <code>print()</code>
      </h5>
      <p className="text-muted small mb-3">
        Modifica el número de decimales y observa en tiempo real cómo se construyen salidas estructuradas, notaciones científicas y tablas alineadas para Análisis Numérico.
      </p>

      {/* CONTROLES INTERACTIVOS */}
      <div className="card mb-3 shadow-sm border-primary">
        <div className="card-header bg-primary text-white fw-bold small">
          <i className="bi bi-sliders me-2"></i>Configuración de Formato
        </div>
        <div className="card-body bg-white">
          <div className="row g-3 align-items-center">
            {/* Valor de prueba */}
            <div className="col-md-6 col-12">
              <label className="form-label small fw-bold text-dark mb-1">
                Valor numérico a mostrar:
              </label>
              <input
                type="number"
                step="any"
                className="form-control font-monospace border-primary"
                value={valorPrueba}
                onChange={(e) => setValorPrueba(e.target.value)}
                placeholder="0.7071067812"
              />
            </div>

            {/* Número de decimales */}
            <div className="col-md-6 col-12">
              <label className="form-label small fw-bold text-dark mb-1">
                Cantidad de decimales fijos (<code>{`:.${numDecimales}f`}</code>):
              </label>
              <div className="btn-group w-100" role="group">
                {["2", "4", "6", "8"].map((dec) => (
                  <button
                    key={dec}
                    type="button"
                    className={`btn btn-sm ${numDecimales === dec ? "btn-primary fw-bold" : "btn-outline-primary"}`}
                    onClick={() => setNumDecimales(dec)}
                  >
                    {dec} decimales
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TARJETAS RESUMEN DE SALIDAS */}
      <div className="row g-3 mb-3 text-center font-monospace">
        <div className="col-md-4 col-12">
          <div className="card h-100 shadow-sm border-secondary">
            <div className="card-header bg-light fw-bold small font-sans-serif text-dark">
              Sin Formato (Crudo)
            </div>
            <div className="card-body">
              <span className="text-dark small d-block">{valNum}</span>
              <small className="text-muted font-sans-serif">Muestra todos los dígitos</small>
            </div>
          </div>
        </div>

        <div className="col-md-4 col-12">
          <div className="card h-100 shadow-sm border-success">
            <div className="card-header bg-success-subtle fw-bold small font-sans-serif text-success">
              Con f-string (<code>{`:.${decInt}f`}</code>)
            </div>
            <div className="card-body">
              <h5 className="text-success fw-bold mb-1">{valNum.toFixed(decInt)}</h5>
              <small className="text-muted font-sans-serif">Redondeo exacto a {decInt} decimales</small>
            </div>
          </div>
        </div>

        <div className="col-md-4 col-12">
          <div className="card h-100 shadow-sm border-info">
            <div className="card-header bg-info-subtle fw-bold small font-sans-serif text-dark">
              Notación Científica (<code>{`:.2e`}</code>)
            </div>
            <div className="card-body">
              <h5 className="text-primary fw-bold mb-1">{valNum.toExponential(2)}</h5>
              <small className="text-muted font-sans-serif">Útil para cotas de error</small>
            </div>
          </div>
        </div>
      </div>

      {/* EDITOR PYTHON INTERACTIVO */}
      <PythonEditor 
        codigoInicial={codigoPython} 
        lineasVisibles={19} 
      />
    </div>
  );
};

export default SimuladorTab;