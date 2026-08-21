import React, { useState } from 'react';
import PythonEditor from '../../components/PythonEditor';

export default function SesionActual() {
  const [numeroCuenta, setNumeroCuenta] = useState('');
  
  // Captura de código y salida de terminal únicas
  const [codigoOficial, setCodigoOficial] = useState('');
  const [terminalOficial, setTerminalOficial] = useState('');
  
  const [enviando, setEnviando] = useState(false);
  const [mensaje, setMensaje] = useState(null);

  const API_URL = '/victord/ManualAnalisisNumerico/public/api/registrar_participacion.php';

  const codigoInicial = `# Participación Oficial de la Clase
import numpy as np

# Escribe aquí la solución del ejercicio y presiona ▶ Ejecutar
print("Entrega de participación")`;

  const handleEnviarParticipacion = async (e) => {
    e.preventDefault();

    const terminalLimpia = terminalOficial.trim().toLowerCase();

    // 1. Validar que la terminal SE HAYA EJECUTADO
    if (
      !terminalLimpia || 
      terminalLimpia.includes('presiona') || 
      terminalLimpia.startsWith('//') || 
      terminalLimpia.startsWith('#')
    ) {
      setMensaje({ 
        tipo: 'warning', 
        texto: 'Es obligatorio presionar el botón "▶ Ejecutar" en el editor antes de enviar.' 
      });
      return;
    }

    // 2. Validar que el Código de Python no esté vacío
    if (!codigoOficial.trim()) {
      setMensaje({ 
        tipo: 'danger', 
        texto: 'El código de Python no puede estar vacío.' 
      });
      return;
    }

    // 3. Validar Número de Cuenta UNAM
    if (!numeroCuenta.trim()) {
      setMensaje({ 
        tipo: 'danger', 
        texto: 'Por favor, ingresa tu número de cuenta UNAM.' 
      });
      return;
    }

    setEnviando(true);
    setMensaje(null);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          numero_cuenta: numeroCuenta.trim(),
          codigo_python: codigoOficial,
          salida_terminal: terminalOficial,
        }),
      });

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error(`El servidor devolvió un error (${response.status}). Revisa los permisos en el servidor.`);
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.mensaje || 'Error al guardar la participación.');
      }

      setMensaje({ 
        tipo: 'success', 
        texto: data.mensaje || '¡Participación registrada exitosamente!' 
      });

    } catch (error) {
      setMensaje({ 
        tipo: 'danger', 
        texto: error.message || 'Ocurrió un error al conectar con la base de datos.' 
      });
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="container-fluid py-2">
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body p-4">
          
          {/* Banner de Instrucciones */}
          <div className="alert alert-primary border-0 d-flex align-items-center mb-4" role="alert">
            <i className="bi bi-info-circle-fill fs-4 me-3"></i>
            <div>
              <h5 className="alert-heading fw-bold mb-1">Registro de Participación de la Clase</h5>
              <p className="mb-0">
                Escribe tu código, presiona <strong>▶ Ejecutar</strong> para validar la salida en consola e ingresa tu número de cuenta para registrar tu entrega.
              </p>
            </div>
          </div>

          <form onSubmit={handleEnviarParticipacion}>
            
            {/* Editor Único de Python */}
            <div className="mb-4 p-3 bg-white rounded border border-2 border-primary shadow-sm">
              <h5 className="fw-bold text-primary mb-1">
                <i className="bi bi-code-slash me-2"></i>
                Editor de Código de Participación <span className="text-danger">*</span>
              </h5>
              <small className="text-muted d-block mb-2">
                <strong>Indispensable:</strong> Presiona "▶ Ejecutar" en este editor antes de enviar para capturar la salida de la terminal.
              </small>
              <PythonEditor
                codigoInicial={codigoInicial}
                lineasVisibles={10}
                onCodeChange={(val) => setCodigoOficial(val)}
                onOutputChange={(val) => setTerminalOficial(val)}
              />
            </div>

            {/* Campo de Número de Cuenta */}
            <div className="card bg-light border-0 p-3 mb-4">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <label htmlFor="numeroCuenta" className="form-label fw-bold mb-1">
                    <i className="bi bi-person-badge me-2 text-primary"></i>
                    Número de Cuenta UNAM <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="numeroCuenta"
                    className="form-control"
                    placeholder="Ej. 318000000"
                    value={numeroCuenta}
                    onChange={(e) => setNumeroCuenta(e.target.value)}
                    maxLength={10}
                    required
                  />
                  <small className="text-muted">
                    Ingresa tu número de cuenta para vincular esta entrega.
                  </small>
                </div>
              </div>
            </div>

            {/* Alert de Retroalimentación */}
            {mensaje && (
              <div className={`alert alert-${mensaje.tipo} alert-dismissible fade show my-3`} role="alert">
                {mensaje.texto}
                <button type="button" className="btn-close" onClick={() => setMensaje(null)}></button>
              </div>
            )}

            {/* Botón de Envío */}
            <div className="d-flex justify-content-end mt-4">
              <button
                type="submit"
                className="btn btn-primary btn-lg shadow-sm fw-semibold"
                disabled={enviando}
              >
                {enviando ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Almacenando en SQLite...
                  </>
                ) : (
                  <>
                    <i className="bi bi-send-fill me-2"></i>
                    Enviar Participación
                  </>
                )}
              </button>
            </div>

          </form>

        </div>
      </div>
    </div>
  );
}