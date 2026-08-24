import React from "react";

const Fundamentos8_3 = () => (
  <div className="p-3 border rounded bg-light">
    <h5 className="text-primary fw-bold mb-2">
      8.3 Gráficas con Datos Dinámicos y Funciones Matemáticas
    </h5>
    <p className="text-secondary mb-3">
      En análisis numérico se generan secuencias densas con NumPy para evaluar funciones continuas $y = f(x)$ de forma vectorizada.
    </p>

    <div className="mb-3">
      <h6 className="fw-bold text-dark mb-1">Código de ejemplo:</h6>
      <pre className="bg-dark text-light p-3 rounded small mb-0 overflow-auto">
        <code>{`import matplotlib.pyplot as plt
import numpy as np

# Generación dinámica de 200 puntos en [-3, 3]
x = np.linspace(-3, 3, 200)

# Evaluación de la función f(x) = x² - 2
y = x**2 - 2

# Trazado de la curva continua
plt.plot(x, y)
plt.show()`}</code>
      </pre>
    </div>

    <div className="alert alert-info py-2 px-3 mb-0 small">
      <strong>Nota práctica:</strong> Al cambiar el rango en <code>np.linspace()</code> o la fórmula matemática, la gráfica se actualiza automáticamente sin necesidad de redefinir puntos individuales.
    </div>
  </div>
);

export default Fundamentos8_3;