import React from 'react';
import CapituloLayout from '../../../components/CapituloLayout';

// Importaciones de los subtemas
import Subtema1_1 from './subtema_1_1';
import Subtema1_2 from './subtema_1_2';
import Subtema1_3 from './subtema_1_3';

export const Index = ({ activeSection, onSelectSection }) => {
  const subtemas = [
    { id: 'py_1_1', title: '1.1 Introducción a Python y su uso en el Análisis Numérico' },
    { id: 'py_1_2', title: '1.2 Principios del desarrollo de programas en Python' },
    { id: 'py_1_3', title: '1.3 Aplicación en el Análisis Numérico' },
  ];

  return (
    <CapituloLayout
      materia="python"
      capNumero={1}
      titulo="Fundamentos de Python"
      descripcion="Visión general sobre la utilidad de Python como herramienta computacional en la ingeniería para resolver ecuaciones, manipular matrices y graficar resultados."
      objetivos="Comprender los fundamentos del lenguaje Python, su filosofía y el ecosistema de librerías especializadas como herramienta computacional para el desarrollo y solución de algoritmos del análisis numérico."
      conocimientosPrevios="Lógica de programación básica o conocimientos elementales de computación."
      subtemas={subtemas}
      activeSection={activeSection}
      onSelectSection={onSelectSection}
    >
      {activeSection === 'py_1_1' && <Subtema1_1 />}
      {activeSection === 'py_1_2' && <Subtema1_2 />}
      {activeSection === 'py_1_3' && <Subtema1_3 />}
    </CapituloLayout>
  );
};

export default Index;