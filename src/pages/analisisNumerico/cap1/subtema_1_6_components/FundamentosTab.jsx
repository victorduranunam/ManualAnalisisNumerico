import React, { useState } from "react";

const ErroresFundamentosTab = () => {
  const [carreraSeleccionada, setCarreraSeleccionada] = useState("aeroespacial");

  const catalogoErrores = {
    aeroespacial: {
      nombre: "Ingeniería Aeroespacial",
      tema: "1.2 Punto Flotante: Integración de Tiempo en Odometría Inercial",
      subtema: "1.2 Representación en punto flotante / 1.4 Estabilidad",
      tipoError: "Cancelación catastrófica y pérdida de significancia",
      colorBadge: "bg-primary",
      casoReal:
        "Fallo del misil Patriot (1991) y navegación inercial satelital: acumulación del error al convertir décimas de segundo (0.1 s no representable exactamente en binario IEEE 754) en variables de 24 bits.",
      formulaImpacto: "Δt_real - Δt_float = 0.1 - (0.00011001100110011001100...)_2 ≈ 9.5367 × 10^-8 s",
      mitigacion:
        "Uso de aritmética de doble/cuádruple precisión (IEEE 754 float64), integradores simplécticos y truncamiento compensado (Algoritmo de Kahan).",
    },
    civil: {
      nombre: "Ingeniería Civil",
      tema: "1.4 Estabilidad: Matrices de Rigidez Mal Condicionadas en Estructuras",
      subtema: "1.4 Criterios de precisión y estabilidad",
      tipoError: "Inestabilidad numérica por número de condición elevado κ(K)",
      colorBadge: "bg-success",
      casoReal:
        "Análisis por Elementos Finitos (FEM) de rascacielos o puentes atirantados con elementos de rigidez desproporcionada (columnas masivas vs. losas muy delgadas).",
      formulaImpacto: "||Δu|| / ||u|| ≤ κ(K) * (||ΔF|| / ||F||), donde κ(K) = ||K|| · ||K^-1|| >> 10^8",
      mitigacion:
        "Reescalado/preacondicionamiento de matrices de rigidez global y ensamblaje con subestructuración estática.",
    },
    geomatica: {
      nombre: "Ingeniería Geomática",
      tema: "1.3 Propagación de Errores: Redes Geodésicas y Posicionamiento GNSS",
      subtema: "1.3 Clasificación y propagación de errores",
      tipoError: "Propagación de error aleatorio y sistemático en trilateración",
      colorBadge: "bg-info text-dark",
      casoReal:
        "Cálculo de coordenadas milimétricas en redes geodésicas de deformación de fallas a partir de pseudodistancias satelitales con incertidumbre en reloj y refracción troposférica.",
      formulaImpacto: "σ²_x = (∂f/∂r1)² σ²_r1 + (∂f/∂r2)² σ²_r2 + 2(∂f/∂r1)(∂f/∂r2) Cov(r1, r2)",
      mitigacion:
        "Ajuste de observaciones por el método de Mínimos Cuadrados Ponderados y análisis de elipses de error.",
    },
    ambiental: {
      nombre: "Ingeniería Ambiental",
      tema: "1.5 Polinomios de Taylor: Dispersión de Contaminantes en Ríos y Aire",
      subtema: "1.5 Aproximación por serie de Taylor",
      tipoError: "Error de truncamiento en diferencias finitas",
      colorBadge: "bg-success",
      casoReal:
        "Simulación de la ecuación de advección-difusión para plumas de contaminantes; aproximar la segunda derivada espacial ∂²C/∂x² con mallas gruesas.",
      formulaImpacto: "Error_truncamiento = (Δx² / 12) * (∂⁴C / ∂x⁴) + O(Δx⁴)",
      mitigacion:
        "Esquemas numéricos de alto orden (Runge-Kutta / esquemas compactos) y refinamiento adaptativo de malla (AMR).",
    },
    electrica: {
      nombre: "Ing. Eléctrica Electrónica",
      tema: "1.4 Convergencia: Simulación Transitoria de Circuitos No Lineales (SPICE)",
      subtema: "1.4 Estabilidad, precisión y convergencia",
      tipoError: "Inestabilidad numérica por ecuaciones diferenciales rígidas (Stiff)",
      colorBadge: "bg-warning text-dark",
      casoReal:
        "Transitorios de conmutación rápida en inversores de potencia con inductancias y capacitancias parásitas (constantes de tiempo de microsegundos acopladas a segundos).",
      formulaImpacto: "Paso de integración h > 2 / |λ_max| provoca oscilaciones espurias no físicas",
      mitigacion:
        "Métodos de integración implícitos de paso adaptativo tipo BDF (Backward Differentiation Formulas) o Gear.",
    },
    computacion: {
      nombre: "Ingeniería en Computación",
      tema: "1.2 Punto Flotante: Cancelación Catastrófica en Algoritmos de Varianza",
      subtema: "1.2 Limitaciones de punto flotante",
      tipoError: "Cancelación sustractiva de números casi iguales",
      colorBadge: "bg-dark",
      casoReal:
        "Cálculo de la varianza muestral en streaming de Big Data usando la fórmula ingenua ∑x² - (∑x)²/N cuando los datos tienen media alta y desviación estándar muy pequeña.",
      formulaImpacto: "fl(a - b) = 0 cuando |a - b| < eps * |a| (pérdida de todos los dígitos significativos)",
      mitigacion:
        "Algoritmo de un solo paso de Welford para cálculo numéricamente estable de media y varianza.",
    },
    telecomunicaciones: {
      nombre: "Ing. en Telecomunicaciones",
      tema: "1.3 Ruido y Cuantización: Modulación Digital y Procesamiento de Señales",
      subtema: "1.3 Clasificación de errores numéricos",
      tipoError: "Error de cuantización y ruido de redondeo en filtros DSP",
      colorBadge: "bg-secondary",
      casoReal:
        "Implementación de filtros digitales IIR en procesadores de punto fijo donde la cuantización de coeficientes desplaza los polos fuera del círculo unitario.",
      formulaImpacto: "SNR_cuantizacion ≈ 6.02 * B + 1.76 dB (donde B es el número de bits de la palabra)",
      mitigacion:
        "Estructuras en cascada de secciones de segundo orden (SOS) y escalamiento dinámico de punto fijo.",
    },
    geologica: {
      nombre: "Ingeniería Geológica",
      tema: "1.6 Herramientas Computacionales: Modelado de Transporte en Medios Porosos",
      subtema: "1.6 Implementación computacional / 1.4 Estabilidad",
      tipoError: "Dispersión y difusión numérica artificial",
      colorBadge: "bg-danger",
      casoReal:
        "Modelado de flujo subterráneo en acuíferos fracturados; el desacoplamiento espacial produce frentes de saturación artificialmente suavizados.",
      formulaImpacto: "Difusión_numérica = (u * Δx / 2) * (1 - Cr), con número de Courant Cr = u*Δt/Δx",
      mitigacion:
        "Control del número de Courant-Friedrichs-Lewy (CFL ≤ 1) y métodos de elementos de contorno o volúmenes finitos con limitadores de flujo.",
    },
    geofisica: {
      nombre: "Ingeniería Geofísica",
      tema: "1.4 Problemas Inversos: Inversión Gravimétrica y Tomografía Sísmica",
      subtema: "1.4 Criterios de estabilidad e inconsistencia",
      tipoError: "Inestabilidad por problema mal planteado (Ill-posed problem de Hadamard)",
      colorBadge: "bg-primary",
      casoReal:
        "Reconstrucción del perfil de densidades o velocidades del subsuelo a partir de anomalías gravimétricas; pequeñas perturbaciones en las mediciones causan soluciones oscilatorias divergentes.",
      formulaImpacto: "Solución de mínimos cuadrados (G^T G)^-1 G^T d diverge si singular_values(G) → 0",
      mitigacion:
        "Regularización de Tikhonov (Ridge Regression) y descomposición en valores singulares truncada (TSVD).",
    },
    petrolera: {
      nombre: "Ingeniería Petrolera",
      tema: "1.5 Serie de Taylor: Simulación de Yacimientos y Frentes de Desplazamiento",
      subtema: "1.5 Aproximación por Taylor / 1.3 Error de truncamiento",
      tipoError: "Error de balance de materia por truncamiento temporal",
      colorBadge: "bg-dark",
      casoReal:
        "Simulación composicional de inyección de vapor/agua en yacimientos de crudo extrapesado utilizando diferencias finitas temporales de primer orden.",
      formulaImpacto: "Error_local_temporal = (Δt / 2) * (∂²P / ∂t²) + O(Δt²)",
      mitigacion:
        "Formulación completamente implícita (FIM) acoplada con métodos iterativos no lineales tipo Newton-Krylov.",
    },
    minas: {
      nombre: "Ing. de Minas y Metalurgia",
      tema: "1.3 Estimación Geoestadística: Kriging y Cubicación de Reservas",
      subtema: "1.3 Propagación y clasificación de errores",
      tipoError: "Efecto pepita (Nugget effect) y error de estimación espacial",
      colorBadge: "bg-secondary",
      casoReal:
        "Estimación de leyes de mineral (% de cobre/oro) en bloques de explotación minera mediante muestreo de barrenos dispersos.",
      formulaImpacto: "Varianza_kriging σ²_K = ∑ λ_i γ(x_i, x_0) + μ - γ(x_0, x_0)",
      mitigacion:
        "Modelado de variogramas experimentales con ajuste robusto y validación cruzada paso a paso.",
    },
    biomedicos: {
      nombre: "Sistemas Biomédicos",
      tema: "1.5 Truncamiento: Reconstrucción Tomográfica por Rayos X (Radon/CT)",
      subtema: "1.5 Aproximación de funciones / 1.6 Implementación",
      tipoError: "Artefactos de convolución y filtrado por muestreo angular finito",
      colorBadge: "bg-danger",
      casoReal:
        "Reconstrucción tomográfica computarizada mediante la Transformada Inversa de Radon (Retroproyección Filtrada); truncamiento de frecuencias altas genera artefactos de bandas.",
      formulaImpacto: "Error_proyección = ||f(x, y) - F^-1{ |ω| · W(ω) · P(ω, θ) }||",
      mitigacion:
        "Ventanas de suavizado espectral (Hamming/Shepp-Logan) e interpolación spline cúbica de proyecciones.",
    },
    mecanica: {
      nombre: "Ingeniería Mecánica",
      tema: "1.4 Estabilidad Numérica: Dinámica Multicuerpo y Fatiga en Mecanismos",
      subtema: "1.4 Estabilidad y convergencia",
      tipoError: "Deriva de restricciones algebraicas (Drift-off)",
      colorBadge: "bg-primary",
      casoReal:
        "Integración numérica directa de las ecuaciones de movimiento de Euler-Lagrange en sistemas mecánicos articulados de alta velocidad (bielas/cigueñales).",
      formulaImpacto: "Φ(q) = 0 deja de cumplirse gradualmente debido a errores de redondeo acumulados en cada paso dt",
      mitigacion:
        "Estabilización de Baumgarte o formulaciones en coordenadas independientes con proyecciones de coordenadas.",
    },
    mecatronica: {
      nombre: "Ingeniería Mecatrónica",
      tema: "1.1 y 1.6 Discretización: Control Digital en Tiempo Real de Servomotores",
      subtema: "1.1 Importancia de métodos numéricos / 1.6 Implementación",
      tipoError: "Retardo de fase y aliasing por discretización finita",
      colorBadge: "bg-info text-dark",
      casoReal:
        "Aproximación de la acción derivativa en controladores PID analógicos hacia microcontroladores con frecuencia de muestreo limitada.",
      formulaImpacto: "D(z) = Kd * (1 - z^-1) / Ts  →  amplifica el ruido de alta frecuencia a razón de 1/Ts",
      mitigacion:
        "Implementación con Transformada Bilineal (Tustin) y filtros pasabajas de primer orden en la rama derivativa.",
    },
    industrial: {
      nombre: "Ingeniería Industrial",
      tema: "1.4 Precisión: Solución de Problemas de Programación Lineal a Gran Escala",
      subtema: "1.4 Precisión y estabilidad en optimización",
      tipoError: "Degeneración y ciclaje por tolerancia de pivoteo en Simplex",
      colorBadge: "bg-success",
      casoReal:
        "Optimización de cadenas de suministro globales con millones de variables; operaciones de pivoteo gaussiano acumulan error de punto flotante llevando a soluciones infactibles.",
      formulaImpacto: "Matriz base B^-1 acumula error: B_k+1 = E_k · B_k  →  det(B) ≈ 0",
      mitigacion:
        "Simplex Revisado con factorización LU actualizada dinámicamente y reinversión periódica de la matriz base.",
    },
  };

  const actual = catalogoErrores[carreraSeleccionada];

  return (
    <div className="p-3 border rounded bg-light">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h5 className="text-primary fw-bold mb-1">
            Capítulo 1: Teoría de Errores y Representación Numérica en la Ingeniería
          </h5>
          <p className="text-muted small mb-0">
            Impacto del redondeo, truncamiento, propagación y estabilidad numérica en las 15 ramas de la FI UNAM.
          </p>
        </div>
      </div>

      {/* Selector Desplegable de Carreras */}
      <div className="row g-2 mb-3">
        <div className="col-md-6">
          <label htmlFor="selectCarreraError" className="form-label small fw-bold text-dark">
            Selecciona el Programa Académico:
          </label>
          <select
            id="selectCarreraError"
            className="form-select form-select-sm"
            value={carreraSeleccionada}
            onChange={(e) => setCarreraSeleccionada(e.target.value)}
          >
            {Object.keys(catalogoErrores).map((key) => (
              <option key={key} value={key}>
                {catalogoErrores[key].nombre}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tarjeta de Detalle del Error Numérico */}
      <div className="card shadow-sm border-0">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h6 className="card-title fw-bold text-dark mb-0">{actual.tema}</h6>
            <span className={`badge ${actual.colorBadge}`}>{actual.nombre}</span>
          </div>

          <div className="mb-2">
            <span className="badge bg-light text-dark border me-2">Subtema: {actual.subtema}</span>
            <span className="badge bg-danger-subtle text-danger border border-danger-subtle">
              Falla: {actual.tipoError}
            </span>
          </div>

          <p className="card-text text-secondary small mb-3">{actual.casoReal}</p>

          <div className="bg-dark text-light p-2 rounded text-center font-monospace small mb-3">
            {actual.formulaImpacto}
          </div>

          <div className="p-2 border rounded bg-white">
            <span className="d-block fw-bold text-dark small mb-1">
              Estrategia de Mitigación / Algoritmo Numérico Estable:
            </span>
            <p className="text-muted small mb-0">{actual.mitigacion}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErroresFundamentosTab;