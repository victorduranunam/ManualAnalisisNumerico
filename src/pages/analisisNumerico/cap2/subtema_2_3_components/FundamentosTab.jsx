import React, { useState } from "react";

const FundamentosTab = () => {
  const [carreraSeleccionada, setCarreraSeleccionada] = useState("aeroespacial");

  const catalogoCarreras = {
    aeroespacial: {
      nombre: "Ingeniería Aeroespacial",
      tema: "Mecánica Orbital: Ecuación de Kepler",
      metodo: "Newton-Raphson",
      colorBadge: "bg-primary",
      descripcion:
        "Cálculo de la anomalía excéntrica (E) para determinar la posición exacta de un satélite en órbita elíptica en un tiempo t.",
      ecuacion: "E - e * sin(E) - M = 0",
      justificacion:
        "La derivada d/dE (1 - e*cos(E)) nunca se anula para órbitas elípticas (0 <= e < 1), lo que garantiza convergencia cuadrática rápida y monótona.",
      variables: [
        { nombre: "E", desc: "Anomalía excéntrica (incógnita raíz)" },
        { nombre: "e", desc: "Excentricidad orbital" },
        { nombre: "M", desc: "Anomalía media conocida (M = n*t)" },
      ],
    },
    civil: {
      nombre: "Ingeniería Civil",
      tema: "Hidráulica: Tirante Crítico en Canales Trapezoidales",
      metodo: "Bisección / Secante",
      colorBadge: "bg-success",
      descripcion:
        "Determinación del tirante crítico de agua (y_c) para el diseño de canales abiertos y prevención de resaltos hidráulicos.",
      ecuacion: "1 - (Q² * T(y)) / (g * A(y)³) = 0",
      justificacion:
        "El área hidráulica A(y) y el ancho superficial T(y) introducen potencias fraccionarias no lineales donde evaluar derivadas analíticas es complejo.",
      variables: [
        { nombre: "y", desc: "Tirante de agua en el canal (raíz)" },
        { nombre: "Q", desc: "Gasto volumétrico de diseño" },
        { nombre: "A(y), T(y)", desc: "Área mojada y ancho libre superficial" },
      ],
    },
    geomatica: {
      nombre: "Ingeniería Geomática",
      tema: "Geodesia: Latitud Geodésica en el Elipsoide WGS84",
      metodo: "Newton-Raphson",
      colorBadge: "bg-info text-dark",
      descripcion:
        "Conversión de coordenadas cartesianas tridimensionales (X, Y, Z) satelitales (GNSS/GPS) a coordenadas geodésicas angulares (latitud φ).",
      ecuacion: "tan(φ) - (Z + e'² * b * sin³(θ)) / (p - e² * a * cos³(θ)) = 0",
      justificacion:
        "Convergencia ultraprecisa en pocas iteraciones para procesamiento de señales satelitales en tiempo real.",
      variables: [
        { nombre: "φ", desc: "Latitud geodésica (raíz)" },
        { nombre: "a, b", desc: "Semiejes mayor y menor del elipsoide" },
        { nombre: "e, e'", desc: "Primera y segunda excentricidad" },
      ],
    },
    ambiental: {
      nombre: "Ingeniería Ambiental",
      tema: "Calidad del Agua: Modelo de Oxígeno Disuelto de Streeter-Phelps",
      metodo: "Regla Falsa",
      colorBadge: "bg-success",
      descripcion:
        "Localización de la distancia río abajo (x) donde el déficit de oxígeno disuelto alcanza su valor crítico o umbral de recuperación biológica.",
      ecuacion: "(k1*L0)/(k2 - k1) * (exp(-k1*x/u) - exp(-k2*x/u)) + D0*exp(-k2*x/u) - D_lim = 0",
      justificacion:
        "Ecuación trascendente con términos exponenciales decrecientes que modela la autopurificación de cuerpos hídricos.",
      variables: [
        { nombre: "x", desc: "Distancia longitudinal del río (raíz)" },
        { nombre: "k1, k2", desc: "Coeficientes de desoxigenación y reaireación" },
        { nombre: "u", desc: "Velocidad media de la corriente" },
      ],
    },
    electrica: {
      nombre: "Ing. Eléctrica Electrónica",
      tema: "Semiconductores: Voltaje de Operación en Diodos Reales",
      metodo: "Bisección",
      colorBadge: "bg-warning text-dark",
      descripcion:
        "Cálculo del punto de reposo (Q-point) y caída de tensión en bornes de un diodo conectado a una carga resistiva.",
      ecuacion: "(Vs - Vd)/R - Is * (exp(q*Vd / (η*k*T)) - 1) = 0",
      justificacion:
        "La exponencial de Shockley genera pendientes casi verticales; Bisección evita desbordamientos numéricos acotando el intervalo [0, Vs].",
      variables: [
        { nombre: "Vd", desc: "Voltaje en bornes del diodo (raíz)" },
        { nombre: "Vs", desc: "Voltaje de alimentación de la fuente" },
        { nombre: "Is", desc: "Corriente de saturación inversa" },
      ],
    },
    computacion: {
      nombre: "Ingeniería en Computación",
      tema: "Teoría de Colas: Capacidad de Búfer en Servidores M/M/1/K",
      metodo: "Secante / Bisección",
      colorBadge: "bg-dark",
      descripcion:
        "Cálculo de la intensidad de tráfico máxima (ρ) para no sobrepasar una probabilidad dada de pérdida de paquetes por desbordamiento.",
      ecuacion: "((1 - ρ) * ρ^K) / (1 - ρ^(K + 1)) - P_perdida = 0",
      justificacion:
        "Resuelve la optimización de capacidad en conmutadores y enrutadores de red bajo tráfico estocástico.",
      variables: [
        { nombre: "ρ", desc: "Factor de utilización del servidor λ/μ (raíz)" },
        { nombre: "K", desc: "Tamaño máximo de la cola/búfer" },
        { nombre: "P_perdida", desc: "Tolerancia de descarte de paquetes" },
      ],
    },
    telecomunicaciones: {
      nombre: "Ing. en Telecomunicaciones",
      tema: "Líneas de Transmisión: Ecuación de Guías de Onda Dieléctricas",
      metodo: "Bisección + Newton-Raphson",
      colorBadge: "bg-secondary",
      descripcion:
        "Cálculo de la constante de fase transversal (u) para los modos de propagación transversal electromagnética en fibra óptica.",
      ecuacion: "u * tan(u) - sqrt(V² - u²) = 0",
      justificacion:
        "La función presenta ramas periódicas infinitas. Bisección aísla el modo fundamental y Newton refina la raíz con alta precisión.",
      variables: [
        { nombre: "u", desc: "Parámetro modal normalizado (raíz)" },
        { nombre: "V", desc: "Frecuencia normalizada de la fibra óptica" },
      ],
    },
    geologica: {
      nombre: "Ingeniería Geológica",
      tema: "Mecánica de Rocas: Criterio de Falla no lineal de Hoek-Brown",
      metodo: "Newton-Raphson",
      colorBadge: "bg-danger",
      descripcion:
        "Determinación del esfuerzo principal menor (σ3) admisible en macizos rocosos antes de fractura bajo carga σ1.",
      ecuacion: "σ3 + σci * (m_b * (σ3/σci) + s)^a - σ1 = 0",
      justificacion:
        "Exponente no lineal 'a' (fraccionario) derivado de la rugosidad y calidad geomecánica de las discontinuidades estructurales.",
      variables: [
        { nombre: "σ3", desc: "Esfuerzo principal confinante (raíz)" },
        { nombre: "σci", desc: "Resistencia a compresión uniaxial de roca intacta" },
        { nombre: "m_b, s, a", desc: "Parámetros empíricos del macizo rocoso" },
      ],
    },
    geofisica: {
      nombre: "Ingeniería Geofísica",
      tema: "Sismología: Ecuación de Dispersión de Ondas de Rayleigh",
      metodo: "Secante / Bisección",
      colorBadge: "bg-primary",
      descripcion:
        "Obtención de la velocidad de propagación de ondas superficiales elásticas (c) en estratos terrestres semi-infinitos.",
      ecuacion: "(2 - c²/β²)² - 4*sqrt(1 - c²/α²)*sqrt(1 - c²/β²) = 0",
      justificacion:
        "Polinomio implícito con raíces cuadradas acopladas donde c debe ubicarse estrictamente en el intervalo 0 < c < β.",
      variables: [
        { nombre: "c", desc: "Velocidad de fase de la onda Rayleigh (raíz)" },
        { nombre: "α, β", desc: "Velocidades de propagación de ondas P y S" },
      ],
    },
    petrolera: {
      nombre: "Ingeniería Petrolera",
      tema: "Termodinámica de Hidrocarburos: Ecuación de Peng-Robinson",
      metodo: "Newton-Raphson",
      colorBadge: "bg-dark",
      descripcion:
        "Cálculo del factor de compresibilidad (Z) de mezclas multicomponente de crudo y gas a condiciones de yacimiento.",
      ecuacion: "Z³ - (1 - B)*Z² + (A - 3*B² - 2*B)*Z - (A*B - B² - B³) = 0",
      justificacion:
        "Cúbica en Z que permite obtener las fases líquida y vapor simultáneamente en cálculos de equilibrio vapor-líquido (VLE).",
      variables: [
        { nombre: "Z", desc: "Factor de compresibilidad del gas/crudo (raíz)" },
        { nombre: "A, B", desc: "Coeficientes de atracción y covolumen" },
      ],
    },
    minas: {
      nombre: "Ing. de Minas y Metalurgia",
      tema: "Ventilación de Minas: Ecuación de Resistencia de Atkinson",
      metodo: "Regla Falsa",
      colorBadge: "bg-secondary",
      descripcion:
        "Cálculo del caudal de aire limpio (Q) en circuitos ramificados de galerías subterráneas con flujo turbulento.",
      ecuacion: "H_ventilador - (k * P_perimetro * L / A³) * Q² - H_natural = 0",
      justificacion:
        "Balance no lineal de pérdidas de presión por fricción y choque en redes complejas de túneles mineros.",
      variables: [
        { nombre: "Q", desc: "Caudal volumétrico de ventilación (raíz)" },
        { nombre: "k", desc: "Factor de fricción aerodinámico de Atkinson" },
        { nombre: "L, A, P_perimetro", desc: "Geometría de la galería minera" },
      ],
    },
    biomedicos: {
      nombre: "Sistemas Biomédicos",
      tema: "Farmacocinética: Ecuación Enzimática de Michaelis-Menten",
      metodo: "Newton-Raphson",
      colorBadge: "bg-danger",
      descripcion:
        "Determinación de la concentración plasmática de fármaco (S) para alcanzar una tasa metabólica objetivo sin generar toxicidad.",
      ecuacion: "(Vmax * S) / (Km + S) + k_elim * S - Tasa_infusion = 0",
      justificacion:
        "Modela la transición continua entre cinéticas de orden cero (saturación) y de primer orden en sistemas fisiológicos.",
      variables: [
        { nombre: "S", desc: "Concentración del sustrato/fármaco (raíz)" },
        { nombre: "Vmax", desc: "Velocidad máxima de reacción metabólica" },
        { nombre: "Km", desc: "Constante de afinidad enzimática de Michaelis" },
      ],
    },
    mecanica: {
      nombre: "Ingeniería Mecánica",
      tema: "Vibraciones: Frecuencias Naturales en Vigas Empotradas",
      metodo: "Secante",
      colorBadge: "bg-primary",
      descripcion:
        "Cálculo de frecuencias modales y parámetros de rigidez dinámica para evitar resonancias estructurales en maquinaria rotativa.",
      ecuacion: "cosh(βL) * cos(βL) + 1 = 0",
      justificacion:
        "Combinación de funciones trigonométricas e hiperbólicas cuyos ceros corresponden a cada uno de los armónicos de vibración.",
      variables: [
        { nombre: "βL", desc: "Número de onda adimensional modal (raíz)" },
        { nombre: "L", desc: "Longitud efectiva del eje o viga" },
      ],
    },
    mecatronica: {
      nombre: "Ingeniería Mecatrónica",
      tema: "Robótica: Cinemática Inversa de Eslabones Articulados",
      metodo: "Newton-Raphson Multivariable / Secante",
      colorBadge: "bg-info text-dark",
      descripcion:
        "Cálculo del ángulo articular (θ) requerido en un actuador para posicionar el efector final en un punto de trabajo objetivo.",
      ecuacion: "L1*cos(θ1) + L2*cos(θ1 + θ2) - X_objetivo = 0",
      justificacion:
        "Sistema no lineal acoplado; el método numérico permite actualizar las trayectorias de control articular a frecuencias de kHz.",
      variables: [
        { nombre: "θ", desc: "Ángulo de la articulación del servomotor (raíz)" },
        { nombre: "L1, L2", desc: "Longitudes de los eslabones cinemáticos" },
        { nombre: "X_objetivo", desc: "Coordenada espacial de destino" },
      ],
    },
    industrial: {
      nombre: "Ingeniería Industrial",
      tema: "Gestión de Inventarios: Lote Económico (EOQ) con Faltantes",
      metodo: "Regla Falsa / Newton-Raphson",
      colorBadge: "bg-success",
      descripcion:
        "Determinación de la cantidad óptima de pedido (Q) y tasa de escasez planificada considerando costos no lineales de almacenamiento.",
      ecuacion: "d/dQ [ (D/Q)*S + (Q/2)*H*(1 - D/(Q*P)) ] = 0",
      justificacion:
        "Optimización de costos logísticos totales en cadenas de suministro bajo restricciones de capacidad y demanda finita.",
      variables: [
        { nombre: "Q", desc: "Tamaño óptimo del lote de producción (raíz)" },
        { nombre: "D, S, H", desc: "Demanda anual, costo de ordenar y costo de mantener" },
        { nombre: "P", desc: "Tasa de producción diaria" },
      ],
    },
  };

  const actual = catalogoCarreras[carreraSeleccionada];

  return (
    <div className="p-3 border rounded bg-light">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h5 className="text-primary fw-bold mb-1">
            Aplicación de Métodos de Raíces en las Ingenierías (FI UNAM)
          </h5>
          <p className="text-muted small mb-0">
            Catálogo interactivo de problemas no lineales aplicados por disciplina académica.
          </p>
        </div>
      </div>

      {/* Selector Desplegable de Carreras */}
      <div className="row g-2 mb-3">
        <div className="col-md-6">
          <label htmlFor="selectCarrera" className="form-label small fw-bold text-dark">
            Selecciona el Programa Académico:
          </label>
          <select
            id="selectCarrera"
            className="form-select form-select-sm"
            value={carreraSeleccionada}
            onChange={(e) => setCarreraSeleccionada(e.target.value)}
          >
            {Object.keys(catalogoCarreras).map((key) => (
              <option key={key} value={key}>
                {catalogoCarreras[key].nombre}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tarjeta de Detalle del Caso Físico-Matemático */}
      <div className="card shadow-sm border-0">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h6 className="card-title fw-bold text-dark mb-0">{actual.tema}</h6>
            <span className={`badge ${actual.colorBadge}`}>{actual.nombre}</span>
          </div>

          <p className="card-text text-secondary small mb-3">{actual.descripcion}</p>

          <div className="bg-dark text-light p-2 rounded text-center font-monospace small mb-3">
            f(x) = {actual.ecuacion}
          </div>

          <div className="row g-2">
            <div className="col-md-6">
              <div className="p-2 border rounded bg-white h-100">
                <span className="d-block fw-bold text-dark small mb-1">
                  Método Numérico Recomendado:
                </span>
                <span className="badge bg-secondary mb-2">{actual.metodo}</span>
                <p className="text-muted small mb-0">{actual.justificacion}</p>
              </div>
            </div>

            <div className="col-md-6">
              <div className="p-2 border rounded bg-white h-100">
                <span className="d-block fw-bold text-dark small mb-1">
                  Variables e Incógnitas del Modelo:
                </span>
                <ul className="list-unstyled small text-muted mb-0">
                  {actual.variables.map((v, idx) => (
                    <li key={idx}>
                      <strong className="text-dark">{v.nombre}:</strong> {v.desc}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundamentosTab;