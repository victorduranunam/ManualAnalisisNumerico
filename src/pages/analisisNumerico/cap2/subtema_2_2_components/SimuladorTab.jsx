import React, { useState } from "react";
import { Row, Col, Form, Button, Card } from "react-bootstrap";

const SimuladorTab = () => {
  const [funcion, setFuncion] = useState("");
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [tol, setTol] = useState("");

  const handleCalcular = (e) => {
    e.preventDefault();
    console.log("Simulador del subcapítulo 2.2 listo para completar:", { funcion, a, b, tol });
  };

  return (
    <div>
      <h5 className="text-primary fw-bold mb-3">
        <i className="bi bi-graph-up-arrow me-2"></i>Simulador del subcapítulo 2.2
      </h5>

      <Row>
        <Col lg={4} className="mb-4">
          <Card className="bg-light border-0 shadow-sm">
            <Card.Body>
              <Form onSubmit={handleCalcular}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold">Función f(x)</Form.Label>
                  <Form.Control type="text" value={funcion} onChange={(e) => setFuncion(e.target.value)} placeholder="Escribe la función" />
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="small fw-bold">Límite a</Form.Label>
                      <Form.Control type="number" step="any" value={a} onChange={(e) => setA(e.target.value)} placeholder="a" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="small fw-bold">Límite b</Form.Label>
                      <Form.Control type="number" step="any" value={b} onChange={(e) => setB(e.target.value)} placeholder="b" />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold">Tolerancia</Form.Label>
                  <Form.Control type="number" step="any" value={tol} onChange={(e) => setTol(e.target.value)} placeholder="ε" />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Ejecutar
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={8}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="text-center p-4 bg-light rounded">
              <p className="text-muted mb-0">Espacio para graficar, iteraciones y resultados del método del subcapítulo.</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SimuladorTab;