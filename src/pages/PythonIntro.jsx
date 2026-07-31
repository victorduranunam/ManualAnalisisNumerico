import React from 'react';
import { Container, Card } from 'react-bootstrap';

function PythonIntro() {
  return (
    <Container className="py-2">
      <Card className="shadow-sm border-0 p-4">
        <h2 className="fw-bold text-navy">
          <i className="bi bi-code-square me-2 text-warning"></i>Introducción a Python
        </h2>
        <hr />
        <p className="lead">
          Guía práctica de prerrequisitos de programación y uso de librerías científicas (NumPy, Matplotlib, SciPy).
        </p>
      </Card>
    </Container>
  );
}

export default PythonIntro;