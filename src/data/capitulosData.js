const buildSubtemas = (numero, prefix) => [
  { id: `${numero}.1`, title: `${numero}.1 Subtema inicial` },
  { id: `${numero}.2`, title: `${numero}.2 Subtema complementario` },
  { id: `${numero}.3`, title: `${numero}.3 Conceptos clave` },
  { id: `${numero}.4`, title: `${numero}.4 Método o aplicación` },
  { id: `${numero}.5`, title: `${numero}.5 Ejemplos y análisis` },
  { id: `${numero}.6`, title: `${numero}.6 Ejercicios y práctica` },
  { id: `${numero}.7`, title: `${numero}.7 Casos avanzados` },
  { id: `${numero}.8`, title: `${numero}.8 Evaluación y cierre` },
];

export const capitulosData = [
  {
    id: 'cap1',
    numero: 1,
    title: 'Teoría de Errores',
    descripcion: 'Conceptos de error absoluto, relativo, redondeo, truncamiento y propagación de errores.',
    icon: 'bi-calculator',
    subtemas: buildSubtemas(1)
  },
  {
    id: 'cap2',
    numero: 2,
    title: 'Ecuaciones No Lineales',
    descripcion: 'Métodos para la búsqueda de raíces en funciones continuas de una variable.',
    icon: 'bi-diagram-3',
    subtemas: buildSubtemas(2)
  },
  {
    id: 'cap3',
    numero: 3,
    title: 'Sistemas de Ecuaciones',
    descripcion: 'Solución de sistemas lineales mediante métodos directos e iterativos.',
    icon: 'bi-grid-3x3',
    subtemas: buildSubtemas(3)
  },
  {
    id: 'cap4',
    numero: 4,
    title: 'Interpolación y Ajuste',
    descripcion: 'Ajuste de datos por mínimos cuadrados y polinomiales de Lagrange y Newton.',
    icon: 'bi-graph-up',
    subtemas: buildSubtemas(4)
  },
  {
    id: 'cap5',
    numero: 5,
    title: 'Integración Numérica',
    descripcion: 'Aproximación de integrales definidas por reglas compuestas y cuadraturas.',
    icon: 'bi-ui-checks',
    subtemas: buildSubtemas(5)
  },
  {
    id: 'cap6',
    numero: 6,
    title: 'Ecuaciones Diferenciales',
    descripcion: 'Solución numérica de problemas de valor inicial y condiciones en la frontera.',
    icon: 'bi-activity',
    subtemas: buildSubtemas(6)
  }
];

// 🐍 Nuevos datos para el bloque de Python
export const pythonData = [
  {
    id: 'py_intro',
    numero: 1,
    title: 'Fundamentos de Python para Ingeniería',
    descripcion: 'Sintaxis básica, estructuras de control, listas y definición de funciones matemáticas.',
    icon: 'bi-filetype-py',
    subtemas: [
      { id: 'py_1.1', title: '1.1 Entorno y Variables' },
      { id: 'py_1.2', title: '1.2 Funciones y Control de Flujo' },
    ]
  },
  {
    id: 'py_numpy',
    numero: 2,
    title: 'NumPy y SciPy',
    descripcion: 'Manejo eficiente de vectores, matrices y librerías científicas avanzadas.',
    icon: 'bi-cpu',
    subtemas: [
      { id: 'py_2.1', title: '2.1 Arreglos Multidimensionales' },
      { id: 'py_2.2', title: '2.2 Operaciones Matriciales' },
    ]
  },
  {
    id: 'py_matplotlib',
    numero: 3,
    title: 'Visualización con Matplotlib',
    descripcion: 'Gráficas de funciones, convergencia de métodos y representación visual de datos.',
    icon: 'bi-bar-chart-line',
    subtemas: [
      { id: 'py_3.1', title: '3.1 Gráficas 2D y Estilos' },
      { id: 'py_3.2', title: '3.2 Graficación de Raíces e Intervalos' },
    ]
  }
];