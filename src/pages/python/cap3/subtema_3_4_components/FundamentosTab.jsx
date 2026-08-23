import React from "react";

const FundamentosTab = () => {
  return (
    <div className="pe-2">
      {/* INTRODUCCIÓN */}
      <p className="text-secondary">
        Una vez que los datos han sido capturados desde el teclado mediante la función <code>input()</code>, es indispensable convertirlos a un tipo numérico antes de utilizarlos en operaciones matemáticas.
      </p>

      <p className="text-secondary">
        Dado que <code>input()</code> siempre devuelve una cadena de caracteres (<code>str</code>), Python interpretará la entrada como texto aunque el usuario haya escrito dígitos numéricos. Para solucionar esto, se utiliza la <strong>conversión explícita de tipos</strong> (también conocida como <em>type casting</em>).
      </p>

      {/* CONVERSIÓN DIRECTA CON INPUT */}
      <h6 className="fw-bold text-primary mt-4 mb-2">
        <i className="bi bi-arrow-repeat me-2"></i>1. Conversión Directa de la Entrada
      </h6>
      <p className="text-secondary small mb-2">
        La técnica más habitual en programación consiste en envolver la llamada de <code>input()</code> directamente dentro de la función de conversión correspondiente:
      </p>

      <div className="bg-light p-3 rounded border my-3 font-monospace small">
        <span className="text-muted"># Captura y conversión inmediata a número real (float)</span><br />
        angulo = <strong>float</strong>(input(&quot;Ingrese el ángulo en grados: &quot;))
      </div>

      <p className="text-secondary small">
        En esta instrucción, la función <code>input()</code> recibe primero el texto ingresado por el usuario, e inmediatamente la función <code>float()</code> lo transforma en un número real, permitiendo que la variable <code>angulo</code> participe en cálculos algebraicos y trigonométricos.
      </p>

      {/* FUNCIONES PRINCIPALES DE CONVERSIÓN */}
      <h6 className="fw-bold text-primary mt-4 mb-2">
        <i className="bi bi-tools me-2"></i>2. Funciones de Conversión en Análisis Numérico
      </h6>
      <p className="text-secondary small mb-3">
        Python proporciona cuatro funciones nativas fundamentales para la conversión explícita de datos:
      </p>

      <div className="row g-3 mb-3">
        {/* int() */}
        <div className="col-md-6 col-12">
          <div className="card h-100 shadow-sm border-0 border-top border-4 border-primary">
            <div className="card-body">
              <h6 className="fw-bold text-primary mb-1">
                <code>int(x)</code> &rarr; Entero
              </h6>
              <p className="small text-muted mb-2">
                Convierte un número real (truncando la parte decimal) o una cadena de dígitos enteros a tipo <code>int</code>.
              </p>
              <div className="p-2 rounded bg-light border font-monospace small">
                x = int(&quot;10&quot;) &nbsp;<span className="text-muted"># x = 10</span><br />
                n = int(3.99) &nbsp;<span className="text-muted"># n = 3 (trunca)</span>
              </div>
            </div>
          </div>
        </div>

        {/* float() */}
        <div className="col-md-6 col-12">
          <div className="card h-100 shadow-sm border-0 border-top border-4 border-success">
            <div className="card-body">
              <h6 className="fw-bold text-success mb-1">
                <code>float(x)</code> &rarr; Número Real (Flotante)
              </h6>
              <p className="small text-muted mb-2">
                Convierte un entero o una cadena numérica (incluyendo notación científica <code>1e-4</code>) a tipo <code>float</code>.
              </p>
              <div className="p-2 rounded bg-light border font-monospace small">
                y = float(&quot;25.75&quot;) &nbsp;<span className="text-muted"># y = 25.75</span><br />
                tol = float(&quot;1e-5&quot;) &nbsp;<span className="text-muted"># tol = 0.00001</span>
              </div>
            </div>
          </div>
        </div>

        {/* str() */}
        <div className="col-md-6 col-12">
          <div className="card h-100 shadow-sm border-0 border-top border-4 border-info">
            <div className="card-body">
              <h6 className="fw-bold text-info mb-1">
                <code>str(x)</code> &rarr; Cadena de Texto
              </h6>
              <p className="small text-muted mb-2">
                Convierte cualquier número o expresión a texto para desplegar mensajes o concatenar resultados.
              </p>
              <div className="p-2 rounded bg-light border font-monospace small">
                texto = str(2.449) &nbsp;<span className="text-muted"># &quot;2.449&quot;</span><br />
                msg = &quot;Raíz: &quot; + str(1.414)
              </div>
            </div>
          </div>
        </div>

        {/* complex() */}
        <div className="col-md-6 col-12">
          <div className="card h-100 shadow-sm border-0 border-top border-4 border-warning">
            <div className="card-body">
              <h6 className="fw-bold text-warning mb-1">
                <code>complex(real, imag)</code> &rarr; Número Complejo
              </h6>
              <p className="small text-muted mb-2">
                Crea o convierte datos a números complejos (con parte imaginaria representada por <code>j</code>).
              </p>
              <div className="p-2 rounded bg-light border font-monospace small">
                z1 = complex(2, 3) &nbsp;<span className="text-muted"># (2+3j)</span><br />
                z2 = complex(&quot;4-5j&quot;) &nbsp;<span className="text-muted"># (4-5j)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow-sm border-0 mb-3">
        <div className="card-header bg-dark text-white fw-bold small">
          <i className="bi bi-table me-2 text-warning"></i>Tabla Resumen de Conversiones para Métodos Numéricos
        </div>
        <div className="table-responsive small">
          <table className="table table-bordered table-hover align-middle mb-0 font-monospace">
            <thead className="table-light text-center font-sans-serif">
              <tr>
                <th>Dato a Capturar</th>
                <th>Entrada Cruda (input)</th>
                <th>Instrucción de Conversión</th>
                <th>Resultado Numérico</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-sans-serif">Iteraciones máximas</td>
                <td><code>&quot;25&quot;</code> (str)</td>
                <td><code>int(input())</code></td>
                <td className="text-primary fw-bold">25 (int)</td>
              </tr>
              <tr>
                <td className="font-sans-serif">Límite inicial X<sub>a</sub></td>
                <td><code>&quot;1.5&quot;</code> (str)</td>
                <td><code>float(input())</code></td>
                <td className="text-success fw-bold">1.5 (float)</td>
              </tr>
              <tr>
                <td className="font-sans-serif">Tolerancia exponencial</td>
                <td><code>&quot;1e-5&quot;</code> (str)</td>
                <td><code>float(input())</code></td>
                <td className="text-success fw-bold">0.00001 (float)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>


      {/* ADVERTENCIA SOBRE VALUEERROR */}
      <div className="alert alert-warning py-2 small mb-0">
        <i className="bi bi-exclamation-triangle-fill me-2 text-warning"></i>
        <strong>Control de Errores (ValueError):</strong> Si la cadena de texto no representa un número válido (por ejemplo, intentar <code>float(&quot;hola&quot;)</code> o <code>int(&quot;3.14&quot;)</code>), Python detendrá el programa lanzando un <code>ValueError</code>.
      </div>

      
    </div>
  );
};

export default FundamentosTab;