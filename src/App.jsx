import React, { useState } from 'react';
import NavigationBar from './components/NavigationBar';
import Home from './pages/Home';
import PythonIntro from './pages/PythonIntro';
import CapituloView from './pages/CapituloView';
import { capitulosData } from './data/capitulosData';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  const [activeSection, setActiveSection] = useState('inicio');

  const capituloSeleccionado = capitulosData.find(c => c.id === activeSection);

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      {/* Banner Superior Institucional */}
      <header className="banner-math text-white py-4 px-3 shadow-sm">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-md-8">
              <h1 className="fw-bold mb-1 fs-3">Manual Interactivo de Análisis Numérico</h1>
              <p className="mb-0 text-light opacity-75 fs-6">Facultad de Ingeniería — UNAM</p>
            </div>
            <div className="col-md-4 text-md-end d-none d-md-block">
              <span className="badge bg-warning text-dark px-3 py-2 fs-6 shadow-sm fw-bold">
                PAPIME PE103226
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Menú Superior Global */}
      <NavigationBar activeSection={activeSection} onSelectSection={setActiveSection} />

      {/* Ruteador de Contenido Dinámico */}
      <main className="flex-grow-1 my-4">
        {activeSection === 'inicio' && <Home onSelectSection={setActiveSection} />}
        {activeSection === 'python' && <PythonIntro />}
        {capituloSeleccionado && <CapituloView capitulo={capituloSeleccionado} />}
      </main>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3 mt-auto">
        <small>© UNAM — Facultad de Ingeniería | Proyecto PAPIME PE103226</small>
      </footer>
    </div>
  );
}

export default App;