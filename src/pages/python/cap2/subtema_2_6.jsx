import React from 'react';
import SubtemaLayout from '../../../components/SubtemaLayout';

// Importaciones de los subcomponentes del Subtema 2.6
import FundamentosTab from './subtema_2_6_components/FundamentosTab';
import VideosTab from './subtema_2_6_components/VideosTab';
import SimuladorTab from './subtema_2_6_components/SimuladorTab';
import EjerciciosTab from './subtema_2_6_components/EjerciciosTab';
import CuestionarioTab from './subtema_2_6_components/CuestionarioTab';

export const Subtema_2_6 = () => {
  return (
    <SubtemaLayout
      titulo={
        <>
          2.6 Visual Studio Code <i className="bi bi-code-slash ms-2"></i>
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

export default Subtema_2_6;