import React from "react";

const Fundamentos8_4 = () => (
  <div className="p-3 border rounded bg-light">
    <h5 className="text-primary fw-bold mb-2">
      8.4 Personalización y Formato de Gráficos
    </h5>
    <p className="text-secondary mb-3">
      Incorporación de elementos indispensables en ingeniería: títulos, etiquetas en los ejes, cuadrícula, referencia en el origen ($y = 0$) y cuadros de leyendas.
    </p>

    <div className="mb-3">
      <h6 className="fw-bold text-dark mb-1">Código de ejemplo:</h6>
      <pre className="bg-dark text-light p-3 rounded small mb-0 overflow-auto">
        <code>{`import matplotlib.pyplot as plt
import numpy as np

# 1. Curva continua de la función
x = np.linspace(0, 4, 150)
y = x**3 - 4*x - 2

# 2. Puntos discretos de iteraciones (ej. Bisección o Newton)
x_iter = [1.0, 2.5, 2.2, 2.214]
y_iter = [val**3 - 4*val - 2 for val in x_iter]

# 3. Trazado con estilos
plt.plot(x, y, color='blue', linestyle='-', linewidth=2, label='f(x) = x³ - 4x - 2')
plt.scatter(x_iter, y_iter, color='red', marker='o', s=50, label='Iteraciones')

# 4. Formato y referencias
plt.axhline(0, color='black', linestyle='--', linewidth=1) # Eje y = 0
plt.title("Localización de Raíces de una Función", fontsize=13)
plt.xlabel("Variable independiente (x)")
plt.ylabel("f(x)")
plt.grid(True, linestyle=':', alpha=0.6)
plt.legend(loc='upper left')

plt.show()`}</code>
      </pre>
    </div>

    <div className="alert alert-info py-2 px-3 mb-0 small">
      <strong>Nota práctica:</strong> <code>plt.axhline(0)</code> es fundamental en métodos de raíces para identificar cruces por cero. <code>plt.legend()</code> requiere que cada trazo cuente con su parámetro <code>label</code>.
    </div>
  </div>
);

export default Fundamentos8_4;