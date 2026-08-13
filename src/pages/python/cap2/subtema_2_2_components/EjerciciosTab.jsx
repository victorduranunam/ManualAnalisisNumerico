import React from "react";
import { Accordion } from "react-bootstrap";

const EjerciciosTab = () => {
  return (
    <div>
      <h5 className="text-primary fw-bold mb-3">
        <i className="bi bi-journal-text me-2"></i>Ejercicios del subcapítulo 2.2
      </h5>

      <Accordion defaultActiveKey="0" className="shadow-sm">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Ejercicio 1</Accordion.Header>
          <Accordion.Body>
            <p className="text-muted mb-0">Aquí se escribe el enunciado, desarrollo y solución del primer ejercicio del subcapítulo.</p>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>Ejercicio 2</Accordion.Header>
          <Accordion.Body>
            <p className="text-muted mb-0">Aquí se escribe el enunciado, desarrollo y solución del segundo ejercicio del subcapítulo.</p>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default EjerciciosTab;