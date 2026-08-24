import React from 'react';
import CapituloLayout from '../../../components/CapituloLayout';

// Importaciones de los subtemas
import Subtema9_1 from './subtema_9_1';
import Subtema9_2 from './subtema_9_2';
import Subtema9_3 from './subtema_9_3';

export const Index = ({ activeSection, onSelectSection }) => {
  const subtemas = [
    { id: 'py_9_1', title: '9.1 Introducción a Python y su uso en el Análisis Numérico' },
    { id: 'py_9_2', title: '9.2 Principios del desarrollo de programas en Python' },
    { id: 'py_9_3', title: '9.3 Aplicación en el Análisis Numérico' },
  ];

  return (
    <CapituloLayout
      materia="python"
      capNumero={9}
      titulo="Biblioteca de operaciones y funciones auxiliares para el análisis numérico"
      descripcion="Este primer módulo ofrece una visión general sobre la utilidad de Python como herramienta computacional en la ingeniería. A lo largo de la sección se muestra cómo la sencillez del lenguaje y sus librerías especializadas facilitan la aplicación del análisis numérico, convirtiéndolo en un entorno práctico para resolver ecuaciones, manipular matrices y graficar resultados."
      objetivos="Comprender los fundamentos del lenguaje Python, su filosofía y el ecosistema de librerías especializadas como herramienta computacional para el desarrollo y solución de algoritmos del análisis numérico."
      conocimientosPrevios="Lógica de programación básica o conocimientos elementales de computación."
      subtemas={subtemas}
      activeSection={activeSection}
      onSelectSection={onSelectSection}
    >
      {activeSection === 'py_9_1' && <Subtema9_1 />}
      {activeSection === 'py_9_2' && <Subtema9_2 />}
      {activeSection === 'py_9_3' && <Subtema9_3 />}
    </CapituloLayout>
  );
};

export default Index;