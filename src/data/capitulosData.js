export const capitulosData = [
  {
    id: 'cap1',
    numero: 1,
    title: 'Teoría de Errores',
    descripcion: 'Conceptos de error absoluto, relativo, redondeo, truncamiento y propagación de errores.',
    icon: 'bi-calculator',
    subtemas: [
      { id: '1.1', title: '1.1 Definición de Error Absoluto y Relativo' },
      { id: '1.2', title: '1.2 Errores de Redondeo y Truncamiento' },
      { id: '1.3', title: '1.3 Propagación de Errores' },
    ]
  },
  {
    id: 'cap2',
    numero: 2,
    title: 'Ecuaciones No Lineales',
    descripcion: 'Métodos para la búsqueda de raíces en funciones continuas de una variable.',
    icon: 'bi-diagram-3',
    subtemas: [
      { id: '2.1', title: '2.1 Método de Bisección' },
      { id: '2.2', title: '2.2 Método de Regula Falsi' },
      { id: '2.3', title: '2.3 Método de Newton-Raphson' },
      { id: '2.4', title: '2.4 Método de la Secante' },
    ]
  },
  {
    id: 'cap3',
    numero: 3,
    title: 'Sistemas de Ecuaciones',
    descripcion: 'Solución de sistemas lineales mediante métodos directos e iterativos.',
    icon: 'bi-grid-3x3',
    subtemas: [
      { id: '3.1', title: '3.1 Eliminación Gaussiana' },
      { id: '3.2', title: '3.2 Descomposición LU' },
      { id: '3.3', title: '3.3 Métodos Iterativos: Gauss-Seidel y Jacobi' },
    ]
  },
  {
    id: 'cap4',
    numero: 4,
    title: 'Interpolación y Ajuste',
    descripcion: 'Ajuste de datos por mínimos cuadrados y polinomiales de Lagrange y Newton.',
    icon: 'bi-graph-up',
    subtemas: [
      { id: '4.1', title: '4.1 Polinomios de Lagrange' },
      { id: '4.2', title: '4.2 Diferencias Divididas de Newton' },
      { id: '4.3', title: '4.3 Regresión por Mínimos Cuadrados' },
    ]
  },
  {
    id: 'cap5',
    numero: 5,
    title: 'Integración Numérica',
    descripcion: 'Aproximación de integrales definidas por reglas compuestas y cuadraturas.',
    icon: 'bi-ui-checks',
    subtemas: [
      { id: '5.1', title: '5.1 Regla del Trapecio' },
      { id: '5.2', title: '5.2 Reglas de Simpson (1/3 y 3/8)' },
      { id: '5.3', title: '5.3 Cuadratura Gaussiana' },
    ]
  },
  {
    id: 'cap6',
    numero: 6,
    title: 'Ecuaciones Diferenciales',
    descripcion: 'Solución numérica de problemas de valor inicial y condiciones en la frontera.',
    icon: 'bi-activity',
    subtemas: [
      { id: '6.1', title: '6.1 Método de Euler' },
      { id: '6.2', title: '6.2 Métodos de Runge-Kutta (2° y 4° Orden)' },
      { id: '6.3', title: '6.3 Sistemas de EDO' },
    ]
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