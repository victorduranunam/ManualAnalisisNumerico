import React, { useState } from 'react';

const EjerciciosTab = () => {
  const [cargandoFrame, setCargandoFrame] = useState(true);

  // URL pública de JupyterLite (Notebook completo en la nube/WebAssembly)
  // Puedes reemplazar esta URL por una instancia propia alojada en tu servidor
  const jupyterUrl = "https://jupyter.org/try-jupyter/retro/notebooks/?path=notebook.ipynb";

  // URL del archivo .ipynb de tuSubcapítulo 2.2 alojado en GitHub
  const githubNotebookUrl = "https://github.com/victorduran/ManualAnalisisNumerico/blob/main/notebooks/subcapitulo_2_2.ipynb";
  const colabUrl = `https://colab.research.google.com/github/victorduran/ManualAnalisisNumerico/blob/main/notebooks/subcapitulo_2_2.ipynb`;

  return (
    <div className="border rounded p-4 bg-light">
      {/* Encabezado de la Sección */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h5 className="text-primary fw-bold mb-1">
            <i className="bi bi-journal-code me-2"></i>Ejercicios del subcapítulo 2.2
          </h5>
          <p className="text-muted small mb-0">
            Cuaderno interactivo de Jupyter embebido para la resolución numérica de los ejercicios del Subcapítulo 2.2.
          </p>
        </div>

        {/* Acceso Alternativo a Google Colab */}
        <div>
          <a
            href={colabUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-primary btn-sm fw-semibold shadow-sm"
            title="Abrir este notebook en Google Colab"
          >
            <img
              src="https://colab.research.google.com/assets/colab-badge.svg"
              alt="Abrir en Colab"
              style={{ height: '22px', verticalAlign: 'middle' }}
            />
          </a>
        </div>
      </div>

      {/* Barra de estado / Indicador */}
      <div className="alert alert-info py-2 small d-flex align-items-center justify-content-between mb-3">
        <span>
          <i className="bi bi-info-circle-fill me-2"></i>
          Puedes ejecutar las celdas de código presionando <kbd>Shift</kbd> + <kbd>Enter</kbd> directamente en el cuaderno.
        </span>
        {cargandoFrame && (
          <span className="text-muted">
            <span className="spinner-border spinner-border-sm me-1" role="status"></span>
            Cargando entorno Jupyter...
          </span>
        )}
      </div>

      {/* Contenedor del Cuaderno JupyterLite Embebido */}
      <div className="card shadow-sm border overflow-hidden">
        <div className="card-header bg-dark text-white py-2 px-3 d-flex justify-content-between align-items-center">
          <span className="small font-monospace fw-bold">
            <i className="bi bi-file-type-py me-2 text-warning"></i>ejercicios_subcapitulo_2_2.ipynb
          </span>
          <span className="badge bg-secondary text-light">JupyterLite / Python 3</span>
        </div>

        <div className="card-body p-0" style={{ position: 'relative', height: '600px' }}>
          <iframe
            src={jupyterUrl}
            title="JupyterLite Notebook Subcapítulo 2.2"
            onLoad={() => setCargandoFrame(false)}
            allow="autorun; clipboard-read; clipboard-write"
            style={{
              width: '100%',
              height: '100%',
              border: 'none'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default EjerciciosTab;