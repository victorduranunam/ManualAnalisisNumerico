import React from 'react';
import CapituloLayout from '../../../components/CapituloLayout';

// Importaciones de los subtemas
import Subtema6_1 from './subtema_6_1';
import Subtema6_2 from './subtema_6_2';
import Subtema6_3 from './subtema_6_3';

export const Index = ({ activeSection, onSelectSection }) => {
  const subtemas = [
    { id: 'subtema_6_1', title: '6.1 Fundamentos de simulación y generación de números aleatorios con herramientas computacionales' },
    { id: 'subtema_6_2', title: '6.2 Simulación Monte Carlo. Integración numérica' },
    { id: 'subtema_6_3', title: '6.3 Simulación de líneas de espera con uno y dos servidores, con herramientas computacionales' },
  ];

  return (
    <CapituloLayout
      materia="analisisNumerico"
      capNumero={6}
      titulo="Estimación numérica mediante simulación"
      descripcion="Fundamentos de simulación, generación de números pseudoaleatorios, método de Monte Carlo y simulación de líneas de espera."
      objetivos="Aplicar simulación Monte Carlo con apoyo de herramientas computacionales para estimar valores numéricos de interés en problemas de ingeniería."
      conocimientosPrevios="Conocimientos generales de Probabilidad y Estadística"
      subtemas={subtemas}
      activeSection={activeSection}
      onSelectSection={onSelectSection}
    >
      {activeSection === 'subtema_6_1' && <Subtema6_1 />}
      {activeSection === 'subtema_6_2' && <Subtema6_2 />}
      {activeSection === 'subtema_6_3' && <Subtema6_3 />}
    </CapituloLayout>
  );
};

export default Index;