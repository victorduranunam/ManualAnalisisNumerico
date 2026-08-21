import React, { useState } from 'react';
import SesionActual from './SesionActual';
import HistoricoParticipaciones from './HistoricoParticipaciones';
import AdminParticipaciones from './AdminParticipaciones';

export default function ParticipacionesContainer() {
  const [tabActiva, setTabActiva] = useState('sesion');
  const [autenticado, setAutenticado] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [errorPassword, setErrorPassword] = useState(false);

  // Cambia aquí la contraseña de profesor deseada
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
    <div className="container py-3">
      {/* Pestañas de Navegación */}
      <ul className="nav nav-tabs nav-fill mb-4 border-bottom">
        <li className="nav-item">
          <button
            className={`nav-link fw-semibold ${tabActiva === 'sesion' ? 'active text-primary border-bottom-0' : 'text-secondary'}`}
            onClick={() => setTabActiva('sesion')}
          >
            <i className="bi bi-clock-history me-2"></i>
            Sesión Actual
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link fw-semibold ${tabActiva === 'historico' ? 'active text-primary border-bottom-0' : 'text-secondary'}`}
            onClick={() => setTabActiva('historico')}
          >
            <i className="bi bi-archive me-2"></i>
            Histórico de Participaciones
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link fw-semibold ${tabActiva === 'admin' ? 'active text-danger border-bottom-0' : 'text-secondary'}`}
            onClick={() => setTabActiva('admin')}
          >
            <i className="bi bi-shield-lock me-2"></i>
            Administración (Docente)
          </button>
        </li>
      </ul>

      {/* 1. Vista Pública: Sesión Actual */}
      {tabActiva === 'sesion' && <SesionActual />}

      {/* 2. Vista Pública: Histórico por Alumno */}
      {tabActiva === 'historico' && <HistoricoParticipaciones />}

      {/* 3. Vista Protegida: Administración Global */}
      {tabActiva === 'admin' && (
        <>
          {!autenticado ? (
            <div className="card shadow-sm border-0 p-4 mx-auto mt-4" style={{ maxWidth: '420px' }}>
              <div className="text-center mb-3">
                <i className="bi bi-shield-slash fs-1 text-danger"></i>
                <h4 className="fw-bold text-dark mt-2">Acceso Restringido</h4>
                <p className="text-muted small">
                  Ingresa la contraseña para acceder al panel global de depuración.
                </p>
              </div>

              <form onSubmit={handleAccesoAdmin}>
                <div className="mb-3">
                  <input
                    type="password"
                    className={`form-control ${errorPassword ? 'is-invalid' : ''}`}
                    placeholder="Contraseña del profesor"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    autoFocus
                    required
                  />
                  {errorPassword && (
                    <div className="invalid-feedback">
                      Contraseña incorrecta.
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
    </div>
  );
}