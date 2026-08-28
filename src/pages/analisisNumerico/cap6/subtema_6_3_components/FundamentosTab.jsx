import React, { useState } from "react";

const SimulacionMonteCarloFundamentosTab = () => {
  const [carreraSeleccionada, setCarreraSeleccionada] = useState("aeroespacial");

  const catalogoCapitulo6 = {
    aeroespacial: {
      nombre: "Ingeniería Aeroespacial",
      tema: "Probabilidad de Impacto por Basura Espacial en Satélites (LEO)",
      subtema: "6.2 Simulación Monte Carlo. Integración numérica",
      metodoRecomendado: "Monte Carlo Multidimensional con Muestreo por Importancia",
      colorBadge: "bg-primary",
      descripcion:
        "Estimación de la probabilidad de colisión (Pc) integrando las elipses de incertidumbre estocástica de posición entre un satélite y fragmentos orbitales.",
      modeloMatematico: "P_colision = ∭_V PDF_relativa(x, y, z) dx dy dz ≈ (1/N) · ∑[i=1, N] I_colision(X_i)",
      justificacion:
        "Las órbitas presentan distribuciones de covarianza Gaussianas acopladas; Monte Carlo supera la 'maldición de la dimensionalidad' en integrales de volumen 3D complejas.",
      variables: [
        { nombre: "P_colision", desc: "Probabilidad acumulada de impacto en el cruce" },
        { nombre: "PDF_relativa", desc: "Función de densidad conjunta de error orbital" },
        { nombre: "N", desc: "Número de trayectorias sintéticas simuladas" },
      ],
    },
    civil: {
      nombre: "Ingeniería Civil",
      tema: "Análisis de Confiabilidad Estructural y Riesgo Sísmico",
      subtema: "6.2 Simulación Monte Carlo",
      metodoRecomendado: "Simulación de Monte Carlo con Muestreo de Hipercubo Latino (LHS)",
      colorBadge: "bg-success",
      descripcion:
        "Cálculo del índice de falla estructural β evaluando la probabilidad de que la demanda sísmica (S) exceda la resistencia real del concreto/acero (R).",
      modeloMatematico: "P_falla = P( R - S < 0 ) ≈ ( N_fallas ) / N_total",
      justificacion:
        "Las resistencias de materiales y las cargas vivas son variables aleatorias con distribuciones no normales (Lognormal/Gumbel) no integrables analíticamente.",
      variables: [
        { nombre: "R, S", desc: "Capacidad resistente y solicitación de carga máxima" },
        { nombre: "P_falla", desc: "Probabilidad de colapso o estado límite" },
      ],
    },
    geomatica: {
      nombre: "Ingeniería Geomática",
      tema: "Propagación Estocástica de Incertidumbre en Nubes de Puntos LiDAR",
      subtema: "6.1 Generación de números aleatorios / 6.2 Monte Carlo",
      metodoRecomendado: "Generadores Congruenciales / Transformada Inversa Normal",
      colorBadge: "bg-info text-dark",
      descripcion:
        "Modelado del error volumétrico en cálculo de curvas de nivel y batimetría generado por ruido estocástico en sensores inerciales y GNSS.",
      modeloMatematico: "Z_simulado = Z_base + σ_sensor · sqrt(-2·ln(U1)) · cos(2·π·U2)   (Box-Muller)",
      justificacion:
        "La transformada de Box-Muller convierte números pseudoaleatorios uniformes U(0,1) en ruido gaussiano exacto para simular perturbaciones de campo.",
      variables: [
        { nombre: "U1, U2", desc: "Variables uniformes pseudoaleatorias independientes" },
        { nombre: "Z_simulado", desc: "Elevación topográfica con ruido sintético" },
      ],
    },
    ambiental: {
      nombre: "Ingeniería Ambiental",
      tema: "Evaluación de Riesgo Toxicológico en Acuíferos por Monte Carlo",
      subtema: "6.2 Simulación Monte Carlo. Integración numérica",
      metodoRecomendado: "Integración de Monte Carlo Multivariable",
      colorBadge: "bg-success",
      descripcion:
        "Estimación de la distribución probabilística de la dosis diaria de exposición humana a hidrocarburos aromáticos en pozos de agua potable.",
      modeloMatematico: "Dosis_exposicion = ( C_agua · Tasa_ingesta · Frecuencia_exp ) / ( Peso_corporal · Tiempo_promedio )",
      justificacion:
        "Al tratar todas las variables biométricas y ambientales como distribuciones de probabilidad, Monte Carlo produce una curva de riesgo acumulado percentil 95.",
      variables: [
        { nombre: "C_agua", desc: "Concentración estocástica del analito tóxico" },
        { nombre: "Dosis", desc: "Ingesta diaria promedio (mg/kg·día)" },
      ],
    },
    electrica: {
      nombre: "Ing. Eléctrica Electrónica",
      tema: "Flujo de Potencia Probabilístico en Redes con Energía Solar y Eólica",
      subtema: "6.2 Simulación Monte Carlo",
      metodoRecomendado: "Monte Carlo Secuencial no Paramétrico",
      colorBadge: "bg-warning text-dark",
      descripcion:
        "Evaluación de sobrecargas y caídas de tensión en líneas de transmisión debido a la intermitencia estocástica del viento y radiación solar.",
      modeloMatematico: "V_nodo = f( P_generacion_aleatoria, Q_demanda_aleatoria )   →   E[V],  Var(V)",
      justificacion:
        "La generación renovable sigue distribuciones tipo Weibull (viento) y Beta (radiación), requiriendo miles de simulaciones para validar la estabilidad de la red.",
      variables: [
        { nombre: "P, Q", desc: "Potencias activa y reactiva estocásticas inyectadas" },
        { nombre: "V_nodo", desc: "Voltaje resultante en barras eléctricas" },
      ],
    },
    computacion: {
      nombre: "Ingeniería en Computación",
      tema: "Dimensionamiento de Clústeres Web y Servidores de Microservicios",
      subtema: "6.3 Simulación de líneas de espera con uno y dos servidores",
      metodoRecomendado: "Simulación de Eventos Discretos (Colas M/M/1 y M/M/c)",
      colorBadge: "bg-dark",
      descripcion:
        "Modelado del tiempo de latencia y tasa de descarte de peticiones HTTP en servidores balanceados con llegadas Poisson y tiempos de atención exponenciales.",
      modeloMatematico: "L_q = ( λ² ) / ( μ · (μ - λ) ),    W_q = L_q / λ   (con condición de estabilidad λ < c·μ)",
      justificacion:
        "Permite determinar si conviene escalar verticalmente (servidor único más rápido μ) o escalar horizontalmente (dos o más servidores balanceados c=2).",
      variables: [
        { nombre: "λ", desc: "Tasa media de arribo de solicitudes por segundo" },
        { nombre: "μ", desc: "Tasa media de procesamiento de cada servidor" },
        { nombre: "W_q", desc: "Tiempo medio de espera del usuario en cola" },
      ],
    },
    telecomunicaciones: {
      nombre: "Ing. en Telecomunicaciones",
      tema: "Bloqueo de Llamadas y Canales de Datos en Estaciones Base (Erlang-B)",
      subtema: "6.3 Simulación de líneas de espera (Sistemas M/M/c/c)",
      metodoRecomendado: "Simulación Estocástica de Procesos de Nacimiento y Muerte",
      colorBadge: "bg-secondary",
      descripcion:
        "Cálculo de la probabilidad de bloqueo en celdas de telefonía móvil celular cuando todos los canales de radiofrecuencia (servidores c) están ocupados.",
      modeloMatematico: "P_bloqueo = B(c, A) = ( A^c / c! ) / ( ∑[k=0, c] (A^k / k!) )   con A = λ/μ",
      justificacion:
        "Simular el arribo de paquetes permite analizar el comportamiento dinámico durante horas pico cuando el tráfico rompe las hipótesis estacionarias.",
      variables: [
        { nombre: "A", desc: "Intensidad de tráfico ofrecido en Erlangs" },
        { nombre: "c", desc: "Número de canales/servidores disponibles en la celda" },
      ],
    },
    geologica: {
      nombre: "Ingeniería Geológica",
      tema: "Simulación de Redes de Fracturas y Flujo Preferencial en Macizos",
      subtema: "6.1 y 6.2 Generación de Números Aleatorios y Monte Carlo",
      metodoRecomendado: "Generación de Procesos Puntuales de Poisson en 3D (DFN)",
      colorBadge: "bg-danger",
      descripcion:
        "Generación estocástica de planos de discontinuidad geológica (buzamiento, rumbo y espaciamiento) para modelar estabilidad de taludes.",
      modeloMatematico: "Orientacion_plano ~ Fisher_Distribution(κ),   Espaciamiento ~ Exponencial(λ)",
      justificacion:
        "La orientación real de fallas en el subsuelo es inaccesible de forma determinista; la simulación sintética reproduce la conectividad hidráulica de la roca.",
      variables: [
        { nombre: "κ", desc: "Factor de concentración de orientación de la familia de fallas" },
        { nombre: "DFN", desc: "Red de Fracturas Discretas simulada" },
      ],
    },
    geofisica: {
      nombre: "Ingeniería Geofísica",
      tema: "Inversión Geofísica Estocástica mediante Cadenas de Markov Monte Carlo (MCMC)",
      subtema: "6.2 Simulación Monte Carlo",
      metodoRecomendado: "Algoritmo de Metropolis-Hastings (MCMC)",
      colorBadge: "bg-primary",
      descripcion:
        "Exploración del espacio de parámetros de modelos geológicos para determinar el perfil de velocidad sísmica y resistividad sin sesgos de linealización.",
      modeloMatematico: "α(m_actual, m_propuesto) = min( 1, [ P(d|m_prop) · P(m_prop) ] / [ P(d|m_act) · P(m_act) ] )",
      justificacion:
        "MCMC no queda atrapado en mínimos locales y entrega distribuciones completas de incertidumbre a posteriori para cada estrato geológico.",
      variables: [
        { nombre: "m", desc: "Vector de parámetros del modelo (espesores y densidades)" },
        { nombre: "P(d|m)", desc: "Función de verosimilitud (ajuste de datos sísmicos)" },
      ],
    },
    petrolera: {
      nombre: "Ingeniería Petrolera",
      tema: "Evaluación Económica y Reservas Volumétricas Probabilísticas (P10, P50, P90)",
      subtema: "6.2 Simulación Monte Carlo. Integración numérica",
      metodoRecomendado: "Simulación de Monte Carlo con Distribuciones Triangulares/Beta",
      colorBadge: "bg-dark",
      descripcion:
        "Cálculo de la reserva recuperable de barriles de petróleo crudo equivalente considerando incertidumbre en porosidad, espesor y saturación.",
      modeloMatematico: "N_reservas = 7758 · A · h · φ · (1 - Sw) / Boi",
      justificacion:
        "Al muestrear miles de combinaciones de las variables de yacimiento, genera las curvas de probabilidad acumulada que exige la CNH para certificar reservas P90 y P10.",
      variables: [
        { nombre: "A, h", desc: "Área de drene y espesor neto impregnado" },
        { nombre: "φ, Sw", desc: "Porosidad efectiva y saturación inicial de agua" },
        { nombre: "Boi", desc: "Factor de volumen de formación del petróleo" },
      ],
    },
    minas: {
      nombre: "Ing. de Minas y Metalurgia",
      tema: "Optimización de Flotas de Camiones y Palas en Tajos Abiertos",
      subtema: "6.3 Simulación de líneas de espera con múltiples servidores",
      metodoRecomendado: "Teoría de Colas Multicanal en Bucle Cerrado (Closed Queuing Networks)",
      colorBadge: "bg-secondary",
      descripcion:
        "Determinación del número óptimo de camiones de extracción asignados a palas mecánicas (servidores) para minimizar tiempos muertos por cola.",
      modeloMatematico: "Tiempo_ciclo = T_viaje + T_espera_pala + T_carga + T_acarreo + T_descarga",
      justificacion:
        "La variabilidad en tiempos de viaje y carguío provoca cuellos de botella severos; simular la interacción estocástica reduce costos operativos millonarios de diésel.",
      variables: [
        { nombre: "c_palas", desc: "Número de palas de carguío activas (servidores)" },
        { nombre: "N_camiones", desc: "Número total de vehículos en el circuito minero" },
      ],
    },
    biomedicos: {
      nombre: "Sistemas Biomédicos",
      tema: "Simulación de Dosis de Radioterapia contra el Cáncer (Ecuación de Boltzmann)",
      subtema: "6.2 Simulación Monte Carlo. Integración numérica",
      metodoRecomendado: "Monte Carlo para Transporte de Fotones y Electrones",
      colorBadge: "bg-danger",
      descripcion:
        "Cálculo preciso del depósito de dosis de radiación en tumores respetando tejidos sanos circundantes mediante seguimiento probabilístico de partículas individuales.",
      modeloMatematico: "Dosis(x, y, z) = (1 / Masa_voxel) · ∑[i=1, N_particulas] ΔE_cinetica_absorbida",
      justificacion:
        "El método de Monte Carlo es el estándar de oro en física médica para simular la dispersión Compton y el efecto fotoeléctrico en anatomías humanas heterogéneas.",
      variables: [
        { nombre: "ΔE", desc: "Energía transferida en cada colisión atómica estocástica" },
        { nombre: "Dosis", desc: "Dosis absorbida localmente (Gy = Joules/kg)" },
      ],
    },
    mecanica: {
      nombre: "Ingeniería Mecánica",
      tema: "Tolerancias Geométricas y Ensamble Estadístico de Mecanismos",
      subtema: "6.2 Simulación Monte Carlo",
      metodoRecomendado: "Análisis de Acumulación de Tolerancias por Monte Carlo (Tolerance Stacking)",
      colorBadge: "bg-primary",
      descripcion:
        "Predicción de holguras críticas y probabilidad de interferencia en trenes de engranajes y cilindros de motores durante el ensamble masivo.",
      modeloMatematico: "Holgura_final = Cotas_nominales + ∑[i=1, k] X_tolerancia_i   (donde X_i ~ Normal/Uniforme)",
      justificacion:
        "El método determinista del peor caso sobrediseña los componentes; Monte Carlo optimiza los costos de maquinado al considerar la dispersión real del proceso CNC.",
      variables: [
        { nombre: "X_tolerancia", desc: "Desviación dimensional real del maquinado de cada pieza" },
        { nombre: "P_rechazo", desc: "Porcentaje de ensambles fuera de tolerancia" },
      ],
    },
    mecatronica: {
      nombre: "Ingeniería Mecatrónica",
      tema: "Localización y Mapeo Simultáneo de Robots Móviles (Filtro de Partículas)",
      subtema: "6.1 y 6.2 Monte Carlo Secuencial (Sequential Monte Carlo / PF)",
      metodoRecomendado: "Filtro de Partículas (Monte Carlo Localization - MCL)",
      colorBadge: "bg-info text-dark",
      descripcion:
        "Estimación de la posición tridimensional (x, y, θ) de un robot autónomo en entornos no estructurados mediante nubes de partículas probabilísticas.",
      modeloMatematico: "P(x_t | z_1:t) ≈ ∑[i=1, M] w_t^(i) · δ(x_t - x_t^(i))",
      justificacion:
        "A diferencia del Filtro de Kalman, Monte Carlo permite representar distribuciones de probabilidad multimodales y no lineales cuando el robot no sabe inicialmente en qué habitación se encuentra.",
      variables: [
        { nombre: "x_t^(i)", desc: "Hipótesis de posición de la partícula i-ésima" },
        { nombre: "w_t^(i)", desc: "Peso o probabilidad asignada según la lectura del sensor láser" },
      ],
    },
    industrial: {
      nombre: "Ingeniería Industrial",
      tema: "Optimización de Estaciones de Servicio y Cajas de Cobro Multicanal",
      subtema: "6.3 Simulación de líneas de espera con uno y dos servidores",
      metodoRecomendado: "Simulación de Líneas de Espera M/M/1 y M/M/2 con Costos de Inactividad",
      colorBadge: "bg-success",
      descripcion:
        "Evaluación del equilibrio económico óptimo entre el costo de contratar servidores adicionales (cajas/operadores) vs. el costo de insatisfacción por tiempo de espera en fila.",
      modeloMatematico: "Costo_Total = c · Costo_Servidor + L_q(c) · Costo_Espera_Cliente",
      justificacion:
        "Compara de forma cuantitativa el paso de un solo canal (M/M/1) a dos canales en paralelo (M/M/2) reduciendo exponencialmente el tamaño promedio de la fila (L_q).",
      variables: [
        { nombre: "c", desc: "Número de estaciones de servicio activas (1 o 2)" },
        { nombre: "L_q", desc: "Número medio de clientes en espera en la fila" },
        { nombre: "Costo_Total", desc: "Función de costo económico a minimizar" },
      ],
    },
  };

  const actual = catalogoCapitulo6[carreraSeleccionada];

  return (
    <div className="p-3 border rounded bg-light">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h5 className="text-primary fw-bold mb-1">
            Capítulo 6: Simulación Estocástica, Monte Carlo y Líneas de Espera
          </h5>
          <p className="text-muted small mb-0">
            Generación de variables aleatorias, integración estocástica y modelado de colas en las 15 carreras de la FI UNAM.
          </p>
        </div>
      </div>

      {/* Selector Desplegable de Carreras */}
      <div className="row g-2 mb-3">
        <div className="col-md-6">
          <label htmlFor="selectCarreraCap6" className="form-label small fw-bold text-dark">
            Selecciona el Programa Académico:
          </label>
          <select
            id="selectCarreraCap6"
            className="form-select form-select-sm"
            value={carreraSeleccionada}
            onChange={(e) => setCarreraSeleccionada(e.target.value)}
          >
            {Object.keys(catalogoCapitulo6).map((key) => (
              <option key={key} value={key}>
                {catalogoCapitulo6[key].nombre}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tarjeta de Detalle del Modelo Estocástico */}
      <div className="card shadow-sm border-0">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h6 className="card-title fw-bold text-dark mb-0">{actual.tema}</h6>
            <span className={`badge ${actual.colorBadge}`}>{actual.nombre}</span>
          </div>

          <div className="mb-2">
            <span className="badge bg-light text-dark border me-2">Subtema: {actual.subtema}</span>
          </div>

          <p className="card-text text-secondary small mb-3">{actual.descripcion}</p>

          <div className="bg-dark text-light p-2 rounded text-center font-monospace small mb-3">
            {actual.modeloMatematico}
          </div>

          <div className="row g-2">
            <div className="col-md-6">
              <div className="p-2 border rounded bg-white h-100">
                <span className="d-block fw-bold text-dark small mb-1">
                  Método Numérico / Enfoque Estocástico:
                </span>
                <span className="badge bg-secondary mb-2">{actual.metodoRecomendado}</span>
                <p className="text-muted small mb-0">{actual.justificacion}</p>
              </div>
            </div>

            <div className="col-md-6">
              <div className="p-2 border rounded bg-white h-100">
                <span className="d-block fw-bold text-dark small mb-1">
                  Variables e Incógnitas Estocásticas:
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

export default SimulacionMonteCarloFundamentosTab;