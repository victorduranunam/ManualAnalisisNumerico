import React from "react";

const Fundamentos8_3 = () => (
  <div className="p-3 border rounded bg-light">
    <h5 className="text-primary fw-bold mb-2">
      8.3 Gráfica con Etiquetas de Ejes (Títulos y Subtítulos)
    </h5>
    <p className="text-secondary mb-3">
      Tomando como base los datos estáticos del ejercicio anterior, podemos enriquecer la visualización agregando títulos y etiquetas descriptivas a los ejes X e Y para documentar la gráfica adecuadamente.
    </p>

    <div className="mb-3">
      <h6 className="fw-bold text-dark mb-1">Código de ejemplo:</h6>
      <pre className="bg-dark text-light p-3 rounded small mb-0 overflow-auto">
        <code>{`import matplotlib.pyplot as plt

# Datos estáticos definidos mediante listas (del ejercicio 8.2)
x = [1, 2, 3, 4, 5]
y = [2, 4, 1, 7, 5]

# Trazo de la gráfica
plt.plot(x, y)

# Incorporación de título y etiquetas de ejes
plt.title("Gráfica con Datos Estáticos y Etiquetas")
plt.xlabel("Eje X (Muestras / Tiempo)")
plt.ylabel("Eje Y (Valores medidos)")

# Despliegue de la figura
plt.show()`}</code>
      </pre>
    </div>

    <div className="alert alert-info py-2 px-3 mb-0 small">
      <strong>Nota práctica:</strong> <code>plt.title()</code> añade el título principal, mientras que <code>plt.xlabel()</code> y <code>plt.ylabel()</code> asignan los nombres y unidades correspondientes a cada eje antes de ejecutar <code>plt.show()</code>.
    </div>
  </div>
);

export default Fundamentos8_3;