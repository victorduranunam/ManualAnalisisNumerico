import React from 'react';
import SubtemaLayout from '../../../components/SubtemaLayout';

// Importaciones de los subcomponentes del Subtema 2.4
import FundamentosTab from './subtema_2_4_components/FundamentosTab';
import VideosTab from './subtema_2_4_components/VideosTab';
//import SimuladorTab from './subtema_2_4_components/SimuladorTab';
//import EjerciciosTab from './subtema_2_4_components/EjerciciosTab';
import CuestionarioTab from './subtema_2_4_components/CuestionarioTab';

export const Subtema_2_4 = () => {
  return (
    <SubtemaLayout
      titulo={
        <>
          2.4 - Thonny <i className="bi bi-laptop-fill ms-2"></i>
        </>
      }
      headerBg="dark"
      fundamentos={<FundamentosTab />}
      videos={<VideosTab />}
      //simulador={<SimuladorTab />}
    //  ejercicios={<EjerciciosTab />}
      cuestionario={<CuestionarioTab />}
    />
  );
};

export default Subtema_2_4;