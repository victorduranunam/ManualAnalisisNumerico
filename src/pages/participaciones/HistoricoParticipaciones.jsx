import React from 'react';

export default function HistoricoParticipaciones() {
  return (
    <div className="card shadow-sm border-0 p-4">
      <h3 className="fw-bold mb-3 text-dark">
        <i className="bi bi-archive me-2 text-primary"></i>
        Histórico de Participaciones
      </h3>
      <p className="text-muted">
        Consulta de participaciones acumuladas en sesiones anteriores.
      </p>
    </div>
  );
}