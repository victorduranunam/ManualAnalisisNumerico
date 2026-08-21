import React, { useState, useEffect } from 'react';

const EjerciciosTab = () => {
  const [codigo, setCodigo] = useState(
`# Ejemplo: Método de Bisección / Iteración para el Subcapítulo 2.2
import math

def f(x):
    return x**3 - 4*x - 9

# Parámetros iniciales
a = 2.0
b = 3.0
tol = 0.0001
iteraciones = 0

print("Calculando raíz en el intervalo [", a, ",", b, "]...")

while (b - a) / 2.0 > tol:
    c = (a + b) / 2.0
    iteraciones += 1
    
    if f(c) == 0:
        break
    elif f(a) * f(c) < 0:
        b = c
    else:
        a = c

raiz = (a + b) / 2.0
print(f"Raíz aproximada: {raiz:.6f}")
print(f"Iteraciones realizadas: {iteraciones}")
`
  );

  const [salidaTerminal, setSalidaTerminal] = useState('');
  const [variables, setVariables] = useState({});
  const [cargandoPyodide, setCargandoPyodide] = useState(true);
  const [ejecutando, setEjecutando] = useState(false);
  const [pyodideInstance, setPyodideInstance] = useState(null);

  // Cargar Pyodide (Motor de Python en WebAssembly) dinámicamente
  useEffect(() => {
    const cargarScriptPyodide = async () => {
      if (window.loadPyodide && !window.pyodide) {
        try {
          const py = await window.loadPyodide();
          window.pyodide = py;
          setPyodideInstance(py);
          setCargandoPyodide(false);
        } catch (err) {
          console.error('Error al inicializar Pyodide:', err);
          setCargandoPyodide(false);
        }
      } else if (window.pyodide) {
        setPyodideInstance(window.pyodide);
        setCargandoPyodide(false);
      } else {
        // Inyectar el script CDN si no está cargado previamente en el index.html
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js';
        script.async = true;
        script.onload = async () => {
          const py = await window.loadPyodide();
          window.pyodide = py;
          setPyodideInstance(py);
          setCargandoPyodide(false);
        };
        document.body.appendChild(script);
      }
    };

    cargarScriptPyodide();
  }, []);

  const handleEjecutarCodigo = async () => {
    if (!pyodideInstance) return;

    setEjecutando(true);
    setSalidaTerminal('');
    
    try {
      let salidaAcumulada = '';
      
      // Capturar la salida estándar del print()
      pyodideInstance.setStdout({
        text: (texto) => {
          salidaAcumulada += texto + '\n';
          setSalidaTerminal(salidaAcumulada);
        }
      });

      // Ejecutar el script Python
      await pyodideInstance.runPythonAsync(codigo);

      // Inspeccionar variables globales para el panel de Thonny
      const varsDict = {};
      const globalsMap = pyodideInstance.globals.toJs();
      
      globalsMap.forEach((valor, clave) => {
        // Filtrar funciones nativas y módulos importados
        if (!clave.startsWith('_') && typeof valor !== 'function' && clave !== 'f') {
          varsDict[clave] = String(valor);
        }
      });

      setVariables(varsDict);

    } catch (err) {
      setSalidaTerminal((prev) => prev + `\nError de ejecución:\n${err.message}`);
    } finally {
      setEjecutando(false);
    }
  };

  const handleReiniciarCodigo = () => {
    setCodigo('# Escribe tu código Python aquí\n');
    setSalidaTerminal('');
    setVariables({});
  };

  return (
    <div className="border rounded p-4 bg-light">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h5 className="text-primary fw-bold mb-1">
            <i className="bi bi-code-square me-2"></i>Ejercicios del subcapítulo 2.2
          </h5>
          <p className="text-muted small mb-0">
            Entorno interactivo tipo <strong>Thonny IDE</strong>. Modifica el código en Python y ejecútalo para verificar tus algoritmos del Subcapítulo 2.2.
          </p>
        </div>

        {/* Estado del Motor Python */}
        <div>
          {cargandoPyodide ? (
            <span className="badge bg-warning text-dark p-2">
              <span className="spinner-border spinner-border-sm me-1" role="status"></span>
              Cargando Python...
            </span>
          ) : (
            <span className="badge bg-success p-2">
              <i className="bi bi-check-circle-fill me-1"></i> Python Listo (WebAssembly)
            </span>
          )}
        </div>
      </div>

      {/* Barra de herramientas estilo Thonny */}
      <div className="d-flex align-items-center gap-2 p-2 bg-white border rounded mb-3 shadow-sm">
        <button
          className="btn btn-success btn-sm fw-bold px-3"
          onClick={handleEjecutarCodigo}
          disabled={cargandoPyodide || ejecutando}
        >
          {ejecutando ? (
            <>
              <span className="spinner-border spinner-border-sm me-1" role="status"></span>
              Ejecutando...
            </>
          ) : (
            <>
              <i className="bi bi-play-fill me-1"></i> Exec (F5)
            </>
          )}
        </button>

        <button
          className="btn btn-outline-secondary btn-sm"
          onClick={handleReiniciarCodigo}
          disabled={ejecutando}
        >
          <i className="bi bi-file-earmark-plus me-1"></i> Limpiar Editor
        </button>
      </div>

      {/* Disposición de la Interfaz Thonny (Editor + Shell + Variables) */}
      <div className="row g-3">
        {/* Columna Izquierda: Editor + Shell Terminal */}
        <div className="col-lg-8">
          {/* Panel Superior: Editor de Código */}
          <div className="card shadow-sm mb-3">
            <div className="card-header bg-secondary text-white py-1 px-3 d-flex justify-content-between align-items-center">
              <span className="small fw-bold font-monospace">
                <i className="bi bi-file-code me-1"></i>ejercicio_2_2.py
              </span>
              <span className="badge bg-dark text-light border" style={{ fontSize: '0.7rem' }}>
                Python 3.11
              </span>
            </div>
            <div className="card-body p-0">
              <textarea
                className="form-control font-monospace border-0 p-3"
                rows={12}
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                style={{
                  backgroundColor: '#282c34',
                  color: '#abb2bf',
                  fontSize: '0.9rem',
                  resize: 'vertical',
                  lineHeight: '1.4'
                }}
                spellCheck="false"
              />
            </div>
          </div>

          {/* Panel Inferior: Consola / Terminal Shell */}
          <div className="card shadow-sm">
            <div className="card-header bg-dark text-white py-1 px-3 small fw-bold font-monospace">
              <i className="bi bi-terminal me-2 text-success"></i>Shell (Consola de salida)
            </div>
            <div 
              className="card-body bg-black text-success font-monospace p-3 rounded-bottom"
              style={{ minHeight: '130px', maxHeight: '200px', overflowY: 'auto' }}
            >
              <pre className="m-0" style={{ fontSize: '0.85rem', whiteSpace: 'pre-wrap' }}>
                {salidaTerminal || '>>> Listo para ejecutar. Presiona Exec (F5) para ver la salida.'}
              </pre>
            </div>
          </div>
        </div>

        {/* Columna Derecha: Inspector de Variables (Característico de Thonny) */}
        <div className="col-lg-4">
          <div className="card shadow-sm h-100">
            <div className="card-header bg-info text-dark py-1 px-3 small fw-bold">
              <i className="bi bi-table me-2"></i>Variables en Memoria
            </div>
            <div className="card-body p-0 table-responsive">
              <table className="table table-sm table-striped align-middle mb-0" style={{ fontSize: '0.82rem' }}>
                <thead className="table-light">
                  <tr>
                    <th className="ps-3">Nombre</th>
                    <th>Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(variables).length > 0 ? (
                    Object.entries(variables).map(([nombre, valor]) => (
                      <tr key={nombre}>
                        <td className="ps-3 fw-bold text-primary font-monospace">{nombre}</td>
                        <td className="text-break font-monospace">{valor}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2" className="text-center text-muted py-4">
                        <i className="bi bi-inbox fs-4 d-block mb-1"></i>
                        No hay variables registradas en memoria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EjerciciosTab;