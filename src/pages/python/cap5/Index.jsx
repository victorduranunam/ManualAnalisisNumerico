import React from 'react';
import CapituloLayout from '../../../components/CapituloLayout';

// Importaciones de los subtemas
import Subtema5_1 from './subtema_5_1';
import Subtema5_2 from './subtema_5_2';
import Subtema5_3 from './subtema_5_3';
import Subtema5_4 from './subtema_5_4';
import Subtema5_5 from './subtema_5_5';
import Subtema5_6 from './subtema_5_6';
import Subtema5_7 from './subtema_5_7';
import Subtema5_8 from './subtema_5_8';
import Subtema5_9 from './subtema_5_9';
import Subtema5_10 from './subtema_5_10';

export const Index = ({ activeSection, onSelectSection }) => {
  const subtemas = [
    { id: 'py_5_1', title: '5.1 Acceso a elementos de arreglos unidimensionales' },
    { id: 'py_5_2', title: '5.2 Modificación de elementos en arreglos' },
    { id: 'py_5_3', title: '5.3 Acceso a elementos de matrices' },
    { id: 'py_5_4', title: '5.4 Modificación de elementos en matrices  ' },
    { id: 'py_5_5', title: '5.5 Selección de filas y columnas  ' },
    { id: 'py_5_6', title: '5.6  Selección de rangos de datos (slicing)' },
    { id: 'py_5_7', title: '5.7 Extracción de submatrices ' },
    { id: 'py_5_8', title: '5.8 Copia de arreglos y referencias ' },
    { id: 'py_5_9', title: '5.9 Consulta de características de un arreglo ' },
    { id: 'py_5_10', title: '5.10 Importancia en análisis numérico ' },
  ];

  return (
    <CapituloLayout
      materia="python"
      capNumero={5}
      titulo="Acceso y manipulación de arreglos y matrices en Python"
      descripcion="Este primer módulo ofrece una visión general sobre la utilidad de Python como herramienta computacional en la ingeniería. A lo largo de la sección se muestra cómo la sencillez del lenguaje y sus librerías especializadas facilitan la aplicación del análisis numérico, convirtiéndolo en un entorno práctico para resolver ecuaciones, manipular matrices y graficar resultados."
      objetivos="Comprender los fundamentos del lenguaje Python, su filosofía y el ecosistema de librerías especializadas como herramienta computacional para el desarrollo y solución de algoritmos del análisis numérico."
      conocimientosPrevios="Lógica de programación básica o conocimientos elementales de computación."
      subtemas={subtemas}
      activeSection={activeSection}
      onSelectSection={onSelectSection}
    >
      {activeSection === 'py_5_1' && <Subtema5_1 />}
      {activeSection === 'py_5_2' && <Subtema5_2 />}
      {activeSection === 'py_5_3' && <Subtema5_3 />}
      {activeSection === 'py_5_4' && <Subtema5_4 />}
      {activeSection === 'py_5_5' && <Subtema5_5 />}
      {activeSection === 'py_5_6' && <Subtema5_6 />}
      {activeSection === 'py_5_7' && <Subtema5_7 />}
      {activeSection === 'py_5_8' && <Subtema5_8 />}
      {activeSection === 'py_5_9' && <Subtema5_9 />}
      {activeSection === 'py_5_10' && <Subtema5_10 />}
    

    </CapituloLayout>
  );
};

export default Index;