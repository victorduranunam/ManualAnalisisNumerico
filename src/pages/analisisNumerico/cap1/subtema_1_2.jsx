import React from 'react';
import SubtemaLayout from '../../../components/SubtemaLayout';

// Importaciones de los componentes del Subtema 1.2
import FundamentosTab from './subtema_1_2_components/FundamentosTab';
import VideosTab from './subtema_1_2_components/VideosTab';
import SimuladorTab from './subtema_1_2_components/SimuladorTab';
import EjerciciosTab from './subtema_1_2_components/EjerciciosTab';
import CuestionarioTab from './subtema_1_2_components/CuestionarioTab';

export const Subtema1_2 = () => {
  return (
    <SubtemaLayout
      titulo="1.2 Representación de números en punto flotante y sus limitaciones"
      headerBg="primary"
      fundamentos={<FundamentosTab />}
      videos={<VideosTab />}
      simulador={<SimuladorTab />}
      ejercicios={<EjerciciosTab />}
      cuestionario={<CuestionarioTab />}
    />
  );
};

export default Subtema1_2;