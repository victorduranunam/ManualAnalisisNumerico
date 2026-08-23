import React, { useState } from "react";
import PythonEditor from "../../../../components/PythonEditor.jsx";

const SimuladorTab = () => {
  const [anguloGrados, setAnguloGrados] = useState("45");

  const anguloNum = parseFloat(anguloGrados) || 0;
  const radianesAnalitico = (anguloNum * Math.PI) / 180;
  const senoCorrecto = Math.sin(radianesAnalitico);
  const cosenoCorrecto = Math.cos(radianesAnalitico);

  // Evaluación incorrecta sin convertir
  const senoErroneo = Math.sin(anguloNum);

  // Script interactivo de Python para el editor
  const codigoPython = `# ========================================================
# SUBTEMA 3.6: CONVERSIÓN DE GRADOS A RADIANES
# ========================================================
import numpy as np
import math

# 1. Ángulo ingresado en grados
angulo_grados = ${anguloNum}

# 2. Conversión mediante las diferentes opciones
rad_analitico = angulo_grados * np.pi / 180
rad_numpy     = np.radians(angulo_grados)
rad_math      = math.radians(angulo_grados)

print("--- 1. RESULTADOS DE LA CONVERSIÓN ---")
print("Fórmula analítica (angulo * pi / 180) :", rad_analitico, "rad")
print("Función de NumPy (np.radians)         :", rad_numpy, "rad")
print("Función de Math (math.radians)        :", rad_math, "rad")

print("\\n--- 2. EVALUACIÓN TRIGONOMÉTRICA CORRECTA ---")
seno = np.sin(rad_numpy)
coseno = np.cos(rad_numpy)
print(f"sen({angulo_grados}°) =", seno)
print(f"cos({angulo_grados}°) =", coseno)

print("\\n--- 3. PELIGRO: EVALUACIÓN SIN CONVERTIR ---")
seno_mal = np.sin(angulo_grados)
print(f"np.sin({angulo_grados}) sin convertir =", seno_mal, " (¡INCORRECTO!)")`;

  return (
    <div className="p-3 border rounded bg-light">
      <h5 className="text-primary fw-bold mb-2">
        <i className="bi bi-arrow-repeat me-2"></i>Simulador: Conversión Angular (Grados &harr; Radianes)
      </h5>
      <p className="text-muted small mb-3">
        Introduce un ángulo en grados sexagesimales o selecciona un botón rápido para verificar en tiempo real su conversión analítica, las funciones de biblioteca y la evaluación trigonométrica.
      </p>

      {/* PANEL DE CONTROL INTERACTIVO */}
      <div className="card mb-3 shadow-sm border-primary">
        <div className="card-header bg-primary text-white fw-bold small">
          <i className="bi bi-compass me-2"></i>Ángulo en Grados Sexagesimales (&deg;)
        </div>
        <div className="card-body bg-white">
          <div className="row g-3 align-items-center">
            <div className="col-md-6 col-12">
              <label className="form-label small fw-bold text-dark mb-1">
                Escribe un ángulo en grados:
              </label>
              <div className="input-group">
                <input
                  type="number"
                  step="any"
                  className="form-control font-monospace fw-bold border-primary"
                  value={anguloGrados}
                  onChange={(e) => setAnguloGrados(e.target.value)}
                  placeholder="Ej. 45, 30, 90"
                />
                <span className="input-group-text bg-primary text-white fw-bold">&deg;</span>
              </div>
            </div>

            {/* Botones rápidos de ángulos notables */}
            <div className="col-md-6 col-12">
              <label className="form-label small fw-bold text-secondary mb-1">
                Ángulos Notables Rápidos:
              </label>
              <div className="btn-group w-100" role="group">
                {["0", "30", "45", "60", "90", "180"].map((val) => (
                  <button
                    key={val}
                    type="button"
                    className={`btn btn-sm ${anguloGrados === val ? "btn-primary fw-bold" : "btn-outline-primary"}`}
                    onClick={() => setAnguloGrados(val)}
                  >
                    {val}&deg;
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TARJETAS RESUMEN DE RESULTADOS */}
      <div className="row g-3 mb-3 text-center font-monospace">
        {/* Radianes */}
        <div className="col-md-4 col-12">
          <div className="card h-100 shadow-sm border-primary">
            <div className="card-header bg-primary-subtle text-primary fw-bold small font-sans-serif">
              Ángulo en Radianes (&theta;)
            </div>
            <div className="card-body">
              <h5 className="text-dark mb-1">{radianesAnalitico.toFixed(6)} rad</h5>
              <small className="text-muted">({anguloNum}&deg; &times; &pi;) / 180</small>
            </div>
          </div>
        </div>

        {/* Seno Correcto */}
        <div className="col-md-4 col-12">
          <div className="card h-100 shadow-sm border-success">
            <div className="card-header bg-success-subtle text-success fw-bold small font-sans-serif">
              sen({anguloNum}&deg;) &rarr; np.sin(rad)
            </div>
            <div className="card-body">
              <h5 className="text-success fw-bold mb-1">{senoCorrecto.toFixed(6)}</h5>
              <small className="text-muted">&check; Correcto (convertido a rad)</small>
            </div>
          </div>
        </div>

        {/* Seno Incorrecto sin convertir */}
        <div className="col-md-4 col-12">
          <div className="card h-100 shadow-sm border-danger">
            <div className="card-header bg-danger-subtle text-danger fw-bold small font-sans-serif">
              np.sin({anguloNum}) [Sin convertir]
            </div>
            <div className="card-body">
              <h5 className="text-danger fw-bold mb-1">{senoErroneo.toFixed(6)}</h5>
              <small className="text-danger">&cross; Error: Evaluado en {anguloNum} rad</small>
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