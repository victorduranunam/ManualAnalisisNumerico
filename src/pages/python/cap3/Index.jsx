import React from 'react';
import CapituloLayout from '../../../components/CapituloLayout';

// Importaciones de los subtemas
import Subtema3_1 from './subtema_3_1';
import Subtema3_2 from './subtema_3_2';
import Subtema3_3 from './subtema_3_3';

export const Index = ({ activeSection, onSelectSection }) => {
  const subtemas = [
    { id: 'py_3_1', title: '3.1 Introducción a Python y su uso en el Análisis Numérico' },
    { id: 'py_3_2', title: '3.2 Principios del desarrollo de programas en Python' },
    { id: 'py_3_3', title: '3.3 Aplicación en el Análisis Numérico' },
  ];

  return (
    <CapituloLayout
      materia="python"
      capNumero={3}
      titulo="Tipos de datos y operadores"
      descripcion="Estudio de tipos de datos fundamentales, variables, operadores aritméticos, relacionales y lógicos en Python."
      objetivos="Comprender el manejo de tipos de datos y operadores para la construcción de expresiones y algoritmos en Python."
      conocimientosPrevios="Fundamentos de Python y entorno de desarrollo configurado."
      subtemas={subtemas}
      activeSection={activeSection}
      onSelectSection={onSelectSection}
    >
      {activeSection === 'py_3_1' && <Subtema3_1 />}
      {activeSection === 'py_3_2' && <Subtema3_2 />}
      {activeSection === 'py_3_3' && <Subtema3_3 />}
    </CapituloLayout>
  );
};

export default Index;