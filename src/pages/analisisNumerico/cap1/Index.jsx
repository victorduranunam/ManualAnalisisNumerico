import React from 'react';
import CapituloLayout from '../../../components/CapituloLayout';

// Importaciones de los subtemas
import Subtema1_1 from './subtema_1_1';
import Subtema1_2 from './subtema_1_2';
import Subtema1_3 from './subtema_1_3';
import Subtema1_4 from './subtema_1_4';
import Subtema1_5 from './subtema_1_5';
import Subtema1_6 from './subtema_1_6';

export const Index = ({ activeSection, onSelectSection }) => {
  const subtemas = [
    { id: 'subtema_1_1', title: '1.1 Importancia de los métodos numéricos en Ingeniería' },
    { id: 'subtema_1_2', title: '1.2 Representación de números en punto flotante y sus limitaciones' },
    { id: 'subtema_1_3', title: '1.3 Clasificación de los errores numéricos' },
    { id: 'subtema_1_4', title: '1.4 Criterios fundamentales en métodos numéricos: precisión, estabilidad y convergencia' },
    { id: 'subtema_1_5', title: '1.5 Aproximación de funciones por medio del polinomio de Taylor' },
    { id: 'subtema_1_6', title: '1.6 Implementación y herramientas computacionales para métodos numéricos en Ingeniería' },
  ];

  return (
    <CapituloLayout
      materia="analisisNumerico"
      capNumero={1}
      titulo="Fundamentos y errores en métodos numéricos"
      descripcion="Estudio de los errores de redondeo, truncamiento y la representación numérica en computadoras."
      objetivos="Comprender la representación en punto flotante, los tipos de errores numéricos y los criterios de precisión, estabilidad y convergencia de métodos numéricos, relacionando estos conceptos con la precisión de los resultados en cálculos computacionales."
      conocimientosPrevios="Conocimientos generales de Álgebra"
      subtemas={subtemas}
      activeSection={activeSection}
      onSelectSection={onSelectSection}
    >
      {activeSection === 'subtema_1_1' && <Subtema1_1 />}
      {activeSection === 'subtema_1_2' && <Subtema1_2 />}
      {activeSection === 'subtema_1_3' && <Subtema1_3 />}
      {activeSection === 'subtema_1_4' && <Subtema1_4 />}
      {activeSection === 'subtema_1_5' && <Subtema1_5 />}
      {activeSection === 'subtema_1_6' && <Subtema1_6 />}
    </CapituloLayout>
  );
};

export default Index;