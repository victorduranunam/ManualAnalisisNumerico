import React from 'react';
import SubtemaLayout from '../../../components/SubtemaLayout';

// Importaciones de los subcomponentes del Subtema 2.2
import FundamentosTab from './subtema_2_2_components/FundamentosTab';
import VideosTab from './subtema_2_2_components/VideosTab';
import CuestionarioTab from './subtema_2_2_components/CuestionarioTab';

export const Subtema_2_2 = () => {
  return (
    <SubtemaLayout
      titulo={
        <>
          2.2 Programación en la nube con Google Colab <i className="bi bi-cloud-fill ms-2"></i>
        </>
      }
      headerBg="dark"
      fundamentos={<FundamentosTab />}
      videos={<VideosTab />}
      cuestionario={<CuestionarioTab />}
    />
  );
};

export default Subtema_2_2;