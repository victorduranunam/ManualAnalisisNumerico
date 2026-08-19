import React from 'react';
import SubtemaLayout from '../../../components/SubtemaLayout';

// Importaciones de los componentes del Subtema 1.3
import FundamentosTab from './subtema_1_3_components/FundamentosTab';
import VideosTab from './subtema_1_3_components/VideosTab';
import SimuladorTab from './subtema_1_3_components/SimuladorTab';
import EjerciciosTab from './subtema_1_3_components/EjerciciosTab';
import CuestionarioTab from './subtema_1_3_components/CuestionarioTab';

export const Subtema_1_3 = () => {
  return (
    <SubtemaLayout
      titulo="1.3 - Clasificación de los errores numéricos"
      headerBg="primary"
      fundamentos={<FundamentosTab />}
      videos={<VideosTab />}
      simulador={<SimuladorTab />}
      ejercicios={<EjerciciosTab />}
      cuestionario={<CuestionarioTab />}
    />
  );
};

export default Subtema_1_3;