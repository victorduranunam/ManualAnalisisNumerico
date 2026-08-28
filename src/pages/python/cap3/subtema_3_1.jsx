import React from 'react';
import SubtemaLayout from '../../../components/SubtemaLayout';

// Importaciones de los subcomponentes del Subtema 3.1
import FundamentosTab from './subtema_3_1_components/FundamentosTab';
import VideosTab from './subtema_3_1_components/VideosTab';
//import SimuladorTab from './subtema_3_1_components/SimuladorTab';
//import EjerciciosTab from './subtema_3_1_components/EjerciciosTab';
//import CuestionarioTab from './subtema_3_1_components/CuestionarioTab';

export const Subtema_3_1 = () => {
  return (
    <SubtemaLayout
      titulo={
        <>
          3.1 Incorporación de bibliotecas <i className="bi bi-box-seam ms-2"></i>
        </>
      }
      headerBg="primary"
      fundamentos={<FundamentosTab />}
      videos={<VideosTab />}
    //  simulador={<SimuladorTab />}
    //  ejercicios={<EjerciciosTab />}
    //  cuestionario={<CuestionarioTab />}
    />
  );
};

export default Subtema_3_1;