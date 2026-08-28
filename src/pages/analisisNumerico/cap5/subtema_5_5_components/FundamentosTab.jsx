import React, { useState } from "react";

const EcuacionesDiferencialesFundamentosTab = () => {
  const [carreraSeleccionada, setCarreraSeleccionada] = useState("aeroespacial");

  const catalogoCapitulo5 = {
    aeroespacial: {
      nombre: "Ingeniería Aeroespacial",
      tema: "Trayectoria y Reentrada Atmosférica con Arrastre No Lineal",
      subtema: "5.3 Sistemas de EDOs: Runge-Kutta de 4to Orden (RK4)",
      metodoRecomendado: "RK4 para Sistemas de Ecuaciones Diferenciales Acopladas",
      colorBadge: "bg-primary",
      descripcion:
        "Simulación de la desaceleración, altitud y ángulo de vuelo de una cápsula espacial durante la reentrada atmosférica considerando densidad del aire variable.",
      modeloMatematico: "dv/dt = - (ρ(h) · v² · Cd · A) / (2·m) - g·sin(γ),    dh/dt = v·sin(γ)",
      justificacion:
        "El sistema es no lineal y altamente dependiente de la velocidad. RK4 proporciona alta precisión global O(h⁴) para calcular la disipación térmica sin inestabilidades de fase.",
      variables: [
        { nombre: "v(t), h(t)", desc: "Velocidad y altitud del vehículo espacial" },
        { nombre: "γ", desc: "Ángulo de la trayectoria de vuelo" },
        { nombre: "ρ(h)", desc: "Perfil de densidad atmosférica exponencial" },
      ],
    },
    civil: {
      nombre: "Ingeniería Civil",
      tema: "Deflexión de Vigas y Pandeo bajo Carga Lateral y Axial",
      subtema: "5.1 Diferencias finitas para EDO: Problemas de frontera (BVP)",
      metodoRecomendado: "Diferencias Finitas Centrales para Problemas de Frontera",
      colorBadge: "bg-success",
      descripcion:
        "Cálculo de la elástica y curva de deflexión y(x) en vigas continuas con apoyos simples y empotrados bajo la ecuación diferencial de Euler-Bernoulli.",
      modeloMatematico: "E·I · (d⁴y / dx⁴) = w(x)   →   (y_(i+2) - 4·y_(i+1) + 6·y_i - 4·y_(i-1) + y_(i-2)) / Δx⁴ = w_i / (E·I)",
      justificacion:
        "Es un problema con condiciones de frontera en ambos extremos (apoyos fijos y(0)=0, y(L)=0). La discretización genera un sistema de ecuaciones matricial pentadiagonal directo.",
      variables: [
        { nombre: "y(x)", desc: "Deflexión transversal de la viga en el punto x" },
        { nombre: "E·I", desc: "Rigidez a flexión del elemento estructural" },
        { nombre: "w(x)", desc: "Distribución de carga lateral aplicada" },
      ],
    },
    geomatica: {
      nombre: "Ingeniería Geomática",
      tema: "Determinación del Geoide: Ecuación Elíptica de Poisson / Laplace",
      subtema: "5.4 EDPs Elípticas por Diferencias Finitas",
      metodoRecomendado: "Diferencias Finitas en Malla 2D con Método de Sobrerrelajación (SOR)",
      colorBadge: "bg-info text-dark",
      descripcion:
        "Cálculo de las ondulaciones del geoide y anomalías de gravedad regional a partir de mediciones satelitales y gravimétricas terrestres.",
      modeloMatematico: "∇²V = (∂²V/∂x²) + (∂²V/∂y²) + (∂²V/∂z²) = - 4·π·G·ρ(x,y,z)",
      justificacion:
        "El potencial gravitatorio satisface la ecuación elíptica de Poisson en regiones con masa. La formulación de diferencias finitas en 5 puntos permite mapear el geoide en mallas geodésicas.",
      variables: [
        { nombre: "V(x,y,z)", desc: "Potencial gravitatorio terrestre (campo elíptico)" },
        { nombre: "G, ρ", desc: "Constante de gravitación y densidad cortical" },
      ],
    },
    ambiental: {
      nombre: "Ingeniería Ambiental",
      tema: "Cinética de Reactores Biológicos de Lodos Activados",
      subtema: "5.3 Sistemas de EDOs paso a paso (Euler / RK4)",
      metodoRecomendado: "Runge-Kutta 4to Orden (RK4)",
      colorBadge: "bg-success",
      descripcion:
        "Simulación del consumo de sustrato orgánico (S) y crecimiento de biomasa bacteriana (X) en plantas de tratamiento de aguas residuales.",
      modeloMatematico: "dX/dt = (μ_max · S / (Ks + S)) · X - kd · X,    dS/dt = - (1/Y) · (μ_max · S / (Ks + S)) · X",
      justificacion:
        "El acoplamiento no lineal entre biomasa y sustrato requiere esquemas temporales de orden superior para evitar la divergencia durante los picos de carga orgánica.",
      variables: [
        { nombre: "X(t), S(t)", desc: "Concentración de biomasa activa y sustrato orgánico" },
        { nombre: "μ_max, Ks", desc: "Parámetros cinéticos de Monod" },
      ],
    },
    electrica: {
      nombre: "Ing. Eléctrica Electrónica",
      tema: "Transitorios Electromagnéticos en Circuitos RLC no Lineales",
      subtema: "5.3 Sistemas de EDOs: Runge-Kutta de 4to orden",
      metodoRecomendado: "Método de Runge-Kutta de 4to Orden / Paso Adaptativo",
      colorBadge: "bg-warning text-dark",
      descripcion:
        "Respuesta transitoria de corriente y voltaje durante maniobras de apertura/cierre de interruptores con inductancias saturables.",
      modeloMatematico: "d i_L / dt = (1 / L(i)) · ( V_in(t) - R·i_L - v_C ),    d v_C / dt = i_L / C",
      justificacion:
        "Transformar la ecuación diferencial de segundo orden en un sistema de dos ecuaciones de primer orden desacopladas permite simular amortiguamientos subcríticos y sobretensiones.",
      variables: [
        { nombre: "i_L(t)", desc: "Corriente a través del inductor" },
        { nombre: "v_C(t)", desc: "Voltaje en bornes del capacitor" },
        { nombre: "L(i)", desc: "Inductancia no lineal dependiente de la corriente" },
      ],
    },
    computacion: {
      nombre: "Ingeniería en Computación",
      tema: "Simulación de Redes Neuronales Dinámicas y Modelos de Epidemias Digitales",
      subtema: "5.2 Métodos paso a paso: Euler vs Runge-Kutta",
      metodoRecomendado: "Método de Euler Modificado / Runge-Kutta 4to Orden",
      colorBadge: "bg-dark",
      descripcion:
        "Propagación de malware y gusanos en redes de servidores mediante sistemas dinámicos compartimentales tipo SIR (Susceptibles-Infectados-Recuperados).",
      modeloMatematico: "dS/dt = - β·S·I,    dI/dt = β·S·I - γ·I,    dR/dt = γ·I",
      justificacion:
        "Muestra de forma clara la superioridad de RK4 sobre Euler: Euler introduce errores acumulativos que generan poblaciones virtuales negativas si el paso de tiempo Δt no es infinitesimal.",
      variables: [
        { nombre: "S, I, R", desc: "Nodos susceptibles, infectados y parcheados/aislados" },
        { nombre: "β, γ", desc: "Tasa de contagio en la red y tasa de remediación" },
      ],
    },
    telecomunicaciones: {
      nombre: "Ing. en Telecomunicaciones",
      tema: "Distribución de Potencial Electrostático en Guías de Onda Coaxiales",
      subtema: "5.4 EDPs Elípticas: Ecuación de Laplace por Diferencias Finitas",
      metodoRecomendado: "Diferencias Finitas para la Ecuación de Laplace 2D (Esquema de 5 Puntos)",
      colorBadge: "bg-secondary",
      descripcion:
        "Cálculo del potencial eléctrico V(x, y) y líneas de campo electromagnético en secciones transversales complejas de guías de microondas.",
      modeloMatematico: "∂²V/∂x² + ∂²V/∂y² = 0   →   V_(i,j) = ( V_(i+1,j) + V_(i-1,j) + V_(i,j+1) + V_(i,j-1) ) / 4",
      justificacion:
        "Al ser una EDP elíptica con fronteras cerradas a potenciales fijos (conductores interno y externo), el método de diferencias finitas elíptico converge de manera estable a la solución única.",
      variables: [
        { nombre: "V(x, y)", desc: "Potencial eléctrico escalar en cada nodo de la guía" },
        { nombre: "Condiciones Dirichlet", desc: "Voltajes fijados en los conductores metálicos" },
      ],
    },
    geologica: {
      nombre: "Ingeniería Geológica",
      tema: "Flujo de Agua Subterránea en Acuíferos Confinados en Estado Estacionario",
      subtema: "5.4 EDPs Elípticas: Diferencias Finitas",
      metodoRecomendado: "Diferencias Finitas para Ecuaciones Elípticas Bidimensionales",
      colorBadge: "bg-danger",
      descripcion:
        "Modelado de la carga hidráulica h(x, y) y dirección de líneas de flujo en medios porosos con permeabilidad heterogénea.",
      modeloMatematico: "∂/∂x ( Kx · ∂h/∂x ) + ∂/∂y ( Ky · ∂h/∂y ) + W = 0",
      justificacion:
        "Representa la formulación canónica de flujo estacionario en hidrogeología. La discretización por celdas permite simular estratos con conductividades hidráulicas anisotrópicas.",
      variables: [
        { nombre: "h(x, y)", desc: "Carga piezométrica o nivel freático" },
        { nombre: "Kx, Ky", desc: "Conductividades hidráulicas del estrato rocoso" },
        { nombre: "W", desc: "Tasa de recarga o extracción por pozos" },
      ],
    },
    geofisica: {
      nombre: "Ingeniería Geofísica",
      tema: "Atenuación Sísmica y Respuesta de Acelerómetros Péndulares",
      subtema: "5.2 y 5.3 Métodos de paso a paso en EDOs de 2do Orden",
      metodoRecomendado: "Runge-Kutta 4to Orden (RK4)",
      colorBadge: "bg-primary",
      descripcion:
        "Respuesta dinámica del transductor inercial de un sismógrafo sometido a aceleraciones sísmicas del terreno a(t).",
      modeloMatematico: "d²x/dt² + 2·ξ·ω0·(dx/dt) + ω0²·x = - a_suelo(t)",
      justificacion:
        "La integración numérica de segundo orden mediante RK4 descompuesto captura fielmente la respuesta en frecuencia sin atenuación espuria ni distorsión de fase.",
      variables: [
        { nombre: "x(t)", desc: "Desplazamiento relativo de la masa sísmica" },
        { nombre: "ω0, ξ", desc: "Frecuencia propia y factor de amortiguamiento crítico" },
        { nombre: "a_suelo(t)", desc: "Registro de aceleración basal del terremoto" },
      ],
    },
    petrolera: {
      nombre: "Ingeniería Petrolera",
      tema: "Presión de Fondo Fluyendo en Pozos con Tubería de Producción",
      subtema: "5.1 Diferencias finitas para EDO / 5.2 Métodos paso a paso",
      metodoRecomendado: "Método de Paso a Paso de Runge-Kutta / Euler Predictor-Corrector",
      colorBadge: "bg-dark",
      descripcion:
        "Cálculo del gradiente de presión dP/dz a lo largo de la sarta de perforación o tubería de producción vertical con flujo multifásico (petróleo, gas y agua).",
      modeloMatematico: "dP/dz = ρ_mezcla(P) · g · sin(θ) + (f · ρ_mezcla · v²) / (2·D)",
      justificacion:
        "La densidad y velocidad del fluido varían con la profundidad z debido a la despresurización del gas; la integración paso a paso desde el cabezal hacia el fondo del pozo determina el perfil de presión.",
      variables: [
        { nombre: "P(z)", desc: "Presión hidrostática/friccional a la profundidad z" },
        { nombre: "ρ_mezcla(P)", desc: "Densidad efectiva dependiente de la presión y relación gas-aceite" },
      ],
    },
    minas: {
      nombre: "Ing. de Minas y Metalurgia",
      tema: "Lixiviación de Minerales en Pilas: Difusión y Reacción Heterogénea",
      subtema: "5.1 EDO Problemas de frontera (BVP)",
      metodoRecomendado: "Diferencias Finitas para Problemas de Valor en la Frontera (BVP)",
      colorBadge: "bg-secondary",
      descripcion:
        "Perfil radial de concentración del reactivo lixiviante (ácido sulfúrico o cianuro) dentro de una partícula esférica de mineral (Modelo de Núcleo Sin Reaccionar).",
      modeloMatematico: "(d²C / dr²) + (2/r)·(dC/dr) - (k/De)·C = 0   con C(R) = C_superficie,  dC/dr(0) = 0",
      justificacion:
        "Las condiciones de frontera están definidas en el centro de la partícula (simetría) y en la superficie exterior, resolviéndose mediante diferencias finitas con matriz tridiagonal.",
      variables: [
        { nombre: "C(r)", desc: "Concentración del agente lixiviante al radio r" },
        { nombre: "De", desc: "Difusividad efectiva del reactivo en la roca porosa" },
        { nombre: "k", desc: "Constante cinética de disolución superficial" },
      ],
    },
    biomedicos: {
      nombre: "Sistemas Biomédicos",
      tema: "Generación del Potencial de Acción Cardíaco y Neuronal (Hodgkin-Huxley)",
      subtema: "5.3 Sistemas de EDOs: Métodos de paso a paso",
      metodoRecomendado: "Runge-Kutta 4to Orden / Esquema Implícito Stiff",
      colorBadge: "bg-danger",
      descripcion:
        "Modelado de la despolarización de la membrana celular y conducción del impulso nervioso mediante el flujo de iones de Na⁺, K⁺ y canales de fuga.",
      modeloMatematico: "C_m · (dV/dt) = I_estimulo - g_Na·m³·h·(V - E_Na) - g_K·n⁴·(V - E_K) - g_L·(V - E_L)",
      justificacion:
        "Sistema de 4 ecuaciones diferenciales no lineales fuertemente acopladas. RK4 permite modelar con precisión los picos de voltaje del potencial de acción.",
      variables: [
        { nombre: "V(t)", desc: "Potencial de membrana transcelular (mV)" },
        { nombre: "m, h, n", desc: "Variables de compuerta de probabilidad iónica (EDOs auxiliares)" },
        { nombre: "C_m", desc: "Capacitancia eléctrica de la bicapa lipídica" },
      ],
    },
    mecanica: {
      nombre: "Ingeniería Mecánica",
      tema: "Dinámica No Lineal: Péndulo Doble y Sistemas Caóticos",
      subtema: "5.3 Sistemas de EDOs paso a paso: RK4",
      metodoRecomendado: "Método de Runge-Kutta 4to Orden (RK4)",
      colorBadge: "bg-primary",
      descripcion:
        "Simulación de la trayectoria caótica de sistemas biomecánicos y brazos robóticos articulados sin linealizar ángulos pequeños.",
      modeloMatematico: "dθ1/dt = ω1,    dω1/dt = f1(θ1, θ2, ω1, ω2),    dθ2/dt = ω2,    dω2/dt = f2(θ1, θ2, ω1, ω2)",
      justificacion:
        "Al ser un sistema altamente caótico y sensible a las condiciones iniciales, métodos de primer orden (Euler) divergen casi instantáneamente, requiriendo esquemas de alto orden como RK4.",
      variables: [
        { nombre: "θ1, θ2", desc: "Ángulos articulares de los eslabones" },
        { nombre: "ω1, ω2", desc: "Velocidades angulares instantáneas" },
      ],
    },
    mecatronica: {
      nombre: "Ingeniería Mecatrónica",
      tema: "Control de Posición de Servomotores DC con Carga Inercial",
      subtema: "5.3 Sistemas de EDOs: Euler vs RK4 en Simulación HIL",
      metodoRecomendado: "Runge-Kutta 4to Orden (Simulación) / Euler (Ejecución en Microcontrolador)",
      colorBadge: "bg-info text-dark",
      descripcion:
        "Modelado de las ecuaciones acopladas eléctrica y mecánica de un actuador mecatrónico sujeto a fricción viscosa y par de carga.",
      modeloMatematico: "L · (di/dt) + R·i = V_control - Ke·ω,    J · (dω/dt) + B·ω = Kt·i - T_carga",
      justificacion:
        "Permite contrastar el modelado continuo en simulación (RK4) frente a la discretización en tiempo discreto necesaria para implementar el lazo de control digital en microcontroladores.",
      variables: [
        { nombre: "i(t), ω(t)", desc: "Corriente de armadura y velocidad angular del rotor" },
        { nombre: "J, B", desc: "Momento de inercia y coeficiente de fricción viscosa" },
        { nombre: "Kt, Ke", desc: "Constantes de par motor y fuerza contraelectromotriz" },
      ],
    },
    industrial: {
      nombre: "Ingeniería Industrial",
      tema: "Dinámica de Sistemas en Cadenas de Suministro (Efecto Látigo / Bullwhip)",
      subtema: "5.2 Métodos paso a paso: Euler y Runge-Kutta",
      metodoRecomendado: "Método de Euler Modificado / RK4 en Dinámica de Sistemas",
      colorBadge: "bg-success",
      descripcion:
        "Modelado continuo de niveles de inventario, tasas de producción y desfases en órdenes de compra frente a fluctuaciones en la demanda del mercado.",
      modeloMatematico: "d I(t) / dt = Tasa_Produccion(t - τ) - Demanda_Clientes(t)",
      justificacion:
        "El retardo en la información (τ) genera oscilaciones e inestabilidades; el análisis temporal mediante métodos paso a paso permite diseñar amortiguadores de inventario.",
      variables: [
        { nombre: "I(t)", desc: "Nivel de inventario disponible en el almacén" },
        { nombre: "τ", desc: "Tiempo de retraso en reabastecimiento (Lead time)" },
      ],
    },
  };

  const actual = catalogoCapitulo5[carreraSeleccionada];

  return (
    <div className="p-3 border rounded bg-light">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h5 className="text-primary fw-bold mb-1">
            Capítulo 5: Ecuaciones Diferenciales Ordinarias y Parciales en la Ingeniería
          </h5>
          <p className="text-muted small mb-0">
            Problemas de frontera (BVP), métodos paso a paso (Euler/RK4), sistemas acoplados y EDPs elípticas en las 15 carreras de la FI UNAM.
          </p>
        </div>
      </div>

      {/* Selector Desplegable de Carreras */}
      <div className="row g-2 mb-3">
        <div className="col-md-6">
          <label htmlFor="selectCarreraCap5" className="form-label small fw-bold text-dark">
            Selecciona el Programa Académico:
          </label>
          <select
            id="selectCarreraCap5"
            className="form-select form-select-sm"
            value={carreraSeleccionada}
            onChange={(e) => setCarreraSeleccionada(e.target.value)}
          >
            {Object.keys(catalogoCapitulo5).map((key) => (
              <option key={key} value={key}>
                {catalogoCapitulo5[key].nombre}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tarjeta de Detalle del Modelo Diferencial */}
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

export default EcuacionesDiferencialesFundamentosTab;