import React from "react";
import { Alert } from "react-bootstrap";

const Tema25 = () => {
  return (
    <div className="pe-2">
      {/* 2.5 */}

      <p className="text-secondary">
        Cuando se desea desarrollar programas de forma local es necesario instalar Python en el sistema operativo.
      </p>
      <p className="text-secondary">
        La distribución oficial puede descargarse desde: <code>https://www.python.org</code>
      </p>
      <div className="my-3 text-center">
        <img src="/images/Python/cap2/python_01.png" alt="Python Releases for Windows" className="img-fluid border rounded shadow-sm" style={{ maxHeight: '250px' }} />
      </div>
      <Alert variant="info" className="border-0 shadow-sm my-4 p-4">
        <h6 className="fw-bold mb-2">
          <i className="bi bi-info-circle-fill me-2"></i>Nota importante:
        </h6>
        <p className="mb-0">
          Durante la instalación de Python es posible dejar todas las opciones con su configuración predeterminada. Sin embargo, es importante asegurarse de activar la casilla <strong>"Add Python to PATH"</strong>, ya que esto permitirá ejecutar Python desde la línea de comandos y facilitará el uso de diversas herramientas de desarrollo.
        </p>
      </Alert>
      <p className="text-secondary">
        Una vez finalizada la instalación puede verificarse escribiendo:
      </p>
      <div className="bg-light p-3 rounded border text-center my-3 font-monospace fw-bold">
        python –version &nbsp;&nbsp;o bien&nbsp;&nbsp; py --version
      </div>
      <p className="text-secondary">
        Si el proceso fue exitoso aparecerá la versión instalada.
      </p>
    </div>
  );
};

export default Tema25;