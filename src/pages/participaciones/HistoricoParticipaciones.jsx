import React, { useState } from 'react';

export default function HistoricoParticipaciones() {
  const [numeroCuenta, setNumeroCuenta] = useState('');
  const [participaciones, setParticipaciones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [buscado, setBuscado] = useState(false);
  const [error, setError] = useState('');

  const API_URL = '/victord/ManualAnalisisNumerico/public/api/consultar_participaciones.php';

  const handleBuscar = async (e) => {
    e.preventDefault();
    if (!numeroCuenta.trim()) return;

    setLoading(true);
    setError('');
    setBuscado(true);

    try {
      const response = await fetch(`${API_URL}?numero_cuenta=${encodeURIComponent(numeroCuenta.trim())}`);
      const data = await response.json();

      if (response.ok && data.status === 'success') {
        setParticipaciones(data.participaciones);
      } else {
        setError(data.mensaje || 'Error al consultar el historial.');
        setParticipaciones([]);
      }
    } catch (err) {
      setError('Ocurrió un error al conectar con el servidor.');
      setParticipaciones([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card shadow-sm border-0 p-4">
      <h3 className="fw-bold mb-3 text-dark">
        <i className="bi bi-archive me-2 text-primary"></i>
        Histórico de Participaciones
      </h3>
      <p className="text-muted">
        Ingresa tu número de cuenta para consultar las participaciones que has registrado.
      </p>

      {/* Formulario de búsqueda */}
      <form onSubmit={handleBuscar} className="row g-3 mb-4">
        <div className="col-md-8">
          <div className="input-group">
            <span className="input-group-text bg-light text-muted">
              <i className="bi bi-person-badge"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Número de cuenta (ej. 318000000)"
              value={numeroCuenta}
              onChange={(e) => setNumeroCuenta(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="col-md-4">
          <button type="submit" className="btn btn-primary w-100 fw-semibold" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Buscando...
              </>
            ) : (
              <>
                <i className="bi bi-search me-2"></i>
                Consultar
              </>
            )}
          </button>
        </div>
      </form>

      {/* Mensajes de error */}
      {error && (
        <div className="alert alert-danger d-flex align-items-center" role="alert">
          <i className="bi bi-exclamation-triangle-fill me-2 fs-5"></i>
          <div>{error}</div>
        </div>
      )}

      {/* Resultados de la consulta */}
      {buscado && !loading && (
        <div>
          {participaciones.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-hover align-middle border">
                <thead className="table-light">
                  <tr>
                    <th>#</th>
                    <th>Semestre</th>
                    <th>Fecha de Registro</th>
                    <th>Salida en Terminal</th>
                  </tr>
                </thead>
                <tbody>
                  {participaciones.map((p, index) => (
                    <tr key={p.id || index}>
                      <td className="fw-bold">{index + 1}</td>
                      <td>
                        <span className="badge bg-secondary">{p.semestre}</span>
                      </td>
                      <td>{p.fecha_registro}</td>
                      <td>
                        <code className="text-dark bg-light p-1 rounded d-block" style={{ fontSize: '0.85rem' }}>
                          {p.salida_terminal}
                        </code>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="alert alert-info text-center py-4" role="alert">
              <i className="bi bi-info-circle fs-3 d-block mb-2"></i>
              No se encontraron participaciones registradas para el número de cuenta <strong>{numeroCuenta}</strong>.
            </div>
          )}
        </div>
      )}
    </div>
  );
}