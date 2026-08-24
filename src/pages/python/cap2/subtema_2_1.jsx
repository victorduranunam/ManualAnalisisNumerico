import React from 'react';
import SubtemaLayout from '../../../components/SubtemaLayout';

// Importaciones de los subcomponentes del Subtema 2.1
import FundamentosTab from './subtema_2_1_components/FundamentosTab';
//import VideosTab from './subtema_2_1_components/VideosTab';
//import SimuladorTab from './subtema_2_1_components/SimuladorTab';
//import EjerciciosTab from './subtema_2_1_components/EjerciciosTab';
import CuestionarioTab from './subtema_2_1_components/CuestionarioTab';

export const Subtema_2_1 = () => {
  return (
    <SubtemaLayout
      titulo={
        <>
          2.1 Herramientas de desarrollo python <i className="bi bi-gear-fill ms-2"></i>
        </>
      }
      headerBg="dark"
      fundamentos={<FundamentosTab />}
      //videos={<VideosTab />}
      //simulador={<SimuladorTab />}
      //ejercicios={<EjerciciosTab />}
      cuestionario={<CuestionarioTab />}
    />
  );
};

export default Subtema_2_1;