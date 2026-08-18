// Generador de subtemas para Análisis Numérico (8 subtemas por capítulo)
const buildSubtemas = (numero, prefix = 'Subtema') => [
  { id: `subtema_${numero}_1`, title: `${numero}.1 ${prefix} 1` },
  { id: `subtema_${numero}_2`, title: `${numero}.2 ${prefix} 2` },
  { id: `subtema_${numero}_3`, title: `${numero}.3 ${prefix} 3` },
  { id: `subtema_${numero}_4`, title: `${numero}.4 ${prefix} 4` },
  { id: `subtema_${numero}_5`, title: `${numero}.5 ${prefix} 5` },
  { id: `subtema_${numero}_6`, title: `${numero}.6 ${prefix} 6` },
  { id: `subtema_${numero}_7`, title: `${numero}.7 ${prefix} 7` },
  { id: `subtema_${numero}_8`, title: `${numero}.8 ${prefix} 8` },
  { id: `subtema_${numero}_9`, title: `${numero}.9 ${prefix} 9` },
  { id: `subtema_${numero}_10`, title: `${numero}.10 ${prefix} 10` },

  
];

export const analisisNumericoData = [
  {
    id: 'cap1',
    numero: 1,
    title: 'Capítulo 1',
    descripcion: 'Fundamentos y errores en métodos numéricos',
    icon: 'bi-calculator',
    subtemas: buildSubtemas(1, 'Subtema')
  },
  {
    id: 'cap2',
    numero: 2,
    title: 'Capítulo 2',
    descripcion: 'Resolución numérica de ecuaciones algebraicas y trascendentes',
    icon: 'bi-diagram-3',
    subtemas: buildSubtemas(2, 'Subtema')
  },
  {
    id: 'cap3',
    numero: 3,
    title: 'Capítulo 3',
    descripcion: 'Resolución numérica de sistemas de ecuaciones lineales',
    icon: 'bi-grid-3x3',
    subtemas: buildSubtemas(3, 'Subtema')
  },
  {
    id: 'cap4',
    numero: 4,
    title: 'Capítulo 4',
    descripcion: 'Interpolación, derivación e integración numéricas',
    icon: 'bi-graph-up',
    subtemas: buildSubtemas(4, 'Subtema')
  },
  {
    id: 'cap5',
    numero: 5,
    title: 'Capítulo 5',
    descripcion: 'Resolución numérica de ecuaciones diferenciales',
    icon: 'bi-ui-checks',
    subtemas: buildSubtemas(5, 'Subtema')
  },
  {
    id: 'cap6',
    numero: 6,
    title: 'Capítulo 6',
    descripcion: 'Estimación numérica mediante simulación ',
    icon: 'bi-activity',
    subtemas: buildSubtemas(6, 'Subtema')
  }
];

// Generador de subtemas para Python (IDs estilo subtema_1_1)
const buildPythonSubtemas = (capNumero) => [
  { id: `subtema_${capNumero}_1`, title: `Subtema ${capNumero}.1` },
  { id: `subtema_${capNumero}_2`, title: `Subtema ${capNumero}.2` },
  { id: `subtema_${capNumero}_3`, title: `Subtema ${capNumero}.3` },
  { id: `subtema_${capNumero}_4`, title: `Subtema ${capNumero}.4` },
  { id: `subtema_${capNumero}_5`, title: `Subtema ${capNumero}.5` },
  { id: `subtema_${capNumero}_6`, title: `Subtema ${capNumero}.6` },
  { id: `subtema_${capNumero}_7`, title: `Subtema ${capNumero}.7` },
  { id: `subtema_${capNumero}_8`, title: `Subtema ${capNumero}.8` },
  { id: `subtema_${capNumero}_9`, title: `Subtema ${capNumero}.9` },
  { id: `subtema_${capNumero}_10`, title: `Subtema ${capNumero}.10` },

];

// ARREGLO COMPLETO CON LOS 10 CAPÍTULOS DE PYTHON
export const pythonData = [
  {
    id: 'py_cap1',
    numero: 1,
    title: 'Capítulo 1',
    descripcion: 'Contenido del módulo 1 en desarrollo.',
    icon: 'bi-filetype-py',
    subtemas: buildPythonSubtemas(1)
  },
  {
    id: 'py_cap2',
    numero: 2,
    title: 'Capítulo 2',
    descripcion: 'Contenido del módulo 2 en desarrollo.',
    icon: 'bi-code-square',
    subtemas: buildPythonSubtemas(2)
  },
  {
    id: 'py_cap3',
    numero: 3,
    title: 'Capítulo 3',
    descripcion: 'Contenido del módulo 3 en desarrollo.',
    icon: 'bi-terminal',
    subtemas: buildPythonSubtemas(3)
  },
  {
    id: 'py_cap4',
    numero: 4,
    title: 'Capítulo 4',
    descripcion: 'Contenido del módulo 4 en desarrollo.',
    icon: 'bi-file-earmark-text',
    subtemas: buildPythonSubtemas(4)
  },
  {
    id: 'py_cap5',
    numero: 5,
    title: 'Capítulo 5',
    descripcion: 'Contenido del módulo 5 en desarrollo.',
    icon: 'bi-people',
    subtemas: buildPythonSubtemas(5)
  },
  {
    id: 'py_cap6',
    numero: 6,
    title: 'Capítulo 6',
    descripcion: 'Contenido del módulo 6 en desarrollo.',
    icon: 'bi-cpu',
    subtemas: buildPythonSubtemas(6)
  },
  {
    id: 'py_cap7',
    numero: 7,
    title: 'Capítulo 7',
    descripcion: 'Contenido del módulo 7 en desarrollo.',
    icon: 'bi-table',
    subtemas: buildPythonSubtemas(7)
  },
  {
    id: 'py_cap8',
    numero: 8,
    title: 'Capítulo 8',
    descripcion: 'Contenido del módulo 8 en desarrollo.',
    icon: 'bi-bar-chart-line',
    subtemas: buildPythonSubtemas(8)
  },
  {
    id: 'py_cap9',
    numero: 9,
    title: 'Capítulo 9',
    descripcion: 'Contenido del módulo 9 en desarrollo.',
    icon: 'bi-robot',
    subtemas: buildPythonSubtemas(9)
  },
  {
    id: 'py_cap10',
    numero: 10,
    title: 'Capítulo 10',
    descripcion: 'Contenido del módulo 10 en desarrollo.',
    icon: 'bi-check2-square',
    subtemas: buildPythonSubtemas(10)
  }
];