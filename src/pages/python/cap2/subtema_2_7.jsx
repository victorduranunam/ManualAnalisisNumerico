import React from 'react';
import SubtemaLayout from '../../../components/SubtemaLayout';

// Importaciones de los subcomponentes del Subtema 2.7
import FundamentosTab from './subtema_2_7_components/FundamentosTab';
import VideosTab from './subtema_2_7_components/VideosTab';
import SimuladorTab from './subtema_2_7_components/SimuladorTab';
import EjerciciosTab from './subtema_2_7_components/EjerciciosTab';
import CuestionarioTab from './subtema_2_7_components/CuestionarioTab';

export const Subtema_2_7 = () => {
  return (
    <SubtemaLayout
      titulo={
        <>
          2.7 ¿Qué entorno utilizar? <i className="bi bi-question-circle-fill ms-2"></i>
        </>
      }
      headerBg="dark"
      fundamentos={<FundamentosTab />}
      videos={<VideosTab />}
      simulador={<SimuladorTab />}
      ejercicios={<EjerciciosTab />}
      cuestionario={<CuestionarioTab />}
    />
  );
};

export default Subtema_2_7;