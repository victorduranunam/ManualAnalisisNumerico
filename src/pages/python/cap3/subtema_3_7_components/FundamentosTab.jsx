import React from "react";

const FundamentosTab = () => {
  return (
    <div className="pe-2">
      <p className="text-secondary">
        Una vez realizados los cálculos necesarios, el siguiente paso consiste en mostrar los resultados obtenidos al usuario. Python proporciona diferentes formas para presentar información en pantalla, siendo la función <code>print()</code> una de las más utilizadas.
      </p>
      <p className="text-secondary">
        La forma más sencilla de mostrar un resultado consiste en colocar dentro de la función <code>print()</code> el texto o la variable que se desea visualizar.
      </p>
      <p className="text-secondary">
        Por ejemplo:
      </p>

      <div className="bg-light p-3 rounded border my-3 font-monospace fw-bold">
        print(radianes)
      </div>

      <p className="text-secondary">
        También es posible combinar texto y variables para generar mensajes más claros:
      </p>

      <div className="bg-light p-3 rounded border my-3 font-monospace fw-bold">
        print("El ángulo ", angulo, " transformado a radianes es:", radianes)
      </div>

      <p className="text-secondary">
        Esta segunda forma permite que la salida del programa sea más comprensible para el usuario.
      </p>
    </div>
  );
};

export default FundamentosTab;