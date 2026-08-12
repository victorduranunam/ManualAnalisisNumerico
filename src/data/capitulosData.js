const buildSubtemas = (numero, prefix = 'Subtema') => [
  { id: `${numero}.1`, title: `${numero}.1 ${prefix} inicial` },
  { id: `${numero}.2`, title: `${numero}.2 ${prefix} complementario` },
  { id: `${numero}.3`, title: `${numero}.3 ${prefix} clave` },
  { id: `${numero}.4`, title: `${numero}.4 ${prefix} de aplicación` },
  { id: `${numero}.5`, title: `${numero}.5 ${prefix} de ejemplos` },
  { id: `${numero}.6`, title: `${numero}.6 ${prefix} de práctica` },
  { id: `${numero}.7`, title: `${numero}.7 ${prefix} avanzado` },
  { id: `${numero}.8`, title: `${numero}.8 ${prefix} final` },
];

export const capitulosData = [
  {
    id: 'cap1',
    numero: 1,
    title: 'Teoría de Errores',
    descripcion: 'Conceptos de error absoluto, relativo, redondeo, truncamiento y propagación de errores.',
    icon: 'bi-calculator',
    subtemas: buildSubtemas(1, 'Tema')
  },
  {
    id: 'cap2',
    numero: 2,
    title: 'Ecuaciones No Lineales',
    descripcion: 'Métodos para la búsqueda de raíces en funciones continuas de una variable.',
    icon: 'bi-diagram-3',
    subtemas: buildSubtemas(2, 'Tema')
  },
  {
    id: 'cap3',
    numero: 3,
    title: 'Sistemas de Ecuaciones',
    descripcion: 'Solución de sistemas lineales mediante métodos directos e iterativos.',
    icon: 'bi-grid-3x3',
    subtemas: buildSubtemas(3, 'Tema')
  },
  {
    id: 'cap4',
    numero: 4,
    title: 'Interpolación y Ajuste',
    descripcion: 'Ajuste de datos por mínimos cuadrados y polinomiales de Lagrange y Newton.',
    icon: 'bi-graph-up',
    subtemas: buildSubtemas(4, 'Tema')
  },
  {
    id: 'cap5',
    numero: 5,
    title: 'Integración Numérica',
    descripcion: 'Aproximación de integrales definidas por reglas compuestas y cuadraturas.',
    icon: 'bi-ui-checks',
    subtemas: buildSubtemas(5, 'Tema')
  },
  {
    id: 'cap6',
    numero: 6,
    title: 'Ecuaciones Diferenciales',
    descripcion: 'Solución numérica de problemas de valor inicial y condiciones en la frontera.',
    icon: 'bi-activity',
    subtemas: buildSubtemas(6, 'Tema')
  }
];

const buildPythonSubtemas = (capNumero) => [
  { id: `py_${capNumero}.1`, title: `${capNumero}.1 Conceptos básicos` },
  { id: `py_${capNumero}.2`, title: `${capNumero}.2 Sintaxis y estructuras` },
  { id: `py_${capNumero}.3`, title: `${capNumero}.3 Variables y tipos de datos` },
  { id: `py_${capNumero}.4`, title: `${capNumero}.4 Funciones y modularidad` },
  { id: `py_${capNumero}.5`, title: `${capNumero}.5 Estructuras de control` },
  { id: `py_${capNumero}.6`, title: `${capNumero}.6 Listas, tuplas y diccionarios` },
  { id: `py_${capNumero}.7`, title: `${capNumero}.7 Archivos y entrada/salida` },
  { id: `py_${capNumero}.8`, title: `${capNumero}.8 Bibliotecas útiles` },
  { id: `py_${capNumero}.9`, title: `${capNumero}.9 Ejercicios prácticos` },
  { id: `py_${capNumero}.10`, title: `${capNumero}.10 Evaluación y cierre` },
];

export const pythonData = [
  {
    id: 'py_cap1',
    numero: 1,
    title: 'Python I: Fundamentos y sintaxis',
    descripcion: 'Introducción a Python, variables, tipos de datos, funciones y control de flujo.',
    icon: 'bi-filetype-py',
    subtemas: buildPythonSubtemas(1)
  },
  {
    id: 'py_cap2',
    numero: 2,
    title: 'Python II: Colecciones y programación estructurada',
    descripcion: 'Listas, tuplas, diccionarios, iteraciones, condiciones y modularidad.',
    icon: 'bi-code-square',
    subtemas: buildPythonSubtemas(2)
  },
  {
    id: 'py_cap3',
    numero: 3,
    title: 'Python III: Funciones y reutilización de código',
    descripcion: 'Escritura de funciones, parámetros, retorno de valores y buenas prácticas.',
    icon: 'bi-terminal',
    subtemas: buildPythonSubtemas(3)
  },
  {
    id: 'py_cap4',
    numero: 4,
    title: 'Python IV: Manejo de archivos y datos',
    descripcion: 'Lectura, escritura, procesamiento de archivos y organización de información.',
    icon: 'bi-file-earmark-text',
    subtemas: buildPythonSubtemas(4)
  },
  {
    id: 'py_cap5',
    numero: 5,
    title: 'Python V: Programación orientada a objetos',
    descripcion: 'Clases, objetos, encapsulamiento, herencia y métodos en Python.',
    icon: 'bi-people',
    subtemas: buildPythonSubtemas(5)
  },
  {
    id: 'py_cap6',
    numero: 6,
    title: 'Python VI: NumPy y álgebra lineal',
    descripcion: 'Uso de arreglos, operaciones vectorizadas y cálculo científico con NumPy.',
    icon: 'bi-cpu',
    subtemas: buildPythonSubtemas(6)
  },
  {
    id: 'py_cap7',
    numero: 7,
    title: 'Python VII: Pandas para análisis de datos',
    descripcion: 'Series, DataFrames, filtrado, agrupación y análisis exploratorio.',
    icon: 'bi-table',
    subtemas: buildPythonSubtemas(7)
  },
  {
    id: 'py_cap8',
    numero: 8,
    title: 'Python VIII: Visualización con Matplotlib',
    descripcion: 'Graficación 2D, estilos, múltiples series y representación visual de resultados.',
    icon: 'bi-bar-chart-line',
    subtemas: buildPythonSubtemas(8)
  },
  {
    id: 'py_cap9',
    numero: 9,
    title: 'Python IX: Automatización y scripts',
    descripcion: 'Ejecutables, automatización, utilidades y tareas de rutina en Python.',
    icon: 'bi-robot',
    subtemas: buildPythonSubtemas(9)
  },
  {
    id: 'py_cap10',
    numero: 10,
    title: 'Python X: Proyecto final y buenas prácticas',
    descripcion: 'Integración de conceptos, diseño de scripts y desarrollo de soluciones reproducibles.',
    icon: 'bi-check2-square',
    subtemas: buildPythonSubtemas(10)
  }
];