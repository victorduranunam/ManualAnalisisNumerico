import React, { useState, useEffect } from 'react';
import SesionActual from './SesionActual';
import HistoricoParticipaciones from './HistoricoParticipaciones';
import AdminParticipaciones from './AdminParticipaciones';

export default function ParticipacionesContainer() {
  const [tabActiva, setTabActiva] = useState('sesion');
  const [autenticado, setAutenticado] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [errorPassword, setErrorPassword] = useState(false);
  const [cargando, setCargando] = useState(false);

  // Mantener sesión abierta en el navegador si ya se autenticó previamente
  useEffect(() => {
    const token = sessionStorage.getItem('admin_token');
    if (token) {
      setAutenticado(true);
    }
  }, []);

  const handleAccesoAdmin = async (e) => {
    e.preventDefault();
    setErrorPassword(false);
    setCargando(true);

    try {
      const response = await fetch('/victord/ManualAnalisisNumerico/public/api/login_admin.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordInput })
      });

      const data = await response.json();

      if (response.ok && data.status === 'success') {
        setAutenticado(true);
        sessionStorage.setItem('admin_token', data.token); // Guardar token de sesión en pestaña activa
        setPasswordInput('');
      } else {
        setErrorPassword(true);
      }
    } catch (err) {
      setErrorPassword(true);
    } finally {
      setCargando(false);
    }
  };

  const handleSalirAdmin = () => {
    setAutenticado(false);
    sessionStorage.removeItem('admin_token');
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
                <button 
                  type="submit" 
                  className="btn btn-danger w-100 fw-semibold"
                  disabled={cargando}
                >
                  {cargando ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Verificando...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-box-arrow-in-right me-2"></i> Acceder
                    </>
                  )}
                </button>
              </form>
            </div>
          ) : (
            <div>
              <div className="d-flex justify-content-end mb-3">
                <button 
                  className="btn btn-outline-secondary btn-sm"
                  onClick={handleSalirAdmin}
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