import React from 'react';
import CapituloLayout from '../../../components/CapituloLayout';

// Importaciones de los subtemas
import Subtema4_1 from './subtema_4_1';
import Subtema4_2 from './subtema_4_2';
import Subtema4_3 from './subtema_4_3';

export const Index = ({ activeSection, onSelectSection }) => {
  const subtemas = [
    { id: 'py_4_1', title: '4.1 Introducción a Python y su uso en el Análisis Numérico' },
    { id: 'py_4_2', title: '4.2 Principios del desarrollo de programas en Python' },
    { id: 'py_4_3', title: '4.3 Aplicación en el Análisis Numérico' },
  ];

  return (
    <CapituloLayout
      materia="python"
      capNumero={4}
      titulo="Estructuras de control y flujo"
      descripcion="Condicionales (if, elif, else) y ciclos de repetición (for, while) aplicados a algoritmos numéricos."
      objetivos="Implementar estructuras de control para dirigir el flujo de ejecución de algoritmos computacionales."
      conocimientosPrevios="Tipos de datos y operadores lógicos en Python."
      subtemas={subtemas}
      activeSection={activeSection}
      onSelectSection={onSelectSection}
    >
      {activeSection === 'py_4_1' && <Subtema4_1 />}
      {activeSection === 'py_4_2' && <Subtema4_2 />}
      {activeSection === 'py_4_3' && <Subtema4_3 />}
    </CapituloLayout>
  );
};

export default Index;