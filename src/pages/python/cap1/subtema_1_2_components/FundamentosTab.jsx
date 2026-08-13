import React from "react";

const FundamentosTab = () => {
  return (
    <div className="p-3">
      <h5 className="text-primary fw-bold mb-3">
        <i className="bi bi-book me-2"></i>
        Fundamentos 
      </h5>

      <p className="mb-3">
        Con el crecimiento de la comunidad de desarrolladores, fue necesario establecer principios que garantizaran que la evolución del lenguaje conservara su sencillez y facilidad de uso. Estos principios, que dieron origen a la filosofía de Python, se resumen en las siguientes características:
      </p>

      {/* Lista de principios con tarjetas o íconos Bootstrap */}
      <div className="row g-3 my-3">
        <div className="col-md-6">
          <div className="p-3 border rounded bg-light h-100">
            <div className="fw-bold text-dark mb-1">
              <i className="bi bi-lightning-charge-fill text-warning me-2"></i>
              Intuitivo y Accesible
            </div>
            <p className="mb-0">
              Ser intuitivo y accesible, sin sacrificar potencia ni flexibilidad.
            </p>
          </div>
        </div>

        <div className="col-md-6">
          <div className="p-3 border rounded bg-light h-100">
            <div className="fw-bold text-dark mb-1">
              <i className="bi bi-eye-fill text-primary me-2"></i>
              Sintaxis Clara
            </div>
            <p className="mb-0">
              Mantener una sintaxis clara, facilitando la lectura y el mantenimiento del código.
            </p>
          </div>
        </div>

        <div className="col-md-6">
          <div className="p-3 border rounded bg-light h-100">
            <div className="fw-bold text-dark mb-1">
              <i className="bi bi-code-slash text-success me-2"></i>
              Software Libre
            </div>
            <p className="mb-0">
              Permanecer como software libre y de código abierto, permitiendo la colaboración global.
            </p>
          </div>
        </div>

        <div className="col-md-6">
          <div className="p-3 border rounded bg-light h-100">
            <div className="fw-bold text-dark mb-1">
              <i className="bi bi-diagram-3-fill text-info me-2"></i>
              Desarrollo Rápido
            </div>
            <p className="mb-0">
              Favorecer el desarrollo rápido de programas y prototipos para resolver problemas científicos, técnicos y cotidianos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundamentosTab;