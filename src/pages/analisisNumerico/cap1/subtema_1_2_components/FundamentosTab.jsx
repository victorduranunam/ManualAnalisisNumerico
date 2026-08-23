import React from "react";

const FundamentosTab = () => {
  return (
    <div className="p-3 border rounded bg-light">
      {/* Encabezado Principal */}
      <div className="mb-4 pb-2 border-bottom">
        <span className="badge bg-primary mb-2">Unidad 1: Teoría de Errores</span>
        <h3 className="text-primary fw-bold mb-1">
          Subtema 1.2: Representación de números en punto flotante y sus limitaciones
        </h3>
        <p className="text-secondary mb-0">
          Fundamentos del estándar IEEE 754, épsilon de la máquina y fenómenos numéricos críticos en computación científica.
        </p>
      </div>

      {/* 1. Motivación */}
      <section className="card mb-4 shadow-sm">
        <div className="card-header bg-white fw-bold text-dark">
          1. Motivación: De los Reales (&reals;) a los Flotantes (&Fopf;)
        </div>
        <div className="card-body">
          <p className="card-text">
            <strong>La limitación de la memoria:</strong> El conjunto de los números reales (&reals;) es continuo e infinito, 
            mientras que la memoria de un computador es discreta y finita (estructurada en palabras de 32 o 64 bits).
          </p>
          <div className="row g-3 mt-1">
            <div className="col-md-6">
              <div className="p-3 border rounded h-100 bg-white">
                <h6 className="fw-bold text-secondary mb-2">Punto Fijo</h6>
                <p className="small mb-0 text-muted">
                  Mantiene una cantidad predeterminada y fija de cifras enteras y fraccionarias. 
                  Limita severamente el rango dinámico y la resolución numérica.
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="p-3 border rounded h-100 bg-white">
                <h6 className="fw-bold text-primary mb-2">Punto Flotante</h6>
                <p className="small mb-0 text-muted">
                  Emplea una variante de la notación científica en base 2, desplazando el punto binario mediante un exponente 
                  para representar tanto valores astronómicos como subatómicos con la misma cantidad de bits.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Estructura del Estándar IEEE 754 */}
      <section className="card mb-4 shadow-sm">
        <div className="card-header bg-white fw-bold text-dark">
          2. Estructura del Estándar IEEE 754
        </div>
        <div className="card-body">
          <p>
            Todo número en punto flotante normalizado se representa matemáticamente bajo el modelo:
          </p>
          <div className="text-center py-2 px-3 mb-3 bg-light border rounded font-monospace fs-5">
            x = (-1)<sup>s</sup> &times; (1.f)<sub>2</sub> &times; 2<sup>e - sesgo</sup>
          </div>

          <div className="row g-3 mb-3">
            <div className="col-md-4">
              <div className="p-3 border-start border-3 border-info bg-white rounded">
                <div className="fw-bold text-info">Bit de signo (s)</div>
                <small className="text-muted"><code>0</code> para positivo, <code>1</code> para negativo.</small>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-3 border-start border-3 border-warning bg-white rounded">
                <div className="fw-bold text-warning">Exponente sesgado (e)</div>
                <small className="text-muted">Determina la magnitud. Usa un <em>sesgo (bias)</em> para manejar exponentes negativos sin requerir un bit de signo extra.</small>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-3 border-start border-3 border-success bg-white rounded">
                <div className="fw-bold text-success">Mantisa o Significando (f)</div>
                <small className="text-muted">Almacena la precisión fraccionaria. En números normalizados se asume un 1 implícito: <code>(1.f)</code>.</small>
              </div>
            </div>
          </div>

          <h6 className="fw-bold text-secondary mt-3">Comparativa de formatos estándar:</h6>
          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle mb-0 text-center">
              <thead className="table-secondary small">
                <tr>
                  <th>Formato</th>
                  <th>Bits Totales</th>
                  <th>Signo (s)</th>
                  <th>Exponente (e)</th>
                  <th>Sesgo</th>
                  <th>Mantisa (f)</th>
                  <th>Dígitos decimales aprox.</th>
                </tr>
              </thead>
              <tbody className="small">
                <tr>
                  <td className="fw-bold text-start">Precisión simple (<code>float32</code>)</td>
                  <td>32</td>
                  <td>1</td>
                  <td>8</td>
                  <td>127</td>
                  <td>23 (+1 implícito)</td>
                  <td>&asymp; 7</td>
                </tr>
                <tr>
                  <td className="fw-bold text-start">Precisión doble (<code>float64</code> / Python float)</td>
                  <td>64</td>
                  <td>1</td>
                  <td>11</td>
                  <td>1023</td>
                  <td>52 (+1 implícito)</td>
                  <td>&asymp; 15 a 17</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 3. Valores Especiales en IEEE 754 */}
      <section className="card mb-4 shadow-sm">
        <div className="card-header bg-white fw-bold text-dark">
          3. Valores Especiales en IEEE 754
        </div>
        <div className="card-body">
          <p className="card-text text-muted mb-3">
            El estándar reserva configuraciones específicas de bits para representar estados numéricos singulares:
          </p>
          <div className="row g-2">
            <div className="col-md-6">
              <div className="p-2 border rounded bg-white">
                <span className="badge bg-secondary me-2">Ceros</span>
                <code>+0.0</code> y <code>-0.0</code> (exponente y mantisa en ceros).
              </div>
            </div>
            <div className="col-md-6">
              <div className="p-2 border rounded bg-white">
                <span className="badge bg-danger me-2">Infinitos (&plusmn;&infin;)</span>
                Exponente al máximo y mantisa en ceros (por ejemplo <code>1.0 / 0.0</code> o desbordamiento).
              </div>
            </div>
            <div className="col-md-6">
              <div className="p-2 border rounded bg-white">
                <span className="badge bg-dark me-2">NaN (Not a Number)</span>
                Exponente al máximo y mantisa &ne; 0 (indeterminaciones como <code>0.0 / 0.0</code> o &radic;(-1)).
              </div>
            </div>
            <div className="col-md-6">
              <div className="p-2 border rounded bg-white">
                <span className="badge bg-info text-dark me-2">Subnormales</span>
                Exponente en ceros con mantisa no nula; decremento gradual hacia cero (<em>gradual underflow</em>).
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Épsilon de la Máquina */}
      <section className="card mb-4 shadow-sm">
        <div className="card-header bg-white fw-bold text-dark">
          4. Concepto Clave: Épsilon de la Máquina (&epsilon;<sub>mach</sub>)
        </div>
        <div className="card-body">
          <p>
            El <strong>épsilon de la máquina</strong> representa la cota superior del error relativo por redondeo, 
            equivalente a la distancia entre <code>1.0</code> y el siguiente número flotante inmediatamente representable:
          </p>
          <div className="text-center py-2 px-3 mb-3 bg-light border rounded font-monospace fs-5">
            &epsilon;<sub>mach</sub> = 2<sup>-t</sup>
          </div>
          <div className="row g-3">
            <div className="col-md-6">
              <div className="alert alert-secondary mb-0">
                <strong>Precisión simple (t = 23):</strong>
                <div className="font-monospace mt-1">&epsilon;<sub>mach</sub> = 2<sup>-23</sup> &asymp; 1.19 &times; 10<sup>-7</sup></div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="alert alert-primary mb-0">
                <strong>Precisión doble (t = 52):</strong>
                <div className="font-monospace mt-1">&epsilon;<sub>mach</sub> = 2<sup>-52</sup> &asymp; 2.22 &times; 10<sup>-16</sup></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Limitaciones Críticas y Fenómenos Numéricos */}
      <section className="card mb-4 shadow-sm">
        <div className="card-header bg-white fw-bold text-dark">
          5. Limitaciones Críticas y Fenómenos Numéricos
        </div>
        <div className="card-body">
          <div className="accordion" id="accordionLimitaciones">
            {/* A. Conversión */}
            <div className="border rounded p-3 mb-3 bg-white">
              <h6 className="fw-bold text-danger mb-2">A. Imprecisión en la conversión Decimal-Binario</h6>
              <p className="small mb-2">
                Fracciones simples en base 10 pueden ser periódicas infinitas en base 2:
              </p>
              <div className="font-monospace bg-light p-2 rounded mb-2 small">
                0.1<sub>10</sub> = (0.0001100110011...)<sub>2</sub>
              </div>
              <p className="small text-muted mb-2">
                En memoria no se almacena exactamente 0.1, sino una aproximación finita:
              </p>
              <pre className="bg-dark text-light p-2 rounded small mb-0">
                <code>0.1 + 0.2 != 0.3  # En Python: 0.1 + 0.2 = 0.30000000000000004</code>
              </pre>
            </div>

            {/* B. Overflow / Underflow */}
            <div className="border rounded p-3 mb-3 bg-white">
              <h6 className="fw-bold text-danger mb-2">B. Desbordamiento (Overflow y Underflow)</h6>
              <ul className="small mb-0">
                <li className="mb-1">
                  <strong>Overflow:</strong> El resultado excede el límite superior representable (&asymp; 1.8 &times; 10<sup>308</sup> en float64), produciendo <code>&plusmn;&infin;</code>.
                </li>
                <li>
                  <strong>Underflow:</strong> Un valor no nulo es inferior al mínimo representable (&asymp; 2.2 &times; 10<sup>-308</sup> en float64 normalizado), truncándose a <code>0.0</code>.
                </li>
              </ul>
            </div>

            {/* C. Cancelación Catastrófica */}
            <div className="border rounded p-3 mb-3 bg-white">
              <h6 className="fw-bold text-danger mb-2">C. Cancelación Catastrófica</h6>
              <p className="small mb-0">
                Ocurre al restar dos números casi iguales (<em>a &asymp; b</em>). Los dígitos más significativos se cancelan mutuamente, 
                dejando que los bits menos significativos (afectados por ruido de redondeo) pasen a dominar el resultado final.
              </p>
            </div>

            {/* D. Absorción */}
            <div className="border rounded p-3 bg-white">
              <h6 className="fw-bold text-danger mb-2">D. Absorción (Suma de magnitudes dispares)</h6>
              <p className="small mb-2">
                Al sumar un valor grande <em>x</em> con uno muy pequeño <em>y</em> tal que <code>|y| &lt; |x| &times; (&epsilon;<sub>mach</sub> / 2)</code>, el valor de <em>y</em> se pierde en el desplazamiento de mantisas:
              </p>
              <div className="font-monospace bg-light p-2 rounded text-center small">
                x + y = x
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Reglas de Buena Práctica */}
      <section className="card shadow-sm border-success">
        <div className="card-header bg-success text-white fw-bold">
          6. Reglas de Buena Práctica en Ingeniería
        </div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-4">
              <div className="p-3 border rounded h-100 bg-white">
                <div className="fw-bold text-success mb-1">1. Evitar igualdad estricta</div>
                <p className="small text-muted mb-0">
                  Nunca comparar flotantes con <code>==</code>. Utilizar tolerancias:
                  <br />
                  <code>|a - b| &le; tol</code>
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-3 border rounded h-100 bg-white">
                <div className="fw-bold text-success mb-1">2. Reformulación algebraica</div>
                <p className="small text-muted mb-0">
                  Racionalizar expresiones propensas a cancelación o utilizar expansiones en series de Taylor para valores cercanos a cero.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-3 border rounded h-100 bg-white">
                <div className="fw-bold text-success mb-1">3. Orden de acumulación</div>
                <p className="small text-muted mb-0">
                  En sumatorias o series, sumar preferentemente de menor a mayor magnitud para minimizar el efecto de absorción numérica.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FundamentosTab;