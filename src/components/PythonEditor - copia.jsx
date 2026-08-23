import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';

export default function PythonEditor({ 
  codigoInicial = '# Escribe tu código Python aquí\nimport numpy as np\nprint("¡Hola desde la UNAM!")',
  lineasVisibles = 8, // La vista controla el alto en renglones
  onCodeChange,       // Opcional: callback para enviar código al padre
  onOutputChange      // Opcional: callback para enviar la salida al padre
}) {
  const [code, setCode] = useState(codigoInicial);
  const [output, setOutput] = useState('');
  const [plotImage, setPlotImage] = useState(null);
  const [pyodide, setPyodide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusText, setStatusText] = useState('Iniciando motor Python...');

  const editorHeight = `${lineasVisibles * 19 + 12}px`;

  // Inicializar Pyodide
  useEffect(() => {
    async function initPyodide() {
      if (window.loadPyodide && !pyodide) {
        try {
          const py = await window.loadPyodide();
          setPyodide(py);
          setLoading(false);
          setStatusText('');
        } catch (err) {
          const errText = 'Error al inicializar Pyodide: ' + err.message;
          setOutput(errText);
          onOutputChange?.(errText); // Se notifica al padre solo si se pasó el callback
          setLoading(false);
        }
      }
    }
    initPyodide();
  }, [pyodide]);

  // Sincronizar código inicial
  useEffect(() => {
    setCode(codigoInicial);
    onCodeChange?.(codigoInicial);
  }, [codigoInicial]);

  const handleEditorChange = (val) => {
    const nuevoCodigo = val || '';
    setCode(nuevoCodigo);
    onCodeChange?.(nuevoCodigo); // Notifica al padre opcionalmente
  };

  const runCode = async () => {
    if (!pyodide) return;

    setLoading(true);
    setPlotImage(null);
    setOutput('Cargando librerías y ejecutando...');

    try {
      const packagesToLoad = [];
      if (code.includes('numpy') || code.includes('np.')) packagesToLoad.push('numpy');
      if (code.includes('sympy') || code.includes('sp.')) packagesToLoad.push('sympy');
      if (code.includes('matplotlib') || code.includes('plt.')) packagesToLoad.push('matplotlib');

      if (packagesToLoad.length > 0) {
        setStatusText(`Cargando paquetes (${packagesToLoad.join(', ')})...`);
        await pyodide.loadPackage(packagesToLoad);
      }

      setStatusText('Ejecutando script...');

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

      await pyodide.runPythonAsync(code);

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

      const stdout = pyodide.runPython('sys.stdout.getvalue()');
      const resultadoFinal = stdout || (hasPlot ? 'Gráfica generada con éxito.' : 'Ejecutado correctamente (sin salida de texto).');
      
      setOutput(resultadoFinal);
      onOutputChange?.(resultadoFinal); // Notifica al padre opcionalmente

    } catch (err) {
      const errorText = 'Error de ejecución:\n' + String(err);
      setOutput(errorText);
      onOutputChange?.(errorText);
    } finally {
      setLoading(false);
      setStatusText('');
    }
  };

  return (
    <div className="card shadow-sm my-3 border-0">
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

      <div className="card-body p-0">
        <Editor
          height={editorHeight}
          defaultLanguage="python"
          theme="vs-dark"
          value={code}
          onChange={handleEditorChange}
          options={{
            minimap: { enabled: false },
            automaticLayout: true,
            fontSize: 13,
            lineHeight: 19,
            scrollBeyondLastLine: false,
            scrollbar: {
              vertical: 'visible',
              horizontal: 'auto'
            }
          }}
        />
      </div>

      {plotImage && (
        <div className="card-body bg-white text-center border-top p-2">
          <small className="text-secondary d-block mb-1 fw-bold">Gráfica Generada:</small>
          <img 
            src={plotImage} 
            alt="Gráfica de Matplotlib" 
            className="img-fluid rounded border shadow-sm" 
            style={{ maxHeight: '250px' }} 
          />
        </div>
      )}

      <div className="card-footer bg-black text-warning font-monospace p-2">
        <small className="d-block text-secondary mb-1" style={{ fontSize: '11px' }}>Consola / Salida:</small>
        <pre className="m-0 small" style={{ whiteSpace: 'pre-wrap', maxHeight: '120px', overflowY: 'auto' }}>
          {output || '// Presiona "Ejecutar" para procesar el código'}
        </pre>
      </div>
    </div>
  );
}