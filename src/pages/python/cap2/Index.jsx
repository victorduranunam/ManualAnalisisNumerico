import React from 'react';
import CapituloLayout from '../../../components/CapituloLayout';

// Importaciones de los subtemas
import Subtema2_1 from './subtema_2_1';
import Subtema2_2 from './subtema_2_2';
import Subtema2_3 from './subtema_2_3';
import Subtema2_4 from './subtema_2_4';
import Subtema2_5 from './subtema_2_5';
import Subtema2_6 from './subtema_2_6';
import Subtema2_7 from './subtema_2_7';

export const Index = ({ activeSection, onSelectSection }) => {
  const subtemas = [
    { id: 'py_2_1', title: '2.1 Herramientas de desarrollo python' },
    { id: 'py_2_2', title: '2.2 Programación en la nube con Google Colab' },
    { id: 'py_2_3', title: '2.3 Programación desde Android con Pydroid 3' },
    { id: 'py_2_4', title: '2.4 Thonny' },
    { id: 'py_2_5', title: '2.5 Instalación de Python' },
    { id: 'py_2_6', title: '2.6 Visual Studio Code' },
    { id: 'py_2_7', title: '2.7 ¿Qué entorno utilizar?' },
  ];

  return (
    <CapituloLayout
      materia="python"
      capNumero={2}
      titulo="Instalación y configuración del entorno de desarrollo"
      descripcion="Configuración y uso de entornos de programación para Python: Google Colab, Pydroid 3, Thonny y VS Code."
      objetivos="Conocer, instalar y configurar los diferentes entornos de desarrollo disponibles para programar en Python de acuerdo con las necesidades del proyecto."
      conocimientosPrevios="Manejo básico del sistema operativo y navegación en Internet."
      subtemas={subtemas}
      activeSection={activeSection}
      onSelectSection={onSelectSection}
    >
      {activeSection === 'py_2_1' && <Subtema2_1 />}
      {activeSection === 'py_2_2' && <Subtema2_2 />}
      {activeSection === 'py_2_3' && <Subtema2_3 />}
      {activeSection === 'py_2_4' && <Subtema2_4 />}
      {activeSection === 'py_2_5' && <Subtema2_5 />}
      {activeSection === 'py_2_6' && <Subtema2_6 />}
      {activeSection === 'py_2_7' && <Subtema2_7 />}
    </CapituloLayout>
  );
};

export default Index;