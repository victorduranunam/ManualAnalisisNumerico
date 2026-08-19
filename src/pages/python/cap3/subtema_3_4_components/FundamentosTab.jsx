import React from "react";

const FundamentosTab = () => {
  return (
    <div className="pe-2">
      <p className="text-secondary">
        Una vez que el valor del ángulo ha sido capturado desde el teclado, es necesario convertirlo a un valor numérico para que pueda utilizarse correctamente en las operaciones matemáticas posteriores.
      </p>
      <p className="text-secondary">
        La función <code>input()</code> recibe cualquier información introducida por el usuario como una cadena de caracteres, es decir, como un dato de tipo texto. Aunque el usuario introduzca un número, Python lo interpreta inicialmente como texto, por lo que es necesario realizar una conversión antes de utilizarlo en cálculos.
      </p>
      <p className="text-secondary">
        Para realizar estas conversiones existen diferentes funciones que permiten cambiar un dato de un tipo a otro. Por ejemplo, si se desea convertir el ángulo ingresado directamente a un número real, se puede utilizar la función <code>float()</code> antes de la función <code>input()</code>:
      </p>

      <div className="bg-light p-3 rounded border my-3 font-monospace fw-bold">
        angulo = float(input("Ingrese el ángulo en grados: "))
      </div>

      <p className="text-secondary">
        En esta instrucción, el valor introducido por el usuario es recibido inicialmente como texto mediante la función <code>input()</code>. Posteriormente, la función <code>float()</code> convierte dicho valor en un número real, permitiendo que la variable <code>angulo</code> pueda utilizarse en operaciones matemáticas.
      </p>
      <p className="text-secondary fw-bold mb-2">
        Otras funciones de conversión de datos utilizadas con frecuencia en programación y en el análisis numérico son:
      </p>

      <ul className="text-secondary">
        <li><code>int()</code>: convierte un valor a un número entero.</li>
        <li><code>float()</code>: convierte un valor a un número real.</li>
        <li><code>str()</code>: convierte un valor a una cadena de caracteres.</li>
        <li><code>complex()</code>: convierte un valor a un número complejo.</li>
      </ul>

      <p className="text-secondary">
        Estas funciones permiten adaptar los datos al formato requerido por cada operación, lo cual es especialmente importante en aplicaciones de cálculo numérico, donde los valores deben manejarse con el tipo de dato adecuado.
      </p>
      <p className="text-secondary">
        Por ejemplo:
      </p>

      <div className="bg-light p-3 rounded border my-3 font-monospace fw-bold">
        x = int(10)<br />
        y = float(10)<br />
        nombre = str(10)
      </div>

      <p className="text-secondary">
        En este ejemplo, el valor 10 se convierte explícitamente a un número entero, un número real y una cadena de texto, respectivamente, antes de ser almacenado en la variable correspondiente.
      </p>
    </div>
  );
};

export default FundamentosTab;