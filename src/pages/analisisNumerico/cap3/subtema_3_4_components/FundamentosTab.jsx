import React, { useState } from "react";

const SistemasLinealesFundamentosTab = () => {
  const [carreraSeleccionada, setCarreraSeleccionada] = useState("aeroespacial");

  const catalogoSistemas = {
    aeroespacial: {
      nombre: "Ingeniería Aeroespacial",
      tema: "Modos de Flameo (Flutter) y Estabilidad Aeroelástica",
      subtema: "3.3 Método de las potencias / Valores propios",
      metodoRecomendado: "Método de las Potencias Inversas con Desplazamiento",
      colorBadge: "bg-primary",
      descripcion:
        "Cálculo de las velocidades críticas y frecuencias resonantes donde las fuerzas aerodinámicas y la elasticidad del ala provocan oscilaciones destructivas.",
      modeloMatricial: "[ M^-1 · K ] · v = λ · v   (donde λ = ω² representa la frecuencia modal)",
      justificacion:
        "El método de las potencias extrae de forma iterativa el valor propio dominante que corresponde al modo flutter primario sin calcular el polinomio característico.",
      variables: [
        { nombre: "M, K", desc: "Matrices globales de masa y rigidez del perfil alar" },
        { nombre: "λ, ω", desc: "Valor propio y frecuencia natural acoplada" },
        { nombre: "v", desc: "Vector propio (modo de flexión-torsión)" },
      ],
    },
    civil: {
      nombre: "Ingeniería Civil",
      tema: "Análisis Matricial de Estructuras y Armaduras Hiperestáticas",
      subtema: "3.1 Eliminación Gaussiana y Descomposición LU",
      metodoRecomendado: "Factorización Cholesky / Descomposición LU",
      colorBadge: "bg-success",
      descripcion:
        "Resolución de desplazamientos nodales en marcos y armaduras tridimensionales sometidas a combinaciones de carga viva, muerta y sismo.",
      modeloMatricial: "[ K ] · { u } = { F }   →   [ L ][ U ] · { u } = { F }",
      justificacion:
        "La matriz de rigidez K es simétrica y bandeada. Factorizar K una sola vez en L y U permite evaluar múltiples hipótesis de carga {F} mediante sustitución simple.",
      variables: [
        { nombre: "[ K ]", desc: "Matriz global de rigidez estructural" },
        { nombre: "{ u }", desc: "Vector de desplazamientos y giros nodales (incógnita)" },
        { nombre: "{ F }", desc: "Vector de fuerzas nodales equivalentes" },
      ],
    },
    geomatica: {
      nombre: "Ingeniería Geomática",
      tema: "Ajuste de Redes Geodésicas por Ecuaciones Normales de Gauss",
      subtema: "3.1 Eliminación Gaussiana con Pivoteo Parcial",
      metodoRecomendado: "Eliminación Gaussiana con Pivoteo Escalonado / LU",
      colorBadge: "bg-info text-dark",
      descripcion:
        "Compensación rigurosa de poligonales topográficas y redes GNSS sobre-determinadas para minimizar el error cuadrático medio de cierre.",
      modeloMatricial: "[ A^T · P · A ] · { x } = [ A^T · P ] · { l }",
      justificacion:
        "El pivoteo parcial previene la pérdida de cifras significativas debido a las grandes diferencias de escala entre distancias métricas y ángulos en radianes.",
      variables: [
        { nombre: "[ A ]", desc: "Matriz de diseño geométrica" },
        { nombre: "[ P ]", desc: "Matriz diagonal de pesos de las observaciones" },
        { nombre: "{ x }", desc: "Correcciones a las coordenadas preliminares" },
      ],
    },
    ambiental: {
      nombre: "Ingeniería Ambiental",
      tema: "Balance de Materia Multicompartimental en Lagos Interconectados",
      subtema: "3.2 Métodos iterativos: Jacobi y Gauss-Seidel",
      metodoRecomendado: "Gauss-Seidel con Relajación (SOR)",
      colorBadge: "bg-success",
      descripcion:
        "Determinación de la concentración en estado estacionario de metales pesados o contaminantes en redes hidrológicas con múltiples entradas y salidas.",
      modeloMatricial: "[ Q_ij + k_i · V_i ] · { C_i } = { W_i }   (Sistema estrictamente diagonal dominante)",
      justificacion:
        "Los balances de conservación de masa generan matrices con estricta dominancia diagonal, asegurando convergencia monótona y rápida en Gauss-Seidel.",
      variables: [
        { nombre: "{ C_i }", desc: "Vector de concentraciones estables en cada celda/lago" },
        { nombre: "Q_ij", desc: "Matriz de caudales de interconexión" },
        { nombre: "W_i", desc: "Tasa de carga másica de contaminante externo" },
      ],
    },
    electrica: {
      nombre: "Ing. Eléctrica Electrónica",
      tema: "Análisis Nodal de Redes Eléctricas de Gran Escala",
      subtema: "3.1 Descomposición LU / 3.2 Gauss-Seidel",
      metodoRecomendado: "Descomposición LU rala (Sparse LU) / Gauss-Seidel",
      colorBadge: "bg-warning text-dark",
      descripcion:
        "Cálculo de los potenciales en los nodos de circuitos lineales con cientos de ramas pasivas e interconexiones.",
      modeloMatricial: "[ Y_bus ] · { V } = { I_fuentes }",
      justificacion:
        "La matriz de admitancias Y_bus es altamente dispersa (esparsa). El almacenamiento compacto y factorización directa optimizan la memoria y evitan operaciones con ceros.",
      variables: [
        { nombre: "[ Y_bus ]", desc: "Matriz de admitancias nodales" },
        { nombre: "{ V }", desc: "Vector de voltajes nodales (incógnita)" },
        { nombre: "{ I }", desc: "Vector de inyecciones de corriente" },
      ],
    },
    computacion: {
      nombre: "Ingeniería en Computación",
      tema: "Algoritmo PageRank y Modelado de Cadenas de Markov",
      subtema: "3.3 Método de las potencias",
      metodoRecomendado: "Método de las Potencias para Matrices Estocásticas",
      colorBadge: "bg-dark",
      descripcion:
        "Cálculo del vector de relevancia e importancia de páginas web en grafos masivos indexados mediante la distribución estacionaria.",
      modeloMatricial: "p_(k+1) = [ d · M + ((1 - d)/N) · E ] · p_k   →   A · p = 1 · p",
      justificacion:
        "Por el Teorema de Perron-Frobenius, el valor propio dominante es λ = 1. El método de las potencias es el único viable para matrices con miles de millones de nodos.",
      variables: [
        { nombre: "[ M ]", desc: "Matriz estocástica de transición de hipervínculos" },
        { nombre: "d", desc: "Factor de amortiguamiento (Damping factor ≈ 0.85)" },
        { nombre: "{ p }", desc: "Vector de rango/probabilidad de estado estacionario" },
      ],
    },
    telecomunicaciones: {
      nombre: "Ing. en Telecomunicaciones",
      tema: "Detección Multiusuario en Sistemas MIMO Masivo",
      subtema: "3.1 Descomposición LU / Inversión de Matrices",
      metodoRecomendado: "Precodificación Zero-Forcing vía Descomposición LU",
      colorBadge: "bg-secondary",
      descripcion:
        "Separación y desacoplamiento espacial de flujos de datos transmitidos simultáneamente por arreglos de antenas en 5G/6G.",
      modeloMatricial: "{ x_estimado } = ( [ H^H · H ] )^-1 · [ H^H ] · { y }",
      justificacion:
        "La resolución del sistema lineal de ecualización en tiempo real requiere algoritmos eficientes en hardware que minimicen el retardo en microsegundos.",
      variables: [
        { nombre: "[ H ]", desc: "Matriz de respuesta del canal inalámbrico" },
        { nombre: "{ y }", desc: "Vector de símbolos recibidos con interferencia" },
        { nombre: "{ x }", desc: "Vector de símbolos transmitidos recuperados" },
      ],
    },
    geologica: {
      nombre: "Ingeniería Geológica",
      tema: "Tensor de Esfuerzos y Deformaciones Principales en Macizos Rocosos",
      subtema: "3.3 Método de las potencias / Valores propios",
      metodoRecomendado: "Método de las Potencias con Deflación de Hotelling",
      colorBadge: "bg-danger",
      descripcion:
        "Cálculo de las magnitudes y orientaciones de los esfuerzos principales (σ1, σ2, σ3) para predecir planos de falla tectónica.",
      modeloMatricial: "[ σ_tensor ] · { n } = σ_principal · { n }",
      justificacion:
        "El método de las potencias halla el esfuerzo principal mayor σ1; tras aplicar deflación, extrae sucesivamente σ2 y σ3 con sus vectores unitarios directores.",
      variables: [
        { nombre: "[ σ ]", desc: "Tensor simétrico de esfuerzos 3x3 en el punto" },
        { nombre: "σ_principal", desc: "Esfuerzos principales (valores propios)" },
        { nombre: "{ n }", desc: "Cosenos directores del plano de falla (vectores propios)" },
      ],
    },
    geofisica: {
      nombre: "Ingeniería Geofísica",
      tema: "Inversión Geofísica Linealizada y Tomografía de Resistividad",
      subtema: "3.1 Eliminación Gaussiana / Regularización Lineal",
      metodoRecomendado: "Factorización LU con Regularización de Tikhonov",
      colorBadge: "bg-primary",
      descripcion:
        "Reconstrucción del modelo de resistividades eléctricas del subsuelo a partir de mediciones de diferencia de potencial en superficie.",
      modeloMatricial: "[ J^T · J + λ · W^T · W ] · { Δm } = [ J^T ] · { Δd }",
      justificacion:
        "El sistema normal regularizado convierte un problema mal condicionado en un sistema estrictamente simétrico y definido positivo.",
      variables: [
        { nombre: "[ J ]", desc: "Matriz Jacobiana de sensibilidades" },
        { nombre: "{ Δm }", desc: "Vector de perturbaciones al modelo geológico" },
        { nombre: "{ Δd }", desc: "Vector de residuales de datos de campo" },
      ],
    },
    petrolera: {
      nombre: "Ingeniería Petrolera",
      tema: "Simulación de Flujo Monofásico/Bifásico en Mallas de Yacimientos",
      subtema: "3.2 Métodos iterativos: Jacobi y Gauss-Seidel",
      metodoRecomendado: "Gauss-Seidel por Bloques / LSOR (Line Successive Over-Relaxation)",
      colorBadge: "bg-dark",
      descripcion:
        "Cálculo de la distribución de presiones en celdas tridimensionales de un reservorio bajo la ecuación de difusividad del flujo en medios porosos.",
      modeloMatricial: "[ T ] · { P^(n+1) } = { B }   (Matriz heptadiagonal de transmisibilidades)",
      justificacion:
        "Las discretizaciones 3D generan millones de incógnitas. Los métodos iterativos por bloques convergen rápidamente aprovechando la estructura pentadiagonal/heptadiagonal.",
      variables: [
        { nombre: "[ T ]", desc: "Matriz de transmisibilidad entre bloques de yacimiento" },
        { nombre: "{ P }", desc: "Vector de presiones en cada bloque en el paso n+1" },
        { nombre: "{ B }", desc: "Términos de acumulación y pozos productores/inyectores" },
      ],
    },
    minas: {
      nombre: "Ing. de Minas y Metalurgia",
      tema: "Balance Metalúrgico de Materia en Circuitos de Flotación y Molienda",
      subtema: "3.1 Eliminación Gaussiana con Sustitución Regresiva",
      metodoRecomendado: "Descomposición LU",
      colorBadge: "bg-secondary",
      descripcion:
        "Determinación de los flujos másicos y recuperación de concentrados en plantas de beneficio mineral con múltiples etapas de separación.",
      modeloMatricial: "[ A_leyes ] · { F_flujos } = { Entradas_mineral }",
      justificacion:
        "El sistema de balances de sólidos y finos por especie química es denso y de orden moderado, ideal para solución exacta directa mediante LU.",
      variables: [
        { nombre: "[ A_leyes ]", desc: "Matriz de concentraciones de especies (Cu, Fe, Au)" },
        { nombre: "{ F }", desc: "Vector de flujos másicos por tubería/celda" },
      ],
    },
    biomedicos: {
      nombre: "Sistemas Biomédicos",
      tema: "Modelado Compartimental de Transporte Farmacocinético",
      subtema: "3.3 Método de las potencias / Valores propios",
      metodoRecomendado: "Método de las Potencias para Modos de Eliminación",
      colorBadge: "bg-danger",
      descripcion:
        "Análisis de las tasas de absorción, distribución y depuración de anestésicos o radiofármacos entre órganos vitales, sangre y tejido adiposo.",
      modeloMatricial: "d{ C }/dt = [ K_tasas ] · { C }   →   [ K ] · v = λ · v",
      justificacion:
        "Las constantes de decaimiento del sistema continuo corresponden a los valores propios de la matriz de transferencia de masa entre órganos.",
      variables: [
        { nombre: "[ K_tasas ]", desc: "Matriz de coeficientes de transferencia interdepartamental" },
        { nombre: "λ", desc: "Tasa de aclaramiento metabólico dominante" },
        { nombre: "{ C }", desc: "Concentración del fármaco en cada compartimento" },
      ],
    },
    mecanica: {
      nombre: "Ingeniería Mecánica",
      tema: "Transferencia de Calor Bidimensional en Estado Estacionario",
      subtema: "3.2 Métodos iterativos: Jacobi y Gauss-Seidel",
      metodoRecomendado: "Método de Gauss-Seidel (Discretización de Laplace)",
      colorBadge: "bg-primary",
      descripcion:
        "Cálculo del perfil térmico en placas disipadoras, aletas de enfriamiento o componentes de motores mediante diferencias finitas.",
      modeloMatricial: "T_(i,j) = ( T_(i+1,j) + T_(i-1,j) + T_(i,j+1) + T_(i,j-1) ) / 4",
      justificacion:
        "La ecuación de Laplace discretizada genera matrices con fuerte dominancia diagonal donde Gauss-Seidel actualiza temperaturas *in situ* ahorrando memoria.",
      variables: [
        { nombre: "T_(i,j)", desc: "Temperatura en el nodo espacial (i, j)" },
        { nombre: "Condiciones de frontera", desc: "Temperaturas fijas (Dirichlet) o flujos aislados (Neumann)" },
      ],
    },
    mecatronica: {
      nombre: "Ingeniería Mecatrónica",
      tema: "Estimación de Estado y Filtro de Kalman en Robótica Móvil",
      subtema: "3.1 Descomposición LU / Inversión Matricial",
      metodoRecomendado: "Factorización Cholesky / LU en la Ganancia de Kalman",
      colorBadge: "bg-info text-dark",
      descripcion:
        "Fusión sensorial (IMU, Odometría, LiDAR) en tiempo real para estimar la pose y velocidad de un robot autónomo móvil.",
      modeloMatricial: "[ K_kalman ] = [ P_pred · H^T ] · ( [ H · P_pred · H^T + R ] )^-1",
      justificacion:
        "La matriz de covarianza residual en el denominador es simétrica y definida positiva; descomponerla eficientemente evita singularidades numéricas en cada ciclo de control.",
      variables: [
        { nombre: "[ K_kalman ]", desc: "Matriz de ganancia de corrección del filtro" },
        { nombre: "[ P ]", desc: "Matriz de covarianza del error de estimación" },
        { nombre: "[ R ]", desc: "Matriz de covarianza de ruido en los sensores" },
      ],
    },
    industrial: {
      nombre: "Ingeniería Industrial",
      tema: "Modelo Insumo-Producto de Leontief para Redes Económicas",
      subtema: "3.1 Eliminación Gaussiana y Descomposición LU",
      metodoRecomendado: "Descomposición LU",
      colorBadge: "bg-success",
      descripcion:
        "Determinación del nivel de producción total intersectorial necesario para satisfacer variaciones en la demanda final de bienes de consumo.",
      modeloMatricial: "[ I - A ] · { X } = { D }",
      justificacion:
        "Al factorizar [ I - A ] en L y U, los analistas pueden proyectar rápidamente la producción requerida {X} ante múltiples escenarios de demanda futura {D}.",
      variables: [
        { nombre: "[ A ]", desc: "Matriz de coeficientes técnicos de insumo-producto" },
        { nombre: "[ I ]", desc: "Matriz identidad de dimensiones sectoriales" },
        { nombre: "{ X }", desc: "Vector de producción bruta total por sector" },
        { nombre: "{ D }", desc: "Vector de demanda final externa" },
      ],
    },
  };

  const actual = catalogoSistemas[carreraSeleccionada];

  return (
    <div className="p-3 border rounded bg-light">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h5 className="text-primary fw-bold mb-1">
            Capítulo 3: Sistemas de Ecuaciones Lineales y Valores Propios en la Ingeniería
          </h5>
          <p className="text-muted small mb-0">
            Casos prácticos de aplicación de métodos directos, iterativos y espectrales en las 15 ramas de la FI UNAM.
          </p>
        </div>
      </div>

      {/* Selector Desplegable de Carreras */}
      <div className="row g-2 mb-3">
        <div className="col-md-6">
          <label htmlFor="selectCarreraSistemas" className="form-label small fw-bold text-dark">
            Selecciona el Programa Académico:
          </label>
          <select
            id="selectCarreraSistemas"
            className="form-select form-select-sm"
            value={carreraSeleccionada}
            onChange={(e) => setCarreraSeleccionada(e.target.value)}
          >
            {Object.keys(catalogoSistemas).map((key) => (
              <option key={key} value={key}>
                {catalogoSistemas[key].nombre}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tarjeta de Detalle del Sistema Lineal */}
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
            {actual.modeloMatricial}
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
                  Variables y Estructuras Matriciales:
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

export default SistemasLinealesFundamentosTab;