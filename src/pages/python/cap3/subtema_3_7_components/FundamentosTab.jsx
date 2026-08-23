import React from "react";

const FundamentosTab = () => {
  return (
    <div className="pe-2">
      {/* INTRODUCCIÓN */}
      <p className="text-secondary">
        Una vez realizados los cálculos, el programa debe presentar los resultados al usuario de forma clara, legible y profesional. En Python, la función <code>print()</code> es la herramienta principal para enviar información a la consola o terminal de salida.
      </p>

      {/* LAS FORMAS PRINCIPALES DE DESPLIEGUE */}
      <h6 className="fw-bold text-primary mt-4 mb-2">
        <i className="bi bi-display me-2"></i>1. Métodos para Mostrar Información en Pantalla
      </h6>

      <div className="row g-3 mb-4">
        {/* Forma 1: Separación por Comas */}
        <div className="col-md-6 col-12">
          <div className="card h-100 shadow-sm border-0 border-top border-4 border-secondary">
            <div className="card-body">
              <h6 className="fw-bold text-dark mb-1">A. Separación por Comas (Básica)</h6>
              <p className="text-muted small mb-2">
                Separa textos y variables con comas. Python inserta automáticamente un espacio en blanco entre cada elemento:
              </p>
              <div className="p-2 rounded bg-light border font-monospace small">
                angulo = 45<br />
                rad = 0.785398<br />
                print(&quot;El ángulo&quot;, angulo, &quot;en radianes es:&quot;, rad)
              </div>
              <small className="text-muted mt-2 d-block">
                Salida: <code>El ángulo 45 en radianes es: 0.785398</code>
              </small>
            </div>
          </div>
        </div>

        {/* Forma 2: F-Strings (Moderna y Recomendada) */}
        <div className="col-md-6 col-12">
          <div className="card h-100 shadow-sm border-0 border-top border-4 border-primary">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <h6 className="fw-bold text-primary mb-0">B. Cadenas Literales Formateadas (f-strings)</h6>
                <span className="badge bg-primary">Recomendado</span>
              </div>
              <p className="text-muted small mb-2">
                Antepone una <code>f</code> antes de las comillas e inserta las variables dentro de llaves <code>{`{...}`}</code>:
              </p>
              <div className="p-2 rounded bg-light border font-monospace small">
                print(f&quot;El ángulo {`{angulo}`}° equivale a {`{rad:.4f}`} rad&quot;)
              </div>
              <small className="text-success fw-semibold mt-2 d-block">
                &check; Permite formatear decimales y alinear tablas directamente.
              </small>
            </div>
          </div>
        </div>
      </div>

      {/* FORMATEO DE NÚMEROS EN ANÁLISIS NUMÉRICO */}
      <h6 className="fw-bold text-primary mt-4 mb-2">
        <i className="bi bi-hash me-2"></i>2. Formateo de Precisión y Decimales en Análisis Numérico
      </h6>
      <p className="text-secondary small mb-3">
        En métodos numéricos, los números de punto flotante suelen tener muchos decimales innecesarios (por ejemplo <code>0.7071067811865476</code>). Mediante los <strong>especificadores de formato</strong> de las f-strings podemos controlar exactamente cuántos dígitos mostrar:
      </p>

      <div className="table-responsive small mb-4">
        <table className="table table-bordered table-hover align-middle mb-0 font-monospace">
          <thead className="table-light text-center font-sans-serif">
            <tr>
              <th>Especificador</th>
              <th>Descripción</th>
              <th>Ejemplo de Código</th>
              <th>Salida Generada</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="fw-bold text-primary">{`{x:.2f}`}</td>
              <td className="font-sans-serif">Flotante redondeado a 2 decimales fijos.</td>
              <td><code>f&quot;{`{3.141592:.2f}`}&quot;</code></td>
              <td className="text-success fw-bold">3.14</td>
            </tr>
            <tr>
              <td className="fw-bold text-primary">{`{x:.6f}`}</td>
              <td className="font-sans-serif">Flotante a 6 decimales (estándar en aproximaciones).</td>
              <td><code>f&quot;{`{0.70710678:.6f}`}&quot;</code></td>
              <td className="text-success fw-bold">0.707107</td>
            </tr>
            <tr>
              <td className="fw-bold text-primary">{`{x:.3e}`}</td>
              <td className="font-sans-serif">Notación científica (ideal para tolerancias y errores).</td>
              <td><code>f&quot;{`{0.00015:.2e}`}&quot;</code></td>
              <td className="text-success fw-bold">1.50e-04</td>
            </tr>
            <tr>
              <td className="fw-bold text-primary">{`{x:<10.4f}`}</td>
              <td className="font-sans-serif">Alineación a la izquierda ocupando 10 espacios (tablas).</td>
              <td><code>f&quot;{`{2.4495:<10.4f}`}|&quot;</code></td>
              <td className="text-success fw-bold">2.4495 &nbsp; &nbsp; |</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* PARÁMETROS ESPECIALES DE PRINT */}
      <h6 className="fw-bold text-primary mt-4 mb-2">
        <i className="bi bi-gear-wide-connected me-2"></i>3. Parámetros Especiales: <code>sep</code> y <code>end</code>
      </h6>
      <div className="row g-3 mb-2">
        <div className="col-md-6 col-12">
          <div className="p-3 border rounded bg-white h-100">
            <h6 className="fw-bold text-dark mb-1">Parámetro <code>sep</code> (Separador)</h6>
            <p className="small text-muted mb-2">Cambia el carácter que se coloca entre los elementos impresos:</p>
            <div className="p-2 rounded bg-light border font-monospace small">
              print(&quot;Iter 1&quot;, &quot;Xa=1.0&quot;, &quot;Xb=2.0&quot;, sep=&quot; | &quot;)<br />
              <span className="text-muted"># Salida: Iter 1 | Xa=1.0 | Xb=2.0</span>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-12">
          <div className="p-3 border rounded bg-white h-100">
            <h6 className="fw-bold text-dark mb-1">Parámetro <code>end</code> (Final de línea)</h6>
            <p className="small text-muted mb-2">Evita el salto de línea automático permitiendo imprimir en el mismo renglón:</p>
            <div className="p-2 rounded bg-light border font-monospace small">
              print(&quot;Calculando... &quot;, end=&quot;&quot;)<br />
              print(&quot;¡Listo!&quot;)<br />
              <span className="text-muted"># Salida: Calculando... ¡Listo!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundamentosTab;