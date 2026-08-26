import React from 'react';
import CapituloLayout from '../../../components/CapituloLayout';

// Importaciones de los subtemas
import Subtema8_1 from './subtema_8_1';
import Subtema8_2 from './subtema_8_2';
import Subtema8_3 from './subtema_8_3';
import Subtema8_4 from './subtema_8_4';
import Subtema8_5 from './subtema_8_5';
import Subtema8_6 from './subtema_8_6';
import Subtema8_7 from './subtema_8_7';


export const Index = ({ activeSection, onSelectSection }) => {
const subtemas = [
  { id: 'py_8_1', title: '8.1 Incorporación e importación de Matplotlib' },
  { id: 'py_8_2', title: '8.2 Gráfica básica con datos estáticos' },
  { id: 'py_8_3', title: '8.3 Gráfica con Etiquetas de Ejes (Títulos y Subtítulos)' },
  { id: 'py_8_4', title: '8.4 Gráficas con datos dinámicos y funciones matemáticas' },
  { id: 'py_8_5', title: '8.5 Personalización y formato de gráficos' },
  { id: 'py_8_6', title: '8.6 Gráficas tridimensionales (3D)' },
  { id: 'py_8_7', title: '8.7 Uso de la galería oficial de Matplotlib' },
];

  return (
    <CapituloLayout
      materia="python"
      capNumero={8}
      titulo="Graficas"
      descripcion="Este primer módulo ofrece una visión general sobre la utilidad de Python como herramienta computacional en la ingeniería. A lo largo de la sección se muestra cómo la sencillez del lenguaje y sus librerías especializadas facilitan la aplicación del análisis numérico, convirtiéndolo en un entorno práctico para resolver ecuaciones, manipular matrices y graficar resultados."
      objetivos="Comprender los fundamentos del lenguaje Python, su filosofía y el ecosistema de librerías especializadas como herramienta computacional para el desarrollo y solución de algoritmos del análisis numérico."
      conocimientosPrevios="Lógica de programación básica o conocimientos elementales de computación."
      subtemas={subtemas}
      activeSection={activeSection}
      onSelectSection={onSelectSection}
    >
      {activeSection === 'py_8_1' && <Subtema8_1 />}
      {activeSection === 'py_8_2' && <Subtema8_2 />}
      {activeSection === 'py_8_3' && <Subtema8_3 />}
      {activeSection === 'py_8_4' && <Subtema8_4 />}
      {activeSection === 'py_8_5' && <Subtema8_5 />}
      {activeSection === 'py_8_6' && <Subtema8_6 />}
      {activeSection === 'py_8_7' && <Subtema8_7 />}
    
    </CapituloLayout>
  );
};

export default Index;