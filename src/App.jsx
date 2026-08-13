import React, { useState } from 'react';
import NavigationBar from './components/NavigationBar';
import Home from './pages/Home';
import ModuloView from './pages/ModuloView';
import { analisisNumericoData, pythonData } from './data/capitulosData';
import { vistasPersonalizadas } from './pages/capitulosRegistry';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  const [activeSection, setActiveSection] = useState('inicio');
  
  // Guardamos cuál es el capítulo padre activo actual (ej: 'cap1', 'py_cap1', etc.)
  const [activeChapter, setActiveChapter] = useState(null);

  // Arreglo unificado con los datos de ambas materias
  const todosLosCapitulos = [...analisisNumericoData, ...pythonData];

  // Manejador centralizado de navegación
  const handleSelectSection = (nextSection) => {
    setActiveSection(nextSection);

    // 1. Si es inicio
    if (nextSection === 'inicio') {
      setActiveChapter(null);
      return;
    }

    // 2. Si directamente seleccionaron la portada de un capítulo (ej. 'cap1' o 'py_cap1')
    const esCapituloDirecto = todosLosCapitulos.find(c => c.id === nextSection);
    if (esCapituloDirecto) {
      setActiveChapter(esCapituloDirecto.id);
      return;
    }

    // 3. Si seleccionaron un subtema, buscamos a qué capítulo pertenece
    // Priorizamos el capitulo que ya estaba activo (activeChapter) para evitar saltos entre materias
    let capPadre = null;

    if (activeChapter) {
      const capActual = todosLosCapitulos.find(c => c.id === activeChapter);
      if (capActual && capActual.subtemas && capActual.subtemas.some(st => st.id === nextSection)) {
        capPadre = capActual;
      }
    }

    // Si no se encontró en el capítulo activo, buscamos en el resto del arreglo
    if (!capPadre) {
      capPadre = todosLosCapitulos.find(c => 
        c.subtemas && c.subtemas.some(st => st.id === nextSection)
      );
    }

    if (capPadre) {
      setActiveChapter(capPadre.id);
    }
  };

  // Determinamos el capítulo actual para el renderizado
  const capituloSeleccionado = todosLosCapitulos.find(c => c.id === activeChapter);

  // Verificamos si existe un componente personalizado en capitulosRegistry.js ('cap1', 'py_cap1', etc.)
  const ComponenteCustom = activeChapter ? vistasPersonalizadas[activeChapter] : null;

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
      <NavigationBar 
        activeSection={activeSection} 
        onSelectSection={handleSelectSection} 
      />

      {/* Ruteador de Contenido Dinámico */}
      <main className="flex-grow-1 my-4">
        {/* CASO 1: Pantalla de Inicio */}
        {activeSection === 'inicio' && (
          <Home onSelectSection={handleSelectSection} />
        )}

        {/* CASO 2: Tiene vista personalizada en capitulosRegistry ('cap1', 'py_cap1', etc.) */}
        {activeSection !== 'inicio' && ComponenteCustom && (
          <ComponenteCustom 
            activeSection={activeSection} 
            onSelectSection={handleSelectSection} 
          />
        )}

        {/* CASO 3: Capítulo sin vista personalizada ➔ Carga la plantilla genérica ModuloView */}
        {activeSection !== 'inicio' && !ComponenteCustom && capituloSeleccionado && (
          <ModuloView 
            capitulo={capituloSeleccionado} 
            activeSection={activeSection}
            onSelectSection={handleSelectSection} 
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3 mt-auto">
        <small>© UNAM — Facultad de Ingeniería | Proyecto PAPIME PE103226</small>
      </footer>
    </div>
  );
}

export default App;