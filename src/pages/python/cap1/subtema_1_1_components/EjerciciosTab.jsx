import React from "react";
import PythonEditor from "../../../../components/PythonEditor.jsx";

const EjerciciosTab = () => {
  const codigoInicial = `# Subtema 1.1: Eliminación Gaussiana
import numpy as np

# Define la matriz de coeficientes y el vector de términos independientes
A = np.array([[2, 1], [1, 3]], dtype=float)
b = np.array([8, 13], dtype=float)

# Resolver sistema Ax = b
x = np.linalg.solve(A, b)
print("Solución del sistema:", x)`;

  return (
    <div className="p-3 border rounded bg-light">
      <h5 className="text-primary fw-bold mb-2">Ejercicios del Subtema 3.1</h5>
      <p className="text-muted mb-3">
        Modifica y ejecuta el siguiente código Python para resolver el ejercicio interactivo:
      </p>

      {/* Solo agregas lineasVisibles si deseas ajustar los renglones iniciales */}
      <PythonEditor 
        codigoInicial={codigoInicial} 
        lineasVisibles={10} 
      />
    </div>
  );
};

export default EjerciciosTab;