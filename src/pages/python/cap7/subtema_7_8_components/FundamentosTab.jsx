import React from "react";

const FundamentosTab = () => (
  <div className="p-4 border rounded bg-light shadow-sm">
    <h4 className="text-primary fw-bold mb-3">7.8 Funciones con Arreglos NumPy</h4>
    
    <p className="text-secondary lh-base">
      Las funciones en Python pueden recibir y procesar arreglos de <strong>NumPy</strong> (<code>numpy.ndarray</code>). Esto permite calcular propiedades estadísticas, operar vectores y matrices o aplicar operaciones vectorizadas a conjuntos completos de datos simultáneamente.
    </p>

    {/* Ejemplo */}
    <div className="card mb-3 bg-dark text-white p-3 font-monospace rounded">
      <div className="text-white-50 mb-1 small"># Ejemplo: Función que procesa un arreglo de datos</div>
      <pre className="mb-0 text-white bg-transparent border-0 p-0">
<code>{`import numpy as np

# Función que calcula el promedio y la norma euclidiana
def estadisticas_vector(vector):
    promedio = np.mean(vector)
    norma = np.linalg.norm(vector)
    return promedio, norma

# Arreglo de prueba
datos = np.array([10.0, 20.0, 30.0, 40.0])

prom, nrm = estadisticas_vector(datos)
print("Datos:", datos)
print("Promedio:", prom)
print("Norma:", round(nrm, 2))`}</code>
      </pre>
    </div>

    <div className="alert alert-secondary py-2 mb-3">
      <strong>Salida:</strong><br />
      <code>Datos: [10. 20. 30. 40.]</code><br />
      <code>Promedio: 25.0</code><br />
      <code>Norma: 54.77</code>
    </div>

    <div className="alert alert-info mb-0">
      <h6 className="fw-bold mb-1">💡 Uso en Métodos Numéricos:</h6>
      <p className="mb-0 small">
        Permite implementar rutinas de álgebra lineal numérica, tales como la multiplicación de matrices, la sustitución hacia atrás en sistemas de ecuaciones o el cálculo de residuos vectoriales <code>r = b - A @ x</code>.
      </p>
    </div>
  </div>
);

export default FundamentosTab;