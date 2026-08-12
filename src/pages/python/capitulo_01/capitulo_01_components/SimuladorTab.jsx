import React from 'react';
import { Card, Alert } from 'react-bootstrap';

const SimuladorTab = () => (
  <Card className="border-0 shadow-sm">
    <Card.Body>
      <h5 className="text-primary fw-bold mb-3">SimuladorTab - Capítulo 1</h5>
      <p className="text-muted mb-3">
        Este bloque corresponde al capítulo 1 de Python y está listo para recibir contenido del tema de .
      </p>
      <Alert variant="light" className="border">
        Aquí se colocará la teoría, ejemplos, videos, simulador, ejercicios o cuestionario del tema.
      </Alert>
    </Card.Body>
  </Card>
);

export default SimuladorTab;