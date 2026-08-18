import React from 'react';

// 1. Importaciones de los componentes de subtemas (coincidiendo con tus nombres de archivo con guion bajo)
import Subtema6_1 from './subtema_6_1';
import Subtema6_2 from './subtema_6_2';
import Subtema6_3 from './subtema_6_3';

export const Index = ({ activeSection, onSelectSection }) => {
  // Configuración usando la sintaxis con guiones bajos (_1_1, _1_2, _1_3)
  const subtemas = [
    { id: 'py_6_1', num: '6.1', title: '6.1 Introducción a Python y su uso en el Análisis Numérico' },
    { id: 'py_6_2', num: '6.2', title: '6.2 Principios del desarrollo de programas en Python' },
    { id: 'py_6_3', num: '6.3', title: '6.3 Aplicación en el Análisis Numérico' },
  ];

  return (
    <div className="container-fluid px-4">
      <div className="row g-4">
        
        {/* ================= MENÚ LATERAL PYTHON ================= */}
        <div className="col-md-3">
          <div className="card border-0 shadow-sm overflow-hidden">
            <div className="card-header bg-dark text-white p-3">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="fw-bold">
                  <i className="bi bi-filetype-py me-2 text-warning"></i>
                  Python 
                </span>
                <span className="badge bg-warning text-dark">Módulo 1</span>
              </div>
            </div>

            <div className="list-group list-group-flush">
              {/* Botón para regresar a la Vista General */}
              <button
                onClick={() => onSelectSection('py_cap6')}
                className={`list-group-item list-group-item-action py-2 small text-start ${
                  activeSection === 'py_cap6' ? 'active fw-bold bg-dark border-dark' : 'text-secondary'
                }`}
              >
                <i className="bi bi-house-door me-2"></i>
                Vista General del Capítulo
              </button>

              {/* Lista dinámica de subtemas */}
              {subtemas.map((st) => (
                <button
                  key={st.id}
                  onClick={() => onSelectSection(st.id)}
                  className={`list-group-item list-group-item-action py-2 small text-start ${
                    activeSection === st.id ? 'active fw-bold bg-dark border-dark' : 'text-secondary'
                  }`}
                >
                  {st.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ================= CONTENIDO PRINCIPAL ================= */}
        <div className="col-md-9">
          <div className="bg-white p-4 rounded shadow-sm">

            {/* 1. VISTA GENERAL DE PYTHON CAPÍTULO 6 */}
            {activeSection === 'py_cap6' && (
              <div>
                <span className="badge bg-success mb-2">Introducción a Python</span>
                <h2 className="fw-bold text-dark">Capítulo 1: Fundamentos de Python</h2>
                <p className="text-muted mb-4">
                
                Este primer módulo ofrece una visión general sobre la utilidad de Python como herramienta computacional en la ingeniería. A lo largo de la sección se muestra cómo la sencillez del lenguaje y sus librerías especializadas facilitan la aplicación del análisis numérico, convirtiéndolo en un entorno práctico para resolver ecuaciones, manipular matrices y graficar resultados.
                
                </p>

                <div className="row g-3 mb-4">
                  <div className="col-md-6">
                    <div className="p-3 rounded bg-light border-start border-4 border-success h-100">
                      <h6 className="fw-bold text-success">
                        <i className="bi bi-journal-code me-2"></i>
                        Objetivos de Aprendizaje
                      </h6>
                      <p className="small mb-0 text-secondary">
                        Comprender los fundamentos del lenguaje Python, su filosofía y el ecosistema de librerías
                         especializadas como herramienta computacional para el desarrollo y solución de algoritmos del análisis numérico.
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="p-3 rounded bg-light border-start border-4 border-warning h-100">
                      <h6 className="fw-bold text-warning text-dark">
                        <i className="bi bi-cpu me-2"></i>
                        Conocimientos Previos
                      </h6>
                      <p className="small mb-0 text-secondary">
                        Lógica de programación básica o conocimientos elementales de computación.
                      </p>
                    </div>
                  </div>
                </div>

                <h5 className="fw-bold mb-3">
                  <i className="bi bi-list-task me-2"></i>
                  Subtemas de este Módulo
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
                          Sintaxis, lecturas teóricas y aplicaciones en ingeniería.
                        </small>
                      </div>
                      <button
                        className="btn btn-outline-dark btn-sm px-3 fw-bold ms-3"
                        onClick={() => onSelectSection(st.id)}
                      >
                        Estudiar Tema →
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2. COMPONENTES RENDERIZADOS SEGÚN LA SECCIÓN ACTIVA */}
            {activeSection === 'py_6_1' && <Subtema6_1 />}
            {activeSection === 'py_6_2' && <Subtema6_2 />}
            {activeSection === 'py_6_3' && <Subtema6_3 />}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;