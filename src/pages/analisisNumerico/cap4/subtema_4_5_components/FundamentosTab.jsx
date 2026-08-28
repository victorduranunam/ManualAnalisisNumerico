import React, { useState } from "react";

const InterpolacionIntegracionFundamentosTab = () => {
  const [carreraSeleccionada, setCarreraSeleccionada] = useState("aeroespacial");

  const catalogoCapitulo4 = {
    aeroespacial: {
      nombre: "Ingeniería Aeroespacial",
      tema: "Cálculo de Empuje Total e Impulso Específico en Cohetes",
      subtema: "4.4 Integración numérica: Simpson 1/3",
      metodoRecomendado: "Regla de Simpson 1/3 Compuesta",
      colorBadge: "bg-primary",
      descripcion:
        "Cálculo del impulso total (I_t) integrando la curva transitoria de empuje F(t) registrada por transductores de fuerza durante pruebas estáticas de motores cohete.",
      modeloMatematico: "I_t = ∫[0, t_b] F(t) dt ≈ (Δt / 3) · [ F0 + 4∑ F_impar + 2∑ F_par + Fn ]",
      justificacion:
        "Los datos de telemetría se registran a intervalos de tiempo constantes (Δt). Simpson 1/3 captura adecuadamente las transiciones suaves de la curva de empuje con orden de error O(Δt⁴).",
      variables: [
        { nombre: "I_t", desc: "Impulso total generado (N·s)" },
        { nombre: "F(t)", desc: "Empuje instantáneo registrado en banco de pruebas" },
        { nombre: "t_b", desc: "Tiempo total de quemado del propelente" },
      ],
    },
    civil: {
      nombre: "Ingeniería Civil",
      tema: "Cálculo de Volúmenes de Movimiento de Tierras en Carreteras",
      subtema: "4.4 Integración numérica: Método del Trapecio",
      metodoRecomendado: "Método de las Secciones Medias / Trapecio Compuesto",
      colorBadge: "bg-success",
      descripcion:
        "Determinación del volumen total de corte y terraplén a lo largo del eje de un camino a partir de las áreas de las secciones transversales topográficas.",
      modeloMatematico: "Volumen = ∫[0, L] A(x) dx ≈ (Δx / 2) · [ A0 + 2A1 + 2A2 + ... + An ]",
      justificacion:
        "Las secciones topográficas se levantan a cadenamientos o estaciones equidistantes (Δx = 20 m). El método del trapecio coincide con el estándar normativo de áreas medias de la SCT.",
      variables: [
        { nombre: "A(x)", desc: "Área de corte/relleno en la estación x" },
        { nombre: "L", desc: "Longitud total del tramo carretero" },
        { nombre: "Δx", desc: "Espaciamiento entre estaciones transversales" },
      ],
    },
    geomatica: {
      nombre: "Ingeniería Geomática",
      tema: "Interpolación de Modelos Digitales de Elevación (MDE)",
      subtema: "4.1 Interpolación de Lagrange / Splines",
      metodoRecomendado: "Interpolación Polinomial de Lagrange Bivariada",
      colorBadge: "bg-info text-dark",
      descripcion:
        "Estimación continua de cotas de elevación topográfica Z(x, y) en puntos no medidos a partir de una nube dispersa de puntos LiDAR.",
      modeloMatematico: "P(x) = ∑[i=0, n] y_i · ∏[j≠i] ((x - x_j) / (x_i - x_j))",
      justificacion:
        "Permite reconstruir superficies continuas a partir de muestreos irregulares no uniformes sin necesidad de que los datos estén sobre una cuadrícula regular.",
      variables: [
        { nombre: "x_i, y_i", desc: "Coordenadas UTM y elevaciones de control" },
        { nombre: "P(x)", desc: "Cota de elevación interpolada" },
      ],
    },
    ambiental: {
      nombre: "Ingeniería Ambiental",
      tema: "Gasto Másico de Emisiones Contaminantes en Chimeneas",
      subtema: "4.4 Integración numérica: Simpson 3/8 y 1/3",
      metodoRecomendado: "Integración Numérica Simpson 1/3 y 3/8 Combinada",
      colorBadge: "bg-success",
      descripcion:
        "Cálculo de la masa total diaria de gases de efecto invernadero o material particulado integrando el producto de concentración C(t) y caudal Q(t).",
      modeloMatematico: "Masa_total = ∫[0, 24h] ( C(t) · Q(t) ) dt",
      justificacion:
        "Si el número de intervalos de monitoreo horario no es múltiplo de dos, la combinación de Simpson 1/3 y Simpson 3/8 mantiene la precisión sin degradar a trapecio.",
      variables: [
        { nombre: "C(t)", desc: "Concentración instantánea de contaminante (mg/m³)" },
        { nombre: "Q(t)", desc: "Caudal volumétrico del flujo de gas (m³/s)" },
      ],
    },
    electrica: {
      nombre: "Ing. Eléctrica Electrónica",
      tema: "Cálculo de Voltaje Eficaz (RMS) y Potencia en Ondas No Sinusoidales",
      subtema: "4.4 Integración numérica: Simpson 1/3",
      metodoRecomendado: "Regla de Simpson 1/3",
      colorBadge: "bg-warning text-dark",
      descripcion:
        "Determinación del valor cuadrático medio (RMS) del voltaje en sistemas con armónicos generados por tiristores e inversores.",
      modeloMatematico: "V_rms = sqrt( (1 / T) · ∫[0, T] v(t)² dt )",
      justificacion:
        "Al integrar el cuadrado de señales muestreadas periódicamente por osciloscopios digitales, Simpson 1/3 minimiza el error de cuadratura en presencia de armónicos impares.",
      variables: [
        { nombre: "V_rms", desc: "Voltaje eficaz real (V)" },
        { nombre: "v(t)", desc: "Señal de tensión instantánea muestreada" },
        { nombre: "T", desc: "Periodo fundamental de la red (1/60 s)" },
      ],
    },
    computacion: {
      nombre: "Ingeniería en Computación",
      tema: "Detección de Bordes en Procesamiento Digital de Imágenes",
      subtema: "4.3 Derivación numérica: Esquemas centrados",
      metodoRecomendado: "Operadores Gradiente por Diferencias Finitas Centradas",
      colorBadge: "bg-dark",
      descripcion:
        "Localización de contornos y cambios abruptos de intensidad en matrices de píxeles mediante la aproximación discreta de las derivadas espaciales ∂I/∂x y ∂I/∂y.",
      modeloMatematico: "∂I/∂x ≈ ( I(x + 1, y) - I(x - 1, y) ) / 2   (Filtro de Sobel/Prewitt)",
      justificacion:
        "El esquema de diferencias centradas tiene error de truncamiento de segundo orden O(h²), proporcionando mayor simetría y reduciendo el desplazamiento de bordes respecto a esquemas hacia adelante.",
      variables: [
        { nombre: "I(x, y)", desc: "Intensidad de brillo del píxel en coordenadas (x, y)" },
        { nombre: "∇I", desc: "Magnitud del vector gradiente de la imagen" },
      ],
    },
    telecomunicaciones: {
      nombre: "Ing. en Telecomunicaciones",
      tema: "Reconstrucción y Remuestreo de Señales de Audio/RF",
      subtema: "4.2 Diferencias finitas e Interpolación con incrementos constantes",
      metodoRecomendado: "Interpolación de Newton hacia adelante / Spline Cúbico",
      colorBadge: "bg-secondary",
      descripcion:
        "Conversión de tasa de muestreo (*upsampling*) para recuperar valores intermedios de una señal modulada sin distorsión espectral.",
      modeloMatematico: "f(x) ≈ f0 + s·Δf0 + (s(s-1)/2!)·Δ²f0 + ...   con s = (x - x0)/h",
      justificacion:
        "Dado que el muestreo en telecomunicaciones se realiza a una frecuencia de reloj constante (h = Ts), la tabla de diferencias finitas agiliza el cálculo frente a Lagrange.",
      variables: [
        { nombre: "Ts, h", desc: "Periodo de muestreo constante" },
        { nombre: "Δ^k f", desc: "Operador de diferencias hacia adelante de orden k" },
      ],
    },
    geologica: {
      nombre: "Ingeniería Geológica",
      tema: "Cálculo del Gradiente Térmico e Hidráulico en Sondeos",
      subtema: "4.3 Derivación numérica: Esquemas hacia adelante y atrás",
      metodoRecomendado: "Diferencias Finitas Progresivas y Regresivas de Alta Precisión",
      colorBadge: "bg-danger",
      descripcion:
        "Estimación del flujo de calor terrestre o tasa de variación de la presión de poro a partir de registros en pozos profundos.",
      modeloMatematico: "dT/dz ≈ ( -3·T(z) + 4·T(z + h) - T(z + 2h) ) / (2h)   (Frontera superior)",
      justificacion:
        "En los extremos de un sondeo (superficie o fondo del pozo) no se dispone de puntos en ambos lados para usar esquemas centrados, requiriendo fórmulas asimétricas O(h²).",
      variables: [
        { nombre: "T(z)", desc: "Temperatura o presión registrada a la profundidad z" },
        { nombre: "h", desc: "Paso de muestreo vertical en la sonda" },
      ],
    },
    geofisica: {
      nombre: "Ingeniería Geofísica",
      tema: "Cálculo de la Magnitud de Espectros de Respuesta Sísmica",
      subtema: "4.4 Integración numérica: Integración de Duhamel",
      metodoRecomendado: "Regla del Trapecio / Simpson para la Integral de Duhamel",
      colorBadge: "bg-primary",
      descripcion:
        "Determinación de la respuesta dinámica y aceleración espectral de estructuras ante acelerogramas registrados durante sismos.",
      modeloMatematico: "u(t) = (1 / ω_d) · ∫[0, t] a_g(τ) · exp(-ξ·ω·(t - τ)) · sin(ω_d·(t - τ)) dτ",
      justificacion:
        "Los acelerogramas son series de tiempo discretas (ej. Δt = 0.01 s) donde la integración numérica directa es la única vía para obtener la velocidad y desplazamiento del suelo.",
      variables: [
        { nombre: "a_g(τ)", desc: "Aceleración del suelo registrada en el acelerógrafo" },
        { nombre: "ω, ξ", desc: "Frecuencia natural y factor de amortiguamiento estructural" },
      ],
    },
    petrolera: {
      nombre: "Ingeniería Petrolera",
      tema: "Cálculo del Volumen Original de Hidrocarburos en Sitio (OOIP)",
      subtema: "4.4 Integración numérica: Simpson 1/3 y Trapecio",
      metodoRecomendado: "Integración Numérica Bidimensional (Regla de Simpson)",
      colorBadge: "bg-dark",
      descripcion:
        "Integración de mapas isópacos (espesor de roca neta) y de saturación para cuantificar el volumen total de petróleo y gas almacenado en un yacimiento.",
      modeloMatematico: "V_roca = ∫∫ h(x, y) dx dy ≈ ∑ (Δx · Δy / 9) · C_ij · h(x_i, y_j)",
      justificacion:
        "La geometría irregular de los yacimientos requiere integrar matrices de espesores netos h(x,y) interpolados desde registros geofísicos de pozos.",
      variables: [
        { nombre: "h(x, y)", desc: "Espesor neto impregnado de hidrocarburo" },
        { nombre: "V_roca", desc: "Volumen bruto de roca porosa contenedora" },
      ],
    },
    minas: {
      nombre: "Ing. de Minas y Metalurgia",
      tema: "Estimación del Área de Sección Transversal en Galerías Subterráneas",
      subtema: "4.4 Integración numérica: Método del Trapecio",
      metodoRecomendado: "Regla del Trapecio Compuesta sobre Perfiles Escaneados",
      colorBadge: "bg-secondary",
      descripcion:
        "Cálculo del área libre de ventilación y volumen de roca excavada en frentes de túneles a partir de mediciones con distanciómetro láser.",
      modeloMatematico: "Área = (1 / 2) · ∑[i=1, n] (x_i · y_(i+1) - x_(i+1) · y_i)",
      justificacion:
        "La sección irregular de voladura no responde a figuras geométricas estándar; la integración por segmentos trapezoidales permite calcular el sobre-rompimiento (*overbreak*).",
      variables: [
        { nombre: "(x_i, y_i)", desc: "Coordenadas polares/cartesianas del contorno del túnel" },
        { nombre: "Área", desc: "Superficie de la sección transversal de la galería" },
      ],
    },
    biomedicos: {
      nombre: "Sistemas Biomédicos",
      tema: "Cálculo del Gasto Cardíaco por Termodilución",
      subtema: "4.4 Integración numérica: Simpson 1/3 / Trapecio",
      metodoRecomendado: "Ecuación de Stewart-Hamilton con Integración Simpson",
      colorBadge: "bg-danger",
      descripcion:
        "Medición del volumen de sangre bombeado por el corazón por minuto integrando la curva de concentración de indicador térmico inyectado mediante un catéter de Swan-Ganz.",
      modeloMatematico: "Gasto_Cardiaco = Q_inyectado / ∫[0, ∞] ΔT_sangre(t) dt",
      justificacion:
        "El área bajo la curva de cambio de temperatura ΔT(t) representa el aclaramiento térmico; Simpson 1/3 calcula el área con mínima distorsión en la fase de recirculación.",
      variables: [
        { nombre: "ΔT_sangre(t)", desc: "Variación de temperatura en la arteria pulmonar" },
        { nombre: "Q_inyectado", desc: "Calor/masa del bolo salino inyectado" },
      ],
    },
    mecanica: {
      nombre: "Ingeniería Mecánica",
      tema: "Determinación de Fuerzas Cortantes y Momentos Flexionantes en Vigas",
      subtema: "4.3 Derivación y 4.4 Integración numérica",
      metodoRecomendado: "Integración Numérica (Trapecio) y Diferencias Centradas",
      colorBadge: "bg-primary",
      descripcion:
        "Construcción de los diagramas de fuerza cortante V(x) y momento flector M(x) a partir de distribuciones de carga continuas o tabuladas w(x).",
      modeloMatematico: "V(x) = ∫ w(x) dx,    M(x) = ∫ V(x) dx,    w(x) = - dV/dx",
      justificacion:
        "Cuando la carga w(x) proviene de presiones aerodinámicas o hidrostáticas experimentales no tabuladas analíticamente, la integración y derivación numérica resuelven los esfuerzos internos.",
      variables: [
        { nombre: "w(x)", desc: "Carga distribuida aplicada sobre la viga (N/m)" },
        { nombre: "V(x), M(x)", desc: "Fuerza cortante y momento flexionante resultante" },
      ],
    },
    mecatronica: {
      nombre: "Ingeniería Mecatrónica",
      tema: "Estimación de Velocidad y Aceleración en Encoders Ópticos",
      subtema: "4.3 Derivación numérica: Esquemas hacia atrás y centrados",
      metodoRecomendado: "Diferencias Finitas Regresivas de Segundo Orden con Filtro",
      colorBadge: "bg-info text-dark",
      descripcion:
        "Cálculo en tiempo real de la velocidad angular ω(t) y aceleración α(t) de un servomotor a partir de pulsos discretos de posición θ(k).",
      modeloMatematico: "ω(k) ≈ ( 3·θ(k) - 4·θ(k-1) + θ(k-2) ) / (2·Δt)",
      justificacion:
        "En sistemas de control no se conocen valores futuros, por lo que se deben emplear esquemas hacia atrás (regresivos) de segundo orden para no introducir retrasos de fase excesivos.",
      variables: [
        { nombre: "θ(k)", desc: "Lectura angular actual del encoder" },
        { nombre: "Δt", desc: "Periodo de interrupción del lazo de control" },
        { nombre: "ω(k)", desc: "Velocidad angular estimada" },
      ],
    },
    industrial: {
      nombre: "Ingeniería Industrial",
      tema: "Estimación del Trabajo Total y Consumo Energético en Líneas de Producción",
      subtema: "4.4 Integración numérica: Método del Trapecio / Simpson",
      metodoRecomendado: "Regla del Trapecio para Perfiles de Carga Eléctrica",
      colorBadge: "bg-success",
      descripcion:
        "Cálculo del consumo total de energía eléctrica (kWh) integrando la potencia activa P(t) registrada por medidores industriales en turnos continuos.",
      modeloMatematico: "Energia (kWh) = ∫[0, 24] P(t) dt ≈ ∑ ( (P_i + P_(i+1)) / 2 ) · Δt",
      justificacion:
        "Permite costear con precisión el consumo energético por lote producido y detectar picos de demanda en horarios punta.",
      variables: [
        { nombre: "P(t)", desc: "Potencia eléctrica demandada en el instante t (kW)" },
        { nombre: "Δt", desc: "Intervalo de muestreo del registrador (ej. cada 15 min)" },
      ],
    },
  };

  const actual = catalogoCapitulo4[carreraSeleccionada];

  return (
    <div className="p-3 border rounded bg-light">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h5 className="text-primary fw-bold mb-1">
            Capítulo 4: Interpolación, Derivación e Integración Numérica en la Ingeniería
          </h5>
          <p className="text-muted small mb-0">
            Aplicaciones de polinomios de Lagrange, diferencias finitas y cuadraturas numéricas en las 15 carreras de la FI UNAM.
          </p>
        </div>
      </div>

      {/* Selector Desplegable de Carreras */}
      <div className="row g-2 mb-3">
        <div className="col-md-6">
          <label htmlFor="selectCarreraCap4" className="form-label small fw-bold text-dark">
            Selecciona el Programa Académico:
          </label>
          <select
            id="selectCarreraCap4"
            className="form-select form-select-sm"
            value={carreraSeleccionada}
            onChange={(e) => setCarreraSeleccionada(e.target.value)}
          >
            {Object.keys(catalogoCapitulo4).map((key) => (
              <option key={key} value={key}>
                {catalogoCapitulo4[key].nombre}
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
                  Método Numérico Recomendado:
                </span>
                <span className="badge bg-secondary mb-2">{actual.metodoRecomendado}</span>
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

export default InterpolacionIntegracionFundamentosTab;