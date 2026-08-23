import React, { useState } from "react";

const SimuladorTab = () => {
  // Entrada simulada por teclado
  const [entradaUsuario, setEntradaUsuario] = useState("45.5");

  // Intentos de conversión
  const valorStr = String(entradaUsuario);

  // Conversión a float
  const valorFloat = parseFloat(entradaUsuario);
  const esFloatValido = !isNaN(valorFloat) && entradaUsuario.trim() !== "";

  // Conversión a int
  const valorInt = parseInt(entradaUsuario, 10);
  const esIntValido = !isNaN(valorInt) && entradaUsuario.trim() !== "";

  // Cálculos matemáticos demostrativos
  const rad = esFloatValido ? (valorFloat * Math.PI) / 180 : null;
  const seno = esFloatValido ? Math.sin(rad) : null;
  const coseno = esFloatValido ? Math.cos(rad) : null;

  return (
    <div className="p-3 border rounded bg-light">
      <h5 className="text-primary fw-bold mb-2">
        <i className="bi bi-arrow-left-right me-2"></i>Simulador: Conversión de Tipos de Datos (Subtema 3.4)
      </h5>
      <p className="text-muted small mb-3">
        Escribe cualquier valor para simular la entrada de <code>input()</code> y observa en tiempo real cómo se comporta cada función de conversión (<code>float</code>, <code>int</code>, <code>str</code> y <code>complex</code>).
      </p>

      {/* CAMPO DE ENTRADA */}
      <div className="card mb-3 shadow-sm border-primary">
        <div className="card-header bg-primary text-white fw-bold small">
          <i className="bi bi-keyboard me-2"></i>Dato Capturado: <code>valor_crudo = input(&quot;...&quot;)</code>
        </div>
        <div className="card-body bg-white">
          <div className="row g-3 align-items-center">
            <div className="col-md-8 col-12">
              <label className="form-label small fw-bold text-dark mb-1">
                Escribe un valor de prueba:
              </label>
              <input
                type="text"
                className="form-control font-monospace fw-bold border-primary"
                value={entradaUsuario}
                onChange={(e) => setEntradaUsuario(e.target.value)}
                placeholder="Ej. 45.5, 10, 1e-4, texto"
              />
              <small className="text-muted">Prueba con decimales (<code>45.5</code>), enteros (<code>10</code>), notación científica (<code>1e-4</code>) o texto (<code>abc</code>).</small>
            </div>

            <div className="col-md-4 col-12">
              <div className="p-2 border rounded bg-light text-center">
                <small className="text-muted d-block">Tipo nativo devuelto por input():</small>
                <span className="badge bg-secondary font-monospace fs-6">&lt;class &apos;str&apos;&gt;</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RESULTADOS DE LAS CUATRO CONVERSIONES */}
      <div className="row g-3 mb-3">
        {/* float(valor) */}
        <div className="col-md-6 col-12">
          <div className={`card h-100 shadow-sm border-${esFloatValido ? "success" : "danger"}`}>
            <div className={`card-header fw-bold small ${esFloatValido ? "bg-success-subtle text-success" : "bg-danger-subtle text-danger"}`}>
              1. <code>float(valor_crudo)</code>
            </div>
            <div className="card-body font-monospace small bg-white">
              {esFloatValido ? (
                <>
                  <div>Valor convertido: <strong className="text-success fs-6">{valorFloat}</strong></div>
                  <div>Tipo: <code>&lt;class &apos;float&apos;&gt;</code></div>
                  <div className="p-2 rounded bg-light border mt-2 text-success">
                    <strong>Operación aritmética (valor + valor):</strong><br />
                    {valorFloat} + {valorFloat} = <strong>{valorFloat + valorFloat}</strong>
                  </div>
                </>
              ) : (
                <div className="text-danger">
                  <strong>ValueError:</strong> No se puede convertir &quot;{entradaUsuario}&quot; a número flotante.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* int(valor) */}
        <div className="col-md-6 col-12">
          <div className={`card h-100 shadow-sm border-${esIntValido ? "primary" : "danger"}`}>
            <div className={`card-header fw-bold small ${esIntValido ? "bg-primary-subtle text-primary" : "bg-danger-subtle text-danger"}`}>
              2. <code>int(valor_crudo)</code>
            </div>
            <div className="card-body font-monospace small bg-white">
              {esIntValido ? (
                <>
                  <div>Valor convertido: <strong className="text-primary fs-6">{valorInt}</strong></div>
                  <div>Tipo: <code>&lt;class &apos;int&apos;&gt;</code></div>
                  <div className="p-2 rounded bg-light border mt-2 text-primary">
                    <strong>Operación aritmética (valor &times; 2):</strong><br />
                    {valorInt} &times; 2 = <strong>{valorInt * 2}</strong>
                  </div>
                </>
              ) : (
                <div className="text-danger">
                  <strong>ValueError:</strong> No se puede convertir &quot;{entradaUsuario}&quot; a entero.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* str(valor) */}
        <div className="col-md-6 col-12">
          <div className="card h-100 shadow-sm border-info">
            <div className="card-header bg-info-subtle text-info fw-bold small">
              3. <code>str(valor_crudo)</code>
            </div>
            <div className="card-body font-monospace small bg-white">
              <div>Valor en texto: <strong className="text-dark fs-6">&quot;{valorStr}&quot;</strong></div>
              <div>Tipo: <code>&lt;class &apos;str&apos;&gt;</code></div>
              <div className="p-2 rounded bg-light border mt-2 text-danger">
                <strong>Concatenación de texto (valor + valor):</strong><br />
                &quot;{valorStr}&quot; + &quot;{valorStr}&quot; = <strong>&quot;{valorStr + valorStr}&quot;</strong>
              </div>
            </div>
          </div>
        </div>

        {/* complex(valor) */}
        <div className="col-md-6 col-12">
          <div className={`card h-100 shadow-sm border-${esFloatValido ? "warning" : "danger"}`}>
            <div className={`card-header fw-bold small ${esFloatValido ? "bg-warning-subtle text-dark" : "bg-danger-subtle text-danger"}`}>
              4. <code>complex(valor_crudo)</code>
            </div>
            <div className="card-body font-monospace small bg-white">
              {esFloatValido ? (
                <>
                  <div>Valor complejo: <strong className="text-dark fs-6">({valorFloat}+0j)</strong></div>
                  <div>Tipo: <code>&lt;class &apos;complex&apos;&gt;</code></div>
                  <div className="p-2 rounded bg-light border mt-2 text-dark">
                    Parte real: <strong>{valorFloat}</strong> | Parte imag: <strong>0.0j</strong>
                  </div>
                </>
              ) : (
                <div className="text-danger">
                  <strong>ValueError:</strong> Entrada inválida para número complejo.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* APLICACIÓN MATEMÁTICA CON EL DATO NUMÉRICO (SI ES VÁLIDO) */}
      {esFloatValido && (
        <div className="card shadow-sm border-0">
          <div className="card-header bg-dark text-white fw-bold small d-flex justify-content-between align-items-center">
            <span>
              <i className="bi bi-calculator me-2 text-warning"></i>
              Cálculo Numérico Automático (Interpretando el dato como ángulo en grados):
            </span>
            <span className="badge bg-success">&check; Dato Listo para Cálculo</span>
          </div>
          <div className="card-body bg-white font-monospace small">
            <div className="row g-3 text-center">
              <div className="col-md-4 col-12">
                <div className="p-2 border rounded bg-light">
                  <div className="text-muted small font-sans-serif">En Radianes (&theta;)</div>
                  <strong className="text-primary fs-6">{rad.toFixed(6)} rad</strong>
                  <div className="text-muted" style={{ fontSize: "0.75rem" }}>({valorFloat} &times; &pi;) / 180</div>
                </div>
              </div>

              <div className="col-md-4 col-12">
                <div className="p-2 border rounded bg-light">
                  <div className="text-muted small font-sans-serif">Seno: sen(&theta;)</div>
                  <strong className="text-success fs-6">{seno.toFixed(6)}</strong>
                  <div className="text-muted" style={{ fontSize: "0.75rem" }}>Math.sin({valorFloat}&deg;)</div>
                </div>
              </div>

              <div className="col-md-4 col-12">
                <div className="p-2 border rounded bg-light">
                  <div className="text-muted small font-sans-serif">Coseno: cos(&theta;)</div>
                  <strong className="text-dark fs-6">{coseno.toFixed(6)}</strong>
                  <div className="text-muted" style={{ fontSize: "0.75rem" }}>Math.cos({valorFloat}&deg;)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SimuladorTab;