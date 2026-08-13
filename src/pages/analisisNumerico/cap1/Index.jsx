import React from 'react';

// Importaciones por defecto (coinciden con el export default de cada archivo)
import Subtema1_1 from './subtema_1_1';
import Subtema1_2 from './subtema_1_2';

export const Index = ({ activeSection, onSelectSection }) => {
  const subtemas = [
    { id: 'subtema_1_1', title: '1.1 Introducción al Análisis Numérico y Conceptos de Error' },
    { id: 'subtema_1_2', title: '1.2 Tipos de Errores: Absoluto y Relativo' },
    { id: 'subtema_1_3', title: '1.3 Representación de Números en la Computadora' },
    { id: 'subtema_1_4', title: '1.4 Propagación del Error' },
    { id: 'subtema_1_5', title: '1.5 Series de Taylor y Error de Truncamiento' },
    { id: 'subtema_1_6', title: '1.6 Estabilidad Numérica y Condicionamiento' },
    { id: 'subtema_1_7', title: '1.7 Algoritmos y Convergencia' },
    { id: 'subtema_1_8', title: '1.8 Ejercicios Prácticos y Evaluaciones' },
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
                <span className="badge bg-warning text-dark">Cap&iacute;tulo 1</span>
              </div>
              
            </div>
            
            <div className="list-group list-group-flush">
              <button
                onClick={() => onSelectSection('cap1')}
                className={`list-group-item list-group-item-action py-2 small text-start ${
                  activeSection === 'cap1' ? 'active fw-bold' : 'text-secondary'
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
            
            {/* VISTA GENERAL DEL CAPÍTULO 1 */}
            {activeSection === 'cap1' && (
              <div>
                <span className="badge bg-primary mb-2">Capítulo 1</span>
                <h2 className="fw-bold text-dark">Sistemas de Números y Errores</h2>
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
                        Comprender los fundamentos analíticos y computacionales del tema.
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
                        Cálculo Diferencial e Integral, Programación básica en Python.
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
            {activeSection === 'subtema_1_1' && <Subtema1_1 />}
            {activeSection === 'subtema_1_2' && <Subtema1_2 />}

            {/* Para subtemas que aún no tengan su archivo .jsx creado */}
            {activeSection !== 'cap1' && !['subtema_1_1', 'subtema_1_2'].includes(activeSection) && (
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