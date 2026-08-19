import React from 'react';
import CapituloLayout from '../../../components/CapituloLayout';

// Importaciones de los subtemas
import Subtema4_1 from './subtema_4_1';
import Subtema4_2 from './subtema_4_2';
import Subtema4_3 from './subtema_4_3';
import Subtema4_4 from './subtema_4_4';
import Subtema4_5 from './subtema_4_5';

export const Index = ({ activeSection, onSelectSection }) => {
  const subtemas = [
    { id: 'subtema_4_1', title: '4.1 Interpolación de Lagrange' },
    { id: 'subtema_4_2', title: '4.2 Diferencias finitas. Interpolación con incrementos constantes' },
    { id: 'subtema_4_3', title: '4.3 Derivación numérica: esquemas hacia adelante, atrás y centrados' },
    { id: 'subtema_4_4', title: '4.4 Integración numérica: método del trapecio, Simpson 1/3 y Simpson 3/8' },
    { id: 'subtema_4_5', title: '4.5 Implementación computacional en problemas de ingeniería' },
  ];

  return (
    <CapituloLayout
      materia="analisisNumerico"
      capNumero={4}
      titulo="Interpolación, derivación e integración numéricas"
      descripcion="Aproximación de funciones mediante interpolación y cálculo de derivadas e integrales a partir de datos discretos."
      objetivos="Aplicar métodos numéricos para interpolar, derivar e integrar funciones definidas por datos discretos, utilizando herramientas computacionales para obtener soluciones con la precisión deseada en problemas de ingeniería."
      conocimientosPrevios="Conocimientos generales de Cálculo Diferencial e Integral"
      subtemas={subtemas}
      activeSection={activeSection}
      onSelectSection={onSelectSection}
    >
      {activeSection === 'subtema_4_1' && <Subtema4_1 />}
      {activeSection === 'subtema_4_2' && <Subtema4_2 />}
      {activeSection === 'subtema_4_3' && <Subtema4_3 />}
      {activeSection === 'subtema_4_4' && <Subtema4_4 />}
      {activeSection === 'subtema_4_5' && <Subtema4_5 />}
    </CapituloLayout>
  );
};

export default Index;