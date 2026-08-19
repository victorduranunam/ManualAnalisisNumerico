import React from 'react';

// Importaciones por defecto (coinciden con el export default de cada archivo)
import Subtema6_1 from './subtema_6_1';
import Subtema6_2 from './subtema_6_2';
import Subtema6_3 from './subtema_6_3';


export const Index = ({ activeSection, onSelectSection }) => {
  const subtemas = [
    { id: 'subtema_6_1', title: '6.1 Fundamentos de simulación y generación de números aleatorios con herramientas computacionales' },
    { id: 'subtema_6_2', title: '6.2 Simulación Monte Carlo. Integración numérica' },
    { id: 'subtema_6_3', title: '6.3 Simulación de líneas de espera con uno y dos servidores, con herramientas computacionales' }
    
  ];

  return (
    <div className="container-fluid px-4">
      {/* 📱 SELECTOR RESPONSIVE PARA MÓVILES */}
      <div className="d-block d-md-none mb-3">
        <div className="card shadow-sm border-0">
          <div className="card-body p-3">
            <label className="fw-bold small mb-2 text-dark">
              <i className="bi bi-journal-bookmark-fill me-2 text-primary"></i>
              Navegar en Capítulo 6:
            </label>
            <select
              value={activeSection}
              onChange={(e) => onSelectSection(e.target.value)}
              className="form-select fw-bold border-secondary"
            >
              <option value="cap6">📋 Vista General del Capítulo</option>
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
        
        {/* ================= MENÚ LATERAL AZUL ================= */}
        <div className="col-md-3 d-none d-md-block">
          <div className="card border-0 shadow-sm overflow-hidden sticky-top" style={{ top: "80px" }}>
            <div className="card-header bg-unam text-white p-3">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="fw-bold">Análisis Numérico</span>
                <span className="badge bg-warning text-dark">Cap&iacute;tulo 6</span>
              </div>
              
            </div>
            
            <div className="list-group list-group-flush">
              <button
                onClick={() => onSelectSection('cap6')}
                className={`list-group-item list-group-item-action py-2 small text-start ${
                  activeSection === 'cap6' ? 'active fw-bold' : 'text-secondary'
                }`}
              >
                <i className="bi bi-house-door me-2"></i>
                Vista General del Capítulo
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

        {/* ================= CONTENIDO DERECHO ================= */}
        <div className="col-md-9">
          <div className="bg-white p-4 rounded shadow-sm">
            
            {/* VISTA GENERAL DEL CAPÍTULO 6 */}
            {activeSection === 'cap6' && (
              <div>
                <span className="badge bg-primary mb-2">Capítulo 6</span>
                <h2 className="fw-bold text-dark">Método de diferencias finitas para ecuaciones diferenciales parciales elípticas</h2>
                <p className="text-muted mb-4">
                  Estudio de los errores de redondeo, truncamiento y la representación numérica en computadoras.
                </p>

                <div className="row g-3 mb-4">
                  <div className="col-md-6">
                    <div className="p-3 rounded bg-light border-start border-4 border-primary h-100">
                      <h6 className="fw-bold text-primary">
                        <i className="bi bi-journal-bookmark me-2"></i>
                        Objetivos de Aprendizaje
                      </h6>
                      <p className="small mb-0 text-secondary">
                       Aplicar simulación Monte Carlo con apoyo de herramientas computacionales para estimar valores numéricos
de interés en problemas de ingeniería.
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="p-3 rounded bg-light border-start border-4 border-info h-100">
                      <h6 className="fw-bold text-info">
                        <i className="bi bi-book me-2"></i>
                        Conocimientos Previos
                      </h6>
                      <p className="small mb-0 text-secondary">
                        Conocimientos generales de Álgebra 
                      </p>
                    </div>
                  </div>
                </div>

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
                          Fundamentos, Videos de Apoyo, Simulador y Ejercicios.
                        </small>
                      </div>
                      <button
                        className="btn btn-outline-primary btn-sm px-3 fw-bold ms-3"
                        onClick={() => onSelectSection(st.id)}
                      >
                        Estudiar Tema →
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* RENDERIZADO CONDICIONAL DE CADA SUBTEMA */}
            {activeSection === 'subtema_6_1' && <Subtema6_1 />}
            {activeSection === 'subtema_6_2' && <Subtema6_2 />}
            {activeSection === 'subtema_6_3' && <Subtema6_3 />}
            
            {/* Para subtemas que aún no tengan su archivo .jsx creado */}
            {activeSection !== 'cap6' && !['subtema_6_1', 'subtema_6_2', 'subtema_6_3'].includes(activeSection) && (
              <div className="alert alert-light border">
                <h5 className="text-primary"><i className="bi bi-journal-code me-2"></i>En desarrollo</h5>
                <p className="mb-0 text-muted">
                  El contenido de esta sección se cargará una vez creado su respectivo archivo <code>.jsx</code>.
                </p>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;