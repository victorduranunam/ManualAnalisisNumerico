import React from 'react';
import CapituloLayout from '../../../components/CapituloLayout';

// Importaciones de los subtemas
import Subtema2_1 from './subtema_2_1';
import Subtema2_2 from './subtema_2_2';
import Subtema2_3 from './subtema_2_3';

export const Index = ({ activeSection, onSelectSection }) => {
  const subtemas = [
    { id: 'subtema_2_1', title: '2.1 Métodos cerrados para la obtención de raíces' },
    { id: 'subtema_2_2', title: '2.2 Métodos abiertos para la obtención de raíces' },
    { id: 'subtema_2_3', title: '2.3 Implementación computacional en problemas de ingeniería' },
  ];

  return (
    <CapituloLayout
      materia="analisisNumerico"
      capNumero={2}
      titulo="Resolución numérica de ecuaciones algebraicas y trascendentes"
      descripcion="Aplicación de métodos numéricos cerrados y abiertos para la obtención de raíces con soporte computacional."
      objetivos="Aplicar métodos numéricos, con apoyo de herramientas computacionales, para la resolución aproximada de ecuaciones algebraicas y trascendentes, atendiendo a los criterios de convergencia en problemas de ingeniería."
      conocimientosPrevios="Conocimientos generales de Álgebra"
      subtemas={subtemas}
      activeSection={activeSection}
      onSelectSection={onSelectSection}
    >
      {activeSection === 'subtema_2_1' && <Subtema2_1 />}
      {activeSection === 'subtema_2_2' && <Subtema2_2 />}
      {activeSection === 'subtema_2_3' && <Subtema2_3 />}
    </CapituloLayout>
  );
};

export default Index;