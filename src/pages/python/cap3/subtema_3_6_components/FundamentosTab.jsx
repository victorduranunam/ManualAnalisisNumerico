import React from "react";

const FundamentosTab = () => {
  return (
    <div className="pe-2">
      <p className="text-secondary">
        Una vez explicados los procesos de captura de datos, conversión de tipos e incorporación de funciones provenientes de bibliotecas, el siguiente paso consiste en realizar la transformación del valor ingresado por el usuario de grados a radianes.
      </p>
      <p className="text-secondary">
        Para realizar esta conversión es necesario utilizar la relación matemática existente entre ambas unidades angulares. Un ángulo expresado en grados puede convertirse a radianes mediante la siguiente expresión python:
      </p>

      <div className="bg-light p-3 rounded border my-3 font-monospace fw-bold">
        import numpy as np<br />
        radianes = angulo * np.pi / 180
      </div>

      <p className="text-secondary">
        Otra alternativa consiste en utilizar la función incorporada de NumPy:
      </p>

      <div className="bg-light p-3 rounded border my-3 font-monospace fw-bold">
        radianes = np.radians(angulo)
      </div>

      <p className="text-secondary">
        Ambas instrucciones producen el mismo resultado y permiten obtener el valor del ángulo expresado en radianes.
      </p>
    </div>
  );
};

export default FundamentosTab;