import React, { useState, useEffect } from 'react';

export default function AdminParticipaciones() {
  const [participaciones, setParticipaciones] = useState([]);
  const [filtroCuenta, setFiltroCuenta] = useState('');
  const [filtroFecha, setFiltroFecha] = useState('');
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });

  const API_CONSULTA = '/victord/ManualAnalisisNumerico/public/api/descargar_participaciones.php';
  const API_DEPURAR = '/victord/ManualAnalisisNumerico/public/api/depurar_participaciones.php';
  const API_HISTORIAL = '/victord/ManualAnalisisNumerico/public/api/consultar_participaciones.php';

  const cargarParticipaciones = async (cuenta = filtroCuenta, fecha = filtroFecha) => {
    setLoading(true);
    setMensaje({ tipo: '', texto: '' });
    try {
      let params = new URLSearchParams();
      if (cuenta.trim()) params.append('numero_cuenta', cuenta.trim());
      else params.append('numero_cuenta', 'TODOS');

      if (fecha) params.append('fecha', fecha);

      const response = await fetch(`${API_HISTORIAL}?${params.toString()}`);
      const data = await response.json();

      if (response.ok && data.status === 'success') {
        setParticipaciones(data.participaciones || []);
      } else {
        setParticipaciones([]);
      }
    } catch (err) {
      setMensaje({ tipo: 'danger', texto: 'Error de conexión con el servidor.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarParticipaciones();
  }, []);

  const handleEliminarRegistro = async (id) => {
    if (!window.confirm(`¿Estás seguro de que deseas eliminar la participación #${id}?`)) return;

    try {
      const response = await fetch(API_DEPURAR, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accion: 'eliminar_id', id })
      });

      const data = await response.json();
      if (response.ok && data.status === 'success') {
        setMensaje({ tipo: 'success', texto: data.mensaje });
        setParticipaciones(prev => prev.filter(item => item.id !== id));
      } else {
        setMensaje({ tipo: 'danger', texto: data.mensaje || 'No se pudo eliminar el registro.' });
      }
    } catch (err) {
      setMensaje({ tipo: 'danger', texto: 'Error al enviar la solicitud de eliminación.' });
    }
  };

  const handleLimpiarDuplicadosCuenta = async (numeroCuenta) => {
    if (!window.confirm(`¿Conservar solo la última entrega de la cuenta ${numeroCuenta} y eliminar duplicados anteriores?`)) return;

    try {
      const response = await fetch(API_DEPURAR, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accion: 'depurar_duplicados_cuenta', numero_cuenta: numeroCuenta })
      });

      const data = await response.json();
      if (response.ok && data.status === 'success') {
        setMensaje({ tipo: 'success', texto: data.mensaje });
        cargarParticipaciones(filtroCuenta, filtroFecha);
      } else {
        setMensaje({ tipo: 'danger', texto: data.mensaje });
      }
    } catch (err) {
      setMensaje({ tipo: 'danger', texto: 'Error al depurar duplicados.' });
    }
  };

  // Establecer automáticamente la fecha de hoy
  const handleSetHoy = () => {
    const hoy = new Date().toISOString().split('T')[0];
    setFiltroFecha(hoy);
    cargarParticipaciones(filtroCuenta, hoy);
  };

  // Limpiar todos los filtros
  const handleLimpiarFiltros = () => {
    setFiltroCuenta('');
    setFiltroFecha('');
    cargarParticipaciones('', '');
  };

  // URL dinámica de exportación CSV con los filtros aplicados
  const getExportUrl = () => {
    let params = new URLSearchParams();
    if (filtroFecha) params.append('fecha', filtroFecha);
    return params.toString() ? `${API_CONSULTA}?${params.toString()}` : API_CONSULTA;
  };

  return (
    <div className="card shadow-sm border-0 p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="fw-bold text-dark mb-0">
          <i className="bi bi-trash3 me-2 text-danger"></i>
          Administración y Depuración de Participaciones
        </h3>
        <a 
          href={getExportUrl()} 
          className="btn btn-outline-success btn-sm fw-semibold"
          target="_blank" 
          rel="noreferrer"
        >
          <i className="bi bi-file-earmark-excel me-1"></i> Exportar CSV {filtroFecha ? `(${filtroFecha})` : ''}
        </a>
      </div>

      <p className="text-muted small">
        Filtra los registros por número de cuenta o fecha para depurar participaciones de la clase.
      </p>

      {/* Barra de Filtros */}
      <div className="row g-2 mb-4">
        <div className="col-md-4">
          <label className="form-label small fw-bold mb-1">Número de Cuenta</label>
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Filtrar por número de cuenta..."
            value={filtroCuenta}
            onChange={(e) => setFiltroCuenta(e.target.value)}
          />
        </div>

        <div className="col-md-4">
          <label className="form-label small fw-bold mb-1">Fecha de Registro</label>
          <div className="input-group input-group-sm">
            <input
              type="date"
              className="form-control"
              value={filtroFecha}
              onChange={(e) => setFiltroFecha(e.target.value)}
            />
            <button 
              className="btn btn-outline-secondary" 
              type="button" 
              onClick={handleSetHoy}
              title="Filtrar por el día de hoy"
            >
              Hoy
            </button>
          </div>
        </div>

        <div className="col-md-2 d-flex align-items-end">
          <button 
            className="btn btn-primary btn-sm w-100 fw-semibold"
            onClick={() => cargarParticipaciones(filtroCuenta, filtroFecha)}
            disabled={loading}
          >
            <i className="bi bi-funnel me-1"></i> Filtrar
          </button>
        </div>

        <div className="col-md-2 d-flex align-items-end">
          <button 
            className="btn btn-outline-secondary btn-sm w-100"
            onClick={handleLimpiarFiltros}
          >
            Limpiar
          </button>
        </div>
      </div>

      {/* Notificaciones */}
      {mensaje.texto && (
        <div className={`alert alert-${mensaje.tipo} alert-dismissible fade show`} role="alert">
          {mensaje.texto}
          <button type="button" className="btn-close" onClick={() => setMensaje({ tipo: '', texto: '' })}></button>
        </div>
      )}

      {/* Tabla de registros */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-2 text-muted">Cargando registros...</p>
        </div>
      ) : participaciones.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-hover align-middle border">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Cuenta</th>
                <th>Semestre</th>
                <th>Código / Terminal</th>
                <th>Fecha y Hora</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {participaciones.map((p) => (
                <tr key={p.id}>
                  <td className="fw-bold">{p.id}</td>
                  <td>
                    <span className="badge bg-light text-dark border me-1">{p.numero_cuenta}</span>
                    <button 
                      className="btn btn-link btn-sm text-decoration-none p-0"
                      title="Limpiar duplicados antiguos de esta cuenta"
                      onClick={() => handleLimpiarDuplicadosCuenta(p.numero_cuenta)}
                    >
                      <i className="bi bi-magic text-warning fs-6"></i>
                    </button>
                  </td>
                  <td><span className="badge bg-info text-dark">{p.semestre}</span></td>
                  <td>
                    <details>
                      <summary className="text-primary cursor-pointer small">Ver detalles</summary>
                      <div className="mt-1 bg-light p-2 rounded small">
                        <strong>Código:</strong>
                        <pre className="m-0 mb-1" style={{ fontSize: '0.75rem' }}>{p.codigo_python}</pre>
                        <strong>Terminal:</strong>
                        <pre className="m-0 text-success" style={{ fontSize: '0.75rem' }}>{p.salida_terminal}</pre>
                      </div>
                    </details>
                  </td>
                  <td className="small">{p.fecha_registro}</td>
                  <td className="text-center">
                    <button 
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleEliminarRegistro(p.id)}
                      title="Eliminar participación"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="alert alert-warning text-center py-4">
          No se encontraron participaciones para los filtros seleccionados.
        </div>
      )}
    </div>
  );
}