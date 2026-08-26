import React from 'react';
import CapituloLayout from '../../../components/CapituloLayout';

// Importaciones de los 9 subtemas del Capítulo 3
import Subtema3_1 from './subtema_3_1';
import Subtema3_2 from './subtema_3_2';
import Subtema3_3 from './subtema_3_3';
import Subtema3_4 from './subtema_3_4';
import Subtema3_5 from './subtema_3_5';
import Subtema3_6 from './subtema_3_6';
import Subtema3_7 from './subtema_3_7';
import Subtema3_8 from './subtema_3_8';

export const Index = ({ activeSection, onSelectSection }) => {
  const subtemas = [
    { id: 'py_3_1', title: '3.1 Incorporación de bibliotecas' },
    { id: 'py_3_2', title: '3.2 Utilización de variables' },
    { id: 'py_3_3', title: '3.3 Captura de datos desde el teclado' },
    { id: 'py_3_4', title: '3.4 Conversión de datos' },
    { id: 'py_3_5', title: '3.5 Utilización de las bibliotecas instaladas' },
    { id: 'py_3_6', title: '3.6 Transformación de grados a radianes' },
    { id: 'py_3_7', title: '3.7 Presentación de resultados' },
    { id: 'py_3_8', title: '3.8 Formateo de resultados' },
  ];

  return (
    <CapituloLayout
      materia="python"
      capNumero={3}
      titulo="Creando el primer programa en Python"
      descripcion="Desarrollo de programas prácticos en Python integrando captura de datos, manejo de variables, operaciones numéricas, bibliotecas especializadas y formateo de resultados."
      objetivos="Aprender la sintaxis básica y estructura de un programa en Python, integrando el uso de bibliotecas como NumPy para la solución de problemas de ingeniería."
      conocimientosPrevios="Entornos de desarrollo en Python (VS Code, Google Colab o Thonny) e instalación básica de paquetes."
      subtemas={subtemas}
      activeSection={activeSection}
      onSelectSection={onSelectSection}
    >
      {activeSection === 'py_3_1' && <Subtema3_1 />}
      {activeSection === 'py_3_2' && <Subtema3_2 />}
      {activeSection === 'py_3_3' && <Subtema3_3 />}
      {activeSection === 'py_3_4' && <Subtema3_4 />}
      {activeSection === 'py_3_5' && <Subtema3_5 />}
      {activeSection === 'py_3_6' && <Subtema3_6 />}
      {activeSection === 'py_3_7' && <Subtema3_7 />}
      {activeSection === 'py_3_8' && <Subtema3_8 />}
    </CapituloLayout>
  );
};

export default Index;