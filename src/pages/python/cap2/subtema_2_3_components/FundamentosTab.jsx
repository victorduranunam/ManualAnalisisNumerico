import React from "react";

const Tema23 = () => {
  return (
    <div className="pe-2">
      {/* 2.3 */}
  
      <p className="text-secondary">
        Pydroid 3 es una aplicación para dispositivos Android que permite desarrollar programas en Python directamente desde un teléfono o tableta.
      </p>
      <p className="text-secondary">
        Incluye:
      </p>
      <ul className="text-secondary">
        <li>Editor de código.</li>
        <li>Consola interactiva.</li>
        <li>Administrador de paquetes.</li>
        <li>Soporte para NumPy, Matplotlib, SciPy y muchas otras bibliotecas.</li>
      </ul>
      <p className="text-secondary">
        Aunque resulta muy útil para realizar prácticas rápidas o estudiar cuando no se dispone de una computadora, el desarrollo de programas extensos puede resultar menos cómodo debido al tamaño de la pantalla y del teclado (se recomienda usar principalmente con tablets).
      </p>
      <p className="text-secondary">
        La instalación consiste simplemente en descargar la aplicación desde Google Play e instalar los paquetes adicionales cuando sean requeridos.
      </p>
      <div className="my-3 text-center">
        <img src="/images/Python/cap2/pydroid_01.png" alt="Pydroid 3 Google Play" className="img-fluid border rounded shadow-sm" style={{ maxHeight: '250px' }} />
      </div>
      <p className="text-secondary">
        Una vez instalado Pydroid, se puede abrir como cualquier otra aplicación de Android. Al iniciarlo, se mostrará la pantalla principal, la cual está compuesta por diferentes áreas: la barra de menús, el editor de código, donde se escribirán los programas, y el teclado virtual del dispositivo, que permitirá ingresar las instrucciones.
      </p>
      <p className="text-secondary">
        Además, la aplicación cuenta con un área de ejecución donde se mostrarán los resultados generados por los programas.
      </p>
      <p className="text-secondary">
        Para ejecutar un programa, se debe presionar el botón amarillo ubicado en la parte inferior de la ventana del editor de código. Al hacerlo, Pydroid ejecutará las instrucciones escritas y mostrará el resultado correspondiente.
      </p>
      <div className="my-3 text-center">
        <img src="/images/Python/cap2/pydroid_02.png" alt="Editor Pydroid 3" className="img-fluid border rounded shadow-sm" style={{ maxHeight: '300px' }} />
      </div>
      <p className="text-secondary">
        Al ejecutar el programa se abrirá otra ventana en la cual se mostrará el resultado.
      </p>
      <div className="my-3 text-center">
        <img src="/images/Python/cap2/pydroid_03.png" alt="Resultado Pydroid 3" className="img-fluid border rounded shadow-sm" style={{ maxHeight: '250px' }} />
      </div>
    </div>
  );
};

export default Tema23;