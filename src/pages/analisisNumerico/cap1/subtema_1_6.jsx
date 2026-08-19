import React from 'react';
import SubtemaLayout from '../../../components/SubtemaLayout';

// Importaciones de los componentes del Subtema 1.6
import FundamentosTab from './subtema_1_6_components/FundamentosTab';
import VideosTab from './subtema_1_6_components/VideosTab';
import SimuladorTab from './subtema_1_6_components/SimuladorTab';
import EjerciciosTab from './subtema_1_6_components/EjerciciosTab';
import CuestionarioTab from './subtema_1_6_components/CuestionarioTab';

export const Subtema_1_6 = () => {
  return (
    <SubtemaLayout
      titulo="1.6 - Implementación y herramientas computacionales para métodos numéricos en Ingeniería"
      headerBg="primary"
      fundamentos={<FundamentosTab />}
      videos={<VideosTab />}
      simulador={<SimuladorTab />}
      ejercicios={<EjerciciosTab />}
      cuestionario={<CuestionarioTab />}
    />
  );
};

export default Subtema_1_6;