import React from 'react';

export const Subtema1_2 = () => {
  return (
    <div>
      <span className="badge bg-primary mb-2">Subtema 1.2</span>
      <h3 className="fw-bold text-dark">1.2 Tipos de Errores: Absoluto y Relativo</h3>
      <hr />
      <p className="lead text-secondary">
        En el análisis numérico es fundamental cuantificar la discrepancia entre el valor verdadero de una cantidad y su valor aproximado.
      </p>

      <div className="row g-3 my-3">
        <div className="col-md-6">
          <div className="p-3 border rounded bg-light border-start border-4 border-primary">
            <h6 className="fw-bold text-primary">Error Absoluto</h6>
            <p className="small text-muted mb-0">
              Es la diferencia absoluta entre el valor real y el valor aproximado.
            </p>
          </div>
        </div>
        <div className="col-md-6">
          <div className="p-3 border rounded bg-light border-start border-4 border-info">
            <h6 className="fw-bold text-info">Error Relativo</h6>
            <p className="small text-muted mb-0">
              Es el cociente entre el error absoluto y el valor verdadero (frecuentemente expresado en porcentaje).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ➔ ESTA LÍNEA ES LA QUE RESUELVE EL SYNTAXERROR:
export default Subtema1_2;