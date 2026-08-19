import React from "react";

const FundamentosTab = () => {
  return (
    <div className="pe-2">
      <p className="text-secondary">
        Las variables son espacios de memoria que permiten almacenar información para utilizarla posteriormente dentro de un programa. En Python, una variable se crea en el momento en que se le asigna un valor mediante el operador de asignación <code>=</code>, por lo que no es necesario declarar previamente su tipo de dato, como ocurre en otros lenguajes de programación.
      </p>
      <p className="text-secondary">
        Python permite manejar diferentes tipos de datos, entre los que se encuentran los números enteros, los números reales, las cadenas de texto y los valores lógicos, entre otros.
      </p>
      <p className="text-secondary">
        La forma general de asignar un valor a una variable es la siguiente:
      </p>

      <div className="bg-light p-3 rounded border text-center my-3 font-monospace fw-bold">
        nombre_variable = valor
      </div>

      <p className="text-secondary">
        Por ejemplo, para almacenar un número entero o un número real se pueden utilizar las siguientes instrucciones:
      </p>

      <div className="bg-light p-3 rounded border text-start my-3 font-monospace fw-bold">
        x = 10<br />
        y = 25.75
      </div>

      <p className="text-secondary">
        En este caso, la variable <code>x</code> almacena un número entero, mientras que la variable <code>y</code> almacena un número real. Python identifica automáticamente el tipo de dato de cada variable a partir del valor que se le asigna, por lo que el programador no necesita especificarlo.
      </p>
    </div>
  );
};

export default FundamentosTab;