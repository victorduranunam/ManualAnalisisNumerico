import React from 'react';
import CapituloLayout from '../../../components/CapituloLayout';

// Importaciones de los subtemas
import Subtema7_1 from './subtema_7_1';
import Subtema7_2 from './subtema_7_2';
import Subtema7_3 from './subtema_7_3';
import Subtema7_4 from './subtema_7_4';
import Subtema7_5 from './subtema_7_5';
import Subtema7_6 from './subtema_7_6';
import Subtema7_7 from './subtema_7_7';
import Subtema7_8 from './subtema_7_8';
import Subtema7_9 from './subtema_7_9';

export const Index = ({ activeSection, onSelectSection }) => {
const subtemas = [
  { id: 'py_7_1', title: '7.1 Concepto de función' },
  { id: 'py_7_2', title: '7.2 Funciones incorporadas de Python (Built-in)' },
  { id: 'py_7_3', title: '7.3 Funciones matemáticas del módulo math' },
  { id: 'py_7_4', title: '7.4 Creación de funciones propias ' },
  { id: 'py_7_5', title: '7.5 Funciones con parámetros y argumentos' },
  { id: 'py_7_6', title: '7.6 Funciones con valores de retorno (return)' },
  { id: 'py_7_7', title: '7.7 Funciones aplicadas al análisis numérico' },
  { id: 'py_7_8', title: '7.8 Funciones con arreglos NumPy' },
  { id: 'py_7_9', title: '7.9 Organización y modularidad de programas' },
];

  return (
    <CapituloLayout
      materia="python"
      capNumero={7}
      titulo="Funciones "
      descripcion="Este primer módulo ofrece una visión general sobre la utilidad de Python como herramienta computacional en la ingeniería. A lo largo de la sección se muestra cómo la sencillez del lenguaje y sus librerías especializadas facilitan la aplicación del análisis numérico, convirtiéndolo en un entorno práctico para resolver ecuaciones, manipular matrices y graficar resultados."
      objetivos="Comprender los fundamentos del lenguaje Python, su filosofía y el ecosistema de librerías especializadas como herramienta computacional para el desarrollo y solución de algoritmos del análisis numérico."
      conocimientosPrevios="Lógica de programación básica o conocimientos elementales de computación."
      subtemas={subtemas}
      activeSection={activeSection}
      onSelectSection={onSelectSection}
    >
      {activeSection === 'py_7_1' && <Subtema7_1 />}
      {activeSection === 'py_7_2' && <Subtema7_2 />}
      {activeSection === 'py_7_3' && <Subtema7_3 />}
      {activeSection === 'py_7_4' && <Subtema7_4 />}
      {activeSection === 'py_7_5' && <Subtema7_5 />}
      {activeSection === 'py_7_6' && <Subtema7_6 />}
      {activeSection === 'py_7_7' && <Subtema7_7 />}
      {activeSection === 'py_7_8' && <Subtema7_8 />}
      {activeSection === 'py_7_9' && <Subtema7_9 />}
      

    </CapituloLayout>
  );
};

export default Index;