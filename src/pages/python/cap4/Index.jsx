import React from 'react';
import CapituloLayout from '../../../components/CapituloLayout';

// Importaciones de los subtemas
import Subtema4_1 from './subtema_4_1';
import Subtema4_2 from './subtema_4_2';
import Subtema4_3 from './subtema_4_3';
import Subtema4_4 from './subtema_4_4';
import Subtema4_5 from './subtema_4_5';
import Subtema4_6 from './subtema_4_6';
import Subtema4_7 from './subtema_4_7';
import Subtema4_8 from './subtema_4_8';
import Subtema4_9 from './subtema_4_9';
import Subtema4_10 from './subtema_4_10';
import Subtema4_11 from './subtema_4_11';
import Subtema4_12 from './subtema_4_12';



export const Index = ({ activeSection, onSelectSection }) => {
  const subtemas = [
    { id: 'py_4_1', title: '4.1 Tipos de datos en Python' },
    { id: 'py_4_2', title: '4.2 Números enteros' },
    { id: 'py_4_3', title: '4.3 Números reales' },
    { id: 'py_4_4', title: '4.4 Números complejos' },
    { id: 'py_4_5', title: '4.5 Cadenas de texto' },
    { id: 'py_4_6', title: '4.6 Listas' },
    { id: 'py_4_7', title: '4.7 Tuplas' },
    { id: 'py_4_8', title: '4.8 Diccionarios' },
    { id: 'py_4_9', title: '4.9 Arreglos' },
    { id: 'py_4_10', title: '4.10 Vectores y matrices' },
    { id: 'py_4_11', title: '4.11 Secuencias' },
    { id: 'py_4_12', title: '4.12 Creación de arreglos inicializados' },
  ];






  return (
    <CapituloLayout
      materia="python"
      capNumero={4}
      titulo="Manejo de variables y estructuras de datos en Python"
      descripcion="Condicionales (if, elif, else) y ciclos de repetición (for, while) aplicados a algoritmos numéricos."
      objetivos="Implementar estructuras de control para dirigir el flujo de ejecución de algoritmos computacionales."
      conocimientosPrevios="Tipos de datos y operadores lógicos en Python."
      subtemas={subtemas}
      activeSection={activeSection}
      onSelectSection={onSelectSection}
    >
      {activeSection === 'py_4_1' && <Subtema4_1 />}
      {activeSection === 'py_4_2' && <Subtema4_2 />}
      {activeSection === 'py_4_3' && <Subtema4_3 />}
      {activeSection === 'py_4_4' && <Subtema4_4 />}
      {activeSection === 'py_4_5' && <Subtema4_5 />}
      {activeSection === 'py_4_6' && <Subtema4_6 />}
      {activeSection === 'py_4_7' && <Subtema4_7 />}
      {activeSection === 'py_4_8' && <Subtema4_8 />}
      {activeSection === 'py_4_9' && <Subtema4_9 />}
      {activeSection === 'py_4_10' && <Subtema4_10 />}
      {activeSection === 'py_4_11' && <Subtema4_11 />}
      {activeSection === 'py_4_12' && <Subtema4_12 />}
    </CapituloLayout>
  );
};

export default Index;