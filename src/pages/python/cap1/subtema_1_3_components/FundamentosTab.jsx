import React from "react";

const FundamentosTab = () => {
  return (
    <div className="p-3">
      <h5 className="text-primary fw-bold mb-3">
        <i className="bi bi-book me-2"></i>
        Fundamentos 
      </h5>

      <p className="mb-3">
        La fortaleza de Python en el análisis numérico radica en su capacidad para incorporar bibliotecas desarrolladas por una amplia comunidad de investigadores y programadores. Estas herramientas proporcionan funciones optimizadas para realizar cálculos matemáticos, operaciones matriciales, álgebra lineal, optimización, integración numérica y visualización de resultados, evitando la necesidad de programar algoritmos de alta complejidad desde cero.
      </p>

      <p className="mb-3">
        Entre las bibliotecas más utilizadas destaca <strong>NumPy</strong>, pilar fundamental del cálculo científico. Esta librería permite trabajar de manera eficiente con arreglos multidimensionales y matrices, ofreciendo una sintaxis cercana a la de entornos como MATLAB, lo que facilita la transición a los estudiantes.
      </p>

      {/* Tarjeta con lista de librerías esenciales */}
      <div className="card border-0 bg-light p-3 my-4 shadow-sm">
        <h6 className="fw-bold text-dark mb-2">
          <i className="bi bi-box-seam text-success me-2"></i>
          Otras bibliotecas esenciales del ecosistema:
        </h6>
        <ul className="mb-0 ps-3">
          <li className="mb-2">
            <strong>SciPy:</strong> Orientada a métodos numéricos y cálculo científico avanzado.
          </li>
          <li className="mb-2">
            <strong>Matplotlib:</strong> Dedicada a la generación de gráficos y visualización de datos.
          </li>
          <li className="mb-0">
            <strong>Pandas:</strong> Especializada en la manipulación y procesamiento de estructuras de datos.
          </li>
        </ul>
      </div>

      <p className="mb-4">
        Gracias a este ecosistema, la adopción de Python en universidades, centros de investigación y empresas tecnológicas lo ha consolidado como el estándar para la implementación de métodos numéricos en ingeniería y ciencias aplicadas.
      </p>

      {/* Alerta / Nota del Manual */}
      <div className="alert alert-info border-0 shadow-sm mb-0">
        <div className="d-flex align-items-center mb-1">
          <i className="bi bi-bookmark-check-fill fs-5 me-2 text-info"></i>
          <strong className="text-dark">Nota del Manual</strong>
        </div>
        <p className="mb-0">
          A lo largo de este manual, el objetivo no será dominar el lenguaje a nivel experto, sino utilizarlo como una herramienta práctica para comprender, analizar e implementar los procedimientos matemáticos estudiados, facilitando su aplicación en la solución de problemas reales.
        </p>
      </div>
    </div>
  );
};

export default FundamentosTab;