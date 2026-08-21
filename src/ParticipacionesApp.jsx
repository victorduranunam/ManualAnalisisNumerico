import React, { useState } from 'react';
import SesionActual from './pages/participaciones/SesionActual';
import HistoricoParticipaciones from './pages/participaciones/HistoricoParticipaciones';

export default function ParticipacionesApp() {
  const [vistaActual, setVistaActual] = useState('actual');

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <header className="bg-primary text-white py-3 px-3 shadow-sm">
        <div className="container">
          <h2 className="fw-bold mb-0 fs-4">
            <i className="bi bi-pencil-square me-2"></i>
            Control de Participaciones
          </h2>
        </div>
      </header>

      <nav className="navbar navbar-expand bg-white border-bottom shadow-sm">
        <div className="container">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <button
                className={`nav-link btn btn-link ${vistaActual === 'actual' ? 'active fw-bold text-primary' : 'text-secondary'}`}
                onClick={() => setVistaActual('actual')}
              >
                <i className="bi bi-clock-history me-1"></i> Sesión Actual
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link btn btn-link ${vistaActual === 'historico' ? 'active fw-bold text-primary' : 'text-secondary'}`}
                onClick={() => setVistaActual('historico')}
              >
                <i className="bi bi-journal-text me-1"></i> Histórico de Participaciones
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <main className="container flex-grow-1 my-4">
        {vistaActual === 'actual' && <SesionActual />}
        {vistaActual === 'historico' && <HistoricoParticipaciones />}
      </main>

      <footer className="bg-dark text-white text-center py-3 mt-auto">
        <small>© UNAM — Facultad de Ingeniería | Módulo de Registro de Participaciones</small>
      </footer>
    </div>
  );
}