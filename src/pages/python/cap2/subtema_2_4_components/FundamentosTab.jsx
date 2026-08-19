import React from "react";

const Tema24 = () => {
  return (
    <div className="pe-2">
      {/* 2.4 */}

      <p className="text-secondary">
        Thonny fue desarrollado originalmente en la Universidad de Tartu (University of Tartu), una de las universidades más importantes de Estonia. El proyecto fue iniciado por Aivar Annamaa, investigador y profesor de esa universidad, con el objetivo de facilitar el aprendizaje de Python a estudiantes que daban sus primeros pasos en programación.
      </p>
      <p className="text-secondary">
        Actualmente Thonny es un proyecto de código abierto y continúa siendo mantenido por una comunidad de desarrolladores, aunque sigue estrechamente vinculado a la Universidad de Tartu.
      </p>
      <p className="text-secondary">
        Thonny puede ser descargado de la siguiente dirección: <code>https://thonny.org/</code>
      </p>
      <div className="my-3 text-center">
        <img src="/images/Python/cap2/thonny_01.png" alt="Descargar Thonny" className="img-fluid border rounded shadow-sm" style={{ maxHeight: '250px' }} />
      </div>
      <p className="text-secondary">
        Entre sus características destacan:
      </p>
      <ul className="text-secondary">
        <li>Interfaz sencilla.</li>
        <li>Espacio de almacenamiento muy pequeño (40 MB y 120 incluyendo Python)</li>
        <li>Resaltado de sintaxis.</li>
        <li>Depuración paso a paso.</li>
        <li>Consola integrada.</li>
      </ul>
      <p className="text-secondary">
        Al ejecutar Thonny por primera vez, se abrirá la ventana principal del entorno de desarrollo. En ella realizaremos prácticamente todo nuestro trabajo al crear y ejecutar programas en Python.
      </p>
      <p className="text-secondary">
        La interfaz está dividida en tres áreas principales:
      </p>
      <p className="text-secondary">
        <strong>Editor de código (parte superior izquierda):</strong> es el espacio donde escribiremos las instrucciones que forman nuestro programa. Cada vez que creemos un nuevo archivo, este será el lugar donde capturaremos el código.
      </p>
      <p className="text-secondary">
        <strong>Panel de información (lado derecho):</strong> en esta sección Thonny muestra diferentes mensajes relacionados con el programa, como avisos, información del proceso de ejecución o posibles errores que nos ayudarán a identificar y corregir problemas en el código.
      </p>
      <p className="text-secondary">
        <strong>Consola o intérprete de Python (parte inferior izquierda):</strong> aquí se muestra el resultado de la ejecución de nuestros programas. Por ejemplo, si el programa imprime un mensaje en pantalla, este aparecerá en esta ventana. Además, también podemos escribir y ejecutar instrucciones de Python de forma inmediata, sin necesidad de crear un archivo.
      </p>
      <div className="my-3 text-center">
        <img src="/images/Python/cap2/thonny_02.png" alt="Interfaz de Thonny" className="img-fluid border rounded shadow-sm" style={{ maxHeight: '300px' }} />
      </div>
    </div>
  );
};

export default Tema24;