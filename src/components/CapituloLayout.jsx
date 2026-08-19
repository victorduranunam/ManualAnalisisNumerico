import React from 'react';

/**
 * Componente de diseño reutilizable para todos los capítulos de Análisis Numérico y Python.
 * Unifica el selector para móviles, la barra lateral en escritorio y la vista general.
 */
export const CapituloLayout = ({
  materia = 'analisisNumerico', // 'analisisNumerico' | 'python'
  capNumero,
  capId,
  titulo,
  descripcion,
  objetivos,
  conocimientosPrevios,
  subtemas = [],
  activeSection,
  onSelectSection,
  children
}) => {
  const isPython = materia === 'python' || String(capId).startsWith('py_');
  const overviewId = capId || (isPython ? `py_cap${capNumero}` : `cap${capNumero}`);
  
  const headerBgClass = isPython ? 'bg-dark' : 'bg-unam';
  const badgeText = isPython ? `Módulo ${capNumero}` : `Capítulo ${capNumero}`;
  const themeBadgeClass = isPython ? 'bg-success' : 'bg-primary';
  const themeButtonClass = isPython ? 'btn-outline-dark' : 'btn-outline-primary';

  return (
    <div className="container-fluid px-4">
      {/* 📱 SELECTOR RESPONSIVE PARA MÓVILES (< 768px) */}
      <div className="d-block d-md-none mb-3">
        <div className="card shadow-sm border-0">
          <div className="card-body p-3">
            <label className="fw-bold small mb-2 text-dark">
              <i className={`${isPython ? 'bi bi-filetype-py text-success' : 'bi bi-journal-bookmark-fill text-primary'} me-2`}></i>
              {isPython ? `Navegar en Módulo ${capNumero}:` : `Navegar en Capítulo ${capNumero}:`}
            </label>
            <select
              value={activeSection}
              onChange={(e) => onSelectSection(e.target.value)}
              className="form-select fw-bold border-secondary"
            >
              <option value={overviewId}>
                📋 {isPython ? 'Vista General del Módulo' : 'Vista General del Capítulo'}
              </option>
              {subtemas.map((st) => (
                <option key={st.id} value={st.id}>
                  📌 {st.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {/* 💻 MENÚ LATERAL ESCRITORIO (>= 768px) */}
        <div className="col-md-3 d-none d-md-block">
          <div className="card border-0 shadow-sm overflow-hidden sticky-top" style={{ top: "80px" }}>
            <div className={`card-header ${headerBgClass} text-white p-3`}>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="fw-bold">
                  {isPython ? (
                    <>
                      <i className="bi bi-filetype-py me-2 text-warning"></i>
                      Python
                    </>
                  ) : (
                    'Análisis Numérico'
                  )}
                </span>
                <span className="badge bg-warning text-dark">{badgeText}</span>
              </div>
            </div>

            <div className="list-group list-group-flush">
              <button
                onClick={() => onSelectSection(overviewId)}
                className={`list-group-item list-group-item-action py-2 small text-start ${
                  activeSection === overviewId ? 'active fw-bold' : 'text-secondary'
                }`}
              >
                <i className="bi bi-house-door me-2"></i>
                {isPython ? 'Vista General del Módulo' : 'Vista General del Capítulo'}
              </button>

              {subtemas.map((st) => (
                <button
                  key={st.id}
                  onClick={() => onSelectSection(st.id)}
                  className={`list-group-item list-group-item-action py-2 small text-start ${
                    activeSection === st.id ? 'active fw-bold' : 'text-secondary'
                  }`}
                >
                  {st.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 📄 CONTENIDO PRINCIPAL (DERECHA) */}
        <div className="col-md-9">
          <div className="bg-white p-4 rounded shadow-sm">
            {/* VISTA GENERAL POR DEFECTO DEL CAPÍTULO / MÓDULO */}
            {activeSection === overviewId && (
              <div>
                <span className={`badge ${themeBadgeClass} mb-2`}>{badgeText}</span>
                <h2 className="fw-bold text-dark">{titulo}</h2>
                {descripcion && (
                  <p className="text-muted mb-4">{descripcion}</p>
                )}

                {(objetivos || conocimientosPrevios) && (
                  <div className="row g-3 mb-4">
                    {objetivos && (
                      <div className="col-md-6">
                        <div className={`p-3 rounded bg-light border-start border-4 border-${isPython ? 'success' : 'primary'} h-100`}>
                          <h6 className={`fw-bold text-${isPython ? 'success' : 'primary'}`}>
                            <i className="bi bi-journal-bookmark me-2"></i>
                            Objetivos de Aprendizaje
                          </h6>
                          <p className="small mb-0 text-secondary">{objetivos}</p>
                        </div>
                      </div>
                    )}
                    {conocimientosPrevios && (
                      <div className="col-md-6">
                        <div className={`p-3 rounded bg-light border-start border-4 border-${isPython ? 'warning' : 'info'} h-100`}>
                          <h6 className={`fw-bold text-${isPython ? 'dark' : 'info'}`}>
                            <i className={`${isPython ? 'bi bi-cpu' : 'bi bi-book'} me-2 text-${isPython ? 'warning' : 'info'}`}></i>
                            Conocimientos Previos
                          </h6>
                          <p className="small mb-0 text-secondary">{conocimientosPrevios}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <h5 className="fw-bold mb-3">
                  <i className="bi bi-list-task me-2"></i>
                  Subtemas de esta Unidad
                </h5>

                <div className="d-flex flex-column gap-3">
                  {subtemas.map((st) => (
                    <div
                      key={st.id}
                      className="p-3 border rounded d-flex justify-content-between align-items-center bg-white shadow-sm"
                    >
                      <div>
                        <h6 className="fw-bold mb-1">{st.title}</h6>
                        <small className="text-muted">
                          {isPython 
                            ? 'Sintaxis, lecturas teóricas y aplicaciones en ingeniería.' 
                            : 'Fundamentos, Videos de Apoyo, Simulador y Ejercicios.'}
                        </small>
                      </div>
                      <button
                        className={`btn ${themeButtonClass} btn-sm px-3 fw-bold ms-3`}
                        onClick={() => onSelectSection(st.id)}
                      >
                        Estudiar Tema →
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* RENDERIZADO DEL SUBTEMA ACTIVO */}
            {activeSection !== overviewId && (children || (
              <div className="alert alert-light border">
                <h5 className="text-primary"><i className="bi bi-journal-code me-2"></i>En desarrollo</h5>
                <p className="mb-0 text-muted">
                  El contenido de esta sección se cargará próximamente.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CapituloLayout;
