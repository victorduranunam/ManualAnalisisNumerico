import React from "react";

const Tema22 = () => {
  return (
    <div className="pe-2">
      {/* 2.2 */}

      <p className="text-secondary">
        Google Colaboratory (Google Colab) es un entorno gratuito desarrollado por Google que permite escribir y ejecutar programas en Python directamente desde el navegador web.
      </p>
      <p className="text-secondary">
        Su principal ventaja es que no requiere ser instalado de manera local, ya que todos los programas se ejecutan en los servidores de Google.
      </p>
      <p className="text-secondary">
        Entre sus principales características destacan:
      </p>
      <ul className="text-secondary">
        <li>No requiere instalación.</li>
        <li>Permite trabajar desde cualquier computadora con acceso a Internet.</li>
        <li>Guarda automáticamente los archivos en Google Drive.</li>
        <li>Incluye numerosas bibliotecas científicas ya instaladas, como NumPy, SciPy, Matplotlib y Pandas.</li>
      </ul>
      <p className="text-secondary">
        Para utilizar Google Colab únicamente se necesita una cuenta de Google.
      </p>
      <p className="text-secondary fw-bold mb-2">
        El procedimiento consiste en:
      </p>
      <div className="bg-light p-3 rounded border mb-4">
        <ol className="lh-lg text-secondary mb-0">
          <li>
            En el navegador de su preferencia Iniciar sesión con una cuenta de Google.
            <div className="my-3 text-center">
              <img src="images/Python/cap2/colab_01.png" alt="Google Login" className="img-fluid border rounded shadow-sm" style={{ maxHeight: '250px' }} />
            </div>
          </li>
          <li>
  Ingresar a Google Colab (
  <a 
    href="https://colab.research.google.com" 
    target="_blank" 
    rel="noopener noreferrer" 
    className="text-decoration-underline fw-bold text-primary"
  >
    https://colab.research.google.com
  </a>
  )
  <div className="my-3 text-center">
    <img 
      src="images/Python/cap2/colab_02.png" 
      alt="Google Colab Interface" 
      className="img-fluid border rounded shadow-sm" 
      style={{ maxHeight: '250px' }} 
    />
  </div>
</li>
          <li>
            Crear un nuevo cuaderno (Notebook) y escribir algunas líneas de código.
            <div className="my-3 text-center">
              <img src="images/Python/cap2/colab_03.png" alt="Nuevo cuaderno Colab" className="img-fluid border rounded shadow-sm" style={{ maxHeight: '200px' }} />
            </div>
          </li>
          <li>
            Ejecutar cada celda mediante el botón Run o presionando Shift + Enter.
            <div className="my-3 text-center">
              <img src="images/Python/cap2/colab_04.png" alt="Ejecución de celda Colab" className="img-fluid border rounded shadow-sm" style={{ maxHeight: '200px' }} />
            </div>
          </li>
        </ol>
      </div>
      <p className="text-secondary">
        La ventaja de manejar los programas con Google Colab, es que se pueden ir metiendo bloques de texto que nos permiten agregar comentarios a nuestro código y de esta forma ir documentando nuestros programas.
      </p>
      <div className="my-3 text-center">
        <img src="images/Python/cap2/colab_05.png" alt="Bloques de texto Colab" className="img-fluid border rounded shadow-sm" style={{ maxHeight: '250px' }} />
      </div>
      <p className="text-secondary">
        Google Colab representa una excelente alternativa para quienes desean comenzar a programar sin modificar la configuración de una computadora o que lleguen a trabajar frecuentemente en lugar de públicos como salas de cómputo.
      </p>
    </div>
  );
};

export default Tema22;