import React from "react";

const Fundamentos8_2 = () => (
  <div className="p-3 border rounded bg-light">
    <h5 className="text-primary fw-bold mb-2">
      8.2 Gráfica Básica con Datos Estáticos
    </h5>
    <p className="text-secondary mb-3">
      La forma más directa de crear una gráfica consiste en pasar listas con valores fijos en los ejes X e Y.
    </p>

    <div className="mb-3">
      <h6 className="fw-bold text-dark mb-1">Código de ejemplo:</h6>
      <pre className="bg-dark text-light p-3 rounded small mb-0 overflow-auto">
        <code>{`import matplotlib.pyplot as plt

# Datos estáticos definidos mediante listas
x = [1, 2, 3, 4, 5]
y = [2, 4, 1, 7, 5]

# Generación y despliegue
plt.plot(x, y)
plt.show()`}</code>
      </pre>
    </div>

    <div className="alert alert-info py-2 px-3 mb-0 small">
      <strong>Nota práctica:</strong> <code>plt.plot()</code> une los puntos secuencialmente con segmentos de recta, y <code>plt.show()</code> abre la ventana interactiva o renderiza la figura en pantalla.
    </div>
  </div>
);

export default Fundamentos8_2;