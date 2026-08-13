import React, { useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";

const CuestionarioTab = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const isCorrect = selectedOption === "b";

  return (
    <div>
      <h5 className="text-primary mb-3">Autoevaluación</h5>
      <p className="text-muted">
        Comprueba tu comprensión técnica sobre la condición de convergencia del método de Bisección.
      </p>

      <Card className="border-0 shadow-sm">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">
                1. ¿Cuál es la condición indispensable que debe cumplir una función continua $f(x)$ en el intervalo $[a, b]$ para garantizar la existencia de al menos una raíz real mediante el Teorema de Bolzano?
              </Form.Label>
              <div>
                <Form.Check
                  type="radio"
                  id="q1-a"
                  name="q1"
                  label="a) f(a) y f(b) deben ser ambas mayores que cero."
                  onChange={() => { setSelectedOption("a"); setSubmitted(false); }}
                />
                <Form.Check
                  type="radio"
                  id="q1-b"
                  name="q1"
                  label="b) f(a) · f(b) < 0 (cambio de signo en los extremos)."
                  onChange={() => { setSelectedOption("b"); setSubmitted(false); }}
                />
                <Form.Check
                  type="radio"
                  id="q1-c"
                  name="q1"
                  label="c) La derivada de la función debe ser constante en todo el intervalo."
                  onChange={() => { setSelectedOption("c"); setSubmitted(false); }}
                />
              </div>
            </Form.Group>

            <Button variant="primary" type="submit" disabled={!selectedOption}>
              Validar Respuesta
            </Button>
          </Form>

          {submitted && (
            <Alert variant={isCorrect ? "success" : "danger"} className="mt-3 mb-0">
              {isCorrect ? (
                <span><strong>¡Correcto!</strong> Si la función es continua y tiene signos opuestos en los extremos, se garantiza al menos una intersección con el eje horizontal.</span>
              ) : (
                <span><strong>Incorrecto.</strong> Recuerda revisar el Teorema del Valor Intermedio en la pestaña de <em>Fundamentos</em>.</span>
              )}
            </Alert>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default CuestionarioTab;