import React from 'react';
import SubtemaLayout from '../../../components/SubtemaLayout';

// Importaciones de los componentes del Subtema 1.5
import FundamentosTab from './subtema_1_5_components/FundamentosTab';
import VideosTab from './subtema_1_5_components/VideosTab';
import SimuladorTab from './subtema_1_5_components/SimuladorTab';
import EjerciciosTab from './subtema_1_5_components/EjerciciosTab';
import CuestionarioTab from './subtema_1_5_components/CuestionarioTab';

export const Subtema_1_5 = () => {
  return (
    <SubtemaLayout
      titulo="1.5 - Aproximación de funciones por medio del polinomio de Taylor"
      headerBg="primary"
      fundamentos={<FundamentosTab />}
      videos={<VideosTab />}
      simulador={<SimuladorTab />}
      ejercicios={<EjerciciosTab />}
      cuestionario={<CuestionarioTab />}
    />
  );
};

export default Subtema_1_5;