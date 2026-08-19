import React from 'react';
import SubtemaLayout from '../../../components/SubtemaLayout';

// Importaciones de los componentes de cada pestaña del Subtema 1.1
import FundamentosTab from './subtema_1_1_components/FundamentosTab';
import VideosTab from './subtema_1_1_components/VideosTab';
import SimuladorTab from './subtema_1_1_components/SimuladorTab';
import EjerciciosTab from './subtema_1_1_components/EjerciciosTab';
import CuestionarioTab from './subtema_1_1_components/CuestionarioTab';

export const Subtema1_1 = () => {
  return (
    <SubtemaLayout
      titulo="1.1 Importancia de los métodos numéricos en Ingeniería"
      headerBg="primary"
      fundamentos={<FundamentosTab />}
      videos={<VideosTab />}
      simulador={<SimuladorTab />}
      ejercicios={<EjerciciosTab />}
      cuestionario={<CuestionarioTab />}
    />
  );
};

export default Subtema1_1;