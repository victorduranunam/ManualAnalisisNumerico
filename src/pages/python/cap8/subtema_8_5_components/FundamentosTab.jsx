import React from "react";

const Fundamentos8_5 = () => (
  <div className="p-3 border rounded bg-light">
    <h5 className="text-primary fw-bold mb-2">
      8.5 Gráficas Tridimensionales (3D)
    </h5>
    <p className="text-secondary mb-3">
      Visualización de superficies $z = f(x, y)$ para problemas de optimización multivariable y campos bidimensionales.
    </p>

    <div className="mb-3">
      <h6 className="fw-bold text-dark mb-1">Código de ejemplo:</h6>
      <pre className="bg-dark text-light p-3 rounded small mb-0 overflow-auto">
        <code>{`import matplotlib.pyplot as plt
import numpy as np

# 1. Creación de la malla (X, Y)
x = np.linspace(-3, 3, 50)
y = np.linspace(-3, 3, 50)
X, Y = np.meshgrid(x, y)

# 2. Evaluación de la superficie Z
Z = np.sin(np.sqrt(X**2 + Y**2))

# 3. Figura con proyección 3D
fig = plt.figure(figsize=(8, 6))
ax = fig.add_subplot(111, projection='3d')

# 4. Superficie con escala de color
superficie = ax.plot_surface(X, Y, Z, cmap='viridis', edgecolor='none')
ax.set_title("Superficie 3D: z = sin(sqrt(x² + y²))")
ax.set_xlabel("Eje X")
ax.set_ylabel("Eje Y")
ax.set_zlabel("Eje Z")
fig.colorbar(superficie, shrink=0.5, aspect=10)

plt.show()`}</code>
      </pre>
    </div>

    <div className="alert alert-info py-2 px-3 mb-0 small">
      <strong>Nota práctica:</strong> Se requiere <code>projection='3d'</code> en el eje y <code>np.meshgrid()</code> para construir la cuadrícula de puntos en el plano $XY$.
    </div>
  </div>
);

export default Fundamentos8_5;