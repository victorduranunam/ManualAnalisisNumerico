import React from "react";

const Tema26 = () => {
  return (
    <div className="pe-2">
      {/* 2.6 */}

      <p className="text-secondary">
        Visual Studio Code (VS Code) es uno de los editores de código más utilizados en la actualidad. Se trata de un editor de código fuente gratuito, multiplataforma y compatible con una gran variedad de lenguajes de programación.
      </p>
      <p className="text-secondary">
        Aunque en su instalación inicial funciona como un editor de texto avanzado, puede transformarse en un potente entorno de desarrollo para Python mediante la instalación de extensiones, las cuales incorporan funciones como resaltado de sintaxis, autocompletado de código, depuración, ejecución de programas, administración de entornos virtuales e integración con herramientas de control de versiones.
      </p>
      <p className="text-secondary">
        Su instalación se realiza desde: <code>https://code.visualstudio.com</code>
      </p>
      <div className="my-3 text-center">
        <img src="images/Python/cap2/vscode_01.png" alt="Visual Studio Code Website" className="img-fluid border rounded shadow-sm" style={{ maxHeight: '250px' }} />
      </div>
      <p className="text-secondary">
        Posteriormente, se recomienda instalar la extensión Python, ya que incorpora las herramientas necesarias para facilitar el desarrollo de programas en este lenguaje.
      </p>
      <p className="text-secondary">
        Para instalarla, haga clic en el icono de Extensiones, ubicado en la barra de actividades del lado izquierdo de la ventana de Visual Studio Code. A continuación, escriba Python en el cuadro de búsqueda situado en la parte superior del panel de extensiones. Cuando aparezca la extensión Python, selecciónela y haga clic en el botón Instalar.
      </p>
      <div className="my-3 text-center">
        <img src="images/Python/cap2/vscode_02.png" alt="Instalación extensión Python en VS Code" className="img-fluid border rounded shadow-sm" style={{ maxHeight: '250px' }} />
      </div>
      <p className="text-secondary">
        Esta extensión proporciona:
      </p>
      <ul className="text-secondary">
        <li>Resaltado de sintaxis.</li>
        <li>Autocompletado inteligente.</li>
        <li>Depuración.</li>
        <li>Ejecución del programa.</li>
        <li>Detección automática del intérprete de Python.</li>
      </ul>
      <p className="text-secondary">
        Cuando existen varias versiones de Python instaladas en el equipo, VS Code permite seleccionar cuál utilizar mediante el comando el menú que aparece en la parte inferior derecha de la pantalla.
      </p>
      <div className="my-3 text-center">
        <img src="images/Python/cap2/vscode_03.png" alt="Selección versión Python en VS Code" className="img-fluid border rounded shadow-sm" style={{ maxHeight: '100px' }} />
      </div>
      <p className="text-secondary">
        Esto nos permitirá abrir la siguiente ventana y nos permitirá seleccionar la versión de Python que necesitemos usar.
      </p>
      <div className="my-3 text-center">
        <img src="images/Python/cap2/vscode_04.png" alt="Select a Python Environment" className="img-fluid border rounded shadow-sm" style={{ maxHeight: '200px' }} />
      </div>
      <p className="text-secondary">
        Para comenzar a programar en Python con Visual Studio Code, aunque no es indispensable, sí es recomendable crear una carpeta donde se almacenarán los programas que se desarrollen durante el curso. Por ejemplo, se puede crear una carpeta con el nombre <code>programas_analisis_numerico</code>. Conforme se avance en el desarrollo de los programas, podrán crearse dentro de ella los subdirectorios necesarios para organizar los archivos de acuerdo con los temas o capítulos correspondientes.
      </p>
      <div className="my-3 text-center">
        <img src="images/Python/cap2/vscode_05.png" alt="Directorio programas_analisis_numerico" className="img-fluid border rounded shadow-sm" style={{ maxHeight: '200px' }} />
      </div>
      <p className="text-secondary">
        Posteriormente en Visual Studio Code en el menú File Seleccionaremos la opción de Open Folder.
      </p>
      <div className="my-3 text-center">
        <img src="images/Python/cap2/vscode_06.png" alt="File Open Folder VS Code" className="img-fluid border rounded shadow-sm" style={{ maxHeight: '220px' }} />
      </div>
      <p className="text-secondary">
        Al seleccionar la carpeta programas_analisis_numerico, se podrá utilizar el administrador de archivos integrado de Visual Studio Code para crear nuevos programas y organizar los archivos correspondientes al proyecto.
      </p>
      <div className="my-3 text-center">
        <img src="images/Python/cap2/vscode_07.png" alt="Explorer VS Code New File" className="img-fluid border rounded shadow-sm" style={{ maxHeight: '200px' }} />
      </div>
      <p className="text-secondary">
        Por ejemplo, se puede seleccionar la opción New File para crear un nuevo archivo de Python. Este archivo debe tener la extensión .py, ya que esta permite que Visual Studio Code lo reconozca como un programa escrito en Python y habilite las herramientas correspondientes para su edición y ejecución.
      </p>
      <div className="my-3 text-center">
        <img src="images/Python/cap2/vscode_08.png" alt="Creación archivo hola.py" className="img-fluid border rounded shadow-sm" style={{ maxHeight: '200px' }} />
      </div>
      <p className="text-secondary">
        Tomando como ejemplo el archivo Hola Mundo que se ha utilizado en las distintas herramientas, se puede escribir el código correspondiente y ejecutar el programa utilizando las opciones disponibles en Visual Studio Code.
      </p>
      <p className="text-secondary">
        Para ejecutar el archivo, se puede utilizar el botón Ejecutar ubicado en la parte superior derecha de la ventana del editor de código. Como segunda alternativa, se puede utilizar la combinación de teclas Ctrl + F5 para iniciar la ejecución del programa.
      </p>
      <div className="my-3 text-center">
        <img src="images/Python/cap2/vscode_09.png" alt="Ejecutar programa en VS Code" className="img-fluid border rounded shadow-sm" style={{ maxHeight: '280px' }} />
      </div>
      <p className="text-secondary">
        El resultado de la ejecución del programa se mostrará en la terminal integrada de Visual Studio Code, ubicada en la parte inferior de la ventana. En ella se podrán observar los mensajes generados por el programa, así como cualquier información o error que se produzca durante su ejecución.
      </p>
    </div>
  );
};

export default Tema26;