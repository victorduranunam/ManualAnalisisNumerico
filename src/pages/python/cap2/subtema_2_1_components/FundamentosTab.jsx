import React from "react";
import { Alert } from "react-bootstrap";

const FundamentosTab = () => {
  return (
    <div className="pe-2">
      <h5 className="text-primary fw-bold mb-3">
        <i className="bi bi-bookmark-fill me-2"></i>Teorema del Valor Intermedio y Bolzano pppp
      </h5>
      <p className="text-secondary">
        Los <strong>métodos cerrados</strong> (o de intervalo) aprovechan el hecho de que una función continua cambia de signo en la vecindad de una raíz real. Al establecer un intervalo donde ocurre este cambio de signo, garantizamos que existe al menos una solución.
      </p>

      <Alert variant="info" className="border-0 shadow-sm my-4 p-4">
        <h6 className="fw-bold mb-2">
          <i className="bi bi-lightbulb-fill me-2"></i>Teorema de Bolzano
        </h6>
        <p className="mb-2">
          Si una función real <code>f(x)</code> es continua en un intervalo cerrado <code>[a, b]</code> y se cumple que los valores de la función en los extremos tienen signos opuestos, es decir:
        </p>
        <div className="text-center my-3 p-2 bg-white rounded shadow-xs">
          <span className="fst-italic fw-bold fs-5">f(a) &middot; f(b) &lt; 0</span>
        </div>
        <p className="mb-0">
          Entonces, existe al menos un punto <code>c</code> perteneciente al intervalo abierto <code>(a, b)</code> tal que se cumple la igualdad: <strong>f(c) = 0</strong> (donde <code>c</code> es una raíz o cero de la función).
        </p>
      </Alert>

      <h5 className="text-primary fw-bold mb-3 mt-4">
        <i className="bi bi-gear-fill me-2"></i>Algoritmo del Método de Bisección
      </h5>
      <p className="text-secondary">
        Es un método iterativo de búsqueda incremental que divide sistemáticamente el intervalo a la mitad. Si una función cambia de signo sobre un intervalo, se evalúa el valor de la función en el punto medio. La posición de la raíz se determina ubicándola en el punto medio del subintervalo dentro del cual ocurre el cambio de signo. El proceso se repite hasta lograr la precisión deseada.
      </p>

      <div className="bg-light p-3 rounded border mb-4">
        <h6 className="fw-bold text-dark mb-2">Pasos del Algoritmo:</h6>
        <ol className="lh-lg mb-0 text-secondary">
          <li>
            <strong>Paso de Inicialización:</strong> Elegir valores iniciales <code>a</code> y <code>b</code> tales que <code>f(a) &middot; f(b) &lt; 0</code>.
          </li>
          <li>
            <strong>Paso de Bisección (Punto Medio):</strong> Calcular una aproximación de la raíz <code>m</code> como:
            <div className="text-center py-2">
              <code className="fs-5 fw-bold bg-white px-3 py-1 rounded shadow-xs border">m = (a + b) / 2</code>
            </div>
          </li>
          <li>
            <strong>Criterio de Subintervalo:</strong> Evaluar la función para determinar en cuál mitad reside la raíz:
            <ul>
              <li>Si <code>f(a) &middot; f(m) &lt; 0</code>: La raíz está en el intervalo izquierdo; hacer <code>b = m</code>.</li>
              <li>Si <code>f(a) &middot; f(m) &gt; 0</code>: La raíz está en el intervalo derecho; hacer <code>a = m</code>.</li>
              <li>Si <code>f(a) &middot; f(m) = 0</code>: <code>m</code> es la raíz exacta; terminar la búsqueda.</li>
            </ul>
          </li>
          <li>
            <strong>Condición de Parada:</strong> Repetir desde el paso 2 hasta que el error aproximado porcentual <code>&epsilon;<sub>a</sub></code> sea menor que la tolerancia especificada <code>&epsilon;<sub>s</sub></code>, o se alcance el número máximo de iteraciones.
          </li>
        </ol>
      </div>

      <h5 className="text-primary fw-bold mb-3">
        <i className="bi bi-shield-check me-2"></i>Criterios de Convergencia y Error
      </h5>
      <p className="text-secondary">
        El error aproximado relativo porcentual para cada iteración <code>i &gt; 1</code> se calcula comparando la aproximación actual con la anterior:
      </p>
      <div className="text-center my-3 p-3 bg-light rounded border">
        <code className="fs-5 fw-bold">&epsilon;<sub>a</sub> = | (m<sub>actual</sub> - m<sub>anterior</sub>) / m<sub>actual</sub> | &middot; 100%</code>
      </div>

      <h6 className="fw-bold text-dark mt-4">Análisis de Tolerancia y Número Máximo de Iteraciones:</h6>
      <p className="text-secondary">
        Dado que el intervalo se reduce a la mitad en cada iteración, podemos determinar de manera exacta el número de iteraciones necesarias <code>n</code> para alcanzar un error absoluto deseado <code>E</code> mediante la siguiente fórmula teórica:
      </p>
      <div className="text-center my-3 p-3 bg-light rounded border">
        <code className="fs-5 fw-bold">n &ge; log<sub>2</sub>(b - a) - log<sub>2</sub>(E)</code>
      </div>
    </div>
  );
};

export default FundamentosTab;