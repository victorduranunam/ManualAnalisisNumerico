import React, { useState } from "react";
import { Row, Col, Form, Button, Table, Card, Alert } from "react-bootstrap";

const SimuladorTab = () => {
  // Estado local para los parámetros de entrada
  const [funcion, setFuncion] = useState("x^3 - x - 2");
  const [a, setA] = useState(1);
  const [b, setB] = useState(2);
  const [tol, setTol] = useState(0.001);

  const handleCalcular = (e) => {
    e.preventDefault();
    // Aquí invocas el script o motor numérico
    console.log("Calculando con:", { funcion, a, b, tol });
  };

  return (
    <div>
      <h5 className="text-primary mb-3">Simulador Interactivo</h5>
      <p className="text-muted">
        Ajusta los parámetros de la función e intervalo para ejecutar el algoritmo de Bisección.
      </p>

      <Row>
        {/* Panel de Controles */}
        <Col lg={4} className="mb-4">
          <Card className="bg-light border-0 shadow-sm">
            <Card.Body>
              <h6 className="fw-bold mb-3">Parámetros de Entrada</h6>
              <Form onSubmit={handleCalcular}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold">Función f(x)</Form.Label>
                  <Form.Control
                    type="text"
                    value={funcion}
                    onChange={(e) => setFuncion(e.target.value)}
                  />
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="small fw-bold">Límite a</Form.Label>
                      <Form.Control
                        type="number"
                        step="any"
                        value={a}
                        onChange={(e) => setA(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="small fw-bold">Límite b</Form.Label>
                      <Form.Control
                        type="number"
                        step="any"
                        value={b}
                        onChange={(e) => setB(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold">Tolerancia (ε)</Form.Label>
                  <Form.Control
                    type="number"
                    step="any"
                    value={tol}
                    onChange={(e) => setTol(e.target.value)}
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Ejecutar Algoritmo
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Áreas de Visualización y Gráfica */}
        <Col lg={8}>
          {/* Zona del Gráfico */}
          <Card className="mb-4 border-0 shadow-sm">
            <Card.Body className="text-center p-4 bg-white rounded">
              <h6 className="text-muted">[ Canvas / Chart.js / Plotly de la función y la raíz ]</h6>
            </Card.Body>
          </Card>

          {/* Tabla de Iteraciones */}
          <h6 className="fw-bold mb-2">Tabla de Iteraciones</h6>
          <Table striped bordered hover responsive size="sm" className="bg-white">
            <thead className="table-dark">
              <tr>
                <th>i</th>
                <th>a</th>
                <th>b</th>
                <th>m (Raíz)</th>
                <th>f(m)</th>
                <th>Error (%)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>1.0000</td>
                <td>2.0000</td>
                <td>1.5000</td>
                <td>-0.8750</td>
                <td>-</td>
              </tr>
              <tr>
                <td>2</td>
                <td>1.5000</td>
                <td>2.0000</td>
                <td>1.7500</td>
                <td>0.5781</td>
                <td>14.28%</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );
};

export default SimuladorTab;