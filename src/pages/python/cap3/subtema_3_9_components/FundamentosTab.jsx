import React from "react";

const FundamentosTab = () => {
  return (
    <div className="pe-2">
      <p className="text-secondary">
        Una vez revisados los diferentes elementos que integran el programa, como la incorporación de bibliotecas, la definición de variables, la captura y conversión de datos, la realización de operaciones matemáticas y la presentación de resultados, se puede integrar todo el proceso en un solo programa.
      </p>
      <p className="text-secondary">
        El código completo del ejemplo para transformar un ángulo expresado en grados a radianes, considerando la captura del valor desde el teclado y la presentación del resultado final, es el siguiente:
      </p>

      <div className="bg-light p-3 rounded border my-3 font-monospace fw-bold">
        import numpy as np<br /><br />
        # Captura del ángulo en grados<br />
        angulo = float(input("Ingrese el ángulo en grados: "))<br /><br />
        # Transformación de grados a radianes<br />
        radianes = np.radians(angulo)<br /><br />
        # Presentación del resultado<br />
        print(f"El ángulo &#123;angulo:4f&#125; grados equivale a &#123;radianes:.4f&#125; radianes")
      </div>

      <p className="text-secondary">
        Al ejecutar el programa, el usuario deberá ingresar un valor expresado en grados. El programa realizará la conversión correspondiente y mostrará el resultado utilizando cuatro cifras decimales para facilitar su interpretación.
      </p>

      <div className="my-3 text-center">
        <img
          src="images/Python/cap3/cap39A.png"
          alt="Ejecución del programa completo en terminal"
          className="img-fluid border rounded shadow-sm"
          style={{ maxHeight: '200px' }}
        />
      </div>
    </div>
  );
};

export default FundamentosTab;