import React from 'react';
import CapituloLayout from '../../../components/CapituloLayout';

// Importaciones de los subtemas
import Subtema6_1 from './subtema_6_1';
import Subtema6_2 from './subtema_6_2';
import Subtema6_3 from './subtema_6_3';
import Subtema6_4 from './subtema_6_4';
import Subtema6_5 from './subtema_6_5';
import Subtema6_6 from './subtema_6_6';
import Subtema6_7 from './subtema_6_7';
import Subtema6_8 from './subtema_6_8';
import Subtema6_9 from './subtema_6_9';
import Subtema6_10 from './subtema_6_10';
import Subtema6_11 from './subtema_6_11';
import Subtema6_12 from './subtema_6_12';
import Subtema6_13 from './subtema_6_13';
import Subtema6_14 from './subtema_6_14';


export const Index = ({ activeSection, onSelectSection }) => {
const subtemas = [
    { id: 'py_6_1',  title: '6.1 Bloques de código e indentación' },
    { id: 'py_6_2',  title: '6.2 Estructura if' },
    { id: 'py_6_3',  title: '6.3 Estructura if...else' },
    { id: 'py_6_4',  title: '6.4 Estructura if...elif...else' },
    { id: 'py_6_5',  title: '6.5 Operadores de comparación' },
    { id: 'py_6_6',  title: '6.6 Operadores lógicos en condiciones' },
    { id: 'py_6_7',  title: '6.7 Cómo funciona el ciclo for en general' },
    { id: 'py_6_8',  title: '6.8 Cómo generar secuencias numéricas con range() y np.arange()' },
    { id: 'py_6_9',  title: '6.9 Cómo iterar elemento por elemento en colecciones básicas de Python (list, str)' },
    { id: 'py_6_10', title: '6.10 Cómo iterar y operar sobre arreglos científicos de numpy.ndarray' },
    { id: 'py_6_11', title: '6.11 Cómo obtener el índice i y el valor al mismo tiempo con enumerate()' },
    { id: 'py_6_12', title: '6.12 Ciclo while para condiciones dinámicas' },
    { id: 'py_6_13', title: '6.13 Control de interrupción con break y continue' },
    { id: 'py_6_14', title: '6.14 Matrices y tablas con ciclos anidados' },
  ];

  return (
    <CapituloLayout
      materia="python"
      capNumero={6}
      titulo="Fundamentos de Python"
      descripcion="Este primer módulo ofrece una visión general sobre la utilidad de Python como herramienta computacional en la ingeniería. A lo largo de la sección se muestra cómo la sencillez del lenguaje y sus librerías especializadas facilitan la aplicación del análisis numérico, convirtiéndolo en un entorno práctico para resolver ecuaciones, manipular matrices y graficar resultados."
      objetivos="Comprender los fundamentos del lenguaje Python, su filosofía y el ecosistema de librerías especializadas como herramienta computacional para el desarrollo y solución de algoritmos del análisis numérico."
      conocimientosPrevios="Lógica de programación básica o conocimientos elementales de computación."
      subtemas={subtemas}
      activeSection={activeSection}
      onSelectSection={onSelectSection}
    >
      {activeSection === 'py_6_1' && <Subtema6_1 />}
      {activeSection === 'py_6_2' && <Subtema6_2 />}
      {activeSection === 'py_6_3' && <Subtema6_3 />}
      {activeSection === 'py_6_4' && <Subtema6_4 />}
      {activeSection === 'py_6_5' && <Subtema6_5 />}
      {activeSection === 'py_6_6' && <Subtema6_6 />}
      {activeSection === 'py_6_7' && <Subtema6_7 />}
      {activeSection === 'py_6_8' && <Subtema6_8 />}
      {activeSection === 'py_6_9' && <Subtema6_9 />}
      {activeSection === 'py_6_10' && <Subtema6_10 />}
      {activeSection === 'py_6_11' && <Subtema6_11 />}
      {activeSection === 'py_6_12' && <Subtema6_12 />}
      {activeSection === 'py_6_13' && <Subtema6_13 />}
      {activeSection === 'py_6_14' && <Subtema6_14 />}
    
    
    </CapituloLayout>
  );
};

export default Index;