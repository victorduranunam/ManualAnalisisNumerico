import React from "react";

const Fundamentos8_1 = () => (
  <div className="p-3 border rounded bg-light">
    <h5 className="text-primary fw-bold mb-2">
      8.1 Incorporación e Importación de Matplotlib
    </h5>
    <p className="text-secondary mb-3">
      Matplotlib es la biblioteca estándar para generar gráficos científicos en Python. Su submódulo <code>pyplot</code> ofrece una interfaz de comandos muy similar a MATLAB.
    </p>

    <div className="mb-3">
      <h6 className="fw-bold text-dark mb-1">Instalación en consola:</h6>
      <div className="bg-dark text-light p-2 rounded font-monospace small">
        $ pip install matplotlib
      </div>
    </div>

    <div className="mb-3">
      <h6 className="fw-bold text-dark mb-1">Importación estándar:</h6>
      <pre className="bg-dark text-light p-3 rounded small mb-0 overflow-auto">
        <code>{`import matplotlib.pyplot as plt
import numpy as np

print("Matplotlib importado correctamente como plt")`}</code>
      </pre>
    </div>

    <div className="alert alert-info py-2 px-3 mb-0 small">
      <strong>Nota práctica:</strong> En Google Colab ya viene preinstalada. En entornos locales como VS Code o Thonny se instala mediante terminal y se importa con el alias estándar <code>plt</code>.
    </div>
  </div>
);

export default Fundamentos8_1;