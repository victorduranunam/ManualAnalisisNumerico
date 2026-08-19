import React from 'react';
import SubtemaLayout from '../../../components/SubtemaLayout';

// Importaciones de los componentes del Subtema 1.4
import FundamentosTab from './subtema_1_4_components/FundamentosTab';
import VideosTab from './subtema_1_4_components/VideosTab';
import SimuladorTab from './subtema_1_4_components/SimuladorTab';
import EjerciciosTab from './subtema_1_4_components/EjerciciosTab';
import CuestionarioTab from './subtema_1_4_components/CuestionarioTab';

export const Subtema_1_4 = () => {
  return (
    <SubtemaLayout
      titulo="1.4 - Criterios fundamentales en métodos numéricos: precisión, estabilidad y convergencia"
      headerBg="primary"
      fundamentos={<FundamentosTab />}
      videos={<VideosTab />}
      simulador={<SimuladorTab />}
      ejercicios={<EjerciciosTab />}
      cuestionario={<CuestionarioTab />}
    />
  );
};

export default Subtema_1_4;