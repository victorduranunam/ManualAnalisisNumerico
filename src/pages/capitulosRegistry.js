// src/pages/capitulosRegistry.js

// 1. Análisis Numérico - Capítulo 1
import AnCap1Index from './analisisNumerico/cap1/Index';

// 2. Análisis Numérico - Capítulo 2
import AnCap2Index from './analisisNumerico/cap2/Index';



// 2. Python - Capítulo 1
import PyCap1Index from './python/cap1/Index';

export const vistasPersonalizadas = {
  // Clave en tu data -> Componente React
  'cap1': AnCap1Index,
  'cap2': AnCap2Index,
  'py_cap1': PyCap1Index,
};