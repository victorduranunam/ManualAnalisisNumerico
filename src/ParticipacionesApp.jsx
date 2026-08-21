import React, { useState } from 'react';
import SesionActual from './pages/participaciones/SesionActual';
import HistoricoParticipaciones from './pages/participaciones/HistoricoParticipaciones';
import AdminParticipaciones from './pages/participaciones/AdminParticipaciones';

export default function ParticipacionesApp() {
  const [vistaActual, setVistaActual] = useState('actual');
  const [autenticado, setAutenticado] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [errorPassword, setErrorPassword] = useState(false);

  // Clave de acceso para ingresar al panel docente
  const CLAVE_ADMIN = 'UNAM2026';

  const handleAccesoAdmin = (e) => {
    e.preventDefault();
    if (passwordInput === CLAVE_ADMIN) {
      setAutenticado(true);
      setErrorPassword(false);
      setPasswordInput('');
    } else {
      setErrorPassword(true);
    }
  };

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
                className={`nav-link btn btn-link ${
                  vistaActual === 'actual' ? 'active fw-bold text-primary' : 'text-secondary'
                }`}
                onClick={() => setVistaActual('actual')}
              >
                <i className="bi bi-clock-history me-1"></i> Sesión Actual
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link btn btn-link ${
                  vistaActual === 'historico' ? 'active fw-bold text-primary' : 'text-secondary'
                }`}
                onClick={() => setVistaActual('historico')}
              >
                <i className="bi bi-journal-text me-1"></i> Histórico de Participaciones
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link btn btn-link ${
                  vistaActual === 'admin' ? 'active fw-bold text-danger' : 'text-secondary'
                }`}
                onClick={() => setVistaActual('admin')}
              >
                <i className="bi bi-shield-lock me-1"></i> Administración
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <main className="container flex-grow-1 my-4">
        {/* 1. Vista Pública: Registro de la Sesión Actual */}
        {vistaActual === 'actual' && <SesionActual />}

        {/* 2. Vista Pública: Consulta por Número de Cuenta */}
        {vistaActual === 'historico' && <HistoricoParticipaciones />}

        {/* 3. Vista Protegida con Clave: Panel Docente */}
        {vistaActual === 'admin' && (
          <>
            {!autenticado ? (
              <div className="card shadow-sm border-0 p-4 mx-auto my-5" style={{ maxWidth: '420px' }}>
                <div className="text-center mb-3">
                  <i className="bi bi-shield-lock-fill fs-1 text-danger"></i>
                  <h4 className="fw-bold text-dark mt-2">Acceso Docente</h4>
                  <p className="text-muted small">
                    Ingresa la clave para acceder al panel de administración y depuración de registros.
                  </p>
                </div>

                <form onSubmit={handleAccesoAdmin}>
                  <div className="mb-3">
                    <input
                      type="password"
                      className={`form-control ${errorPassword ? 'is-invalid' : ''}`}
                      placeholder="Contraseña de administrador"
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      autoFocus
                      required
                    />
                    {errorPassword && (
                      <div className="invalid-feedback">
                        Clave incorrecta. Intenta nuevamente.
                      </div>
                    )}
                  </div>
                  <button type="submit" className="btn btn-danger w-100 fw-semibold">
                    <i className="bi bi-box-arrow-in-right me-2"></i> Acceder
                  </button>
                </form>
              </div>
            ) : (
              <div>
                <div className="d-flex justify-content-end mb-3">
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => setAutenticado(false)}
                  >
                    <i className="bi bi-box-arrow-left me-1"></i> Salir del modo Administrador
                  </button>
                </div>
                <AdminParticipaciones />
              </div>
            )}
          </>
        )}
      </main>

      <footer className="bg-dark text-white text-center py-3 mt-auto">
        <small>© UNAM — Facultad de Ingeniería | Módulo de Registro de Participaciones</small>
      </footer>
    </div>
  );
}