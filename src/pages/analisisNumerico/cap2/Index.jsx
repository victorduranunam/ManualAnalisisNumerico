import React from 'react';

// Importaciones por defecto (coinciden con el export default de cada archivo)
import Subtema2_1 from './subtema_2_1';
import Subtema2_2 from './subtema_2_2';
import Subtema2_3 from './subtema_2_3';


export const Index = ({ activeSection, onSelectSection }) => {
  const subtemas = [
    { id: ' subtema_2_1', title: '2.1 Métodos cerrados para la obtención de raíces: bisección y regla falsa; interpretación geométrica' },
    { id: ' subtema_2_2', title: '2.2 Métodos abiertos para la obtención de raíces: Newton-Raphson y método de la secante; interpretaciones geométricas y criterios de convergencia' },
    { id: ' subtema_2_3', title: '2.3 Implementación computacional en problemas de ingeniería' },
   
  ];

  return (
    <div className="container-fluid px-4">
      <div className="row g-4">
        
        {/* ================= MENÚ LATERAL AZUL ================= */}
        <div className="col-md-3">
          <div className="card border-0 shadow-sm overflow-hidden">
            <div className="card-header bg-primary text-white p-3">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="fw-bold">Análisis Numérico</span>
                <span className="badge bg-warning text-dark">Cap&iacute;tulo 2</span>
              </div>
              
            </div>
            
            <div className="list-group list-group-flush">
              <button
                onClick={() => onSelectSection('cap2')}
                className={`list-group-item list-group-item-action py-2 small text-start ${
                  activeSection === 'cap2' ? 'active fw-bold' : 'text-secondary'
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
            
            {/* VISTA GENERAL DEL CAPÍTULO 2 */}
            {activeSection === 'cap2' && (
              <div>
                <span className="badge bg-primary mb-2">Capítulo 2</span>
                <h2 className="fw-bold text-dark">Resolución numérica de ecuaciones algebraicas y trascendentes  </h2>
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
                        Aplicar métodos numéricos, con apoyo de herramientas computacionales, para la resolución aproximada de
ecuaciones algebraicas y trascendentes, atendiendo a los criterios de convergencia en problemas de ingeniería.
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
            {activeSection === ' subtema_2_1' && <Subtema2_1 />}
            {activeSection === ' subtema_2_2' && <Subtema2_2 />}
            {activeSection === ' subtema_2_3' && <Subtema2_3 />}
            

            {/* Para subtemas que aún no tengan su archivo .jsx creado */}
            {activeSection !== 'cap2' && ![' subtema_2_1', ' subtema_2_2',' subtema_2_3'].includes(activeSection) && (
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