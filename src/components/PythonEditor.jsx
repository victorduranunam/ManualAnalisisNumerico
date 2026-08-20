import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';

export default function PythonEditor({ 
  codigoInicial = '# Escribe tu código Python aquí\nimport numpy as np\nprint("¡Hola desde la UNAM!")',
  altura = '220px' // Permite ajustar el alto desde el componente padre
}) {
  const [code, setCode] = useState(codigoInicial);
  const [output, setOutput] = useState('');
  const [plotImage, setPlotImage] = useState(null);
  const [pyodide, setPyodide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusText, setStatusText] = useState('Iniciando motor Python...');

  // Inicializar Pyodide cargado previamente desde index.html
  useEffect(() => {
    async function initPyodide() {
      if (window.loadPyodide && !pyodide) {
        try {
          const py = await window.loadPyodide();
          setPyodide(py);
          setLoading(false);
          setStatusText('');
        } catch (err) {
          setOutput('Error al inicializar Pyodide: ' + err.message);
          setLoading(false);
        }
      }
    }
    initPyodide();
  }, [pyodide]);

  // Sincronizar el estado del código si la prop codigoInicial cambia desde React
  useEffect(() => {
    setCode(codigoInicial);
  }, [codigoInicial]);

  const runCode = async () => {
    if (!pyodide) return;

    setLoading(true);
    setPlotImage(null);
    setOutput('Cargando librerías y ejecutando...');

    try {
      // 1. Cargar librerías necesarias dinámicamente según lo importado en el código
      const packagesToLoad = [];
      if (code.includes('numpy') || code.includes('np.')) packagesToLoad.push('numpy');
      if (code.includes('sympy') || code.includes('sp.')) packagesToLoad.push('sympy');
      if (code.includes('matplotlib') || code.includes('plt.')) packagesToLoad.push('matplotlib');

      if (packagesToLoad.length > 0) {
        setStatusText(`Cargando paquetes (${packagesToLoad.join(', ')})...`);
        await pyodide.loadPackage(packagesToLoad);
      }

      setStatusText('Ejecutando script...');

      // 2. Redirigir consola (stdout) y preparar el backend gráfico de Matplotlib
      await pyodide.runPythonAsync(`
        import sys
        import io
        sys.stdout = io.StringIO()

        if 'matplotlib' in sys.modules:
            import matplotlib
            matplotlib.use('module://matplotlib.backends.html5_canvas')
            import matplotlib.pyplot as plt
            plt.clearIntervals() if hasattr(plt, 'clearIntervals') else None
            plt.close('all')
      `);

      // 3. Ejecutar el código Python escrito por el usuario
      await pyodide.runPythonAsync(code);

      // 4. Capturar gráficas generadas con Matplotlib (si aplica)
      const hasPlot = await pyodide.runPythonAsync(`
        import base64
        img_str = ""
        if 'matplotlib.pyplot' in sys.modules:
            import matplotlib.pyplot as plt
            fig = plt.gcf()
            if fig.get_axes():
                buf = io.BytesIO()
                plt.savefig(buf, format='png', bbox_inches='tight')
                buf.seek(0)
                img_str = base64.b64encode(buf.read()).decode('utf-8')
                plt.close('all')
        img_str
      `);

      if (hasPlot) {
        setPlotImage(`data:image/png;base64,${hasPlot}`);
      }

      // 5. Capturar impresiones de consola (print)
      const stdout = pyodide.runPython('sys.stdout.getvalue()');
      setOutput(stdout || (hasPlot ? 'Gráfica generada con éxito.' : 'Ejecutado correctamente (sin salida de texto).'));

    } catch (err) {
      setOutput('Error de ejecución:\n' + String(err));
    } finally {
      setLoading(false);
      setStatusText('');
    }
  };

  return (
    <div className="card shadow-sm my-3 border-0">
      {/* Encabezado del Editor */}
      <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center py-2">
        <span className="fw-bold small">
          <i className="bi bi-code-slash me-2 text-warning"></i>Editor Interactivo de Python
        </span>
        <button 
          onClick={runCode} 
          disabled={loading} 
          className="btn btn-success btn-sm px-3 fw-bold"
        >
          {loading ? (statusText || 'Procesando...') : '▶ Ejecutar'}
        </button>
      </div>

      {/* Monaco Editor con altura dinámicamente personalizable */}
      <div className="card-body p-0">
        <Editor
          height={altura}
          defaultLanguage="python"
          theme="vs-dark"
          value={code}
          onChange={(val) => setCode(val || '')}
          options={{
            minimap: { enabled: false },
            automaticLayout: true,
            fontSize: 13,
            scrollBeyondLastLine: false,
          }}
        />
      </div>

      {/* Render de Gráficas de Matplotlib */}
      {plotImage && (
        <div className="card-body bg-white text-center border-top p-2">
          <small className="text-secondary d-block mb-1 fw-bold">Gráfica Generada:</small>
          <img 
            src={plotImage} 
            alt="Gráfica de Matplotlib" 
            className="img-fluid rounded border shadow-sm" 
            style={{ maxHeight: '280px' }} 
          />
        </div>
      )}

      {/* Consola de Salida de Texto */}
      <div className="card-footer bg-black text-warning font-monospace p-2">
        <small className="d-block text-secondary mb-1" style={{ fontSize: '11px' }}>Consola / Salida:</small>
        <pre className="m-0 small" style={{ whiteSpace: 'pre-wrap', maxHeight: '150px', overflowY: 'auto' }}>
          {output || '// Presiona "Ejecutar" para procesar el código'}
        </pre>
      </div>
    </div>
  );
}