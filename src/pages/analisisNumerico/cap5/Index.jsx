import React from 'react';
import CapituloLayout from '../../../components/CapituloLayout';

// Importaciones de los subtemas
import Subtema5_1 from './subtema_5_1';
import Subtema5_2 from './subtema_5_2';
import Subtema5_3 from './subtema_5_3';
import Subtema5_4 from './subtema_5_4';
import Subtema5_5 from './subtema_5_5';

export const Index = ({ activeSection, onSelectSection }) => {
  const subtemas = [
    { id: 'subtema_5_1', title: '5.1 Método de diferencias finitas para ecuaciones diferenciales ordinarias: problemas de valores en la frontera' },
    { id: 'subtema_5_2', title: '5.2 Métodos de paso a paso: Euler y Runge-Kutta de cuarto orden' },
    { id: 'subtema_5_3', title: '5.3 Resolución numérica de sistemas de ecuaciones diferenciales usando los métodos de paso a paso' },
    { id: 'subtema_5_4', title: '5.4 Método de diferencias finitas para ecuaciones diferenciales parciales elípticas' },
    { id: 'subtema_5_5', title: '5.5 Implementación y herramientas computacionales para métodos numéricos en Ingeniería' },
  ];

  return (
    <CapituloLayout
      materia="analisisNumerico"
      capNumero={5}
      titulo="Resolución numérica de ecuaciones diferenciales"
      descripcion="Solución numérica de ecuaciones diferenciales ordinarias y parciales mediante métodos de paso a paso y diferencias finitas."
      objetivos="Aplicar métodos numéricos, con apoyo de herramientas computacionales, para resolver ecuaciones diferenciales y sistemas de ecuaciones diferenciales aplicados a problemas de ingeniería."
      conocimientosPrevios="Conocimientos generales de Ecuaciones Diferenciales"
      subtemas={subtemas}
      activeSection={activeSection}
      onSelectSection={onSelectSection}
    >
      {activeSection === 'subtema_5_1' && <Subtema5_1 />}
      {activeSection === 'subtema_5_2' && <Subtema5_2 />}
      {activeSection === 'subtema_5_3' && <Subtema5_3 />}
      {activeSection === 'subtema_5_4' && <Subtema5_4 />}
      {activeSection === 'subtema_5_5' && <Subtema5_5 />}
    </CapituloLayout>
  );
};

export default Index;