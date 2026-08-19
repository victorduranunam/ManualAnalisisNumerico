import React from "react";
import { Alert } from "react-bootstrap";

const FundamentosTab = () => {
  return (
    <div className="pe-2">
      {/* Introducción General del Capítulo 3 */}
      <p className="text-secondary">
        En los capítulos anteriores se explicó la utilidad de Python para el análisis numérico y se presentó una introducción a los principales entornos de desarrollo que el lector puede utilizar para crear programas.
      </p>
      <p className="text-secondary">
        A partir de este capítulo se iniciará el desarrollo de programas en Python mediante ejemplos prácticos. El primero de ellos integrará los elementos fundamentales del lenguaje, los cuales servirán como base para la construcción de programas de mayor complejidad en los capítulos posteriores.
      </p>
      <p className="text-secondary">
        Para desarrollar los ejemplos se utilizará Visual Studio Code como entorno de desarrollo; sin embargo, el lector podrá emplear cualquiera de los entornos descritos en el capítulo anterior, de acuerdo con sus preferencias o necesidades.
      </p>
      <p className="text-secondary">
        Como primer ejemplo, se elaborará un programa sencillo que solicitará al usuario un ángulo expresado en grados, lo convertirá a radianes y calculará el seno y el coseno correspondientes. A través de este ejercicio se introducirán conceptos fundamentales de programación, como la captura de datos desde el teclado, el uso de variables, la realización de operaciones aritméticas, el empleo de funciones incorporadas y la presentación de resultados en pantalla.
      </p>

      {/* 3.1 Incorporación de bibliotecas */}
      <p className="text-secondary">
        Python dispone de un amplio conjunto de bibliotecas que amplían las funcionalidades básicas del lenguaje y permiten realizar tareas específicas, como operaciones matemáticas, procesamiento de datos, generación de gráficos, acceso a bases de datos y muchas otras aplicaciones.
      </p>
      <p className="text-secondary">
        Aunque Python incorpora de manera predeterminada las instrucciones fundamentales para programar, muchas funciones especializadas se encuentran organizadas en bibliotecas, las cuales deben incorporarse al programa antes de poder utilizarse.
      </p>
      <p className="text-secondary">
        En el caso del análisis numérico, una de las bibliotecas más importantes es NumPy, la cual proporciona funciones y estructuras de datos especializadas para realizar cálculos científicos y numéricos de manera eficiente.
      </p>
      <p className="text-secondary">
        Antes de utilizar una biblioteca que no forma parte de la instalación básica de Python, es necesario instalarla en el equipo. En Visual Studio Code, esto puede realizarse desde la terminal integrada. Para abrirla, seleccione el menú Terminal y, posteriormente, la opción New Terminal.
      </p>

      <div className="my-3 text-center">
        <img
          src="images/Python/cap3/menu_terminal_vscode.png"
          alt="Menú Terminal en Visual Studio Code"
          className="img-fluid border rounded shadow-sm"
          style={{ maxHeight: '250px' }}
        />
      </div>

      <p className="text-secondary">
        En la terminal que se acaba de abrir se debe escribir el siguiente comando:
      </p>

      <div className="bg-light p-3 rounded border text-center my-3 font-monospace fw-bold">
        pip install numpy
      </div>

      <div className="my-3 text-center">
        <img
          src="images/Python/cap3/pip_install_numpy.png"
          alt="Comando pip install numpy en terminal"
          className="img-fluid border rounded shadow-sm"
          style={{ maxHeight: '250px' }}
        />
      </div>

      <p className="text-secondary">
        La instalación de una biblioteca solo es necesaria una vez en cada equipo y para cada instalación de Python. Una vez instalada, podrá utilizarse en cualquier programa mediante la instrucción <code>import</code>.
      </p>
      <p className="text-secondary">
        En plataformas como Google Colab, muchas de las bibliotecas más utilizadas, entre ellas NumPy, ya se encuentran preinstaladas, por lo que este paso puede omitirse. Sin embargo, cuando se trabaja en un entorno de desarrollo instalado localmente, como Visual Studio Code o Thonny, es posible que sea necesario instalar previamente aquellas bibliotecas que no forman parte de la instalación estándar de Python.
      </p>
    </div>
  );
};

export default FundamentosTab;