import React from "react";

const FundamentosTab = () => {
  return (
    <div className="pe-2">
      <p className="text-secondary">
        Los datos que utiliza un programa pueden incorporarse de diferentes formas. Una opción consiste en asignar los valores directamente dentro del código, lo cual resulta útil cuando se desea realizar una prueba con valores conocidos. Sin embargo, en muchas aplicaciones es necesario que el programa pueda trabajar con diferentes valores sin modificar el código cada vez que se ejecute.
      </p>
      <p className="text-secondary">
        Para ello, Python permite capturar información proporcionada por el usuario mediante la función <code>input()</code>. Esta función muestra un mensaje en pantalla y espera a que el usuario introduzca un valor desde el teclado, el cual posteriormente puede ser utilizado dentro del programa.
      </p>
      <p className="text-secondary">
        Por ejemplo, para solicitar el valor de un ángulo expresado en grados se puede utilizar la siguiente instrucción:
      </p>

      <div className="bg-light p-3 rounded border my-3 font-monospace fw-bold">
        angulo = input("Ingrese el ángulo en grados: ")
      </div>

      <p className="text-secondary">
        Es importante recordar que la función <code>input()</code> captura la información introducida por el usuario como una cadena de caracteres, es decir, como un dato de tipo texto.
      </p>
    </div>
  );
};

export default FundamentosTab;