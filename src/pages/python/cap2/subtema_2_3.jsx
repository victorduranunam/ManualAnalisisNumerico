import React from 'react';
import SubtemaLayout from '../../../components/SubtemaLayout';

// Importaciones de los subcomponentes del Subtema 2.3
import FundamentosTab from './subtema_2_3_components/FundamentosTab';
import VideosTab from './subtema_2_3_components/VideosTab';
//import SimuladorTab from './subtema_2_3_components/SimuladorTab';
//import EjerciciosTab from './subtema_2_3_components/EjerciciosTab';
import CuestionarioTab from './subtema_2_3_components/CuestionarioTab';

export const Subtema_2_3 = () => {
  return (
    <SubtemaLayout
      titulo={
        <>
          2.3 - Programación desde Android con Pydroid <i className="bi bi-phone-fill ms-2"></i>
        </>
      }
      headerBg="dark"
      fundamentos={<FundamentosTab />}
      videos={<VideosTab />}
  //    simulador={<SimuladorTab />}
  //    ejercicios={<EjerciciosTab />}
      cuestionario={<CuestionarioTab />}
    />
  );
};

export default Subtema_2_3;