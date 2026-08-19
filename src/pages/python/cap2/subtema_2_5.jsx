import React from 'react';
import SubtemaLayout from '../../../components/SubtemaLayout';

// Importaciones de los subcomponentes del Subtema 2.5
import FundamentosTab from './subtema_2_5_components/FundamentosTab';
import VideosTab from './subtema_2_5_components/VideosTab';
import SimuladorTab from './subtema_2_5_components/SimuladorTab';
import EjerciciosTab from './subtema_2_5_components/EjerciciosTab';
import CuestionarioTab from './subtema_2_5_components/CuestionarioTab';

export const Subtema_2_5 = () => {
  return (
    <SubtemaLayout
      titulo={
        <>
          2.5 - Instalación de Python <i className="bi bi-download ms-2"></i>
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

export default Subtema_2_5;