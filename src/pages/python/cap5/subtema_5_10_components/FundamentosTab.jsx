import React from "react";

const FundamentosTab = () => (
  <div className="p-4 border rounded bg-light shadow-sm">
    <h4 className="text-primary fw-bold mb-3">5.10 Importancia en análisis numérico</h4>
    
    <p className="text-secondary leading-relaxed">
      El acceso y manipulación de arreglos y matrices son operaciones fundamentales para la programación científica. Estas herramientas permiten:
    </p>

    <div className="card mb-3 border-0 bg-white shadow-sm">
      <ul className="list-group list-group-flush">
        <li className="list-group-item bg-transparent">🔹 <strong>Modificar valores durante procesos iterativos:</strong> Actualizar vectores de soluciones en cada ciclo.</li>
        <li className="list-group-item bg-transparent">🔹 <strong>Seleccionar conjuntos específicos de datos:</strong> Filtrar ventanas de muestras y condiciones iniciales.</li>
        <li className="list-group-item bg-transparent">🔹 <strong>Trabajar con filas y columnas de matrices:</strong> Realizar pivoteo e intercambios de ecuaciones en sistemas lineales.</li>
        <li className="list-group-item bg-transparent">🔹 <strong>Extraer submatrices para cálculos específicos:</strong> Trabajar con particiones por bloques y matrices reducidas.</li>
        <li className="list-group-item bg-transparent">🔹 <strong>Preparar información para aplicar métodos numéricos:</strong> Ensamblar matrices de rigidez, diferencias finitas y splines.</li>
      </ul>
    </div>

    <p className="text-secondary leading-relaxed">
      El dominio de estas operaciones permitirá desarrollar posteriormente algoritmos relacionados con solución de ecuaciones, interpolación, ajuste de curvas y otros métodos utilizados en análisis numérico.
    </p>

    <p className="text-secondary leading-relaxed mb-3">
      Así el capítulo 5 queda como un capítulo de manejo práctico de datos numéricos, antes de entrar a operaciones matemáticas más avanzadas y métodos numéricos.
    </p>

    <div className="alert alert-primary mb-0">
      <h6 className="fw-bold mb-1">🎯 Conclusión de Cómputo Matricial:</h6>
      <p className="mb-0 small">
        La combinación de indexación avanzada, rebanado (slicing) y funciones de forma de NumPy permite traducir teoremas matemáticos directamente en código conciso, legible y computacionalmente eficiente.
      </p>
    </div>
  </div>
);

export default FundamentosTab;