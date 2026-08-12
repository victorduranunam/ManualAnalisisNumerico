import React from 'react';
import { Card, Alert } from 'react-bootstrap';

const CapituloPython_1 = () => (
  <Card className="shadow-sm border-0 mb-4">
    <Card.Header className="bg-success text-white">
      <h4 className="mb-0">Capítulo 1: Fundamentos y sintaxis de Python</h4>
    </Card.Header>
    <Card.Body>
      <Alert variant="info" className="mb-3">
        <h5 className="fw-bold mb-2">Vista General del Capítulo</h5>
        <p className="mb-0">
          Este capítulo introduce los fundamentos de Python y su sintaxis básica. Explora cada subtema 
          para aprender sobre introducción a Python, sus principios de desarrollo y aplicación en análisis numérico.
        </p>
      </Alert>
    </Card.Body>
  </Card>
);

export default CapituloPython_1;