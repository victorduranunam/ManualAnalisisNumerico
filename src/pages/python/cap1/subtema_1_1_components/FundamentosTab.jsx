import React from "react";

const FundamentosTab = () => {
  return (
    <div className="p-3">
      <h5 className="text-primary fw-bold mb-3">
        <i className="bi bi-book me-2"></i>
        Fundamentos 
      </h5>

      <p className="mb-3">
        Python es un lenguaje de programación de alto nivel, interpretado y de código abierto (Open Source). 
        Una de sus principales ventajas es que es <strong>multiplataforma</strong>, lo que permite ejecutar un mismo programa en diferentes sistemas operativos como Windows, macOS y Linux.
      </p>

      <p className="mb-3">
        Gracias a su sintaxis sencilla y fácil de comprender, Python se ha convertido en uno de los lenguajes de programación más utilizados en la actualidad. Su facilidad de aprendizaje permite que el usuario dedique más tiempo a la resolución de problemas que a la complejidad propia de la sintaxis. Por esta razón, en este manual interactivo se utilizará Python como herramienta principal para implementar los métodos del análisis numérico desarrollados en cada capítulo.
      </p>

      {/* Tarjeta de Origen del lenguaje con texto uniforme */}
      <div className="p-3 bg-light rounded border-start border-4 border-warning my-4 shadow-sm">
        <h6 className="fw-bold text-dark mb-2">
          <i className="bi bi-info-circle-fill text-warning me-2"></i>
          Origen del lenguaje
        </h6>
        <p className="mb-0">
          Este lenguaje fue creado por <strong>Guido van Rossum</strong> en los Países Bajos. Van Rossum, licenciado en matemáticas y computación, desarrolló Python como un proyecto personal durante las vacaciones navideñas de 1989, basándose en el lenguaje ABC, y presentó la primera versión a sus colegas a principios de 1991. El nombre del lenguaje proviene de uno de sus programas de televisión favoritos: <em>Monty Python's Flying Circus</em>.
        </p>
      </div>
    </div>
  );
};

export default FundamentosTab;