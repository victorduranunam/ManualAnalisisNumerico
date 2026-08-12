import React from "react";
import { Accordion, Badge } from "react-bootstrap";

const EjerciciosTab = () => {
  return (
    <div>
      <h5 className="text-primary mb-3">Ejercicios Resueltos y Propuestos</h5>
      <p className="text-muted">
        Revisa las soluciones paso a paso para consolidar el procedimiento analítico.
      </p>

      <Accordion defaultActiveKey="0" className="shadow-sm">
        {/* Ejercicio 1 */}
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <span className="fw-bold me-2">Ejercicio 1:</span>
            <span>Localización de raíz en polinomio</span>
            <Badge bg="success" className="ms-auto me-2">Resuelto</Badge>
          </Accordion.Header>
          <Accordion.Body>
            <h6><strong>Enunciado:</strong></h6>
            <p>
              Encuentre la raíz de la función <code>f(x) = x³ - 4x - 9</code> dentro del 
              intervalo <code>[2, 3]</code> utilizando el método de bisección hasta reducir 
              el error absoluto a menos de 0.05.
            </p>
            <hr />
            <h6><strong>Solución Paso a Paso:</strong></h6>
            <ol>
              <li>
                <strong>Verificación del cambio de signo:</strong>
                <br />
                <code>f(2) = (2)³ - 4(2) - 9 = -9</code>
                <br />
                <code>f(3) = (3)³ - 4(3) - 9 = +6</code>
                <br />
                Como <code>f(2) · f(3) &lt; 0</code>, existe al menos una raíz en el intervalo <code>[2, 3]</code>.
              </li>
              <li className="mt-2">
                <strong>Primera Iteración (i = 1):</strong>
                <br />
                <code>m₁ = (2 + 3) / 2 = 2.5</code>
                <br />
                <code>f(2.5) = (2.5)³ - 4(2.5) - 9 = -3.375</code> (como mantiene signo negativo, el nuevo intervalo es <code>[2.5, 3]</code>).
              </li>
              <li className="mt-2">
                <strong>Segunda Iteración (i = 2):</strong>
                <br />
                <code>m₂ = (2.5 + 3) / 2 = 2.75</code>
                <br />
                <code>f(2.75) = (2.75)³ - 4(2.75) - 9 = 0.7969</code> (cambia a positivo, el nuevo intervalo es <code>[2.5, 2.75]</code>).
              </li>
            </ol>
          </Accordion.Body>
        </Accordion.Item>

        {/* Ejercicio 2 */}
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            <span className="fw-bold me-2">Ejercicio 2:</span>
            <span>Ecuación trascendente en ingeniería</span>
            <Badge bg="warning" text="dark" className="ms-auto me-2">Propuesto</Badge>
          </Accordion.Header>
          <Accordion.Body>
            <h6><strong>Enunciado:</strong></h6>
            <p>
              Dada la función <code>f(x) = e⁻ˣ - sin(x)</code>, determine el intervalo de 
              longitud máxima <code>h = 0.5</code> donde se encuentra la primera raíz positiva 
              mediante Búsqueda Incremental.
            </p>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default EjerciciosTab;