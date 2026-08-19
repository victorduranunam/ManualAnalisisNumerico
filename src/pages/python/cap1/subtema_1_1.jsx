import React from 'react';
// 1. Importas el layout genérico de pestañas
import SubtemaLayout from '../../../components/SubtemaLayout';

// 2. Mantenemos las mismas importaciones que ya tenías
import FundamentosTab from './subtema_1_1_components/FundamentosTab';
import VideosTab from './subtema_1_1_components/VideosTab';
import SimuladorTab from './subtema_1_1_components/SimuladorTab';
import EjerciciosTab from './subtema_1_1_components/EjerciciosTab';
import CuestionarioTab from './subtema_1_1_components/CuestionarioTab';

const Subtema1_1 = () => {
  return (
    <SubtemaLayout
      titulo="1.1 Introducción a Python y su uso en el Análisis Numérico"
      headerBg="dark" // Le ponemos dark para que se vea verde/oscuro tipo Python
      fundamentos={<FundamentosTab />}
      videos={<VideosTab />}
      simulador={<SimuladorTab />}
      ejercicios={<EjerciciosTab />}
      cuestionario={<CuestionarioTab />}
    />
  );
};

export default Subtema1_1;