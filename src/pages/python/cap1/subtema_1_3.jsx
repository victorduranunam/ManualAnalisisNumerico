import React from 'react';
import SubtemaLayout from '../../../components/SubtemaLayout';

// Importaciones de los componentes de las pestañas del Subtema 1.3
import FundamentosTab from './subtema_1_3_components/FundamentosTab';
//import VideosTab from './subtema_1_3_components/VideosTab';
//import SimuladorTab from './subtema_1_3_components/SimuladorTab';
//import EjerciciosTab from './subtema_1_3_components/EjerciciosTab';
import CuestionarioTab from './subtema_1_3_components/CuestionarioTab';

const Subtema1_3 = () => {
  return (
    <SubtemaLayout
      titulo="1.3 Aplicación en el Análisis Numérico"
      headerBg="dark"
      fundamentos={<FundamentosTab />}
      //videos={<VideosTab />}
      //simulador={<SimuladorTab />}
      //ejercicios={<EjerciciosTab />}
      cuestionario={<CuestionarioTab />}
    />
  );
};

export default Subtema1_3;