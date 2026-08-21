import React, { useState } from 'react';
import PythonEditor from '../../components/PythonEditor';

export default function SesionActual() {
  const [numeroCuenta, setNumeroCuenta] = useState('');
  
  // Estados para capturar el código y la salida de la ENTREGA OFICIAL
  const [codigoOficial, setCodigoOficial] = useState('');
  const [terminalOficial, setTerminalOficial] = useState('');
  
  const [enviando, setEnviando] = useState(false);
  const [mensaje, setMensaje] = useState(null);

  // Ruta hacia el script PHP dentro de public/api/
  const API_URL = './public/api/registrar_participacion.php';

  const codigoPruebasInicial = `# Zona de Borrador / Pruebas Libres
import numpy as np

# Usa este espacio para hacer pruebas antes de redactar tu entrega
print("Probando algoritmo...")`;

  const codigoOficialInicial = `# Participación Oficial de la Clase
import numpy as np

# Escribe aquí la solución final que será evaluada
print("Entrega de participación")`;

  const handleEnviarParticipacion = async (e) => {
    e.preventDefault();

    if (!numeroCuenta.trim()) {
      setMensaje({ tipo: 'danger', texto: 'Por favor, ingresa tu número de cuenta UNAM.' });
      return;
    }

    if (!terminalOficial.trim() || terminalOficial.startsWith('// Presiona')) {
      setMensaje({ 
        tipo: 'warning', 
        texto: 'Debes presionar "Ejecutar" en la ventana de Entrega Oficial para verificar la salida de la terminal antes de enviar.' 
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
        texto: error.message || 'Ocurrió un error al enviar la participación. Intenta de nuevo.' 
      });
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="container-fluid py-2">
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body p-4">
          
          {/* Instrucciones de la Clase */}
          <div className="alert alert-primary border-0 d-flex align-items-center mb-4" role="alert">
            <i className="bi bi-info-circle-fill fs-4 me-3"></i>
            <div>
              <h5 className="alert-heading fw-bold mb-1">Registro de Participación de la Clase</h5>
              <p className="mb-0">
                Aquí subirás el código de la participación que se está realizando en la clase.
                Puedes usar el área de borrador para experimentar y, cuando estés listo, ejecuta tu código en el área oficial e ingresa tu número de cuenta para enviar.
              </p>
            </div>
          </div>

          <form onSubmit={handleEnviarParticipacion}>
            
            {/* Campo de Número de Cuenta */}
            <div className="row mb-4">
              <div className="col-md-5">
                <label htmlFor="numeroCuenta" className="form-label fw-bold">
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
              </div>
            </div>

            {/* 1. Editor de Borrador (Sin captura de datos) */}
            <div className="mb-5 p-3 bg-light rounded border">
              <h6 className="fw-bold text-secondary mb-1">
                <i className="bi bi-pencil-square me-2"></i>
                Área de Pruebas Libres / Borrador
              </h6>
              <small className="text-muted d-block mb-2">
                Utiliza este entorno para hacer cálculos previos. Lo que ejecutes aquí no se enviará en el registro final.
              </small>
              <PythonEditor
                codigoInicial={codigoPruebasInicial}
                lineasVisibles={5}
              />
            </div>

            {/* 2. Editor Oficial (Captura código y salida para enviar al PHP) */}
            <div className="mb-4 p-3 bg-white rounded border border-2 border-primary shadow-sm">
              <h5 className="fw-bold text-primary mb-1">
                <i className="bi bi-check-circle-fill me-2"></i>
                Entrega Oficial de Participación <span className="text-danger">*</span>
              </h5>
              <small className="text-muted d-block mb-2">
                Escribe aquí el código definitivo. **Es indispensable presionar "▶ Ejecutar"** en este editor para capturar el resultado de la consola.
              </small>
              <PythonEditor
                codigoInicial={codigoOficialInicial}
                lineasVisibles={8}
                onCodeChange={(val) => setCodigoOficial(val)}
                onOutputChange={(val) => setTerminalOficial(val)}
              />
            </div>

            {/* Alertas y Mensajes */}
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
                className="btn btn-primary btn-lg shadow-sm font-semibold"
                disabled={enviando}
              >
                {enviando ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Guardando en servidor...
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