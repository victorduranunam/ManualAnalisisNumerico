import React from "react";

const FundamentosTab = () => {
  return (
    <div className="pe-2">
      <p className="text-secondary">
        Una vez instalada una biblioteca, sus funciones pueden incorporarse a un programa de diferentes maneras. Las dos formas más utilizadas se describen a continuación. Cada una tiene sus ventajas, por lo que el lector podrá emplear la que considere más conveniente para el desarrollo de sus programas.
      </p>

      <h5 className="fw-bold mt-4 mb-2">Importación mediante un alias</h5>
      <p className="text-secondary">
        La primera consiste en importar la biblioteca completa y asignarle un nombre abreviado o alias. En el caso de NumPy, el alias utilizado con mayor frecuencia es <code>np</code>. A partir de ese momento, cada vez que se desee utilizar una función de la biblioteca, será necesario anteponer dicho alias.
      </p>

      <div className="bg-light p-3 rounded border my-3 font-monospace fw-bold">
        import numpy as np<br />
        x = 45<br />
        y = np.cos(x)
      </div>

      <p className="text-secondary">
        Este método permite identificar con facilidad que la función utilizada pertenece a la biblioteca NumPy, además de facilitar el acceso a todas las funciones disponibles en ella.
      </p>

      <h5 className="fw-bold mt-4 mb-2">Importación de funciones específicas</h5>
      <p className="text-secondary">
        La segunda alternativa consiste en importar únicamente las funciones que serán utilizadas dentro del programa. En este caso, las funciones pueden invocarse directamente, sin necesidad de escribir el nombre de la biblioteca como prefijo.
      </p>

      <div className="bg-light p-3 rounded border my-3 font-monospace fw-bold">
        from numpy import cos<br />
        x = 45<br />
        y = cos(x)
      </div>

      <p className="text-secondary">
        Este método produce un código más directo y puede resultar más cómodo cuando solo se utilizarán unas cuantas funciones de una biblioteca.
      </p>
    </div>
  );
};

export default FundamentosTab;