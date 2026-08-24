import React, { useState } from 'react';

export default function Capitulo9BibliotecaOperaciones() {
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [filtroCategoria, setFiltroCategoria] = useState('TODAS');

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const subtemas = [
    {
      id: "9.1",
      titulo: "Extracción y Modificación de Celdas, Renglones y Columnas",
      descripcion:
        "Operaciones directas para consultar y reescribir elementos individuales, vectores completos o bloques matriciales sin alterar el resto de la estructura.",
      codigo: `import numpy as np

A = np.array([
    [10.0, 20.0, 30.0],
    [40.0, 50.0, 60.0],
    [70.0, 80.0, 90.0]
])

# 1. Celda individual [fila, columna]
celda = A       # Fila 1, Columna 2 -> 60.0
A[0, 0] = 99.0        # Modificación puntual

# 2. Renglón completo como vector
renglon_1 = A   # o A -> [40., 50., 60.]

# 3. Columna completa como vector
columna_0 = A[:, 0]   # Primera columna -> [99., 40., 70.]

# 4. Submatriz (bloque 2x2 superior izquierdo)
bloque = A[0:2, 0:2]

print("Renglón 1:", renglon_1)
print("Columna 0:", columna_0)
print("Submatriz 2x2:\\n", bloque)`,
      aplicacion:
        "Sustitución hacia atrás en Gauss, lectura de coeficientes individuales y armado de tablas de resultados.",
      explicacion:
        "El operador ':' indica 'todos los elementos de esa dimensión'. En Python los índices inician siempre en 0."
    },
    {
      id: "9.2",
      titulo: "Intercambio de Renglones y Pivoteo Parcial",
      descripcion:
        "Estrategia que intercambia dos filas para colocar el coeficiente de mayor valor absoluto en la diagonal principal.",
      codigo: `import numpy as np

A = np.array([
    [0.0, 2.0, 1.0],
    [4.0, 1.0, -1.0],
    [-2.0, 3.0, 5.0]
])

# Intercambio manual directo de los renglones 0 y 1
A] = A[[1, 0]]
print("Matriz tras intercambiar renglón 0 y 1:\\n", A)

# Búsqueda automática del pivote máximo en la columna k=0:
k = 0
fila_max = np.argmax(np.abs(A[k:, k])) + k

if fila_max != k:
    A[[k, fila_max]] = A[[fila_max, k]]
    print("\\nMatriz con pivoteo automático aplicado:\\n", A)`,
      aplicacion:
        "Eliminación Gaussiana, Gauss-Jordan y Factorización LU para evitar divisiones entre cero y mitigar errores de redondeo.",
      explicacion:
        "np.argmax() devuelve el índice del valor más grande, automatizando la selección del pivote en cada iteración del método."
    },
    {
      id: "9.3",
      titulo: "Ensamble y Partición de Matrices (Matriz Aumentada)",
      descripcion:
        "Construcción de la estructura conjunta [A | b] para transformar simultáneamente los coeficientes y términos independientes, y su posterior separación.",
      codigo: `import numpy as np

# Matriz A (3x3) y vector b (3,)
A = np.array([
    [3.0, -0.1, -0.2],
    [0.1,  7.0, -0.3],
    [0.3, -0.2, 10.0]
])
b = np.array([7.85, -19.3, 71.4])

# 1. Ensamble de la matriz aumentada [A | b]
Ab = np.column_stack((A, b))
print("Matriz aumentada [A | b]:\\n", Ab)
print("Dimensiones:", Ab.shape) # (3, 4)

# 2. Partición / Separación posterior
A_recuperada = Ab[:, :-1] # Todas las columnas excepto la última
b_recuperado  = Ab[:, -1]  # Únicamente la última columna

print("\\nVector b recuperado:", b_recuperado)`,
      aplicacion:
        "Planteamiento y resolución de sistemas de ecuaciones lineales Ax = b mediante métodos directos.",
      explicacion:
        "np.column_stack() concatena arreglos unidimensionales como columnas sin necesidad de cambiar manualmente su forma con reshape."
    },
    {
      id: "9.4",
      titulo: "Operaciones Algebraicas Elementales por Renglón (Paso de Gauss)",
      descripcion:
        "Eliminación hacia adelante vectorizada para generar ceros debajo del pivote aplicando la combinación lineal Fi ← Fi - m · Fk.",
      codigo: `import numpy as np

# Matriz aumentada [A | b]
Ab = np.array([
    [2.0,  1.0, -1.0,   8.0],
    [-3.0, -1.0,  2.0, -11.0],
    [-2.0,  1.0,  2.0,  -3.0]
])

# Renglón k=0 (pivote), Renglón i=1 (a eliminar)
pivote = Ab[0, 0]
factor = Ab / pivote   # m = -3.0 / 2.0 = -1.5

# Operación vectorizada: R1 = R1 - factor * R0
Ab = Ab - factor * Ab[0, :]

# Renglón i=2 (a eliminar con el mismo pivote)
factor2 = Ab / pivote  # m = -2.0 / 2.0 = -1.0
Ab = Ab - factor2 * Ab[0, :]

print("Matriz tras eliminar la primera columna:\\n", Ab)`,
      aplicacion:
        "Triangularización superior en Eliminación Gaussiana, obtención de la matriz escalonada reducida en Gauss-Jordan y cálculo de la matriz U en LU.",
      explicacion:
        "La instrucción 'Ab[i, :] - factor * Ab[k, :]' opera sobre todos los elementos de la fila en una sola línea de código sin ciclos internos."
    },
    {
      id: "9.5",
      titulo: "Control de Algoritmos: Funciones Lambda, Normas y Criterios de Paro",
      descripcion:
        "Definición compacta de funciones matemáticas y medición del error aproximado entre aproximaciones sucesivas.",
      codigo: `import numpy as np

# 1. Definición de función matemática f(x)
f = lambda x: x**3 - 2*x - 5

# 2. Vectores de iteración consecutiva
x_ant = np.array([1.0, 2.0, 3.0])
x_act = np.array([1.002, 1.995, 3.001])
tol = 1e-4

# 3. Medición del error relativo con norma infinito
diff = x_act - x_ant
ea = (np.linalg.norm(diff, np.inf) / np.linalg.norm(x_act, np.inf)) * 100

print(f"Norma infinito de la diferencia: {norma_inf := np.linalg.norm(diff, np.inf):.6f}")
print(f"Error relativo aproximado: {ea:.4f}%")

if ea < tol:
    print("✓ Criterio de convergencia alcanzado.")
else:
    print("Continuar con la siguiente iteración...")`,
      aplicacion:
        "Paso de funciones en métodos de raíces (Bisección, Newton-Raphson) y evaluación del criterio de paro en métodos iterativos (Jacobi y Gauss-Seidel).",
      explicacion:
        "np.linalg.norm(v, np.inf) calcula el valor absoluto máximo de las diferencias entre componentes, asegurando que ninguna variable exceda la tolerancia."
    }
  ];

  const inventarioFunciones = [
    { categoria: "Álgebra Lineal", funcion: "A @ B  o  np.dot(A, B)", uso: "Multiplicación matricial o producto punto de vectores." },
    { categoria: "Álgebra Lineal", funcion: "np.linalg.solve(A, b)", uso: "Solución exacta de Ax = b para verificación de algoritmos." },
    { categoria: "Álgebra Lineal", funcion: "np.linalg.norm(v, ord)", uso: "Normas vectoriales (ord=np.inf, ord=2, ord=1) para error aproximado." },
    { categoria: "Álgebra Lineal", funcion: "np.diag(A)", uso: "Extrae la diagonal principal o construye matrices diagonales." },
    { categoria: "Álgebra Lineal", funcion: "A.T  o  np.transpose(A)", uso: "Obtiene la matriz transpuesta." },
    { categoria: "Manipulación de Estructuras", funcion: "np.column_stack((A, b))", uso: "Une matriz y vector para construir la matriz aumentada [A | b]." },
    { categoria: "Manipulación de Estructuras", funcion: "np.vstack((A, B))", uso: "Apila matrices o vectores verticalmente (por filas)." },
    { categoria: "Manipulación de Estructuras", funcion: "A[[i, j]] = A[[j, i]]", uso: "Intercambio simultáneo de dos filas (pivoteo parcial)." },
    { categoria: "Manipulación de Estructuras", funcion: "A.copy()", uso: "Copia independiente en memoria para no modificar el arreglo original." },
    { categoria: "Manipulación de Estructuras", funcion: "np.zeros_like(A)", uso: "Crea un arreglo de ceros con las mismas dimensiones y tipo que A." },
    { categoria: "Búsqueda y Criterios", funcion: "np.argmax(np.abs(A[k:, k]))", uso: "Índice del pivote de mayor magnitud en una columna." },
    { categoria: "Búsqueda y Criterios", funcion: "np.sum(A, axis=...)", uso: "Sumatoria vectorizada de elementos totales, por filas o columnas." },
    { categoria: "Búsqueda y Criterios", funcion: "np.allclose(A, B, atol=1e-5)", uso: "Compara si dos arreglos son numéricamente iguales con tolerancia." },
    { categoria: "Evaluación de Funciones", funcion: "lambda x: ...", uso: "Funciones matemáticas anónimas de una línea para pasar como parámetros." },
    { categoria: "Evaluación de Funciones", funcion: "np.linspace(a, b, n)", uso: "Genera n puntos uniformemente distribuidos en el intervalo [a, b]." }
  ];

  const categorias = ['TODAS', 'Álgebra Lineal', 'Manipulación de Estructuras', 'Búsqueda y Criterios', 'Evaluación de Funciones'];

  const funcionesFiltradas = filtroCategoria === 'TODAS'
    ? inventarioFunciones
    : inventarioFunciones.filter(f => f.categoria === filtroCategoria);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-10 text-gray-800">
      {/* Encabezado */}
      <header className="border-b border-gray-200 pb-6">
        <span className="text-sm font-semibold tracking-wider text-indigo-600 uppercase">
          Fundamentos de Python • Capítulo 9
        </span>
        <h1 className="text-3xl font-bold text-gray-900 mt-2">
          Biblioteca de Operaciones y Funciones Auxiliares para el Análisis Numérico
        </h1>
        <p className="text-gray-600 mt-3 leading-relaxed">
          Catálogo de bloques de construcción, operaciones matriciales vectorizadas, 
          mecanismos de pivoteo y utilerías de control que se integrarán directamente 
          en los algoritmos de solución de métodos numéricos.
        </p>
      </header>

      {/* Subtemas Prácticos con Fichas Metodológicas */}
      <div className="space-y-6">
        {subtemas.map((sub, idx) => (
          <section
            key={sub.id}
            id={`subtema-${sub.id}`}
            className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-4 hover:shadow-md transition-shadow"
          >
            {/* Título */}
            <div className="flex items-center space-x-3">
              <span className="bg-indigo-100 text-indigo-800 text-xs font-bold px-2.5 py-1 rounded-md">
                {sub.id}
              </span>
              <h2 className="text-xl font-semibold text-gray-800">
                {sub.titulo}
              </h2>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed">
              {sub.descripcion}
            </p>

            {/* Bloque de Código */}
            <div className="bg-slate-900 rounded-lg overflow-hidden border border-slate-800">
              <div className="flex justify-between items-center px-4 py-2 bg-slate-950 text-slate-400 text-xs font-mono">
                <span>python</span>
                <button
                  onClick={() => copyToClipboard(sub.codigo, idx)}
                  className="hover:text-white transition-colors"
                >
                  {copiedIndex === idx ? '✓ Copiado' : 'Copiar código'}
                </button>
              </div>
              <pre className="p-4 text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed">
                <code>{sub.codigo}</code>
              </pre>
            </div>

            {/* Bloque: ¿Dónde se aplica en el curso? */}
            <div className="bg-indigo-50/70 border-l-4 border-indigo-600 p-3 rounded-r-md text-xs">
              <span className="font-bold text-indigo-900">📌 ¿Dónde se aplica en el curso?: </span>
              <span className="text-indigo-800">{sub.aplicacion}</span>
            </div>

            {/* Nota de Sintaxis */}
            <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-md border border-gray-100">
              <span className="font-semibold text-gray-700">Nota práctica: </span>
              {sub.explicacion}
            </div>
          </section>
        ))}
      </div>

      {/* Sección 9.6: Inventario de Funciones */}
      <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-6">
        <div className="border-b border-gray-200 pb-4">
          <div className="flex items-center space-x-3 mb-2">
            <span className="bg-indigo-100 text-indigo-800 text-xs font-bold px-2.5 py-1 rounded-md">
              9.6
            </span>
            <h2 className="text-2xl font-bold text-gray-900">
              Inventario de Funciones Esenciales (Cheat Sheet)
            </h2>
          </div>
          <p className="text-sm text-gray-600">
            Catálogo clasificado de funciones de NumPy y Python utilizadas con mayor frecuencia en la materia.
          </p>

          {/* Filtros */}
          <div className="flex flex-wrap gap-2 mt-4">
            {categorias.map(cat => (
              <button
                key={cat}
                onClick={() => setFiltroCategoria(cat)}
                className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
                  filtroCategoria === cat
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Tabla */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-gray-700 text-xs uppercase tracking-wider">
                <th className="py-3 px-4 font-semibold">Categoría</th>
                <th className="py-3 px-4 font-semibold">Función / Sintaxis</th>
                <th className="py-3 px-4 font-semibold">Uso en Análisis Numérico</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {funcionesFiltradas.map((item, fIdx) => (
                <tr key={fIdx} className="hover:bg-indigo-50/40 transition-colors">
                  <td className="py-3 px-4 text-xs font-medium text-indigo-700 whitespace-nowrap">
                    {item.categoria}
                  </td>
                  <td className="py-3 px-4 font-mono text-xs text-slate-900 font-semibold bg-gray-50/60 rounded">
                    {item.funcion}
                  </td>
                  <td className="py-3 px-4 text-xs text-gray-600">
                    {item.uso}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}